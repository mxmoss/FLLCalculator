//FLL 2013 Nature's Fury Challenge Calculator
//Load the info from a JSON file
import React, {Component} from 'react';
import challenges from './FLL2013Challenge.json';

function CurrentScore(props){
const aScore = "Current Score: "+props.curScore+" points";
  return <div className="navbar-brand" >{aScore}</div>
}
//<NavBar curScore={this.state.curScore} />

function NavBar(props){
  return(
    <nav className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">Nature&apos;s Fury</a>
          <CurrentScore curScore={props.curScore} />
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#reset">Reset</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Header(props){
  return(
    <div className="jumbotron">
      <h1>{props.title}</h1>
      <p>Calculator for the 2013 FLL Robot Challenge.</p>
    </div>
  )
}

function ACheckbox(props){
  const {name, id, handleChange} = props;
  return(
    <input type="checkbox" name={name} id={id} key={id.toString()} onChange={handleChange}/>
  )
}

function AComboBox(props){
  const {score, name, id, handleChange} = props;
  return(
    <select name={name} id={id} onChange={handleChange}>
      {score.map((aScore, index) =>
        <option
          value={aScore.value}
          key={id +"-"+ aScore.name}
        >{aScore.name}</option>
      )}
    </select>
  )
}

function ARadioGroup(props){
  const {score, name, id, handleChange} = props;
  return(
    <div className="radio" name={id} key={id} id={id}>
    {score.map((aScore) =>
      <label
          key={"L"+id +"-"+ aScore.value.toString()}
          >
          <input type="radio"
              name={name}
              key={id +"-"+ aScore.value.toString()}
              value={aScore.value}
              onChange={handleChange}
          ></input>
          {aScore.name}
      </label>
    )}
    </div>
  )
}

function FullDescription(props){
    if (props.expanded) {
  return <p>{props.desc} <a href="#collapse">See Less&lt;&lt;</a></p>;
    } else {
  return null;
   }
}

function ShortDescription(props){
  return  <p>Mission:{props.desc}  <a href="#collapse">See More&gt;&gt;</a></p>
}

function ChallengeItem(props) {
  const {challenge, handleChange} = props;
  return(
    <div className="col-xs-6 col-lg-4">
      <img className="image" src={"icons/" + challenge.picture} alt={challenge.name}  style={{ width: '80px', height: '80px' }} />
      <h3>{challenge.name}</h3>
      <h4>Max {challenge.max} pts</h4>

      {(() => {
        switch (challenge.controlType) {
          case "checkbox":  return <ACheckbox score={challenge.score}
                                              name={challenge.name}
                                              id={challenge.guid}
                                              handleChange = {handleChange} />;
          case "radio":     return <ARadioGroup score={challenge.score}
                                              name={challenge.name}
                                              id={challenge.guid}
                                              handleChange ={handleChange} />;
          case "combo":     return <AComboBox score={challenge.score}
                                              name={challenge.name}
                                              id={challenge.guid}
                                              handleChange ={handleChange} />;
          default:  return '';
        }
      })()}
      <ShortDescription desc={challenge.hint} showing={challenge.expanded}/>
      <FullDescription desc={challenge.description} showing={challenge.expanded} />
    </div>
  )
}

function ChallengeList(props) {
  const {challenges, handleChange} = props;
  return (
    <div className ="row">
      {challenges.map((challenge) =>
        <ChallengeItem key={challenge.guid.toString()}
                  challenge={challenge}
                  handleChange={handleChange}  />
      )}
    </div>
  );
}

class FLL2013ChallengeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateChallenges : challenges,
      curScore: 0,
      prevScores: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    //initialize previous scores to zero
    this.setState({
      prevScores : this.state.stateChallenges
          .map(function(a) {return {"name":a.name, "score":0}})
    })
  }

  prevScore(event){
    //lookup the previous score for this challenge
    return(this.state.prevScores
      .filter(function(score){
        return score.name === event})
      .map((score) =>
        score.score)
    )
  }

  //get the value of a checkbox
  cbxValue(event){
    return(
      //return zero if not checked
      event.target.checked === true ?
        this.state.stateChallenges
        .filter(function(challenge){
          return challenge.guid.toString() === event.target.id.toString()})
        .map((challenge) =>
          challenge.score
        )
        : 0
    )
  }

  handleChange(event) {
    const name = event.target.name;

    //assign value depending on whether it is a checkbox vs other controls
    const aValue = event.target.type === 'checkbox' ? Number(this.cbxValue(event)) : Number(event.target.value);
    this.setState({[name]: aValue});

    //add new amount to current score
    this.setState(function(prevState){
      return{
        curScore: prevState.curScore = (Number(prevState.curScore) - this.prevScore(name) + aValue)
      }
    })

    //Update record of previous scores
    this.setState(function(prevState){
      return{
        prevScores: this.state.prevScores.map((score) =>
          score.name === name ? {"name":score.name, "score":aValue} : {"name":score.name, "score":score.score}
        )
      }
    })
  }

  render() {
    return (
      <div>
        <div className = "container">
          <div className = "row row-offcanvas row-offcanvas-right">
            <NavBar curScore={this.state.curScore} />
            <div className="col-xs-12 col-sm-9">
              <Header title="Nature&apos;s Fury" />
              <ChallengeList handleChange={this.handleChange} challenges={this.state.stateChallenges} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FLL2013ChallengeCalc;

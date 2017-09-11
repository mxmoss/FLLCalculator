//FLL Robot Game Challenge score Calculator
import React, {Component} from 'react';
import Ad from './GoogleAd';
import ReactGA from 'react-ga';

//Load the game challenges from a JSON file
import challenges from './FLL2017Challenge.json';
//import challenges from './FLL2013Challenge.json';

function CurrentScore(props){
const aScore = "Current Score: "+props.curScore+" points";
  return <div className="navbar-brand" >{aScore}</div>
}

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
          <a className="navbar-brand" href="#">Hydro-Dynamics</a>
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
      <p>Robot Game score Calculator.</p>
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


function Description(props){
  //Show full or partial description of the challenge
  const {challenge, expanded} = props;
  return(
    <div>
      <p>Mission: {challenge.hint}
        <button className="btn btn-primary"
                value={ expanded ? false : true }
                id={challenge.name}
                style={{ width: '90px', height: '20px', margin:'1', border:'1', padding:'1', }}
                onClick={props.onClick} >
        {expanded ? (
          "Show less"
          ) : (
          "Show more"
          )
        }
        </button>
      </p>
      { expanded  ?  challenge.description: null}
      <p/>
    </div>
  )
}

function ChallengeItem(props) {
  const {challenge, expandedItems, handleChange, handleClick} = props;
  const expanded = (expandedItems.indexOf(challenge.name) > -1);
  return(
    <div className="col-xs-6 col-lg-4">
      <img className="image" src={"icons/2017/" + challenge.picture} alt={challenge.name}  style={{ width: '80px', height: '80px' }} />
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
      <Description challenge={challenge} expanded={expanded} onClick={handleClick}/>
    </div>
  )
}

function ChallengeList(props) {
  const {challenge, expandedItems, handleChange, handleClick} = props;
  return (
    <div className ="row">
      {challenges.map((challenge) =>
        <ChallengeItem key={challenge.guid.toString()}
                  challenge={challenge}
                  expandedItems={expandedItems}
                  handleChange={handleChange}
                  handleClick={handleClick}
                    />
      )}
    </div>
  );
}

class FLLChallengeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateChallenges : challenges,
      curScore: 0,
      prevScores: [],
      expandedItems: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // Add tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize('UA-2578834-13');
    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
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

  handleClick(event) {
    const name = event.target.name;
    const target = event.target.id.toString();
    console.log('ha '+event.target.value);
    console.log('he '+name);
    console.log('hi '+target);
    console.log('hu ' +event.currentTarget.textContent);
    console.log('hy %o',event.currentTarget);

    //track which challenges have the full description toggled on
    if (event.target.value === "true") {
      this.setState(prevState => ({expandedItems:
         [...prevState.expandedItems, target]
       }))
    } else {
      this.setState(prevState => ({expandedItems:
         prevState.expandedItems.filter(
           expandedItem => expandedItem !== target
        )
      }));
    }
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
              <Header title="Hydro-Dynamics" />
              <ChallengeList
                     challenges={this.state.stateChallenges}
                     expandedItems={this.state.expandedItems}
                     handleChange={this.handleChange}
                     handleClick={this.handleClick} />
            </div>
            <Ad />
          </div>
        </div>
      </div>
    )
  }
}

export default FLLChallengeCalc;

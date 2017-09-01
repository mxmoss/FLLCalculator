//FLL 2013 Nature's Fury Challenge Calculator
//Load the info from a JSON file
import React, {Component} from 'react';
import challenges from './FLL2013Challenge.json';

function ACheckbox(props){
  const {score, name, id, handleChange} = props;
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
  return  <p>{props.desc}</p>
}

function ShortDescription(props){
  return  <p>Mission:{props.desc}</p>
}

function ChallengeItem(props) {
  const {challenge, handleChange} = props;
  return(
    <div className="row">
      <div className="col-xs-6 col-lg-4">
        <h3><img className="image" src={"icons/" + challenge.picture} alt={challenge.name}  style={{ width: '80px', height: '80px' }} />
        {challenge.name} - Max {challenge.max} pts</h3>

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
        <ShortDescription desc={challenge.hint} />
        <FullDescription desc={challenge.description} />
      </div>
    </div>
  )
}

function ChallengeList(props) {
  const {challenges, handleChange} = props;
  return (
    <div>
      {challenges.map((challenge) =>
        <ChallengeItem key={challenge.guid.toString()}
                  challenge={challenge}
                  handleChange={handleChange}  />
      )}
    </div>
  );
}

function CurrentScore(props){
  return  <p>Current Score: {props.curScore}</p>
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
    this.handleSubmit = this.handleSubmit.bind(this);
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
        return score.name === event.target.name})
      .map((score) =>
        score.score)
    )
  }

  cbxValue(event){
    //get the value of the checkbox
    return(this.state.stateChallenges
      .filter(function(challenge){
        return challenge.guid.toString() === event.target.id.toString()})
      .map((challenge) =>
        challenge.score)
    )
  }

  handleChange(event) {
    console.log('Type: '+event.target.type)
    console.log('Name: '+event.target.name);
    console.log('id: '+event.target.id);
    console.log(this.state.stateChallenges);

    //assign value depending on whether it is a checkbox vs other controls
    const aValue = event.target.type === 'checkbox' ? Number(this.cbxValue(event)) : Number(event.target.value);
    this.setState({[event.target.name]: aValue});

    this.setState(function(prevState){
      console.log('prev state obj %o',prevState)
      console.log('prev score: '+ prevState.curScore)
      return{
        curScore: prevState.curScore = (Number(prevState.curScore) + aValue)
      }
    })
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
      <div className = "container">
        <div className = "row row-offcanvas row-offcanvas-right">
          <div className = "col-xs-12 col-sm-9">
            <h2>Nature&apos;s Fury</h2>
            <CurrentScore curScore={this.state.curScore} />
            <ChallengeList handleChange={this.handleChange} challenges={this.state.stateChallenges} />
          </div>
        </div>
      </div>
    )
  }
}

export default FLL2013ChallengeCalc;

//FLL 2013 Nature's Fury Challenge Calculator
//Load the info from a JSON file
import React, {Component} from 'react';
import challenges from './FLL2013Challenge.json';

function ACheckbox(props){
  return(
    <input type="checkbox" onChange={props.handleChange}/>
  )
}

function AComboBox(props){
  const score = props.score;
  return(
    <select onChange={props.handleChange}>
      {score.map((aScore) =>
        <option value={aScore.value} >{aScore.name}</option>
      )}
    </select>
  )
}

function ARadioGroup(props){
  const score = props.score;
  return(
    <div className="radio">
    {score.map((aScore) =>
      <label htmlFor={aScore.name}>{aScore.name}
          <input type="radio"
             value={aScore.value}
             onChange={props.handleChange}
/*             checked={this.state.selectedOption === 'option1'} */
          ></input>
      </label>
    )}
    </div>
  )
}

function FullDescription(props){
  return  <p>{props.desc}</p>
}

function ShortDescription(props){
  return  <p>Goal:{props.desc}</p>
}

function ChallengeItem(props) {
  const challenge = props.challenge;
  return(
    <div className="row">
      <div className="col-xs-6 col-lg-4">
        <h3><img className="image" src={"icons/" + challenge.picture} alt={challenge.name}  style={{ width: '80px', height: '80px' }} />
        {challenge.name} - Max {challenge.max} pts</h3>

        {(() => {
          switch (challenge.controlType) {
            case "checkbox":  return <ACheckbox score={challenge.score}
                                                handleChange = {props.handleChange} />;
            case "radio":     return <ARadioGroup score={challenge.score}
                                                handleChange ={props.handleChange} />;
            case "combo":     return <AComboBox score={challenge.score}
                                                handleChange ={props.handleChange} />;
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
  const challenges = props.challenges;
  return (
    <div>
      {challenges.map((challenge) =>
        <ChallengeItem key={challenge.guid.toString()}
                  challenge={challenge}
                  handleChange={props.handleChange}  />
      )}
    </div>
  );
}

class FLL2013ChallengeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateChallenges : challenges,
      totalScore: 0,
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
//    this.setState({value: event.target.value});
    this.setState({[event.target.name]: event.target.value});
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
            <h2>Contact List</h2>
            <ChallengeList handleChange={this.handleChange} challenges={this.state.stateChallenges} />
          </div>
        </div>
      </div>
    )
  }
}

export default FLL2013ChallengeCalc;

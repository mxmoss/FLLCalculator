//FLL 2013 Nature's Fury Challenge Calculator
//Load the info from a JSON file
import React, {Component} from 'react';
import challenges from './FLL2013Challenge.json';

function ACheckbox(props){
  return(
    <input type="checkbox" name="cbxSupplyTruck"/>
  )
}

function AComboBox(props){
  const score = props.score;
  return(
    <select>
      {score.map((aScore) =>
        <option value="{aScore.value}">{aScore.name}</option>
      )}
    </select>
  )
}

function ARadioGroup(props){
  const score = props.score;
  return(
    <div className="radio-toolbar">
    {score.map((aScore) =>
      <label htmlFor='{aScore.name}'>{aScore.name}
          <input type="radio" value="{aScore.value}" ></input>
      </label>
    )}
    </div>
  )
}

function ChallengeItem(props) {
  const challenge = props.challenge;
  const onChange = props.handleChange;
  const value = props.value;
  return(
    <div className="row">
      <div className="col-xs-6 col-lg-4">
        <h3><img className="image" src={"icons/" + challenge.picture} alt={challenge.name}  style={{ width: '80px', height: '80px' }} />
        {challenge.name} - Max {challenge.max} pts</h3>

        {(() => {
          switch (challenge.controlType) {
            case "checkbox":  return <ACheckbox score={challenge.score}
                                                onChange ={onChange}
                                                value={value} />;
            case "radio":     return <ARadioGroup score={challenge.score}
                                                onChange ={onChange}
                                                value={value} />;
            case "combo":     return <AComboBox score={challenge.score}
                                                onChange ={onChange}
                                                value={value} />;
            default:  return '';
          }
        })()}
        <p>Goal: {challenge.hint}</p>
        <p>{challenge.description}</p>
      </div>
    </div>
  )
}

function ChallengeList(props) {
  const challenges = props.challenges;
  const onChange = props.handleChange;
  const value = props.value;

  return (
    <div>
      {challenges.map((challenge) =>
        <ChallengeItem key={challenge.guid.toString()}
                  challenge={challenge}
                  onChange={onChange}
                  value={value} />
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
    this.setState({inputValue: event.target.value});
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
            <ChallengeList onChange={this.handleChange} value={this.state.value} challenges={this.state.stateChallenges} />
          </div>
        </div>
      </div>
    )
  }
}

export default FLL2013ChallengeCalc;

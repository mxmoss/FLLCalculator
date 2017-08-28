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
    <div class="radio-toolbar">
    {score.map((aScore) =>
      <label htmlFor='{aScore.name}'>{aScore.name}
          <input type="radio" value="{aScore.value}" ></input>
      </label>
    )}
    </div>
  )
}

function ChallengeItem(props) {
  return(
    <div class="row">
      <div class="col-xs-6 col-lg-4">
        <h3><img className="image" src={"icons/" + props.challenge.picture}  style={{ width: '80px', height: '80px' }} />
        {props.challenge.name}</h3>

        {(() => {
          switch (props.challenge.controlType) {
            case "checkbox":  return <ACheckbox score={props.challenge.score} />;
            case "radio":     return <ARadioGroup score={props.challenge.score}/>;
            case "combo":     return <AComboBox score={props.challenge.score}/>;
            default:  return '';
          }
        })()}
        <p>Goal: {props.challenge.hint}</p>
        <p>{props.challenge.description}</p>
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
                  challenge={challenge} />
      )}
    </div>
  );
}

class FLL2013ChallengeCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {stateChallenges : challenges};
  }

  render() {
    return (
      <div class="container">
        <div class="row row-offcanvas row-offcanvas-right">
          <div class="col-xs-12 col-sm-9">
            <h2>Contact List</h2>
            <ChallengeList challenges={this.state.stateChallenges} />
          </div>
        </div>
      </div>
    )
  }
}

export default FLL2013ChallengeCalc;

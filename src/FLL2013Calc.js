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
      curScore: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log('Type: '+event.target.type)
    console.log('Name: '+event.target.name);
    console.log('id: '+event.target.id);
    console.log(this.state.stateChallenges);

    //get the value of the checkbox
    var cbxValue = this.state.stateChallenges
      .filter(function(challenge){
        return challenge.guid.toString() === event.target.id.toString()})
      .map((challenge) =>
        challenge.score);

    const aValue = event.target.type === 'checkbox' ? Number(cbxValue) : Number(event.target.value);
    this.setState({[event.target.name]: aValue});

    this.setState(function(prevState){
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

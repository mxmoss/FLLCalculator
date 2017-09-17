//FLL Robot Game Challenge score Calculator
import React, {Component} from 'react';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Ad from './GoogleAd';
import About from './about';
import ReactGA from 'react-ga';

//Load the game challenges from a JSON file
import challenges from './FLL2017Challenge.json';
//import challenges from './FLL2013Challenge.json';

function CurrentScore(props){
const aScore = "Score: "+props.curScore+" pts";
  return <p className="navbar-text">{aScore}</p>
}

function NavBar(props){
  const  Title = 'Hydro-Dynamics';
  return(
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/fll2013challenge">{Title}</a>
          <CurrentScore curScore={props.curScore} />
          <button className="btn navbar-btn">Reset</button>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavBar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="myNavBar">
          <ul className="nav navbar-nav navbar-right">
            <li className="active"><Link to={'/fll2013challenge'}>Home</Link></li>
            <li><Link to={'/about'}>About</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function PageHeader(props){
  const {Title, Description, aLink} = props;
  return(
    <div className="jumbotron">
      <h1>{Title}</h1>
      <p>{Description}  <Link to={aLink} target="_blank">More Info</Link></p>
    </div>
  )
}

function ACheckbox(props){
  const {name, id, handleChange} = props;
  return(
    <input type="checkbox"
          name={name}
          id={id}
          key={id.toString()}
          style={{width: '20px', height: '20px'}}
          onChange={handleChange}/>
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
          style={{height: '20px'}}
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
              style={{height: '20px'}}
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
      <button className="btn btn-primary"
              value={ expanded ? false : true }
              id={challenge.name}
              style={{ width: '60px', height: '20px',
                 margin:'3px', border:'0', padding:'0',
                 float:'right'}}
              onClick={props.onClick} >
      {expanded ? (
        "<< Less"
        ) : (
        "More >>"
        )
      }
      </button>
      <p>Mission: {challenge.hint}</p>
      { expanded  ?  challenge.description: null}
      <p/>
    </div>
  )
}

function ChallengeItem(props) {
  const {challenge, expandedItems, handleChange, handleClick} = props;
  const expanded = (expandedItems.indexOf(challenge.name) > -1);

  const panelColor = 'white';
  const headColor = 'white'; //#F0F8FF
  const maxColor = 'white';
  const ctrlColor = 'white';
  const descColor ='white';

  return(
    <div className="col-xs-6 col-lg-4"
      style={{ backgroundColor: panelColor, borderTop: '1px solid', borderBottomColor: 'LightGrey', padding: '7px'}}>
      <img className="image" src={"icons/2017/" + challenge.picture} alt={challenge.name}
        style={{ float:'left', top: '0', left: '0', width: '80px', height: '80px' }} />
      <h5 style={{ textAlign: 'right', backgroundColor: headColor}}>{challenge.name}</h5>
      <h5 style={{ backgroundColor: maxColor}}>Max {challenge.max} pts
        <div style={{ backgroundColor: ctrlColor, float:'right'}}>
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
        </div>
      </h5><br/>
      <Description
        challenge={challenge}
        expanded={expanded}
        style={{ backgroundColor: descColor}}
        onClick={handleClick}/>
    </div>
  )
}

function ChallengeList(props) {
  const {challenges, expandedItems, handleChange, handleClick} = props;
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
    const target = event.target.id.toString();

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
    const aTitle = 'Hydro-Dynamics';
    const aDescription ="A calculator for the First Lego League (FLL) 2017/2018 HYDRO DYNAMICS robot game."
    const aLink = '//www.firstinspires.org/robotics/fll/challenge-and-season-info';
    return (
      <div>
        <div className = "container">
          <div className = "row row-offcanvas row-offcanvas-right">
            <NavBar curScore={this.state.curScore} />
            <div className="col-xs-12 col-sm-9">
              <PageHeader Title = {aTitle}
                      Description = {aDescription}
                      aLink = {aLink} />
              <ChallengeList
                     challenges={this.state.stateChallenges}
                     expandedItems={this.state.expandedItems}
                     handleChange={this.handleChange}
                     handleClick={this.handleClick} />
            </div>
            <div>hi!</div>
            <Ad />
          </div>
        </div>
      </div>
    )
  }
}

const App = () => {
  return(
    <BrowserRouter>
      <div>
       <Switch>
         <Route exact path="/" component={FLLChallengeCalc} />
         <Route exact path="/fll2013challenge/" component={FLLChallengeCalc} />
         <Route path="/about" component={About} />
         <Route render={() => <h1> Not found!</h1>} />
       </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;

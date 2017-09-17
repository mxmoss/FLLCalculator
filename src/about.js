import React, {Component} from 'react';
import {BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';


function NavBar(props){
  return(
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/fll2013challenge">Hydro-Dynamics</a>
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavBar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="myNavBar">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to={'/fll2013challenge'}>Home</Link></li>
            <li className="active"><Link to={'/about'}>About</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


const About = () => (
  <div>
  <NavBar />
  <br/><br/>
  <h1>About!</h1>
  Written in React<p/>

  Available on <a href="https://github.com/mxmoss/fll2013challenge">GitHub</a><br/>

  Please <a href="https://github.com/mxmoss/fll2013challenge/issues">report any issues</a> you discover <br/>

  Follow <a href="https://twitter.com/mxmoss">me on twitter </a><br/>

  Like this app? Donate $2
  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
  <input type="hidden" name="cmd" value="_donations"></input>
  <input type="hidden" name="business" value="moss@agora.rdrop.com"></input>
  <input type="hidden" name="lc" value="BM"></input>
  <input type="hidden" name="item_name" value="Moss Drake"></input>
  <input type="hidden" name="amount" value="2.00"></input>
  <input type="hidden" name="currency_code" value="USD"></input>
  <input type="hidden" name="no_note" value="0"></input>
  <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest"></input>
  <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></input>
  <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></img>
  </form>
  </div>
)

export default About;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import FLL2013ChallengeCalc from './FLL2013Calc'
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<FLL2013ChallengeCalc />, document.getElementById('root'));

registerServiceWorker();

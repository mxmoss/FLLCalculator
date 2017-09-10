import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import FLLChallengeCalc from './FLLCalc'
import Ad from './GoogleAd'
import registerServiceWorker from './registerServiceWorker';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<FLLChallengeCalc />, document.getElementById('root'));

registerServiceWorker();

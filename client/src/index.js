import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'whatwg-fetch';
// import Image from "./images/background.png";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

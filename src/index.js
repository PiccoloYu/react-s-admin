import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import "antd/dist/antd.less";
import "animate.css";
import "../src/view/view.less";
import * as serviceWorker from './serviceWorker';
import "./mock";


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

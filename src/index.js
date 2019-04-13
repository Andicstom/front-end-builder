import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const leftStyle = {
    padding: '40px',
    border: '5px solid pink',
    width: '30%',
    background: 'green'
  }
  
  const rightStyle = {
    padding: '40px',
    border: '5px solid pink',
    width: '70%',
    background: 'orange'
  }

var tree = {
    title: "howdy",
        childNodes: [
        {type: "div"},
        {type: "div", childNodes: [
            {type: "div", style: leftStyle, childNodes: [
                {type: "p", value: 'Hello there!'},
                {type: "p"}
            ]},
            {type: "div", style: rightStyle }
        ]}
        ]
  };

ReactDOM.render(<App node={tree} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

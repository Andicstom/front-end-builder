import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let childNodes;
    if (this.props.node.childNodes != null) {
      childNodes = this.props.node.childNodes.map(function(node, index) {
        console.log(node.type + " " + index);
        let plusStyle = node.style || divStyle;
        let value = node.value || "";
        switch(node.type) {
          case 'div':
            return <div style={plusStyle} key={index}><App node={node} /></div>
          case 'p':
            return <p style={pStyle} key={index}>{value}<App node={node} /></p>
          default: 
            return <App node={node} />;
        }
      });
    }

    return (
      <React.Fragment>
        {childNodes}
      </React.Fragment>
    );
  }
}

const divStyle = {
  padding: '40px',
  border: '5px solid pink'
};

const pStyle = {
  padding: '10px',
  border: '5px solid blue'
};

export default App;

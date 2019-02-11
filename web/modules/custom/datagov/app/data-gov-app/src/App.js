import React, { Component } from 'react';
import './App.css';

import Threats from './Threats.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      threats: [],
    };
  }

  componentWillMount() {
    fetch('https://api.fda.gov/food/enforcement.json?search=report_date:[20040101+TO+20131231]&limit=100')
      .then(response => response.json())
      // .then(data => this.setState({ data }));
      .then(data => {
        this.setState({
          threats: data.results,
        })
      });
  }

  render () {
    return (
      <div className="App">
        <div>
          <Threats threatData={this.state.threats} />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Threats from './Threats'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      threats: [],
      disclaimer: '',
    };
  }

  componentDidMount() {
    // dates for our query
    const todaysDate = new Date()
    const range = new Date().setDate(todaysDate.getDate() - 200)
    const startDate = new Date(range)
    
    // format our dates for the api params
    function formatDate(date) {
      let d = date,
          year = d.getFullYear(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate();
      
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('');
    }

    const todaysDateFormated = formatDate(todaysDate)
    const rangeDateFormated = formatDate(startDate)

    fetch('https://api.fda.gov/food/enforcement.json?search=report_date:[' + rangeDateFormated + '+TO+' + todaysDateFormated + ']&limit=100')
      .then(response => response.json())
      .then(data => {

        function parseDate(results) {
          let resultList = [...results]
          // our sort function
          function compareDates(a, b) {
            const dateA = a.report_date
            const dateB = b.report_date

            if (dateA > dateB) {
              return -1
            } 
            if (dateA < dateB) {
              return 1
            }
            return 0
            }

          const sortedDates = resultList.sort(compareDates)
          return sortedDates
        }

        this.setState({
          disclaimer: data.meta.disclaimer,
          threats: parseDate(data.results),
        })
      });
  }

  render () {
    return (
      <div className="App">
        <div>
          <Threats threatData={this.state.threats} />
        </div>
        <div className="disclaimer">{this.state.disclaimer}</div>
      </div>
    );
  }
}

export default App;

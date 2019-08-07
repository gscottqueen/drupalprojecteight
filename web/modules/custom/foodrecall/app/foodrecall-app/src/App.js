import React, { Component } from 'react'
import './App.css'
import Recalls from './Recalls'
// import Checkbox from './Checkbox'
import Map from './Map/Map'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recalls: [],
      disclaimer: '',
      // checkboxes: classSelectOptions.reduce(
      //   (options, option) => ({
      //     ...options,
      //     [option]: false
      //   }),
      //   {}
      // )
    };
  }

  // start filters form

  // handleCheckboxChange = changeEvent => {
  //   const { name } = changeEvent.target;

  //   this.setState(prevState => ({
  //     checkboxes: {
  //       ...prevState.checkboxes,
  //       [name]: !prevState.checkboxes[name]
  //     }
  //   }));
  // };

  // createCheckboxes = () => classSelectOptions.map(this.createCheckbox);

  // createCheckbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={this.state.checkboxes[option]}
  //     onCheckboxChange={this.handleCheckboxChange}
  //     key={option}
  //   />
  // );

  // end filters form

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

    // get our zipcodes
    fetch('https://api.fda.gov/food/enforcement.json?search=report_date:[' + rangeDateFormated + '+TO+' + todaysDateFormated + ']&limit=100')
      .then(response => response.json())
      .then(data => {

        function sortDate(results) {
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
          recalls: sortDate(data.results),
        })
      });
  }

  render () {

    return (
      <div className="App">
      {!this.state.recalls.length ? null : <Map recallData={this.state.recalls}></Map>}
        <div className="disclaimer usa-alert usa-alert-info" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">About These Results</h3>
            <p className="usa-alert-text">{this.state.disclaimer}</p>
          </div>
        </div>
        {/* <form>
          {this.createCheckboxes()}
        </form> */}
        <Recalls recallData={this.state.recalls} />
      </div>
    );
  }
}

export default App;

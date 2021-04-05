import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    count: 2,
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({
      count: value
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label htmlFor="NumberofEvent"></label>
        <input
        type="number"
        name="NumberofEvent"
        placeholder="Enter Number of Events"
        className="eventNumber"
        value={this.state.count}
        onChange={this.NumberOfEvents}
        />
      </div>
    )
  }

}
export default NumberOfEvents;
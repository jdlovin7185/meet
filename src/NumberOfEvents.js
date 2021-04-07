import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    count: 2,
  }

  handleNumberChanged = (event) => {
    const count = event.target.value;
    this.setState({
      count,
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
        onChange={this.handleNumberOfEvents}
        />
      </div>
    );
  }

}
export default NumberOfEvents;
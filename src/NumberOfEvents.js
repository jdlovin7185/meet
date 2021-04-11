import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32
  }

  handleNumberChanged = (event) => {
    const eventCount = event.target.value;
    this.setState({
      eventCount,
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
        value={this.state.eventCount}
        onChange={this.handleNumberChanged}
        />
      </div>
    );
  }

}
export default NumberOfEvents;
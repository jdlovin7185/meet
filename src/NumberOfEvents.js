import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    eventCount: 32
  }

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.setState({
      eventCount: value,
    });
    if (value < 1) {
      this.setState({
        infoText: 'Please pick a number between 1 and 32',
      });
    } else {
       this.setState({
        infoText: ''
      });
    }
  };

  render() {
    const { eventCount } = this.state;
    return (
      <div className="NumberOfEvents">
        <label>Number of Events: </label>
        <input
        type="number"
        name="NumberofEvent"
        placeholder="Enter Number of Events"
        className="numberOfEvents"
        value={eventCount}
        onChange={this.handleNumberChanged}
        />
        <ErrorAlert text={this.state.infoText} />
      </div>
    );
  }

}
export default NumberOfEvents;
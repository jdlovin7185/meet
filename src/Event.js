import React, { Component } from "react";


class Event extends Component {

  state = {
    hideDetails: false,
  };

  handleShowDetails = () => {
    if (this.state.hideDetails === false) {
      this.setState({ hideDetails: true });
    } else {
      this.setState({ hideDetails: false });
    }
  };

  render() {
    const { event } = this.props;
    return (
    <div className="Event">
      <h1>{event.summary}</h1>
      <p>{event.start.dateTime}</p>
      <p className="locations">{event.location}</p>

      {this.state.hideDetails && (
        <div className="detailsCollapsed">
          <h1>About Event:</h1>
          <a className="googleEvent" href={event.htmlLink}>
            See details on Google Calendar
          </a>
          <p>{event.description}</p>
        </div>
      )}
      <button className="detailsBtn" onClick={() => this.handleShowDetails()}>{!this.state.hideDetails ? "Show Details" : "Hide Details" }</button>
    </div>
    )
  }
}

export default Event;
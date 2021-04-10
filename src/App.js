import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {

  state = {
    events: [],
    locations: [],
    eventCount: 2
  }

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      if (location === 'all') {
        locationEvents = events.slice(0, eventCount);
      } else {
        locationEvents = events.filter((event) => event.location === location)
        .slice(0, eventCount); 
      }
      this.setState({
        events: locationEvents,
        eventCount
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ events: events.slice(0, this.state.eventCount), locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <NumberOfEvents 
        updateEvents={this.updateEvents}
        eventCount={this.state.eventCount}
        />
        <CitySearch 
        locations={this.state.locations} 
        updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;

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
    eventCount: 32,
    selectedLocation: 'all'
  }

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      const count = eventCount || this.state.eventCount;
      const selectedLocation = location || this.state.selectedLocation;

      if (selectedLocation === 'all') {
        locationEvents = events.slice(0, count);
      } else {
        locationEvents = events.filter((event) => event.location === selectedLocation)
        .slice(0, count); 
      }
      this.setState({
        events: locationEvents,
        eventCount: count,
        selectedLocation
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
        <CitySearch 
        locations={this.state.locations} 
        updateEvents={this.updateEvents}
        />
        <NumberOfEvents 
        updateEvents={this.updateEvents}
        eventCount={this.state.eventCount}
        />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;

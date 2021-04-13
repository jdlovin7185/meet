import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  };

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
    const { locations, eventCount } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          eventCount={eventCount}
        />       
         <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
         <ScatterChart
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;

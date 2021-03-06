import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents, checkToken } from './api';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import Login from './Login';
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

  async componentDidMount() {
    const accessToken =
      localStorage.getItem('access_token');
    const validToken = accessToken !== null ? await checkToken (accessToken) : false;
    this.setState({ tokenCheck: validToken });
    if (validToken === true) this.updateEvents()
    const searchParams = new
    URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.mounted = true;
    if (code && this.mounted === true && validToken === false){
      this.setState({tokenCheck:true});
      this.updateEvents()
    }
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
    const { locations, eventCount, events, tokenCheck } = this.state;
    return tokenCheck === false ? (
      <div className="App">
        <Login />
      </div>
    ) : (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          eventCount={eventCount}
        />       
         <h4>Events in each city</h4>
         <div className="data-vis-wrapper">
         <EventGenre events={events} />
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
      </div>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber')).toHaveLength(1);
  });

  test('renders a list of 2 events', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber').at(0).props().value).toEqual(2);
  });

  test('renders a placeholder for text box', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber').at(0).props().placeholder).toEqual('Enter Number of Events');
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      count: 5
    });
    const numberObject = { target: { number: 5 }};
    NumberOfEventsWrapper.find('.eventNumber').simulate('change', numberObject);
    expect(NumberOfEventsWrapper.state('count')).toBe(5); 
  });

  test('check type is equal to number', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber').at(0).props().type).toEqual("number");
  });

})
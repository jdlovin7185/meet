import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('renders a list of events', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').at(0).props().value).toEqual(32);
  });

  test('renders a placeholder for text box', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').at(0).props().placeholder).toEqual('Enter Number of Events');
  });

  test('change state when number input changes', () => {
    const numberObject = { target: { value: 1 }};
    NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', numberObject);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(1); 
  });

  test('check type is equal to number', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').at(0).props().type).toEqual("number");
  });

})
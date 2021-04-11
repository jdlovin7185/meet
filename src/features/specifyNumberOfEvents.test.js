import React from 'react';
import { mockData } from '../mock-data';
import { mount } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature,test => {

  test('When user hasn\'t input a number for events, showing 2 events be default', ({ given, when, then }) => {
    given('user hasn\'t input number for events to see', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a default number of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });
});

test('When user inputs a specific number of events to see', ({ given, when, then }) => {
  
  let AppWrapper;
  given('the user was typing "2" in the number of events text box', async() => {
    AppWrapper = await mount(<App />);
    AppWrapper.find('.NumberOfEvents').simulate('change', {
      target: { value: 2 }
    });
    });

    when('the number of events is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event')).toHaveLength(2);
    });

    then('the user should receive a specified number of events', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(2);
    });
});

});
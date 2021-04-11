import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import { mockData } from '../mock-data';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');


defineFeature(feature, test => {

  test('When user clicks Show Details button', ({ given, when, then }) => {
    given('the main page is open', () => {
      
    });
    
    let AppWrapper;
    when('the user clicks Show Details', async () => {
      AppWrapper = await mount (<App />);
      await AppWrapper.update();
      AppWrapper.find('.Event .detailsBtn').at(0).simulate('click');
    });

    then('the user should receive the details of an event', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });
});

test('When user clicks Hide Details', ({ given, and, when, then }) => {
  let AppWrapper;
    given('user has clicked \'Show Details\' button', async() => {
      AppWrapper = await mount (<App />);
      await AppWrapper.update();
      AppWrapper.find('.Event .detailsBtn').at(0).simulate('click');
    });

    and('the details of event are showing', () => {
      expect(AppWrapper.find('.Event')).toHaveLength(mockData.length);
    });

    when('the user selects Hide Details', async() => {
      AppWrapper = await mount (<App />);
      await AppWrapper.update();
      AppWrapper.find('.Event .detailsBtn').at(0).simulate('click');
    });

    then('the user should see the event without description', () => {
      expect(AppWrapper.find('.event_Details')).toHaveLength(0);
    });
});

});
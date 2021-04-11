Feature: Filter events by number

Scenario: When user hasn't input a number for events, showing 2 events be default
Given user hasn't input number for events to see
When the user opens the app
Then the user should see a default number of events

Scenario: When user inputs a specific number of events to see
Given the user was typing "2" in the number of events text box
When the number of events is showing
Then the user should receive a specified number of events
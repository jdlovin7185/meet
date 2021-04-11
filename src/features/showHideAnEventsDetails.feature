Feature: Show/Hide event details

Scenario: When user clicks Show Details button
Given the main page is open
When the user clicks Show Details 
Then the user should receive the details of an event

Scenario: When user clicks Hide Details
Given user has clicked 'Show Details' button
And the details of event are showing 
When the user selects Hide Details
Then the user should see the event without description
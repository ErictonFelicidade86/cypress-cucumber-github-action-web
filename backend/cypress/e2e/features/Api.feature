Feature: API Testing with Cypress and Cucumber

  Scenario: End-to-End API testing for user creation and book reservation

    Given I check if the user exists and delete if necessary
    And I create a new user
    When I generate an access token
    And I verify the user is authorized
    Then I fetch the list of available books
    And I reserve two books of my choice
    Then I verify the user details with the reserved books

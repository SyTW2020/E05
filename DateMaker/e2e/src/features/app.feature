Feature: Go to the home 
    Display the title

    Scenario: Home Page
        Given I am on the home page
        When I do nothing
        Then I should see the tittle
    Scenario: Login page
        Given I am on the login page
        When I do nothing
        Then I should see the login form
    Scenario: Login page
        Given I am on the signup page
        When I do nothing
        Then I should see the signup form
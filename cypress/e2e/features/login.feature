Feature: Login

Scenario: Login user with correct email and password
  Given I navigate to Travelly web page
  When I click log in button on home page
  When Provide email "soniamalish17@gmail.com"
  When Provide password "`Root123!"
  When Submit login form
  Then I am logged in

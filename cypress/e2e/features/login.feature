Feature: Login

Scenario: Login user with correct email and password
  Given I navigate to Travelly web page
  When I click log in button on home page
  When Provide email "katewilinton@gmai.com"
  When Provide password "Kate123!"
  When Submit login form
  Then I am logged in

Scenario: Login user with incorrect email
  Given I navigate to Travelly web page
  When I click log in button on home page
  When Provide email "soniamalish18@gmail.com"
  When Provide password "Root123!"
  When Submit login form
  Then I am notified about not existed email

Scenario: Login user with incorrect password
  Given I navigate to Travelly web page
  When I click log in button on home page
  When Provide email "soniamalish17@gmail.com"
  When Provide password "Root1234!"
  When Submit login form
  Then I am notified about provided incorect password

Scenario: Login user without providing email and password
  Given I navigate to Travelly web page
  When I click log in button on home page
  When Submit login form
  Then I am asked to provide email and password

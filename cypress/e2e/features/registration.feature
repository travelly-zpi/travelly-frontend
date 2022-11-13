Feature: Registration

Scenario: Registration with correct data
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Provide name "Agata"
  When Provide surname "Kowalska"
  When Provide registration email "agata123@gmail.com"
  When Provide first time password "Agata123!"
  When Provide second time password "Agata123!"
  When Click register button
  Then I get a nsotification about sent activation link and redirected to login screen

Scenario: Registration with not all complited fields
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Provide name "Agata"
  When Provide first time password "Agata1234!"
  When Provide second time password "Agata1234!"
  When Click register button
  Then I see 2 validation messages 

Scenario: Registration without any data
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Click register button
  Then I see 5 validation messages 

Scenario: Registration when password is not according pattern
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Provide name "Agata"
  When Provide surname "Kowalska"
  When Provide registration email "agata1234@gmail.com"
  When Provide first time password "Agata1234"
  Then  I see 2 validation messages


Scenario: Registration when password provided second time does not match 
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Provide name "Agata"
  When Provide surname "Kowalska"
  When Provide registration email "agata1234@gmail.com"
  When Provide first time password "Agata1234!"
  When Provide second time password "Agata123"
  Then  I see 1 validation messages

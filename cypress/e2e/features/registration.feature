Feature: Registration

Scenario: Registration with correct data
  Given I navigate to Travelly web page
  When I click registaration button on home page
  When Provide name "Agata"
  When Provide surname "Kowalska"
  When Provide registration email "agatakowalska1@gmail.com"
  When Provide first time password "Agata123!"
  When Provide second time password "Agata123!"
  # When Click register button
  # Then user gets a notification about sent activation link and redirected to login screen




# Scenario: Registration without any data

# Scenario: Registration when password is not according pattern

# Scenario: Registration when password provided second time does not match 

# Scenario: Registration without all complited fields

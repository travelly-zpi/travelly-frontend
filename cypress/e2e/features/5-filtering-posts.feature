Feature: Post filtering

Scenario: User can find post according key words
  Given I navigate to Travelly web page and log in with proper credentials
  When  I move to the board page
  When  I provide key word in search and submit
  Then  I get results of searching

Scenario: User can find post Accomodation post according special criterias
  Given I navigate to Travelly web page and log in with proper credentials
  When  I move to the board page
  When  I move to "Accommodation" tab
  When  I provide location "Budapest, Hungary"
  # When  I provid dates
  When I provide number of people
  Then I get result of filtering

Scenario: User can find post Carpooling post according special criterias
  Given I navigate to Travelly web page and log in with proper credentials
  When  I move to the board page
  When  I move to "Carpooling" tab
  When  I provide location from "Rome, Rome, Italy"
  When  I provide location to "Wrocław"
  When  I select date
  When  I provide number of people
  Then  I get result of filtering
  
Scenario: User can find post Trip together post according special criterias
  Given I navigate to Travelly web page and log in with proper credentials
  When  I move to the board page
  When  I move to "Trip together" tab
  When  I provide location from "Budapest, Hungary"
  When  I provide location to "Rome, Rome, Italy"
  When  I select date
  Then  I get result of filtering

Scenario: User can find post Excursion post according special criterias
  Given I navigate to Travelly web page and log in with proper credentials
  When  I move to the board page
  When  I move to "Excursion" tab
  When  I provide location "Wrocław"
  Then  I get result of filtering
  
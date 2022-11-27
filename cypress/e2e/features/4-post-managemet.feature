Feature: Post management

Scenario: User create new post 
  Given I navigate to Travelly web page and log in with proper credentials
  When I click create new post
  When I fill all necessary fields for type of post - Accomodation
  When I click create post button
  Then I see success message and new post appears in my profile

Scenario: User deletes active post from his/her profile
  Given I navigate to Travelly web page and log in with proper credentials
  When I click delete active post
  When I confirm delete
  Then I see success message and my post dissapear from active section

Scenario: User deletes inactive post from his/her profile
  Given I navigate to Travelly web page and log in with proper credentials
  When I move to inactive posts section
  When I click delete inactive post
  When I confirm delete
  Then I see success message and my post dissapear from inactive section

Scenario: User deactivates post from his/her profile
  Given I navigate to Travelly web page and log in with proper credentials
  When I click disactivate post
  When I confirm disactivation
  Then I see success message and my post dissapear from active section and move to inactive section

Scenario: User activates post from his/her profile
  Given I navigate to Travelly web page and log in with proper credentials
  When I move to inactive posts section
  When I click activate post
  When I confirm activation
  Then I see success message and my post dissapear from inactive section

Scenario: User edits post from his/her profile
  Given I navigate to Travelly web page and log in with proper credentials
  When I click edit post
  When I edit some fields
  When I click save button
  Then I see success message and my updated post is visible in active section

Scenario: User can see details of his own active post
  Given I navigate to Travelly web page and log in with proper credentials
  When I click more in my active post
  Then I see details page of my active post

Scenario: User can see details of his own inactive post
  Given I navigate to Travelly web page and log in with proper credentials
  When I move to inactive posts section
  When I click more in my inactive post
  Then I see details page of my inactive post

Scenario: User activates post from details of his/her post
  Given I navigate to Travelly web page and log in with proper credentials
  When I move to inactive posts section
  When I click more in my inactive post
  When I click switch on post page
  When I confirm activation
  Then I see details page of my active post

Scenario: User disactivates post from details of his/her post
  Given I navigate to Travelly web page and log in with proper credentials
  When I click more in my active post
  When I click switch on post page
  When I confirm disactivation
  Then I see details page of my inactive post

Scenario: User deletes post from details of his/her post
  Given I navigate to Travelly web page and log in with proper credentials
  When I click more in my active post
  When I click delete button on post page
  When I confirm delete
  Then I see success message and redirectes to my profile page

Scenario: User edits post from details of his/her post
  Given I navigate to Travelly web page and log in with proper credentials
  When I click more in my active post
  When I click edit button on post page
  When I edit some fields
  When I click save button
  Then I see success message and I am on my updated post page

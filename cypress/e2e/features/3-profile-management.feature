Feature: Profile managemet

Scenario: User complete his/her profile with detailed information after first login
  Given I navigate to Travelly web page and log in
  When I see modal with empty fields
  Then I complete all these fields with appropriative information and redirected on my profile page

Scenario: User edits his/her and wants to remove some values from obligatory fields
  Given I navigate to Travelly web page and log in
  When I click edit my profile
  When I clear 2 obligatory fields
  Then I see 2 validation messages

Scenario: User edits his/her profile with appropriate data
  Given I navigate to Travelly web page and log in
  When I click edit my profile
  When I edit some fields in my profile
  When I save edited data 
  Then I see that updated data in my profile

Scenario: User change password in his/her profile
  Given I navigate to Travelly web page and log in
  When I click edit my profile
  When I move to the tab for changing password
  When I provide my old password "szaszlyk123!"
  When I provide my new password first time "Password123!"
  When I provide my new password second time "Password123!"
  When I save new password
  Then I can log in with a new password "Password123!"

# reactjs-BugTracker
Track issues with bug tracker

# Build
* Created an express api \(Mongodb for database, Node, Express\)
* JSON web token for authentication and protect routes
* Used React Hooks for managing state \(useReducer, useContext\)
* Used express-validator to validate the data that being sent to DB

### Features
* Designed using Bootstrap 4
* Add | Edit issues with Bootstrap modals
* Filterable issue list
* Register | Log-in | Log-out system that use JWT for authentication
* Register | Log-in form validation

# Update history
## Version 1.0.1
* fixed name validation when registering name as "space"
* fixed email validation when registering email as "space"
* corrected the email format
* fixed add issue form using "space or starting with space and special characters are not allowed
* status can only be updated using edit
* edit and delete button is disabled if the status is close

# Changelog
* Added side navbar
* Remodeled issue item list
* Added bootstrap modals for adding and updating issues

# Bugs History
1. No error prompt when input is "name@gmail" in email field
1. No error prompt when adding issue without input in issue field
1. accepting "space" in issue field
1. edit and delete button field should be disabled once issue is closed
1. when adding issue, close option in status should be status*
1. fixed when updating issue with the current user is not updating the db

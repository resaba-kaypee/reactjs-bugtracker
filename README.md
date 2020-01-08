# reactjs-BugTracker
Track issues with bug tracker

### uses
* created using my own api(Mongodb for database, Node, Express)
* JSON web token for authentication and protect routes
* context api for managing state(useReducer, useContext)
* express-validator to validate the data that being sent to DB

### features
* register
* login
* manage issues
* email validation
* edit/update issues
* filter list

# Bugs
1. No error prompt when input is "name@gmail" in email field
1. No error prompt when adding issue without input in issue field
1. accepting "space" in issue field
1. edit and delete button field should be disabled once issue is closed
1. when adding issue, close option in status should be status*

# Update history
Version 1.0.1
* fixed name validation when registering name as "space"
* fixed email validation when registering email as "space"
* corrected the email format
* fixed add issue form using "space or starting with space and special characters are not allowed
* status can only be updated using edit
* edit and delete button is disabled if the status is close
# reactjs-BugTracker
Track issues with Bug Tracker

# Technologies
* Created an express api \(Mongodb for database, Node, Express\)
* JSON web token for authentication and protect routes
* Used React Hooks for managing state \(useReducer, useContext\)
* Used express-validator to validate the data that being sent to DB

### Features
* Designed using Bootstrap 4
* Create projects and tracks bugs
* Add | Edit issues with Bootstrap modals
* Filterable issue and projects list
* Register | Log-in | Log-out system that use JWT for authentication
* Register | Log-in form validation

# Update history
## Version 1.0.1
* Fixed when admin is adding a user it redirects to user dashboard
* Fixed when logging in as admin it redirects to user dashboard
* Fixed name validation when registering name as "space"
* Fixed email validation when registering email as "space"
* Corrected the email format
* Fixed add issue form using "space or starting with space and special characters are not allowed
* Status can only be updated using edit
* Edit and delete button is disabled if the status is close

# Changelog
* Add comments to issue
* Assign users to projects
* Can now create, get, update and delete project
* Added users logger
* Only admins can add a user
* You can log in as user or admin
* Added side navbar
* Remodeled issue item list
* Added bootstrap modals for adding and updating issues

# Bugs to fix
[ ] Alert errors stacking up when making continous input errors in all forms
[x] Invalid regex when using special characters in all search function
[x] Issue can be edited by user even if status is close
[x] When adding a user/ admin that already in db It shows the error alert and success alert
[x] When adding new admin/user context not making a proper check if a admin/user already exist
[x] When adding a user as admin it redirects to user dashboard
[x] When logging in as admin it redirects to user dashboard
[x] No error prompt when input is "name@gmail" in email field
[x] No error prompt when adding issue without input in issue field
[x] accepting "blank" in issue field
[x] edit and delete button field should be disabled once issue is closed
[x] when adding issue, close option in status should be status*
[x] fixed when updating issue with the current user is not updating the db

# Todos
[x] Only admin can register user or add another admin
[x] Make users logs
[x] Only admin can close the issue
[x] add delete user at auth admin state
[x] UPDATE PROJECT - can add the tech again to the same project
[x] change project.techs document model to have an _id
[x] addTech and removeTech is making the same api call
[x] fix users logout logs in server
[x] fix users logs in client and in server
[x] addTech to project can add blank user to list
[x] added admin profile welcome page
[x] cant perform a state on unmounted ??? in profile.js
[x] all modals have padding-right makes it off center
[x] Remodel UI
[x] when redirecting unauthorized access its flashes the content before redirecting
[x] from admin dashboard- can access user/projects
[x] in updateproject form when updateproject button is click updatetech is also triggered
[ ] send message from server to client for every successful or failed api call
[ ] delete all comments in all components
[ ] should focus to required input fields when there is validation error
[ ] authAdminstate has users object before logging in
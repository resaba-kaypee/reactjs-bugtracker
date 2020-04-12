# About BugTracker
It is Node.js Express MongoDB React + Hooks App where you can create a project and track down issues

# Technologies
* Node.js
* Express js
* MongoDB + Mongoose for database
* Bcrypt to hash password
* JSON web token for authentication and protect routes
* Express-validator to validate the data that being sent to DB
* React + Hooks for client

### Features
* Create projects
* View projects status
* Reister a new user or admin
* Assign users to a project
* Report issues to specific project
* Track issue progress
* Designed using Bootstrap 4
* Create, read, update or delete issues/projects with Bootstrap modals
* Filterable issue and projects list
* Log-in and register form validation with custom react hooks
* Register, log-in, log-out system that use JWT for authentication

# Update history
## Version 1.0.1
* Fixed when admin is adding a user it redirects to user dashboard
* Fixed when logging in as admin it redirects to user dashboard
* Fixed name validation when registering name as "space"
* Fixed email validation when registering email as "space"
* Corrected the email format
* Fixed add issue form using "space or starting with space and special characters are not allowed
* Status can only be updated using edit

# Changelog
* Add comments to issue
* Assign users to projects
* Can now create, get, update and delete project
* Added users logger
* Only admins can register a user
* You can log in as user or admin
* Added side navbar
* Redesigned issue/project item list
* Added bootstrap modals for adding and updating issues
* Added user homepage

# Bugs to fix
* [ ] Alert errors stacking up when making continous input errors in all forms
* [x] Invalid regex when using special characters in all search function
* [x] Issue can be edited by user even if status is close
* [x] When adding a user/ admin that already in db It shows the error alert and success alert
* [x] When adding new admin/user context not making a proper check if a admin/user already exist
* [x] When adding a user as admin it redirects to user dashboard
* [x] When logging in as admin it redirects to user dashboard
* [x] No error prompt when input is "name@gmail" in email field
* [x] No error prompt when adding issue without input in issue field
* [x] accepting "blank" in issue field
* [x] edit and delete button field should be disabled once issue is closed
* [x] when adding issue, close option in status should be status*
* [x] fixed when updating issue with the current user is not updating the db
* [x] fixed users logout logs in server
* [x] fixed users logs in client and in server
* [x] UPDATE PROJECT - can add the tech again to the same project
* [x] addTech and removeTech is making the same api call
* [x] cant perform a state on unmounted ??? in profile.js
* [x] all modals have padding-right makes it off center
* [x] when redirecting unauthorized access its flashes the content before redirecting
* [x] in updateproject form when updateproject button is click updatetech is also triggered

# Todos
* [x] Only admin can register user or add another admin
* [x] Make users logs
* [x] Only admin can close the issue
* [x] add delete user at auth admin state
* [x] change project.techs document model to have an _id
* [x] addTech to project can add blank user to list
* [x] added admin profile welcome page
* [x] Remodel UI
* [x] from admin dashboard- can access user/projects
* [x] send message from server to client for every successful or failed api call
* [x] implement cookie to store token instead of localstorage
* [x] authAdminstate has users object before logging in
* [x] delete all unimportant comments in all components
* [ ] should focus to required input fields when there is validation error
* [ ] make admins have their own team of users and projects to track
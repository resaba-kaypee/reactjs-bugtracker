import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const About = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const { role } = useParams();

  if (user && user.role !== role) {
    return <Redirect to={`/${user.role}/home`} />;
  }

  return (
    <div className="card card-custom shadow bg-white rounded">
      <div className="card-header bg-dark text-light shadow-sm">
        <span className="h4">
          <i className="fas fa-list-alt"></i> About the App
        </span>
      </div>
      <div className="card-body" style={{overflowY: "scroll"}}>
        <h1 id="about-bugtracker">About BugTracker</h1>
        <p>
          It is Node.js Express MongoDB React + Hooks App where you can create a
          project and track down issues
        </p>
        <h3 id="technologies">Technologies</h3>
        <ul>
          <li>Node.js</li>
          <li>Express js</li>
          <li>MongoDB + Mongoose for database</li>
          <li>Bcrypt to hash password</li>
          <li>JSON web token for authentication and protect routes</li>
          <li>Express-validator to validate the data that being sent to DB</li>
          <li>React + Hooks for client</li>
        </ul>
        <h3 id="features">Features</h3>
        <ul>
          <li>Create projects</li>
          <li>View projects status</li>
          <li>Reister a new user or admin</li>
          <li>Assign users to a project</li>
          <li>Report issues to specific project</li>
          <li>Track issue progress</li>
          <li>Designed using Bootstrap 4</li>
          <li>
            Create, read, update or delete issues/projects with Bootstrap modals
          </li>
          <li>Filterable issue and projects list</li>
          <li>Log-in and register form validation with custom react hooks</li>
          <li>
            Register, log-in, log-out system that use JWT for authentication
          </li>
        </ul>
        <h1 id="update-history">Update history</h1>
        <h3 id="version-1-0-1">Version 1.0.1</h3>
        <ul>
          <li>
            Fixed when admin is adding a user it redirects to user dashboard
          </li>
          <li>Fixed when logging in as admin it redirects to user dashboard</li>
          <li>
            Fixed name validation when registering name as &quot;space&quot;
          </li>
          <li>
            Fixed email validation when registering email as &quot;space&quot;
          </li>
          <li>Corrected the email format</li>
          <li>
            Fixed add issue form using &quot;space or starting with space and
            special characters are not allowed
          </li>
          <li>Status can only be updated using edit</li>
        </ul>
        <h1 id="changelog">Changelog</h1>
        <ul>
          <li>Add comments to issue</li>
          <li>Assign users to projects</li>
          <li>Can now create, get, update and delete project</li>
          <li>Added users logger</li>
          <li>Only admins can register a user</li>
          <li>You can log in as user or admin</li>
          <li>Added side navbar</li>
          <li>Redesigned issue/project item list</li>
          <li>Added bootstrap modals for adding and updating issues</li>
          <li>Added user homepage</li>
        </ul>
        <h1 id="bugs-to-fix">Fixed bugs</h1>
        <ul>
          <li>
            <input readOnly type="checkbox" checked={false} /> Alert errors
            stacking up when making continous input errors in all forms
          </li>
          <li>
            <input readOnly type="checkbox" checked /> Invalid regex when using
            special characters in all search function
          </li>
          <li>
            <input readOnly type="checkbox" checked /> Issue can be edited by
            user even if status is close
          </li>
          <li>
            <input readOnly type="checkbox" checked /> When adding a user/ admin
            that already in db It shows the error alert and success alert
          </li>
          <li>
            <input readOnly type="checkbox" checked /> When adding new
            admin/user context not making a proper check if a admin/user already
            exist
          </li>
          <li>
            <input readOnly type="checkbox" checked /> When adding a user as
            admin it redirects to user dashboard
          </li>
          <li>
            <input readOnly type="checkbox" checked /> When logging in as admin
            it redirects to user dashboard
          </li>
          <li>
            <input readOnly type="checkbox" checked /> No error prompt when
            input is &quot;name@gmail&quot; in email field
          </li>
          <li>
            <input readOnly type="checkbox" checked /> No error prompt when
            adding issue without input in issue field
          </li>
          <li>
            <input readOnly type="checkbox" checked /> accepting
            &quot;blank&quot; in issue field
          </li>
          <li>
            <input readOnly type="checkbox" checked /> edit and delete button
            field should be disabled once issue is closed
          </li>
          <li>
            <input readOnly type="checkbox" checked /> when adding issue, close
            option in status should be status*
          </li>
          <li>
            <input readOnly type="checkbox" checked /> fixed when updating issue
            with the current user is not updating the db
          </li>
          <li>
            <input readOnly type="checkbox" checked /> fixed users logout logs
            in server
          </li>
          <li>
            <input readOnly type="checkbox" checked /> fixed users logs in
            client and in server
          </li>
          <li>
            <input readOnly type="checkbox" checked /> UPDATE PROJECT - can add
            the tech again to the same project
          </li>
          <li>
            <input readOnly type="checkbox" checked /> addTech and removeTech is
            making the same api call
          </li>
          <li>
            <input readOnly type="checkbox" checked /> cant perform a state on
            unmounted ??? in profile.js
          </li>
          <li>
            <input readOnly type="checkbox" checked /> all modals have
            padding-right makes it off center
          </li>
          <li>
            <input readOnly type="checkbox" checked /> when redirecting
            unauthorized access its flashes the content before redirecting
          </li>
          <li>
            <input readOnly type="checkbox" checked /> in updateproject form
            when updateproject button is click updatetech is also triggered
          </li>
        </ul>
        <h1 id="todos">Todos</h1>
        <ul>
          <li>
            <input readOnly type="checkbox" checked /> Only admin can register
            user or add another admin
          </li>
          <li>
            <input readOnly type="checkbox" checked /> Make users logs
          </li>
          <li>
            <input readOnly type="checkbox" checked /> Only admin can close the
            issue
          </li>
          <li>
            <input readOnly type="checkbox" checked /> add delete user at auth
            admin state
          </li>
          <li>
            <input readOnly type="checkbox" checked /> change project.techs
            document model to have an _id
          </li>
          <li>
            <input readOnly type="checkbox" checked /> addTech to project can
            add blank user to list
          </li>
          <li>
            <input readOnly type="checkbox" checked /> added admin profile
            welcome page
          </li>
          <li>
            <input readOnly type="checkbox" checked /> Remodel UI
          </li>
          <li>
            <input readOnly type="checkbox" checked /> from admin dashboard- can
            access user/projects
          </li>
          <li>
            <input readOnly type="checkbox" checked /> send message from server
            to client for every successful or failed api call
          </li>
          <li>
            <input readOnly type="checkbox" checked /> implement cookie to store
            token instead of localstorage
          </li>
          <li>
            <input readOnly type="checkbox" checked /> authAdminstate has users
            object before logging in
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} /> delete all
            unimportant comments in all components
          </li>
          <li>
            <input readOnly type="checkbox" checked={false} /> should focus to
            required input fields when there is validation error
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;

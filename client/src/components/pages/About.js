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
    <div>
      <h1>About this App</h1>
      <p className="my-1">This is a full stack react app for tracking bugs</p>
      <p className="bg-dark p">
        <strong>Version</strong> 1.0.0
      </p>
    </div>
  );
};

export default About;

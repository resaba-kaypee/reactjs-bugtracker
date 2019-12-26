import React, { useContext, useEffect } from "react";
import Issues from "../issues/Issues";
import IssueForm from "../issues/IssueForm";
import IssueFilter from "../issues/IssueFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, [])
  return (
    <div className="grid-2">
      <div>
        <IssueForm />
      </div>
      <div>
        <IssueFilter />
        <Issues />
      </div>
    </div>
  );
};

export default Home;

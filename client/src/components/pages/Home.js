import React from "react";
import Issues from "../issues/Issues";
import IssueForm from "../issues/IssueForm";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <IssueForm />
      </div>
      <div>
        <Issues />
      </div>
    </div>
  );
};

export default Home;

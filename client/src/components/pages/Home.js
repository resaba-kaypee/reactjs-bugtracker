import React from "react";
import Issues from "../issues/Issues";
import IssueForm from "../issues/IssueForm";
import IssueFilter from "../issues/IssueFilter";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <IssueForm />
      </div>
      <div>
        <IssueFilter/>
        <Issues />
      </div>
    </div>
  );
};

export default Home;

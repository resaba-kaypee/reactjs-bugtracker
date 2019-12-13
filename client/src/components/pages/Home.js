import React from "react";
import Issues from "../issues/Issues";

const Home = () => {
  return (
    <div className="grid-2">
      <div>Issue Form</div>
      <div>
        <Issues/>
      </div>
    </div>
  );
};

export default Home;

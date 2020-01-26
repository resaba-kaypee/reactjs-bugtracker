import React, { useState } from "react";

const Button = () => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClick = () => {
    setIsClosing(!isClosing);
  };

  return (
    <div
      className={"burger-click-region " + (isClosing ? "closing" : "active")}
      onClick={handleClick}
    >
      <span className="burger-menu-piece" />
      <span className="burger-menu-piece" />
      <span className="burger-menu-piece" />
    </div>
  );
};

export default Button;

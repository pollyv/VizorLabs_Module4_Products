import React from "react";

import "./Button.css";

const Button = ({
  onClick,
  children,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
}) => {
  const classNames = `btn btn-${variant} btn-${size} ${className}`;

  return (
    <button onClick={onClick} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

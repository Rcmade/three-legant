import React from "react";

const LockIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 14H10M26 14C30.4183 14 34 17.5817 34 22V34C34 38.4183 30.4183 42 26 42H10C5.58172 42 2 38.4183 2 34V22C2 17.5817 5.58172 14 10 14M26 14V10C26 5.58172 22.4183 2 18 2C13.5817 2 10 5.58172 10 10V14M18 30V26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LockIcon;

import React from "react";

const TruckIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      width="1em"
      height="1em"
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 34V10M26 34H30M26 34H16M26 10C26 5.58172 22.4183 2 18 2H10C5.58172 2 2 5.58172 2 10V26C2 29.7304 4.55333 32.8645 8.00769 33.7499M26 10H32.4182C33.4344 10 34.4126 10.3868 35.154 11.0819L40.7358 16.3148C41.5424 17.071 42 18.1273 42 19.2329V30C42 32.2091 40.2091 34 38 34M38 34C38 36.2091 36.2091 38 34 38C31.7909 38 30 36.2091 30 34M38 34C38 31.7909 36.2091 30 34 30C31.7909 30 30 31.7909 30 34M16 34C16 36.2091 14.2091 38 12 38C9.79086 38 8 36.2091 8 34C8 33.916 8.00259 33.8326 8.00769 33.7499M16 34C16 31.7909 14.2091 30 12 30C9.87484 30 8.13677 31.6573 8.00769 33.7499"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default TruckIcon;

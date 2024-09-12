import React from 'react';

function Favorites(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none">
      <rect width={39.849} height={40} x={0.788} fill="#fff" rx={19.924} />
      <path
        fill={props.color ? props.color : 'url(#paint0_linear_117_5860)'}
        d="m22.436 11.51 1.753 3.52c.239.49.877.96 1.415 1.05l3.177.53c2.033.34 2.51 1.82 1.046 3.28l-2.47 2.48c-.419.42-.648 1.23-.518 1.81l.707 3.07c.558 2.43-.727 3.37-2.869 2.1l-2.979-1.77c-.538-.32-1.424-.32-1.972 0l-2.979 1.77c-2.132 1.27-3.427.32-2.869-2.1l.707-3.07c.13-.58-.1-1.39-.518-1.81l-2.47-2.48c-1.455-1.46-.986-2.94 1.046-3.28l3.178-.53c.528-.09 1.165-.56 1.404-1.05l1.754-3.52c.956-1.91 2.51-1.91 3.457 0Z"
      />
      <defs>
        <linearGradient
          id="paint0_linear_117_5860"
          x1="12.0001"
          y1="2"
          x2="12.0001"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009DE0" />
          <stop offset="1" stopColor="#30D5C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Favorites;

import React from 'react';

function ClassicView(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none">
      <rect width={40} height={40} fill="#fff" rx={20} />
      <path
        fill="url(#paint0_linear_117_5860)"
        d="M29.388 18.9v-6.8c0-1.5-.637-2.1-2.221-2.1h-4.025c-1.584 0-2.221.6-2.221 2.1v6.8c0 1.5.637 2.1 2.221 2.1h4.025c1.584 0 2.221-.6 2.221-2.1ZM18.928 21.1v6.8c0 1.5-.637 2.1-2.221 2.1h-4.025c-1.584 0-2.222-.6-2.222-2.1v-6.8c0-1.5.638-2.1 2.222-2.1h4.025c1.584 0 2.221.6 2.221 2.1ZM29.388 27.9v-2.8c0-1.5-.637-2.1-2.221-2.1h-4.025c-1.584 0-2.221.6-2.221 2.1v2.8c0 1.5.637 2.1 2.221 2.1h4.025c1.584 0 2.221-.6 2.221-2.1ZM18.928 14.9v-2.8c0-1.5-.637-2.1-2.221-2.1h-4.025c-1.584 0-2.222.6-2.222 2.1v2.8c0 1.5.638 2.1 2.222 2.1h4.025c1.584 0 2.221-.6 2.221-2.1Z"
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

export default ClassicView;

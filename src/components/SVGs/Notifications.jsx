import React from 'react';

function Notifications(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none">
      <rect width={39.849} height={40} x={0.576} fill="#fff" rx={19.924} />
      <path
        fill={props.color ? props.color : 'url(#paint0_linear_117_5860)'}
        d="m27.812 22.49-.996-1.66c-.21-.37-.399-1.07-.399-1.48v-2.53a5.91 5.91 0 0 0-3.357-5.33A2.913 2.913 0 0 0 20.49 10c-1.086 0-2.062.59-2.58 1.52a5.93 5.93 0 0 0-3.288 5.3v2.53c0 .41-.19 1.11-.398 1.47l-1.006 1.67c-.399.67-.489 1.41-.24 2.09.24.67.807 1.19 1.545 1.44 1.932.66 3.965.98 5.997.98s4.064-.32 5.997-.97a2.394 2.394 0 0 0 1.494-1.45c.26-.69.19-1.45-.199-2.09ZM23.32 28.01A3.004 3.004 0 0 1 20.5 30c-.787 0-1.564-.32-2.112-.89-.319-.3-.558-.7-.697-1.11.13.02.259.03.398.05.23.03.468.06.707.08.568.05 1.146.08 1.724.08.568 0 1.136-.03 1.693-.08.21-.02.419-.03.618-.06l.488-.06Z"
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

export default Notifications;

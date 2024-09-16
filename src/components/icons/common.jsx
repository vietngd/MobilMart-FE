import React from 'react';

// Icon Edit
const IcEdit = ({ width = 24, height = 24, color = '#334155' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 24" fill="none">
    <path
      d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.54 3.02025L8.66 10.9003C8.36 11.2003 8.06 11.7903 8 12.2203L7.57 15.2303C7.41 16.3203 8.18 17.0803 9.27 16.9303L12.28 16.5003C12.7 16.4403 13.29 16.1403 13.6 15.8403L21.48 7.96025C22.84 6.60025 23.48 5.02025 21.48 3.02025C19.48 1.02025 17.9 1.66025 16.54 3.02025Z"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.41 4.15039C16.08 6.54039 17.95 8.41039 20.35 9.09039"
      stroke={color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Icon Delete
const IcDelete = ({ width = 24, height = 24, color = '#334155' }) => (
  <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.5 5.97998C18.17 5.64998 14.82 5.47998 11.48 5.47998C9.5 5.47998 7.52 5.57998 5.54 5.77998L3.5 5.97998"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 4.97L9.22 3.66C9.38 2.71 9.5 2 11.19 2H13.81C15.5 2 15.63 2.75 15.78 3.67L16 4.97"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.3504 9.13989L18.7004 19.2099C18.5904 20.7799 18.5004 21.9999 15.7104 21.9999H9.29039C6.50039 21.9999 6.41039 20.7799 6.30039 19.2099L5.65039 9.13989"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.83 16.5H14.16" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 12.5H15" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon Add
const IcAdd = ({ width = 24, height = 24, color = '#334155' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
      fill={color}
      
    />
  </svg>
);

export { IcEdit, IcDelete, IcAdd };

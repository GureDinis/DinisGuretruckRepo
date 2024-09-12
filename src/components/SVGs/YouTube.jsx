import React from 'react';

function YouTube(background, icon) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill={background} />
      <path
        d="M23.25 9.58203H12.4167C9.16667 9.58203 7 11.7487 7 14.9987V21.4987C7 24.7487 9.16667 26.9154 12.4167 26.9154H23.25C26.5 26.9154 28.6667 24.7487 28.6667 21.4987V14.9987C28.6667 11.7487 26.5 9.58203 23.25 9.58203ZM19.8808 19.3645L17.205 20.9679C16.1216 21.6179 15.2333 21.1195 15.2333 19.852V16.6345C15.2333 15.367 16.1216 14.8687 17.205 15.5187L19.8808 17.122C20.91 17.7504 20.91 18.747 19.8808 19.3645Z"
        fill={icon}
      />
    </svg>
  );
}

export default YouTube;

import React from 'react';

function Twitch(background, icon) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill={background}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.49 7.58203H11.609C11.27 7.58203 10.942 7.75633 10.757 8.04339L9.17502 10.4014C9.06202 10.5654 9 10.7704 9 10.9652V23.9854C9 24.5492 9.46201 25.0106 10.027 25.0106H12.082C12.647 25.0106 13.109 25.4719 13.109 26.0358V27.061C13.109 27.6248 13.571 28.0862 14.136 28.0862H15.636C15.975 28.0862 16.304 27.9119 16.489 27.6248L17.937 25.4617C18.132 25.1746 18.451 25.0003 18.79 25.0003H22.95C23.227 25.0003 23.484 24.8875 23.679 24.703L28.209 20.1818C28.404 19.9871 28.507 19.7307 28.507 19.4539V8.60724C28.517 8.04338 28.055 7.58203 27.49 7.58203ZM17.516 18.7158C17.516 19.0438 17.249 19.3002 16.93 19.3002H15.759C15.431 19.3002 15.174 19.0336 15.174 18.7158V12.8619C15.174 12.5338 15.441 12.2775 15.759 12.2775H16.93C17.259 12.2775 17.516 12.544 17.516 12.8619V18.7158ZM23.381 18.7158C23.381 19.0438 23.114 19.3002 22.796 19.3002H21.625C21.296 19.3002 21.039 19.0336 21.039 18.7158V12.8619C21.039 12.5338 21.306 12.2775 21.625 12.2775H22.796C23.124 12.2775 23.381 12.544 23.381 12.8619V18.7158Z"
        fill={icon}
      />
    </svg>
  );
}

export default Twitch;

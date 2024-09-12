import React from 'react';

function twitter(background, icon) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill={background} />
      <g clip-path="url(#clip0_630_43796)">
        <rect width="20" height="20" transform="translate(8 8)" fill={background} />
        <path
          d="M19.9027 16.4643L27.3482 8H25.5838L19.1189 15.3494L13.9555 8H8L15.8082 19.1136L8 27.9897H9.76443L16.5915 20.2285L22.0445 27.9897H28L19.9027 16.4643ZM17.4861 19.2115L16.695 18.1049L10.4002 9.29901H13.1102L18.1902 16.4056L18.9813 17.5123L25.5847 26.7498H22.8746L17.4861 19.2115Z"
          fill={icon}
        />
      </g>
    </svg>
  );
}

export default twitter;

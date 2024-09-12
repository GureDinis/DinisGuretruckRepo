import React from 'react';
import style from './ReusableButton.module.scss';

const ReusableButton = ({ name, backgroundColor, borderRadius, onClick, color, border, from, width }) => {
  const buttonStyle = {
    background: backgroundColor,
    borderRadius: borderRadius,
    color: color,
    border: border,
    width: width,
  };

  return (
    <button style={buttonStyle} onClick={onClick} className={style.button} from={from}>
      {name}
    </button>
  );
};

export default ReusableButton;

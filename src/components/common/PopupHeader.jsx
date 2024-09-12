import React from 'react';
import style from './PopupHeader.module.scss';

const PopupHeader = ({ header, option, handleClearAll }) => {
  return (
    <div className={style?.popupHeader}>
      <div className={style.info}>
        <h2 className={style?.header}>{header}</h2>
        <h3 className={style.option} onClick={handleClearAll}>
          {option}
        </h3>
      </div>
      <hr className={style?.hr} />
    </div>
  );
};

export default PopupHeader;

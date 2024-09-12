import React from 'react';
import style from './Tip.module.scss';
const Tip = ({ photoSrc, heading, content }) => {
  return (
    <div className={style?.tipContainer}>
      <img src={photoSrc} alt="Tip" className={style?.tipPhoto} />
      <h1 className={style.tipHeading}>{heading}</h1>
      <p className={style.tipContent}>{content}</p>
    </div>
  );
};

export default Tip;

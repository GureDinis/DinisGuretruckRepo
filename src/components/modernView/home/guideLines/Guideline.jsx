import React from 'react';
import style from './GuildLines.module.scss';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const Guideline = ({ title, imageSrc, onButtonClick }) => {
  return (
    <>
      <div className={style.cardHeader}>
        <div style={{ background: `url('data:image/jpeg;base64,${imageSrc}')` }} className={style.cardImg}></div>
      </div>
      <div className={style.readMoreBTN}>
        <h2 className={style.title}>{title}</h2>
        <Link to={onButtonClick} target="_blank">
          <button className={style.readMore}>
            <FormattedMessage id="ReadMore" defaultMessage="* Read More" />
            <img src="/images/ButtonArrow.svg" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Guideline;

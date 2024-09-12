import React from 'react';
import style from './FooterButtonHandler.module.scss';

const FooterButtonHandler = () => {
  return (
    <>
      <div className={style.discardButton}>Discard</div>
      <div className={style.saveButton}>Save Changes</div>
    </>
  );
};

export default FooterButtonHandler;

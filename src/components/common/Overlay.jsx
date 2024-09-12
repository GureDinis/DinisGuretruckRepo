import React from 'react';
import { createPortal } from 'react-dom';
import { Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
import style from './Overlay.module.scss';

const Overlay = ({ zIndex = 2, showSpinner }) => {
  return (
    <>
      {createPortal(
        <>
          <div className={style.overlay} style={{ zIndex: zIndex }}></div>
          {showSpinner ? (
            <Spin className="Spinner" tip={<FormattedMessage id="loading" defaultMessage="* Loading ..." />} />
          ) : (
            ''
          )}
        </>,
        document.body,
      )}
    </>
  );
};

export default Overlay;

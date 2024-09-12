import React from 'react';
import { FormattedMessage } from 'react-intl';
import style from './ProfileHeader.module.scss';
import { Divider } from 'antd';

const ProfileHeader = ({ title, handleSubmit, handleDiscard, isSaveBtnEnabled, isDiscardBtnEnabled }) => {
  return (
    <>
      <div className={style.headerWrapper}>
        <h2>{title}</h2>
        <div>
          <button className={style.secondaryBtn} onClick={handleDiscard} disabled={!isDiscardBtnEnabled}>
            <FormattedMessage id="MYDiscard" defaultMessage="* Discard" />
          </button>
          <button className={style.primaryBtn} onClick={handleSubmit} disabled={!isSaveBtnEnabled}>
            <FormattedMessage id="MYSave" defaultMessage="* Save Changes" />
          </button>
        </div>
      </div>
      <Divider className={style.divider} />
    </>
  );
};

export default ProfileHeader;

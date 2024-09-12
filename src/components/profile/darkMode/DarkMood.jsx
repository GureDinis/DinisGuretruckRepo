import React from 'react';
import ProfileHeader from '../profileHeader/ProfileHeader.jsx';
import { Divider, Switch } from 'antd';
import style from '../Profile.module.scss';
import { FormattedMessage } from 'react-intl';

const DarkMood = ({ title }) => {
  const onChange = (checked) => {};
  return (
    <>
      <ProfileHeader title={title} />
      <div className={style.switchRow}>
        <h4>
          <FormattedMessage id="MYDark" defaultMessage="* Dark" />
        </h4>

        <Switch className={style.switchBtn} defaultChecked onChange={onChange} />
      </div>
      <Divider />
      <div className={style.switchRow}>
        <h4>
          <FormattedMessage id="MYLight" defaultMessage="* Light" />
        </h4>
        <Switch className={style.switchBtn} onChange={onChange} />
      </div>
      <Divider />
      <div className={style.switchRow}>
        <div>
          <h4>
            <FormattedMessage id="MYAutomatic" defaultMessage="* Automatic" />
          </h4>
          <p>
            <FormattedMessage
              id="MYAutoAdjust"
              defaultMessage="* >We’ll automatically adjust the display based on your device’s system settings."
            />
          </p>
        </div>
        <Switch className={style.switchBtn} onChange={onChange} />
      </div>
    </>
  );
};

export default DarkMood;

import React, { useState } from 'react';
import ProfileHeader from '../profileHeader/ProfileHeader.jsx';
import { Divider, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import style from '../Profile.module.scss';
import { FormattedMessage } from 'react-intl';

const NotificationSettings = ({ title }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Español');

  const onChange = (checked) => {};

  const handleLanguageSelect = (key) => {
    setSelectedLanguage(items.find((item) => item.key === key)?.label);
  };

  const items = [
    {
      label: 'Español',
      key: '0',
    },
    {
      label: 'English',
      key: '1',
    },
    {
      label: 'German',
      key: '3',
    },
  ];

  return (
    <>
      <ProfileHeader title={title} />
      <div className={style.switchRow}>
        <h4>
          <FormattedMessage id="MYEnableNotifications" defaultMessage="* Enable Notifications" />
        </h4>
        <Switch disabled className={style.switchBtn} defaultChecked onChange={onChange} />
      </div>
      <Divider className={style.divider} />
      <div className={style.switchRow}>
        <div>
          <h4>
            <FormattedMessage id="MPAppNotifications" defaultMessage="* In app Notifications" />
          </h4>
          <p>
            <FormattedMessage
              id="MYNotificationsControls"
              defaultMessage="* This controls notifications coming to you in TRUCKCONTROLLER and can be accessed by only TRUCKCONTROLLER."
            />
          </p>
        </div>
        <Switch disabled className={style.switchBtn} defaultChecked onChange={onChange} />
      </div>
      <div className={style.switchRow}>
        <h4>
          <FormattedMessage id="MYNotificationsLanguage" defaultMessage="* Notifications Language" />
        </h4>
        <Dropdown
          disabled
          menu={{
            items,
            onClick: ({ key }) => handleLanguageSelect(key),
          }}
          trigger={['click']}
        >
          <Space style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
            {selectedLanguage}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
      <Divider className={style.divider} />
      <div className={style.switchRow}>
        <div>
          <h4>
            <FormattedMessage id="MYEmailNotifications" defaultMessage="* Email Notifications" />
          </h4>
          <p>
            <FormattedMessage
              id="MYNotificationsControls"
              defaultMessage="* This controls notifications coming to you in TRUCKCONTROLLER and can be accessed by only TRUCKCONTROLLER."
            />
          </p>
        </div>
        <Switch disabled className={style.switchBtn} defaultChecked onChange={onChange} />
      </div>
      <div className={style.switchRow}>
        <h4>
          <FormattedMessage id="MYNotificationsLanguage" defaultMessage="* Notifications Language" />
        </h4>
        <Dropdown
          disabled
          menu={{
            items,
            onClick: ({ key }) => handleLanguageSelect(key),
          }}
          trigger={['click']}
        >
          <Space style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
            {selectedLanguage}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </>
  );
};

export default NotificationSettings;

import React, { useState, useEffect } from 'react';
import { Tabs, Card } from 'antd';
import style from './Profile.module.scss';
import Icon, { BellFilled } from '@ant-design/icons';
import ProfileIcon from '../SVGs/ProfileIcon.jsx';
import Key from '../SVGs/Key.jsx';
import Moon from '../SVGs/Moon.jsx';
import ProfileInfo from './profileInfo/ProfileInfo.jsx';
import ChangePassword from './changePassword/ChangePassword.jsx';
import NotificationSettings from './notificationSettings/NotificationSettings.jsx';
import DarkMood from './darkMode/DarkMood.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from 'react-query';
import { getUserProfile, updateUserProfile } from '../../Api/Api.jsx';

const Profile = () => {
  const [profileTab, setProfileTab] = useState(null);
  const navigate = useNavigate();
  const param = useParams();

  const { data } = useQuery(['userProfile'], () => getUserProfile());
  const useChangeUserInfo = () => {
    return useMutation(updateUserProfile);
  };
  const changeUserInfoMutation = useChangeUserInfo();
  useEffect(() => {
    setProfileTab(param.key);
  });
  const tabs = [
    {
      tab: 'Edit Profile',
      icon: <Icon component={ProfileIcon} />,
      content: (
        <ProfileInfo
          changeUserInfoMutation={changeUserInfoMutation}
          data={data}
          title={<FormattedMessage id="MYEdit" defaultMessage="* Edit Profile" />}
        />
      ),
      id: 'MYEdit',
    },
    {
      tab: 'Change Password',
      icon: <Icon component={Key} />,
      content: <ChangePassword title={<FormattedMessage id="MYChangePassword" defaultMessage="* Change Password" />} />,
      id: 'MYChangePassword',
    },
    // {
    //   tab: 'Notification Settings',
    //   icon: <BellFilled />,
    //   content: (
    //     <NotificationSettings
    //       title={<FormattedMessage id="MYNotificationSettings" defaultMessage="* Notification Settings" />}
    //     />
    //   ),
    //   id: 'MYNotificationSettings',
    // },
    // {
    //   tab: 'Dark Mode',
    //   icon: <Icon component={Moon} />,
    //   content: <DarkMood title={<FormattedMessage id="MYDarkMood" defaultMessage="* Dark Mood" />} />,
    //   id: 'MYDarkMood',
    // },
  ];

  const handleTabChange = (key) => {
    navigate(`/modern/profile/${key}`);
    setProfileTab(key);
  };

  return (
    <Tabs activeKey={profileTab} className={style.tabWrapper} type="card" onChange={handleTabChange}>
      {tabs.map((tab) => (
        <Tabs.TabPane
          className="tabPane"
          tab={
            <span className={style.tabTitle}>
              {tab.icon}
              <FormattedMessage id={tab.id} defaultMessage={`* ${tab.tab}`} />
            </span>
          }
          key={tab.tab}
          icon={tab.icon}
        >
          <Card>{tab.content}</Card>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default Profile;

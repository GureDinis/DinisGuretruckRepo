import { Menu, Empty } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PopupHeader from '../../common/popupHeader.jsx';
import { useSelector } from 'react-redux';
import style from './NavBar.module.scss';
import { BellFilled } from '@ant-design/icons';
import ProfileIcon from '../../SVGs/ProfileIcon.jsx';
import Key from '../../SVGs/Key.jsx';
import Moon from '../../SVGs/Moon.jsx';
import { FormattedMessage } from 'react-intl';
import { formatDateUserProfile, getLanguage } from '../../../Helper.jsx';

const ShowProfile = ({ hideHeader, hideImg, handleProfileVisibleChange }) => {
  const profileData = useSelector((state) => state.user.profileData);
  return (
    <Menu className={style.profile}>
      {hideHeader ?? <PopupHeader header={<FormattedMessage id="Profile" defaultMessage="* Profile" />} />}

      {profileData ? (
        <Menu.Item key={profileData?.userId}>
          <div className={style.profileInfoContainer}>
            <div className={style.profileInfo}>
              {hideImg ?? <img src="/images/modern/Agenda.png" alt="" />}
              <div>
                <div className={style.userInfo}>
                  <h2>{profileData?.companyName}</h2>
                  <span>
                    <FormattedMessage id="NPUsername" defaultMessage="* Username" />: {profileData?.userName}
                  </span>
                </div>
                <span>
                  {<FormattedMessage id="ConnectedSince" defaultMessage="* Connected since" />} :{' '}
                  {formatDateUserProfile(profileData?.loggedSince, getLanguage())}
                </span>
              </div>
            </div>
            <hr className={style.profileHr} />
            <ul className={style.profleTabs}>
              <Link to="/modern/profile/Edit Profile" onClick={handleProfileVisibleChange}>
                <li>
                  <i>
                    <ProfileIcon />
                  </i>
                  <FormattedMessage id="NPEdit" defaultMessage="* Edit Profile" />
                </li>
              </Link>
              <Link to="/modern/profile/Change Password" onClick={handleProfileVisibleChange}>
                <li>
                  <i>
                    <Key />
                  </i>
                  <FormattedMessage id="NPChangePassword" defaultMessage="* Change Password" />
                </li>
              </Link>
              {/* <Link to="/modern/profile/Notification Settings" onClick={handleProfileVisibleChange}>
                <li>
                  <i>
                    <BellFilled />
                  </i>
                  <FormattedMessage id="NPNotificationSettings" defaultMessage="* Notification Settings" />
                </li>
              </Link> */}
              {/* <Link to="/modern/profile/Dark Mode" onClick={handleProfileVisibleChange}>
                <li>
                  <i>
                    <Moon />
                  </i>
                  <FormattedMessage id="NPDarkMood" defaultMessage="* Dark Mood" />
                </li>
              </Link> */}
            </ul>
          </div>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Empty description={false} />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default ShowProfile;

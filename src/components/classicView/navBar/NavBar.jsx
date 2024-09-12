import React, { useEffect, useState } from 'react';
import { Dropdown, Tooltip } from 'antd';
import style from './NavBar.module.scss';
import { bake_cookie, read_cookie } from 'sfcookies';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../../Helper.jsx';
import ShowNotifications from '../../modernView/navBar/ShowNotifications.jsx';
import ShowProfile from '../../modernView/navBar/ShowProfile.jsx';
import ResposiveView from './ResposiveView.jsx';
import NotificationModal from '../../common/NotificationModal.jsx';
import RequestForAccessModal from '../../common/requestForAccessModal/RequestForAccessModal.jsx';
import Profile from '../../SVGs/Profile.jsx';
import Notifications from '../../SVGs/Notifications.jsx';
export default function NavBar({ setClassicView, isMenuVisible, setMenuVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [width, setWidth] = useState(window.innerWidth);
  const [isNotificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
  // const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const allNotifications = useSelector((state) => state.user.notifications);
  const ConfigData = useSelector((state) => state.config.configData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeURL, setIframeURL] = useState(null);

  const changeView = () => {
    const classicView = read_cookie('classicView');
    bake_cookie('classicView', !classicView);
    setClassicView(!classicView);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const logOutClick = () => {
    clearUserData(dispatch);
    navigate('/');
  };

  const notificationClick = (item) => {
    setIframeURL(ConfigData.reactJsUrl + item.ActionUrl);
    setNotificationDropdownVisible(!isNotificationDropdownVisible);
    setIsModalOpen(true);
  };

  const handleNotificationVisibleChange = () => {
    setNotificationDropdownVisible(!isNotificationDropdownVisible);
  };
  const handleProfileVisibleChange = () => {
    setProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const handleMenuVisibleChange = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleCloseNotificationsOrMenu = () => {
    setNotificationDropdownVisible(false);
    setMenuVisible(false);
  };

  const isMobileOrTablet = () => {
    return width <= 1024;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={style.navContainer}>
        <div className={style.navGroup}>
          <img src={'/images/logoExpand.png'} className={isMobileOrTablet() ? style.mobileLogo : ''} alt="logoExpand" />
        </div>
        <div className={style.navGroup}>
          {/* <Tooltip placement="bottom"
            title={intl.formatMessage({
              id: `tc.FAQ`,
              defaultMessage: `* FAQ`,
            })}
          >
            <Link>
              <img src="/images/FAQ.png" alt="" />
            </Link>
          </Tooltip> */}
          {width > 1024 && ConfigData?.siteMode !== 'GureCard' ? (
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                id: `tc.ModernView`,
                defaultMessage: `* modern View`,
              })}
            >
              <Link onClick={() => changeView()} to={read_cookie('classicView') ? '/Modern' : '/Classic'}>
                <img src="/images/Modern.png" alt="" />
              </Link>
            </Tooltip>
          ) : (
            ''
          )}
          {isMobileOrTablet() ? (
            <ResposiveView
              isMenuVisible={isMenuVisible}
              setMenuVisible={setMenuVisible}
              handleMenuVisibleChange={handleMenuVisibleChange}
              notificationClick={notificationClick}
              // setIsRequestModalOpen={setIsRequestModalOpen}
              handleCloseNotificationsOrMenu={handleCloseNotificationsOrMenu}
            />
          ) : (
            <>
              {/* <Dropdown
                overlay={
                  <ShowNotifications
                    notificationClick={notificationClick}
                    // setIsRequestModalOpen={setIsRequestModalOpen}
                    handleCloseNotificationsOrMenu={handleCloseNotificationsOrMenu}
                    from={'classic'}
                  />
                }
                trigger={['click']}
                placement="bottom"
                arrow
                open={isNotificationDropdownVisible}
                onOpenChange={handleNotificationVisibleChange}
              >
                <Tooltip placement="bottom" title="Notifications" className={allNotifications?.length > 0 ? style.active : undefined}>
                  <Link>
                    <img src="/images/notifications.png" alt="" />
                  </Link>
                </Tooltip>
              </Dropdown> */}

              <Dropdown
                getPopupContainer={() => document.getElementById('app')}
                overlay={
                  <ShowNotifications
                    notificationClick={notificationClick}
                    // setIsRequestModalOpen={setIsRequestModalOpen}
                    handleCloseNotificationsOrMenu={handleCloseNotificationsOrMenu}
                    from={'modern'}
                    setIsModalOpen={setIsModalOpen}
                  />
                }
                trigger={['click']}
                placement="bottom"
                arrow
                open={isNotificationDropdownVisible}
                onOpenChange={handleNotificationVisibleChange}
                overlayClassName="antd-dropdown-navbar"
              >
                <Tooltip
                  placement="bottom"
                  className={allNotifications?.notifications?.length > 0 ? style.active : undefined}
                  title="Notifications"
                >
                  <Link>
                    <Notifications />
                  </Link>
                </Tooltip>
              </Dropdown>

              {/* <Tooltip placement="bottom" title="Alerts">
             <Link>
             <img src="/images/alerts.png" alt="" />
             </Link>
            </Tooltip> */}

              {/* <Dropdown
                overlay={<ShowProfile />}
                trigger={['click']}
                placement="bottom"
                arrow
                open={isProfileDropdownVisible}
                onOpenChange={handleProfileVisibleChange}
              >
                <Tooltip placement="bottom" title="Profile">
                  <Link>
                    <img src="/images/profile.png" alt="" />
                  </Link>
                </Tooltip>
              </Dropdown> */}

              <Dropdown
                getPopupContainer={() => document.getElementById('app')}
                overlay={<ShowProfile handleProfileVisibleChange={handleProfileVisibleChange} />}
                trigger={['click']}
                placement="bottom"
                arrow
                open={isProfileDropdownVisible}
                onOpenChange={handleProfileVisibleChange}
                overlayClassName="antd-dropdown-navbar"
              >
                <Tooltip placement="bottom" title="Profile">
                  <Link>
                    <Profile />
                  </Link>
                </Tooltip>
              </Dropdown>
            </>
          )}

          <Tooltip placement="bottom" title="Logout">
            <Link to={'/'} onClick={() => logOutClick()}>
              <img src="/images/logOut.png" alt="" />
            </Link>
          </Tooltip>
        </div>
        <NotificationModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          iframeURL={iframeURL}
          from={'classic'}
        />
        {/* <RequestForAccessModal
          isRequestModalOpen={isRequestModalOpen}
          setIsRequestModalOpen={setIsRequestModalOpen}
          from={'classic'}
          role={'admin'}
        /> */}
      </div>
    </>
  );
}

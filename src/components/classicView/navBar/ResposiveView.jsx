import React from 'react';
import { Collapse } from 'antd';
import ShowNotifications from '../../modernView/navBar/ShowNotifications.jsx';
import ShowProfile from '../../modernView/navBar/ShowProfile.jsx';
import style from './NavBar.module.scss';
import { UpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ResposiveView = ({
  isMenuVisible,
  handleMenuVisibleChange,
  notificationClick,
  handleCloseNotificationsOrMenu,
  // setIsRequestModalOpen,
}) => {
  const allNotifications = useSelector((state) => state.user.notifications);

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={handleMenuVisibleChange}>
        <img src={!isMenuVisible ? `/images/classic/menuIcon.png` : `/images/classic/closeIcon.png`} alt="Menu" />
      </div>

      {isMenuVisible && (
        <div className={style.collapsedMenu}>
          <Collapse
            bordered={false}
            accordion
            className={style.collapse}
            expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 0 : 180} />}
          >
            <Collapse.Panel
              header={
                <div className={`${style.panelHeader} `}>
                  <div className={`${allNotifications?.length > 0 ? style.active : undefined}`}>
                    <img src="/images/notifications.png" alt="" />
                  </div>
                  <span>Notifications</span>
                </div>
              }
              key="1"
              className={style.collapsedPanel}
            >
              <ShowNotifications
                hideHeader={true}
                notificationClick={notificationClick}
                handleCloseNotificationsOrMenu={handleCloseNotificationsOrMenu}
                // setIsRequestModalOpen={setIsRequestModalOpen}
                from={'classic'}
              />
            </Collapse.Panel>
            <Collapse.Panel
              className={style.collapsedPanel}
              header={
                <div className={style.panelHeader}>
                  <img src="/images/profile.png" alt="" />
                  <span>Profile</span>
                </div>
              }
              key="2"
            >
              <ShowProfile hideHeader={true} hideImg={true} />
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default ResposiveView;

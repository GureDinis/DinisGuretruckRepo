// NotificationsDropdown.jsx
import React from 'react';
import { Menu, Empty } from 'antd';
import PopupHeader from '../../common/popupHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import style from './NavBar.module.scss';
import Notification from '../../common/notification/Notification.jsx';
import { SetUserNotificationRead, UserAcceptPageConditions } from '../../../Api/Api.jsx';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { setIframeURL } from '../../../Redux/reducers/frameSlice.js';
import { setNewsHtml } from '../../../Redux/reducers/siteDataSlice.js';
import { FormattedMessage } from 'react-intl';

const ShowNotifications = ({ hideHeader, handleCloseNotificationsOrMenu, setIsModalOpen }) => {
  const notifications = useSelector((state) => state.user.notifications);
  const ConfigData = useSelector((state) => state.config.configData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const SetUserNotificationReadMutation = useMutation(
    (params) => SetUserNotificationRead(params.type, params.notificationId),
    {
      onSuccess: (data) => {
        // if (data?.data?.statusCode === 200) {
        //   message.success(data?.data?.messages[0]);
        // }
        queryClient.invalidateQueries('mainMenuNotifications');
      },
      onError: (error) => {
        console.log(error);
        // message.destroy();
        // message.error(error?.response?.data?.messages[0]);
      },
    },
  );

  const markAsRead = (type, notificationId) => {
    SetUserNotificationReadMutation.mutate({ type, notificationId });
  };

  const acceptTermsAndConditions = useMutation(UserAcceptPageConditions, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('mainMenuNotifications');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAccept = () => {
    acceptTermsAndConditions.mutate();
  };

  const seeAll = () => {
    handleCloseNotificationsOrMenu();
    navigate('/Modern/NotificationHistory');
  };

  const handleNotificationClick = (notification) => {
    if (!notification) return;

    handleCloseNotificationsOrMenu();

    switch (notification.type) {
      case 4:
        navigate('/Modern/SupportCenter');
        if (!notification.isRead && notification.isReadable) {
          markAsRead(notification.type, notification?.id);
        }
        break;
      case 11:
        navigate('/Modern/profile/Change%20Password');
        if (!notification.isRead && notification.isReadable) {
          markAsRead(notification.type, notification?.id);
        }
        break;
      case 12:
        dispatch(setNewsHtml(notification.action?.url));
        setIsModalOpen(true);

        break;
      case 0:
        dispatch(setNewsHtml(notification.action?.url));
        if (!notification.isRead && notification.isReadable) {
          markAsRead(notification.type, notification?.id);
        }
        setIsModalOpen(true);
        break;
      default:
        if (notification.action?.url) {
          navigate('/Modern');
          dispatch(setIframeURL(ConfigData.reactJsUrl + notification.action.url));
          if (!notification.isRead && notification.isReadable) {
            markAsRead(notification.type, notification?.id);
          }
        }
        break;
    }
  };

  return (
    <Menu className={style.favMenu}>
      {hideHeader ?? (
        <PopupHeader
          header={<FormattedMessage id="NDHeader" defaultMessage="* Notifications" />}
          option={<FormattedMessage id="NDOption" defaultMessage="* See All" />}
          handleClearAll={seeAll}
        />
      )}
      {notifications?.notifications?.length > 0 ? (
        notifications?.notifications
          ?.filter((notification) => !notification.isRead)
          .map((notification) => (
            <Menu.Item
              key={notification?.id}
              className={`${style.notifications} ${notification?.Type === 1 ? style.requestNotification : ''}`}
              onClick={() => {
                handleNotificationClick(notification);
              }}
            >
              <Notification
                title={notification.title}
                message={notification.message}
                date={notification.date}
                type={notification.type}
                priority={notification.priority}
                markAsReadClick={() => markAsRead(notification.type, notification?.id)}
                isReadable={notification.isReadable}
                action={notification?.action?.action}
                isRead={notification.isRead}
                handleAccept={() => handleAccept()}
              />
            </Menu.Item>
          ))
      ) : (
        <Menu.Item>
          <Empty description={false} />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default ShowNotifications;

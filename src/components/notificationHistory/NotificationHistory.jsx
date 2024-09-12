import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import style from './NotificationHistory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../common/notification/Notification.jsx';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GetHistoricNotifications, SetUserNotificationRead, UserAcceptPageConditions } from '../../Api/Api.jsx';
import { useNavigate } from 'react-router-dom';
import { setIframeURL } from '../../Redux/reducers/frameSlice.js';
import { setNewsHtml } from '../../Redux/reducers/siteDataSlice.js';
import NotificationModal from '../common/NotificationModal.jsx';
import PaginationComponent from '../common/pagination/Pagination.jsx';
import Overlay from '../common/Overlay.jsx';

const NotificationHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historicNotifications, setHistoricNotifications] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const ConfigData = useSelector((state) => state.config.configData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(
    ['historicNotifications', pageNumber, pageSize],
    () => GetHistoricNotifications(pageNumber, pageSize),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: (data) => {
        setHistoricNotifications(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const handlePageChange = (page, size) => {
    setPageNumber(page);
    setPageSize(size);
  };

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

  const handleNotificationClick = (notification) => {
    if (!notification) return;

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
    <>
      {isLoading && <Overlay showSpinner={true} />}
      <div className={style.notificationsHitory}>
        <div className={`primaryHeader ${style.notificationsHeader}`}>
          <div>
            <h1>
              <FormattedMessage id="NHTitle" defaultMessage="* Notification History" />
            </h1>
          </div>
        </div>
        <div className={style.notificationsContainer}>
          {historicNotifications?.result.notifications?.map((notification) => (
            <div className={style.notification} onClick={() => handleNotificationClick(notification)}>
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
            </div>
          ))}
          <PaginationComponent
            totalRecords={historicNotifications?.totalRecords}
            pageSize={pageSize}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
        <NotificationModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} from={'modern'} />
      </div>
    </>
  );
};

export default NotificationHistory;

import React from 'react';
import style from './Notification.module.scss';
import { Divider, Dropdown, Menu } from 'antd';
import { NotificationPriority, NotificationType } from '../../../enmus/enum';
import { FormattedMessage } from 'react-intl';
import { dateFormat } from '../../../../src/Helper.jsx';

const Notification = ({
  title,
  message,
  date,
  type,
  priority,
  markAsReadClick,
  isReadable,
  action,
  isRead,
  handleAccept,
}) => {
  const handleMarkAsReadClick = (event) => {
    event.domEvent.stopPropagation(); // Stop event from bubbling up to parent elements
    markAsReadClick();
  };

  const handleAcceptClick = (event) => {
    event.stopPropagation();
    handleAccept();
  };

  const menu = (
    <Menu className={style.moreOptions}>
      <Menu.Item key="1" className={style.option} onClick={handleMarkAsReadClick}>
        <span>
          <FormattedMessage id="MarkAsRead" defaultMessage="* Mark as Read" />
        </span>
        <img src="/images/modern/tick-circle.svg" alt="" />
      </Menu.Item>
    </Menu>
  );

  function getNotificationType(type) {
    return NotificationType[type];
  }

  function getNotificationPriorityLabel(priority) {
    return NotificationPriority[priority]?.label || 'Unknown';
  }

  function getNotificationPriorityColor(priority) {
    return NotificationPriority[priority]?.color || '#e0e0e0';
  }

  function getNotificationPriorityBackground(priority) {
    return NotificationPriority[priority]?.background || '#e0e0e0';
  }

  const priorityLabel = getNotificationPriorityLabel(priority);
  const priorityColor = getNotificationPriorityColor(priority);
  const priorityBackground = getNotificationPriorityBackground(priority);

  return (
    <div className={`${style.notification} ${!isRead ? style.notRead : ''}`}>
      <h3 className={style.notificationTitle}>{title}</h3>
      {action !== 4 ? <p className={style.notificationInfo}>{message}</p> : ''}
      {type === 12 && (
        <button className={style.acceptButton} onClick={handleAcceptClick}>
          <FormattedMessage id="Accept" defaultMessage="* Accept" />
        </button>
      )}
      <Divider />

      <div className={style.btnGroup}>
        <div className={style.group}>
          <button className={style.btn} style={{ background: priorityBackground, color: priorityColor }}>
            {priorityLabel}
          </button>

          {type !== 12 && <button className={style.btn}> {getNotificationType(type)}</button>}
        </div>
        <div className={style.group}>
          <span>{dateFormat(date)}</span>
          {isReadable && !isRead && (
            <Dropdown
              overlay={menu}
              trigger={['hover']}
              placement="topLeft"
              getPopupContainer={() => document.getElementById('app')}
            >
              <img
                src="/images/modern/more-circle.svg"
                alt=""
                onClick={(e) => e.preventDefault()}
                className={style.menuIcon}
              />
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;

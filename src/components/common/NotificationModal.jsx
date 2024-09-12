import { Modal } from 'antd';
import React from 'react';
import style from './NotificationModal.module.scss';
import { useSelector } from 'react-redux';

const NotificationModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const newsHtml = useSelector((state) => state.siteData.newsHtml);

  return (
    <Modal
      className="notificationModal"
      open={isModalOpen}
      onCancel={handleOk}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
      width={780}
      centered={true}
    >
      <iframe title="newsIframe" className={style.iframeContainer} id="notificationIframe" srcDoc={newsHtml} />
    </Modal>
  );
};

export default NotificationModal;

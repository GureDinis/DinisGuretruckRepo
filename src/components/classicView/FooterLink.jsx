import React, { useEffect, useState } from 'react';
import style from './FooterLink.module.scss';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

export default function FooterLink(props) {
  const [url, setUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ConfigData = useSelector((state) => state.config.configData);
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  // card click to set the card details
  const openModule = (url) => {
    if (url.startsWith('http') || url.includes('.pdf')) {
      window.open(url, '_blank');
    } else {
      setUrl(ConfigData.reactJsUrl + url);
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {props.footerLinks?.footerItems?.map((link) => (
        <div onClick={() => openModule(link.url)} key={link.key} className={style.footerLink}>
          <span>
            <FormattedMessage id={`${link.translatedKey}`} defaultMessage={`${link.label}`} />
          </span>
          <img className={style.footerImg} src={'/images/classic/' + link?.key + '.png'} alt="" />
        </div>
      ))}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        width={windowSize.width}
        centered
      >
        <iframe
          id="myFrame"
          src={url}
          className={style.iframe}
          height={windowSize.height - 109 + 'px'}
          width={windowSize.width}
        />
      </Modal>
    </>
  );
}

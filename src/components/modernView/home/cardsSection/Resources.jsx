import React, { useState } from 'react';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import style from './clients/Clients.module.scss';
import { useQuery } from 'react-query';
import { GetKodeaResources } from '../../../../Api/Api.jsx';

const Resources = ({ isModalVisible, handleCancel }) => {
  const [KodeaResources, setKodeaResources] = useState();

  const openLink = (url) => {
    window.open(`https://www.youtube.com/embed/${url}`, '_blank');
  };

  useQuery(['KodeaResources'], GetKodeaResources, {
    onSuccess: (data) => {
      setKodeaResources(data?.data?.result);
    },
  });

  return (
    <Modal
      title={<FormattedMessage id="HPYoutubeResourcesTitle" defaultMessage="* Youtube Resources" />}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      onClick={(e) => e.stopPropagation()}
      centered
      wrapClassName="clients-modal"
      width={700}
      bodyStyle={{ maxHeight: '500px', overflowY: 'auto' }}
      getContainer={() => document.getElementById('app')}
    >
      <div className={style.ResourcesContainer}>
        {KodeaResources?.map((item, index) => {
          return (
            <div key={index} className={style.slide}>
              <div className={style.slideLeft}>
                <img src="/images/modern/youtubeResources.png" alt="" className={style.logo} />
                <div className={style.brandInfo}>
                  <h2>{item.name}</h2>
                  <p>
                    <FormattedMessage
                      id="HPYoutubeResourcesDescription"
                      defaultMessage="* Watch Now how you can achieve it."
                    />
                  </p>
                </div>
              </div>
              <button className={style.slideBtn} onClick={() => openLink(item?.videoUrl)}>
                <FormattedMessage id="HPYoutubeResourcesBtn" defaultMessage="* Watch Now" />
              </button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Resources;

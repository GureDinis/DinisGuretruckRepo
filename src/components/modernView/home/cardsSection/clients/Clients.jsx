import React, { useState } from 'react';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import style from './Clients.module.scss';
import { useQuery } from 'react-query';
import { GetClientsLogos } from '../../../../../Api/Api.jsx';

const Clients = ({ isModalVisible, handleCancel }) => {
  const [clientsLogos, setClientsLogos] = useState([]);

  useQuery('clientsLogos', GetClientsLogos, {
    onSuccess: (data) => {
      setClientsLogos(data?.data?.result);
    },
  });

  const openLink = (url) => {
    window.open(url, '_blank');
  };
  return (
    <Modal
      title={<FormattedMessage id="HPClientsTitle" defaultMessage="* Our Clients" />}
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
      {clientsLogos.map((logo) => (
        <div key={logo.customerId} className={style.slide}>
          <div className={style.slideLeft}>
            <img src={`data:image/jpeg;base64,${logo.image}`} alt="" className={style.logo} />
            <div className={style.brandInfo}>
              <h2>{logo.name}</h2>
              <a href={logo.web}>{logo.web}</a>
            </div>
          </div>
          <button className={style.slideBtn} onClick={() => openLink(logo?.web)}>
            <FormattedMessage id="HPClientsBtn" defaultMessage="* Visit Website" />
          </button>
        </div>
      ))}
    </Modal>
  );
};

export default Clients;

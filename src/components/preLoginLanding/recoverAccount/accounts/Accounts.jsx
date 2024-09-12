import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ReusableButton from '../../../common/button/ReusableButton.jsx';
import { Avatar, Button, List, Radio, message } from 'antd';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

export default function Accounts() {
  const [style] = useOutletContext();
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState(null);
  const recoverOption = useSelector((state) => state.siteData.recoverOption);
  const emailHasClients = useSelector((state) => state.siteData.emailHasClients);

  const handleClientSelection = (clientId) => {
    setSelectedClient(clientId);
  };

  const handleNext = () => {
    if (selectedClient) {
      message.destroy();
      message.success('Your password has been sent to your email.');
      navigate('/', { replace: true });
    } else {
      message.destroy();
      message.error('Please select a client to proceed.');
    }
  };

  return (
    <div className={style?.recoverContainer}>
      <h2 className={style?.recoverHeader}>
        <FormattedMessage id="APTitle" defaultMessage="* Accounts" />
      </h2>
      <p>
        <FormattedMessage
          id="APDescription"
          defaultMessage="* These are the accounts connected to your email. Select the account to recover your {recoverOption}."
          values={{ recoverOption }}
        />
      </p>

      <List
        className={style?.accountsList}
        itemLayout="horizontal"
        dataSource={emailHasClients?.clients}
        split={<div className={style?.customSplitter} />}
        renderItem={(client) => (
          <List.Item
            className={style?.account}
            actions={[
              <Radio
                onChange={() => handleClientSelection(client.clientId)}
                checked={selectedClient === client.clientId}
                className={style?.radioButton}
              />,
            ]}
          >
            <List.Item.Meta
              className={style?.accountItem}
              avatar={<Avatar src={client.clientImg} />}
              title={<h3>{client.clientId}</h3>}
            />
          </List.Item>
        )}
      />

      <ReusableButton
        name={<FormattedMessage id="RANextBTN" defaultMessage="* Next" />}
        backgroundColor="#009DE0"
        borderRadius="80px"
        color="#FFF"
        border="1px solid #009DE0"
        width={'100%'}
        onClick={handleNext}
      />

      <Button onClick={() => navigate(-1)} className={style?.cancelBtn}>
        <FormattedMessage id="Atras" defaultMessage="* back" />
      </Button>
    </div>
  );
}

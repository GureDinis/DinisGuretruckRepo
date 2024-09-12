import React from 'react';
import style from './ContactsHistoryIndex.module.scss';
import { LeftOutlined } from '@ant-design/icons';
import HistoryList from './historyList/HistoryList.jsx';
import ChatWindow from './chatWindow/ChatWindow.jsx';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

function ContactsHistoryIndex(props) {
  const navigate = useNavigate();

  return (
    <div className={`${style.contactsHistoryContainer} contact-history`}>
      <div className={`primaryHeader`}>
        <div>
          <h1>
            <LeftOutlined
              onClick={() => {
                navigate(-1);
              }}
              className={style.back}
            />{' '}
            <FormattedMessage id="CHTitle" defaultMessage="* Contacts History" />
          </h1>
        </div>
      </div>
      <Row gutter={16} className={style.historyBody}>
        <Col style={{ height: '100%' }} xl={9} lg={12}>
          <HistoryList />
        </Col>
        <Col style={{ height: '100%' }} xl={15} lg={12}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
}

export default ContactsHistoryIndex;

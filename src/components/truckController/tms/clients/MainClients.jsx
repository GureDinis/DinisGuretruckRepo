import React, { Component } from 'react';
import style from './MainClients.module.scss';
import { Badge, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Overlay from '../../../common/Overlay.jsx';

const MainClients = () => {
  return (
    <>
      {/* {isLoading && <Overlay showSpinner={true} />} */}
      <div className={`${style.mainClientsContainer} main-clients`}>
        <div className={style.mainClientsContainters}>
          <div className="primaryHeader">
            <div>
              <h1>
                <FormattedMessage id="MCTitle" defaultMessage="* Main Clients" />
              </h1>
            </div>
          </div>
        </div>
        <row className={style.mainClientsRow}>
          <Col className={style.leftSection}></Col>
          <Col className={style.rightSection}></Col>
        </row>
      </div>
    </>
  );
};

export default MainClients;

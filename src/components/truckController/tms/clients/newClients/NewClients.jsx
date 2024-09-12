import React, { useState } from 'react';
import style from './NewClients.module.scss';
import { Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import Overlay from '../../../../common/Overlay.jsx';
import OptionsList from './optionsList/OptionsList.jsx';
import CDetailsMandatory from './optionsList/clientDetailsMandatory/CDetailsMandatory.jsx';
import ClientDetailsOptional from './optionsList/clientDetailsOptional/ClientDetailsOptional.jsx';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ArrowsHandler from './footerControllers/arrowsHandler/ArrowsHandler.jsx';
import FooterButtonHandler from './footerControllers/footerButtonHandler/FooterButtonHandler.jsx';

const NewClients = () => {
  const [formProp, setFormProp] = useState(null);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);

  return (
    <>
      {/* {isLoading && <Overlay showSpinner={true} />} */}
      <div className={`${style.NewClientsContainer} new-clients`}>
        <div className={style.NewClientsContainters}>
          <div className="primaryHeader">
            <div>
              <h1>
                <FormattedMessage id="MCTitle" defaultMessage="* New Client" />
              </h1>
            </div>
          </div>
        </div>
        <Row className={style.NewClientsRow}>
          <Col className={style.leftSection}>
            <OptionsList
              setFormProp={setFormProp}
              currentOptionIndex={currentOptionIndex}
              setCurrentOptionIndex={setCurrentOptionIndex}
            />
          </Col>
          <Col className={style.rightSection}>{formProp}</Col>
        </Row>
        <div className={style.footer}>
          <ArrowsHandler
            currentOptionIndex={currentOptionIndex}
            setCurrentOptionIndex={setCurrentOptionIndex}
            optionsLength={9} // total number of options
          />
          <FooterButtonHandler />
        </div>
      </div>
    </>
  );
};

export default NewClients;

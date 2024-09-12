import React from 'react';
import style from './SupportCenter.module.scss';
import { Badge, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setaAtiveOperator } from '../../Redux/reducers/userSlice';
import { useQuery } from 'react-query';
import { GetAllOperators, GetConnectedWorkers, GetSupportNumbers } from '../../Api/Api.jsx';
import { setAllOperators, setOperators, setSupportNumbers } from '../../Redux/reducers/siteDataSlice';
import Overlay from '../common/Overlay.jsx';
import { FormattedMessage } from 'react-intl';
import ContactUs from '../SVGs/ContactUs.jsx';
import Export from '../SVGs/Export.jsx';
import OperatorCard from './contactsHistory/operatorCard/OperatorCard.jsx';
function SupportCenter(props) {
  const navigate = useNavigate();
  const supportNumbers = useSelector((state) => state.siteData.supportNumbers);
  const connectedOperators = useSelector((state) => state.siteData.connectedOperators);
  const userId = useSelector((state) => state.user.profileData?.userId);
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  dispatch(setaAtiveOperator({}));
  const openChat = (operator) => {
    dispatch(setaAtiveOperator(operator));
    navigate('/Modern/ContactsHistory');
  };
  const openOperatorsList = () => {
    dispatch(setaAtiveOperator({}));
    navigate('/Modern/ContactsHistory');
  };
  const {} = useQuery([userId], () => GetSupportNumbers(userId), {
    onSuccess: (data) => {
      dispatch(setSupportNumbers(data?.data?.result));
    },
  });
  const { isLoading: allOperatorsLoading } = useQuery(['allOperators', userId], () => GetAllOperators(userId), {
    onSuccess: (data) => {
      dispatch(setAllOperators(data?.data?.result));
    },
  });
  const { isLoading: operatorsLoading } = useQuery(['connectedOperators', userId], () => GetConnectedWorkers(userId), {
    onSuccess: (data) => {
      dispatch(setOperators(data?.data?.result));
    },
  });
  return (
    <>
      {operatorsLoading && <Overlay showSpinner={true} />}
      <div className={`${style.supportCenterContainer} support-center`}>
        <div className={style.supportNumbersContainers}>
          <div className="primaryHeader">
            <div>
              <h1>
                <FormattedMessage id="OPOnlineCenterTitle" defaultMessage="* Online Center" />
              </h1>
            </div>
          </div>
          <Row className={style.supportNumbers} gutter={[16, 24]}>
            <Col span={18}>
              <Row gutter={[16, 7]}>
                {supportNumbers?.phoneNumbers?.map((num, index) => (
                  <Col key={index} className="gutter-row" xl={6} lg={8}>
                    <div className={style.SupportNumber}>
                      <div className={style.ImgContainer}>
                        <img src={`/images/Flags/${num?.countryCode}.png`} alt="" />
                        <h4>{num.country}</h4>
                      </div>
                      <a href={`tel:${num.phoneNumber}`}>
                        <span>{num.phoneNumber}</span>
                      </a>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={6}>
              {supportNumbers?.emailAddresses?.map((mail, index) => (
                <div className={style.SupportNumber}>
                  <div className={style.Contact}>
                    <h4>
                      <FormattedMessage id="OPHelpdesk" defaultMessage="* EHelpdesk - CONTACT US" />
                    </h4>
                  </div>
                  <a href={`mailto:${mail}`} className={style.ContactLink}>
                    <ContactUs />
                    <span>{mail}</span>
                  </a>
                </div>
              ))}
            </Col>
          </Row>
        </div>
        <div className={style.onlineOperators}>
          <div className="primaryHeader">
            <div>
              <h1>
                <FormattedMessage id="OPTitle" defaultMessage="* Online Operators" />
              </h1>
              <h2 className={style.SubHeader} onClick={() => openOperatorsList()}>
                <FormattedMessage id="OPOpenChatTitle" defaultMessage="* View all Contacts History" />{' '}
                <Export color="#009DE0" />
              </h2>
            </div>
          </div>
          <Row className={style.operators} gutter={[16, 24]}>
            {connectedOperators?.map((operator) => (
              <Col key={operator.idWorker} className="gutter-row" s={24} lg={12} xl={8}>
                <OperatorCard operator={operator} openChat={openChat} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}
export default SupportCenter;

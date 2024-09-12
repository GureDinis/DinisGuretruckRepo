import React, { useEffect, useState } from 'react';
import style from './ChildCards.module.scss';
import { Card, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { findFooterLinks, findItem, scrollToTop } from '../../Helper.jsx';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { setBreadCrumbsData } from '../../Redux/reducers/siteDataSlice.js';
// import { setDisabledItem } from "../../Redux/reducers/userSlice.js";
export default function ChildCards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CardDetails, setCardDetails] = useState({});
  // const [, setIsRequestModalOpen] = useOutletContext();
  const [links, setLinks] = useState([]);
  const data = useSelector((state) => state.siteData.data);
  const breadCrumbsData = useSelector((state) => state.siteData.breadCrumbsData);
  const footerLinks = useSelector((state) => state.siteData.footerLinks);
  const queryParams = new URLSearchParams(window.location.search);
  const key = queryParams.get('key');
  // card click to set the card details

  const openModule = (item) => {
    scrollToTop();
    const BC = [...breadCrumbsData];
    BC.push(item?.key);
    setLinks(findFooterLinks(footerLinks, item?.key));
    if (item && item?.hasChildren) {
      dispatch(setBreadCrumbsData(BC));
      navigate({ pathname: '/Classic/Cards', search: `?key=${item?.key}` });
    } else if (item && item?.url === '') {
      setIsModalOpen(true);
    } else if (item) {
      dispatch(setBreadCrumbsData(BC));
      navigate({ pathname: '/Classic/Module', search: `?key=${item?.key}` });
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setCardDetails(findItem(data, key));
    setLinks(findFooterLinks(footerLinks, key));
  }, [key]);

  useEffect(() => {
    const BC = [...breadCrumbsData];
    const item = findItem(data, BC[BC.length - 1]);
    if (item && item?.hasChildren) {
      navigate({ pathname: '/Classic/Cards', search: `?key=${item?.key}` });
    } else if (item && item?.url === '') {
      setIsModalOpen(true);
    } else if (item) {
      navigate({ pathname: '/Classic/Module', search: `?key=${item?.key}` });
    }
  }, []);

  // const handleDisabledItemRequest = (item) => {
  //   dispatch(setDisabledItem(item));
  //   setIsRequestModalOpen(true);
  // };

  return (
    <>
      <div className={style.childCards}>
        {CardDetails &&
          CardDetails?.children?.map((item) =>
            !item?.hideClassic ? (
              !item?.footer ? (
                <Card
                  key={item?.key}
                  hoverable={item?.isEnable}
                  className={`${style.cardItem} ${!item?.isEnable ? style.disabled : ''}`}
                  bordered={false}
                  onClick={() => {
                    if (item?.isEnable) {
                      openModule(item);
                    }
                  }}
                >
                  <div className={style.cardInfo}>
                    <span>
                      <FormattedMessage id={`${item?.translatedKey}`} defaultMessage={`${item?.label}`} />
                    </span>
                    <img
                      src={
                        item?.iconName ? '/images/classic/' + item?.iconName : '/images/classic/' + item?.key + '.png'
                      }
                      alt=""
                    />
                    {item?.secKey ? (
                      <span>
                        <FormattedMessage id={`${item?.secKey}`} defaultMessage={`${item?.secLabel}`} />
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </Card>
              ) : (
                ''
              )
            ) : (
              ''
            ),
          )}
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        centered
      >
        <FormattedMessage
          id={'ProviderSettingsInfoMsg'}
          defaultMessage={'* It should be charged en the SUPPLIER file'}
        />
      </Modal>
    </>
  );
}

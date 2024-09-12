import React from 'react';
import { Breadcrumb } from 'antd';
import style from './Breadcrumbs.module.scss';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import BackBTN from '../common/BackBTN.jsx';
import { findItem } from '../../Helper.jsx';
import { useNavigate } from 'react-router-dom';
import { setBreadCrumbsData } from '../../Redux/reducers/siteDataSlice.js';
import { setSelectedMenuItem, setIframeURL } from '../../Redux/reducers/frameSlice.js';

export default function Breadcrumbs(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breadCrumbsData = useSelector((state) => state.siteData.breadCrumbsData);
  const data = useSelector((state) => state.siteData.data);

  const navigateToModule = (key, index) => {
    const BC = [...breadCrumbsData];
    BC.splice(index, breadCrumbsData.length);
    dispatch(setBreadCrumbsData(BC));
    dispatch(setIframeURL(''));
    dispatch(setSelectedMenuItem(''));
    if (BC.length) {
      navigate({
        pathname: '/Classic/Cards',
        search: `?key=${key}`,
      });
    } else {
      navigate({
        pathname: '/Classic',
      });
    }
  };

  return (
    <div className={style.header}>
      <Breadcrumb className={style.breadCrumbs} separator={'>'}>
        <Breadcrumb.Item style={{ cursor: 'pointer' }} onClick={() => navigateToModule('/Classic', 0)}>
          {breadCrumbsData.length ? <FormattedMessage id={`Menu`} defaultMessage="* Menu" /> : ''}
        </Breadcrumb.Item>
        {breadCrumbsData.map((item, index) => (
          <Breadcrumb.Item className={style.BCItem} key={item} onClick={() => navigateToModule(item, index + 1)}>
            <FormattedMessage
              id={`${findItem(data, item)?.translatedKey ?? item}`}
              defaultMessage={findItem(data, item)?.label ?? item}
            />
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <BackBTN setCardDetails={props.setCardDetails} />
    </div>
  );
}

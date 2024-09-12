import React, { useState } from 'react';
import { Outlet } from 'react-router';
import NavBar from './navBar/NavBar.jsx';
import Breadcrumbs from '../breadCrumbs/Breadcrumbs.jsx';
import { createPortal } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { setData, setFooterLinks, setRefetchClassic } from '../../Redux/reducers/siteDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getMainMenu } from '../../Api/Api.jsx';
import style from './ClassicView.module.scss';
import { Spin } from 'antd';
import RequestForAccessModal from '../common/requestForAccessModal/RequestForAccessModal.jsx';
import { getLanguage, refetchQueries } from '../../Helper.jsx';

const ClassicLayout = ({ setClassicView }) => {
  const shouldRefetchClassic = useSelector((state) => state.siteData.shouldRefetchClassic);
  // const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const language = getLanguage();

  const { isLoading, refetch } = useQuery(['mainMenuClassic', language], () => getMainMenu(language), {
    ...refetchQueries,
    onSuccess: (data) => {
      dispatch(setData(data?.data?.result));
      const footerLinks = data?.data?.result.filter((item) => item.hasFooter);
      dispatch(setFooterLinks(footerLinks));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (shouldRefetchClassic) {
    refetch();
    dispatch(setRefetchClassic(false));
  }

  return (
    <>
      <NavBar setClassicView={setClassicView} setMenuVisible={setMenuVisible} isMenuVisible={isMenuVisible} />
      <div className={`${style.cardContainer} ${isMenuVisible ? style.hiddenCards : ''}`}>
        <Breadcrumbs />
        {isLoading &&
          createPortal(
            <>
              <div className="overlay"></div>
              <Spin className="Spinner" tip={<FormattedMessage id="loading" defaultMessage="* Loading ..." />} />
            </>,
            document.body,
          )}
        <div className={style.cards}>
          <Outlet />
        </div>
        {/* <RequestForAccessModal
          isRequestModalOpen={isRequestModalOpen}
          setIsRequestModalOpen={setIsRequestModalOpen}
          from={'classic'}
          role={'user'}
        /> */}
      </div>
    </>
  );
};
export default ClassicLayout;

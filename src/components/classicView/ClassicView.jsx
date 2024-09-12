import React, { useEffect, useState } from 'react';
import style from './ClassicView.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { findItem, scrollToTop } from '../../Helper.jsx';
import { useNavigate, useOutletContext } from 'react-router-dom';
import FooterLink from './FooterLink.jsx';
import { setBreadCrumbsData } from '../../Redux/reducers/siteDataSlice.js';
import { setSelectedMenuItem } from '../../Redux/reducers/frameSlice.js';
import ParentCards from './ParentCards.jsx';
import { setDisabledItem } from '../../Redux/reducers/userSlice.js';

export default function ClassicView() {
  const data = useSelector((state) => state.siteData.data);
  const footerLinks = useSelector((state) => state.siteData.footerLinks);
  const selectedMenuItem = useSelector((state) => state.frame.selectedMenuItem);
  const breadCrumbsData = useSelector((state) => state.siteData.breadCrumbsData);
  // const [, setIsRequestModalOpen] = useOutletContext();
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // set card details from first level
  const openModule = (item) => {
    scrollToTop();
    const BC = [...breadCrumbsData];
    if (item?.url === '') {
      if (item?.hasChildren) {
        BC.push(item?.key);
        dispatch(setBreadCrumbsData(BC));
        navigate({ pathname: '/Classic/Cards', search: `?key=${item?.key}` });
      }
    } else {
      BC.push(item?.key);
      dispatch(setBreadCrumbsData(BC));
      navigate({ pathname: '/Classic/Module', search: `?key=${item?.key}` });
    }
  };

  // this is triggered when component called to
  // detect if there is previous selected items or a classic view clicked from modern view
  useEffect(() => {
    if (data.length > 0) {
      setLinks(footerLinks);
      if (selectedMenuItem !== '') {
        dispatch(setSelectedMenuItem(''));
        navigate({
          pathname: '/Classic/Cards',
          search: `?key=${selectedMenuItem?.key}`,
        });
      } else {
        if (breadCrumbsData && breadCrumbsData?.length > 0) {
          const item = findItem(data, breadCrumbsData[breadCrumbsData?.length - 1]);
          navigate({
            pathname: '/classic/Cards',
            search: `?key=${item?.key}`,
          });
        }
      }
    }
  });

  // const handleDisabledItemRequest = (item) => {
  //   dispatch(setDisabledItem(item));
  //   setIsRequestModalOpen(true);
  // };

  return (
    <>
      <ParentCards openModule={openModule} data={data} />
      {links?.length > 0 && (
        <div className={style.footerLinks}>
          <FooterLink footerLinks={links} />
        </div>
      )}
    </>
  );
}

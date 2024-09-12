import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchModern } from '../../Redux/reducers/siteDataSlice.js';
import { setModernData } from '../../Redux/reducers/siteDataSlice.js';
import { Layout, message } from 'antd';
import Tips from './Tips/Tips.jsx';
import SideMenu from './sideMenu/SideMenu.jsx';
import NavBar from './navBar/NavBar.jsx';
import { GetMainMenuNotifications, getMainMenu } from '../../Api/Api.jsx';
import style from './ModernView.module.scss';
import Overlay from '../common/Overlay.jsx';
import { getLanguage, refetchQueries } from '../../Helper.jsx';
import { setNotifications } from '../../Redux/reducers/userSlice.js';

const ModernLayout = ({ setClassicView }) => {
  const [openClickedList, setOpenClickedList] = useState([]); // Added to store the tree path
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const shouldRefetchModern = useSelector((state) => state.siteData.shouldRefetchModern);
  const dropdownVisible = useSelector((state) => state.siteData.dropdownVisible);

  const language = getLanguage();

  const { isLoading, refetch } = useQuery(['mainMenuModern', language], () => getMainMenu(language), {
    ...refetchQueries,
    onSuccess: (data) => {
      JSON.parse(localStorage.getItem(`Moderndata`)) ??
        localStorage.setItem(`Moderndata`, JSON.stringify(data?.data?.result));
      dispatch(setModernData(data?.data?.result));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (shouldRefetchModern) {
    refetch();
    dispatch(setRefetchModern(false));
  }

  useQuery('mainMenuNotifications', GetMainMenuNotifications, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setNotifications(data));
    },
  });

  return (
    <>
      {contextHolder}
      <Layout className={style.layout}>
        <Layout className={style.layoutWrapper}>
          <div className={style.sideBar} id="sidebar">
            <SideMenu
              setClassicView={setClassicView}
              openClickedList={openClickedList}
              setOpenClickedList={setOpenClickedList}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
          <Layout className={style.layoutContainer}>
            <div className={`${style.navbar} ${dropdownVisible ? style.transparentNavbar : ''}`}>
              <NavBar
                setClassicView={setClassicView}
                setOpenClickedList={setOpenClickedList}
                setSelectedItem={setSelectedItem}
              />
            </div>
            {isLoading && <Overlay showSpinner={true} />}
            <Outlet />
          </Layout>
        </Layout>
      </Layout>
      {/*tips modal*/}
      <Tips />
    </>
  );
};

export default ModernLayout;

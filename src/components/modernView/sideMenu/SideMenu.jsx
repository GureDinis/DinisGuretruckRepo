import React, { useEffect, useState } from 'react';
import style from './SideMenu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Sider from 'antd/es/layout/Sider';
import { Modal } from 'antd';
import { findItem, getCookie, setCookie, updateItem } from '../../../Helper.jsx';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { read_cookie } from 'sfcookies';
import { setSelectedMenuItem, setItemClicked, setIframeURL } from '../../../Redux/reducers/frameSlice.js';
import { setBreadCrumbsData } from '../../../Redux/reducers/siteDataSlice.js';
import Logo from './Logo.jsx';
import MenuItems from './MenuItems.jsx';
import useFavoriteItemMutation from '../../../hooks/useFavoriteItemMutation.js';
import Overlay from '../../common/Overlay.jsx';
import { setDisabledItem } from '../../../Redux/reducers/userSlice.js';
import { Tree } from '../../common/Tree.js';

function SideMenu(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [windowSize, setWindowSize] = useState({ height: window.innerHeight });
  const cookieCollapsed = getCookie('collapsed');
  const [collapsed, setCollapsed] = useState(cookieCollapsed);
  const data = useSelector((state) => state.siteData.modernData);
  const ConfigData = useSelector((state) => state.config.configData);
  const dataTemp = JSON.parse(localStorage.getItem('Moderndata'));
  const itemClicked = useSelector((state) => state.frame.itemClicked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeCollapsed = (value) => {
    setCookie('collapsed', value, 1);
    setCollapsed(value);
  };

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
    });
  };

  const sideItemclick = (item) => {
    navigate('/Modern');
    const rawItem = findItem(data, item?.key);
    const tembItem = findItem(data, item?.key.replace('Classic', ''));
    if (tembItem?.isEnable) {
      if (tembItem?.url !== '') {
        changeCollapsed(true);
        props.setSelectedItem(item?.key);
        const BC = item?.parents ? item?.parents.split(',') : [];
        BC.push(item?.key);
        dispatch(setBreadCrumbsData(BC));
        dispatch(setIframeURL(ConfigData.reactJsUrl + item?.url));
        dispatch(setSelectedMenuItem(flattenTreeNode(item)));
      } else {
        if (tembItem?.hasChildren) {
          const BC = rawItem?.parents ? rawItem?.parents.split(',') : [];
          dispatch(setBreadCrumbsData(BC));
          dispatch(setSelectedMenuItem(tembItem));
          const classicView = read_cookie('classicView');
          setCookie('classicView', !classicView, 1);
          props.setClassicView(!classicView);
          navigate('/');
        } else {
          setIsModalOpen(true);
        }
      }

      props.setOpenClickedList(item?.path);
    } else {
      dispatch(setDisabledItem(item));
      // setIsRequestModalOpen(true);
    }
  };

  const logoClick = () => {
    changeCollapsed(true);
    props.setSelectedItem(null);
    props.setOpenClickedList([]);
    dispatch(setSelectedMenuItem(''));
    dispatch(setIframeURL(''));
    dispatch(setBreadCrumbsData([]));
    navigate('/Modern');
  };

  const { deleteFavItemMutation, addFavItemMutation } = useFavoriteItemMutation();

  const addToFavs = (item, e) => {
    e.stopPropagation();
    if (item?.favorite) {
      deleteFavItemMutation.mutate(item?.key);
    } else {
      addFavItemMutation.mutate(item?.key);
    }
  };

  useEffect(() => {
    dispatch(setItemClicked(''));
  }, [itemClicked]);

  const renderTitle = (item) => {
    return (
      <span className={style.itemLabel}>
        <FormattedMessage id={`${item?.translatedKey}`} defaultMessage={`${item?.label}`} />
      </span>
    );
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const subMenuChange = (keys) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (openKeys.length !== 0) {
      document.getElementById('sidebar').style.zIndex = '11';
    } else {
      document.getElementById('sidebar').style.zIndex = '4';
    }
  }, [openKeys]);

  let roots = [];

  if (dataTemp) {
    dataTemp.forEach((item) => {
      const tree = new Tree();
      tree.generateTree(item);
      roots.push(tree);
    });
  }

  const flattenTreeNode = (node) => {
    if (!node) {
      return null;
    }

    return {
      key: node.key,
      iconName: node.iconName,
      label: node.label,
      secondaryKey: node.secondaryKey,
      secondaryLabel: node.secondaryLabel,
      translatedKey: node.translatedKey,
      url: node.url,
      isEnable: node.isEnable,
      favorite: node.favorite,
      hideClassic: node.hideClassic,
      value: node.value,
      parents: node.parents,
      parentKey: node.parent ? node.parent.key : null,
      children: node.children ? node.children.map((child) => flattenTreeNode(child)) : [],
    };
  };

  return (
    <div className={style.siderContainer}>
      {openKeys.length !== 0 && <Overlay zIndex={10} />}
      <div style={{ height: windowSize.height - 40 + 'px' }} className={`${style.sideContainer}`}>
        <Logo collapsed={collapsed} onLogoClick={logoClick} />
        <Sider
          collapsible
          trigger={
            collapsed ? (
              <DoubleRightOutlined style={{ color: '#fff' }} />
            ) : (
              <DoubleLeftOutlined style={{ color: '#fff' }} />
            )
          }
          collapsed={collapsed}
          onCollapse={(value) => changeCollapsed(value)}
          theme={'light'}
          width={'310px'}
        >
          <MenuItems
            trees={roots}
            renderTitle={renderTitle}
            sideItemclick={sideItemclick}
            collapsed={collapsed}
            addToFavs={addToFavs}
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            openClickedList={props.openClickedList}
            subMenuChange={subMenuChange}
            selectedItem={props.selectedItem}
          />
        </Sider>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          cancelButtonProps={{ style: { display: 'none' } }}
          onCancel={handleCancel}
          centered
        >
          <FormattedMessage
            id={'ProviderSettingsInfoMsg'}
            defaultMessage={'* It should be charged en el SUPPLIER file'}
          />
        </Modal>
      </div>
      {/* <RequestForAccessModal
        isRequestModalOpen={isRequestModalOpen}
        setIsRequestModalOpen={setIsRequestModalOpen}
        from={'modern'}
        role={'user'}
      /> */}
      <div id="custom-submenu-container" className={style.submenuContent}></div>
    </div>
  );
}

export default SideMenu;

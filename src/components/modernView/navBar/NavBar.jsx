import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserData, findItem, updateItem, getLanguage } from '../../../Helper.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, message, Tooltip } from 'antd';
import style from './NavBar.module.scss';
import { FormattedMessage, useIntl } from 'react-intl';
import { bake_cookie, read_cookie } from 'sfcookies';
import Favorites from '../../SVGs/Favorites.jsx';
import Notifications from '../../SVGs/Notifications.jsx';
import Profile from '../../SVGs/Profile.jsx';
import Logout from '../../SVGs/Logout.jsx';
import { deleteAllUserMenuFavorites, getUserMenuFavorites } from '../../../Api/Api.jsx';
import { setFavData as setFavDataAction } from '../../../Redux/reducers/userSlice.js';
import { setIframeURL, setSelectedMenuItem } from '../../../Redux/reducers/frameSlice.js';
import { setBreadCrumbsData, setDropdownVisible, setRefetchFavs } from '../../../Redux/reducers/siteDataSlice.js';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ShowNotifications from './ShowNotifications.jsx';
import ShowProfile from './ShowProfile.jsx';
import ShowFavorites from './ShowFavorites.jsx';
import useFavoriteItemMutation from '../../../hooks/useFavoriteItemMutation.js';
import Overlay from '../../common/Overlay.jsx';
import { refetchQueries } from '../../../Helper.jsx';
import NotificationModal from '../../common/NotificationModal.jsx';
import RequestForAccessModal from '../../common/requestForAccessModal/RequestForAccessModal.jsx';
import { toggleTheme } from '../../../Redux/reducers/themeSlice.js';
import useMessage from '../../../hooks/useMessage.js';

export default function NavBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const { showError, showSuccess } = useMessage();
  let favs = useSelector((state) => state.user.favData);
  const allNotifications = useSelector((state) => state.user.notifications);
  const iframeURL = useSelector((state) => state.frame.iframeURL);
  const [favData, setFavData] = useState(favs);
  const [isFavoriteDropdownVisible, setFavoriteDropdownVisible] = useState(false);
  const [isNotificationDropdownVisible, setNotificationDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [notificationModal, setNotificationModal] = useState(false);
  const data = useSelector((state) => state.siteData.modernData);
  let menuData = JSON.parse(localStorage.getItem('Moderndata'));
  // const itemClicked = useSelector(state => state.frame.itemClicked)
  const ConfigData = useSelector((state) => state.config.configData);
  const shouldRefetchFavs = useSelector((state) => state.siteData.shouldRefetchFavs);
  const theme = useSelector((state) => state.theme.theme);
  const language = getLanguage();

  const queryClient = useQueryClient();
  const changeViewClick = () => {
    const classicView = read_cookie('classicView');
    bake_cookie('classicView', !classicView);
    props.setClassicView(!classicView);
  };

  useEffect(() => {
    isNotificationDropdownVisible || isFavoriteDropdownVisible || isProfileDropdownVisible
      ? dispatch(setDropdownVisible(true))
      : dispatch(setDropdownVisible(false));
  }, [isNotificationDropdownVisible, isFavoriteDropdownVisible, isProfileDropdownVisible]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  // function to open the iframe for the favourite menu clicked item
  const sideItemclick = (e) => {
    const item = findItem(data, e.menuKey);
    if (item?.url !== '') {
      navigate('/Modern');
      dispatch(setIframeURL(ConfigData.reactJsUrl + item?.url));
      setFavoriteDropdownVisible(!isFavoriteDropdownVisible);
    }
  };

  const logOutClick = () => {
    clearUserData(dispatch);
    navigate('/');
  };

  const homeClick = () => {
    props.setSelectedItem(null);
    props.setOpenClickedList([]);
    dispatch(setSelectedMenuItem(''));
    dispatch(setIframeURL(''));
    dispatch(setBreadCrumbsData([]));
    navigate('/modern');
  };

  const { refetch } = useQuery(['favorites', language], () => getUserMenuFavorites(language), {
    ...refetchQueries,
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        dispatch(setFavDataAction(data?.data?.result));
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  let favDataTemb = [...favData];
  const { deleteFavItemMutation } = useFavoriteItemMutation();

  const deleteAllFavsMutation = useMutation(deleteAllUserMenuFavorites, {
    onSuccess: (result) => {
      const itemsToDelete = favDataTemb || [];
      itemsToDelete.forEach((favItem) => {
        let favoriteItem = findItem(menuData, favItem.menuKey);
        if (favoriteItem) {
          updateItem(menuData, favoriteItem);
        }
      });
      const updatedFavData = favDataTemb.filter((favItem) =>
        itemsToDelete.every((item) => item.menuKey !== favItem.menuKey),
      );
      dispatch(setFavDataAction(updatedFavData));
      localStorage.setItem('Moderndata', JSON.stringify(menuData));
      queryClient.invalidateQueries('favorites');
      showSuccess(result?.data?.messages[0]);
    },
    onError: (error) => {
      console.log(error);
      message.destroy();
      showError(error?.response?.data?.messages[0]);
    },
  });

  const deleteFavs = (item, e) => {
    e.stopPropagation();
    deleteFavItemMutation.mutate(item.menuKey);
  };

  if (shouldRefetchFavs) {
    refetch();
    dispatch(setRefetchFavs(false));
  }

  const notificationClick = (item) => {
    setIframeURL(ConfigData.reactJsUrl + item.ActionUrl);
    setNotificationDropdownVisible(!isNotificationDropdownVisible);
    setIsModalOpen(true);
  };

  const handleFavoriteVisibleChange = () => {
    setFavoriteDropdownVisible(!isFavoriteDropdownVisible);
  };

  const handleNotificationVisibleChange = () => {
    setNotificationDropdownVisible(!isNotificationDropdownVisible);
  };
  const handleCloseNotificationsOrMenu = () => {
    setNotificationDropdownVisible(false);
  };

  const handleProfileVisibleChange = () => {
    setProfileDropdownVisible(!isProfileDropdownVisible);
  };

  useEffect(() => {
    setFavData(favs);
  }, [favs]);

  return (
    <>
      {isNotificationDropdownVisible || isFavoriteDropdownVisible || isProfileDropdownVisible ? (
        <Overlay zIndex={7} />
      ) : (
        ''
      )}
      <div className={style.navBarContainer}>
        <div className={style.searchBarContainer}>
          {/* <h3>
            <FormattedMessage id="NBWelcomeMessage" defaultMessage="* Welcome Back to TruckController" />
          </h3> */}
        </div>
        <div className={style.navIconsContainer}>
          <Tooltip placement="bottom" title={<FormattedMessage id="NPHome" defaultMessage="* Home" />}>
            <div onClick={homeClick}>
              <img src="/images/home.png" alt="" />
            </div>
          </Tooltip>

          <Tooltip
            placement="bottom"
            title={intl.formatMessage({
              id: `${theme}`,
              defaultMessage: `* ${theme}`,
            })}
          >
            <Link onClick={handleToggle}>
              <img src={`/images/${theme === 'light' ? 'darkTheme' : 'lightTheme'}.png`} alt="" />
            </Link>
          </Tooltip>
          {/* <Tooltip placement="bottom"
            title={intl.formatMessage({
              id: `FAQ`,
              defaultMessage: `* FAQ`,
            })}
          >
            <Link>
              <img src="/images/FAQ.png" alt="" />
            </Link>
          </Tooltip> */}
          <Tooltip
            placement="bottom"
            title={intl.formatMessage({
              id: `ClassicView`,
              defaultMessage: `* Classic View`,
            })}
          >
            <Link onClick={() => changeViewClick()} to={read_cookie('classicView') ? '/Modern' : '/Classic'}>
              <img src="/images/Classic.png" alt="" />
            </Link>
          </Tooltip>

          <Dropdown
            getPopupContainer={() => document.getElementById('app')}
            overlay={
              <ShowFavorites
                favData={favData}
                sideItemclick={sideItemclick}
                deleteAllFavsMutation={deleteAllFavsMutation}
                deleteFavs={deleteFavs}
              />
            }
            trigger={['click']}
            placement="bottom"
            arrow
            open={isFavoriteDropdownVisible}
            onOpenChange={handleFavoriteVisibleChange}
            overlayClassName="antd-dropdown-navbar"
          >
            <Tooltip placement="bottom" title={<FormattedMessage id="FDHeader" defaultMessage="* Favorites" />}>
              <Link>
                <Favorites color={favData?.length > 0 ? '#F2B749' : undefined} />
              </Link>
            </Tooltip>
          </Dropdown>

          <Dropdown
            getPopupContainer={() => document.getElementById('app')}
            overlay={
              <ShowNotifications
                notificationClick={notificationClick}
                // setNotificationModal={setNotificationModal}
                handleCloseNotificationsOrMenu={handleCloseNotificationsOrMenu}
                from={'modern'}
                setIsModalOpen={setIsModalOpen}
              />
            }
            trigger={['click']}
            placement="bottom"
            arrow
            open={isNotificationDropdownVisible}
            onOpenChange={handleNotificationVisibleChange}
            overlayClassName="antd-dropdown-navbar"
          >
            <Tooltip
              placement="bottom"
              className={
                allNotifications?.notifications?.filter((notification) => !notification.isRead)?.length > 0
                  ? style.active
                  : undefined
              }
              title={<FormattedMessage id="NDHeader" defaultMessage="* Notifications" />}
            >
              <Link>
                <Notifications />
              </Link>
            </Tooltip>
          </Dropdown>

          {/* <Tooltip title="Alerts">
            <Link>
              <Alerts />
            </Link>
          </Tooltip> */}

          <Dropdown
            getPopupContainer={() => document.getElementById('app')}
            overlay={<ShowProfile handleProfileVisibleChange={handleProfileVisibleChange} />}
            trigger={['click']}
            placement="bottom"
            arrow
            open={isProfileDropdownVisible}
            onOpenChange={handleProfileVisibleChange}
            overlayClassName="antd-dropdown-navbar"
          >
            <Tooltip placement="bottom" title={<FormattedMessage id="Profile" defaultMessage="* Profile" />}>
              <Link>
                <Profile />
              </Link>
            </Tooltip>
          </Dropdown>

          <Tooltip placement="bottom" title={<FormattedMessage id="Logout" defaultMessage="* Logout" />}>
            <Link to={'/'} onClick={() => logOutClick()}>
              <Logout />
            </Link>
          </Tooltip>
        </div>
      </div>
      <NotificationModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        iframeURL={iframeURL}
        from={'modern'}
      />
      {/* <RequestForAccessModal
        isRequestModalOpen={isRequestModalOpen}
        setIsRequestModalOpen={setIsRequestModalOpen}
        from={'modern'}
        role={'admin'}
      /> */}
    </>
  );
}

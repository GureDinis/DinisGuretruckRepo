import React, { memo, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import {} from './Common.scss';
import './LibraryOverrides.scss';
import { clearUserData, getCookie, setCookie } from './Helper.jsx';
import './App.css';
import ClassicView from './components/classicView/ClassicView.jsx';
import ModernView from './components/modernView/ModernView.jsx';
import ChildCards from './components/classicView/ChildCards.jsx';
import ModulePage from './components/classicView/ModulePage.jsx';
import PreLoginLanding from './components/preLoginLanding/PreLoginLanding.jsx';
import { setConfig } from './Redux/reducers/configSlice.js';
import ProtectedRoute from './ProtectedRoute.js';
import RestrictionsCalendar from './components/RestrictionsCalendar/RestrictionsCalendar.jsx';
import ModernLayout from './components/modernView/ModernLayout.jsx';
import SupportCenter from './components/supportCenter/SupportCenter.jsx';
import ContactsHistory from './components/supportCenter/contactsHistory/ContactsHistoryIndex.jsx';
import VideoSupport from './components/Video Support/VideoSupport.jsx';
import ClassicLayout from './components/classicView/ClassicLayout.jsx';
import Login from './components/preLoginLanding/login/Login.jsx';
import RequestInfo from './components/preLoginLanding/requestInfo/RequestInfo.jsx';
import Profile from './components/profile/Profile.jsx';
import FAQ from './components/faq/FAQ.jsx';
import MainNumbersLayout from './components/mainNumbers/MainNumbersLayout.jsx';
import ForgetPassword from './components/preLoginLanding/forgetPassword/ForgetPassword.jsx';
import NotificationHistory from './components/notificationHistory/NotificationHistory.jsx';
import MainClients from './components/truckController/tms/clients/MainClients.jsx';
import NewClients from './components/truckController/tms/clients/newClients/NewClients.jsx';

const App = memo(() => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCookie('CultureCookie');
  const [width, setWidth] = useState(window.innerWidth);
  const isLogin = getCookie('AuthToken');
  const messages = useSelector((state) => state.siteData.messages);
  const ConfigData = useSelector((state) => state.config.configData);
  const theme = useSelector((state) => state.theme.theme);
  getCookie('classicView').length === 0 && setCookie('classicView', false);
  const [classicView, setClassicView] = useState(getCookie('classicView') === 'true');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    const config = await fetch('/config.json');
    const configJson = await config.json();
    sessionStorage.setItem('configData', JSON.stringify(configJson));
    Dispatch(setConfig(configJson));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if ((isLogin && width <= 1024) || ConfigData?.siteMode === 'GureCard') {
      setCookie('classicView', true);
      setClassicView(true);
      navigate('/Classic');
    }
  }, [width, isLogin, ConfigData?.siteMode, navigate]);

  useEffect(() => {
    fetchData();
    if (!isLogin) {
      clearUserData(Dispatch);
    }
  }, [Dispatch, fetchData, isLogin]);

  useEffect(() => {
    if (REACT_APP_VERSION) {
      const storedVersion =
        localStorage.getItem('appVersion') === null ? REACT_APP_VERSION : localStorage.getItem('appVersion');
      localStorage.getItem('appVersion') === null && localStorage.setItem('appVersion', storedVersion);
      if (REACT_APP_VERSION !== storedVersion) {
        console.log('REACT_APP_VERSION:', REACT_APP_VERSION);
        console.log('Stored Version:', storedVersion);
        clearUserData(Dispatch);
        localStorage.setItem('appVersion', REACT_APP_VERSION);
      }
    }
  }, [Dispatch, REACT_APP_VERSION]);

  return (
    <div className="appBG" data-theme={classicView ? 'light' : theme} id="app">
      <IntlProvider locale={lang} messages={messages}>
        <Routes>
          <Route path="/" element={<PreLoginLanding />}>
            <Route index element={<Login />} />
            <Route path="/recoverPassword/*" element={<ForgetPassword />}></Route>
            <Route path="requestInfo" element={<RequestInfo />} />
          </Route>

          <Route
            path="/Modern"
            element={
              <ProtectedRoute>
                <ModernLayout setClassicView={setClassicView} />
              </ProtectedRoute>
            }
          >
            <Route index element={<ModernView />} />
            <Route path="RestrictionsCalendar" element={<RestrictionsCalendar />} />
            <Route path="SupportCenter" element={<SupportCenter />} />
            <Route path="ContactsHistory" element={<ContactsHistory />} />
            <Route path="VideoSupport" element={<VideoSupport />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="MainNumbers" element={<MainNumbersLayout />} />
            <Route path="profile/:key" element={<Profile />} />
            <Route path="NotificationHistory" element={<NotificationHistory />} />
            <Route path="MainClients" element={<MainClients />} />
            <Route path="NewClients" element={<NewClients />} />
          </Route>

          <Route
            path="/Classic"
            element={
              <ProtectedRoute>
                <ClassicLayout
                  setClassicView={setClassicView}
                  isRequestModalOpen={isRequestModalOpen}
                  setIsRequestModalOpen={setIsRequestModalOpen}
                />
              </ProtectedRoute>
            }
          >
            <Route index element={<ClassicView setIsRequestModalOpen={setIsRequestModalOpen} />} />
            <Route
              path="Cards"
              element={<ChildCards setClassicView={setClassicView} setIsRequestModalOpen={setIsRequestModalOpen} />}
            />
            <Route path="faq" element={<FAQ />} />
            <Route path="Module" element={<ModulePage setClassicView={setClassicView} />} />
          </Route>
        </Routes>
      </IntlProvider>
    </div>
  );
});

export default App;

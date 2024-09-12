import React, { useEffect, useState } from 'react';
import LoginBG from './loginBG/LoginBG.jsx';
import { getCookie, getLang, setCookie } from '../../Helper.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import LoginNav from './loginNav/LoginNav.jsx';
import { useQuery } from 'react-query';
import { getAllTranslations, getLanguages, updateLanguageHeader } from '../../Api/Api.jsx';
import { setLanguages } from '../../Redux/reducers/languageSlice.js';
import Overlay from '../common/Overlay.jsx';
import { setMessages } from '../../Redux/reducers/siteDataSlice.js';
import { refetchQueries } from '../../Helper.jsx';
import { read_cookie } from 'sfcookies';

export default function PreLoginLanding() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = getCookie('CultureCookie');
  const [selectedOption, setSelectedOption] = useState(lang);
  const [showSpinner, setShowSpinner] = useState(false);
  const ConfigData = useSelector((state) => state.config.configData);
  const isLogin = sessionStorage.getItem('AuthToken');
  const backgroundColor = 'rgba(18, 18, 18, 0.6)';
  const color = '#fff';
  document.documentElement.style.setProperty('--color', color);
  document.documentElement.style.setProperty('--background-color', backgroundColor);

  useEffect(() => {
    if (isLogin) {
      (isLogin && read_cookie('classicView')) || ConfigData?.siteMode === 'GureCard'
        ? navigate('/Classic')
        : navigate('/Modern');
    }
  }, [isLogin]);

  const { isLoading: languagesLoading } = useQuery('getLanguages', getLanguages, {
    enabled: !isLogin,
    ...refetchQueries,
    onSuccess: (data) => {
      if (data?.data) {
        Dispatch(setLanguages(data?.data?.result));
        const currentLang = !lang ? getLang(data?.data?.result, navigator.language) : lang;
        if (currentLang) {
          handleChange(currentLang);
        }
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (value) => {
    setSelectedOption(value);
    setCookie('CultureCookie', value, 6);
    updateLanguageHeader();
  };

  const languageQueryKey = ['getAllTranslations', selectedOption];
  const { isLoading: translationsLoading } = useQuery(languageQueryKey, () => getAllTranslations(selectedOption), {
    ...refetchQueries,
    enabled: !!selectedOption,
    onSuccess: (data) => {
      Dispatch(setMessages(data?.data?.result));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {(showSpinner || languagesLoading || translationsLoading) && <Overlay showSpinner={true} />}
      <div>
        <LoginBG />
        <LoginNav handleChange={handleChange} selectedOption={selectedOption} setShowSpinner={setShowSpinner} />
        <Outlet context={[selectedOption, setShowSpinner]} />
      </div>
    </>
  );
}

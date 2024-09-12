import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { read_cookie } from 'sfcookies';
import { useSelector } from 'react-redux';

// landing component created to route to the right component after login or reloading
// the base url

function Landing(props) {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem('AuthToken');
  const ConfigData = useSelector((state) => state.config.configData);

  useEffect(() => {
    isLogin
      ? read_cookie('classicView') || ConfigData?.siteMode === 'GureCard'
        ? navigate('/Classic')
        : navigate('/Modern')
      : navigate('/PreLoginLanding');
  }, []);

  return <></>;
}

export default Landing;

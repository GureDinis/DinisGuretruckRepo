import React, { useEffect, useState } from 'react';
import style from './LoginBG.module.scss';
import { useSelector } from 'react-redux';

function LoginBG(props) {
  const width = window.innerWidth;
  const [mobileView, setMobileView] = useState(false);
  //const daytime = useSelector((state) => state.theme.dst);

  useEffect(() => {
    if (width <= 767) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [width]);

  return (
    <div className={style.loginBG}>
      {!mobileView ? (
        <video src={'/images/Login - Night.mp4'} loop autoPlay muted playsInline />
      ) : (
        <img src={'/images/Truck_Night.png'} alt="" />
      )}
    </div>
  );
}

export default LoginBG;

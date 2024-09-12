import React, { useEffect, useRef, useState } from 'react';
import style from './ModernView.module.scss';
import { Tooltip } from 'antd';
import { Content } from 'antd/es/layout/layout.js';
import { useSelector } from 'react-redux';
import HomeComponent from './home/HomeComponent.jsx';
import Overlay from '../common/Overlay.jsx';

export default function ModernView(props) {
  const [windowSize, setWindowSize] = useState({ height: window.innerHeight });
  const iframeURL = useSelector((state) => state.frame.iframeURL);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleResize = () => {
    setWindowSize({
      height: window.innerHeight,
    });
  };

  const handleIframeLoad = () => {
    setShowSpinner(false);
  };

  const handleIframeError = () => {
    setShowSpinner(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (iframeURL !== '') {
      setShowSpinner(true);
    }
  }, [iframeURL]);

  //full screen functions

  const fullScreenRef = useRef();

  const handleFullScreenClick = () => {
    openFullScreen();
  };

  const openFullScreen = () => {
    if (fullScreenRef.current) {
      if (fullScreenRef.current.requestFullscreen) {
        fullScreenRef.current.requestFullscreen();
      } else if (fullScreenRef.current.mozRequestFullScreen) {
        // Firefox
        fullScreenRef.current.mozRequestFullScreen();
      } else if (fullScreenRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        fullScreenRef.current.webkitRequestFullscreen();
      } else if (fullScreenRef.current.msRequestFullscreen) {
        // IE/Edge
        fullScreenRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <Content style={{ height: '85dvh' }}>
        {showSpinner && <Overlay showSpinner={true} />}
        {iframeURL !== '' ? (
          <div className={style.iframeContainer}>
            <iframe
              ref={fullScreenRef}
              onLoad={() => handleIframeLoad()}
              onError={() => handleIframeError()}
              src={iframeURL}
              className={style?.iframe}
              height={windowSize.height - 90 + 'px'}
            />
            <Tooltip title="FullScreen" className={style.fullScreenbtn} onClick={handleFullScreenClick}>
              <img src="/images/fullScreen.png" alt="" />
            </Tooltip>
          </div>
        ) : (
          <HomeComponent />
        )}
      </Content>
    </>
  );
}

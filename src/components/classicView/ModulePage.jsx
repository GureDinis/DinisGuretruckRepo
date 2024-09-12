import React, { useEffect, useState } from 'react';
import style from './ModulePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { findItem } from '../../Helper.jsx';
import Overlay from '../common/Overlay.jsx';

export default function ModulePage(props) {
  const dispatch = useDispatch();
  const [frameHeight, setFrameHeight] = useState('100%');
  const [showSpinner, setShowSpinner] = useState(true);
  const data = useSelector((state) => state.siteData.data);
  const ConfigData = useSelector((state) => state.config.configData);
  const queryParams = new URLSearchParams(window.location.search);
  const key = queryParams.get('key');
  const item = findItem(data, key);

  const handleIframeLoad = () => {
    setShowSpinner(false);
    const frame = document.getElementById('myFrame');
    setFrameHeight(frame.contentWindow.document.body.scrollHeight + 'px');
  };

  const handleIframeError = () => {
    setShowSpinner(false);
  };

  useEffect(() => {
    dispatch({
      type: 'SETIFRAMEURL',
      iframeURL: ConfigData.reactJsUrl + item?.url,
    });
  }, []);

  return (
    <>
      {showSpinner && <Overlay showSpinner={true} />}
      <div className={style.pageContainer}>
        <iframe
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          id="myFrame"
          src={ConfigData.reactJsUrl + item?.url}
          className={style.iframe}
          height={frameHeight}
        />
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import style from './VideoSupport.module.scss';
import { Col, Row } from 'antd';
import VideosList from './VideosList.jsx';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

const VideoSupport = () => {
  const supportVideos = useSelector((state) => state?.user?.supportVideos);
  const [defaultVideo, setDefaultVideo] = useState('');
  const [selectedVideoInfo, setSelectedVideoInfo] = useState(null);

  useEffect(() => {
    if (supportVideos?.length > 0) {
      const defaultVideoUrl = `https://www.youtube.com/embed/${supportVideos[0]?.videoUrl}`;
      setDefaultVideo(defaultVideoUrl);
      setSelectedVideoInfo(supportVideos[0]);
    }
  }, [supportVideos]);

  return (
    <div className={style.videoSupportContainer}>
      <div className="primaryHeader">
        <div>
          <h1>
            <FormattedMessage id="VSTitle" defaultMessage="* Video Support" />
          </h1>
        </div>
      </div>
      <Row gutter={20} className={style.videoSupportBody}>
        <Col className={style.leftSection}>
          <VideosList
            setDefaultVideo={setDefaultVideo}
            defaultVideo={defaultVideo}
            setSelectedVideoInfo={setSelectedVideoInfo}
          />
        </Col>
        <Col className={style.rightSection}>
          <>
            {supportVideos?.length > 0 ? (
              <>
                <div className={style.videoContainer}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={defaultVideo}
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={style.videoInfo}>
                  <h2>{selectedVideoInfo?.name}</h2>
                </div>
              </>
            ) : (
              <div className={style.noVideoMessage}>
                <h1>
                  <FormattedMessage id="VSNoVideosMessage" defaultMessage="* No support videos available." />
                </h1>
              </div>
            )}
          </>
        </Col>
      </Row>
    </div>
  );
};

export default VideoSupport;

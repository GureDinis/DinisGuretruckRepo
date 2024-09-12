import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './VIdeosList.module.scss';
import { getSupportVideos } from '../../Api/Api.jsx';
import { useQuery } from 'react-query';
import { setSupportVideos } from '../../Redux/reducers/userSlice.js';
import Overlay from '../common/Overlay.jsx';
import { getLanguage } from '../../Helper.jsx';
const VideosList = ({ setDefaultVideo, defaultVideo, setSelectedVideoInfo }) => {
  const supportVideos = useSelector((state) => state.user.supportVideos);
  const dispatch = useDispatch();
  const language = getLanguage();

  const handleVideoClick = (videoUrl, name) => {
    setDefaultVideo(`https://www.youtube.com/embed/${videoUrl}`);
    setSelectedVideoInfo({ videoUrl: videoUrl, name: name });
  };

  const { isLoading } = useQuery(['supportVideos', language], () => getSupportVideos(language), {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setSupportVideos(data?.data?.result));
    },
  });

  return (
    <>
      {isLoading ? <Overlay showSpinner={true} /> : ''}

      <ul className={style.videosContainer}>
        {supportVideos?.map((video, index) => {
          const activeVideo = `https://www.youtube.com/embed/${video?.videoUrl}`;
          return (
            <li
              className={`${style.video} ${defaultVideo === activeVideo ? style.active : ''} `}
              key={index}
              onClick={() => {
                handleVideoClick(video?.videoUrl, video?.name);
              }}
            >
              <h2>
                {index} - {video?.name}
              </h2>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default VideosList;

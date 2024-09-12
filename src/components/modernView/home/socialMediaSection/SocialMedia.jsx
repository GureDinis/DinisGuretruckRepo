import React, { useState } from 'react';
import style from './SocialMedia.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GetBreakingNews, getSocialMediaData } from '../../../../Api/Api.jsx';
import { setSocialMediaData, setBreakingNews } from '../../../../Redux/reducers/siteDataSlice.js';
import { getLanguage } from '../../../../Helper.jsx';
import { ReactTicker } from '@guna81/react-ticker';
import { FormattedMessage } from 'react-intl';
import { Switch } from 'antd';

function SocialMedia(props) {
  //  const upComingSessions = useSelector(state => state.ConfigReducer.upComingSessions)
  const socialMediaData = useSelector((state) => state.siteData.socialMediaData);
  const breakingNews = useSelector((state) => state.siteData.breakingNews);
  const theme = useSelector((state) => state.theme.theme);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const dispatch = useDispatch();
  const language = getLanguage();

  useQuery(['socialMediaData', language], () => getSocialMediaData(language), {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setSocialMediaData(data?.data?.result));
    },
  });

  useQuery(['breakingNews'], () => GetBreakingNews(), {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setBreakingNews(data?.data?.result));
    },
  });

  const getSocialMedia = () => {
    return socialMediaData?.socialMediaList?.map((data) => {
      return (
        <Link to={data.link} target="_blank" key={data.id}>
          <img src={`/images/${theme}${data.imageUrl}`} alt={data.title} />
        </Link>
      );
    });
  };

  const renderItem = (item, index) => {
    return (
      <div className={style.tickerContent}>
        {index !== 0 && <p>|</p>}
        <h1 style={{ display: 'flex', whiteSpace: 'nowrap' }}>{item.news}</h1>
      </div>
    );
  };

  const onChange = (checked) => {
    setIsVideoVisible(checked);
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.cardContent}>
        <div className={style.cardTitle}>
          <div>
            <h2>{props.cardTitle}</h2>
            <Switch className={style.toggleBTN} defaultChecked onChange={onChange} />
          </div>
          <hr />
        </div>
        <div className={style.cardBody}>
          <div className={style.twitchContainer}>
            <div className={style.streamSection}>
              <Link to={`https://www.twitch.tv/${socialMediaData?.twitchChannelId}`} target="_blank">
                {isVideoVisible ? (
                  <div className={style.stream}>
                    <iframe
                      src={`https://player.twitch.tv/?channel=${socialMediaData?.twitchChannelId}&parent=${window.location.hostname}`}
                      frameborder="0"
                      allowFullscreen="true"
                    ></iframe>
                    {/* <img src="/images/Twitch.png" /> */}
                  </div>
                ) : (
                  <img src="/images/Modern/twitchBG.png" />
                )}
              </Link>
            </div>
            <div className={style.tickerContainer}>
              <div className={style.breakingNewsTitle}>
                <img src="/images/Modern/global.svg" alt="" />
                <span>
                  <FormattedMessage id="BreakingNews" defaultMessage="* Breaking News" />
                </span>
              </div>
              <ReactTicker
                tickerStyle={{ width: '100%', fontSize: '16px', fontWeight: '700' }}
                data={breakingNews}
                component={renderItem}
                speed={50}
              />
            </div>
          </div>
          <div className={style.socialMedia}>
            <h1>
              <FormattedMessage id="HPFollowUs" defaultMessage="* Follow Us" />
            </h1>
            {getSocialMedia()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;

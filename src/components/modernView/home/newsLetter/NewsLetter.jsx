import React, { useState } from 'react';
import style from './NewsLetter.module.scss';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getLanguage } from '../../../../Helper.jsx';
import { getLatestNews } from '../../../../Api/Api.jsx';
import NewsCalendar from '../../../SVGs/newsCalendar.jsx';
import { useSelector } from 'react-redux';

function NewsLetter(props) {
  const [latestNews, setLatestNews] = useState();
  const theme = useSelector((state) => state.theme.theme);
  const language = getLanguage();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, options).format(date);
  };

  useQuery(['latestNews'], () => getLatestNews(), {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLatestNews(data?.data?.result);
    },
  });

  return (
    <div className={style.cardContainer}>
      {/* <Link to={`https://guretruck.com/ReadNews/${latestNews?.idNew}/${language}`} target="_blank"> */}
      <div className={style.cardContent}>
        <div className={style.titleContainer}>
          <h2>{props.cardTitle}</h2>
          <hr />
        </div>
        <div className={style.newsContainer}>
          <div className={style.newsBody}>
            <iframe title="newsIframe" className={style.newsContent} id="newsIframe" srcDoc={latestNews?.body} />
            <div className={style.newsDate}>
              <NewsCalendar color={theme == 'light' ? '#000' : '#fff'} />
              <span>{latestNews?.creationDate ? formatDate(latestNews?.creationDate) : ''}</span>
            </div>
          </div>
          <div className={style.newsTitle}>
            <h2>{latestNews?.title}</h2>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default NewsLetter;

import React, { useRef } from 'react';
import style from './HomeComponent.module.scss';
import SocialMedia from './socialMediaSection/SocialMedia.jsx';
import CardsSection from './cardsSection/CardsSection.jsx';
import NewsLetter from './newsLetter/NewsLetter.jsx';
import { FormattedMessage } from 'react-intl';
import GuideLines from './guideLines/GuideLines.jsx';
import { useSelector } from 'react-redux';
import Calendar from '../../SVGs/Calendar.jsx';
import Chart from '../../SVGs/Chart.jsx';
import Support from '../../SVGs/Support.jsx';
import VideoPlay from '../../SVGs/VideoPlay.jsx';
import UserGroup from '../../SVGs/UserGroup.jsx';
import YoutubeIcon from '../../SVGs/YoutubeIcon.jsx';

function HomeComponent(props) {
  const siteMode = useSelector((state) => state?.user?.profileData?.siteMode);
  return (
    <div className={style.homeContainer}>
      <div className={style.leftHandSide}>
        {siteMode !== 5 && (
          <SocialMedia
            cardTitle={<FormattedMessage id="HPSocialMediaTitle" defaultMessage="* Social Media" />}
            cardImg="/images/socialMedia.png"
            cardUrl=""
          />
        )}
        <NewsLetter
          cardTitle={<FormattedMessage id="HPNewsLetterTitle" defaultMessage="* Newsletter" />}
          cardImg="/images/newsLetter.png"
          cardUrl=""
        />
        {siteMode === 5 && <GuideLines />}
      </div>
      <div className={style.rightHandSide}>
        {siteMode !== 5 && siteMode !== 6 && (
          <CardsSection
            cardTitle={<FormattedMessage id="HPRestrictionCalenderTitle" defaultMessage="* Restriction Calendar" />}
            cardImg="/images/Modern/RESTRICCIONESnewImage.png"
            cardUrl="/Modern/RestrictionsCalendar"
            cardIcon={<Calendar />}
          />
        )}
        <CardsSection
          cardTitle={<FormattedMessage id="HPMainNumbersTitle" defaultMessage="* Main Numbers" />}
          cardImg="/images/Modern/MainNumbersnewImage.png"
          cardUrl="/Modern/MainNumbers"
          cardIcon={<Chart />}
        />
        <CardsSection
          cardTitle={<FormattedMessage id="HPSupportTitle" defaultMessage="* Support" />}
          cardImg="/images/Modern/SupportnewImage.png"
          cardUrl="/Modern/SupportCenter"
          cardIcon={<Support />}
        />
        <CardsSection
          cardTitle={<FormattedMessage id="HPVideoSupportTitle" defaultMessage="* Video Support" />}
          cardImg="/images/Modern/VideoSupportnewImage.png"
          cardUrl="/Modern/VideoSupport"
          cardIcon={<VideoPlay />}
        />
        {siteMode === 5 && (
          <CardsSection
            cardTitle={<FormattedMessage id="HPYoutubeResourcesTitle" defaultMessage="* Youtube Resources" />}
            cardImg="/images/Modern/YoutubeResourcesCover.png"
            cardUrl=""
            siteMode={siteMode}
            cardIcon={<YoutubeIcon />}
          />
        )}
        {siteMode === 6 && (
          <CardsSection
            cardTitle={<FormattedMessage id="HPClientsTitle" defaultMessage="* Our Clients" />}
            cardImg="/images/Modern/ourClients.png"
            cardUrl=""
            siteMode={siteMode}
            cardIcon={<UserGroup />}
          />
        )}
      </div>
    </div>
  );
}

export default HomeComponent;

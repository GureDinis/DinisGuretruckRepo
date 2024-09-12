import React, { useState } from 'react';
import style from './CardsSection.module.scss';
import { Link } from 'react-router-dom';
import Resources from './Resources.jsx';
import Clients from './clients/Clients.jsx';

function CardsSection(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };
  function handleCardClick() {
    if (props.siteMode === 6 || 5) {
      setIsModalVisible(true);
    }
  }
  return (
    <div
      className={`${style.cardContainer} ${(props.siteMode === 6 || props.siteMode === 5) && style.noHover}`}
      onClick={handleCardClick}
    >
      <Link to={props.cardUrl} target={props?.Blank}>
        <div className={style.cardContent}>
          <h2>{props.cardTitle}</h2>
          <hr />
          <div className={style.imgContainer}>
            {props.siteMode === 5 && <Resources isModalVisible={isModalVisible} handleCancel={handleCancel} />}
            {props.siteMode === 6 && <Clients isModalVisible={isModalVisible} handleCancel={handleCancel} />}
            <img src={props.cardImg} alt="" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardsSection;

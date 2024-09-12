import React from 'react';
import style from './ArrowsHandler.module.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
const ArrowsHandler = ({ currentOptionIndex, setCurrentOptionIndex, optionsLength }) => {
  const handleLeftClick = () => {
    setCurrentOptionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : optionsLength - 1));
  };

  const handleRightClick = () => {
    setCurrentOptionIndex((prevIndex) => (prevIndex < optionsLength - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <div className={style.leftArrow} style={{ display: 'flex' }}>
        <LeftOutlined onClick={handleLeftClick} />
      </div>
      <div className={style.rightArrow} style={{ display: 'flex' }}>
        <RightOutlined onClick={handleRightClick} />
      </div>
    </>
  );
};

export default ArrowsHandler;

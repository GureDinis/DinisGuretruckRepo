import React from 'react';
import style from './CustomToolbar.module.scss';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const CustomToolbar = ({ label, date, setCurrentDate }) => {
  const navigate = (action) => {
    let newDate = new Date(date);

    if (action === 'PREV') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (action === 'NEXT') {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setCurrentDate(newDate);
  };
  return (
    <div className={style.customToolbar}>
      <h2 className={style.secondaryHeader}>{label}</h2>
      <div className={style.toolbarBtns}>
        <button type="button" onClick={() => navigate('PREV')}>
          <LeftOutlined style={{ fontSize: '1.2rem' }} />
        </button>
        <button type="button" onClick={() => navigate('NEXT')}>
          <RightOutlined style={{ fontSize: '1.2rem' }} />
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;

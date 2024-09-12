import React from 'react';
import { Tooltip } from 'antd';
import style from './SideMenu.module.scss';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

const Logo = ({ collapsed, onLogoClick }) => {
  const siteMode = useSelector((state) => state?.user?.profileData?.siteMode);
  return (
    <div onClick={onLogoClick} className={style.logoIcon}>
      <Tooltip title={<FormattedMessage id="NPHome" defaultMessage="* Home" />}>
        <img src={collapsed ? '/images/Logo-closed.png' : `/images/Logo${siteMode}.png`} alt="" />
      </Tooltip>
    </div>
  );
};

export default Logo;

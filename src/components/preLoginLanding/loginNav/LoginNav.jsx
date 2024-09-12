import React from 'react';
import style from './LoginNavDark.module.scss';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

const LoginNav = (props) => {
  const ConfigData = useSelector((state) => state.config.configData);
  const languages = useSelector((state) => state.language.languages);
  const kodeaLanguages = useSelector((state) => state.language.kodeaLanguages);
  const langs = ConfigData?.siteMode === 'Kodea' ? kodeaLanguages : languages;

  return (
    <div className={style?.loginNav}>
      <div>
        <img src={`/images/${ConfigData?.siteMode}white.png`} alt="" />
      </div>
      <div className={style?.langContainer}>
        <Select
          suffixIcon={<img src={'/images/arrow-down.svg'} alt="" />}
          onChange={props.handleChange}
          value={props.selectedOption}
          className={'dark'}
        >
          {langs?.map((lang) => (
            <Select.Option lang={lang?.id} key={lang?.id} value={lang?.id}>
              <img style={{ paddingRight: '10px' }} src={'/images/' + lang?.id + '.png'} alt="" />
              {lang?.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LoginNav;

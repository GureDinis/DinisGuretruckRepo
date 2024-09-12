import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
//import lightStyle from './RecoverAccount.module.scss';
import style from './RecoverAccountDark.module.scss';
import { FormattedMessage } from 'react-intl';
//import { useSelector } from 'react-redux';

const RecoverAccountLayout = () => {
  //const daytime = useSelector((state) => state.theme.dst);

  // const style = useMemo(() => {
  //   return daytime === '1' ? lightStyle : darkStyle;
  // }, [daytime]);

  return (
    <div className={style?.container}>
      <Outlet context={[style]} />
      <h4>
        <FormattedMessage id="Copyright" defaultMessage="* Copyright © 2023 (10.4)" />
      </h4>
    </div>
  );
};

export default RecoverAccountLayout;

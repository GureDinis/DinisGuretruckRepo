import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import RecoverOption from './recoverOptions/RecoverOption.jsx';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setRecoverOption } from '../../../Redux/reducers/siteDataSlice.js';

function RecoverAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [style] = useOutletContext();
  const intl = useIntl();

  const recoverPassword = () => {
    const passwordMessage = intl.formatMessage({
      id: 'Clave',
      defaultMessage: '* Password',
    });

    console.log(passwordMessage);
    dispatch(setRecoverOption(passwordMessage));
    navigate('/accountRecovery/recoverPassword');
  };

  const recoverUsername = () => {
    const usernameMessage = intl.formatMessage({ id: 'RAUserNameInputTitle', defaultMessage: '* Username' });

    dispatch(setRecoverOption(usernameMessage));
    navigate('/accountRecovery/recoverUsername');
  };

  return (
    <div className={style?.forgetPasswordContainer}>
      <div className={style?.contentHead}>
        <h2>
          <FormattedMessage id="RATitle" defaultMessage="* Recover Account" />
        </h2>
        <p>
          <FormattedMessage
            id="RADescription"
            defaultMessage="* If you forgot your password or username, follow these steps to recover your Account."
          />
        </p>
      </div>

      <div className={style?.recoverAccountContainer}>
        <div className={style?.recoverAccountOptions}>
          <RecoverOption
            onClick={recoverUsername}
            style={style?.recoverAccountOption}
            image="/images/recoverUsername.png"
            title={<FormattedMessage id="RAUserName" defaultMessage="* Recover Username" />}
          />
          <RecoverOption
            onClick={recoverPassword}
            style={style?.recoverAccountOption}
            image="/images/recoverPassword.png"
            title={<FormattedMessage id="RAPassword" defaultMessage="* Recover Password" />}
          />
        </div>

        <Button onClick={() => navigate('/')} className={style?.cancelBtn}>
          <FormattedMessage id="Cancel" defaultMessage="* Cancel" />
        </Button>
      </div>
    </div>
  );
}

export default RecoverAccount;

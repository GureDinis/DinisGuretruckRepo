import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useMutation } from 'react-query';
import { Row, Col, Input } from 'antd';
import ProfileHeader from '../profileHeader/ProfileHeader.jsx';
import style from '../Profile.module.scss';
import { FormattedMessage } from 'react-intl';
import { updateUserPassword } from '../../../Api/Api.jsx';
import useMessage from '../../../hooks/useMessage.js';
import { useIntl } from 'react-intl';

const ChangePassword = ({ title }) => {
  const profileData = useSelector((state) => state.user.profileData);
  const [userPW, setUserPW] = useState({
    currentPW: '',
    newPW: '',
    retypedNewPW: '',
  });
  const [error, setError] = useState(false);
  const { showError, showSuccess } = useMessage();
  const intl = useIntl();
  const CPPlaceholderText = intl.formatMessage({ id: 'CPCurrentPassword', defaultMessage: '* Current Password' });
  const NPPlaceholderText = intl.formatMessage({ id: 'CPNewPassword', defaultMessage: '* New Password' });
  const RNPPlaceholderText = intl.formatMessage({ id: 'CPRetypeNewPassword', defaultMessage: '* Retype New Password' });

  const handleInputChange = (field, value) => {
    setUserPW((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };

  const useChangePassword = () => {
    return useMutation(updateUserPassword);
  };
  const changePasswordMutation = useChangePassword();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPW.newPW !== userPW.retypedNewPW || userPW.newPW === '' || userPW.currentPW === '') {
      return;
    }
    if (userPW.newPW.length < 4) {
      return;
    }
    changePasswordMutation.mutate(
      {
        password: userPW.currentPW,
        newPassword: userPW.newPW,
        cif: profileData.CIF,
        userName: profileData.userName,
      },
      {
        onSuccess: (data) => {
          if (data?.statusCode === 200) {
            showSuccess(data?.messages[0]);
          }
        },
        onError: (error) => {
          console.log(error);
          message.destroy();
          showError(error?.response?.data?.messages[0]);
        },
      },
    );
  };
  const handleDiscard = () => {
    setUserPW({ currentPW: '', newPW: '', retypedNewPW: '' });
    setError(false);
  };
  const isDiscardBtnEnabled = () => {
    return userPW.currentPW !== '' || userPW.newPW !== '' || userPW.retypedNewPW !== '';
  };
  const isSaveBtnEnabled = () => {
    return (
      userPW.currentPW !== '' && userPW.newPW !== '' && userPW.newPW === userPW.retypedNewPW && userPW.newPW.length >= 4
    );
  };

  return (
    <>
      <ProfileHeader
        title={title}
        handleSubmit={handleSubmit}
        isSaveBtnEnabled={isSaveBtnEnabled()}
        isDiscardBtnEnabled={isDiscardBtnEnabled()}
        handleDiscard={handleDiscard}
      />
      <div className={`${style.contentWrapper} ${style.changePasswordContentWrapper}`}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Input
              placeholder={CPPlaceholderText}
              value={userPW.currentPW}
              onChange={(e) => handleInputChange('currentPW', e.target.value)}
              type="password"
            />
          </Col>
          <Col span={24} style={{ marginTop: '0.5rem' }}>
            <Input
              placeholder={NPPlaceholderText}
              value={userPW.newPW}
              type="password"
              onChange={(e) => {
                handleInputChange('newPW', e.target.value);
                userPW.newPW.length < 3 ? setError(true) : setError(false);
              }}
            />
            {error && (
              <label style={{ color: 'red' }}>
                <FormattedMessage
                  id="MYPasswordLength"
                  defaultMessage="* The new password must be at least 4 digits long."
                />
              </label>
            )}
          </Col>
          <Col span={24} style={{ marginTop: '0.5rem' }}>
            <Input
              placeholder={RNPPlaceholderText}
              value={userPW.retypedNewPW}
              onChange={(e) => handleInputChange('retypedNewPW', e.target.value)}
              type="password"
              status={userPW.retypedNewPW && userPW.retypedNewPW !== userPW.newPW ? 'error' : null}
            />
            {userPW.retypedNewPW && userPW.retypedNewPW !== userPW.newPW ? (
              <label style={{ color: 'red' }}>
                <FormattedMessage id="MYPasswordMatch" defaultMessage="* the password does not match" />
              </label>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChangePassword;

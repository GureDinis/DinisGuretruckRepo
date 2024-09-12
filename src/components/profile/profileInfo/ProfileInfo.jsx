import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { message } from 'antd';
import { useQueryClient } from 'react-query';
import ProfileHeader from '../profileHeader/ProfileHeader.jsx';
import ProfileAvatar from './profileAvatar/ProfileAvatar.jsx';
import { Input, Row, Col } from 'antd';
import style from '../Profile.module.scss';
import useMessage from '../../../hooks/useMessage.js';
import { setProfileData } from '../../../Redux/reducers/userSlice.js';

const ProfileInfo = ({ title, data, changeUserInfoMutation }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const profileData = useSelector((state) => state.user.profileData);
  const [initialUserInfo, setInitialUserInfo] = useState({
    name: '',
    surname: '',
    personalPhoto: '',
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    personalPhoto: '',
  });
  const { showError, showSuccess } = useMessage();

  useEffect(() => {
    setInitialUserInfo({
      name: data?.name || '',
      surname: data?.surname || '',
      personalPhoto: data?.personalPhoto || '',
    });
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: data?.name, // Update the username based on the data prop
      surname: data?.surname,
      personalPhoto: data?.personalPhoto,
    }));
  }, [data]);

  const handleInputChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };
  const handleAvatarChange = (personalPhoto) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      personalPhoto,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const changes = {};

    Object.keys(userInfo).forEach((key) => {
      if (userInfo[key] !== initialUserInfo[key]) {
        changes[key] = userInfo[key];
      }
    });

    if (Object.keys(changes).length > 0) {
      const mutationParams = {
        ...changes,
        notificationLanguage: 'es-ES',
        userId: profileData.userId,
        ...(changes.personalPhoto && { hasPhotoChange: true }), // Add hasPhotoChange only if personalPhoto is in changes
      };

      changeUserInfoMutation.mutate(mutationParams, {
        onSuccess: (data) => {
          if (data?.statusCode === 200) {
            showSuccess(data.messages[0]);
            queryClient.invalidateQueries('userProfile');
            dispatch(setProfileData({ ...profileData, ...changes }));
          }
        },
        onError: (error) => {
          console.log(error);
          message.destroy();
          showError(error?.response?.data?.messages[0]);
        },
      });
    }
  };

  const handleDiscard = () => {
    setUserInfo(initialUserInfo);
  };

  // Determine if the discard button should be enabled
  const isBtnEnabled = () => {
    return Object.keys(userInfo).some((key) => userInfo[key] !== initialUserInfo[key]);
  };

  return (
    <>
      <ProfileHeader
        handleSubmit={handleSubmit}
        title={title}
        handleDiscard={handleDiscard}
        isSaveBtnEnabled={isBtnEnabled()}
        isDiscardBtnEnabled={isBtnEnabled()}
      />
      <div className={`${style.contentWrapper} profile-info`}>
        <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
          <Col xl={5} lg={7}>
            <ProfileAvatar profileUrl={data?.personalPhoto} onAvatarChange={handleAvatarChange} />
          </Col>
          <Col xl={19} lg={17}>
            <Row gutter={[16, 16]}>
              <Col xl={8} lg={12}>
                <label>
                  <FormattedMessage id="MYUserAdminDemmed" defaultMessage="* Username for admin, can’t be changed" />
                </label>
                <Input value={data?.userName} disabled />
              </Col>
              <Col xl={8} lg={12}>
                <label>
                  <FormattedMessage id="MYUserMemberDemmed" defaultMessage="* Username for members, can’t be changed" />
                </label>
                <Input value={data?.visibleUserName} disabled />
              </Col>
              <Col xl={8} lg={24} className="col-lg-full">
                <label>
                  <FormattedMessage id="MYUserEmailDemmed" defaultMessage="* Email Address, can’t be changed" />
                </label>
                <Input value={data?.companyEMail} disabled />
              </Col>
              <Col xl={8} lg={12}>
                <label>
                  <FormattedMessage id="MYName" defaultMessage="* Name" />
                </label>
                <Input value={userInfo.name} onChange={(e) => handleInputChange('name', e.target.value)} />
              </Col>
              <Col xl={8} lg={12}>
                <label>
                  <FormattedMessage id="MYSurname" defaultMessage="* Surname" />
                </label>
                <Input value={userInfo.surname} onChange={(e) => handleInputChange('surname', e.target.value)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileInfo;

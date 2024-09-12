import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import style from './RequestForAccessModal.module.scss';
import { useSelector } from 'react-redux';
import ReusableButton from '../button/ReusableButton.jsx';

const RequestForAccessModal = ({ setIsRequestModalOpen, isRequestModalOpen, from, role }) => {
  const [comment, setComment] = useState('');
  const handleOk = () => {
    setIsRequestModalOpen(false);
    setComment('');
  };
  const disabledItem = useSelector((state) => state.user.disabledItem);
  const profileData = useSelector((state) => state.user.profileData);

  const handleSendingRequest = () => {
    setComment('');

    setIsRequestModalOpen(false);
  };

  return (
    <Modal
      open={isRequestModalOpen}
      onOk={handleOk}
      closable={false}
      width={600}
      centered={true}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className={style.requestContainer}>
        <div className={style.header}>
          <h2>Request Access to {disabledItem?.translatedKey}</h2>
          <hr />
        </div>

        {role === 'user' ? (
          <>
            <div className={style.description}>
              <span>
                This section provides access to all uploaded drivers and vehicles files which have an active/expired
                contract for TRUCKCONTROLLER.
              </span>
              <span>
                For Drivers, it implies missing files in certain periods. For vehicles, it implies that some missing
                files in certain periods with reasons.
              </span>
              <span>
                You can set the control dates for the uploading periods, the date from when you want to control periods
                without activity in vehicles, and periods where there is no speed information available.
              </span>
            </div>
            <Input
              className={style?.input}
              placeholder={'Add comments for your request'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div>
              <h3>Your Administrator</h3>
              <div className={style.administrator}>
                <img src="/images/administratorImg.png" alt="" />
                <div className={style.administratorInfo}>
                  <h2>Albert Johnson</h2>
                  <button>{profileData?.name}</button>
                </div>
              </div>
            </div>
            <div className={style.requestOptions}>
              <ReusableButton
                name="Send Request"
                backgroundColor={
                  from === 'modern' ? 'linear-gradient(90deg, #009de0 -13.95%, #30d5c8 115.12%)' : '#2c9cde'
                }
                borderRadius="5px"
                color="#fff"
                border="none"
                width={'auto'}
                onClick={handleSendingRequest}
              />

              <ReusableButton
                name="Cancel"
                backgroundColor="#fff"
                borderRadius="5px"
                color="#009de0"
                border="1px solid #009DE0"
                width={'auto'}
                onClick={handleOk}
              />
            </div>
          </>
        ) : (
          <>
            <div className={style.description}>
              <span>John Doe is requesting to access Files Storage & Export, You can either accept or decline.</span>
            </div>

            <div className={style.header}>
              <h2>Details</h2>
              <hr />
            </div>
            <div className={style.requestDetails}>
              <div className={style.infoGroup}>
                <div className={style.userRequestInfo}>
                  <span>Full Name</span>
                  <h3>John Doe</h3>
                </div>
                <div className={style.userRequestInfo}>
                  <span>Email Address</span>
                  <h3>Johndoe.232@truckcontroller.com</h3>
                </div>
              </div>
              <div className={style.userRequestInfo}>
                <span>Comments</span>
                <h3>Need to access this module to finish updating data</h3>
              </div>
            </div>
            <div>
              <div className={style.btnGroup}>
                <ReusableButton
                  name="Accept Request"
                  backgroundColor={
                    from === 'modern' ? 'linear-gradient(90deg, #009de0 -13.95%, #30d5c8 115.12%)' : '#2c9cde'
                  }
                  borderRadius="5px"
                  color="#fff"
                  border="none"
                  onClick={handleOk}
                />

                <ReusableButton
                  name="Decline"
                  backgroundColor="#fff"
                  borderRadius="5px"
                  color="#009de0"
                  border="1px solid #009DE0"
                  width={'auto'}
                  onClick={handleOk}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default RequestForAccessModal;

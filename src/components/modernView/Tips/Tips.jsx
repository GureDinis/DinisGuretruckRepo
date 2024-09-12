// TipsComponent.js
import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Tip from './Tip/Tip.jsx';
import style from './Tips.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTips, triggerModal } from '../../../Redux/reducers/siteDataSlice.js';
import { useMutation, useQuery } from 'react-query';
import { SetNewFeaturesAsReadForUser, getNewFeatures } from '../../../Api/Api.jsx';
import { getLanguage } from '../../../Helper.jsx';
import useMessage from '../../../hooks/useMessage.js';
import { useIntl } from 'react-intl';

const Tips = () => {
  const intl = useIntl();
  const [currentTip, setCurrentTip] = useState(1);
  const [dotIndex, setDotIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const tips = useSelector((state) => state.siteData.tips);
  const isModalOpen = useSelector((state) => state.siteData.isModalOpen);
  const dispatch = useDispatch();
  const language = getLanguage();
  const { showError, showSuccess } = useMessage();

  useQuery(['newFeatures', language], () => getNewFeatures(language), {
    enabled: isModalOpen,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setTips(data?.data?.result));
    },
  });

  const SetNewFeaturesAsReadMutation = useMutation(SetNewFeaturesAsReadForUser, {
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
      message.destroy();
      showError(error?.response?.data?.messages[0]);
    },
  });

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onClose = () => {
    dispatch(triggerModal(false));
  };

  const handleNext = () => {
    if (currentTip < tips?.length) {
      setCurrentTip(currentTip + 1);
      setDotIndex(dotIndex + 1);
    } else {
      onClose();
    }
  };

  //handle moving from a tip to any tip you want using the dots depending on its index
  const handleDotClick = (index) => {
    setDotIndex(index);
    setCurrentTip(index + 1);
  };

  const handleSkip = () => {
    if (isChecked) {
      SetNewFeaturesAsReadMutation.mutate();
      onClose();
    } else {
      onClose();
    }
  };

  const renderTips = () => {
    return tips?.map(
      (tip, index) =>
        index === currentTip - 1 && (
          <Tip key={tip.truckNewFeatureId} photoSrc={tip?.imageUrl} heading={tip?.title} content={tip?.description} />
        ),
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={currentTip < tips?.length ? handleNext : handleSkip}
      width={1040}
      closable={false}
      centered={true}
      style={{ textAlign: 'center' }}
      footer={[
        <>
          <div className={style.dontShow}>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <h3>{intl.formatMessage({ id: 'TipsSkipMessage', defaultMessage: '* Don’t show again' })}</h3>
          </div>
          <div className={style.footer}>
            <Button key="back" onClick={handleSkip}>
              {intl.formatMessage({ id: 'TipsSkipBTN', defaultMessage: '* Skip' })}
            </Button>
            <div key="dots" className={style.tipDots}>
              {/* Render dots based on the total number of tips */}
              {Array.from({ length: tips?.length }).map((_, index) => (
                <span
                  key={index}
                  className={`${style.tipDot} ${index + 1 === currentTip ? style.active : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
            <Button key="next" onClick={currentTip < tips?.length ? handleNext : handleSkip}>
              {currentTip < tips?.length
                ? intl.formatMessage({ id: 'TipsNextBTN', defaultMessage: '* Next' })
                : intl.formatMessage({ id: 'TipsDoneBTN', defaultMessage: '* Done' })}
            </Button>
          </div>
        </>,
      ]}
    >
      {renderTips()}
    </Modal>
  );
};

export default Tips;

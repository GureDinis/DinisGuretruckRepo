import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ReusableButton from '../../../common/button/ReusableButton.jsx';
import { useSelector } from 'react-redux';
import { Button, message } from 'antd';
import { validateOTP } from '../../../../Helper.jsx';
import { FormattedMessage } from 'react-intl';

export default function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(59);
  const [loading, setLoading] = useState(false);
  const [style] = useOutletContext();
  const navigate = useNavigate();
  const recoverOption = useSelector((state) => state.siteData.recoverOption);
  const sentOtp = useSelector((state) => state.siteData.sentOtp);

  const isValidOTP = validateOTP(otp, sentOtp);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      message.destroy();
      message.error(<FormattedMessage id="RVInputErrorMessage" defaultMessage="* Please fill all inputs." />);
      return;
    }
    if (!isValidOTP) {
      message.destroy();
      message.error(
        <FormattedMessage
          id="RVUserOtpErrorMessage"
          defaultMessage="* The OTP you entered is incorrect. Please re-enter the OTP."
        />,
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (recoverOption === 'username') {
        navigate('/', { replace: true });
        message.success(
          <FormattedMessage id="RVUserNameSuccessMessage" defaultMessage="* A username has been sent to your email." />,
        );
      } else {
        navigate('/accountRecovery/newPassword', { replace: true });
        message.info(<FormattedMessage id="RVSuccessMessage" defaultMessage="* You are now resetting your password" />);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendCode = () => {
    message.success(<FormattedMessage id="RVResendSuccessMessage" defaultMessage="* Code has been resent" />);
    setTimer(59);
  };

  const renderResendMessage = () => {
    return timer === 0 ? (
      <p className={style?.resend} onClick={handleResendCode}>
        <FormattedMessage id="RVResend" defaultMessage="* Resend Code" />
      </p>
    ) : (
      <span>
        <FormattedMessage id="RVResend" defaultMessage="* Resend Code" /> in {''}
        {timer} sec
      </span>
    );
  };

  return (
    <div className={style?.recoverContainer}>
      <h2 className={style?.recoverHeader}>
        <FormattedMessage id="RAVerifyEmail" defaultMessage="* Verify your Email" />
      </h2>
      <p>
        <FormattedMessage id="RVmessage" defaultMessage="* Enter the code that we sent to your email" />
      </p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>&nbsp;&nbsp;</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle={style?.otpInput}
        shouldAutoFocus={true}
        inputType={'tel'}
      />
      <p>{renderResendMessage()}</p>

      <Button type="primary" htmlType="submit" className={style?.nextBtn} loading={loading} onClick={handleVerify}>
        <FormattedMessage id="RAVerifyBTN" defaultMessage="* Verify" />
      </Button>

      <Button onClick={() => navigate(-1)} className={style?.cancelBtn}>
        <FormattedMessage id="Atras" defaultMessage="* back" />
      </Button>
    </div>
  );
}

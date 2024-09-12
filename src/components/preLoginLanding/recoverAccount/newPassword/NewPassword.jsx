import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { FormattedMessage } from 'react-intl';

const NewPassword = () => {
  const [style] = useOutletContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    const { password, confirmPassword } = values;
    setLoading(true);
    setTimeout(() => {
      if (password !== confirmPassword) {
        message.error(
          <FormattedMessage
            id="NPWrongMatch"
            defaultMessage="* Passwords do not match. Please retype your password."
          />,
        );
        setLoading(false);
        return;
      }
      message.success(
        <FormattedMessage id="NPsuccessMessage" defaultMessage="* Password has been changed successfully.." />,
      );
      navigate('/', { replace: true });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={style?.recoverContainer}>
      <h2 className={style?.recoverHeader}>
        <FormattedMessage id="NPTitle" defaultMessage="* New Password" />
      </h2>
      <p>
        <FormattedMessage id="NPDescription" defaultMessage="* Enter your new password" />
      </p>

      <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} className={style?.form}>
        <Form.Item
          name="password"
          required
          rules={[
            {
              required: true,
              message: <FormattedMessage id="NPnewPassword" defaultMessage="* Please enter your new password" />,
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          required
          rules={[
            {
              required: true,
              message: <FormattedMessage id="NPConfirmPassword" defaultMessage="* Please confirm your new password" />,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  <FormattedMessage
                    id="NPWrongMatch"
                    defaultMessage="* Passwords do not match. Please retype your password"
                  />,
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Retype New Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={style?.nextBtn} loading={loading}>
            <FormattedMessage id="NPChangePasswordBTN" defaultMessage="* Change Password" />
          </Button>
        </Form.Item>

        <Button onClick={() => navigate('/')} className={style?.cancelBtn}>
          <FormattedMessage id="Cancel" defaultMessage="* Cancel" />
        </Button>
      </Form>
    </div>
  );
};

export default NewPassword;

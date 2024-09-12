import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../../../Redux/reducers/siteDataSlice.js';

function RecoveryForm({ header, handleNext }) {
  const [form] = Form.useForm();
  const [style] = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountsData = useSelector((state) => state.siteData.accountsData);

  const onFinish = (values) => {
    const { email } = values;
    const emailHasClients = accountsData.find((account) => account.email === email);

    if (emailHasClients) {
      if (emailHasClients.clients.length === 1) {
        dispatch(setEmail(emailHasClients.clients[0]));
        message.success('Your password has been sent to your email.');
        navigate('/', { replace: true });
      } else if (emailHasClients.clients.length > 1) {
        dispatch(setEmail(emailHasClients));
        handleNext();
      }
    } else {
      message.destroy();
      message.error('This email does not have any related accounts.');
    }
  };

  return (
    <div className={style?.recoverContainer}>
      <h2 className={style?.recoverHeader}>{header}</h2>
      <p>
        <FormattedMessage
          id="RUDescription"
          defaultMessage="* Enter your Email address and we will send your password to your email"
        />
      </p>

      <Form
        autoComplete="off"
        layout="vertical"
        name="recoverPasswordOrUsername"
        form={form}
        onFinish={onFinish}
        className={style?.form}
      >
        <Form.Item
          name="email"
          required
          rules={[
            {
              type: 'email',
              message: <FormattedMessage id="RAInvalidEmail" defaultMessage="* Invalid Email" />,
            },
            {
              required: true,
              message: <FormattedMessage id="RAEmptyEmail" defaultMessage="* Email is required" />,
            },
          ]}
        >
          <Input placeholder="Email Address" className={style?.emailInput} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style?.nextBtn}>
            <FormattedMessage id="RANextBTN" defaultMessage="* Next" />
          </Button>
        </Form.Item>

        <Button onClick={() => navigate('/')} className={style?.cancelBtn}>
          <FormattedMessage id="Atras" defaultMessage="* back" />
        </Button>
      </Form>
    </div>
  );
}

export default RecoveryForm;

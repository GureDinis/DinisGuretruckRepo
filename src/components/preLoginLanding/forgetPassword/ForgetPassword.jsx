import React from 'react';
//import lightStyle from './ForgetPassword.module.scss';
import style from './ForgetPasswordDark.module.scss';
import { Button, Form, Input, message } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { RecoverUserPassword } from '../../../Api/Api.jsx';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../../hooks/useMessage.js';

function ForgetPassword() {
  const intl = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { showError, showSuccess } = useMessage();

  const recoverPasswordMutation = useMutation((values) => RecoverUserPassword(values), {
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        showSuccess(data?.data?.messages[0]);
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error);
      message.destroy();
      showError(error?.response?.data?.messages[0]);
    },
  });

  const { mutate, isLoading } = recoverPasswordMutation;

  const onFinish = (values) => {
    mutate(values);
  };

  const cancelBtnClick = () => {
    navigate('/');
  };

  return (
    <div className={style?.contaier}>
      <div className={style?.forgetPasswordContainer}>
        <div className={style?.contentHead}>
          <span>
            <FormattedMessage id="Olvido su contrasena?" defaultMessage="* Have you forgotten your password" />
          </span>
          <p>
            <FormattedMessage
              id="Introduzca su CIF y le enviaremos su clave a e-mail 'Truckcontroller'"
              defaultMessage="* Enter your CIF (tax ID number) and we will send your administrator password to your nominated Truckcontroller e-mail"
            />
          </p>
        </div>
        <div className={style?.boxContainer}>
          <div className={style?.formContainer}>
            <Form
              form={form}
              autoComplete="off"
              layout="vertical"
              name="login"
              onFinish={onFinish}
              className={style?.form}
            >
              <Form.Item
                name="customerVatNumber"
                // label={<FormattedMessage id="CLIENTE" defaultMessage="* Client" />}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="CustomerIdentificationErrorMessage"
                        defaultMessage="* You have to fill customer identification"
                      />
                    ),
                  },
                ]}
              >
                <Input
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'CLIENTE',
                    defaultMessage: '* Client',
                  })}
                />
              </Form.Item>
              <Form.Item
                name="user"
                // label={<FormattedMessage id="tc.Usuario" defaultMessage="* User" />}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="Obligatorio" defaultMessage="* User required" />,
                  },
                ]}
              >
                <Input
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'Usuario',
                    defaultMessage: '* User',
                  })}
                />
              </Form.Item>
              <Form.Item className={style?.submitBtnContainer}>
                <Button className={style?.submitBtn} type="primary" htmlType="submit" loading={isLoading}>
                  <FormattedMessage id="Send" defaultMessage="* Send" />
                </Button>
              </Form.Item>
              <Form.Item className={style?.submitBtnContainer}>
                <Button onClick={() => cancelBtnClick()} className={style?.cancelBtn}>
                  <FormattedMessage id="Cancel" defaultMessage="* Cancel" />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

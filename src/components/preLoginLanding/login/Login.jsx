import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
//import lightStyle from './LoginLight.module.scss';
import style from './LoginDark.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCookie } from '../../../Helper.jsx';
import { legacyLogin, login } from '../../../Api/Api.jsx';
import {
  setRefetchClassic,
  setRefetchFavs,
  setRefetchModern,
  triggerModal,
} from '../../../Redux/reducers/siteDataSlice.js';
import { setProfileData } from '../../../Redux/reducers/userSlice.js';
import { setData, setModernData } from '../../../Redux/reducers/siteDataSlice.js';
import useMessage from '../../../hooks/useMessage.js';

const Login = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { showError, showSuccess } = useMessage();
  const [selectedOption, setShowSpinner] = useOutletContext();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const ConfigData = useSelector((state) => state.config.configData);
  const storedCif = localStorage.getItem('cif') || '';
  const storedUserName = localStorage.getItem('userName') || '';
  const storedPassword = localStorage.getItem('userPassword') || '';
  const checked = localStorage.getItem('rememberMe') === 'true';
  //const daytime = useSelector((state) => state.theme.dst);
  let AuthToken = '';

  const changeClientID = (e) => {
    form.setFieldsValue({ userName: e.target.value });
  };

  const clearLocalStorageAndDispatch = () => {
    dispatch(setModernData([]));
    dispatch(setData([]));
    localStorage.removeItem('Moderndata');
    localStorage.removeItem('data');
  };

  const onFinish = (values) => {
    if (values.remember) {
      localStorage.setItem('cif', values.cif);
      localStorage.setItem('userName', values.userName);
      localStorage.setItem('userPassword', values.password);
    } else {
      localStorage.removeItem('cif');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPassword');
    }
    setShowSpinner(true);
    if (!values?.userName) {
      values.userName = '';
    }
    login(values)
      .then((data) => {
        if (data?.data?.result.userId) {
          AuthToken = data?.data?.result?.token;
          dispatch(setProfileData({ ...data?.data?.result, loggedSince: new Date() }));
          setShowSpinner(false);
          sessionStorage.setItem('userID', JSON.stringify(data.data.result.userId));
          sessionStorage.setItem('CustomerId', JSON.stringify(data.data.result.customerId));
          sessionStorage.setItem('mode', JSON.stringify(data.data.result.siteMode));
          sessionStorage.setItem('AuthToken', JSON.stringify(AuthToken));
          setCookie('CultureCookie', selectedOption, 4);
          setCookie('AuthToken', AuthToken, 4);
          dispatch(setRefetchModern(true));
          dispatch(setRefetchClassic(true));
          dispatch(setRefetchFavs(true));
          clearLocalStorageAndDispatch();
          if (!data?.data?.result?.hasNotReadNewFeatures) {
            dispatch(triggerModal(false));
          } else {
            dispatch(triggerModal(true));
          }
          legacyLogin(values)
            .then((data) => {
              if (data.data.d) {
                navigate('/');
              } else {
                message.destroy();
                showError('something went wrong');
                setShowSpinner(false);
              }
            })
            .catch((error) => {
              setShowSpinner(false);
              console.log(error);
            });
        } else {
          message.destroy();
          showError('something went wrong');
        }
      })
      .catch((error) => {
        message.destroy();
        showError(error?.response?.data?.messages[0]);
        setShowSpinner(false);
        console.log(error);
      });
  };
  const handleRememberMeChange = (e) => {
    localStorage.setItem('rememberMe', e.target.checked);
  };

  // const style = useMemo(() => {
  //   return daytime === '1' ? lightStyle : darkStyle;
  // }, [daytime]);

  return (
    <div className={style?.contaier}>
      <div className={style?.loginContainer}>
        <div className={style?.contentHead}>
          <span>
            <FormattedMessage id="Sign In" defaultMessage="* Sign In" />
          </span>
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
              initialValues={{
                cif: storedCif,
                userName: storedUserName,
                password: storedPassword,
                remember: checked,
                //remember: Boolean(storedCif && storedUserName && storedPassword),
              }}
            >
              <Form.Item
                name="cif"
                // label={<FormattedMessage id="CLIENTE" defaultMessage="* Client" />}
                requiredMark="optional"
                onChange={changeClientID}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="Obligatorio" defaultMessage="* Client required" />,
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
              {ConfigData?.siteMode !== 'GureCard' && (
                <Form.Item
                  name="userName"
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
              )}
              <Form.Item
                name="password"
                // label={<FormattedMessage id="Contrasea" defaultMessage="* Password" />}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="Obligatorio" defaultMessage="* Password required" />,
                  },
                ]}
              >
                <Input
                  type="password"
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'Clave',
                    defaultMessage: '* Password',
                  })}
                />
              </Form.Item>
              <Form.Item className={style?.submitBtnContainer}>
                <Button className={style?.submitBtn} type="primary" htmlType="submit">
                  <FormattedMessage id="Sign In" defaultMessage="* Sign In" />
                </Button>
              </Form.Item>
              <div className={style?.rememberMe}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox onChange={handleRememberMeChange}>
                    <FormattedMessage id="RememberMe" defaultMessage="* Save the session" />
                  </Checkbox>
                </Form.Item>

                <Link to={'/recoverPassword'} className={`${style?.forgetPass} ${style?.aTags}`} href="">
                  <FormattedMessage id="Recupere su contraseña" defaultMessage="* Recover Password" />
                </Link>
              </div>
              <div className={style?.requestInfo}>
                <Link to={'/requestInfo'} className={style?.aTags} href="">
                  <FormattedMessage id="SolicitarInformacion" defaultMessage="* Request for information" />
                </Link>
              </div>
            </Form>
            <div className={style?.verContainer}>
              <label>
                <FormattedMessage id={`Copyright`} defaultMessage={`* Copyright`} />
                {ConfigData.version}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

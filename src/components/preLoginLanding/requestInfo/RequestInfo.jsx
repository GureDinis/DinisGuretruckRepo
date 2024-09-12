import React from 'react';
import style from './RequestInfoDark.module.scss';
import { Button, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { useIntl } from 'react-intl';
import { RequestForInfo, getCountries } from '../../../Api/Api.jsx';
import { useMutation, useQuery } from 'react-query';
import { setCountries } from '../../../Redux/reducers/siteDataSlice.js';
import { getCookie, getLanguage, refetchQueries } from '../../../Helper.jsx';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import useMessage from '../../../hooks/useMessage.js';

function RequestInfo() {
  const intl = useIntl();
  const [, setShowSpinner] = useOutletContext();
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isLogin = getCookie('AuthToken');
  const countries = useSelector((state) => state.siteData.countries);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const language = getLanguage();

  const onFinishMutation = useMutation((values) => RequestForInfo(values), {
    onSuccess: (data) => {
      if (data?.data?.statusCode === 200) {
        setShowSpinner(false);
        showSuccess(data?.data?.messages[0]);
        navigate('/');
      }
    },
    onError: (error) => {
      console.log(error);
      showError('an error occured');
      setShowSpinner(false);
    },
  });

  useQuery(['countries', language], () => getCountries(language), {
    ...refetchQueries,
    enabled: !isLogin,
    onSuccess: (data) => {
      dispatch(setCountries(data?.data?.result));
    },
  });

  const onFinish = (values) => {
    setShowSpinner(true);
    onFinishMutation.mutate(values);
  };

  const cancelBtnClick = () => {
    navigate('/');
  };

  return (
    <div className={style?.contaier}>
      <div className={style?.RequestInfoContainer}>
        <div className={style?.contentHead}>
          <span>
            {intl.formatMessage({
              id: 'SolicitarInformacion',
              defaultMessage: '* Request Information',
            })}
          </span>
          <p>To receive information about our services fill out the form and we will contact you shortly.</p>
        </div>
        <div className={style?.boxContainer}>
          <div className={style?.formContainer}>
            <Form
              form={form}
              autoComplete="off"
              layout={'vertical'}
              name="login"
              onFinish={onFinish}
              className={style?.form}
            >
              <Form.Item
                name="company"
                // label={intl.formatMessage({ id: 'enterprise', defaultMessage: '* Company', })}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'Obligatorio',
                      defaultMessage: '* Company required',
                    }),
                  },
                ]}
              >
                <Input
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'enterprise',
                    defaultMessage: '* Company',
                  })}
                />
              </Form.Item>
              <Form.Item
                name="eMail"
                // label={intl.formatMessage({ id: 'email', defaultMessage: '* Email', })}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'Obligatorio',
                      defaultMessage: '* Email required',
                    }),
                  },
                  {
                    validator: (_, value) => {
                      if (value && !emailRegex.test(value)) {
                        return Promise.reject(
                          intl.formatMessage({
                            id: 'Incorrect',
                            defaultMessage: '* Please enter a valid email',
                          }),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'email',
                    defaultMessage: '* Email',
                  })}
                />
              </Form.Item>
              <Form.Item
                name="contactName"
                // label={intl.formatMessage({ id: 'Contacto', defaultMessage: '* Contact', })}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'Obligatorio',
                      defaultMessage: '* Contat name required',
                    }),
                  },
                ]}
              >
                <Input
                  className={style?.input}
                  placeholder={intl.formatMessage({
                    id: 'Contacto',
                    defaultMessage: '* Contact',
                  })}
                />
              </Form.Item>
              <Form.Item
                name="country"
                // label={intl.formatMessage({ id: 'Pais', defaultMessage: '* Country', })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'Obligatorio',
                      defaultMessage: '* Contat name required',
                    }),
                  },
                ]}
              >
                <Select
                  className={`${style?.dark} ${style?.input}`}
                  suffixIcon={''}
                  placeholder={intl.formatMessage({
                    id: 'selectCountry',
                    defaultMessage: '* Select Country',
                  })}
                  showSearch
                  optionFilterProp="children"
                >
                  {countries?.map((country) => (
                    <Select.Option key={country?.countryId} value={country?.countryName}>
                      {country?.countryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="message"
                // label={intl.formatMessage({ id: 'message', defaultMessage: '* Message', })}
                requiredMark="optional"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'Obligatorio',
                      defaultMessage: '* Message required',
                    }),
                  },
                ]}
              >
                <TextArea
                  className={style?.textArea}
                  style={{ height: '145px', resize: 'none' }}
                  placeholder={intl.formatMessage({
                    id: 'message',
                    defaultMessage: '* Message',
                  })}
                />
              </Form.Item>
              <Form.Item className={style?.submitBtnContainer}>
                <Button className={style?.submitBtn} type="primary" htmlType="submit">
                  {intl.formatMessage({ id: 'Send', defaultMessage: '* Send' })}
                </Button>
                <Button onClick={() => cancelBtnClick()} className={style?.cancelBtn}>
                  {intl.formatMessage({
                    id: 'Cancel',
                    defaultMessage: '* Cancel',
                  })}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestInfo;

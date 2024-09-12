import React from 'react';
import style from './CDetailsMandatory.module.scss';
import { Form, Flex, Input, Button, Row, Col, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import CustomSelect from './customSelect/CustomSelect.jsx';

const CDetailsMandatory = () => {
  return (
    <div className={style.inputContainer}>
      <div className={style.title}>
        <h2>Client Details Mandatory</h2>
      </div>
      <div className={style.separator}></div>

      <Row className={style.firstData}>
        <Flex horizontal gap={12} style={{ alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold' }}>Company</label>
          <Input
            variant="filled"
            rules={[
              {
                required: true,
                message: 'Please input your company!',
              },
            ]}
          />
        </Flex>

        <Flex horizontal gap={12} style={{ alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold' }}>Country </label>
          <CustomSelect />
        </Flex>

        <Flex horizontal gap={12} style={{ alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold' }}>Corporate tax I.D number </label>
          <Input
            variant="filled"
            rules={[
              {
                required: true,
                message: 'Please input your company!',
              },
            ]}
          />
        </Flex>
      </Row>
    </div>
  );
};

export default CDetailsMandatory;

// Example of how to add rules to an input to make it required
{
  /* <Form.Item
label="Company"
name="company"
rules={[
    {
        required: true,
        message: 'Please input your company!',
    },
]}
> */
}

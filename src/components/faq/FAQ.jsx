import React from 'react';
import { Col, Row } from 'antd';
import FAQCategories from './faqCategories/FAQCategories.jsx';
import style from './FAQ.module.scss';
import FAQAccordion from './faqAccordion/FAQAccordion.jsx';

const FAQ = () => {
  return (
    <Row className={style.FAQWrapper}>
      <Col span={8}>
        <FAQCategories />
      </Col>
      <Col style={{ paddingInlineStart: '1.5rem' }} span={16}>
        <FAQAccordion />
      </Col>
    </Row>
  );
};

export default FAQ;

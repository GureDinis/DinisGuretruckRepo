import React from 'react';
import styles from './FAQCategory.module.scss';
import { Col } from 'antd';
import classNames from 'classnames';

const FAQCategory = ({ title, icon, isSelected, onSelect }) => {
  return (
    <Col span={12}>
      <div className={classNames(styles.FAQCategory, { [styles.selected]: isSelected })} onClick={onSelect}>
        <img src={icon} alt={`${title} icon`} />
        <span>{title}</span>
      </div>
    </Col>
  );
};

export default FAQCategory;

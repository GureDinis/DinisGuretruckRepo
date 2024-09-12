import React from 'react';
import style from './MainCard.module.scss';
import { Col, Row } from 'antd';
import { formatMoney } from '../../../Helper.jsx';
import { useIntl } from 'react-intl';

function MainCard({
  width,
  header,
  title,
  CustomComponent,
  cardInfo,
  span,
  secondComponent,
  componentWidth,
  secondComponentWidth,
  secondTitle,
  height,
  hasBG,
  dataCard,
  value,
  reverse,
}) {
  const intl = useIntl();
  return (
    <div className={style.mainCard} style={{ width: width + '%', height: height }}>
      <div className={style.cardHeader}>{header}</div>
      <div style={{ flexDirection: reverse && 'column-reverse' }} className={style.cardBody}>
        <div className={style.customComponent}>
          {dataCard ? (
            <div className={style.custom} style={{ width: componentWidth ? componentWidth + '%' : '100%' }}>
              {CustomComponent()}
              <div className={style.chartTitle}>{title}</div>
              <div className={style.value}>{value}</div>
            </div>
          ) : (
            <>
              <div className={style.custom} style={{ width: componentWidth ? componentWidth + '%' : '100%' }}>
                <div className={style.chartTitle}>{title}</div>
                {CustomComponent()}
              </div>
              {secondComponent && (
                <div className={`${style.custom} ${hasBG && style.BG}`} style={{ width: secondComponentWidth + '%' }}>
                  <div className={style.chartTitle}>{secondTitle}</div>
                  {secondComponent()}
                </div>
              )}
            </>
          )}
        </div>
        {cardInfo && (
          <Row gutter={40} style={{ borderRadius: reverse && '0' }} className={style.cardInfo}>
            {Object.entries(cardInfo)?.map(([key, value]) => (
              <Col span={span} className={style.infoItem}>
                <div style={{ fontSize: reverse && '16px' }} className={style.itemkey}>
                  {intl.formatMessage({ id: key, defaultMessage: key })}
                  {reverse && <span className={style.itemValue}>{formatMoney(value)}</span>}
                </div>
                {reverse || <div className={style.itemValue}>{formatMoney(value)}</div>}
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MainCard;

// ParentCards.jsx
import React from 'react';
import { Card } from 'antd';
import style from './ClassicView.module.scss'; // Import the style if necessary
import { FormattedMessage } from 'react-intl';

const ParentCards = ({ data, openModule }) => {
  return (
    <div className={style.parentCards}>
      {data?.map((item) =>
        !item?.hideClassic ? (
          !item?.footer ? (
            <Card
              key={item?.key}
              hoverable={item?.isEnable}
              className={`${style.cardItem} ${!item?.isEnable && style.disabled}`}
              bordered={false}
              onClick={() => {
                if (item?.isEnable) {
                  openModule(item);
                }
              }}
            >
              <div className={style.cardInfo}>
                <span>
                  <FormattedMessage id={`${item?.translatedKey}`} defaultMessage={`${item?.label}`} />
                </span>
                <img
                  src={item?.iconName ? '/images/classic/' + item?.iconName : '/images/classic/' + item?.key + '.png'}
                  alt=""
                />
                {item?.secKey ? (
                  <span>
                    <FormattedMessage id={`${item?.secKey}`} defaultMessage={`${item?.secLabel}`} />
                  </span>
                ) : (
                  ''
                )}
              </div>
            </Card>
          ) : (
            ''
          )
        ) : (
          ''
        ),
      )}
    </div>
  );
};
export default ParentCards;

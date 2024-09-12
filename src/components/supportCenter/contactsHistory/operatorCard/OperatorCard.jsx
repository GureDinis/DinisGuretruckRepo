import React from 'react';
import { FormattedMessage } from 'react-intl';
import style from './OperatorCard.module.scss';

const OperatorCard = ({ operator, openChat }) => {
  return (
    <>
      <div className={style.operator}>
        <img
          className={`${style.OperatorImg} ${operator.isOnline ? style.online : style.offline}`}
          src={operator.photo ? operator.photo : '/images/operatorIcon.svg'}
          alt=""
        />
        <div className={style.operatorCard} bordered={false}>
          <div className={style.name}>
            <span>{operator.workerName}</span>
          </div>
          <div className={style.OperatorInfo}>
            <div className={style.supportLanguages}>
              {operator?.languages?.map((lang) => (
                <span key={operator.idWorker + lang} className={style.language}>
                  <img src={`/images/Flags/${lang.languageCode}.png`} alt="" />
                  <span>{lang.language}</span>
                </span>
              ))}
            </div>
            <div className={style.contact}>
              <button className={operator.isOnline ? style.online : style.offline} onClick={() => openChat(operator)}>
                {operator.isOnline ? (
                  <FormattedMessage id="OPContactBTN" defaultMessage="* Chat Now!" />
                ) : (
                  <FormattedMessage id="OPOfflineBTN" defaultMessage="* Chat Offine" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperatorCard;

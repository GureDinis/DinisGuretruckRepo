import React, { useState } from 'react';
import style from './HistoryList.module.scss';
import { Badge, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setaAtiveOperator } from '../../../../Redux/reducers/userSlice';
import OperatorCard from '../operatorCard/OperatorCard.jsx';

function HistoryList(props) {
  const allOperators = useSelector((state) => state.siteData.allOperators);
  const activeOperator = useSelector((state) => state.user.activeOperator);
  const dispatch = useDispatch();

  const openChat = (operator) => {
    dispatch(setaAtiveOperator(operator));
  };

  return (
    <div className={style.historyListContainer}>
      <div className={style.Operators}>
        {allOperators?.map((operator) => (
          <OperatorCard operator={operator} openChat={openChat} activeOperator={activeOperator} />
        ))}
      </div>
    </div>
  );
}

export default HistoryList;

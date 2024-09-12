import React from 'react';
import style from './BackBTN.module.scss';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBreadCrumbsData } from '../../Redux/reducers/siteDataSlice';
import { setSelectedMenuItem, setIframeURL } from '../../Redux/reducers/frameSlice';
function BackBTN(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breadCrumbsData = useSelector((state) => state.siteData.breadCrumbsData);
  const goBack = () => {
    const BC = [...breadCrumbsData];
    dispatch(setIframeURL(''));
    dispatch(setSelectedMenuItem(''));
    BC.pop();
    dispatch(setBreadCrumbsData(BC));
    if (BC.length) {
      navigate({
        pathname: '/Classic/Cards',
        search: `?key=${BC[BC.length - 1]}`,
      });
    } else {
      navigate({
        pathname: '/Classic',
      });
    }
  };
  return (
    <div className={style.backBTNContainer}>
      <button hidden={breadCrumbsData.length === 0} onClick={() => goBack()} className={style.backBtn}>
        <FormattedMessage id="Atras" defaultMessage="* back" />
      </button>
    </div>
  );
}
export default BackBTN;

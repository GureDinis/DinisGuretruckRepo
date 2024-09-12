import React from 'react';
import PopupHeader from '../../common/popupHeader.jsx';
import style from './NavBar.module.scss';
import { FormattedMessage } from 'react-intl';
import { Empty, Menu } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const ShowFavorites = ({ favData, deleteAllFavsMutation, deleteFavs, sideItemclick }) => {
  return (
    <Menu className={style.favMenu}>
      <PopupHeader
        header={<FormattedMessage id="FDHeader" defaultMessage="* Favorites" />}
        option={<FormattedMessage id="FDOption" defaultMessage="* Clear All" />}
        handleClearAll={() => deleteAllFavsMutation.mutate()}
      />

      {favData?.length > 0 ? (
        favData?.map((item) => {
          return (
            <Menu.Item onClick={(e) => sideItemclick(item)} key={item?.menuKey} className={style.menuItem}>
              <div className={style.favItem}>
                <div className={style.favInfo}>
                  <img className={style.ChildImg} src={'/images/modern/' + item?.menuKey + '.png'} alt="" />
                  <span className={style.itemLabel}>
                    <FormattedMessage id={`${item?.translatedKey}`} defaultMessage={`${item?.label}`} />
                  </span>
                </div>
                <button className={style.deleteBTN} onClick={(e) => deleteFavs(item, e)}>
                  <DeleteFilled style={{ color: 'red' }} />
                </button>
              </div>
            </Menu.Item>
          );
        })
      ) : (
        <Menu.Item>
          <Empty description={false} />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default ShowFavorites;

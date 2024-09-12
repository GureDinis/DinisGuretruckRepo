import React from 'react';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import StarSVGComponent from '../../SVGs/StarSVGComponent.jsx';
import Lock from '../../SVGs/Lock.jsx';
import style from './SideMenu.module.scss';

const MenuItems = ({
  trees,
  renderTitle,
  sideItemclick,
  collapsed,
  addToFavs,
  openKeys,
  setOpenKeys,
  openClickedList,
  subMenuChange,
  selectedItem,
}) => {
  const getCustomContainer = () => {
    return document.getElementById('custom-submenu-container');
  };

  const renderMenuItems = (nodes) => {
    return nodes?.map((node) => {
      if (node?.children?.length > 0 && node?.isEnable) {
        return (
          <Menu.SubMenu
            popupClassName={style.sub}
            popupOffset={[0, 4]}
            key={node?.key}
            icon={
              <img
                className={`${style.menuImg} ${!node?.isEnable && style.imgDisabled}`}
                src={node?.iconName ? `/images/modern/${node?.iconName}` : `/images/modern/${node?.key}.png`}
                alt="menu icon"
              />
            }
            title={renderTitle(node)}
            onTitleMouseEnter={() => {
              if (openClickedList && openClickedList.length > 0 && openClickedList[0] === node.key) {
                setTimeout(() => {
                  setOpenKeys(openClickedList);
                }, 200);
              }
            }}
            onMouseEnter={() => {
              if (
                openKeys &&
                openClickedList &&
                openClickedList.every((v) => openKeys.includes(v)) &&
                openKeys.length > 0 &&
                openKeys.length >= openClickedList.length &&
                openClickedList[0] === node.path[0]
              ) {
                setTimeout(() => {
                  setOpenKeys(node.path);
                }, 200);
              }
            }}
          >
            {renderMenuItems(node?.children)}
          </Menu.SubMenu>
        );
      } else {
        return !node.footer ? (
          <Menu.Item
            onClick={() => sideItemclick(node)}
            className={!node.isEnable ? style.disabled : ''}
            key={node?.key}
            icon={
              <img
                className={`${style.menuImg} ${!node?.isEnable && style.imgDisabled}`}
                src={node?.iconName ? `/images/modern/${node?.iconName}` : `/images/modern/${node?.key}.png`}
                alt=""
              />
            }
            onMouseEnter={() => {
              if (
                openKeys &&
                openClickedList &&
                openClickedList.every((v) => openKeys.includes(v)) &&
                openKeys.length > 0 &&
                openKeys.length >= openClickedList.length &&
                openClickedList[0] === node.path[0]
              ) {
                setTimeout(() => {
                  setOpenKeys(node.path);
                }, 200);
              }
            }}
          >
            <div className={style.leftMenuItem}>
              <div className={style.leftMenuInfo}>
                {collapsed && node?.hideLabel ? (
                  ''
                ) : (
                  <span className={`${style.itemLabel} ${!node?.isEnable && style.labelDisabled}`}>
                    <FormattedMessage id={`tc.${node?.translatedKey}`} defaultMessage={`${node?.label}`} />
                  </span>
                )}
              </div>
              {node.isEnable ? (
                !node?.hasChildren && !node?.hideClassic ? (
                  <span
                    onClick={(e) => {
                      node?.isEnable && addToFavs(node, e);
                    }}
                    className="sideNavItemImg"
                  >
                    <StarSVGComponent
                      stroke={'#000'}
                      fill={node.favorite ? '#F2B749' : '#fff'}
                      width={'30'}
                      height={'30'}
                    />
                  </span>
                ) : (
                  ''
                )
              ) : (
                <span className="sideNavItemImg">
                  <Lock />
                </span>
              )}
            </div>
          </Menu.Item>
        ) : (
          ''
        );
      }
    });
  };

  const rootNodes = trees.map((tree) => tree.root);

  return (
    <Menu
      subMenuCloseDelay={0.4}
      subMenuOpenDelay={0.4}
      onOpenChange={subMenuChange}
      openKeys={openKeys}
      getPopupContainer={getCustomContainer}
      style={{ overflowY: 'hidden' }}
      selectedKeys={[selectedItem]}
    >
      {renderMenuItems(rootNodes)}
    </Menu>
  );
};

export default MenuItems;

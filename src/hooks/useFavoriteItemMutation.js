// useFavoriteItemMutation.js
import { useMutation, useQueryClient } from 'react-query';
import { deleteUserMenuFavorites, addUserMenuFavorites } from '../Api/Api.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setFavData } from '../Redux/reducers/userSlice.js';
import { findItem, updateItem } from '../Helper.jsx';
import { message } from 'antd';
import useMessage from './useMessage.js';

const useFavoriteItemMutation = (props) => {
  const dispatch = useDispatch();
  const favData = useSelector((state) => state.user.favData);
  let favDataTemb = [...favData];
  const queryClient = useQueryClient();
  let menuData = JSON.parse(localStorage.getItem('Moderndata'));
  const { showError, showSuccess } = useMessage();

  const deleteFavItemMutation = useMutation(deleteUserMenuFavorites, {
    onSuccess: (item, key) => {
      let favItem = findItem(menuData, key);
      const indexToRemoveTemp = favDataTemb.findIndex((item) => item?.menuKey === key);
      if (indexToRemoveTemp !== -1) {
        favDataTemb.splice(indexToRemoveTemp, 1);
        dispatch(setFavData([...favDataTemb]));
        updateItem(menuData, favItem);
        localStorage.setItem('Moderndata', JSON.stringify(menuData));
        queryClient.invalidateQueries('favorites');
      } else {
        console.error(`Favorite item with key ${key} not found in temporary data.`);
      }
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.messages[0] || 'An error occurred while deleting the favorite item.';
      console.error('Delete Favorite Item Error:', error);
      message.destroy();
      showError(errorMessage);
    },
  });

  const addFavItemMutation = useMutation(addUserMenuFavorites, {
    onSuccess: (item, key) => {
      let favItem = findItem(menuData, key);
      if (favItem) {
        const obj = {
          menuKey: favItem.key,
          translatedKey: favItem.translatedKey,
          label: favItem.label,
        };
        favDataTemb = [...favDataTemb, obj];
        updateItem(menuData, favItem);
        localStorage.setItem('Moderndata', JSON.stringify(menuData));
        queryClient.invalidateQueries('favorites');
      } else {
        console.error('Item not found in menuFav:', key);
      }
    },
    onError: (error) => {
      message.destroy();
      showError(error?.response?.data?.messages[0]);
    },
  });

  return { deleteFavItemMutation, addFavItemMutation };
};

export default useFavoriteItemMutation;

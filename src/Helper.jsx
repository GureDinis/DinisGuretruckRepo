// a helper js file created to hold all the functions used more than once
// and can be separated from the component

import { setBreadCrumbsData, setData, setModernData, setNumbers } from './Redux/reducers/siteDataSlice';
import { setIframeURL, setSelectedMenuItem } from './Redux/reducers/frameSlice';
import { setFavData } from './Redux/reducers/userSlice';
import { persistor } from './Redux/store';

// a function takes the data array and a specific key to
// return the item which equals that key
export const findItem = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item?.key === key) {
      return item;
    }
    if (item?.hasChildren && Array.isArray(item?.children)) {
      const found = findItem(item?.children, key);
      if (found !== undefined) {
        return found;
      }
    }
  }
};

export const getLang = (arr, key) => {
  let lang = '';
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item?.id?.startsWith(key)) {
      return item.id;
    } else lang = 'en-GB';
  }
  return lang;
};

// a function takes the data array and a specific item to
// update the favourited value in the item which equals that item key
export const updateItem = (arr, selectedItem) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item?.key === selectedItem.key) {
      return (item.favorite = !item.favorite);
    }
    if (item?.hasChildren && Array.isArray(item?.children)) {
      const found = updateItem(item?.children, selectedItem);
      if (found !== undefined) {
        return found;
      }
    }
  }
};

// a function to scroll the page to the top
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// a function to get an image from the images folder
export const getImg = (icon) => {
  try {
    return require(`./images${icon}`);
  } catch (error) {
    console.log(error);
  }
};

// a function to get the footer links (used only in classic view)
export const findFooterLinks = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item?.key === key) {
      return item;
    }
  }
};

export const setCookie = (name, value, hours) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000); // Convert hours to milliseconds
  const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookie;
};

export const getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getTimezoneName = () => {
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneAbbreviation =
    timezoneOffset < 0
      ? '+'
      : '-' +
        Math.abs(timezoneOffset / 60)
          .toString()
          .padStart(2, '0');
  return `${timezone}`;
};

export function isDayOrNight() {
  const dayStart = 6 * 60; // 6:00 AM in minutes (6 hours * 60 minutes)
  const nightStart = 18 * 60; // 6:00 PM in minutes (18 hours * 60 minutes)
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
  if (currentMinutes >= dayStart && currentMinutes < nightStart) {
    return '1'; // It is currently day
  } else {
    return '0'; // It is currently night
  }
}

export const refetchQueries = {
  // refetchOnMount: false, // Prevents initial fetch
  refetchOnReconnect: false, // Prevents refetching on reconnection
  refetchOnWindowFocus: false, // Prevents refetching on window focus   'always' should be used to update data dynamicaly if there is any update
};

export const clearUserData = (dispatch) => {
  persistor.purge();
  dispatch({ type: 'RESET_STATE' });
  removeCookie('masterPageLabels');
  removeCookie('AuthToken');
  sessionStorage.clear();
  const cif = localStorage.getItem('cif');
  const userName = localStorage.getItem('userName');
  const userPassword = localStorage.getItem('userPassword');
  const rememberMe = localStorage.getItem('rememberMe');
  localStorage.clear();
  if (cif) localStorage.setItem('cif', cif);
  if (userName) localStorage.setItem('userName', userName);
  if (userPassword) localStorage.setItem('userPassword', userPassword);
  if (rememberMe) localStorage.setItem('rememberMe', rememberMe);
};

export const validateOTP = (enteredOTP, sentOtp) => {
  // Check if the length of the entered OTP matches the sent OTP
  if (enteredOTP.length !== sentOtp.length) {
    return false;
  }
  // Compare each digit/letter of the entered OTP with the sent OTP
  for (let i = 0; i < sentOtp.length; i++) {
    if (enteredOTP[i] !== sentOtp[i]) {
      return false;
    }
  }
  // If all digits/letters match, return true
  return true;
};

export const formatMoney = (number) => {
  return number?.toLocaleString(getLanguage(), {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const calculatePercentageChange = (previousNumber, currentNumber) => {
  if (previousNumber === 0) {
    return 'Cannot calculate percentage change when the previous number is 0.';
  }

  const percentageChange = ((currentNumber - previousNumber) / Math.abs(previousNumber)) * 100;
  return percentageChange.toFixed(2) + '%';
};

export const getLanguage = () => {
  const languageFromCookie = getCookie('CultureCookie');
  return languageFromCookie !== '' ? languageFromCookie : 'en-GB';
};

export function dateFormat(apiDate) {
  let date = new Date(apiDate);

  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  let language = getLanguage().substring(0, 2);

  let formattedDate = date.toLocaleDateString(language, options);

  return formattedDate;
}

export function formatDateUserProfile(dateString, lang) {
  const date = new Date(dateString);
  // Get the user's time zone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format the date and time according to the user's time zone
  const formattedDate = date.toLocaleDateString(lang, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: userTimeZone,
  });

  const formattedTime = date.toLocaleTimeString(lang, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: userTimeZone,
  });

  // Get the UTC offset for the user's time zone
  const options = { timeZone: userTimeZone, timeZoneName: 'short' };
  const timeZoneOffset = new Date().toLocaleTimeString(lang, options).split(' ')[1];

  return `${formattedDate} ${formattedTime} (${timeZoneOffset})`;
}

import axios from 'axios';
import { read_cookie } from 'sfcookies';
import { getLanguage } from '../Helper.jsx';

const instance = axios.create({
  baseURL: `${process.env.API_URL}${process.env.webApiVersion}`,
  headers: {
    Accept: 'application/json',
    language: getLanguage(),
  },
});

const loginInstance = axios.create({
  baseURL: `${process.env.PUBLIC_URL}`,
  headers: {
    Accept: 'application/json',
  },
});

export const updateLanguageHeader = () => {
  instance.defaults.headers.language = getLanguage();
};

export const getTimeZoneDST = async (zoneName) => {
  return axios
    .get(`https://api.timezonedb.com/v2.1/get-time-zone?key=X043KC3M2Y7U&format=json&by=zone&zone=${zoneName}`)
    .then((res) => res.data.dst);
};

export const getAllTranslations = async () => {
  return await instance({
    url: '/Translations/Alltranslations',

    method: 'POST',
  }).then((res) => res);
};

export const getLanguages = async () => {
  return await instance({
    url: '/Translations/login_Languages',
    method: 'GET',
  }).then((res) => res);
};

export const authenticate = async () => {
  return await instance({
    url: '/Authentication/GetToken',
    method: 'POST',
    data: {
      userName: 'developer',
      password: 'w9bn53h1T9LAG6K',
    },
  }).then((res) => res);
};

export const legacyLogin = async (data) => {
  return await loginInstance({
    url: `/pages/login/Default.aspx/Login`,
    method: 'POST',
    data: data,
  }).then((res) => res);
};

export const login = async (data) => {
  return await instance({
    url: `Security/ValidateTruckUser`,
    method: 'Post',
    data: {
      cif: data.cif,
      userName: data.userName,
      password: data.password,
    },
  }).then((res) => res);
};

export const getMainMenu = async () => {
  return await instance({
    url: `/TruckMenu/MainMenu`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      siteMode: parseInt(sessionStorage.getItem('mode')),
      userId: sessionStorage.getItem('userID'),
      isModernView: !read_cookie('classicView'),
    },
    method: 'POST',
  }).then((res) => res);
};

export const getUserMenuFavorites = async () => {
  return await instance({
    url: `/Security/UserMenuFavorites`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      siteMode: parseInt(sessionStorage.getItem('mode')),
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res);
};

export const addUserMenuFavorites = async (key) => {
  return await instance({
    url: `/Security/AddUserMenuFavorite`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      menuKey: key,
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res, key);
};

export const deleteUserMenuFavorites = async (key) => {
  return await instance({
    url: `/Security/RemoveUserMenuFavorite`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      menuKey: key,
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res, key);
};

export const deleteAllUserMenuFavorites = async () => {
  return await instance({
    url: `/Security/DeleteAllUserFavorites`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetMainMenuNotifications = async () => {
  return await instance({
    url: `/TruckMenu/GetMainMenuNotifications`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
      siteMode: parseInt(sessionStorage.getItem('mode')),
    },
    method: 'POST',
  }).then((res) => res.data.result);
};

export const GetHistoricNotifications = async (PageNumber, PageSize) => {
  return await instance({
    url: `/TruckMenu/GetHistoricNotifications?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
      siteMode: parseInt(sessionStorage.getItem('mode')),
    },
    method: 'POST',
  }).then((res) => res.data);
};

export const SetUserNotificationRead = async (type, notificationId) => {
  return await instance({
    url: `/TruckMenu/SetUserNotificationRead`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
      type: type,
      notificationId: notificationId,
    },
    method: 'POST',
  }).then((res) => res.data.result);
};

export const UserAcceptPageConditions = async () => {
  return await instance({
    url: `/Security/UserAcceptPageConditions`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res.data.result);
};

export const RequestForInfo = async (data) => {
  return await instance({
    url: `/Mailing/RequestForInfo`,
    data: {
      company: data.company,
      eMail: data.eMail,
      contactName: data.contactName,
      country: data.country,
      message: data.message,
      siteMode: parseInt(sessionStorage.getItem('mode')),
    },
    method: 'POST',
  }).then((res) => res);
};

export const RecoverUserPassword = async (data) => {
  return await instance({
    url: `/Mailing/RecoverUserPassword`,
    data: {
      customerVatNumber: data.customerVatNumber,
      user: data.user,
    },
    method: 'POST',
  }).then((res) => res);
};

export const getCalendarCountries = async () => {
  return await instance({
    url: `TrafficRestrictions/GetCountriesList`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {},
    method: 'POST',
  }).then((res) => res.data.result);
};

export const getCalendarEvents = async (selectedCountries, month, year) => {
  return await instance({
    url: `TrafficRestrictions/GetCalendarEvents`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: { Countries: selectedCountries, Month: month, Year: year },
    method: 'POST',
  }).then((res) => res.data.result);
};

export const getEventsDetails = async (ids) => {
  return await instance({
    url: `TrafficRestrictions/GetEventsDetails`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: ids,
    method: 'POST',
  }).then((res) => res.data.result);
};

export const getSocialMediaData = async () => {
  return await instance({
    url: `/SocialMedia/GetSocialMediaData`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const getCountries = async () => {
  return await instance({
    url: `/Country/RequestInfoCountries`,

    method: 'POST',
  }).then((res) => res);
};

export const getSupportVideos = async () => {
  return await instance({
    url: `/SupportVideos/GetSupportVideos?language=${getLanguage()}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const getNewFeatures = async () => {
  return await instance({
    url: `/TruckNewFeatures/GetNewFeaturesForUser`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      siteMode: parseInt(sessionStorage.getItem('mode')),
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res);
};

export const SetNewFeaturesAsReadForUser = async () => {
  return await instance({
    url: `/TruckNewFeatures/SetNewFeaturesAsReadForUser`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      siteMode: parseInt(sessionStorage.getItem('mode')),
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res);
};

export const getLatestNews = async () => {
  return await instance({
    url: `/GuretruckNews/GetLatestNew`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetAllOperators = async (userid) => {
  return await instance({
    url: `/SupportCenter/GetHasInteractionWorkers`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: userid,
      IsLegalQuery: true,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetConnectedWorkers = async (userid) => {
  return await instance({
    url: `/SupportCenter/GetConnectedWorkers`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: userid,
      IsLegalQuery: true,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetSupportNumbers = async (userid) => {
  return await instance({
    url: `/SupportCenter/GetSupportNumbers`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: userid,
      IsLegalQuery: true,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetOperatorChatHistoryWithUser = async (OperatorId, userid) => {
  return await instance({
    url: `/SupportCenter/GetOperatorChatWithUser`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      operatorId: OperatorId,
      userId: userid,
    },
    method: 'POST',
  }).then((res) => res);
};

export const CreateCallCenterQuery = async (data) => {
  return await instance({
    url: `/SupportCenter/CreateCallCenterQuery`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      ...data,
      language: getLanguage(),
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetBreakingNews = async () => {
  return await instance({
    url: `/BreakingNews/GetBreakingNews`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetKodeaGuideLines = async () => {
  return await instance({
    url: 'SupportVideos/GetKodeaGuideLines',
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetClientsLogos = async () => {
  return await instance({
    url: 'TruckMenu/GetClientsLogos',
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const getUserProfile = async () => {
  return await instance({
    url: `/Security/GetUserProfile`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      userId: sessionStorage.getItem('userID'),
    },
    method: 'POST',
  }).then((res) => res.data.result);
};

export const updateUserProfile = async (data) => {
  return await instance({
    url: `/Security/SaveUserProfile`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: data,
    method: 'POST',
  }).then((res) => res.data);
};

export const updateUserPassword = async (data) => {
  return await instance({
    url: `/Security/UpdateUserPassword`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: data,
    method: 'POST',
  }).then((res) => res.data);
};

export const GetKodeaResources = async () => {
  return await instance({
    url: 'SupportVideos/GetKodeaResources',
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    method: 'POST',
  }).then((res) => res);
};

export const GetTotalValues = async () => {
  return await instance({
    url: `/DashBoard/GetTotalValues`,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('AuthToken'))}`,
    },
    data: {
      CustomerId: parseInt(sessionStorage.getItem('CustomerId')),
    },
    method: 'POST',
  }).then((res) => res);
};

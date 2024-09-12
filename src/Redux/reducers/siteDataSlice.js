import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  modernData: [],
  footerLinks: [],
  countries: [],
  breadCrumbsData: [],
  messages: [],
  socialMediaData: null,
  isModalOpen: false,
  shouldRefetchModern: false,
  shouldRefetchClassic: false,
  shouldRefetchFavs: false,
  recoverOption: null,
  dropdownVisible: false,
  sentOtp: [],
  accountsData: [],
  emailHasClients: null,
  tips: null,
  supportNumbers: [
    {
      Icon: 'pl.png',
      Text: '0048-566229533',
      Value: '0048-566229533',
      language: 'Polski',
    },
    {
      Icon: 'es.png',
      Text: '0034-943941184',
      Value: '0034-943941184',
      language: 'Spanish',
    },
    {
      Icon: 'gb.png',
      Text: '0034-943941184',
      Value: '0034-943941184',
      language: 'English',
    },
    {
      Icon: 'de.png',
      Text: '0049-66190158907',
      Value: '0049-66190158907',
      language: 'German',
    },
    {
      Icon: 'it.png',
      Text: '0039-04391860015',
      Value: '0039-04391860015',
      language: 'Italian',
    },
    {
      Icon: 'pt.png',
      Text: '00351-308800634',
      Value: '00351-308800634',
      language: 'Portuguese',
    },
    {
      Icon: 'br.png',
      Text: '0055-1131972146',
      Value: '0055-1131972146',
      language: 'Brasil',
    },
    {
      Icon: 'emailUs.png',
      Text: 'EmailUs',
      Value: 'helpdesk@truckcontroller.com',
    },
  ],
  allOperators: [],
  connectedOperators: [],
  numbers: {},
  breakingNews: [],
  newsHtml: null,
};

export const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setModernData: (state, action) => {
      state.modernData = action.payload;
    },
    setFooterLinks: (state, action) => {
      state.footerLinks = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setBreadCrumbsData: (state, action) => {
      state.breadCrumbsData = action.payload;
    },
    setSocialMediaData: (state, action) => {
      state.socialMediaData = action.payload;
    },
    triggerModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setRefetchModern: (state, action) => {
      state.shouldRefetchModern = action.payload;
    },
    setRefetchClassic: (state, acition) => {
      state.shouldRefetchClassic = acition.payload;
    },
    setRefetchFavs: (state, action) => {
      state.shouldRefetchFavs = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setRecoverOption: (state, action) => {
      state.recoverOption = action.payload;
    },
    setEmail: (state, action) => {
      state.emailHasClients = action.payload;
    },
    setSupportNumbers: (state, action) => {
      state.supportNumbers = action.payload;
    },
    setOperators: (state, action) => {
      state.connectedOperators = action.payload;
    },
    setAllOperators: (state, action) => {
      state.allOperators = action.payload;
    },
    setNumbers: (state, action) => {
      state.numbers = action.payload;
    },
    setTips: (state, action) => {
      state.tips = action.payload;
    },
    setBreakingNews: (state, action) => {
      state.breakingNews = action.payload;
    },
    setNewsHtml: (state, action) => {
      state.newsHtml = action.payload;
    },
    setDropdownVisible: (state, action) => {
      state.dropdownVisible = action.payload;
    },
  },
});

export const {
  setData,
  setModernData,
  setFooterLinks,
  setCountries,
  setBreadCrumbsData,
  setRefetchModern,
  setRefetchClassic,
  setRefetchFavs,
  setSocialMediaData,
  setMessages,
  triggerModal,
  setRecoverOption,
  setEmail,
  setSupportNumbers,
  setOperators,
  setAllOperators,
  setNumbers,
  setTips,
  setBreakingNews,
  setNewsHtml,
  setDropdownVisible,
} = siteDataSlice.actions;
export default siteDataSlice.reducer;

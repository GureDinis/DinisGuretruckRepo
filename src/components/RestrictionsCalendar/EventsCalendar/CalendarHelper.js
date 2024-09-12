import { getLanguage } from '../../../Helper.jsx';

export function longDateFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  let formattedDate = date.toLocaleDateString(getLanguage().substring(0, 2), options);

  return formattedDate;
}
export function shortDateFormat(date) {
  date = new Date(date * 1000);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const parts = new Intl.DateTimeFormat(getLanguage().substring(0, 2), options).formatToParts(date);

  return parts.map((part) => part.value).join('');
}
export function extractTimeFromDate(date) {
  date = new Date(date * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Formatting to ensure two digits for hours, minutes
  let formattedTime = [hours.toString().padStart(2, '0'), minutes.toString().padStart(2, '0')].join(':');

  return formattedTime;
}
export const formatEvents = (events) => {
  return events
    ?.map((event) => {
      // Determine how to display the countries in the title
      let countriesTitle;
      if (event.restrictions.length > 3) {
        const additionalCountriesCount = event.restrictions.length - 3;
        countriesTitle =
          event.restrictions
            .slice(0, 3)
            .map((c) => c.Name)
            .join(', ') + ` and ${additionalCountriesCount} more`;
      } else {
        countriesTitle = event.restrictions.map((c) => c.country).join(', ');
      }
      return {
        id: event.restrictions.map((restriction) => restriction.trafficRestrictionId),
        title: countriesTitle, // Include countries in the title
        start: event.restrictionStart,
        end: event.restrictionEnd,
        isMultiCountry: event.restrictions.length > 1,
        countries: event.restrictions,
      };
    })
    .sort((a, b) => {
      // sort isMultiCountry first if events have the same date
      if (a.isMultiCountry && !b.isMultiCountry) {
        return -1; // a comes first
      } else if (!a.isMultiCountry && b.isMultiCountry) {
        return 1; // b comes first
      }
      return 0; // no change in order
    });
};
export const eventStyleGetter = (event) => {
  let style = {};
  if (event.isMultiCountry) {
    style = {
      background: 'linear-gradient(90deg, #009DE0 0%, #30D5C8 100%)',
    };
  } else {
    style = {
      backgroundColor: '#F5F5F5',
      color: '#000',
    };
  }
  return {
    style,
  };
};

export const getMonthAndYearFromDate = (date) => {
  const options = { month: 'numeric', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  const [month, year] = formattedDate.split('/');
  return { month: parseInt(month), year: parseInt(year) };
};

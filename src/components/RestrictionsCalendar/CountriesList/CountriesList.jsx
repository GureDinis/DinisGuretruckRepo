import React from 'react';
import { getCalendarCountries } from '../../../Api/Api.jsx';
import style from './CountriesList.module.scss';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { refetchQueries } from '../../../Helper.jsx';
import { FormattedMessage } from 'react-intl';
import Export from '../../SVGs/Export.jsx';

const CountriesList = ({ selectedCountries, setSelectedCountries }) => {
  const handleCountryClick = (countryId, countryPdf) => {
    if (countryPdf) {
      window.open(countryPdf, 'noopener,noreferrer');
    } else {
      setSelectedCountries((currentSelected) => {
        if (currentSelected.includes(countryId)) {
          return currentSelected.filter((id) => id !== countryId);
        } else {
          return [...currentSelected, countryId];
        }
      });
    }
  };

  const { data } = useQuery('calendarCountries', getCalendarCountries, {
    ...refetchQueries,
    retry: false, // Disable retry on failure
  });
  return (
    <>
      <h2 className={style.secondaryHeader}>
        <FormattedMessage id="RCList" defaultMessage="* Countries List" />
      </h2>
      <ul className={style.countriesList}>
        {data?.map((countryList) => (
          <li
            key={countryList.id}
            className={`${style.countryList} ${
              selectedCountries.includes(countryList.id) ? style.countryListSelected : ''
            }`}
            onClick={() => handleCountryClick(countryList.id, countryList.pdfUrl)}
          >
            <div className={style.country}>
              <img
                className={style.flag}
                src={`/images/Flags/${countryList.countryCode}.png`}
                alt={`${countryList.name} flag`}
              />
              {countryList.name}
            </div>
            {countryList.pdfUrl ? (
              <Export color="var(--label-color)" />
            ) : selectedCountries.includes(countryList.id) ? (
              <CloseOutlined />
            ) : (
              <PlusOutlined />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CountriesList;

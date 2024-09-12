import React, { useState } from 'react';
import { Col, Row } from 'antd';
import CountriesList from './CountriesList/CountriesList.jsx';
import { getCalendarEvents } from '../../Api/Api.jsx';
import { useQuery } from 'react-query';
import EventsCalendar from './EventsCalendar/EventsCalendar.jsx';
import style from './RestrictionsCalendar.module.scss';
import { FormattedMessage } from 'react-intl';
import { getMonthAndYearFromDate } from './EventsCalendar/CalendarHelper.js';

function RestrictionsCalendar() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { month, year } = getMonthAndYearFromDate(currentDate);

  const { data } = useQuery(
    ['calendarEvents', selectedCountries, currentDate],
    () => getCalendarEvents(selectedCountries, month, year),
    {
      // The query will not execute until both the selectedCountries and month are not empty
      enabled: selectedCountries.length > 0 && currentDate !== '',
    },
  );

  return (
    <div className={style.RestrictionWrapper}>
      <div className={`primaryHeader ${style.ResrtrictionHeader}`}>
        <div>
          <h1>
            <FormattedMessage
              id="RCHeader"
              defaultMessage="*Countries with general restrictions for heavy goods vehicles"
            />
          </h1>
        </div>
      </div>

      <Row className={style.RowWrapper} gutter={16}>
        <Col span={6} className={style.LeftSide}>
          <CountriesList selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />
        </Col>
        <Col span={18}>
          <EventsCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} events={data} />
        </Col>
      </Row>
    </div>
  );
}

export default RestrictionsCalendar;

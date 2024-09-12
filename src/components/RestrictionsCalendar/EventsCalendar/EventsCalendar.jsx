import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomToolbar from './CustomToolbar.jsx';
import { Modal, Collapse } from 'antd';
import {
  shortDateFormat,
  longDateFormat,
  extractTimeFromDate,
  formatEvents,
  eventStyleGetter,
} from './CalendarHelper.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './EventsCalendar.scss';
import { useQuery } from 'react-query';
import { getEventsDetails } from '../../../Api/Api.jsx';
import { getLanguage } from '../../../Helper.jsx';
import { FormattedMessage } from 'react-intl';

const EventsCalendar = ({ currentDate, setCurrentDate, events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const { Panel } = Collapse;

  moment.locale(getLanguage().substring(0, 2));
  const localizer = momentLocalizer(moment);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formattedEvents = formatEvents(events);
  const { data: eventDetails } = useQuery('calendarCountries', getEventsDetails, {
    retry: false, // Disable retry on failure
    enabled: false, // Disable initial fetching, will be manually triggered
  });

  // Function to fetch event details when an event is clicked
  const fetchEventDetails = async (eventId) => {
    try {
      const eventData = await getEventsDetails(eventId); // Assuming getEventsDetails takes eventId as argument
      setEvent(eventData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleEventClick = (e) => {
    fetchEventDetails(e.id);
  };

  const handleShowMore = (events, date) => {
    let eventsIds = events.map((event) => event.id[0]);
    fetchEventDetails(eventsIds);
  };

  return (
    <div className="calendarWrapper">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        components={{
          toolbar: (props) => <CustomToolbar {...props} setCurrentDate={setCurrentDate} date={currentDate} />,
        }}
        views={['month']}
        defaultView="month"
        date={currentDate}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        onShowMore={handleShowMore}
      />
      <Modal
        width={700}
        open={isModalOpen}
        footer={[]}
        wrapClassName="events-modal"
        onCancel={handleCancel}
        title={event && longDateFormat(event[0].start)}
        centered
        getContainer={() => document.getElementById('app')}
        bodyStyle={{ maxHeight: '500px', overflowY: 'auto' }}
      >
        <Collapse defaultActiveKey={['0']} accordion>
          {event &&
            event.map((e, i) => (
              <Panel
                header={
                  <div className="collapse-custom-header">
                    <img src={`/images/Flags/${e.countryCode}.png`} alt="flag" />
                    <h3>{e.countryName}</h3>
                  </div>
                }
                key={i}
              >
                <div className="event-wrapper">
                  <div className="event-info">
                    <div className="event-record">
                      <FormattedMessage id="RCStart" defaultMessage="*Starts" />
                      <br /> {shortDateFormat(e.start)} <br /> {extractTimeFromDate(e.start)}
                    </div>
                    <div className="event-record">
                      <FormattedMessage id="RCEnds" defaultMessage="*Ends" /> <br /> {shortDateFormat(e.end)} <br />{' '}
                      {extractTimeFromDate(e.end)}
                    </div>
                    <div className="event-record">
                      <FormattedMessage id="RCAffected" defaultMessage="*Affected" /> <br />
                      {e.category}
                    </div>
                  </div>
                  <div className="event-details">
                    <FormattedMessage id="RCDetails" defaultMessage="*Details" /> <br /> {e.description}
                  </div>
                </div>
              </Panel>
            ))}
        </Collapse>
      </Modal>
    </div>
  );
};

export default EventsCalendar;

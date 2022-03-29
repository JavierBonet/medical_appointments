import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCalendar, getCalendars } from '../../../../api/calendars';
import CustomLoader from '../../../commons/CustomLoader';
import CalendarsList from './CalendarsList';

const CalendarsPage = () => {
  const [_calendars, setCalendars] = useState([] as Calendar[]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const doctorId = params.doctorId;

  useEffect(() => {
    if (doctorId && _calendars.length == 0) {
      setLoading(true);
      getCalendars(doctorId)
        .then((calendars) => {
          setLoading(false);
          setCalendars(calendars);
        })
        .catch((errorMessage) => {
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }, []);

  function deleteHandler(id: number) {
    if (doctorId) {
      setLoading(true);
      deleteCalendar(doctorId, id)
        .then((message) => {
          const calendars = _calendars.filter((calendar) => calendar.id != id);
          setCalendars(calendars);
          setLoading(false);
          toast.success(message);
        })
        .catch((errorMessage) => {
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }

  return (
    <div className="section-container">
      {_calendars.length == 0 ? (
        <h1> No Calendars available</h1>
      ) : (
        <>
          <h1>Calendars</h1>
          <CalendarsList calendars={_calendars} deleteHandler={deleteHandler} />
        </>
      )}
      <CustomLoader loading={loading} />

      <Link className="create-button" to="calendar">
        New calendar
      </Link>
    </div>
  );
};

export default CalendarsPage;

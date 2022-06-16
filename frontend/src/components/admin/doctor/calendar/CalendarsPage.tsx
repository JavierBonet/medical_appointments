import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  areAvailableHospitals,
  deleteCalendar,
  getCalendars,
} from '../../../../api/calendars';
import CustomLoader from '../../../commons/CustomLoader';
import CalendarsList from './CalendarsList';

const CalendarsPage = () => {
  const [_calendars, setCalendars] = useState([] as Calendar[]);
  const [loading, setLoading] = useState(false);
  const [areHospitalsLeft, setAreHospitalsLeft] = useState(true);
  const params = useParams();

  const doctorId = params.doctorId;

  useEffect(() => {
    if (doctorId && _calendars.length == 0) {
      setLoading(true);
      getCalendars(doctorId)
        .then((calendars) => {
          setCalendars(calendars);
        })
        .catch((errorMessage) => {
          toast.error(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (doctorId) {
      areAvailableHospitals(doctorId)
        .then((areHospitalsLeft) => {
          setAreHospitalsLeft(areHospitalsLeft);
        })
        .catch((errorMessage) => {
          toast.error(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [_calendars]);

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

      {areHospitalsLeft ? (
        <Link className="create-button" to="calendar">
          New calendar
        </Link>
      ) : (
        <div className="info-message">
          This doctor already has a calendar for each hospital
        </div>
      )}
    </div>
  );
};

export default CalendarsPage;

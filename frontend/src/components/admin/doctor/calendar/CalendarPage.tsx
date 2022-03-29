import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { getCalendar, saveCalendar } from '../../../../api/calendars';
import { toast } from 'react-toastify';
import CalendarForm from './CalendarForm';
import CustomLoader from '../../../commons/CustomLoader';
import { getHospitals } from '../../../../api/hospitals';
import ConfigureDays from './day/ConfigureDays';

const initialCalendar: OptionalCalendar = {
  name: '',
};

const CalendarPage = () => {
  const [calendar, setCalendar] = useState(initialCalendar);
  const [hospitals, setHospitals] = useState([] as Hospital[]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;

    if (doctorId) {
      const newCalendar = { ...calendar, doctorId: parseInt(doctorId) };
      setCalendar(newCalendar);
    }

    if (doctorId && calendarId) {
      setLoading(true);
      getCalendar(doctorId, calendarId)
        .then((calendar) => {
          setLoading(false);
          setCalendar(calendar);
        })
        .catch((err) => {
          setLoading(false);
          navigate('..');
          toast.warning(err);
        });
    }
    getHospitals()
      .then((hospitals) => {
        setHospitals(hospitals);
      })
      .catch((err) => toast.warning(err));
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let newCalendar = { ...calendar, [name]: value };
    setCalendar(newCalendar);
  }

  function selectChangeHandler(field: string, id: number) {
    let newCalendar = { ...calendar, [field]: id };
    setCalendar(newCalendar);
  }

  function saveHandler() {
    const doctorId = params.doctorId;
    if (doctorId) {
      setLoading(true);
      saveCalendar(doctorId, calendar)
        .then((message) => {
          setLoading(false);
          navigate('..');
          toast.success(message);
        })
        .catch((errorMessage) => {
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }

  const hospitalOptions = hospitals.map((hospital) => {
    return { key: hospital.id, value: hospital.id, text: hospital.name };
  });

  return (
    <div className="section-container">
      {loading ? (
        <>
          <h1>Loading...</h1>
          <CustomLoader loading={loading} />
        </>
      ) : (
        <>
          <h1>{calendar.name ? `${calendar.name}` : 'New calendar'}</h1>
          <CalendarForm
            calendar={calendar}
            hospitalOptions={hospitalOptions}
            changeHandler={changeHandler}
            selectChangeHandler={selectChangeHandler}
            saveHandler={saveHandler}
          />
          {params.calendarId && (
            <>
              <hr style={{ width: '100%' }} />
              <ConfigureDays />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CalendarPage;

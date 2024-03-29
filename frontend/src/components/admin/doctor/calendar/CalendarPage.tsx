import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalendar, saveCalendar, getAvailableHospitals } from '../../../../api/admin/calendars';
import { toast } from 'react-toastify';
import CalendarForm from './CalendarForm';
import CustomLoader from '../../../commons/CustomLoader';
import ConfigureDays from './day/ConfigureDays';

const initialCalendar: OptionalCalendar = {
  name: '',
};

const defaultErrors = {
  name: '',
  hospitalId: '',
};

const CalendarPage = () => {
  const [calendar, setCalendar] = useState(initialCalendar);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [previousHospitalId, setPreviousHospitalId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<CalendarErrors>({ ...defaultErrors });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;

    if (doctorId && !calendarId) {
      const newCalendar = { ...calendar, doctorId: parseInt(doctorId) };
      setCalendar(newCalendar);
    }

    if (doctorId) {
      if (calendarId) {
        setLoading(true);
        getCalendar(doctorId, calendarId)
          .then((calendar) => {
            getAvailableHospitals(doctorId)
              .then((hospitals) => {
                if (!hospitals.some((hospital) => hospital.id === calendar.hospitalId)) {
                  hospitals.unshift(calendar.Hospital);
                }
                setHospitals(hospitals);
              })
              .catch((err) => toast.warning(err));
            setCalendar(calendar);
          })
          .catch((err) => {
            navigate('..');
            toast.warning(err);
          })
          .finally(() => setLoading(false));
      } else {
        getAvailableHospitals(doctorId)
          .then((hospitals) => {
            setHospitals(hospitals);
          })
          .catch((err) => toast.warning(err));
      }
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newCalendar = { ...calendar, [name]: value };
    updateErrors(newCalendar);
    setCalendar(newCalendar);
  }

  function selectChangeHandler(field: string, id: number) {
    setPreviousHospitalId(id);
    const newCalendar = { ...calendar, [field]: id };
    updateErrors(newCalendar);
    setCalendar(newCalendar);
  }

  function saveHandler() {
    const doctorId = params.doctorId;
    const errors = updateErrors(calendar);

    if (!existErrors(errors)) {
      if (doctorId) {
        setLoading(true);
        saveCalendar(doctorId, calendar, previousHospitalId)
          .then((message) => {
            navigate('..');
            toast.success(message);
          })
          .catch((errorMessage) => {
            toast.error(errorMessage);
          })
          .finally(() => setLoading(false));
      }
    } else {
      updateErrors(calendar);
    }
  }

  function existErrors(errors: CalendarErrors): boolean {
    let existErrors = false;

    for (const key in errors) {
      // @ts-expect-error 'key' is an error key
      if (errors[key]) {
        existErrors = true;
        break;
      }
    }

    return existErrors;
  }

  function updateErrors(calendar: OptionalCalendar): CalendarErrors {
    const newErrors = { ...defaultErrors };

    if (!calendar.name) {
      newErrors.name = 'You should set a name';
    }
    if (!calendar.hospitalId) {
      newErrors.hospitalId = 'A hospital should be selected';
    }

    setErrors(newErrors);
    return newErrors;
  }

  const hospitalOptions = hospitals.map((hospital) => ({
    key: hospital.id,
    value: hospital.id,
    text: hospital.name,
  }));

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
            errors={errors}
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

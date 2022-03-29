import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { getDoctor, saveDoctor } from '../../../api/doctors';
import { toast } from 'react-toastify';
import DoctorForm from './DoctorForm';
import CustomLoader from '../../commons/CustomLoader';
import CalendarsPage from './calendar/CalendarsPage';

const initialDoctor: OptionalDoctor = {
  name: '',
  surname: '',
  age: 0,
  speciality: '',
  Calendars: [],
};

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doctorId = params.doctorId;

    if (doctorId) {
      setLoading(true);
      getDoctor(doctorId)
        .then((doctor) => {
          setLoading(false);
          setDoctor(doctor);
        })
        .catch((err) => {
          setLoading(false);
          navigate('../doctors');
          toast.warning(err);
        });
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let newDoctor = { ...doctor, [name]: value };
    setDoctor(newDoctor);
  }

  function saveHandler() {
    saveDoctor(doctor)
      .then((message) => {
        navigate('../doctors');
        toast.success(message);
      })
      .catch((errorMessage) => toast.error(errorMessage));
  }

  return (
    <div className="section-container">
      {params.calendarId ? (
        <Outlet />
      ) : loading ? (
        <>
          <h1>Loading...</h1>
          <CustomLoader loading={loading} />
        </>
      ) : (
        <div className="two-columns">
          <div className="first-column">
            <h1>
              {doctor.name ? `${doctor.name} ${doctor.surname}` : 'New doctor'}
            </h1>
            <DoctorForm
              doctor={doctor}
              changeHandler={changeHandler}
              saveHandler={saveHandler}
            />
          </div>
          <div className="second-column">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDoctor, getDoctors } from '../../../api/doctors';
import CustomLoader from '../../commons/CustomLoader';
import DoctorsList from './DoctorsList';

const DoctorsPage = () => {
  const [_doctors, setDoctors] = useState([] as Doctor[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (_doctors.length == 0) {
      setLoading(true);
      getDoctors()
        .then((doctors) => {
          setLoading(false);
          setDoctors(doctors);
        })
        .catch((errorMessage) => {
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }, [_doctors]);

  function deleteHandler(id: number) {
    deleteDoctor(id)
      .then((message) => {
        const doctors = _doctors.filter((doctor) => doctor.id != id);
        setDoctors(doctors);
        toast.success(message);
      })
      .catch((errorMessage) => toast.error(errorMessage));
  }

  return (
    <div className="section-container">
      <h1>Doctors</h1>
      <DoctorsList doctors={_doctors} deleteHandler={deleteHandler} />
      <CustomLoader loading={loading} />

      <Link className="create-button" to="../doctor">
        New doctor
      </Link>
    </div>
  );
};

export default DoctorsPage;

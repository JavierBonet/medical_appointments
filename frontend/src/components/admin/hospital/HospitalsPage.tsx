import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHospital, getHospitals } from '../../../api/hospitals';
import CustomLoader from '../../commons/CustomLoader';
import HospitalsList from './HospitalsList';

const HospitalsPage = () => {
  const [_hospitals, setHospitals] = useState([] as Hospital[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (_hospitals.length == 0) {
      setLoading(true);
      getHospitals()
        .then((hospitals) => {
          setLoading(false);
          setHospitals(hospitals);
        })
        .catch((errorMessage) => {
          setLoading(false);
          toast.error(errorMessage);
        });
    }
  }, []);

  function deleteHandler(id: number) {
    deleteHospital(id)
      .then((message) => {
        const hospitals = _hospitals.filter((hospital) => hospital.id != id);
        setHospitals(hospitals);
        toast.success(message);
      })
      .catch((errorMessage) => toast.error(errorMessage));
  }

  return (
    <div className="section-container">
      <h1>Hospitals</h1>
      <HospitalsList hospitals={_hospitals} deleteHandler={deleteHandler} />
      <CustomLoader loading={loading} />
      <Link className="create-button" to="../hospital">
        New hospital
      </Link>
    </div>
  );
};

export default HospitalsPage;

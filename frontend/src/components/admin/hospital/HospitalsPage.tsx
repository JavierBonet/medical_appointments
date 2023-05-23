import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteHospital, getHospitals } from '../../../api/admin/hospitals';
import CustomLoader from '../../commons/CustomLoader';
import HospitalsList from './HospitalsList';

interface PropsInterface {
  logout: () => void;
}

const HospitalsPage = ({ logout }: PropsInterface) => {
  const [_hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (_hospitals.length === 0) {
      setLoading(true);
      getHospitals(false)
        .then((hospitals) => {
          setLoading(false);
          setHospitals(hospitals);
        })
        .catch((error) => {
          setLoading(false);
          if (error === 401) {
            logout();
            navigate('/admin/signin');
            toast.warning('Please log in');
          } else {
            toast.warning(error);
          }
        });
    }
  }, []);

  function deleteHandler(id: number) {
    const deletionConfirmed = confirm('Are you sure to delete the hospital?');
    if (deletionConfirmed) {
      deleteHospital(id)
        .then((message) => {
          const hospitals = _hospitals.filter((hospital) => hospital.id !== id);
          setHospitals(hospitals);
          toast.success(message);
        })
        .catch((errorMessage) => toast.error(errorMessage));
    }
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

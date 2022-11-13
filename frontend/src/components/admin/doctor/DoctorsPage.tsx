import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteDoctor, getDoctors } from '../../../api/admin/doctors';
import CustomLoader from '../../commons/CustomLoader';
import DoctorsList from './DoctorsList';

interface PropsInterface {
  logout: () => void;
}

const DoctorsPage = ({ logout }: PropsInterface) => {
  const [_doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (_doctors.length == 0) {
      setLoading(true);
      getDoctors()
        .then((doctors) => {
          setLoading(false);
          setDoctors(doctors);
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
    let deletionConfirmed = confirm('Are you sure to delete the hospital?');
    if (deletionConfirmed) {
      deleteDoctor(id)
        .then((message) => {
          const doctors = _doctors.filter((doctor) => doctor.id != id);
          setDoctors(doctors);
          toast.success(message);
        })
        .catch((errorMessage) => toast.error(errorMessage));
    }
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

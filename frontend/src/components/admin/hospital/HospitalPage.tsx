import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHospital, saveHospital } from '../../../api/admin/hospitals';
import { toast } from 'react-toastify';
import HospitalForm from './HospitalForm';
import CustomLoader from '../../commons/CustomLoader';

const initialHospital: OptionalHospital = {
  name: '',
  address: '',
  phone: '',
  zip_code: 0,
};

interface PropsInterface {
  logout: () => void;
}

const HospitalPage = ({ logout }: PropsInterface) => {
  const [hospital, setHospital] = useState(initialHospital);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const hospitalId = params.hospitalId;

    if (hospitalId) {
      setLoading(true);
      getHospital(hospitalId)
        .then((hospital) => {
          setLoading(false);
          setHospital(hospital);
        })
        .catch((error) => {
          setLoading(false);
          if (error === 401) {
            logout();
            navigate('/admin/signin');
            toast.warning('Please log in');
          } else {
            navigate('../hospitals');
            toast.warning(error);
          }
        });
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let newHospital = { ...hospital, [name]: value };
    setHospital(newHospital);
  }

  function saveHandler() {
    saveHospital(hospital)
      .then((message) => {
        navigate('../hospitals');
        toast.success(message);
      })
      .catch((errorMessage) => toast.error(errorMessage));
  }

  return (
    <div className="section-container">
      {loading ? (
        <>
          <h1>Loading...</h1>
          <CustomLoader loading={loading} />
        </>
      ) : (
        <>
          <h1>{hospital.name ? `${hospital.name}` : 'New hospital'}</h1>
          <HospitalForm
            hospital={hospital}
            changeHandler={changeHandler}
            saveHandler={saveHandler}
          />
        </>
      )}
    </div>
  );
};

export default HospitalPage;

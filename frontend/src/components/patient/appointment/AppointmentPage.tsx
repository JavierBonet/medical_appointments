import React, { useState, useEffect } from 'react';
import { getHospitals } from '../../../api/hospitals';
import SelectInputField from '../../commons/SelectInputField';
import { toast } from 'react-toastify';
import { getDoctorOptions, getHospitalOptions } from './utils';
import CustomLoader from '../../commons/CustomLoader';
import CalendarMonth from './CalendarMonth';
import { UNAUTHORIZED_STATUS_CODE } from '../../utils/responseStatusCodes';
import { useNavigate } from 'react-router-dom';
import './AppointmentPage/styles.scss';

interface PropsInterface {
  logout: () => void;
}

const AppointmentPage = ({ logout }: PropsInterface) => {
  const [hospitalId, setHospitalId] = useState<number | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);

  const [hospitalOptions, setHospitalOptions] = useState<SelectOption[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<SelectOption[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (hospitals.length == 0) {
      setLoading(true);
      getHospitals(true)
        .then((_hospitals) => {
          setHospitals(_hospitals);
          const hs = getHospitalOptions(_hospitals);
          setHospitalOptions(hs);
        })
        .catch(({ statusCode, message }) => {
          if (statusCode === UNAUTHORIZED_STATUS_CODE) {
            logout();
            navigate('/patient/signin');
            toast.info('You are not logged in. Please do it.');
          } else {
            toast.warning(message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  function handleHospitalSelection(id: number) {
    setHospitalId(id);
    const selectedHospital = hospitals.find((hospital) => hospital.id == id);
    if (selectedHospital) {
      const doctors = selectedHospital.Doctors;
      if (doctors) {
        const doctorOptions = getDoctorOptions(doctors);
        setDoctorOptions(doctorOptions);
      }
    }
  }

  function handleDoctorSelection(id: number) {
    setDoctorId(id);
  }

  return (
    <div className="section-container">
      {loading ? (
        <>
          <h1>Loading...</h1>
          <CustomLoader loading={loading} />
        </>
      ) : (
        <div className="section-container">
          <div className="fit-content">
            <SelectInputField
              label="Hospital"
              name="hospitalId"
              selected={hospitalId}
              options={hospitalOptions}
              changeHandler={handleHospitalSelection}
            />
          </div>
          {hospitalId && (
            <div className="fit-content">
              <SelectInputField
                label="Doctor"
                name="doctorId"
                selected={doctorId}
                options={doctorOptions}
                changeHandler={handleDoctorSelection}
              />
            </div>
          )}
          {doctorId && hospitalId && (
            <CalendarMonth hospitalId={hospitalId} doctorId={doctorId} />
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;

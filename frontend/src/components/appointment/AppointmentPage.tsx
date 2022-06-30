import React, { useState, useEffect } from 'react';
import { getHospitals } from '../../api/admin/hospitals';
import SelectInputField from '../commons/SelectInputField';
import { toast } from 'react-toastify';
import { getDoctorOptions, getHospitalOptions } from './utils';
import CustomLoader from '../commons/CustomLoader';
import CalendarMonth from './CalendarMonth';

// const initialHospital: OptionalHospital = {
//   name: '',
//   address: '',
//   phone: '',
//   zip_code: 0,
// };

// const initialDoctor: OptionalDoctor = {
//   name: '',
//   surname: '',
//   speciality: '',
//   Calendars: [],
// };

const AppointmentPage = () => {
  const [hospitalId, setHospitalId] = useState<number | undefined>(undefined);
  const [doctorId, setDoctorId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [hospitalOptions, setHospitalOptions] = useState<SelectOption[]>([]);
  const [doctorOptions, setDoctorOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (hospitals.length == 0) {
      setLoading(true);
      getHospitals(true)
        .then((_hospitals) => {
          setHospitals(_hospitals);
          const hs = getHospitalOptions(_hospitals);
          setHospitalOptions(hs);
        })
        .catch((err) => {
          toast.warning('Error when loading hospitals. Try again later.');
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
    /*
    getDoctorsAssociatedWithHospital
    */
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
        <>
          {/* <h1>{hospital.name ? `${hospital.name}` : 'New Appointment'}</h1> */}
          <div className="section-container">
            <SelectInputField
              label="Hospital"
              name="hospitalId"
              selected={hospitalId}
              options={hospitalOptions}
              changeHandler={handleHospitalSelection}
            />
            {hospitalId && (
              <SelectInputField
                label="Doctor"
                name="doctorId"
                selected={doctorId}
                options={[]}
                changeHandler={handleDoctorSelection}
              />
            )}
            {doctorId && <CalendarMonth />}
            {/* if a specific date is selected, replace calendar month view with date's available appointments view */}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentPage;

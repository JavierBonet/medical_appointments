import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAppointment, getPatientAppointments } from '../../../api/appointments';
import CustomLoader from '../../commons/CustomLoader';
import AppointmentsList from './AppointmentsList';

interface PropsInterface {
  logout: () => void;
}

const AppointmentsPage = ({ logout }: PropsInterface) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getPatientAppointments()
      .then((appointments) => {
        setAppointments(appointments);
        setLoading(false);
      })
      .catch((error) => {
        const { status, message } = error.response;
        if (status === 401) {
          logout();
          navigate('/patient/signin');
          toast.info('You are not logged in. Please do it.');
        } else {
          toast(message);
          setLoading(false);
        }
      });
  }, []);

  function deleteHandler(appointmentId: number) {
    if (confirm('Are you sure to cancel the appointment?')) {
      deleteAppointment(appointmentId)
        .then((message) => {
          const newAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
          setAppointments(newAppointments);
          toast.success(message);
        })
        .catch((errorMessage) => toast.error(errorMessage));
    }
  }

  return (
    <div className="section-container">
      <h1>My appointments</h1>
      <CustomLoader loading={loading} />
      {appointments.length !== 0 && <AppointmentsList appointments={appointments} deleteHandler={deleteHandler} />}
      <Link className="create-button" to="../appointment">
        New appointment
      </Link>
    </div>
  );
};

export default AppointmentsPage;

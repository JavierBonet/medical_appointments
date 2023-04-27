import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAppointments, saveAppointment } from '../../../api/appointments';
import { getCalendarByDoctorAndHospitalId } from '../../../api/calendars';
import { dbWeekDayToSystemDay, getAppointmentHours, getAppointmentsByDateMap } from './CalendarMonth/utils';
import { getCalendarDates } from './utils';
import CalendarDate from './CalendarMonth/CalendarDate';
import CalendarDateAvailableAppointments from './CalendarMonth/CalendarDateAvailableAppointments';
import './CalendarMonth/styles.scss';

/**
 * get the calendar for a doctor and hospital (define a calendars.ts api for public)
 */
interface PropsInterface {
  hospital: Hospital;
  doctor: Doctor;
}

const CalendarMonth = ({ hospital, doctor }: PropsInterface) => {
  const [calendar, setCalendar] = useState<Calendar | undefined>(undefined);
  const [calendarDatesByWeek, setCalendarDatesByWeek] = useState<(CalendarDate | undefined)[][]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointmentHours, setAppointmentHours] = useState<string[]>([]);
  const [selectedDateElement, setSelectedDateElement] = useState<HTMLDivElement | undefined>(undefined);
  const [appointmentsByDate, setAppointmentsByDate] = useState<Map<string, Appointment[]>>(new Map());

  const navigate = useNavigate();

  useEffect(() => {
    getCalendarByDoctorAndHospitalId(doctor.id, hospital.id)
      .then((calendar) => {
        setCalendar(calendar);
      })
      .catch((err) => console.log(`err calendar: ${err}`));
  }, [doctor, hospital]);

  useEffect(() => {
    getAppointments(hospital.id, doctor.id).then((_appointments) => {
      if (calendar) {
        const appointmentsByDate = getAppointmentsByDateMap(_appointments);
        setAppointmentsByDate(appointmentsByDate);
        setCalendarDatesByWeek(getCalendarDates(calendar, appointmentsByDate));
      }
    });
  }, [calendar]);

  function onDateSelection(event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Date | undefined) {
    if (selectedDate && selectedDate === date) {
      setSelectedDate(undefined);
      selectedDateElement?.classList.remove('selected');
      return;
    }

    setSelectedDate(date);
    if (calendar && date) {
      const day = calendar.Days.find((dayOfTheWeek) => dbWeekDayToSystemDay(dayOfTheWeek.number) === date.getDay());

      if (day) {
        setAppointmentHours(getAppointmentHours(day.HourRanges));
      }

      if (selectedDateElement) {
        selectedDateElement.classList.remove('selected');
      }

      const target = event.currentTarget;
      target.classList.add('selected');
      setSelectedDateElement(target);
    }
  }

  function saveHandler(date: Date, hour: string) {
    const message = `Are you sure to schedule an appointment at ${hospital.name} hospital with doctor ${
      doctor.name
    } at ${hour}, ${date.toLocaleDateString()}?`;
    if (!confirm(message)) {
      return;
    }

    const dayOfTheWeek = date.toLocaleDateString('en', { weekday: 'long' });
    const appointment = {
      date: date.toLocaleDateString(),
      hour,
      dayOfTheWeek,
      doctorId: doctor.id,
      hospitalId: hospital.id,
    };

    saveAppointment(appointment)
      .then((appointment) => {
        const message = `Appointment successfully created for ${appointment.date} at ${appointment.hour}`;
        toast.success(message);
        navigate('/patient');
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <>
      {calendar && (
        <div className="appointment-date-and-hour">
          <div className="appointment-date">
            <div>
              <h2>Select date</h2>
            </div>
            <div className="patient-appointments-calendar fade-in">
              <div className="calendar-header">S</div>
              <div className="calendar-header">M</div>
              <div className="calendar-header">T</div>
              <div className="calendar-header">W</div>
              <div className="calendar-header">T</div>
              <div className="calendar-header">F</div>
              <div className="calendar-header">S</div>
              {calendarDatesByWeek.map((weekDates) =>
                weekDates.map((calendarDate, index) => (
                  <CalendarDate calendarDate={calendarDate} index={index} onDateSelection={onDateSelection} />
                ))
              )}
            </div>
          </div>
          {selectedDate && (
            <CalendarDateAvailableAppointments
              date={selectedDate}
              hours={appointmentHours}
              existingAppointments={appointmentsByDate.get(selectedDate.toLocaleDateString())}
              saveHandler={saveHandler}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CalendarMonth;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveAppointment } from '../../../api/appointments';
import { getCalendarByDoctorAndHospitalId } from '../../../api/calendars';
import CalendarDate from './CalendarDate';
import './CalendarMonth/styles.scss';
import {
  dbWeekDayToSystemDay,
  getAppointmentHours,
} from './CalendarMonth/utils';
import { getCalendarDates, getDayOfTheMonth } from './utils';

/**
 * get the calendar for a doctor and hospital (define a calendars.ts api for public)
 */
interface PropsInterface {
  hospitalId: number;
  doctorId: number;
}

const CalendarMonth = ({ hospitalId, doctorId }: PropsInterface) => {
  const [calendar, setCalendar] = useState<Calendar | undefined>(undefined);
  const [calendarDatesByWeek, setCalendarDatesByWeek] = useState<
    (CalendarDate | undefined)[][]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointmentHours, setAppointmentHours] = useState<string[]>([]);
  const [selectedDateElement, setSelectedDateElement] = useState<
    HTMLDivElement | undefined
  >(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId && hospitalId) {
      getCalendarByDoctorAndHospitalId(doctorId, hospitalId)
        .then((calendar) => {
          setCalendar(calendar);
          const daysToInclude = new Set(
            calendar.Days.filter((day) => day.HourRanges.length !== 0).map(
              (day) => dbWeekDayToSystemDay(day.number)
            )
          );
          setCalendarDatesByWeek(getCalendarDates(daysToInclude));
        })
        .catch((err) => console.log('err calendar'));

      /**
       * El calendario tiene días
       * los días tiene rangos horarios
       * 1- CalendarMonth: En base a los días y horarios, tomar el calendario del mes actual
       * y mostrar un calendario (armado por mi, con html y css) con los
       * días en que se pueden agendar turnos.
       *
       * 2- Una vez tenga eso, al hacer click en un día, se tiene que desplegar CalendarDate
       * donde se deben visualizar los turnos que se pueden agendar
       *
       * 3- Por último, cuando se seleccione un horario, mostrar un mensaje preguntando si esta seguro
       * de agendar el turno en ese hospital, con ese doctor, en ese día y horario
       *
       * EN LO ANTERIOR NO INCLUÍ LA INFO DE LOS TURNOS YA AGENDADOS. TENGO QUE TENERLOS EN CUENTA
       * PARA CALCULAR LOS DÍAS Y HORARIOS YA UTILIZADOS
       *
       */
    }
  }, [doctorId]);

  function onDateSelection(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Date | undefined
  ) {
    // if (!isDateSelected) {
    setSelectedDate(date);
    if (calendar && date) {
      const day = calendar.Days.find(
        (dayOfTheWeek) =>
          dbWeekDayToSystemDay(dayOfTheWeek.number) === date.getDay()
      );

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
    //   const calendar = document.getElementsByClassName(
    //     'patient-appointments-calendar'
    //   )[0];
    //   calendar.classList.remove('fade-in');
    //   calendar.classList.add('fade-out');
    // }
    /**
     * El día seleccionado se corresponde con uno de los días configurados para el calendario,
     * por lo tanto ese día tiene rangos horarios configurados. En base a esos rangos horarios
     * tengo que calcular los horarios disponibles para los turnos.
     *
     * TENER EN CUENTA QUE LOS TURNOS QUE CALCULE ARRIBA NO VAN A SER TODOS LOS DISPONIBLES
     * PORQUE FALTA TENER EN CUENTA LOS TURNOS YA CREADOS Y USAR SU HORARIO PARA ELIMINAR
     * OPCIONES
     */
  }

  function saveHandler(date: Date, hour: string) {
    const dayOfTheWeek = date.toLocaleDateString('en', { weekday: 'long' });
    const appointment = {
      date: date.toLocaleDateString(),
      hour,
      dayOfTheWeek,
      doctorId,
      hospitalId,
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
              <div className="centered">
                <h2>S</h2>
              </div>
              <div className="centered">
                <h2>M</h2>
              </div>
              <div className="centered">
                <h2>T</h2>
              </div>
              <div className="centered">
                <h2>W</h2>
              </div>
              <div className="centered">
                <h2>T</h2>
              </div>
              <div className="centered">
                <h2>F</h2>
              </div>
              <div className="centered">
                <h2>S</h2>
              </div>
              {calendarDatesByWeek.map((weekDates) =>
                weekDates.map((calendarDate, index) =>
                  calendarDate ? (
                    calendarDate.enabled ? (
                      <div
                        className="calendar-date"
                        key={index}
                        onClick={(event) =>
                          onDateSelection(event, calendarDate.date)
                        }
                      >
                        {getDayOfTheMonth(calendarDate.date)}
                      </div>
                    ) : (
                      <div className="calendar-date disabled" key={index}>
                        {getDayOfTheMonth(calendarDate.date)}
                      </div>
                    )
                  ) : (
                    <div className="calendar-date disabled" key={index}>
                      {' '}
                    </div>
                  )
                )
              )}
            </div>
          </div>
          {selectedDate && (
            <CalendarDate
              date={selectedDate}
              hours={appointmentHours}
              saveHandler={saveHandler}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CalendarMonth;

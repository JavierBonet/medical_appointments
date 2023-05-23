import { addQuarterToHour, dbWeekDayToSystemDay } from './CalendarMonth/utils';

function getHospitalOptions(hospitals: Hospital[]): SelectOption[] {
  const options: SelectOption[] = [];

  hospitals.forEach((hospital) => {
    options.push({ key: hospital.id, value: hospital.id, text: hospital.name });
  });

  return options;
}

function getDoctorOptions(doctors: Doctor[]): SelectOption[] {
  const options: SelectOption[] = [];

  doctors.forEach((doctor) => {
    options.push({ key: doctor.id, value: doctor.id, text: `${doctor.name} ${doctor.surname}` });
  });

  return options;
}

/**
 * Creates a list of {@link CalendarDate} to build the calendar UI component
 * @param calendar {@link Calendar} to get the dates
 * @param appointmentsByDate Mapping that stores the appointments grouped by date
 * @returns List of {@link CalendarDate} to build the calendar UI component
 */
function getCalendarDates(
  calendar: Calendar,
  appointmentsByDate: Map<string, Appointment[]>
): (CalendarDate | undefined)[][] {
  const datesByWeek: (CalendarDate | undefined)[][] = [];

  const daysToInclude = new Set(
    calendar.Days.filter((day) => day.HourRanges.length !== 0).map((day) => dbWeekDayToSystemDay(day.number))
  );

  const maxAppointmentQuantityByWeekDay = getMaxAppointmentQuantityByWeekDay(calendar);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfTheMonth = new Date(currentYear, currentMonth, 1);

  let datesOfTheWeek: (CalendarDate | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  let nextDate = firstDayOfTheMonth;

  if (firstDayOfTheMonth.getDay() !== 0) {
    datesByWeek.push(datesOfTheWeek);
  }

  do {
    const nextWeekDay = nextDate.getDay();

    if (nextWeekDay === 0) {
      const newWeek: (CalendarDate | undefined)[] = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ];
      datesByWeek.push(newWeek);
      datesOfTheWeek = newWeek;
    }

    const appointmentsQuantity = appointmentsByDate.get(nextDate.toLocaleDateString())?.length;
    const maxAppointmentsQuantity = maxAppointmentQuantityByWeekDay.get(nextWeekDay);

    datesOfTheWeek[nextWeekDay] = {
      enabled: isDateEnable(nextDate, today, daysToInclude, appointmentsQuantity, maxAppointmentsQuantity),
      date: nextDate,
    };

    nextDate = new Date(currentYear, currentMonth, nextDate.getDate() + 1);
  } while (nextDate.getMonth() === currentMonth);

  return datesByWeek;
}

/**
 * Checks if the {@link date} must be enabled in the calendar
 * @param date Date to check if enabled or not
 * @param currentDate Date that represents today
 * @param daysToInclude Set of week day numbers that are allowed to be included
 * @param appointmentsQuantity Appointments quantity already scheduled for the current date
 * @param maxAppointmentsQuantity Max appointments quantity that can be scheduled for the current date
 * @returns True if the {@link date} must be enabled in the calendar
 */
function isDateEnable(
  date: Date,
  currentDate: Date,
  daysToInclude: Set<number>,
  appointmentsQuantity: number | undefined,
  maxAppointmentsQuantity: number | undefined
): boolean {
  let areThereAppointmentsToTake = true;

  if (appointmentsQuantity && maxAppointmentsQuantity) {
    areThereAppointmentsToTake = appointmentsQuantity < maxAppointmentsQuantity;
  }

  return daysToInclude.has(date.getDay()) && currentDate.getDate() <= date.getDate() && areThereAppointmentsToTake;
}

function getDayOfTheMonth(date: Date): string {
  const day = date.getDate();
  return day < 10 ? `0${day}` : `${day}`;
}

function getMonth(date: Date): string {
  const month = date.getMonth() + 1;
  return month < 10 ? `0${month}` : `${month}`;
}

function getMaxAppointmentQuantityByWeekDay(calendar: Calendar): Map<number, number> {
  const maxAppointmentQuantityByWeekDay = new Map<number, number>();

  calendar.Days.forEach((day) => {
    const weekDay = dbWeekDayToSystemDay(day.number);
    const maxAppointmentQuantity = getMaxAppointmentQuantity(day.HourRanges);
    maxAppointmentQuantityByWeekDay.set(weekDay, maxAppointmentQuantity);
  });

  return maxAppointmentQuantityByWeekDay;
}

function getMaxAppointmentQuantity(hourRanges: HourRange[]): number {
  return hourRanges.reduce((accum, hourRange) => accum + getAppointmentsQuantity(hourRange), 0);
}

function getAppointmentsQuantity(hourRange: HourRange): number {
  let count = 0;

  let currentHour = hourRange.start;
  while (currentHour !== hourRange.end) {
    count++;
    currentHour = addQuarterToHour(currentHour);
  }

  count++;

  return count;
}

export { getHospitalOptions, getDoctorOptions, getCalendarDates, getDayOfTheMonth, getMonth };

import { faker } from '@faker-js/faker';
import { hours, indexByHourMap } from '../../doctor/calendar/day/dayUtils';

const specialties = [
  'Traumatologist',
  'Radiologist',
  'Gynecologist',
  'Allergy and immunology',
  'Pediatrics',
  'Adolescent medicine',
  'Family medicine',
  'Anesthesiology',
  'Aerospace medicine',
  'Bariatrics',
  'Cardiology',
  'Cardiothoracic surgery',
  'Child and adolescent psychiatry',
  'Clinical neurophysiology',
  'Colorectal surgery',
  'Dermatology',
  'Developmental pediatrics',
  'Emergency medicine',
  'Endocrinology',
  'Family Medicine',
  'Forensic pathology',
  'Forensic psychiatry',
  'Gastroenterology',
  'General surgery',
];

const generateId = () => Math.floor(Math.random() * 1000);

export function createDoctor(id?: number): Doctor {
  const doctor: Doctor = {
    id: id ?? generateId(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    age: Math.floor(Math.random() * 60) + 25,
    speciality: specialties[Math.floor(Math.random() * specialties.length)],
    Calendars: [],
  };

  return doctor;
}

interface HospitalParameters {
  id?: number;
  doctors?: Doctor[];
}

export function createHospital({ id, doctors }: HospitalParameters): Hospital {
  const hospital: Hospital = {
    id: id ?? generateId(),
    name: faker.company.name(),
    address: faker.address.direction(),
    phone: faker.phone.number(),
    zip_code: parseInt(faker.address.zipCode()),
    Doctors: doctors,
  };

  return hospital;
}

interface HourRangeParameters {
  dayId: number;
  previousHourRange?: HourRange;
  startIndex?: number;
}

function createHourRange({ dayId, previousHourRange, startIndex }: HourRangeParameters): HourRange {
  if (!startIndex) {
    startIndex = previousHourRange
      ? indexByHourMap[previousHourRange.end] + 1
      : Math.floor(Math.random() * hours.length);
  }

  const hourRange: HourRange = {
    id: generateId(),
    start: hours[startIndex],
    end: hours[startIndex + 1],
    dayId,
  };

  return hourRange;
}

const daysOfTheWeek = ['monday', 'tuesday', 'thursday', 'wednesday', 'friday'];

function createDay(calendarId: number, alreadySelectedDays: Set<number>): Day {
  let dayNumber: number;

  do {
    dayNumber = Math.floor(Math.random() * daysOfTheWeek.length);
  } while (alreadySelectedDays.has(dayNumber));

  const hourRanges: HourRange[] = [];
  const id = generateId();
  let previousHourRange: HourRange | undefined;
  const startIndex = Math.floor(Math.random() * 26);

  for (let i = 0; i <= Math.floor(Math.random() * 4) + 1; i++) {
    const hourRange = createHourRange({ dayId: id, previousHourRange, startIndex });
    hourRanges.push(hourRange);

    previousHourRange = hourRange;
  }

  const day: Day = {
    id,
    name: daysOfTheWeek[dayNumber],
    number: dayNumber,
    calendarId,
    HourRanges: hourRanges,
  };

  return day;
}

interface CalendarParameters {
  doctor: Doctor;
  hospital: Hospital;
  id?: number;
}

export function createCalendar({ doctor, hospital, id }: CalendarParameters): Calendar {
  id = id ?? generateId();

  const days: Day[] = [];

  const alreadySelectedDays = new Set<number>();

  for (let i = 0; i <= Math.floor(Math.random() * 4); i++) {
    const day = createDay(id, alreadySelectedDays);
    days.push(day);
    alreadySelectedDays.add(day.number);
  }

  const calendar: Calendar = {
    id,
    name: `Calendar ${id}`,
    doctorId: doctor.id,
    hospitalId: hospital.id,
    Doctor: doctor,
    Hospital: hospital,
    Days: days,
  };

  return calendar;
}

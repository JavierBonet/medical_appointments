interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  zip_code: number;
}

interface OptionalHospital {
  id?: number;
  name: string;
  address: string;
  phone: string;
  zip_code: number;
}

interface Doctor {
  id: number;
  name: string;
  surname: string;
  age?: number;
  speciality: string;
  Calendars: Calendar[];
}

interface OptionalDoctor {
  id?: number;
  name: string;
  surname: string;
  age?: number;
  speciality: string;
  Calendars: Calendar[];
}

interface Calendar {
  id: number;
  name: string;
  doctorId: number;
  hospitalId: number;
  Doctor: Doctor;
  Hospital: Hospital;
}

interface OptionalCalendar {
  id?: number;
  name: string;
  doctorId?: number;
  hospitalId?: number;
}

interface Day {
  id: number;
  name: string;
  number: number;
  calendarId: number;
  HourRanges: HourRange[];
}

interface OptionalDay {
  id?: number;
  name: string;
  number: number;
  calendarId: number;
  HourRanges: HourRange[];
}

interface HourRange {
  id: number;
  start: string;
  end: string;
  dayId: number;
}

interface OptionalHourRange {
  id?: number;
  start: string;
  end: string;
  dayId: number;
}

interface SelectOption {
  key: number;
  value: number;
  text: string;
}

import { getCalendarDates, getDayOfTheMonth } from '../utils';

const doctor: Doctor = {
  id: 1,
  name: '',
  surname: '',
  speciality: '',
  Calendars: [],
};
const hospital: Hospital = {
  id: 1,
  name: 'hospital 1',
  address: '',
  phone: '21341',
  zip_code: 2000,
};

const calendar: Calendar = {
  id: 0,
  name: '',
  doctorId: 0,
  hospitalId: 0,
  Doctor: doctor,
  Hospital: hospital,
  Days: [],
};

describe.skip('Utils', () => {
  it("getCalendarDates should succeed - CREATED JUST TO TEST THE FUNCTION'S OUTPUT", () => {
    const datesByWeek = getCalendarDates(calendar, new Map());
    const firstWeek = datesByWeek[0];
    // console.log(firstWeek[0]);
    // console.log(firstWeek[1]);
    // console.log(firstWeek[2]);
    // console.log(firstWeek[3]);
    // console.log(firstWeek[4]);
    // console.log(firstWeek[5]);
    // console.log(firstWeek[6]);
  });

  it("getDayOfTheMonth should succeed - CREATED JUST TO TEST THE FUNCTION'S OUTPUT", () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const eleventhDay = new Date(year, month, 11);

    const actualFirstDay = getDayOfTheMonth(firstDay);
    const actualEleventhDay = getDayOfTheMonth(eleventhDay);

    expect(actualFirstDay).toEqual('01');
    expect(actualEleventhDay).toEqual('11');
  });
});

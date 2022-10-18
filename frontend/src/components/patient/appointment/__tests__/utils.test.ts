import { getCalendarDates, getDayOfTheMonth } from '../utils';

describe('Utils', () => {
  it("getCalendarDates should succeed - CREATED JUST TO TEST THE FUNCTION'S OUTPUT", () => {
    let datesByWeek = getCalendarDates(new Set());
    let firstWeek = datesByWeek[0];
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

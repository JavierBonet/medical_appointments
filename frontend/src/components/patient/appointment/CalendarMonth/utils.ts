function getAppointmentHours(hourRanges: HourRange[]): string[] {
  let appointmentHours: string[] = [];

  hourRanges.forEach((hourRange) => {
    appointmentHours = appointmentHours.concat(getHours(hourRange));
  });

  return appointmentHours;
}

/**
 * Creates a list of hours from an {@link HourRange}
 * @param hourRange
 * @returns List of hours within the {@link hourRange}, including the boundaries
 */
function getHours(hourRange: HourRange): string[] {
  let hours: string[] = [];

  let currentHour = hourRange.start;
  while (currentHour !== hourRange.end) {
    hours.push(currentHour);
    currentHour = addQuarterToHour(currentHour);
  }

  hours.push(currentHour);

  return hours;
}

function dbWeekDayToSystemDay(weekDay: number): number {
  return weekDay + 1;
}

function addQuarterToHour(fullHour: string): string {
  const [strHour, strMinutes] = fullHour.split(':');
  const minutes = parseInt(strMinutes);
  const hour = parseInt(strHour);

  const newMinutes = strMinutes === '45' ? '00' : `${minutes + 15}`;
  const newHour = strMinutes === '45' ? `${hour + 1}` : '' + hour;

  return `${newHour}:${newMinutes}`;
}

export { getAppointmentHours, dbWeekDayToSystemDay };

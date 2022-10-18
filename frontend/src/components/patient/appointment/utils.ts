function getHospitalOptions(hospitals: Hospital[]): SelectOption[] {
  let options: SelectOption[] = [];

  hospitals.forEach((hospital) => {
    options.push({ key: hospital.id, value: hospital.id, text: hospital.name });
  });

  return options;
}

function getDoctorOptions(doctors: Doctor[]): SelectOption[] {
  let options: SelectOption[] = [];

  doctors.forEach((doctor) => {
    options.push({ key: doctor.id, value: doctor.id, text: doctor.name });
  });

  return options;
}

function getCalendarDates(
  daysToInclude: Set<number>
): (CalendarDate | undefined)[][] {
  let datesByWeek: (CalendarDate | undefined)[][] = [];

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

    datesOfTheWeek[nextWeekDay] = {
      enabled: daysToInclude.has(nextWeekDay),
      date: nextDate,
    };

    nextDate = new Date(currentYear, currentMonth, nextDate.getDate() + 1);
  } while (nextDate.getMonth() === currentMonth);

  return datesByWeek;
}

function getDayOfTheMonth(date: Date): string {
  const day = date.getDate();
  return day < 10 ? '0' + day : '' + day;
}

function getMonth(date: Date): string {
  const month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}

export {
  getHospitalOptions,
  getDoctorOptions,
  getCalendarDates,
  getDayOfTheMonth,
  getMonth,
};

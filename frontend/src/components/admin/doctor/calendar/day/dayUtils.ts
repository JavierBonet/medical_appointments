const hours = [
  '7:00',
  '7:15',
  '7:30',
  '7:45',
  '8:00',
  '8:15',
  '8:30',
  '8:45',
  '9:00',
  '9:15',
  '9:30',
  '9:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15',
  '21:30',
  '21:45',
];

let indexByHourMap: { [hour: string]: number } = {};

hours.forEach((hour, index) => (indexByHourMap[hour] = index));

const hoursLength = hours.length;

function getRemainingHourRangesQuantity(index: number) {
  return hoursLength - index;
}

function getStartHourRangeOptions(startIndex: number) {
  let options = [];
  for (let i = startIndex; i < hoursLength - 1; i++) {
    options.push({ key: i, value: i, text: hours[i] });
  }
  return options;
}

function getEndHourRangeOptions(startIndex: number) {
  let options = [];
  for (let i = startIndex; i < hoursLength; i++) {
    options.push({ key: i, value: i, text: hours[i] });
  }
  return options;
}

function getIndexByValue(options: SelectOption[], value: number) {
  let index = -1;

  for (let i = 0; i < options.length; i++) {
    if (options[i].value == value) {
      index = i;
      break;
    }
  }

  return index;
}

function getHourRangesUpdated(
  hourRangeInfos: HourRangeInfo[],
  previousHourRange: HourRangeInfo
): HourRangeInfo[] {
  let updatedHourRangeInfos = [...hourRangeInfos];
  const length = hourRangeInfos.length;
  let previousSelectedEnd = previousHourRange.end.selected;
  let stop = false;

  for (let i = 0; i < length; i++) {
    if (getRemainingHourRangesQuantity(previousSelectedEnd + 1) >= 2) {
      let hourRange = updatedHourRangeInfos[i];
      let currentFirstStartOption = hourRange.start.options[0].value;

      // If the first option of the start dropdown isn't the next
      // of the previous selected value in the end dropdown,
      // then I have to update the current start options
      if (currentFirstStartOption - 1 != previousSelectedEnd) {
        let index = previousSelectedEnd + 1;
        hourRange.start.options = getStartHourRangeOptions(index);

        // If the current selected start is lower than the first start
        // option, I have to update the selected start
        if (hourRange.start.selected < hourRange.start.options[0].value) {
          hourRange.start.selected = hourRange.start.options[0].value;

          // As I have changed the selected start, then the end options
          // have to be changed because they start just after the selected start
          index = hourRange.start.selected + 1;
          hourRange.end.options = getEndHourRangeOptions(index);

          // If the current selected end is lower than the first end
          // option, I have to update the selected end
          if (hourRange.end.selected < hourRange.end.options[0].value) {
            hourRange.end.selected = hourRange.end.options[0].value;
          }
        }

        previousSelectedEnd = hourRange.end.selected;
      } else {
        // no hacer nada
        stop = true;
      }
    } else {
      updatedHourRangeInfos.splice(i);
      stop = true;
    }

    if (stop) {
      break;
    }
  }

  return updatedHourRangeInfos;
}

function dbDaysToDays(dbDays: Day[]): DaysMap {
  let daysMap: DaysMap = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  };

  dbDays.forEach((dbDay) => {
    const dayName = dbDay.name;
    if (
      dayName == 'monday' ||
      dayName == 'tuesday' ||
      dayName == 'wednesday' ||
      dayName == 'thursday' ||
      dayName == 'friday'
    ) {
      daysMap[dayName] = dbHourRangesToHourRangeInfos(dbDay.HourRanges);
    }
  });

  return daysMap;
}

function dbHourRangesToHourRangeInfos(
  dbHourRanges: HourRange[]
): HourRangeInfo[] {
  let hourRangeInfos: HourRangeInfo[] = [];

  let previousEnd: number;
  dbHourRanges.forEach((dbHourRange, index) => {
    let startFrom: number;

    const startHourIndex = indexByHourMap[dbHourRange.start];

    if (index == 0) {
      startFrom = 0;
    } else {
      startFrom = previousEnd + 1;
    }

    const endHourIndex = indexByHourMap[dbHourRange.end];

    const id = dbHourRange.id;

    let start = {
      options: getStartHourRangeOptions(startFrom),
      selected: startHourIndex,
    };
    let end = {
      options: getEndHourRangeOptions(startHourIndex + 1),
      selected: endHourIndex,
    };

    hourRangeInfos.push({ id, start, end });

    previousEnd = endHourIndex;
  });

  return hourRangeInfos;
}

function getHourByIndex(index: number): string {
  return hours[index];
}

function getDeletedHourRanges(
  previousHourRangesInfo: HourRangeInfo[],
  newHourRangesInfo: HourRangeInfo[]
): number[] {
  let hourRangesToDelete: number[] = [];

  let removedHourRanges = previousHourRangesInfo.slice(
    newHourRangesInfo.length
  );

  hourRangesToDelete = removedHourRanges
    .map((hourRange) => (hourRange.id ? hourRange.id : -1))
    .filter((id) => id >= 0);

  return hourRangesToDelete;
}

export {
  getRemainingHourRangesQuantity,
  getStartHourRangeOptions,
  getEndHourRangeOptions,
  getIndexByValue,
  getHourRangesUpdated,
  dbDaysToDays,
  getHourByIndex,
  getDeletedHourRanges,
};

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDays, saveDays } from '../../../../../../api/admin/days';
import { toast } from 'react-toastify';
import {
  dbDaysToDays,
  getDeletedHourRanges,
  getEndHourRangeOptions,
  getHourRangesUpdated,
  getRemainingHourRangesQuantity,
  getStartHourRangeOptions,
} from '../dayUtils';

const emptyDaysMap = (): DaysMap => ({
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
});

export default function useDaysConfiguration() {
  const [days, setDays] = useState(emptyDaysMap());
  const [selectedDay, setSelectedDay] = useState<WeekDay>('monday');
  const [lastSelectedHourIndex, setLastSelectedHourIndex] = useState(0);
  const [dayIdByNameMap, setDayIdByNameMap] = useState(
    new Map<WeekDay, number>()
  );
  const [hourRangesToDelete, setHourRangesToDelete] = useState(
    new Map<WeekDay, number[]>()
  );

  const params = useParams();

  useEffect(() => {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;
    if (doctorId && calendarId) {
      getDays(doctorId, calendarId).then((dbDays) => {
        if (dbDays.length === 5) {
          const days = dbDaysToDays(dbDays);
          const map = new Map<WeekDay, number>();

          dbDays.forEach((dbDay) => map.set(dbDay.name as WeekDay, dbDay.id));
          setDays(days);
          setDayIdByNameMap(map);
        }
      });
    }

    return () => {
      setDays({} as DaysMap);
      setDayIdByNameMap(new Map<WeekDay, number>());
      setHourRangesToDelete(new Map<WeekDay, number[]>());
    };
  }, []);

  useEffect(() => {
    if (days) {
      const currentDay = days[selectedDay];

      const length = currentDay.length;
      if (length != 0) {
        setLastSelectedHourIndex(currentDay[length - 1].end.selected);
      } else {
        setLastSelectedHourIndex(0);
      }
    }
  }, [selectedDay]);

  function daySelectionHandler(day: WeekDay) {
    setSelectedDay(day);
  }

  function addHourRangeHandler() {
    let hourRangesInfo = days[selectedDay];
    let myIndex = 0;
    if (hourRangesInfo.length != 0) {
      const lastHourRangeInfo = hourRangesInfo[hourRangesInfo.length - 1];
      myIndex = lastHourRangeInfo.end.selected + 1;
    }

    if (getRemainingHourRangesQuantity(myIndex) >= 2) {
      const startHourRangeOptions = getStartHourRangeOptions(myIndex);
      const endHourRangeOptions = getEndHourRangeOptions(myIndex + 1);
      hourRangesInfo.push({
        start: {
          options: startHourRangeOptions,
          selected: startHourRangeOptions[0].value,
        },
        end: {
          options: endHourRangeOptions,
          selected: endHourRangeOptions[0].value,
        },
      });
      const newDays = { ...days, [selectedDay]: hourRangesInfo };
      setDays(newDays);
      setLastSelectedHourIndex(endHourRangeOptions[0].value);
    } else {
      alert('No more hour ranges available!');
    }
  }

  function selectChangeHandler(hourRangeIndex: number, type: 'start' | 'end') {
    return (value: number) => {
      let newHourRangesInfo = [...days[selectedDay]];
      let hourRangeInfo = newHourRangesInfo[hourRangeIndex];
      hourRangeInfo[type].selected = value;

      if (type == 'start') {
        hourRangeInfo.end.options = getEndHourRangeOptions(value + 1);

        if (value >= hourRangeInfo.end.selected) {
          hourRangeInfo.end.selected = value + 1;
        }
      }

      // If the modified hour range (either its start or end) isn't the last one
      // then I have to update the following hour range infos
      if (newHourRangesInfo.length - 1 > hourRangeIndex) {
        let rest = newHourRangesInfo.slice(hourRangeIndex + 1);
        let updatedHourRanges: HourRangeInfo[] = getHourRangesUpdated(
          rest,
          hourRangeInfo
        );
        // Replace the old hour range infos with the updated ones
        newHourRangesInfo.splice(
          hourRangeIndex + 1,
          newHourRangesInfo.length,
          ...updatedHourRanges
        );

        let previousHourRangesInfo = [...days[selectedDay]];
        if (previousHourRangesInfo.length > newHourRangesInfo.length) {
          let listToDelete = getDeletedHourRanges(
            previousHourRangesInfo,
            newHourRangesInfo
          );
          if (listToDelete.length > 0) {
            let newHourRangesToDelete = new Map(hourRangesToDelete);

            let currentHourRangesToDelete =
              newHourRangesToDelete.get(selectedDay);
            if (currentHourRangesToDelete) {
              currentHourRangesToDelete.push(...listToDelete);
            } else {
              newHourRangesToDelete.set(selectedDay, listToDelete);
            }

            setHourRangesToDelete(newHourRangesToDelete);
          }
        }
      }

      const newDays = { ...days, [selectedDay]: newHourRangesInfo };
      setDays(newDays);
      const lastIndex =
        newHourRangesInfo[newHourRangesInfo.length - 1].end.selected;
      setLastSelectedHourIndex(lastIndex);
    };
  }

  function saveHandler() {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;
    if (doctorId && calendarId) {
      saveDays(doctorId, calendarId, days, dayIdByNameMap, hourRangesToDelete)
        .then((message) => toast.success(message))
        .catch((errorMessage) => toast.error(errorMessage));
    }
  }

  function deleteHandler(id?: number) {
    let newDays = { ...days };
    newDays[selectedDay].pop();

    let newHourRangesToDelete = new Map(hourRangesToDelete);

    let currentHourRangesToDelete = newHourRangesToDelete.get(selectedDay);
    if (id) {
      if (currentHourRangesToDelete) {
        currentHourRangesToDelete.push(id);
      } else {
        newHourRangesToDelete.set(selectedDay, [id]);
      }
    }

    setDays(newDays);
    setHourRangesToDelete(newHourRangesToDelete);
  }

  return {
    state: { days, selectedDay, lastSelectedHourIndex },
    actions: {
      daySelectionHandler,
      addHourRangeHandler,
      selectChangeHandler,
      saveHandler,
      deleteHandler,
    },
  };
}

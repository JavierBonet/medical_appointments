import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { getDays, saveDays } from '../../../../../api/days';
import SelectInputField from '../../../../commons/SelectInputField';
import { toast } from 'react-toastify';
import './daysConfiguration.scss';
import {
  dbDaysToDays,
  getDeletedHourRanges,
  getEndHourRangeOptions,
  getHourRangesUpdated,
  getIndexByValue,
  getRemainingHourRangesQuantity,
  getStartHourRangeOptions,
} from './dayUtils';

const initialDaysMap: DaysMap = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

const ConfigureDays = () => {
  const [days, setDays] = useState(initialDaysMap);
  const [selectedDay, setSelectedDay] = useState('monday' as WeekDay);
  const [lastSelectedHourIndex, setLastSelectedHourIndex] = useState(0);
  const [dayIdByNameMap, setDayIdByNameMap] = useState<Map<WeekDay, number>>(
    new Map()
  );
  const [hourRangesToDelete, setHourRangesToDelete] = useState<
    Map<WeekDay, number[]>
  >(new Map());

  const params = useParams();

  useEffect(() => {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;
    if (doctorId && calendarId) {
      getDays(doctorId, calendarId).then((dbDays) => {
        if (dbDays.length == 5) {
          const days = dbDaysToDays(dbDays);
          const map: Map<WeekDay, number> = new Map();

          dbDays.forEach((dbDay) => map.set(dbDay.name as WeekDay, dbDay.id));
          setDays(days);
          setDayIdByNameMap(map);
        }
      });
    }

    return () => {
      setDays({} as DaysMap);
      setDayIdByNameMap({} as Map<WeekDay, number>);
    };
  }, []);

  useEffect(() => {
    const currentDay = days[selectedDay];
    // console.log(currentDay);

    const length = currentDay.length;
    if (length != 0) {
      setLastSelectedHourIndex(currentDay[length - 1].end.selected);
    } else {
      setLastSelectedHourIndex(0);
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
            console.log(newHourRangesToDelete);
          }
        }
      }

      const newDays = { ...days, [selectedDay]: newHourRangesInfo };
      setDays(newDays);
      const lastIndex =
        newHourRangesInfo[newHourRangesInfo.length - 1].end.selected;
      setLastSelectedHourIndex(lastIndex);
      // console.log(newDays);
    };
  }

  function saveHandler() {
    const doctorId = params.doctorId;
    const calendarId = params.calendarId;
    if (doctorId && calendarId) {
      // Crear days.ts en carpeta api y poner el método saveDays ahí
      saveDays(doctorId, calendarId, days, dayIdByNameMap, hourRangesToDelete)
        .then((message) => toast.success(message))
        .catch((errorMessage) => toast.error(errorMessage));
    }
  }

  function deleteHandler(id: number) {
    let newDays = { ...days };
    newDays[selectedDay].pop();

    let newHourRangesToDelete = new Map(hourRangesToDelete);

    let currentHourRangesToDelete = newHourRangesToDelete.get(selectedDay);
    if (currentHourRangesToDelete) {
      currentHourRangesToDelete.push(id);
    } else {
      newHourRangesToDelete.set(selectedDay, [id]);
    }

    setDays(newDays);
    setHourRangesToDelete(newHourRangesToDelete);
  }

  return (
    <>
      <h1>Days configuration</h1>
      <div className="days-configuration">
        <div className="header">
          <div className="add-hour-range-button">
            <Button
              positive
              disabled={
                getRemainingHourRangesQuantity(lastSelectedHourIndex + 1) < 2
              }
              onClick={() => addHourRangeHandler()}
            >
              Add
            </Button>
          </div>
          <div className="days">
            <div className="day" onClick={() => daySelectionHandler('monday')}>
              Monday
            </div>
            <div className="day" onClick={() => daySelectionHandler('tuesday')}>
              Tuesday
            </div>
            <div
              className="day"
              onClick={() => daySelectionHandler('wednesday')}
            >
              Wednesday
            </div>
            <div
              className="day"
              onClick={() => daySelectionHandler('thursday')}
            >
              Thursday
            </div>
            <div className="day" onClick={() => daySelectionHandler('friday')}>
              Friday
            </div>
          </div>
        </div>
        <div className="body">
          {days[selectedDay] ? (
            days[selectedDay].map((hourRangeInfo, index) => {
              return (
                <div
                  key={hourRangeInfo.end.selected}
                  className="day-hour-ranges"
                >
                  <SelectInputField
                    label="Start"
                    name="start"
                    options={hourRangeInfo.start.options}
                    selected={hourRangeInfo.start.selected}
                    changeHandler={selectChangeHandler(index, 'start')}
                    removeLabel={true}
                  />
                  <SelectInputField
                    label="End"
                    name="end"
                    options={hourRangeInfo.end.options}
                    selected={hourRangeInfo.end.selected}
                    changeHandler={selectChangeHandler(index, 'end')}
                    removeLabel={true}
                  />
                  {days[selectedDay].length - 1 == index && (
                    <Button
                      negative
                      onClick={() =>
                        hourRangeInfo.id ? deleteHandler(hourRangeInfo.id) : {}
                      }
                    >
                      delete
                    </Button>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="save-button">
        <Button onClick={() => saveHandler()}>Save</Button>
      </div>
    </>
  );
};

export default ConfigureDays;

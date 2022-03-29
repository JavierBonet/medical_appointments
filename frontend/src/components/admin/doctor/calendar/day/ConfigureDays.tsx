import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import SelectInputField from '../../../../commons/SelectInputField';
import './daysConfiguration.scss';
import {
  getEndHourRangeOptions,
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

  function daySelectionHandler(day: WeekDay) {
    setSelectedDay(day);
  }

  function addHourRangeHandler() {
    let hourRangesInfo = days[selectedDay];
    let offset: number;
    let lastIndex = 0;
    if (hourRangesInfo.length == 0) {
      offset = 0;
    } else {
      const lastHourRangeInfo = hourRangesInfo[hourRangesInfo.length - 1];
      offset = lastHourRangeInfo.lastIndex + lastHourRangeInfo.offset + 1;
    }

    if (getRemainingHourRangesQuantity(offset) > 2) {
      const startHourRangeOptions = getStartHourRangeOptions(
        lastIndex + offset
      );
      const endHourRangeOptions = getEndHourRangeOptions(
        lastIndex + offset + 1
      );
      hourRangesInfo.push({
        lastIndex: lastIndex + 1,
        offset: offset,
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
    } else {
      alert('SIN MAS HOUR RANGES');
    }
  }

  function selectChangeHandler(hourRangeIndex: number, type: 'start' | 'end') {
    return (value: number) => {
      let newHourRangesInfo = [...days[selectedDay]];
      let hourRangeInfo = newHourRangesInfo[hourRangeIndex];
      hourRangeInfo[type].selected = value;

      if (type == 'end') {
        const options = hourRangeInfo.end.options;
        hourRangeInfo.lastIndex += getIndexByValue(options, value);
      }
      const newDays = { ...days, [selectedDay]: newHourRangesInfo };
      setDays(newDays);
    };
  }

  return (
    <>
      <h1>Days configuration</h1>
      <div className="days-configuration">
        <div className="header">
          <div className="add-hour-range-button">
            <Button positive onClick={() => addHourRangeHandler()}>
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
          {days[selectedDay].map((hourRangeInfo, index) => {
            return (
              <div key={hourRangeInfo.offset} className="day-hour-ranges">
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ConfigureDays;

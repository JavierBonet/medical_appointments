import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { getDays, saveDays } from '../../../../../api/admin/days';
import SelectInputField from '../../../../commons/SelectInputField';
import { toast } from 'react-toastify';
import './daysConfiguration.scss';
import {
  dbDaysToDays,
  getDeletedHourRanges,
  getEndHourRangeOptions,
  getHourRangesUpdated,
  getRemainingHourRangesQuantity,
  getStartHourRangeOptions,
} from './dayUtils';
import DaysOfTheWeek from './DaysOfTheWeek';
import useDaysConfiguration from './ConfigureDays/useDaysConfiguration';

const ConfigureDays = () => {
  const {
    state: { days, selectedDay, lastSelectedHourIndex },
    actions: {
      daySelectionHandler,
      addHourRangeHandler,
      selectChangeHandler,
      saveHandler,
      deleteHandler,
    },
  } = useDaysConfiguration();

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
              onClick={addHourRangeHandler}
            >
              Add
            </Button>
          </div>
          <DaysOfTheWeek daySelectionHandler={daySelectionHandler} />
        </div>
        <div className="body">
          {days[selectedDay].length !== 0 &&
            days[selectedDay].map((hourRangeInfo, index) => (
              <div key={hourRangeInfo.end.selected} className="day-hour-ranges">
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
                    onClick={() => deleteHandler(hourRangeInfo.id)}
                  >
                    delete
                  </Button>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="save-button">
        <Button onClick={saveHandler}>Save</Button>
      </div>
    </>
  );
};

export default ConfigureDays;

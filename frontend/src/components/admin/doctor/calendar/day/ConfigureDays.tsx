import { Button } from 'semantic-ui-react';
import { getRemainingHourRangesQuantity } from './dayUtils';
import SelectInputField from '../../../../commons/SelectInputField';
import DaysOfTheWeek from './DaysOfTheWeek';
import useDaysConfiguration from './ConfigureDays/useDaysConfiguration';
import './daysConfiguration.scss';

const ConfigureDays = () => {
  const {
    state: { days, selectedDay, lastSelectedHourIndex },
    actions: { daySelectionHandler, addHourRangeHandler, selectChangeHandler, saveHandler, deleteHandler },
  } = useDaysConfiguration();

  return (
    <>
      <h1>Days configuration</h1>
      <div className="days-configuration">
        <div className="header">
          <div className="add-hour-range-button">
            <Button
              positive
              disabled={getRemainingHourRangesQuantity(lastSelectedHourIndex + 1) < 2}
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
              <div key={hourRangeInfo.end.selected} className="day-hour-ranges" data-testid="day-hour-range">
                <SelectInputField
                  id="start"
                  label="Start"
                  options={hourRangeInfo.start.options}
                  selected={hourRangeInfo.start.selected}
                  changeHandler={selectChangeHandler(index, 'start')}
                  removeLabel={true}
                />
                <SelectInputField
                  id="end"
                  label="End"
                  options={hourRangeInfo.end.options}
                  selected={hourRangeInfo.end.selected}
                  changeHandler={selectChangeHandler(index, 'end')}
                  removeLabel={true}
                />
                {days[selectedDay].length - 1 === index && (
                  <Button negative onClick={() => deleteHandler(hourRangeInfo.id)}>
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

import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import './CalendarDate/styles.scss';
import { getDayOfTheMonth, getMonth } from './utils';

interface PropsInterface {
  date: Date;
  hours: string[];
  saveHandler: (date: Date, hour: string) => void;
}

const CalendarDate = ({ date, hours, saveHandler }: PropsInterface) => {
  const [selectedHour, setSelectedHour] = useState<string | undefined>(
    undefined
  );
  const [selectedHourElement, setSelectedHourElement] = useState<
    HTMLDivElement | undefined
  >(undefined);

  function onHourSelection(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    hour: string
  ) {
    setSelectedHour(hour);

    if (selectedHourElement) {
      selectedHourElement.classList.remove('selected');
    }

    const target = event.currentTarget;
    target.classList.add('selected');
    setSelectedHourElement(target);
  }

  return (
    <div className="appointment-hours fade-in">
      <h2 className="hour-header">{`${date.getFullYear()}-${getMonth(
        date
      )}-${getDayOfTheMonth(date)}`}</h2>
      <div className="hours">
        {hours.map((hour, index) => (
          <div
            className="hour"
            key={index}
            onClick={(event) => onHourSelection(event, hour)}
          >
            {hour}
          </div>
        ))}
      </div>
      <div className="save-button">
        <Button
          onClick={() => (selectedHour ? saveHandler(date, selectedHour) : {})}
          disabled={selectedHour ? false : true}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CalendarDate;

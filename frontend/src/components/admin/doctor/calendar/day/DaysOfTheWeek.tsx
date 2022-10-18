import React from 'react';

interface PropsInterface {
  daySelectionHandler: (day: WeekDay) => void;
}

const DaysOfTheWeek = ({ daySelectionHandler }: PropsInterface) => {
  return (
    <div className="days">
      <div className="day" onClick={() => daySelectionHandler('monday')}>
        Monday
      </div>
      <div className="day" onClick={() => daySelectionHandler('tuesday')}>
        Tuesday
      </div>
      <div className="day" onClick={() => daySelectionHandler('wednesday')}>
        Wednesday
      </div>
      <div className="day" onClick={() => daySelectionHandler('thursday')}>
        Thursday
      </div>
      <div className="day" onClick={() => daySelectionHandler('friday')}>
        Friday
      </div>
    </div>
  );
};

export default DaysOfTheWeek;

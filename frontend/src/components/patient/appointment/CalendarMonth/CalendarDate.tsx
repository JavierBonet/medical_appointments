import { getDayOfTheMonth } from '../utils';
import './CalendarDate/styles.scss';

interface PropsInterface {
  calendarDate: CalendarDate | undefined;
  index: number;
  onDateSelection: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Date | undefined) => void;
}

const CalendarDate = ({ calendarDate, index, onDateSelection }: PropsInterface) => {
  return calendarDate ? (
    calendarDate.enabled ? (
      <div className="calendar-date" key={index} onClick={(event) => onDateSelection(event, calendarDate.date)}>
        {getDayOfTheMonth(calendarDate.date)}
      </div>
    ) : (
      <div className="calendar-date disabled" key={index}>
        {getDayOfTheMonth(calendarDate.date)}
      </div>
    )
  ) : (
    <div className="calendar-date disabled" key={index}>
      {' '}
    </div>
  );
};

export default CalendarDate;

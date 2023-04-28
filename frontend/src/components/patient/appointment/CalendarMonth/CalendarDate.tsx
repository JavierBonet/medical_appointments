import { getDayOfTheMonth } from '../utils';
import './CalendarDate/styles.scss';

interface PropsInterface {
  calendarDate: CalendarDate | undefined;
  onDateSelection: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Date | undefined) => void;
}

const CalendarDate = ({ calendarDate, onDateSelection }: PropsInterface) => {
  const dayOfTheMonth = calendarDate ? getDayOfTheMonth(calendarDate.date) : undefined;
  return calendarDate ? (
    calendarDate.enabled ? (
      <div className="calendar-date" onClick={(event) => onDateSelection(event, calendarDate.date)}>
        {dayOfTheMonth}
      </div>
    ) : (
      <div className="calendar-date disabled">{dayOfTheMonth}</div>
    )
  ) : (
    <div className="calendar-date disabled"> </div>
  );
};

export default CalendarDate;

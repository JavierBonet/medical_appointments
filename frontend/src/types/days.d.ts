interface DaysMap {
  monday: HourRangeInfo[];
  tuesday: HourRangeInfo[];
  wednesday: HourRangeInfo[];
  thursday: HourRangeInfo[];
  friday: HourRangeInfo[];
}

type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

interface HourRangeInfo {
  lastIndex: number;
  offset: number;
  start: {
    options: SelectOption[];
    selected?: number;
  };
  end: {
    options: SelectOption[];
    selected?: number;
  };
}

interface DaysMap {
  monday: HourRangeInfo[];
  tuesday: HourRangeInfo[];
  wednesday: HourRangeInfo[];
  thursday: HourRangeInfo[];
  friday: HourRangeInfo[];
}

type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

interface HourRangeInfo {
  id?: number;
  start: {
    options: SelectOption[];
    selected: number;
  };
  end: {
    options: SelectOption[];
    selected: number;
  };
}

interface NoDayHourRangeAttributes {
  start: string;
  end: string;
}

interface HourRangeAttributes {
  id?: number;
  start: string;
  end: string;
  dayId: number;
}

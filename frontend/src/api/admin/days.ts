import axios from 'axios';
import { getHourByIndex } from '../../components/admin/doctor/calendar/day/dayUtils';
import { create } from './hourRanges';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

function getBaseUrl(doctorId: string, calendarId: string) {
  return `http://localhost:3000/api/admin/doctors/${doctorId}/calendars/${calendarId}/days`;
}

async function saveDays(
  doctorId: string,
  calendarId: string,
  days: DaysMap,
  dayIdByNameMap: Map<WeekDay, number>,
  hourRangesToDelete: Map<WeekDay, number[]>
) {
  let message: string;
  let errorHappened = false;
  const calId = parseInt(calendarId);
  if (dayIdByNameMap.size === 0) {
    message = 'Days successfully created';

    Object.keys(days).forEach((dayName, index) => {
      const HourRanges: NoDayHourRangeAttributes[] = [];

      const dayHourRanges = days[dayName as WeekDay];

      for (let i = 0; i < dayHourRanges.length; i++) {
        const hourRangeInfo = dayHourRanges[i];
        HourRanges.push({
          start: getHourByIndex(hourRangeInfo.start.selected),
          end: getHourByIndex(hourRangeInfo.end.selected),
        });
      }

      // days[dayName as WeekDay].forEach((hourRangeInfo) => {
      //   HourRanges.push({
      //     start: getHourByIndex(hourRangeInfo.start.selected),
      //     end: getHourByIndex(hourRangeInfo.end.selected),
      //   });
      // });

      const dbDay = {
        name: dayName,
        number: index,
        calendarId: calId,
        HourRanges,
      };

      axios
        .post<Day>(getBaseUrl(doctorId, calendarId), dbDay)
        .then(async (response) => {
          const dayId = response.data.id;
          const hourRanges = dbDay.HourRanges;
          for (let i = 0; i < hourRanges.length; i++) {
            const hourRange: OptionalHourRange = {
              ...hourRanges[i],
              dayId,
            };
            await create(doctorId, calendarId, `${dayId}`, hourRange);
          }
        })
        .catch((err: Error) => {
          message = err.message;
          errorHappened = true;
        });
    });
  } else {
    // In this case the days are already created, so what's needed is
    // to update the previously created hour ranges and to create the
    // new ones
    message = 'Days successfully updated';

    Object.keys(days).forEach((dayName) => {
      const hourRangesToCreate: HourRangeAttributes[] = [];
      const hourRangesToUpdate: HourRangeAttributes[] = [];

      const dayId = dayIdByNameMap.get(dayName as WeekDay);

      if (dayId) {
        days[dayName as WeekDay].forEach((hourRangeInfo) => {
          const hourRange: HourRangeAttributes = {
            start: getHourByIndex(hourRangeInfo.start.selected),
            end: getHourByIndex(hourRangeInfo.end.selected),
            dayId,
          };

          if (hourRangeInfo.id) {
            hourRange.id = hourRangeInfo.id;
            hourRangesToUpdate.push(hourRange);
          } else {
            hourRangesToCreate.push(hourRange);
          }
        });

        hourRangesToCreate.forEach((hourRange) => {
          axios.post(`${getBaseUrl(doctorId, calendarId)}/${dayId}/hourRanges`, hourRange).catch((err: Error) => {
            message = err.message;
            errorHappened = true;
          });
        });

        hourRangesToUpdate.forEach((hourRange) => {
          axios
            .put(`${getBaseUrl(doctorId, calendarId)}/${dayId}/hourRanges/${hourRange.id}`, hourRange)
            .catch((err: Error) => {
              message = err.message;
              errorHappened = true;
            });
        });
      }
    });

    hourRangesToDelete.forEach((idsToDelete, dayName) => {
      const dayId = dayIdByNameMap.get(dayName);
      idsToDelete.forEach((id) => {
        axios.delete(`${getBaseUrl(doctorId, calendarId)}/${dayId}/hourRanges/${id}`).catch((err: Error) => {
          message = err.message;
          errorHappened = true;
        });
      });
    });
  }

  return new Promise<string>((resolve, reject) => {
    if (errorHappened) {
      reject(message);
    } else {
      resolve(message);
    }
  });
}

async function getDays(doctorId: string, calendarId: string) {
  return axios.get<Day[]>(getBaseUrl(doctorId, calendarId)).then((response) => response.data);
}

export { saveDays, getDays };

export const parseToSchedule = (schedules) => {
  const result = {};
  schedules.map((schedule) => {
    result[schedule.date] =
      schedule.reminds && schedule.reminds.length
        ? schedule.reminds.map((remind) => {
            return { ...remind, type: "remind", scheduleId: schedule.id };
          })
        : schedule.diaries && schedule.diaries.length
        ? schedule.diaries.map((diary) => {
            return {
              ...diary,
              type: "diary",
              date: schedule.date,
              scheduleId: schedule.id,
            };
          })
        : [];
  });
  return result;
};

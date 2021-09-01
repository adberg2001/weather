export const formatDate = (unix_timestamp) => {
  const date = new Date(unix_timestamp * 1000);
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const mon = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  const monName = months[date.getMonth()]
  const nextDate = new Date(date.getDate());
  nextDate.setDate(date.getDate() + 1);
  const nextD = nextDate.getDate().toString().padStart(2, '0');
  const nextM = (nextDate.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDay();
  return {
    h,
    min,
    s,
    mon,
    y,
    d,
    monName,
    nextD,
    nextM,
    day,
    dayName: days[day]
  }
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const days = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]


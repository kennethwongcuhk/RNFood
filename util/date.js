export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function isEqualDate(date1, date2) {
  return getFormattedDate(date1) === getFormattedDate(date2);
}

export function isToday(date) {
  const today = new Date();
  return getFormattedDate(today) === getFormattedDate(date);
}

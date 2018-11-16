import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import format from 'date-fns/format';
import isValid from 'date-fns/is_valid';

export const prettyDate = inputDate => {
  let date = inputDate;

  if (!(date instanceof Date)) {
    date = new Date(inputDate);
  }

  if (!isValid(date)) {
    return 'Invalid Date';
  }

  if (isToday(date)) {
    return format(date, 'hh:mm a');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  }
  return format(date, 'MMM, DD');
};

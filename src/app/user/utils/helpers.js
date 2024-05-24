import { add, addMinutes, getHours, getMinutes, isBefore, isEqual, parse } from 'date-fns';

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function weekdayIndexToName(index) {
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return days[index];
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Functions to round a given date up to the nearest half hour
export const roundNearestMinutes = (date, interval) => {
  const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval);
  return addMinutes(date, minutesLeftUntilNextInterval);
};

/**
 * 
 * @param startDate  day we want the opening hours for at midnight
 * @param dbDays opening hours for the week
 * @returns array of dates for every opening hour
 */
export const getOpeningTimes = (startDate, dbDays = []) => {
  const dayOfWeek = startDate.getDay();
  const isToday = isEqual(startDate, new Date().setHours(0, 0, 0, 0));

  const today = dbDays.find((d) => d.dayOfWeek === dayOfWeek);
  if (!today) {
    console.error('Day not found in the database:', { dayOfWeek, dbDays });
    throw new Error('This day does not exist in the database');
  }

  const opening = parse(today.openTime, 'kk:mm', startDate);
  const closing = parse(today.closeTime, 'kk:mm', startDate);

  let hours;
  let minutes;

  if (isToday) {
    // Round the current time to the nearest interval. If there are no more bookings today, then throw an error
    const rounded = roundNearestMinutes(new Date(), 30);
    const tooLate = !isBefore(rounded, closing);
    if (tooLate) throw new Error('No more bookings today');
    console.log('rounded', rounded);

    const isBeforeOpening = isBefore(rounded, opening);

    hours = getHours(isBeforeOpening ? opening : rounded);
    minutes = getMinutes(isBeforeOpening ? opening : rounded);
  } else {
    hours = getHours(opening);
    minutes = getMinutes(opening);
  }

  const beginning = add(startDate, { hours, minutes });
  const end = add(startDate, { hours: getHours(closing) });
  const interval = 30;
  // From beginning to end every interval generate a date and put that into an array

  const times = [];
  for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
    times.push(i);
  }
  return times;
};

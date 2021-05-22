/* eslint-disable no-useless-concat */
/* eslint-disable no-use-before-define */
// ----------------------------------------------------------------------
// CONFIG
// ----------------------------------------------------------------------

/**
 * Past this number of days we'll no longer display the
 * day of the week and instead we'll display the date
 * with the month
 */
const DATE_WITH_MONTH_THRESHOLD_IN_DAYS = 6;

/**
  * Past this number of seconds it's now longer "now" when
  * we're displaying dates
  */
const NOW_THRESHOLD_IN_SECONDS = 10;

/**
  * Past this number of hours we'll no longer display "hours
  * ago" and instead we'll display "today"
  */
const TODAY_AT_THRESHOLD_IN_HOURS = 12;

const MILLISECONDS_TO_SECONDS = 0.001;

const SECONDS_IN_YEAR = 31557600;

const SECONDS_IN_MONTH = 2629800;

const SECONDS_IN_DAY = 86400;

const SECONDS_IN_HOUR = 3600;

const SECONDS_IN_MINUTE = 60;

// ----------------------------------------------------------------------
// i18n
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// HUMAN-FRIENDLY DATES
// ----------------------------------------------------------------------

/**
  * Retrieve a human-friendly date string relative to now and in the
  * current locale e.g. "two minutes ago"
  */

/**
  * Convert milliseconds to seconds
  */
function millisecondsToSeconds(milliseconds) {
  return Math.floor(milliseconds * MILLISECONDS_TO_SECONDS);
}

/**
  * Break up a unix timestamp into its date & time components
  */
function getDateTimeComponents(timestamp) {
  const components = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  let remaining = timestamp;

  // years
  components.years = Math.floor(remaining / SECONDS_IN_YEAR);

  remaining -= components.years * SECONDS_IN_YEAR;

  // months
  components.months = Math.floor(remaining / SECONDS_IN_MONTH);

  remaining -= components.months * SECONDS_IN_MONTH;

  // days
  components.days = Math.floor(remaining / SECONDS_IN_DAY);

  remaining -= components.days * SECONDS_IN_DAY;

  // hours
  components.hours = Math.floor(remaining / SECONDS_IN_HOUR);

  remaining -= components.hours * SECONDS_IN_HOUR;

  // minutes
  components.minutes = Math.floor(remaining / SECONDS_IN_MINUTE);

  remaining -= components.minutes * SECONDS_IN_MINUTE;

  // seconds
  components.seconds = remaining;

  return components;
}

/**
  * For English, format a date with given options, adding an ordinal
  * e.g. "May 1st, 1992" (note the "1st"). For non-English locales,
  * format a date with given options (and no ordinal);
  */
function formatLocalizedDateWithOrdinal(locale, date, options = { includeYear: false }) {
  return formatEnglishDateWithOrdinal(date, options);
}

/**
  * Retrieve an English ordinal for a number, e.g. "2nd" for 2
  */
function getOrdinal(n) {
  // From https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
  * Format an English date with it ordinal e.g. "May 1st, 1992"
  */
function formatEnglishDateWithOrdinal(date, { includeYear }) {
  const month = date.toLocaleDateString('en', { month: 'long' });

  const day = getOrdinal(date.getDate());

  let formatted = `${month} ${day}`;

  if (includeYear) {
    formatted += `, ${date.getFullYear()}`;
  }

  return formatted;
}

const currentLocale = 'en';
function humanFriendlyDate(date) {
  const targetDate = new Date(date);
  const unixTimestamp = millisecondsToSeconds(targetDate.valueOf());

  const now = millisecondsToSeconds(Date.now());

  const diffComponents = getDateTimeComponents(now - unixTimestamp);

  const {
    years, months, days, hours, minutes, seconds
  } = diffComponents;

  if (years > 0) {
    return formatLocalizedDateWithOrdinal(currentLocale, targetDate, { includeYear: true });
  }

  if (months > 0 || days > DATE_WITH_MONTH_THRESHOLD_IN_DAYS) {
    return formatLocalizedDateWithOrdinal(currentLocale, targetDate, { includeYear: false });
  }

  if (days > 1) {
    return targetDate.toLocaleDateString(currentLocale, { weekday: 'long' });
  }

  if (days === 1) {
    return 'yesterday';
  }

  if (hours > TODAY_AT_THRESHOLD_IN_HOURS) {
    return `${'today at' + ' '}${
      targetDate.toLocaleTimeString(currentLocale, { hour: 'numeric', minute: '2-digit' })}`;
  }

  if (hours > 0) {
    return `${hours} hours ago`;
  }

  if (minutes > 0) {
    return `${minutes}minutes ago`;
  }

  if (seconds > NOW_THRESHOLD_IN_SECONDS) {
    return `${seconds}seconds ago`;
  }

  return 'just now';
}

export default humanFriendlyDate;

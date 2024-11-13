import moment from 'moment';

const today = new Date();
const previousMonth = new Date(today.setMonth(today.getMonth() - 1));
// const previousMonthFirstDay = new Date(previousMonth.setDate(1));

const getThisMonthFirstDay = () => {
  const firstDay = moment().startOf('month').format('YYYY-MM-DD');
  return firstDay;
};
const getThisMonthLastDay = () => {
  const lastDay = moment().endOf('month').format('YYYY-MM-DD');
  return lastDay;
};
const getPreviousMonthFirstDay = () => {
  const firstDay = moment()
    .subtract(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  return firstDay;
};
const getPreviousMonthLastDay = () => {
  const lastDay = moment()
    .subtract(1, 'month')
    .endOf('month')
    .format('YYYY-MM-DD');
  return lastDay;
};
const getYesterday = () => {
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  return yesterday;
};
const getToday = () => {
  const today = moment().format('YYYY-MM-DD');
  return today;
};
const getThisWeekFirstDay = () => {
  const firstDay = moment().startOf('week').format('YYYY-MM-DD');

  return firstDay;
};
const getThisWeekLastDay = () => {
  const lastDay = moment().endOf('week').format('YYYY-MM-DD');

  return lastDay;
};
const getLastWeekFirstDay = () => {
  const firstDay = moment()
    .subtract(1, 'week')
    .startOf('week')
    .format('YYYY-MM-DD');
  return firstDay;
};
const getLastWeekLastDay = () => {
  const lastDay = moment()
    .subtract(1, 'week')
    .endOf('week')
    .format('YYYY-MM-DD');
  return lastDay;
};
const getThisYearFirstDay = () => {
  const firstDay = moment().startOf('year').format('YYYY-MM-DD');
  return firstDay;
};
const getThisYearLastDay = () => {
  const lastDay = moment().endOf('year').format('YYYY-MM-DD');
  return lastDay;
};
const getPreviousYearFirstDay = () => {
  const firstDay = moment()
    .subtract(1, 'year')
    .startOf('year')
    .format('YYYY-MM-DD');
  return firstDay;
};
const getPreviousYearLastDay = () => {
  const lastDay = moment()
    .subtract(1, 'year')
    .endOf('year')
    .format('YYYY-MM-DD');
  return lastDay;
};
const getQuarterFirstDay = () => {
  const firstDay = moment().startOf('quarter').format('YYYY-MM-DD');
  return firstDay;
};
const getQuarterLastDay = () => {
  const lastDay = moment().endOf('quarter').format('YYYY-MM-DD');
  return lastDay;
};
const getLastQuarterFirstDay = () => {
  const firstDay = moment()
    .subtract(1, 'quarter')
    .startOf('quarter')
    .format('YYYY-MM-DD');
  return firstDay;
};
const getLastQuarterLastDay = () => {
  const lastDay = moment()
    .subtract(1, 'quarter')
    .endOf('quarter')
    .format('YYYY-MM-DD');
  return lastDay;
};
export const dateCalcHelper = {
  today,
  previousMonth,
  getPreviousMonthFirstDay,
  getPreviousMonthLastDay,
  getThisMonthFirstDay,
  getThisMonthLastDay,
  getYesterday,
  getToday,
  getThisWeekFirstDay,
  getThisWeekLastDay,
  getThisYearFirstDay,
  getThisYearLastDay,
  getPreviousYearFirstDay,
  getPreviousYearLastDay,
  getQuarterFirstDay,
  getQuarterLastDay,
  getLastWeekFirstDay,
  getLastWeekLastDay,
  getLastQuarterFirstDay,
  getLastQuarterLastDay,
};

//make first letter of string uppercase
export const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const shortenLongString = (string: string, maxLength: number) => {
  return string?.length > maxLength
    ? string?.substring(0, maxLength) + '...'
    : string;
};
const adjustDate = (data: number) => {
  if (data < 10) {
    return `0${data}`;
  }
  return data;
};

export const displayDate = (date: Date) => {
  const parsedDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(parsedDate);
  const parsedDateValue = adjustDate(parsedDate.getFullYear());
  const parsedDateDay = adjustDate(parsedDate.getDate());
  const parsedDateHours = adjustDate(parsedDate.getHours());
  const parsedDateMinutes = adjustDate(parsedDate.getMinutes());
  const parsedDateSeconds = adjustDate(parsedDate.getSeconds());

  return `${parsedDateDay} ${month} ${parsedDateValue} ${parsedDateHours}:${parsedDateMinutes}:${parsedDateSeconds}`;
};

export function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + 'k'
    : Math.sign(num) * Math.abs(num);
}
export const sortNaturally = (array: any[], key: string) => {
  return array.sort((a, b) =>
    a[key].localeCompare(b[key], undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  );
};
export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
export const numberWithCommas = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

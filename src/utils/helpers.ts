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

export const displayDate = (date: Date, showTime = true) => {
  const parsedDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(parsedDate);
  const parsedDateValue = adjustDate(parsedDate.getFullYear());
  const parsedDateDay = adjustDate(parsedDate.getDate());
  const parsedDateHours = adjustDate(parsedDate.getHours());
  const parsedDateMinutes = adjustDate(parsedDate.getMinutes());
  const parsedDateSeconds = adjustDate(parsedDate.getSeconds());
  if (showTime) {
    return `${parsedDateDay} ${month} ${parsedDateValue} ${parsedDateHours}:${parsedDateMinutes}:${parsedDateSeconds}`;
  }
  return `${parsedDateDay} ${month} ${parsedDateValue}`;
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'warning':
      return 'info';
    case 'live':
      return 'success';
    case 'under review':
      return 'info';
    case 'disabled':
      return 'failure';
    case 'rejected':
      return 'failure';
    default:
      return 'info';
  }
};
export const getStatusBg = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-warning text-black';
    case 'live':
      return 'bg-success text-white';
    case 'under review':
      return 'bg-info text-black';
    case 'disabled':
      return 'bg-danger text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    default:
      return 'bg-info text-black';
  }
};

export const getTextColor = (hex: string) => {
  const red = parseInt(hex.substring(1, 3), 16);
  const green = parseInt(hex.substring(3, 5), 16);
  const blue = parseInt(hex.substring(5, 7), 16);
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186
    ? 'text-black'
    : 'text-white';
};

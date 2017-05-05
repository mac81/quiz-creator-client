import moment from 'moment';

export const getDate = (date, format = 'DD-MM-YYYY') => {
  const newDate = new Date(date);
  const formattedDate = moment(newDate).format(format);

  return formattedDate;
};

export default getDate;
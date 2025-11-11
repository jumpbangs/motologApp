import spacetime from 'spacetime';

export const DAY_MONTH_YEAR_FMT = 'dd/MM/yyyy';

export const convertDateToFmt = (date: string | Date, format: string) => {
  return spacetime(date).unixFmt(format);
};

export const getTodayDate = () => {
  return spacetime.now().format(DAY_MONTH_YEAR_FMT);
};

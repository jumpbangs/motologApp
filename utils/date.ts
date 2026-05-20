import spacetime from 'spacetime';

export const DAY_MONTH_YEAR_FMT = 'dd/MM/yyyy';

export const getTodayDate = () => {
  return spacetime.now().format(DAY_MONTH_YEAR_FMT);
};

export const convertDateToFmt = (date: string | Date, format: string) => {
  return spacetime(date).unixFmt(format);
};

export const getDashboardDate = () => {
  const now = spacetime.now();
  const day = now.format('day-short');
  const month = now.format('month-short');
  const date = now.date();
  return `${day} · ${month} ${date}`;
};

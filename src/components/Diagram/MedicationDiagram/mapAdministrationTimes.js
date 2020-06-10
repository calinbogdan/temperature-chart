export default function administrationTimes(interval, span) {
  const unixStart = interval[0].getTime();
  const unixEnd = interval[1].getTime();
  const step = span * 60 * 1000;

  const dates = [];

  for (let i = unixStart; i <= unixEnd; i += step) {
    dates.push(new Date(i));
  }
  return dates;
}

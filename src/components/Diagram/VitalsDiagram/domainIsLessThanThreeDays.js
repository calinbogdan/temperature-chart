const threeDaysInMillis = 1000 * 60 * 60 * 24 * 3;

export default (domain) =>
  domain[1].getTime() - domain[0].getTime() <= threeDaysInMillis;

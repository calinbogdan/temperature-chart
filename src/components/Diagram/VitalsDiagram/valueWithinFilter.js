export default function valueWithin(domain) {
  return function (record) {
    const recordTime = new Date(record.time).getTime();
    return (
      recordTime >= domain[0].getTime() && recordTime <= domain[1].getTime()
    );
  };
}

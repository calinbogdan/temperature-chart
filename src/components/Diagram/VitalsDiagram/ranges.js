import React from 'react';

const Range = ({ lowY, highY, fill }) => {
  const y = highY;
  const height = lowY - highY;
  return <rect width="100%" fill={fill} y={y} height={height} />;
};

const DangerRange = () => <rect fill="#ff0000" height="100%" width="100%" />;

const WarningRange = ({ highY, lowY }) => (
  <Range fill="#fff200" highY={highY} lowY={lowY} />
);
const NormalRange = ({ highY, lowY }) => (
  <Range fill="#0be000" highY={highY} lowY={lowY} />
);

export { DangerRange, WarningRange, NormalRange };

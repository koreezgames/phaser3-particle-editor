const deathZoneOptions = [
  {
    shapeType: 'Rectangle',
    source: {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    },
  },
  {
    shapeType: 'Circle',
    source: {
      x: 0,
      y: 0,
      radius: 50,
    },
  },
  {
    shapeType: 'Ellipse',
    source: {
      x: 0,
      y: 0,
      width: 80,
      height: 50,
    },
  },
  {
    shapeType: 'Triangle',
    source: {
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 0,
      x3: 50,
      y3: 50,
    },
  },
];

const emitZoneOptions = [
  ...deathZoneOptions,
  {
    shapeType: 'Line',
    source: {
      x1: 0,
      y1: 0,
      x2: 50,
      y2: 50,
    },
  },
];

const zoneEdgeSources = emitZoneOptions;

export { emitZoneOptions, deathZoneOptions };
export default zoneEdgeSources;

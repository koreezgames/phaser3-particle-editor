// const zoneEdgeSources = [
//   {
//     name: 'Rectangle',
//     source: {
//       x: 0,
//       y: 0,
//       width: 0,
//       height: 0
//     }
//   },
//   {
//     name: 'Rectangle',
//     source: {
//       x: 0,
//       y: 0,
//       width: 0,
//       height: 0
//     }
//   }
// ];

const zoneEdgeSources = [
  {
    name: 'Rectangle',
    keyValue: [
      { title: 'x', defaultValue: 0 },
      { title: 'y', defaultValue: 0 },
      { title: 'width', defaultValue: 0 },
      { title: 'height', defaultValue: 0 },
    ],
  },
  {
    name: 'Circle',
    keyValue: [
      { title: 'x', defaultValue: 0 },
      { title: 'y', defaultValue: 0 },
      { title: 'radius', defaultValue: 0 },
    ],
  },
  {
    name: 'Ellipse',
    keyValue: [
      { title: 'x', defaultValue: 0 },
      { title: 'y', defaultValue: 0 },
      { title: 'width', defaultValue: 0 },
      { title: 'height', defaultValue: 0 },
    ],
  },
  {
    name: 'Line',
    keyValue: [
      { title: 'x1', defaultValue: 0 },
      { title: 'y1', defaultValue: 0 },
      { title: 'x2', defaultValue: 0 },
      { title: 'y2', defaultValue: 0 },
    ],
  },
  {
    name: 'Triangle',
    keyValue: [
      { title: 'x1', defaultValue: 0 },
      { title: 'y1', defaultValue: 0 },
      { title: 'x2', defaultValue: 0 },
      { title: 'y2', defaultValue: 0 },
      { title: 'x3', defaultValue: 0 },
      { title: 'y3', defaultValue: 0 },
    ],
  },
];

export default zoneEdgeSources;

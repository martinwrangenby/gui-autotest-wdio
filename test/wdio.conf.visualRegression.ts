import { config } from './wdio.conf.headless';
const { join } = require('path');

config.services = [
  [
    'image-comparison',
    {
      baselineFolder: join(process.cwd(), './test/utils/visualRegressionBaseline'),
      formatImageName: '{tag}-{logName}-{width}x{height}',
      screenshotPath: join(process.cwd(), 'reports/.tmp/visualRegressionComparison'),
      savePerInstance: true,
      autoSaveBaseline: true,
      blockOutStatusBar: true,
      blockOutToolBar: true,
      tabbableOptions: {
        circle: {
          size: 18,
          fontSize: 18,
        },
        line: {
          color: '#ff221a',
          width: 3,
        },
      },
    },
  ],
];

config.specs = ['./test/specs/visualRegression/**/*.ts'];

export { config };

import { config } from './wdio.conf';

delete config.services;

config.hostname = 'localhost';
config.port = 4444;

config.capabilities = [
  {
    maxInstances: Number(process.env.NODE_CONCURRENCY) || 2,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--incognito'],
    },
    acceptInsecureCerts: true,
  },
  {
    maxInstances: Number(process.env.NODE_CONCURRENCY) || 2,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['-headless'],
    },
    acceptInsecureCerts: true,
  },
  {
    maxInstances: Number(process.env.NODE_CONCURRENCY) || 2,
    browserName: 'MicrosoftEdge',
    'moz:firefoxOptions': {
      args: ['-headless'],
    },
    acceptInsecureCerts: true,
  },
];

export { config };

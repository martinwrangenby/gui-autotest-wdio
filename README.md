# Wdio e2e test framework

This is a e2e test framework built using [webdriverIO](https://webdriver.io/) that is set to validate [this](https://www.volvocars.com/intl/v/car-safety/a-million-more) page. The framework supports both functional and visual regression tests.

## Preconditions

Make sure your local machine has the following set of tools installed:

- Docker
- node (prefered version: 16.18)
- Chrome browser (for local headful execution)

Optional:

- nvm

## Setup

If you have `nvm` installed on your machine, initially run

```
> nvm use
```

To make sure that you're using the correct node version.

Install all node dependencies:

```
> npm i
```

## Test execution

### Configuration

You can adjust your env and execution by defining env variables either directly in your terminal or by creating a `.env` file in the project root and define them there.  
Only supported env variable at this point is `NODE_CONCURRENCY` which sets how many test can be run in parallel on a given node (more info under **Environment** below)

### Environment

The framework comes with a dockerized Selenium Grid environment containing nodes for Google Chrome, Firefox and Microsort Edge where the tests can be executed.  
By default, the grid env serves a maximum concurrency of 2 instances per browser. By setting the env variable `NODE_CONCURRENCY` you can alter this which for instance can be handy in a CI context where you might wanna run with a higher concurrency if you have beefy runners (given that the framework had more tests to run in total than it has now). This will also affect how many tests webdriverIO will run concurrently accordingly.  
Note that you have to restart the env when you've altered this value.  
To start the env, run:

```
> npm run env:setup
```

And to stop the env:

```
> npm run env:teardown
```

### Functional tests

The functional tests can be executed in a bunch of different ways.  
To run your tests headful, run:

```
> npm run wdio:headful
```

The headful tests will always run with a concurrency of 1 (serially). This is because headful runs are first and foremost expected to be used during development and debugging.

To run the tests headless, run:

```
> npm run wdio:headless
```

The headless tests will always use the Selenium Grid env so make sure it is up and running.

You also have the option to execute the tests inside a docker container. To do this, run:

```
> npm run wdio:dockerized
```

This will build the docker image, run the container (executing the tests) and extract all test artifacts from the container before it is removed.

### Visual regression

The visual regression test suite takes a screenshot of the page in question and compare that screenshot to the baseline screenshot (located at `test/utils/visualRegressionBaseline`). These tests can only be executed towards the Selenium Grid env and thus will do the comparison for all the browser types available there.  
To execute the tests, run:

```
> npm run wdio:visual
```

Similar to the functional tests, these can also be executed inside a docker container:

```
> npm run wdio:visual:dockerized
```

To generate new baseline screenshots, first run:

```
> npm run clear:visualRegressionBaseline
```

This will remove all current baseline screenshots. Then run the visual regression test suite which will generate new baseline screenshots if they are missing.

> 💡 Tip: For more extensive cli logs on test execution, just append desired loglevel i.e `npm run wdio:headful -- --logLevel=debug`

## Reports

All test execution variants above will generate a html report listing all tests run and embed screenshot incase of test failure. The master report from a run can be found here: `reports/html-reports/master-report.html`

To clear all reports generated, run:

```
npm run clear
```

> ℹ️ Note: On test execution start, the result folder is cleared. So if you want to save a report, make sure to store it elsewhere before running a new set of tests

## Github Actions

The framework comes with a simple workflow running the functional tests in github actions on push

## Author's notes

For the functional tests I’ve put more emphasis on the framework rather than the actual tests since I believe that the main benefit and purpose of E2E-frameworks of this sort is to be able to validate critical customer flows spanning over multiple pages, whereas page-isolated functionality can be validated at component-test level to a greater extent.  
That being said, the framework does come with a set of rudimentary tests for the page in question of the assignment.

### possible enhancements:

#### html report

The html report content could be improved. For instance, it's not very clear what test is connected to what browser in the grid env. A browser tag of sorts to each test/suite would be handy.  
The reporter does not include any logs at this point. This could also be added for improved usability.

Also, the html report does not work perfectly with the visual regression tests. Ideally you would like to see the diff screenshot (found in `/reports/.tmp/visualRegressionComparison/diff/[failing browser]`) in the report on failure but as it is now it does not.

#### cookie handling

Instead of manually closing the cookie popup for each test, it would be interesting to investigate if this could be handled conveniently under the hood instead (https://webdriver.io/docs/api/browser/getCookies/) (except for GUI tests that are set to validate the actual popup that is)

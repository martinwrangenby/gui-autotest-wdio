#!/bin/sh

# Clear the local report folder
npm run clear

# Build the docker image
docker build -t martinwrangenby/volvo .

# Start the container and run the tests
RUN_TYPE=$1
if [ "$RUN_TYPE" == "visualRegression" ]; then
  echo '\n\x1b[32m\x1b[1m\x1b[4mRunning visual-regression tests\x1b[0m'
  docker run --network="host" --name="wdio-test-run-container" -t martinwrangenby/volvo npm run wdio:visual
else
  echo '\n\x1b[32m\x1b[1m\x1b[4mRunning fuctional tests\x1b[0m'
  docker run --network="host" --name="wdio-test-run-container" -t martinwrangenby/volvo
fi

# Copy report from container to host
docker cp wdio-test-run-container:app/reports ./

# If we run visual regression suite, copy over baseline images as new baseline screenshots may have been generated during execution
if [ "$RUN_TYPE" == "visualRegression" ]; then
  docker cp wdio-test-run-container:app/test/utils/visualRegressionBaseline ./test/utils
fi

# Remove the container
docker rm wdio-test-run-container

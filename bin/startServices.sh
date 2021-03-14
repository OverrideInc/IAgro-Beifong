#!/bin/bash
if [ -f ~/offline.log ]; then
  rm -f ~/offline.log
fi

#source ./bin/stopOffline.sh
TMPFILE=$(mktemp ~/offline.log || mktemp 2>/dev/null)

if [ -f .offline.pid ]; then
  echo "Found file .offline.pid. Not starting."
  exit 1
fi

# start up serverless
# $! is the pid of the last program your shell ran in the background
NODE_ENV=test npx sls offline &> $TMPFILE &
PID=$!
echo $PID > .offline.pid
while ! grep "offline: Enter \"rp\" to replay the last request" $TMPFILE
do
  sleep 1;
done
rm -f $TMPFILE

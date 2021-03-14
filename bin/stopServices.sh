#!/usr/bin/env bash
# Things between backticks is evaluated by the shell
if [ -f ./.offline.pid ]; then
  kill `cat .offline.pid`
  rm -f .offline.pid
fi

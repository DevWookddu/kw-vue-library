#!/bin/sh
dirpath=`dirname $0`

cd $dirpath

node ./js/exec/run-builders.js

if [ $? == 1 ]; then
  exit 1;
fi

node ./js/exec/run-lib-build.js

if [ $? == 1 ]; then
  exit 1;
fi
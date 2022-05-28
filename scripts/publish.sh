# !/bin/sh
dirpath=`dirname $0`

cd $dirpath

cd ../

./scripts/build.sh

if [ $? == 1 ]; then
  exit 1;
fi

node ./scripts/js/exec/run-publish.js $1
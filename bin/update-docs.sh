#!/usr/bin/env bash

set -e
set -x

function update_doc_from() {
  if [ -d "./docs/$1" ]; then
    cd ./docs/$1
    git pull origin master
    cd ../../
  else
    git clone https://github.com/botble/$1-docs.git --single-branch --branch master ./docs/$1
  fi
}

source=("cms" "hasa" "flex-home" "lara-mag" "miranda" "shopwise" "martfury" "stories" "wowy" "nest" "farmart" "jobcy" "jobzilla")

for i in "${source[@]}"
do
   update_doc_from $i
done

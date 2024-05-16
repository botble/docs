#!/bin/bash

projects=("cms" "flex-home" "lara-mag" "miranda" "stories" "jobcy" "farmart" "jobzilla" "transp" "gerow" "hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy" "athena" "cloudify")

function update_doc_from() {
  if [ -d "./docs/$1" ]; then
    cd ./docs/"$1" || exit
    git add --all
    git reset --hard HEAD
    git pull origin HEAD
    cd ../../
  else
    git clone git@github.com:botble/"$i"-docs.git --single-branch --branch master ./docs/"$1"
  fi
}

function update_all_docs() {
  for i in "${projects[@]}"; do
    update_doc_from "$i"
  done
}

function sync_doc_files() {
  files_to_sync=(
    "license.md"
    "installation.md"
    "ssl.md"
    "theme-rename.md"
    "cronjob.md"
    "upgrade.md"
    "usage-analytics.md"
    "usage-email.md"
    "usage-media-bunnycdn.md"
    "usage-media-s3.md"
    "usage-media-wasabi.md"
    "usage-multi-language.md"
    "usage-translation.md"
    "usage-newsletter.md"
    "api.md"
    "plugin-backup.md"
    "usage-multi-language.md"
    "usage-social-login.md"
    "usage-custom-css-js.md"
  )

  for i in "${projects[@]}"; do
    for j in "${files_to_sync[@]}"; do
      if [ "$i" = "cms" ]; then
        continue
      else
        mkdir -p ./docs/"$i"/images
        rm -rf ./docs/"$i"/"$j" && cp ./docs/cms/"$j" ./docs/"$i"/"$j"
      fi
    done
  done

  files_to_sync=(
      "invoice-template.md"
      "usage-currencies.md"
      "usage-location.md"
    )

    ecommerce_projects=("hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy")

    for i in "${ecommerce_projects[@]}"; do
      for j in "${files_to_sync[@]}"; do
          rm -rf ./docs/"$i"/"$j" && cp ./docs/farmart/"$j" ./docs/"$i"/"$j"
      done
    done

    files_to_sync_for_cloudify=(
      "installation.md"
      "license.md"
      "upgrade.md"
    )

    for j in "${files_to_sync_for_cloudify[@]}"; do
        rm -rf ./docs/cloudify/"$j" && cp ./docs/cms/"$j" ./docs/cloudify/"$j"
    done
}

function git_operations() {
  echo "Executing: git $*"
  git "$@"
}

function sync_git_changes() {
  repo_path=$(git rev-parse --show-toplevel)
  cd "$repo_path" || exit 1


  for i in "${projects[@]}"; do
    cd "$repo_path"/docs/"$i" || exit 1
    current_branch=$(git rev-parse --abbrev-ref HEAD)

    git_operations add .

    git_operations commit -m "Update docs"

    if [ -z "$branch_name" ]; then
      branch_name="$current_branch"
    fi

    if git_operations rev-parse --verify "$branch_name" >/dev/null 2>&1; then
      git_operations checkout "$branch_name"
    else
      git_operations checkout -b "$branch_name"
    fi

    git_operations push origin "$branch_name"
  done

  cd ../..
}

#!/bin/bash

projects=("cms" "hasa" "flex-home" "lara-mag" "miranda" "shopwise" "martfury" "stories" "wowy" "nest" "farmart" "jobcy" "jobzilla")

function update_doc_from() {
  if [ -d "./docs/$1" ]; then
    cd ./docs/"$1" || exit
    git pull origin HEAD
    cd ../../
  else
    git clone https://github.com/botble/"$1"-docs.git --single-branch --branch master ./docs/"$1"
  fi
}

function update_all_docs() {
    for i in "${projects[@]}"
    do
       update_doc_from "$i"
    done
}

function sync_doc_files() {
   files_to_sync=("license" "ssl" "theme-rename" "upgrade" "usage-analytics" "usage-email" "usage-media-bunnycdn" "usage-media-s3" "usage-media-wasabi" "api" "plugin-backup" "plugin-language" "usage-social-login")

    for i in "${projects[@]}"
    do
        for j in "${files_to_sync[@]}"
        do
          if [ "$i" = "cms" ]; then
            continue
          else
            rm -rf ./docs/"$i"/"$j".md && cp ./docs/cms/"$j".md ./docs/"$i"/"$j".md
          fi
        done
    done
}

function git_operations() {
    echo "Executing: git $*"
    git "$@"
}

function sync_git_changes() {
    repo_path=$(git rev-parse --show-toplevel)
    cd "$repo_path" || exit 1

    read -rp "Enter commit message: " commit_message
    read -rp "Enter the branch name: " branch_name

    for i in "${projects[@]}"
    do
      cd "$repo_path"/docs/"$i" || exit 1
      current_branch=$(git rev-parse --abbrev-ref HEAD)

      git_operations add .

      git_operations commit -m "$commit_message"

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
}

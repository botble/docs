#!/bin/bash

projects=("cms" "hasa" "flex-home" "lara-mag" "miranda" "shopwise" "martfury" "stories" "wowy" "nest" "farmart" "jobcy" "jobzilla" "transp" "ninico")

function update_doc_from() {
  if [ -d "./docs/$1" ]; then
    cd ./docs/"$1" || exit
    git add --all
    git reset --hard HEAD
    git pull origin HEAD
    cd ../../
  else
    git clone https://github.com/botble/"$1"-docs.git --single-branch --branch master ./docs/"$1"
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
    "ssl.md"
    "theme-rename.md"
    "upgrade.md"
    "usage-analytics.md"
    "usage-email.md"
    "usage-media-bunnycdn.md"
    "usage-media-s3.md"
    "usage-media-wasabi.md"
    "usage-multi-language.md"
    "usage-translation.md"
    "api.md"
    "plugin-backup.md"
    "usage-multi-language.md"
    "usage-social-login.md"
    "usage-custom-css-js.md"
    "images/analytics-cache.png"
    "images/analytics-enable-api.png"
    "images/analytics-instruction.png"
    "images/analytics-select-api.png"
    "images/analytics-select-project.png"
    "images/analytics-service-not-enabled.png"
    "images/analytics-demo-settings.png"
    "images/analytics-timezone.png"
    "images/usage-custom-css.png"
    "images/usage-custom-js.png"
    "images/admin-page.png"
    "images/bunny-cdn-setting.jpg"
    "images/directory-and-database.png"
    "images/env-example.png"
    "images/homepage-setup.png"
    "images/license.png"
    "images/mail-1.jpg"
    "images/mail-2.jpg"
    "images/mail-3.jpg"
    "images/mail-4.jpg"
    "images/mail-5.jpg"
    "images/mail-6.jpg"
    "images/mail-7.png"
    "images/media-s3-setting.jpg"
    "images/media.png"
    "images/multi-language.png"
    "images/multi-language-1.png"
    "images/multi-language-2.jpg"
    "images/multi-language-3.png"
    "images/translation-other-translations.png"
    "images/translation-translate-theme.png"
    "images/wasabi-1.jpg"
    "images/wasabi-2.jpg"
    "images/wasabi-3.jpg"
    "images/wasabi-4.jpg"
    "images/wasabi-5.jpg"
    "images/wasabi-6.jpg"
    "images/installation-1.png"
    "images/installation-2.png"
    "images/installation-3.png"
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

  projects=("hasa" "shopwise" "martfury" "wowy" "nest" "ninico")

  files_to_sync=(
      "invoice-template.md"
      "usage-currencies.md"
      "usage-location.md"
      "images/currencies.png"
      "images/location-1.png"
      "images/location-2.png"
      "images/location-3.png"
      "images/location-4.png"
      "images/location-5.png"

    )

    for i in "${projects[@]}"; do
      for j in "${files_to_sync[@]}"; do
          rm -rf ./docs/"$i"/"$j" && cp ./docs/farmart/"$j" ./docs/"$i"/"$j"
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

  for i in "${projects[@]}"; do
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

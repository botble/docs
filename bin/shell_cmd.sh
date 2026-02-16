#!/bin/bash

projects=("cms" "flex-home" "lara-mag" "miranda" "stories" "jobcy" "farmart" "transp" "gerow" "hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy" "athena" "homzen" "zelio" "carento" "infinia" "isak")

function sync_doc_files() {
  files_to_sync=(
    "installation-command-line.md"
    "installation-requirements.md"
    "installation-using-docker.md"
    "installation-web-interface.md"
    "ssl.md"
    "cronjob.md"
    "upgrade.md"
    "usage-analytics.md"
    "usage-email.md"
    "usage-media-bunnycdn.md"
    "usage-media-s3.md"
    "usage-media-wasabi.md"
    "usage-multi-language.md"
    "plugin-translation.md"
    "usage-newsletter.md"
    "api.md"
    "plugin-backup.md"
    "usage-multi-language.md"
    "usage-social-login.md"
    "usage-custom-css-js.md"
    "license.md"
    "releases.md"
  )

  # Images referenced by synced docs that need to be copied along
  images_to_sync=(
    "backup-list.png"
    "social-login-settings.png"
  )

  for i in "${projects[@]}"; do
    if [ "$i" = "cms" ]; then
      continue
    fi

    mkdir -p ./docs/"$i"/images

    for j in "${files_to_sync[@]}"; do
      rm -rf ./docs/"$i"/"$j" && cp ./docs/cms/"$j" ./docs/"$i"/"$j"
    done

    for img in "${images_to_sync[@]}"; do
      if [ -f ./docs/cms/images/"$img" ]; then
        rm -f ./docs/"$i"/images/"$img" && cp ./docs/cms/images/"$img" ./docs/"$i"/images/"$img"
      fi
    done

    rm -rf ./docs/"$i"/theme-rename.md && cp ./docs/cms/theme-development/theme-rename.md ./docs/"$i"/theme-rename.md
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
}

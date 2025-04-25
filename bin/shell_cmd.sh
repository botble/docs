#!/bin/bash

projects=("cms" "flex-home" "lara-mag" "miranda" "stories" "jobcy" "farmart" "transp" "gerow" "hasa" "shopwise" "martfury" "wowy" "nest" "ninico" "shofy" "athena" "homzen" "zelio" "carento" "infinia")

function sync_doc_files() {
  files_to_sync=(
    "installation-command-line.md"
    "installation-requirements.md"
    "installation-using-docker.md"
    "installation-web-interface.md"
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
}

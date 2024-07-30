#!/usr/bin/env sh

set -e # Exit on error.

projman_file="./projman/bin/projman"
last_edit="$(date '+%F_%H_%M' -r $projman_file.dart)"
last_compile="$(date '+%F_%H_%M' -r $projman_file.exe)"

if [ "$last_edit" != "$last_compile" ]; then
    echo 'No compile since last edit. Compiling...'
    dart compile exe $projman_file.dart >/dev/null
    touch "$projman_file.dart" # Update modified date.
fi

./projman/bin/projman.exe "$@"

#!/usr/bin/env sh
#
# Runner for the project manager tool. Most changes should be made in the tool,
# not here.
. $HOME/bin/common.sh
_THIS_SCRIPT="$(mm_file_path "$0")"; readonly _THIS_SCRIPT
_THIS_FILE_DIR="$(mm_dir_path "$_THIS_SCRIPT")"; readonly _THIS_FILE_DIR
_ROOT_DIR="$(dirname "$_THIS_FILE_DIR")"; readonly _ROOT_DIR

if [ "$(basename $_ROOT_DIR)" != "mind-expander" ]; then
    echo "This script: $_THIS_SCRIPT"
    echo "This dir: $_THIS_FILE_DIR"
    echo "Root dir: $_ROOT_DIR"
    echo "This script must be run from the mind-expander root directory."
    return 1
fi

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

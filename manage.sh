#!/usr/bin/env sh

. $MCRA_BIN/.rc.common
this_file="$(mm_file_path "$0")"
this_file_directory="$(mm_dir_path "$this_file")"
current_directory="$(pwd)"

if [ "$current_directory" != "$this_file_directory" ]; then
    fatal "Run this script from the 'mind-expander' directory"
fi

usage() {
    echo 'Usage: ./manage.sh [command]'
    echo
    echo "All available commands are well documented in the './manage.sh' source."
    echo "Either open that file directly or use the 'edit' command to open it in your \$EDITOR."
}

if [ $# -eq 0 ]; then
    usage
    exit 1
fi

invalid_command() {
    usage
    echo
    fatal "Invalid command: $1"
}

while [ $# -gt 0 ]; do
    release_dir="./release"
    popup_dir="$release_dir/popup"
    ext_code_dir="./browser-extension"
    web_build_dir="./mindexpander/build/web"

    case "$1" in
        r|release)

            echo 'Cleaning up the existing build...'
            if [ -d $web_build_dir ]; then
                rm -rf $web_build_dir
            fi

            echo 'Cleaning up the existing release...'
            if [ -d $release_dir ]; then
                rm -rf $release_dir
            fi
            mkdir $release_dir

            echo 'Building the project...'
            (cd mindexpander && flutter build web --csp --pwa-strategy=none --wasm --base-href=/popup/) \
                || fatal "Failed to build web"

            echo 'Copying the web build to the extension directory...'
            cp -r $web_build_dir $popup_dir \
                || fatal "Failed to copy web build to $popup_dir"

            echo 'Copying other required files...'
            cp $ext_code_dir/manifest.json \
                $ext_code_dir/background.js \
                $release_dir \
                || fatal "Failed to copy extension files to $release_dir"

            echo 'Done!'

            ;;

        w|watch)

            shift

            case "$1" in
                ext)

                    inotifywait -m -e close_write -r $ext_code_dir | \
                        while read -r _dir _action file
                        do
                            cp "$ext_code_dir/$file" $release_dir \
                                || fatal "Failed to copy $file to $release_dir"
                        done

                    ;;

                *)

                    invalid_command "update $1"

                    ;;

            esac

            ;;

        edit)

            $EDITOR $this_file

            ;;

        web)

            flutter help build web | nvim -R -

            ;;

        h|help|--help|-h)

            usage

            ;;

        *)

            invalid_command "$1"

            ;;

    esac
    shift
done

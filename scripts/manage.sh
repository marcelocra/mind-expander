#!/usr/bin/env sh

. $HOME/bin/common.sh
this_file="$(mm_file_path "$0")"
this_file_directory="$(mm_dir_path "$this_file")"
current_directory="$(pwd)"

if [ "$current_directory" != "$this_file_directory" ]; then
    fatal "Run this script from the 'mind-expander' directory"
fi

usage() {
    mm_trim '
        Usage: ./manage.sh [command]

        All available commands are well documented in the './manage.sh' source.
        Either open that file directly or use the 'edit' command to open it in your \$EDITOR."
    '
}

if [ $# -eq 0 ]; then
    usage
    fatal "\nERROR: No command provided."
fi

invalid_command() {
    usage
    fatal "\nInvalid command: $1"
}

main() {
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

            sync-browser-extension)

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

            flutter)

                case "$2" in
                    help|-h|--help)
                        flutter help build web | nvim -R -
                        ;;
                    web)
                        flutter build web --csp --pwa-strategy=none --wasm --base-href=/popup/
                        ;;
                esac

                return $?

                ;;
            help|-h|--help)

                usage
                return 0

                ;;

            popup)
                cd popup || fatal 'Not able to cd into popup'

                local stop_dev='./stop-dev.sh'

                case "$2" in
                    start)
                        if [ -f "$stop_dev" ]; then
                            fatal "$stop_dev exists. Do something about it before continuing."
                        fi

                        echo_killpid() {
                            echo "(kill $1 >/dev/null 2>&1 && echo \"killed '$2'\") || echo \"failed to kill '$2', pid=$1\"" >> $stop_dev
                        }

                        echo '#!/usr/bin/env sh\n' >> $stop_dev
                        chmod +x $stop_dev

                        echo 'Run popup dev commands...'

                        echo 'Watch and recompile for TypeScript changes...'
                        npm run dev:chrome-ts &
                        echo_killpid $! dev:chrome-ts

                        echo 'Watch and rebuild for app changes...'
                        npm run dev:chrome-vite &
                        echo_killpid $! dev:chrome-vite

                        echo 'Reload the popup page after changes...'
                        npm run dev:chrome-reloader &
                        echo_killpid $! dev:chrome-reloader

                        echo "Done. To stop development, run 'popup stop'."
                    ;;
                    stop)
                        echo 'Stop popup dev commands...'

                        "./$stop_dev" || fatal "Something went wrong killing the processes. See $stop_dev"

                        rm $stop_dev
                    ;;
                    *)
                        fatal "Invalid command: popup ${2:-<empty>}"
                    ;;
                esac

                return $?

                ;;

            *)

                invalid_command "$1"

                ;;

        esac
        shift
    done
}

main "$@"

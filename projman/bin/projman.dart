import "dart:io";

import 'package:args/command_runner.dart';
import 'package:projman/projman.dart' as projman;

class DevCommand extends Command {
  final name = "dev";
  final description = "Run the project in development mode.";

  DevCommand() {
    argParser.addFlag('example', abbr: 'e', help: 'print example description');
  }

  void run() {
    print('running dev command');
  }
}

class ReleaseCommand extends Command {
  final name = "release";
  final description = "Build a release for the project.";

  ReleaseCommand() {
    // argParser.addFlag('flag', help: 'Show help');
  }

  void run() {
    print('running release command');
  }
}

void main(List<String> args) {
  exitCode = 0;

  CommandRunner('projman', 'A program to help manage this project.')
    ..addCommand(DevCommand())
    ..addCommand(ReleaseCommand())
    ..run(args).catchError((error) {
      if (error is! UsageException) throw error;
      print(error);
      exit(64);
    });
}

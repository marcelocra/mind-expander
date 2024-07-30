import "dart:io";

import 'package:args/command_runner.dart';
import 'package:projman/projman.dart' as projman;

class DevCommand extends Command {
  final name = "dev";
  final description = "Run the project in development mode.";

  DevCommand() {
    argParser.addFlag('example', abbr: 'e', help: 'print example description');
    throw Exception('Not implemented.');
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

  void run() async {
    /// TODO: Implement this.
    /// 1) Clear or create the release dir
    /// 2) Copy files there
    /// 3) Create a zip of the dir
    /// 4) Tag all versions appropriately
    var releaseDir = Directory('./release');

    try {
      if (!await releaseDir.exists()) {
        await releaseDir.create();
      }
    } catch (e) {
      print(e.toString());
    }
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

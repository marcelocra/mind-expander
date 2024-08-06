int calculate() {
  return 6 * 7;
}

void run(List<String> args) {
  switch (args) {
    case [_]:
    case [_, _]:
      print('No command provided');
      break;

    default:
      print('Invalid command');
      break;
  }
}

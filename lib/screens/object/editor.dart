import 'package:flutter/cupertino.dart';

class Editor extends StatelessWidget {
  const Editor({
    Key? key,
    required this.userId,
    required this.objectId,
    this.changed,
  }) : super(key: key);

  final String userId;
  final String objectId;
  final ValueNotifier<bool?>? changed;

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Unimplements'),
    );
  }
}

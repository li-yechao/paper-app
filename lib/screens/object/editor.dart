import 'package:flutter/cupertino.dart';

class Editor extends StatefulWidget {
  const Editor({
    Key? key,
    required this.userId,
    required this.objectId,
    this.changed,
    this.loaded,
  }) : super(key: key);

  final String userId;
  final String objectId;
  final ValueNotifier<bool?>? changed;
  final ValueNotifier<bool>? loaded;

  @override
  State<Editor> createState() => EditorState();
}

class EditorState extends State<Editor> {
  Future<void> save() async {}

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Unimplements'),
    );
  }
}

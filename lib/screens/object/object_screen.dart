import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/state/auth.dart';
import 'package:paper/widgets/correct_view_insets.dart';

import 'editor.dart' if (dart.library.html) 'editor_web.dart';

class ObjectScreen extends HookConsumerWidget {
  const ObjectScreen({
    Key? key,
    required this.objectId,
    this.title,
    this.previousPageTitle,
  }) : super(key: key);

  final String objectId;
  final String? title;
  final String? previousPageTitle;

  @override
  Widget build(context, ref) {
    final editor = useMemoized(() => GlobalKey<EditorState>(), []);

    final authState = ref.watch(authStateProvider);
    final user = authState.user;
    final changed = useState<bool?>(null);
    final loaded = useState(false);

    return WillPopScope(
      onWillPop: () async {
        if (changed.value == true) {
          await editor.currentState?.save();
        }
        return true;
      },
      child: CorrectViewInsets(
        child: CupertinoPageScaffold(
          navigationBar: CupertinoNavigationBar(
            previousPageTitle: previousPageTitle,
            middle: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text.rich(
                TextSpan(
                  children: [
                    if (changed.value == true) const TextSpan(text: '*'),
                    TextSpan(text: title),
                  ],
                ),
                maxLines: 1,
                overflow: TextOverflow.fade,
              ),
            ),
          ),
          child: SafeArea(
            bottom: false,
            child: Stack(
              children: [
                if (user != null)
                  Positioned.fill(
                    child: Editor(
                      key: editor,
                      userId: user.id,
                      objectId: objectId,
                      changed: changed,
                      loaded: loaded,
                    ),
                  ),
                Positioned(
                  top: 48.0,
                  left: 0,
                  right: 0,
                  child: Visibility(
                    visible: user == null || !loaded.value,
                    child: const Center(
                      child: CupertinoActivityIndicator(),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

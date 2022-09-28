// ignore: avoid_web_libraries_in_flutter
import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';

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
    final future = ExternalLexicalEditorLoader.load();

    return FutureBuilder(
      future: future,
      builder: (context, snapshot) {
        if (ExternalLexicalEditorLoader.isLoaded) {
          return LexicalEditorRenderer(
            userId: userId,
            objectId: objectId,
            changed: changed,
          );
        }
        return const Center(
          child: CupertinoActivityIndicator(),
        );
      },
    );
  }
}

class LexicalEditorRenderer extends HookWidget {
  const LexicalEditorRenderer({
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
    final height = useState<double?>(null);

    final viewType = useMemoized(() {
      final now = DateTime.now().millisecondsSinceEpoch;
      final viewType = 'lexical-editor-$now-$objectId';
      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        viewType,
        (int viewId) {
          final container = DivElement();

          container.style
            ..height = 'auto'
            ..width = '100%'
            ..overflow = 'hidden';

          ExternalLexicalEditor.create(
            container,
            ExternalLexicalEditorOptions(
              userId: userId,
              objectId: objectId,
              onStateChange: allowInterop((e) {
                changed?.value = getProperty(e, 'changed');
              }),
              onSizeChange: allowInterop((e) {
                height.value = getProperty(e, 'height') + 50;
              }),
            ),
          );
          return container;
        },
      );
      return viewType;
    }, [userId, objectId]);

    return SizedBox(
      height: height.value,
      child: HtmlElementView(viewType: viewType),
    );
  }
}

class ExternalLexicalEditorLoader {
  static Future? _loadLexicalEditor;
  static bool _loadLexicalEditorDone = false;

  static load() {
    if (_loadLexicalEditor == null) {
      _loadLexicalEditor = promiseToFuture(
        eval(
          'import("/assets/editor/lib/index.js").then(m => (window.ExternalLexicalEditor = m.default))',
        ),
      );
      _loadLexicalEditor?.then((value) {
        _loadLexicalEditorDone = true;
      });
    }
    return _loadLexicalEditor;
  }

  static get isLoaded => _loadLexicalEditorDone;
}

@JS('eval')
external dynamic eval(String arg);

@JS()
class ExternalLexicalEditor {
  external static create(
    HtmlElement container,
    ExternalLexicalEditorOptions options,
  );
}

@JS()
@anonymous
class ExternalLexicalEditorOptions {
  external String get userId;
  external String get objectId;
  external Function? get onStateChange;
  external Function? get onSizeChange;

  external factory ExternalLexicalEditorOptions({
    required String userId,
    required String objectId,
    Function? onStateChange,
    Function? onSizeChange,
  });
}

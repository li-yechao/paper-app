// ignore: avoid_web_libraries_in_flutter
import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';

class Editor extends HookWidget {
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
  Widget build(BuildContext context) {
    final loader = useLoadEditor();

    return loader.hasData
        ? LexicalEditorRenderer(
            userId: userId,
            objectId: objectId,
            changed: changed,
            loaded: loaded,
          )
        : Container();
  }
}

class LexicalEditorRenderer extends HookWidget {
  const LexicalEditorRenderer({
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
  Widget build(BuildContext context) {
    final height = useState<double?>(null);

    final viewType = useMemoized(() {
      final now = DateTime.now().millisecondsSinceEpoch;
      return 'lexical-editor-$now-$objectId';
    }, [userId, objectId]);

    final editor = useMemoized(() {
      final container = DivElement();

      container.style
        ..height = 'auto'
        ..width = '100%'
        ..overflow = 'hidden';

      final editor = ExternalLexicalEditor.create(
        container,
        ExternalLexicalEditorOptions(
          userId: userId,
          objectId: objectId,
          onStateChange: allowInterop((e) {
            switch (getProperty(e, 'type')) {
              case 'changed':
                changed?.value = getProperty(e, 'changed');
                break;
              case 'loaded':
                loaded?.value = true;
                break;
            }
          }),
          onSizeChange: allowInterop((e) {
            height.value = getProperty(e, 'height') + 50;
          }),
        ),
      );

      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        viewType,
        (int viewId) => container,
      );

      return editor;
    }, [viewType]);

    useEffect(() => () => editor.dispose(), []);

    return SizedBox(
      height: height.value,
      child: HtmlElementView(viewType: viewType),
    );
  }
}

AsyncSnapshot<bool> useLoadEditor() {
  return useFuture<bool>(useMemoized(
    () => promiseToFuture(
      eval(
        '''
import("/assets/editor/lib/index.js").then((m) => {
  window.ExternalLexicalEditor = m.default
})
        ''',
      ),
    ).then((value) => true),
    [],
  ));
}

@JS('eval')
external dynamic eval(String arg);

@JS()
class ExternalLexicalEditor {
  external static ExternalLexicalEditor create(
    HtmlElement container,
    ExternalLexicalEditorOptions options,
  );

  external void dispose();
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

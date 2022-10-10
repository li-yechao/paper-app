// ignore: avoid_web_libraries_in_flutter
import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

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
    final viewType = useMemoized(() {
      final now = DateTime.now().millisecondsSinceEpoch;
      return 'lexical-editor-$now-$objectId';
    }, [userId, objectId]);

    final dispose = useMemoized(() {
      final u = Uri.encodeQueryComponent(userId);
      final o = Uri.encodeQueryComponent(objectId);
      final uri = (Uri.base.pathSegments.toList()
            ..insert(0, '')
            ..add('assets/editor/dist/index.html?userId=$u&objectId=$o'))
          .join('/');

      final iframe = IFrameElement()
        ..src = uri
        ..style.border = 'none'
        ..style.height = '100%'
        ..style.width = '100%';

      // ignore: undefined_prefixed_name
      ui.platformViewRegistry.registerViewFactory(
        viewType,
        (int viewId) => iframe,
      );

      listener(dynamic event) {
        final e = EditorEvent.fromEvent(event);
        if (e == null) {
          return;
        }
        switch (e.type) {
          case 'stateChange':
            switch (e.data['type']) {
              case 'changed':
                changed?.value = e.data['changed'] == true;
                break;
              case 'loaded':
                loaded?.value = true;
                break;
            }
            break;
        }
      }

      window.addEventListener('message', listener);
      return () {
        window.removeEventListener('message', listener);
      };
    }, [viewType]);

    useEffect(() => () => dispose(), []);

    return HtmlElementView(viewType: viewType);
  }
}

class EditorEvent {
  EditorEvent({
    required this.type,
    required this.userId,
    required this.objectId,
    required this.data,
  });

  final String type;
  final String userId;
  final String objectId;
  final Map data;

  static EditorEvent? fromEvent(dynamic event) {
    if (event is! MessageEvent) {
      return null;
    }

    final e = event.data;
    if (e is! Map) {
      return null;
    }

    final type = e['type'];
    final userId = e['userId'];
    final objectId = e['objectId'];
    final data = e['data'];

    if (type is! String ||
        userId is! String ||
        objectId is! String ||
        data is! Map) {
      return null;
    }

    return EditorEvent(
      type: type,
      userId: userId,
      objectId: objectId,
      data: data,
    );
  }
}

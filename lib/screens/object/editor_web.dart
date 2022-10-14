import 'dart:async';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:nanoid/async.dart';

class Editor extends StatefulHookWidget {
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
  Future<void> save() async {
    await _invokeMethod('save', null);
  }

  final Map<String, Completer> _callbacks = {};

  Future<dynamic> _invokeMethod(String method, dynamic arg) async {
    final callId = await nanoid(10);
    final completer = Completer();
    _callbacks[callId] = completer;

    _iframe.contentWindow?.postMessage({
      'type': 'invokeMethod',
      'userId': widget.userId,
      'objectId': widget.objectId,
      'data': {
        'callId': callId,
        'method': method,
        'arg': arg,
      },
    }, '*');

    return completer.future;
  }

  late final String _viewType;

  String get _uri {
    final u = Uri.encodeQueryComponent(widget.userId);
    final o = Uri.encodeQueryComponent(widget.objectId);
    return (Uri.base.pathSegments.toList()
          ..insert(0, '')
          ..add('assets/editor/dist/index.html?userId=$u&objectId=$o'))
        .join('/');
  }

  final _iframe = IFrameElement();

  late Function(dynamic) _onMessage;

  @override
  void initState() {
    super.initState();

    final now = DateTime.now().millisecondsSinceEpoch;
    _viewType = 'lexical-editor-$now-${widget.objectId}';

    _iframe
      ..src = _uri
      ..style.border = 'none'
      ..style.height = '100%'
      ..style.width = '100%';

    // ignore: undefined_prefixed_name
    ui.platformViewRegistry.registerViewFactory(
      _viewType,
      (int viewId) => _iframe,
    );

    _onMessage = (dynamic event) {
      final e = EditorEvent.fromEvent(event);
      if (e == null) {
        return;
      }
      switch (e.type) {
        case 'stateChange':
          switch (e.data['type']) {
            case 'changed':
              widget.changed?.value = e.data['changed'] == true;
              break;
            case 'loaded':
              widget.loaded?.value = true;
              break;
          }
          break;
        case 'invokeMethodResult':
          final callId = e.data['callId'];
          final result = e.data['result'];
          final error = e.data['error'];
          if (error != null) {
            _callbacks[callId]?.completeError(error);
          } else {
            _callbacks[callId]?.complete(result);
          }
          break;
      }
    };

    window.addEventListener('message', _onMessage);
  }

  @override
  void dispose() {
    window.removeEventListener('message', _onMessage);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return HtmlElementView(viewType: _viewType);
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

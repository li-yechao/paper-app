// Copyright 2022 LiYechao
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'dart:async';
// ignore: avoid_web_libraries_in_flutter
import 'dart:html';

import 'package:flutter/widgets.dart';

class CorrectViewInsets extends StatefulWidget {
  const CorrectViewInsets({
    Key? key,
    required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  State<CorrectViewInsets> createState() => _CorrectViewInsetsState();
}

class _CorrectViewInsetsState extends State<CorrectViewInsets> {
  double _viewInsetsBottom = 0;

  late final Function(Event) _onResize;

  @override
  void initState() {
    super.initState();

    _onResize = (e) {
      _timer?.cancel();
      _timer = Timer.periodic(const Duration(milliseconds: 100), (Timer timer) {
        document.documentElement?.scrollTop = 0;
        final windowInnerHeight = window.innerHeight!.toDouble();
        final visualHeight = window.visualViewport!.height!.toDouble();

        setState(() {
          _viewInsetsBottom = windowInnerHeight - visualHeight;
        });

        if (timer.tick >= 10) {
          _timer?.cancel();
          _timer = null;
        }
      });
    };

    window.visualViewport?.addEventListener('resize', _onResize, true);
  }

  @override
  void dispose() {
    window.visualViewport?.removeEventListener('resize', _onResize, true);
    _timer?.cancel();
    _timer = null;
    super.dispose();
  }

  Timer? _timer;

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);

    return MediaQuery(
      data: mediaQuery.copyWith(
        viewInsets: mediaQuery.viewInsets.copyWith(
          bottom: _viewInsetsBottom,
        ),
      ),
      child: widget.child,
    );
  }
}

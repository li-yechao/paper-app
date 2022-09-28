import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import 'user_button.dart';

class HomeScreen extends HookWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = useMemoized(() => ScrollController(), []);

    return CupertinoPageScaffold(
      child: CupertinoScrollbar(
        controller: controller,
        child: CustomScrollView(
          controller: controller,
          physics: const BouncingScrollPhysics(
            parent: AlwaysScrollableScrollPhysics(),
          ),
          slivers: [
            CupertinoSliverNavigationBar(
              transitionBetweenRoutes: true,
              largeTitle: const Text('Paper'),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  UserButton(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

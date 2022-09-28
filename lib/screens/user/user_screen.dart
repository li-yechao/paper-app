import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/state/auth.dart';

class UserScreen extends HookConsumerWidget {
  const UserScreen({
    Key? key,
    this.previousPageTitle,
  }) : super(key: key);

  final String? previousPageTitle;

  @override
  Widget build(context, ref) {
    final controller = useMemoized(() => ScrollController(), []);
    final client = useGraphQLClient();
    final authState = ref.watch(authStateProvider);
    final user = authState.user;

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
              previousPageTitle: previousPageTitle,
              largeTitle: const Text('Me'),
            ),
            SliverToBoxAdapter(
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 16),
                child: Column(
                  children: [
                    const CircleAvatar(
                      radius: 40,
                    ),
                    Container(
                      margin: const EdgeInsets.only(
                        left: 32,
                        right: 32,
                        top: 16,
                      ),
                      child: Text(
                        user?.name ?? user?.id ?? '',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 16),
                child: CupertinoButton(
                  onPressed: () {
                    showCupertinoModalPopup(
                      context: context,
                      builder: (context) {
                        return CupertinoActionSheet(
                          title: const Text('Sign out?'),
                          cancelButton: CupertinoActionSheetAction(
                            isDefaultAction: true,
                            onPressed: () => Navigator.of(context).pop(false),
                            child: const Text('Cancel'),
                          ),
                          actions: [
                            CupertinoActionSheetAction(
                              isDestructiveAction: true,
                              onPressed: () => Navigator.of(context).pop(true),
                              child: const Text('Sign out'),
                            ),
                          ],
                        );
                      },
                    ).then((logout) {
                      if (logout == true) {
                        return ref
                            .read(authStateProvider.notifier)
                            .logout(client)
                            .then((value) {
                          MyRouterDelegate.of(context).reset();
                        });
                      }
                    });
                  },
                  child: const Text('Sign out'),
                ),
              ),
            ),
            SliverPadding(
              padding: EdgeInsets.only(
                bottom: max(16.0, MediaQuery.of(context).padding.bottom),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

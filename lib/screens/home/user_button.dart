import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/screens/auth/auth_screen.dart';
import 'package:paper/screens/user/user_screen.dart';
import 'package:paper/state/auth.dart';

class UserButton extends ConsumerWidget {
  const UserButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authStateProvider);
    final user = authState.user;

    if (user != null) {
      return CupertinoButton(
        padding: EdgeInsets.zero,
        borderRadius: BorderRadius.circular(100),
        onPressed: () {
          MyRouterDelegate.of(context).push(RouteConfigure(
            screen: () => const UserScreen(
              previousPageTitle: 'Home',
            ),
          ));
        },
        child: CircleAvatar(
          radius: 16,
          child: Text(
            (user.name ?? user.id).substring(0, 1),
          ),
        ),
      );
    }

    if (authState.loading) {
      return Container();
    }

    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        MyRouterDelegate.of(context).push(RouteConfigure(
          screen: () => const AuthScreen(),
        ));
      },
      child: const Text('Sign in'),
    );
  }
}

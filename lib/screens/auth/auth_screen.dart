import 'dart:async';

import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/state/auth.dart';

import 'auth_native.dart' if (dart.library.html) 'auth_html.dart';

class AuthScreen extends HookWidget {
  const AuthScreen({
    Key? key,
    this.code,
  }) : super(key: key);

  final String? code;

  @override
  Widget build(BuildContext context) {
    final code = useState(this.code);

    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Sign in'),
      ),
      child: SafeArea(
        bottom: false,
        child: code.value != null
            ? GithubCodeAuth(code: code.value!)
            : AuthView(
                onSuccess: (value) => code.value = value,
              ),
      ),
    );
  }
}

class GithubCodeAuth extends HookConsumerWidget {
  const GithubCodeAuth({
    Key? key,
    required this.code,
  }) : super(key: key);

  final String code;

  @override
  Widget build(BuildContext context, ref) {
    final client = useGraphQLClient();

    final login = useCallback(() async {
      try {
        await ref.read(authStateProvider.notifier).login(
          client,
          {
            'type': 'github',
            'input': {'code': code},
          },
        );
        Fluttertoast.showToast(msg: 'Welcome~');
      } catch (error) {
        Fluttertoast.showToast(msg: error.toString());
      } finally {
        MyRouterDelegate.of(context).popRoute();
      }
    }, [client, code]);

    useEffect(() {
      Timer.run(() => login());
      return null;
    }, []);

    return const Center(
      child: CupertinoActivityIndicator(),
    );
  }
}

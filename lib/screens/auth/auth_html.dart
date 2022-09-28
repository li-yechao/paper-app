import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:js/js.dart';
import 'package:paper/common/config.dart';

@JS('window.open')
external String open(String url, String? args);

final githubAuthUri = Uri.https(
  'github.com',
  '/login/oauth/authorize',
  {
    'client_id': Config.githubClientId,
    'redirect_uri': Config.githubRedirectUri.toString(),
    'scope': 'user',
    'state': '',
  },
);

class AuthView extends HookWidget {
  const AuthView({
    Key? key,
    this.onSuccess,
  }) : super(key: key);

  final Function(String code)? onSuccess;

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      // wait for page animation finished.
      Timer(
        const Duration(seconds: 1),
        () => open(githubAuthUri.toString(), '_self'),
      );
      return null;
    }, []);

    return const Center(
      child: CupertinoActivityIndicator(),
    );
  }
}

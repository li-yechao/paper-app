import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/common/config.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/screens/auth/auth_screen.dart';
import 'package:paper/screens/home/home_screen.dart';
import 'package:paper/state/auth.dart';

class IosApp extends HookConsumerWidget {
  const IosApp({Key? key}) : super(key: key);

  @override
  Widget build(context, ref) {
    final client = useGraphQLClient();

    useEffect(() {
      ref.read(authStateProvider.notifier).refresh(client);
      return null;
    }, []);

    return MediaQuery.fromWindow(
      child: CupertinoApp.router(
        routerDelegate: MyRouterDelegate(),
        routeInformationParser: MyRouteParser(),
      ),
    );
  }
}

class MyRouterDelegate extends RouterDelegate<String>
    with PopNavigatorRouterDelegateMixin<String>, ChangeNotifier {
  static MyRouterDelegate of(BuildContext context) {
    return Router.of(context).routerDelegate as MyRouterDelegate;
  }

  final List<RouteConfigure> _stack = [];

  @override
  String? get currentConfiguration => '/';

  @override
  GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  @override
  Future<void> setInitialRoutePath(String configuration) {
    final uri = Uri.parse(configuration);
    if (uri.path == Config.githubRedirectUri.path) {
      final code = uri.queryParameters['code'];
      if (code?.isNotEmpty == true) {
        _stack.add(
          RouteConfigure(
            screen: () => AuthScreen(
              code: code,
            ),
          ),
        );
        notifyListeners();
      }
    }

    return SynchronousFuture(null);
  }

  @override
  Future<void> setNewRoutePath(configuration) {
    _stack.clear();

    return SynchronousFuture(null);
  }

  Future<T> push<T>(RouteConfigure route) {
    _stack.add(route);
    notifyListeners();
    return route.result.future as Future<T>;
  }

  void reset() {
    navigatorKey.currentState?.popUntil(
      (route) => route.isFirst,
    );
  }

  bool _didPop(dynamic result) {
    if (_stack.isNotEmpty) {
      _stack.removeLast().result.complete(result);
      notifyListeners();
      return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: navigatorKey,
      onPopPage: (route, result) {
        if (!route.didPop(result)) {
          return false;
        }
        return _didPop(result);
      },
      pages: [
        const CupertinoPage(
          child: HomeScreen(),
        ),
        for (final route in _stack)
          CupertinoPage(
            child: route.screen(),
          )
      ],
    );
  }
}

class RouteConfigure {
  RouteConfigure({
    required this.screen,
  });

  final Widget Function() screen;

  Completer<dynamic> result = Completer();
}

class MyRouteParser extends RouteInformationParser<String> {
  @override
  Future<String> parseRouteInformation(RouteInformation routeInformation) {
    return SynchronousFuture(routeInformation.location ?? '/');
  }

  @override
  RouteInformation restoreRouteInformation(String configuration) {
    return RouteInformation(location: configuration);
  }
}

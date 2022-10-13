import 'package:flutter/widgets.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/common/shared_storage.dart';
import 'package:paper/graphql/auth.dart';

final authStateProvider = ChangeNotifierProvider<AuthStateNotifier>(
  (_) => AuthStateNotifier(),
);

class AuthStateNotifier extends ChangeNotifier {
  bool logining = false;

  bool loading = false;

  User? user;

  Exception? error;

  Future<void> refresh(GraphQLClient client) async {
    try {
      loading = true;
      notifyListeners();

      final res = await client.query<User>(viewerQueryOptions());
      if (res.hasException) {
        throw res.exception!;
      }

      user = res.parsedData;
      error = null;
    } catch (e) {
      error = e as Exception;
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> login(
    GraphQLClient client,
    Map<String, dynamic> variables,
  ) async {
    try {
      logining = true;
      notifyListeners();

      final res = await client.mutate<Token>(
        authMutationOptions(variables: variables),
      );
      if (res.hasException) {
        throw res.exception!;
      }

      final token = res.parsedData;
      if (token != null) {
        SharedStorage.setToken(token);
        await client.resetStore();
        await refresh(client);
      } else {
        throw Exception('login failed');
      }
    } finally {
      logining = false;
      notifyListeners();
    }
  }

  Future<void> logout(GraphQLClient client) async {
    user = null;
    notifyListeners();
    await SharedStorage.setToken(null);
    await client.resetStore();
  }
}

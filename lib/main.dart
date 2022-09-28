import 'package:flutter/cupertino.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:paper/graphql/client.dart';
import 'package:paper/ios_app.dart';

void main() {
  runApp(
    ProviderScope(
      child: GraphQLProvider(
        client: ValueNotifier(GraphQLInstance.client),
        child: const IosApp(),
      ),
    ),
  );
}

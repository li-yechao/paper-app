import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:paper/common/config.dart';
import 'package:paper/common/shared_storage.dart';
import 'package:paper/graphql/auth_link.dart' as auth_link;

import 'auth.dart';

extension GraphQLInstance on GraphQLClient {
  static GraphQLClient? _client;
  static GraphQLClient get client {
    if (_client == null) {
      final httpLink = HttpLink(Config.graphqlUri);
      final authHttpLink = HttpLink(Config.authGraphqlUri);

      final refreshTokenLink = auth_link.AuthLink(
        refreshTokenHandler: () async {
          final token = await SharedStorage.token;
          if (token != null) {
            final client = GraphQLClient(
              link: authHttpLink,
              cache: GraphQLCache(),
            );
            final result = await client.mutate(
              MutationOptions(
                document: gql(
                  """
                  mutation Auth(\$type: String!, \$input: JSONObject!) {
                    auth(type: \$type, input: \$input) {
                      accessToken
                      refreshToken
                      expiresIn
                      tokenType
                    }
                  }
                  """,
                ),
                variables: {
                  'type': 'refreshToken',
                  'input': {'refreshToken': token.refreshToken},
                },
              ),
            );
            if (result.hasException) {
              throw result.exception!;
            }

            final json = result.data?['auth'];
            final newToken = Token.fromJson(json);
            await SharedStorage.setToken(newToken);
          }
        },
        needRefreshToken: (response) async {
          final token = await SharedStorage.token;
          return token != null &&
              response.errors != null &&
              response.errors!
                  .any((e) => e.extensions?['code'] == 'UNAUTHENTICATED');
        },
        requestTransformer: (request) async {
          final token = (await SharedStorage.token)?.accessToken;
          return request.updateContextEntry<HttpLinkHeaders>(
            (headers) => HttpLinkHeaders(
              headers: {
                ...headers?.headers ?? {},
                'Authorization': token != null ? 'Bearer $token' : '',
              },
            ),
          );
        },
      );

      final link = Link.split(
        (request) => [
          'Auth',
          'Viewer',
        ].contains(request.operation.operationName),
        refreshTokenLink.concat(authHttpLink),
        refreshTokenLink.concat(httpLink),
      );

      _client = GraphQLClient(
        link: link,
        cache: GraphQLCache(),
        defaultPolicies: DefaultPolicies(
          query: Policies(
            fetch: FetchPolicy.cacheAndNetwork,
          ),
        ),
      );
    }
    return _client!;
  }
}

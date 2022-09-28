import 'package:graphql_flutter/graphql_flutter.dart';

MutationOptions<Token> authMutationOptions({
  Map<String, dynamic>? variables,
}) {
  return MutationOptions(
    operationName: 'Auth',
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
    variables: variables ?? const {},
    parserFn: (data) => Token.fromJson(data['auth']),
  );
}

class Token {
  final String accessToken;
  final String tokenType;
  final int expiresIn;
  final String refreshToken;

  Token({
    required this.accessToken,
    required this.tokenType,
    required this.expiresIn,
    required this.refreshToken,
  });

  factory Token.fromJson(Map<String, dynamic> json) {
    return Token(
      accessToken: json['accessToken'],
      tokenType: json['tokenType'],
      expiresIn: json['expiresIn'],
      refreshToken: json['refreshToken'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "accessToken": accessToken,
      "tokenType": tokenType,
      "expiresIn": expiresIn,
      "refreshToken": refreshToken,
    };
  }
}

QueryOptions<User> viewerQueryOptions() {
  return QueryOptions(
    operationName: 'Viewer',
    document: gql(
      """
      query Viewer {
        viewer {
          id
          name
        }
      }
      """,
    ),
    parserFn: (data) => User.fromJson(data['viewer']),
  );
}

class User {
  final String id;
  final String? name;

  User({
    required this.id,
    this.name,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
    );
  }
}

class Config {
  static String get graphqlUri {
    const uri = String.fromEnvironment('GRAPHQL_URI');
    assert(uri.isNotEmpty, 'Required env GRAPHQL_URI is not present');
    return uri;
  }

  static String get authGraphqlUri {
    const uri = String.fromEnvironment('AUTH_GRAPHQL_URI');
    assert(uri.isNotEmpty, 'Required env AUTH_GRAPHQL_URI is not present');
    return uri;
  }

  static String get githubClientId {
    const value = String.fromEnvironment('GITHUB_CLIENT_ID');
    assert(value.isNotEmpty, 'Required env GITHUB_CLIENT_ID is not present');
    return value;
  }

  static Uri get githubRedirectUri {
    const value = String.fromEnvironment('GITHUB_REDIRECT_URI');
    assert(value.isNotEmpty, 'Required env GITHUB_REDIRECT_URI is not present');
    return Uri.parse(value);
  }
}

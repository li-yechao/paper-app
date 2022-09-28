import 'package:graphql_flutter/graphql_flutter.dart';

extension GraphqlErrorMessage on Exception {
  get graphqlErrorMessage {
    final e = this;

    if (e is OperationException) {
      if (e.graphqlErrors.isNotEmpty) {
        return e.graphqlErrors.first.message;
      }

      final linkException = e.linkException;
      if (linkException is HttpLinkServerException) {
        final errors = (linkException).parsedResponse?.errors;
        if (errors != null && errors.isNotEmpty) {
          return errors.first.message;
        }
      }
    }
    return toString();
  }
}

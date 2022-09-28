import 'dart:async';

// ignore: depend_on_referenced_packages
import 'package:async/async.dart' show Result;
import 'package:graphql_flutter/graphql_flutter.dart';

typedef RefreshTokenHandler = FutureOr<void> Function();
typedef NeedRefreshToken = FutureOr<bool> Function(Response);
typedef RequestTransformer = FutureOr<Request> Function(Request);

class AuthLink extends Link {
  List<Completer>? _pendings;

  final RefreshTokenHandler refreshTokenHandler;
  final NeedRefreshToken needRefreshToken;
  final RequestTransformer requestTransformer;

  AuthLink({
    required this.refreshTokenHandler,
    required this.needRefreshToken,
    required this.requestTransformer,
  });

  Future<Stream<Response>?> _onGraphQLError(
    Request request,
    NextLink forward,
    Response response,
  ) async {
    try {
      if (await needRefreshToken(response)) {
        if (_pendings == null) {
          _pendings = [];
          await refreshTokenHandler();
        } else {
          final completer = Completer();
          _pendings!.add(completer);
          await completer.future;
        }

        final req = await requestTransformer(request);
        return forward(req);
      }
      return null;
    } finally {
      _pendings?.forEach((element) {
        element.complete();
      });
      _pendings = null;
    }
  }

  @override
  Stream<Response> request(
    Request request, [
    forward,
  ]) async* {
    request = await requestTransformer(request);

    await for (final result in Result.captureStream(forward!(request))) {
      if (result.isError) {
        final error = result.asError!.error;

        yield* Stream.error(error);
      }

      if (result.isValue) {
        final response = result.asValue!.value;
        final errors = response.errors;

        if (errors != null && errors.isNotEmpty) {
          final stream = await _onGraphQLError(request, forward, response);

          if (stream != null) {
            yield* stream;

            return;
          }
        }

        yield response;
      }
    }
  }
}

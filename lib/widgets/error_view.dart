import 'package:flutter/cupertino.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class ErrorView extends StatelessWidget {
  const ErrorView({
    Key? key,
    required this.exception,
    this.padding = const EdgeInsets.symmetric(horizontal: 16.0, vertical: 32.0),
  }) : super(key: key);

  final Exception? exception;
  final EdgeInsets? padding;

  get message {
    if (exception is OperationException) {
      final linkException = (exception as OperationException).linkException;
      if (linkException is HttpLinkServerException) {
        final errors = (linkException).parsedResponse?.errors;
        if (errors != null && errors.isNotEmpty) {
          return errors.first.message;
        }
      }
    }
    return exception.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      child: Center(
        child: Text(
          message,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 14.0,
            color: CupertinoColors.placeholderText.resolveFrom(context),
          ),
        ),
      ),
    );
  }
}

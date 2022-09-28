import 'package:flutter/cupertino.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'error_view.dart';

class QueryResultRenderer<T> extends StatelessWidget {
  const QueryResultRenderer({
    Key? key,
    required this.result,
    required this.builder,
    this.isSliver = false,
    this.isNoData,
  }) : super(key: key);

  final QueryResult<T> result;
  final Widget Function(T data) builder;
  final bool isSliver;
  final bool? isNoData;

  Widget _wrapContainer(Widget child) {
    child = Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 16.0,
        vertical: 32.0,
      ),
      child: child,
    );

    if (isSliver) {
      return SliverToBoxAdapter(child: child);
    }
    return child;
  }

  @override
  Widget build(BuildContext context) {
    if (result.hasException) {
      return _wrapContainer(ErrorView(
        padding: null,
        exception: result.exception,
      ));
    }
    final data = result.parsedData;
    if (data != null && isNoData != true) {
      return builder(data);
    }
    if (result.isLoading) {
      return _wrapContainer(const Center(
        child: CupertinoActivityIndicator(),
      ));
    }
    return _wrapContainer(Center(
      child: Text(
        'No Data...',
        style: TextStyle(
          fontSize: 14.0,
          color: CupertinoColors.placeholderText.resolveFrom(context),
        ),
      ),
    ));
  }
}

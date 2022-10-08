import 'dart:async';
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:paper/graphql/object.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/screens/object/object_screen.dart';
import 'package:paper/state/auth.dart';
import 'package:paper/widgets/query_result_renderer.dart';
import 'package:rxdart/rxdart.dart';

import 'user_button.dart';

class HomeScreen extends HookConsumerWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(context, ref) {
    final objectList = useMemoized(() => GlobalKey<_ObjectListState>(), []);

    final controller = useMemoized(() => ScrollController(), []);
    final authState = ref.watch(authStateProvider);
    final userId = authState.user?.id;

    return CupertinoPageScaffold(
      child: CupertinoScrollbar(
        controller: controller,
        child: CustomScrollView(
          controller: controller,
          physics: const BouncingScrollPhysics(
            parent: AlwaysScrollableScrollPhysics(),
          ),
          slivers: [
            CupertinoSliverNavigationBar(
              transitionBetweenRoutes: true,
              largeTitle: const Text('Paper'),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  UserButton(),
                ],
              ),
            ),
            CupertinoSliverRefreshControl(
              onRefresh: () async {
                await objectList.currentState?.refetch();
              },
            ),
            if (userId != null)
              ObjectList(
                key: objectList,
                controller: controller,
                userId: userId,
              )
            else if (authState.loading)
              const SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 48.0),
                  child: CupertinoActivityIndicator(),
                ),
              )
            else
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16.0,
                    vertical: 48.0,
                  ),
                  child: Center(
                    child: Text(
                      'Please sign in first',
                      style: TextStyle(
                        color: CupertinoColors.secondaryLabel.resolveFrom(
                          context,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            SliverPadding(
              padding: EdgeInsets.only(
                bottom: max(16.0, MediaQuery.of(context).padding.bottom),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ObjectList extends StatefulHookWidget {
  const ObjectList({
    Key? key,
    required this.userId,
    required this.controller,
  }) : super(key: key);

  final String userId;
  final ScrollController controller;

  @override
  State<ObjectList> createState() => _ObjectListState();
}

class _ObjectListState extends State<ObjectList> {
  refetch() async {
    await result?.refetch();
  }

  QueryHookResult<ObjectConnection>? result;

  @override
  Widget build(BuildContext context) {
    final format = useMemoized(() => DateFormat.yMd().add_Hms(), []);
    final client = useGraphQLClient();

    final objectConnection = useObjectConnectionQuery(
      userId: widget.userId,
      first: 20,
    );
    result = objectConnection;

    final connRef =
        useRef<QueryResult<ObjectConnection>>(objectConnection.result);
    connRef.value = objectConnection.result;

    useEffect(() {
      final ctl = StreamController<void>();

      final stream = ctl.stream.throttleTime(
        const Duration(milliseconds: 500),
        leading: false,
        trailing: true,
      );
      stream.forEach((element) {
        if (widget.controller.position.extentAfter > 100 ||
            connRef.value.parsedData?.pageInfo.hasNextPage == false ||
            connRef.value.isLoading) {
          return;
        }
        objectConnection.fetchMore(
          FetchMoreOptions(
            updateQuery: (previousResultData, fetchMoreResultData) {
              final List oldList =
                  previousResultData!['user']['objects']['edges'];
              final List newList =
                  fetchMoreResultData!['user']['objects']['edges'];
              oldList.addAll(newList);

              previousResultData['user']['objects']['pageInfo'] =
                  fetchMoreResultData['user']['objects']['pageInfo'];

              return previousResultData;
            },
            variables: {'after': connRef.value.parsedData?.edges.last.cursor},
          ),
        );
      });

      listener() {
        ctl.add(null);
      }

      widget.controller.addListener(listener);
      return () => widget.controller.removeListener(listener);
    }, [widget.controller]);

    return QueryResultRenderer(
      isSliver: true,
      isNoData: objectConnection.result.parsedData?.edges.isEmpty,
      result: objectConnection.result,
      builder: (data) => SliverList(
        delegate: SliverChildBuilderDelegate(
          childCount: data.edges.isEmpty ? 0 : data.edges.length + 1,
          (context, index) {
            if (index >= data.edges.length) {
              return Container(
                height: 64.0,
                alignment: Alignment.center,
                child: DefaultTextStyle(
                  style: TextStyle(
                    fontSize: 12.0,
                    color: CupertinoColors.secondaryLabel.resolveFrom(context),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (objectConnection.result.isLoading) ...[
                        Container(
                          margin: const EdgeInsets.only(right: 16.0),
                          child: const CupertinoActivityIndicator(),
                        ),
                        const Text('Loading'),
                      ] else if (data.pageInfo.hasNextPage)
                        const Text('- More -')
                      else
                        const Text('- End -')
                    ],
                  ),
                ),
              );
            }

            final item = data.edges[index];

            return CupertinoContextMenu(
              actions: [
                CupertinoContextMenuAction(
                  onPressed: () {
                    client.mutate(
                      updateObjectOptions(
                        objectId: item.node.id,
                        input: {
                          'public': item.node.public != true ? true : false
                        },
                      ),
                    );
                    Navigator.of(context).pop();
                  },
                  trailingIcon: item.node.public == true
                      ? CupertinoIcons.lock
                      : CupertinoIcons.book,
                  child: Text(
                    item.node.public == true ? 'Set Private' : 'Set Public',
                  ),
                ),
              ],
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () {
                  MyRouterDelegate.of(context).push(
                    RouteConfigure(
                      screen: () => ObjectScreen(
                        objectId: item.node.id,
                        title: item.node.meta?.title,
                        previousPageTitle: 'Home',
                      ),
                    ),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      RichText(
                        text: TextSpan(
                          children: [
                            WidgetSpan(
                              child: Icon(
                                item.node.public == true
                                    ? CupertinoIcons.book
                                    : CupertinoIcons.lock,
                                color: CupertinoColors.secondaryLabel
                                    .resolveFrom(context),
                                size: 16.0,
                              ),
                              baseline: TextBaseline.alphabetic,
                              alignment: PlaceholderAlignment.baseline,
                            ),
                            TextSpan(
                              text: item.node.meta?.title ?? 'Untitled',
                              style: TextStyle(
                                color: CupertinoColors.label.resolveFrom(
                                  context,
                                ),
                                fontSize: 16.0,
                              ),
                            ),
                          ],
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: Text(
                          format.format(
                            DateTime.fromMillisecondsSinceEpoch(
                              item.node.updatedAt,
                            ),
                          ),
                          style: TextStyle(
                            color: CupertinoColors.secondaryLabel
                                .resolveFrom(context),
                            fontSize: 10.0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

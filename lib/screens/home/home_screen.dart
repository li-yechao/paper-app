import 'dart:async';
import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:paper/graphql/common_model.dart';
import 'package:paper/graphql/object.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/screens/object/object_screen.dart';
import 'package:paper/state/auth.dart';
import 'package:paper/widgets/context_menu.dart';
import 'package:paper/widgets/query_result_renderer.dart';
import 'package:rxdart/rxdart.dart';

import 'create_button.dart';
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
                children: [
                  if (userId != null)
                    CreateButton(
                      onCreated: () => objectList.currentState?.fetchRecent(),
                    ),
                  const UserButton(),
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

  fetchRecent() async {
    final before = firstEdge?.cursor;
    if (before != null) {
      await result?.fetchMore(
        objectConnectionFetchMoreOptions(before: before),
      );
    }
  }

  QueryHookResult<ObjectConnection>? result;

  List<Edge<Object>>? get edges {
    return result?.result.parsedData?.edges;
  }

  bool? get hasNextPage {
    return result?.result.parsedData?.pageInfo.hasNextPage;
  }

  bool? get isLoading {
    return result?.result.isLoading;
  }

  Edge<Object>? get firstEdge {
    return edges?.isNotEmpty == true ? edges!.first : null;
  }

  Edge<Object>? get lastEdge {
    return edges?.isNotEmpty == true ? edges!.last : null;
  }

  @override
  Widget build(BuildContext context) {
    final objectConnection = useObjectConnectionQuery(
      userId: widget.userId,
      first: 20,
    );
    result = objectConnection;

    useEffect(() {
      final ctl = StreamController<void>();

      final stream = ctl.stream.throttleTime(
        const Duration(milliseconds: 500),
        leading: false,
        trailing: true,
      );
      stream.forEach((element) {
        final after = lastEdge?.cursor;

        if (after == null ||
            hasNextPage == false ||
            isLoading == true ||
            widget.controller.position.extentAfter > 100) {
          return;
        }

        objectConnection.fetchMore(
          objectConnectionFetchMoreOptions(after: after),
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
              return ListFooter(
                loading: objectConnection.result.isLoading,
                hasNextPage: data.pageInfo.hasNextPage,
              );
            }

            final item = data.edges[index];

            return ObjectItem(
              objectId: item.node.id,
              title: item.node.meta?.title,
              public: item.node.public,
              updatedAt: item.node.updatedAt,
            );
          },
        ),
      ),
    );
  }
}

class ListFooter extends StatelessWidget {
  const ListFooter({
    Key? key,
    required this.loading,
    required this.hasNextPage,
  }) : super(key: key);

  final bool loading;
  final bool hasNextPage;

  @override
  Widget build(BuildContext context) {
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
            if (loading) ...[
              Container(
                margin: const EdgeInsets.only(right: 16.0),
                child: const CupertinoActivityIndicator(),
              ),
              const Text('Loading'),
            ] else if (hasNextPage)
              const Text('- More -')
            else
              const Text('- End -')
          ],
        ),
      ),
    );
  }
}

final _timeFormat = DateFormat.yMd().add_Hms();

class ObjectItem extends HookWidget {
  const ObjectItem({
    Key? key,
    required this.objectId,
    this.title,
    this.public,
    required this.updatedAt,
  }) : super(key: key);

  final String objectId;
  final String? title;
  final bool? public;
  final int updatedAt;

  String get _title {
    final t = title?.trim();
    return t?.isNotEmpty == true ? t! : 'Untitled';
  }

  @override
  Widget build(BuildContext context) {
    final client = useGraphQLClient();

    return MyCupertinoContextMenu(
      actions: [
        CupertinoContextMenuAction(
          onPressed: () {
            client.mutate(
              updateObjectOptions(
                objectId: objectId,
                input: {'public': public != true ? true : false},
              ),
            );
            Navigator.of(context).pop();
          },
          trailingIcon:
              public == true ? CupertinoIcons.lock : CupertinoIcons.book,
          child: Text(
            public == true ? 'Set Private' : 'Set Public',
          ),
        ),
      ],
      onTap: () {
        MyRouterDelegate.of(context).push(
          RouteConfigure(
            screen: () => ObjectScreen(
              objectId: objectId,
              title: _title,
              previousPageTitle: 'Home',
            ),
          ),
        );
      },
      child: Padding(
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
                      public == true
                          ? CupertinoIcons.book
                          : CupertinoIcons.lock,
                      color:
                          CupertinoColors.secondaryLabel.resolveFrom(context),
                      size: 16.0,
                    ),
                    baseline: TextBaseline.alphabetic,
                    alignment: PlaceholderAlignment.baseline,
                  ),
                  TextSpan(
                    text: _title,
                    style: TextStyle(
                      color: CupertinoColors.label.resolveFrom(context),
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
                _timeFormat.format(
                  DateTime.fromMillisecondsSinceEpoch(
                    updatedAt,
                  ),
                ),
                style: TextStyle(
                  color: CupertinoColors.secondaryLabel.resolveFrom(context),
                  fontSize: 10.0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

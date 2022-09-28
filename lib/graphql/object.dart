import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'common_model.dart';

QueryOptions<ObjectConnection> objectConnectionQueryOptions({
  required String userId,
  String? before,
  String? after,
  int? first,
  int? last,
}) {
  return QueryOptions(
    document: gql(
      """
      query Objects(\$userId: String!, \$before: String, \$after: String, \$first: Int, \$last: Int) {
        user(userId: \$userId) {
          id

          objects(before: \$before, after: \$after, first: \$first, last: \$last) {
            edges {
              cursor

              node {
                id
                createdAt
                updatedAt
                meta
              }
            }

            pageInfo {
              hasNextPage
            }
          }
        }
      }
      """,
    ),
    variables: {
      'userId': userId,
      'before': before,
      'after': after,
      'first': first,
      'last': last,
    },
    parserFn: (data) => ObjectConnection.fromJson(data['user']['objects']),
  );
}

QueryHookResult<ObjectConnection> useObjectConnectionQuery({
  required String userId,
  String? before,
  String? after,
  int? first,
  int? last,
}) {
  final options = useMemoized(
    () => objectConnectionQueryOptions(
      userId: userId,
      before: before,
      after: after,
      first: first,
      last: last,
    ),
    [userId, before, after, first, last],
  );

  return useQuery(options);
}

class ObjectConnection {
  final List<Edge<Object>> edges;
  final PageInfo pageInfo;

  ObjectConnection({
    required this.edges,
    required this.pageInfo,
  });

  factory ObjectConnection.fromJson(Map<String, dynamic> json) {
    return ObjectConnection(
      edges: (json['edges'] as List)
          .map(
            (e) => Edge(
              cursor: e['cursor'],
              node: Object.fromJson(e['node']),
            ),
          )
          .toList(),
      pageInfo: PageInfo.fromJson(json['pageInfo']),
    );
  }
}

class Object {
  final String id;
  final int createdAt;
  final int updatedAt;
  final Meta? meta;

  Object({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    this.meta,
  });

  factory Object.fromJson(Map<String, dynamic> json) {
    return Object(
      id: json['id'],
      createdAt: int.parse(json['createdAt']),
      updatedAt: int.parse(json['updatedAt']),
      meta: Meta.fromJson(json['meta']),
    );
  }
}

class Meta {
  final String? title;

  Meta({this.title});

  factory Meta.fromJson(Map<String, dynamic> json) {
    return Meta(title: json['title']);
  }
}

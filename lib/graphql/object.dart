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
                public
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

objectConnectionFetchMoreOptions({String? before, String? after}) {
  assert((before != null && after == null) || (before == null && after != null),
      'Only allow pass one of `before` or `after`');

  return FetchMoreOptions(
    updateQuery: (previousResultData, fetchMoreResultData) {
      final List oldList = previousResultData!['user']['objects']['edges'];
      final List newList = fetchMoreResultData!['user']['objects']['edges'];

      if (after != null) {
        oldList.addAll(newList);
        previousResultData['user']['objects']['pageInfo'] =
            fetchMoreResultData['user']['objects']['pageInfo'];
      } else {
        oldList.insertAll(0, newList);
      }

      return previousResultData;
    },
    variables: {'before': before, 'after': after},
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

MutationOptions<Object> createObjectOptions({
  required dynamic input,
  String? parentId,
}) {
  return MutationOptions(
    document: gql(
      """
      mutation CreateObject(\$input: CreateObjectInput!, \$parentId: String) {
        createObject(input: \$input, parentId: \$parentId) {
          id
          createdAt
          updatedAt
          meta
          public
        }
      }
      """,
    ),
    variables: {
      'input': input,
      'parentId': parentId,
    },
    parserFn: (data) => Object.fromJson(data['createObject']),
  );
}

MutationOptions<Object> updateObjectOptions({
  required String objectId,
  required dynamic input,
}) {
  return MutationOptions(
    document: gql(
      """
      mutation UpdateObject(\$objectId: String!, \$input: UpdateObjectInput!) {
        updateObject(objectId: \$objectId, input: \$input) {
          id
          createdAt
          updatedAt
          meta
          public
        }
      }
      """,
    ),
    variables: {
      'objectId': objectId,
      'input': input,
    },
    parserFn: (data) => Object.fromJson(data['updateObject']),
  );
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
  final bool? public;

  Object({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    this.meta,
    this.public,
  });

  factory Object.fromJson(Map<String, dynamic> json) {
    final meta = json['meta'];

    return Object(
      id: json['id'],
      createdAt: int.parse(json['createdAt']),
      updatedAt: int.parse(json['updatedAt']),
      meta: meta == null ? null : Meta.fromJson(meta),
      public: json['public'],
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

class Edge<T> {
  final String cursor;
  final T node;

  Edge({
    required this.cursor,
    required this.node,
  });
}

class PageInfo {
  final bool hasNextPage;

  PageInfo({required this.hasNextPage});

  factory PageInfo.fromJson(Map<String, dynamic> json) {
    return PageInfo(hasNextPage: json['hasNextPage']);
  }
}

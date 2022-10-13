import 'package:flutter/cupertino.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:paper/graphql/object.dart';
import 'package:paper/graphql/use_graphql_client.dart';
import 'package:paper/ios_app.dart';
import 'package:paper/screens/object/object_screen.dart';

class CreateButton extends HookWidget {
  const CreateButton({
    Key? key,
    this.onCreated,
  }) : super(key: key);

  final Function? onCreated;

  @override
  Widget build(BuildContext context) {
    final client = useGraphQLClient();

    return CupertinoButton(
      padding: EdgeInsets.zero,
      onPressed: () {
        client.mutate(createObjectOptions(input: {})).then((value) {
          if (value.hasException) {
            throw value.exception!;
          }

          final objectId = value.parsedData?.id;
          if (objectId != null) {
            onCreated?.call();
            MyRouterDelegate.of(context).push(
              RouteConfigure(
                screen: () => ObjectScreen(
                  objectId: objectId,
                  previousPageTitle: 'Home',
                ),
              ),
            );
          }
        });
      },
      child: const Icon(CupertinoIcons.plus),
    );
  }
}

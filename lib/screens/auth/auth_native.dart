import 'package:flutter/cupertino.dart';

class AuthView extends StatelessWidget {
  const AuthView({
    Key? key,
    this.onSuccess,
  }) : super(key: key);

  final Function(String code)? onSuccess;

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Unimplements'),
    );
  }
}

import 'dart:convert';

import 'package:paper/graphql/auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SharedStorage {
  static const tokenKey = "PAPER_ACCESS_TOKEN";
  static Token? _token;
  static Future<Token?> get token async {
    if (_token == null) {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString(tokenKey);
      if (token != null) {
        try {
          _token = Token.fromJson(jsonDecode(token));
        } finally {}
      }
    }
    return _token;
  }

  static Future<void> setToken(Token? token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    if (token != null) {
      await prefs.setString(tokenKey, jsonEncode(token.toJson()));
    } else {
      await prefs.remove(tokenKey);
    }
  }
}

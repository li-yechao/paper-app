var FS = Object.defineProperty;
var BS = (t, e, r) => e in t ? FS(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var At = (t, e, r) => (BS(t, typeof e != "symbol" ? e + "" : e, r), r);
function zS(t, e) {
  for (var r = 0; r < e.length; r++) {
    const n = e[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const i in n)
        if (i !== "default" && !(i in t)) {
          const o = Object.getOwnPropertyDescriptor(n, i);
          o && Object.defineProperty(t, i, o.get ? o : {
            enumerable: !0,
            get: () => n[i]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var P4 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function HS(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var I = { exports: {} }, De = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zu = Symbol.for("react.element"), US = Symbol.for("react.portal"), jS = Symbol.for("react.fragment"), VS = Symbol.for("react.strict_mode"), qS = Symbol.for("react.profiler"), GS = Symbol.for("react.provider"), WS = Symbol.for("react.context"), QS = Symbol.for("react.forward_ref"), KS = Symbol.for("react.suspense"), YS = Symbol.for("react.memo"), XS = Symbol.for("react.lazy"), $4 = Symbol.iterator;
function ZS(t) {
  return t === null || typeof t != "object" ? null : (t = $4 && t[$4] || t["@@iterator"], typeof t == "function" ? t : null);
}
var T7 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, N7 = Object.assign, D7 = {};
function Bs(t, e, r) {
  this.props = t, this.context = e, this.refs = D7, this.updater = r || T7;
}
Bs.prototype.isReactComponent = {};
Bs.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
Bs.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function k7() {
}
k7.prototype = Bs.prototype;
function Zm(t, e, r) {
  this.props = t, this.context = e, this.refs = D7, this.updater = r || T7;
}
var Jm = Zm.prototype = new k7();
Jm.constructor = Zm;
N7(Jm, Bs.prototype);
Jm.isPureReactComponent = !0;
var F4 = Array.isArray, O7 = Object.prototype.hasOwnProperty, eg = { current: null }, A7 = { key: !0, ref: !0, __self: !0, __source: !0 };
function M7(t, e, r) {
  var n, i = {}, o = null, a = null;
  if (e != null)
    for (n in e.ref !== void 0 && (a = e.ref), e.key !== void 0 && (o = "" + e.key), e)
      O7.call(e, n) && !A7.hasOwnProperty(n) && (i[n] = e[n]);
  var s = arguments.length - 2;
  if (s === 1)
    i.children = r;
  else if (1 < s) {
    for (var l = Array(s), u = 0; u < s; u++)
      l[u] = arguments[u + 2];
    i.children = l;
  }
  if (t && t.defaultProps)
    for (n in s = t.defaultProps, s)
      i[n] === void 0 && (i[n] = s[n]);
  return { $$typeof: Zu, type: t, key: o, ref: a, props: i, _owner: eg.current };
}
function JS(t, e) {
  return { $$typeof: Zu, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function tg(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Zu;
}
function e_(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(r) {
    return e[r];
  });
}
var B4 = /\/+/g;
function hh(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? e_("" + t.key) : e.toString(36);
}
function yc(t, e, r, n, i) {
  var o = typeof t;
  (o === "undefined" || o === "boolean") && (t = null);
  var a = !1;
  if (t === null)
    a = !0;
  else
    switch (o) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Zu:
          case US:
            a = !0;
        }
    }
  if (a)
    return a = t, i = i(a), t = n === "" ? "." + hh(a, 0) : n, F4(i) ? (r = "", t != null && (r = t.replace(B4, "$&/") + "/"), yc(i, e, r, "", function(u) {
      return u;
    })) : i != null && (tg(i) && (i = JS(i, r + (!i.key || a && a.key === i.key ? "" : ("" + i.key).replace(B4, "$&/") + "/") + t)), e.push(i)), 1;
  if (a = 0, n = n === "" ? "." : n + ":", F4(t))
    for (var s = 0; s < t.length; s++) {
      o = t[s];
      var l = n + hh(o, s);
      a += yc(o, e, r, l, i);
    }
  else if (l = ZS(t), typeof l == "function")
    for (t = l.call(t), s = 0; !(o = t.next()).done; )
      o = o.value, l = n + hh(o, s++), a += yc(o, e, r, l, i);
  else if (o === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function A0(t, e, r) {
  if (t == null)
    return t;
  var n = [], i = 0;
  return yc(t, n, "", "", function(o) {
    return e.call(r, o, i++);
  }), n;
}
function t_(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = r);
    }, function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = r);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1)
    return t._result.default;
  throw t._result;
}
var Er = { current: null }, xc = { transition: null }, r_ = { ReactCurrentDispatcher: Er, ReactCurrentBatchConfig: xc, ReactCurrentOwner: eg };
De.Children = { map: A0, forEach: function(t, e, r) {
  A0(t, function() {
    e.apply(this, arguments);
  }, r);
}, count: function(t) {
  var e = 0;
  return A0(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return A0(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!tg(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
De.Component = Bs;
De.Fragment = jS;
De.Profiler = qS;
De.PureComponent = Zm;
De.StrictMode = VS;
De.Suspense = KS;
De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = r_;
De.cloneElement = function(t, e, r) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var n = N7({}, t.props), i = t.key, o = t.ref, a = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (o = e.ref, a = eg.current), e.key !== void 0 && (i = "" + e.key), t.type && t.type.defaultProps)
      var s = t.type.defaultProps;
    for (l in e)
      O7.call(e, l) && !A7.hasOwnProperty(l) && (n[l] = e[l] === void 0 && s !== void 0 ? s[l] : e[l]);
  }
  var l = arguments.length - 2;
  if (l === 1)
    n.children = r;
  else if (1 < l) {
    s = Array(l);
    for (var u = 0; u < l; u++)
      s[u] = arguments[u + 2];
    n.children = s;
  }
  return { $$typeof: Zu, type: t.type, key: i, ref: o, props: n, _owner: a };
};
De.createContext = function(t) {
  return t = { $$typeof: WS, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: GS, _context: t }, t.Consumer = t;
};
De.createElement = M7;
De.createFactory = function(t) {
  var e = M7.bind(null, t);
  return e.type = t, e;
};
De.createRef = function() {
  return { current: null };
};
De.forwardRef = function(t) {
  return { $$typeof: QS, render: t };
};
De.isValidElement = tg;
De.lazy = function(t) {
  return { $$typeof: XS, _payload: { _status: -1, _result: t }, _init: t_ };
};
De.memo = function(t, e) {
  return { $$typeof: YS, type: t, compare: e === void 0 ? null : e };
};
De.startTransition = function(t) {
  var e = xc.transition;
  xc.transition = {};
  try {
    t();
  } finally {
    xc.transition = e;
  }
};
De.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
De.useCallback = function(t, e) {
  return Er.current.useCallback(t, e);
};
De.useContext = function(t) {
  return Er.current.useContext(t);
};
De.useDebugValue = function() {
};
De.useDeferredValue = function(t) {
  return Er.current.useDeferredValue(t);
};
De.useEffect = function(t, e) {
  return Er.current.useEffect(t, e);
};
De.useId = function() {
  return Er.current.useId();
};
De.useImperativeHandle = function(t, e, r) {
  return Er.current.useImperativeHandle(t, e, r);
};
De.useInsertionEffect = function(t, e) {
  return Er.current.useInsertionEffect(t, e);
};
De.useLayoutEffect = function(t, e) {
  return Er.current.useLayoutEffect(t, e);
};
De.useMemo = function(t, e) {
  return Er.current.useMemo(t, e);
};
De.useReducer = function(t, e, r) {
  return Er.current.useReducer(t, e, r);
};
De.useRef = function(t) {
  return Er.current.useRef(t);
};
De.useState = function(t) {
  return Er.current.useState(t);
};
De.useSyncExternalStore = function(t, e, r) {
  return Er.current.useSyncExternalStore(t, e, r);
};
De.useTransition = function() {
  return Er.current.useTransition();
};
De.version = "18.2.0";
(function(t) {
  t.exports = De;
})(I);
const R7 = /* @__PURE__ */ HS(I.exports), L1 = /* @__PURE__ */ zS({
  __proto__: null,
  default: R7
}, [I.exports]);
var I1 = {}, Do = { exports: {} }, Jr = {}, L7 = { exports: {} }, I7 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(z, W) {
    var ne = z.length;
    z.push(W);
    e:
      for (; 0 < ne; ) {
        var ve = ne - 1 >>> 1, ue = z[ve];
        if (0 < i(ue, W))
          z[ve] = W, z[ne] = ue, ne = ve;
        else
          break e;
      }
  }
  function r(z) {
    return z.length === 0 ? null : z[0];
  }
  function n(z) {
    if (z.length === 0)
      return null;
    var W = z[0], ne = z.pop();
    if (ne !== W) {
      z[0] = ne;
      e:
        for (var ve = 0, ue = z.length, _t = ue >>> 1; ve < _t; ) {
          var qe = 2 * (ve + 1) - 1, Ze = z[qe], yt = qe + 1, xt = z[yt];
          if (0 > i(Ze, ne))
            yt < ue && 0 > i(xt, Ze) ? (z[ve] = xt, z[yt] = ne, ve = yt) : (z[ve] = Ze, z[qe] = ne, ve = qe);
          else if (yt < ue && 0 > i(xt, ne))
            z[ve] = xt, z[yt] = ne, ve = yt;
          else
            break e;
        }
    }
    return W;
  }
  function i(z, W) {
    var ne = z.sortIndex - W.sortIndex;
    return ne !== 0 ? ne : z.id - W.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    t.unstable_now = function() {
      return o.now();
    };
  } else {
    var a = Date, s = a.now();
    t.unstable_now = function() {
      return a.now() - s;
    };
  }
  var l = [], u = [], c = 1, f = null, d = 3, h = !1, m = !1, g = !1, S = typeof setTimeout == "function" ? setTimeout : null, b = typeof clearTimeout == "function" ? clearTimeout : null, x = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(z) {
    for (var W = r(u); W !== null; ) {
      if (W.callback === null)
        n(u);
      else if (W.startTime <= z)
        n(u), W.sortIndex = W.expirationTime, e(l, W);
      else
        break;
      W = r(u);
    }
  }
  function w(z) {
    if (g = !1, v(z), !m)
      if (r(l) !== null)
        m = !0, Ee(_);
      else {
        var W = r(u);
        W !== null && de(w, W.startTime - z);
      }
  }
  function _(z, W) {
    m = !1, g && (g = !1, b(A), A = -1), h = !0;
    var ne = d;
    try {
      for (v(W), f = r(l); f !== null && (!(f.expirationTime > W) || z && !X()); ) {
        var ve = f.callback;
        if (typeof ve == "function") {
          f.callback = null, d = f.priorityLevel;
          var ue = ve(f.expirationTime <= W);
          W = t.unstable_now(), typeof ue == "function" ? f.callback = ue : f === r(l) && n(l), v(W);
        } else
          n(l);
        f = r(l);
      }
      if (f !== null)
        var _t = !0;
      else {
        var qe = r(u);
        qe !== null && de(w, qe.startTime - W), _t = !1;
      }
      return _t;
    } finally {
      f = null, d = ne, h = !1;
    }
  }
  var T = !1, N = null, A = -1, R = 5, F = -1;
  function X() {
    return !(t.unstable_now() - F < R);
  }
  function le() {
    if (N !== null) {
      var z = t.unstable_now();
      F = z;
      var W = !0;
      try {
        W = N(!0, z);
      } finally {
        W ? ye() : (T = !1, N = null);
      }
    } else
      T = !1;
  }
  var ye;
  if (typeof x == "function")
    ye = function() {
      x(le);
    };
  else if (typeof MessageChannel < "u") {
    var Ce = new MessageChannel(), _e = Ce.port2;
    Ce.port1.onmessage = le, ye = function() {
      _e.postMessage(null);
    };
  } else
    ye = function() {
      S(le, 0);
    };
  function Ee(z) {
    N = z, T || (T = !0, ye());
  }
  function de(z, W) {
    A = S(function() {
      z(t.unstable_now());
    }, W);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, t.unstable_continueExecution = function() {
    m || h || (m = !0, Ee(_));
  }, t.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : R = 0 < z ? Math.floor(1e3 / z) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, t.unstable_getFirstCallbackNode = function() {
    return r(l);
  }, t.unstable_next = function(z) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var W = 3;
        break;
      default:
        W = d;
    }
    var ne = d;
    d = W;
    try {
      return z();
    } finally {
      d = ne;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(z, W) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var ne = d;
    d = z;
    try {
      return W();
    } finally {
      d = ne;
    }
  }, t.unstable_scheduleCallback = function(z, W, ne) {
    var ve = t.unstable_now();
    switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? ve + ne : ve) : ne = ve, z) {
      case 1:
        var ue = -1;
        break;
      case 2:
        ue = 250;
        break;
      case 5:
        ue = 1073741823;
        break;
      case 4:
        ue = 1e4;
        break;
      default:
        ue = 5e3;
    }
    return ue = ne + ue, z = { id: c++, callback: W, priorityLevel: z, startTime: ne, expirationTime: ue, sortIndex: -1 }, ne > ve ? (z.sortIndex = ne, e(u, z), r(l) === null && z === r(u) && (g ? (b(A), A = -1) : g = !0, de(w, ne - ve))) : (z.sortIndex = ue, e(l, z), m || h || (m = !0, Ee(_))), z;
  }, t.unstable_shouldYield = X, t.unstable_wrapCallback = function(z) {
    var W = d;
    return function() {
      var ne = d;
      d = W;
      try {
        return z.apply(this, arguments);
      } finally {
        d = ne;
      }
    };
  };
})(I7);
(function(t) {
  t.exports = I7;
})(L7);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var P7 = I.exports, Yr = L7.exports;
function V(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, r = 1; r < arguments.length; r++)
    e += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var $7 = /* @__PURE__ */ new Set(), uu = {};
function _a(t, e) {
  ys(t, e), ys(t + "Capture", e);
}
function ys(t, e) {
  for (uu[t] = e, t = 0; t < e.length; t++)
    $7.add(e[t]);
}
var Di = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), P1 = Object.prototype.hasOwnProperty, n_ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, z4 = {}, H4 = {};
function i_(t) {
  return P1.call(H4, t) ? !0 : P1.call(z4, t) ? !1 : n_.test(t) ? H4[t] = !0 : (z4[t] = !0, !1);
}
function o_(t, e, r, n) {
  if (r !== null && r.type === 0)
    return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return n ? !1 : r !== null ? !r.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function a_(t, e, r, n) {
  if (e === null || typeof e > "u" || o_(t, e, r, n))
    return !0;
  if (n)
    return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !e;
      case 4:
        return e === !1;
      case 5:
        return isNaN(e);
      case 6:
        return isNaN(e) || 1 > e;
    }
  return !1;
}
function Sr(t, e, r, n, i, o, a) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = n, this.attributeNamespace = i, this.mustUseProperty = r, this.propertyName = t, this.type = e, this.sanitizeURL = o, this.removeEmptyString = a;
}
var rr = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  rr[t] = new Sr(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  rr[e] = new Sr(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  rr[t] = new Sr(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  rr[t] = new Sr(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  rr[t] = new Sr(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  rr[t] = new Sr(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  rr[t] = new Sr(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  rr[t] = new Sr(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  rr[t] = new Sr(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var rg = /[\-:]([a-z])/g;
function ng(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    rg,
    ng
  );
  rr[e] = new Sr(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(rg, ng);
  rr[e] = new Sr(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(rg, ng);
  rr[e] = new Sr(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  rr[t] = new Sr(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
rr.xlinkHref = new Sr("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  rr[t] = new Sr(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function ig(t, e, r, n) {
  var i = rr.hasOwnProperty(e) ? rr[e] : null;
  (i !== null ? i.type !== 0 : n || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (a_(e, r, i, n) && (r = null), n || i === null ? i_(e) && (r === null ? t.removeAttribute(e) : t.setAttribute(e, "" + r)) : i.mustUseProperty ? t[i.propertyName] = r === null ? i.type === 3 ? !1 : "" : r : (e = i.attributeName, n = i.attributeNamespace, r === null ? t.removeAttribute(e) : (i = i.type, r = i === 3 || i === 4 && r === !0 ? "" : "" + r, n ? t.setAttributeNS(n, e, r) : t.setAttribute(e, r))));
}
var $i = P7.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, M0 = Symbol.for("react.element"), Fa = Symbol.for("react.portal"), Ba = Symbol.for("react.fragment"), og = Symbol.for("react.strict_mode"), $1 = Symbol.for("react.profiler"), F7 = Symbol.for("react.provider"), B7 = Symbol.for("react.context"), ag = Symbol.for("react.forward_ref"), F1 = Symbol.for("react.suspense"), B1 = Symbol.for("react.suspense_list"), sg = Symbol.for("react.memo"), Gi = Symbol.for("react.lazy"), z7 = Symbol.for("react.offscreen"), U4 = Symbol.iterator;
function al(t) {
  return t === null || typeof t != "object" ? null : (t = U4 && t[U4] || t["@@iterator"], typeof t == "function" ? t : null);
}
var pt = Object.assign, ph;
function Cl(t) {
  if (ph === void 0)
    try {
      throw Error();
    } catch (r) {
      var e = r.stack.trim().match(/\n( *(at )?)/);
      ph = e && e[1] || "";
    }
  return `
` + ph + t;
}
var mh = !1;
function gh(t, e) {
  if (!t || mh)
    return "";
  mh = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e)
      if (e = function() {
        throw Error();
      }, Object.defineProperty(e.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(e, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(t, [], e);
      } else {
        try {
          e.call();
        } catch (u) {
          n = u;
        }
        t.call(e.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      t();
    }
  } catch (u) {
    if (u && n && typeof u.stack == "string") {
      for (var i = u.stack.split(`
`), o = n.stack.split(`
`), a = i.length - 1, s = o.length - 1; 1 <= a && 0 <= s && i[a] !== o[s]; )
        s--;
      for (; 1 <= a && 0 <= s; a--, s--)
        if (i[a] !== o[s]) {
          if (a !== 1 || s !== 1)
            do
              if (a--, s--, 0 > s || i[a] !== o[s]) {
                var l = `
` + i[a].replace(" at new ", " at ");
                return t.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", t.displayName)), l;
              }
            while (1 <= a && 0 <= s);
          break;
        }
    }
  } finally {
    mh = !1, Error.prepareStackTrace = r;
  }
  return (t = t ? t.displayName || t.name : "") ? Cl(t) : "";
}
function s_(t) {
  switch (t.tag) {
    case 5:
      return Cl(t.type);
    case 16:
      return Cl("Lazy");
    case 13:
      return Cl("Suspense");
    case 19:
      return Cl("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = gh(t.type, !1), t;
    case 11:
      return t = gh(t.type.render, !1), t;
    case 1:
      return t = gh(t.type, !0), t;
    default:
      return "";
  }
}
function z1(t) {
  if (t == null)
    return null;
  if (typeof t == "function")
    return t.displayName || t.name || null;
  if (typeof t == "string")
    return t;
  switch (t) {
    case Ba:
      return "Fragment";
    case Fa:
      return "Portal";
    case $1:
      return "Profiler";
    case og:
      return "StrictMode";
    case F1:
      return "Suspense";
    case B1:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case B7:
        return (t.displayName || "Context") + ".Consumer";
      case F7:
        return (t._context.displayName || "Context") + ".Provider";
      case ag:
        var e = t.render;
        return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
      case sg:
        return e = t.displayName || null, e !== null ? e : z1(t.type) || "Memo";
      case Gi:
        e = t._payload, t = t._init;
        try {
          return z1(t(e));
        } catch {
        }
    }
  return null;
}
function l_(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return z1(e);
    case 8:
      return e === og ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
  }
  return null;
}
function bo(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function H7(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function u_(t) {
  var e = H7(t) ? "checked" : "value", r = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), n = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
    var i = r.get, o = r.set;
    return Object.defineProperty(t, e, { configurable: !0, get: function() {
      return i.call(this);
    }, set: function(a) {
      n = "" + a, o.call(this, a);
    } }), Object.defineProperty(t, e, { enumerable: r.enumerable }), { getValue: function() {
      return n;
    }, setValue: function(a) {
      n = "" + a;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function R0(t) {
  t._valueTracker || (t._valueTracker = u_(t));
}
function U7(t) {
  if (!t)
    return !1;
  var e = t._valueTracker;
  if (!e)
    return !0;
  var r = e.getValue(), n = "";
  return t && (n = H7(t) ? t.checked ? "true" : "false" : t.value), t = n, t !== r ? (e.setValue(t), !0) : !1;
}
function tf(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u")
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function H1(t, e) {
  var r = e.checked;
  return pt({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: r != null ? r : t._wrapperState.initialChecked });
}
function j4(t, e) {
  var r = e.defaultValue == null ? "" : e.defaultValue, n = e.checked != null ? e.checked : e.defaultChecked;
  r = bo(e.value != null ? e.value : r), t._wrapperState = { initialChecked: n, initialValue: r, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function j7(t, e) {
  e = e.checked, e != null && ig(t, "checked", e, !1);
}
function U1(t, e) {
  j7(t, e);
  var r = bo(e.value), n = e.type;
  if (r != null)
    n === "number" ? (r === 0 && t.value === "" || t.value != r) && (t.value = "" + r) : t.value !== "" + r && (t.value = "" + r);
  else if (n === "submit" || n === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? j1(t, e.type, r) : e.hasOwnProperty("defaultValue") && j1(t, e.type, bo(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function V4(t, e, r) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var n = e.type;
    if (!(n !== "submit" && n !== "reset" || e.value !== void 0 && e.value !== null))
      return;
    e = "" + t._wrapperState.initialValue, r || e === t.value || (t.value = e), t.defaultValue = e;
  }
  r = t.name, r !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, r !== "" && (t.name = r);
}
function j1(t, e, r) {
  (e !== "number" || tf(t.ownerDocument) !== t) && (r == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + r && (t.defaultValue = "" + r));
}
var Tl = Array.isArray;
function ts(t, e, r, n) {
  if (t = t.options, e) {
    e = {};
    for (var i = 0; i < r.length; i++)
      e["$" + r[i]] = !0;
    for (r = 0; r < t.length; r++)
      i = e.hasOwnProperty("$" + t[r].value), t[r].selected !== i && (t[r].selected = i), i && n && (t[r].defaultSelected = !0);
  } else {
    for (r = "" + bo(r), e = null, i = 0; i < t.length; i++) {
      if (t[i].value === r) {
        t[i].selected = !0, n && (t[i].defaultSelected = !0);
        return;
      }
      e !== null || t[i].disabled || (e = t[i]);
    }
    e !== null && (e.selected = !0);
  }
}
function V1(t, e) {
  if (e.dangerouslySetInnerHTML != null)
    throw Error(V(91));
  return pt({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function q4(t, e) {
  var r = e.value;
  if (r == null) {
    if (r = e.children, e = e.defaultValue, r != null) {
      if (e != null)
        throw Error(V(92));
      if (Tl(r)) {
        if (1 < r.length)
          throw Error(V(93));
        r = r[0];
      }
      e = r;
    }
    e == null && (e = ""), r = e;
  }
  t._wrapperState = { initialValue: bo(r) };
}
function V7(t, e) {
  var r = bo(e.value), n = bo(e.defaultValue);
  r != null && (r = "" + r, r !== t.value && (t.value = r), e.defaultValue == null && t.defaultValue !== r && (t.defaultValue = r)), n != null && (t.defaultValue = "" + n);
}
function G4(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function q7(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function q1(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? q7(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var L0, G7 = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, r, n, i) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, r, n, i);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
    t.innerHTML = e;
  else {
    for (L0 = L0 || document.createElement("div"), L0.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = L0.firstChild; t.firstChild; )
      t.removeChild(t.firstChild);
    for (; e.firstChild; )
      t.appendChild(e.firstChild);
  }
});
function cu(t, e) {
  if (e) {
    var r = t.firstChild;
    if (r && r === t.lastChild && r.nodeType === 3) {
      r.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var $l = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, c_ = ["Webkit", "ms", "Moz", "O"];
Object.keys($l).forEach(function(t) {
  c_.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), $l[e] = $l[t];
  });
});
function W7(t, e, r) {
  return e == null || typeof e == "boolean" || e === "" ? "" : r || typeof e != "number" || e === 0 || $l.hasOwnProperty(t) && $l[t] ? ("" + e).trim() : e + "px";
}
function Q7(t, e) {
  t = t.style;
  for (var r in e)
    if (e.hasOwnProperty(r)) {
      var n = r.indexOf("--") === 0, i = W7(r, e[r], n);
      r === "float" && (r = "cssFloat"), n ? t.setProperty(r, i) : t[r] = i;
    }
}
var f_ = pt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function G1(t, e) {
  if (e) {
    if (f_[t] && (e.children != null || e.dangerouslySetInnerHTML != null))
      throw Error(V(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null)
        throw Error(V(60));
      if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML))
        throw Error(V(61));
    }
    if (e.style != null && typeof e.style != "object")
      throw Error(V(62));
  }
}
function W1(t, e) {
  if (t.indexOf("-") === -1)
    return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Q1 = null;
function lg(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var K1 = null, rs = null, ns = null;
function W4(t) {
  if (t = t0(t)) {
    if (typeof K1 != "function")
      throw Error(V(280));
    var e = t.stateNode;
    e && (e = ad(e), K1(t.stateNode, t.type, e));
  }
}
function K7(t) {
  rs ? ns ? ns.push(t) : ns = [t] : rs = t;
}
function Y7() {
  if (rs) {
    var t = rs, e = ns;
    if (ns = rs = null, W4(t), e)
      for (t = 0; t < e.length; t++)
        W4(e[t]);
  }
}
function X7(t, e) {
  return t(e);
}
function Z7() {
}
var vh = !1;
function J7(t, e, r) {
  if (vh)
    return t(e, r);
  vh = !0;
  try {
    return X7(t, e, r);
  } finally {
    vh = !1, (rs !== null || ns !== null) && (Z7(), Y7());
  }
}
function fu(t, e) {
  var r = t.stateNode;
  if (r === null)
    return null;
  var n = ad(r);
  if (n === null)
    return null;
  r = n[e];
  e:
    switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) || (t = t.type, n = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !n;
        break e;
      default:
        t = !1;
    }
  if (t)
    return null;
  if (r && typeof r != "function")
    throw Error(V(231, e, typeof r));
  return r;
}
var Y1 = !1;
if (Di)
  try {
    var sl = {};
    Object.defineProperty(sl, "passive", { get: function() {
      Y1 = !0;
    } }), window.addEventListener("test", sl, sl), window.removeEventListener("test", sl, sl);
  } catch {
    Y1 = !1;
  }
function d_(t, e, r, n, i, o, a, s, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(r, u);
  } catch (c) {
    this.onError(c);
  }
}
var Fl = !1, rf = null, nf = !1, X1 = null, h_ = { onError: function(t) {
  Fl = !0, rf = t;
} };
function p_(t, e, r, n, i, o, a, s, l) {
  Fl = !1, rf = null, d_.apply(h_, arguments);
}
function m_(t, e, r, n, i, o, a, s, l) {
  if (p_.apply(this, arguments), Fl) {
    if (Fl) {
      var u = rf;
      Fl = !1, rf = null;
    } else
      throw Error(V(198));
    nf || (nf = !0, X1 = u);
  }
}
function Ca(t) {
  var e = t, r = t;
  if (t.alternate)
    for (; e.return; )
      e = e.return;
  else {
    t = e;
    do
      e = t, (e.flags & 4098) !== 0 && (r = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? r : null;
}
function e6(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null)
      return e.dehydrated;
  }
  return null;
}
function Q4(t) {
  if (Ca(t) !== t)
    throw Error(V(188));
}
function g_(t) {
  var e = t.alternate;
  if (!e) {
    if (e = Ca(t), e === null)
      throw Error(V(188));
    return e !== t ? null : t;
  }
  for (var r = t, n = e; ; ) {
    var i = r.return;
    if (i === null)
      break;
    var o = i.alternate;
    if (o === null) {
      if (n = i.return, n !== null) {
        r = n;
        continue;
      }
      break;
    }
    if (i.child === o.child) {
      for (o = i.child; o; ) {
        if (o === r)
          return Q4(i), t;
        if (o === n)
          return Q4(i), e;
        o = o.sibling;
      }
      throw Error(V(188));
    }
    if (r.return !== n.return)
      r = i, n = o;
    else {
      for (var a = !1, s = i.child; s; ) {
        if (s === r) {
          a = !0, r = i, n = o;
          break;
        }
        if (s === n) {
          a = !0, n = i, r = o;
          break;
        }
        s = s.sibling;
      }
      if (!a) {
        for (s = o.child; s; ) {
          if (s === r) {
            a = !0, r = o, n = i;
            break;
          }
          if (s === n) {
            a = !0, n = o, r = i;
            break;
          }
          s = s.sibling;
        }
        if (!a)
          throw Error(V(189));
      }
    }
    if (r.alternate !== n)
      throw Error(V(190));
  }
  if (r.tag !== 3)
    throw Error(V(188));
  return r.stateNode.current === r ? t : e;
}
function t6(t) {
  return t = g_(t), t !== null ? r6(t) : null;
}
function r6(t) {
  if (t.tag === 5 || t.tag === 6)
    return t;
  for (t = t.child; t !== null; ) {
    var e = r6(t);
    if (e !== null)
      return e;
    t = t.sibling;
  }
  return null;
}
var n6 = Yr.unstable_scheduleCallback, K4 = Yr.unstable_cancelCallback, v_ = Yr.unstable_shouldYield, y_ = Yr.unstable_requestPaint, wt = Yr.unstable_now, x_ = Yr.unstable_getCurrentPriorityLevel, ug = Yr.unstable_ImmediatePriority, i6 = Yr.unstable_UserBlockingPriority, of = Yr.unstable_NormalPriority, b_ = Yr.unstable_LowPriority, o6 = Yr.unstable_IdlePriority, rd = null, Kn = null;
function w_(t) {
  if (Kn && typeof Kn.onCommitFiberRoot == "function")
    try {
      Kn.onCommitFiberRoot(rd, t, void 0, (t.current.flags & 128) === 128);
    } catch {
    }
}
var Rn = Math.clz32 ? Math.clz32 : __, E_ = Math.log, S_ = Math.LN2;
function __(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (E_(t) / S_ | 0) | 0;
}
var I0 = 64, P0 = 4194304;
function Nl(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function af(t, e) {
  var r = t.pendingLanes;
  if (r === 0)
    return 0;
  var n = 0, i = t.suspendedLanes, o = t.pingedLanes, a = r & 268435455;
  if (a !== 0) {
    var s = a & ~i;
    s !== 0 ? n = Nl(s) : (o &= a, o !== 0 && (n = Nl(o)));
  } else
    a = r & ~i, a !== 0 ? n = Nl(a) : o !== 0 && (n = Nl(o));
  if (n === 0)
    return 0;
  if (e !== 0 && e !== n && (e & i) === 0 && (i = n & -n, o = e & -e, i >= o || i === 16 && (o & 4194240) !== 0))
    return e;
  if ((n & 4) !== 0 && (n |= r & 16), e = t.entangledLanes, e !== 0)
    for (t = t.entanglements, e &= n; 0 < e; )
      r = 31 - Rn(e), i = 1 << r, n |= t[r], e &= ~i;
  return n;
}
function C_(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function T_(t, e) {
  for (var r = t.suspendedLanes, n = t.pingedLanes, i = t.expirationTimes, o = t.pendingLanes; 0 < o; ) {
    var a = 31 - Rn(o), s = 1 << a, l = i[a];
    l === -1 ? ((s & r) === 0 || (s & n) !== 0) && (i[a] = C_(s, e)) : l <= e && (t.expiredLanes |= s), o &= ~s;
  }
}
function Z1(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function a6() {
  var t = I0;
  return I0 <<= 1, (I0 & 4194240) === 0 && (I0 = 64), t;
}
function yh(t) {
  for (var e = [], r = 0; 31 > r; r++)
    e.push(t);
  return e;
}
function Ju(t, e, r) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - Rn(e), t[e] = r;
}
function N_(t, e) {
  var r = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var n = t.eventTimes;
  for (t = t.expirationTimes; 0 < r; ) {
    var i = 31 - Rn(r), o = 1 << i;
    e[i] = 0, n[i] = -1, t[i] = -1, r &= ~o;
  }
}
function cg(t, e) {
  var r = t.entangledLanes |= e;
  for (t = t.entanglements; r; ) {
    var n = 31 - Rn(r), i = 1 << n;
    i & e | t[n] & e && (t[n] |= e), r &= ~i;
  }
}
var Ue = 0;
function s6(t) {
  return t &= -t, 1 < t ? 4 < t ? (t & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
}
var l6, fg, u6, c6, f6, J1 = !1, $0 = [], so = null, lo = null, uo = null, du = /* @__PURE__ */ new Map(), hu = /* @__PURE__ */ new Map(), Xi = [], D_ = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Y4(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      so = null;
      break;
    case "dragenter":
    case "dragleave":
      lo = null;
      break;
    case "mouseover":
    case "mouseout":
      uo = null;
      break;
    case "pointerover":
    case "pointerout":
      du.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      hu.delete(e.pointerId);
  }
}
function ll(t, e, r, n, i, o) {
  return t === null || t.nativeEvent !== o ? (t = { blockedOn: e, domEventName: r, eventSystemFlags: n, nativeEvent: o, targetContainers: [i] }, e !== null && (e = t0(e), e !== null && fg(e)), t) : (t.eventSystemFlags |= n, e = t.targetContainers, i !== null && e.indexOf(i) === -1 && e.push(i), t);
}
function k_(t, e, r, n, i) {
  switch (e) {
    case "focusin":
      return so = ll(so, t, e, r, n, i), !0;
    case "dragenter":
      return lo = ll(lo, t, e, r, n, i), !0;
    case "mouseover":
      return uo = ll(uo, t, e, r, n, i), !0;
    case "pointerover":
      var o = i.pointerId;
      return du.set(o, ll(du.get(o) || null, t, e, r, n, i)), !0;
    case "gotpointercapture":
      return o = i.pointerId, hu.set(o, ll(hu.get(o) || null, t, e, r, n, i)), !0;
  }
  return !1;
}
function d6(t) {
  var e = Jo(t.target);
  if (e !== null) {
    var r = Ca(e);
    if (r !== null) {
      if (e = r.tag, e === 13) {
        if (e = e6(r), e !== null) {
          t.blockedOn = e, f6(t.priority, function() {
            u6(r);
          });
          return;
        }
      } else if (e === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function bc(t) {
  if (t.blockedOn !== null)
    return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var r = ep(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (r === null) {
      r = t.nativeEvent;
      var n = new r.constructor(r.type, r);
      Q1 = n, r.target.dispatchEvent(n), Q1 = null;
    } else
      return e = t0(r), e !== null && fg(e), t.blockedOn = r, !1;
    e.shift();
  }
  return !0;
}
function X4(t, e, r) {
  bc(t) && r.delete(e);
}
function O_() {
  J1 = !1, so !== null && bc(so) && (so = null), lo !== null && bc(lo) && (lo = null), uo !== null && bc(uo) && (uo = null), du.forEach(X4), hu.forEach(X4);
}
function ul(t, e) {
  t.blockedOn === e && (t.blockedOn = null, J1 || (J1 = !0, Yr.unstable_scheduleCallback(Yr.unstable_NormalPriority, O_)));
}
function pu(t) {
  function e(i) {
    return ul(i, t);
  }
  if (0 < $0.length) {
    ul($0[0], t);
    for (var r = 1; r < $0.length; r++) {
      var n = $0[r];
      n.blockedOn === t && (n.blockedOn = null);
    }
  }
  for (so !== null && ul(so, t), lo !== null && ul(lo, t), uo !== null && ul(uo, t), du.forEach(e), hu.forEach(e), r = 0; r < Xi.length; r++)
    n = Xi[r], n.blockedOn === t && (n.blockedOn = null);
  for (; 0 < Xi.length && (r = Xi[0], r.blockedOn === null); )
    d6(r), r.blockedOn === null && Xi.shift();
}
var is = $i.ReactCurrentBatchConfig, sf = !0;
function A_(t, e, r, n) {
  var i = Ue, o = is.transition;
  is.transition = null;
  try {
    Ue = 1, dg(t, e, r, n);
  } finally {
    Ue = i, is.transition = o;
  }
}
function M_(t, e, r, n) {
  var i = Ue, o = is.transition;
  is.transition = null;
  try {
    Ue = 4, dg(t, e, r, n);
  } finally {
    Ue = i, is.transition = o;
  }
}
function dg(t, e, r, n) {
  if (sf) {
    var i = ep(t, e, r, n);
    if (i === null)
      Dh(t, e, n, lf, r), Y4(t, n);
    else if (k_(i, t, e, r, n))
      n.stopPropagation();
    else if (Y4(t, n), e & 4 && -1 < D_.indexOf(t)) {
      for (; i !== null; ) {
        var o = t0(i);
        if (o !== null && l6(o), o = ep(t, e, r, n), o === null && Dh(t, e, n, lf, r), o === i)
          break;
        i = o;
      }
      i !== null && n.stopPropagation();
    } else
      Dh(t, e, n, null, r);
  }
}
var lf = null;
function ep(t, e, r, n) {
  if (lf = null, t = lg(n), t = Jo(t), t !== null)
    if (e = Ca(t), e === null)
      t = null;
    else if (r = e.tag, r === 13) {
      if (t = e6(e), t !== null)
        return t;
      t = null;
    } else if (r === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated)
        return e.tag === 3 ? e.stateNode.containerInfo : null;
      t = null;
    } else
      e !== t && (t = null);
  return lf = t, null;
}
function h6(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (x_()) {
        case ug:
          return 1;
        case i6:
          return 4;
        case of:
        case b_:
          return 16;
        case o6:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var eo = null, hg = null, wc = null;
function p6() {
  if (wc)
    return wc;
  var t, e = hg, r = e.length, n, i = "value" in eo ? eo.value : eo.textContent, o = i.length;
  for (t = 0; t < r && e[t] === i[t]; t++)
    ;
  var a = r - t;
  for (n = 1; n <= a && e[r - n] === i[o - n]; n++)
    ;
  return wc = i.slice(t, 1 < n ? 1 - n : void 0);
}
function Ec(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function F0() {
  return !0;
}
function Z4() {
  return !1;
}
function en(t) {
  function e(r, n, i, o, a) {
    this._reactName = r, this._targetInst = i, this.type = n, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var s in t)
      t.hasOwnProperty(s) && (r = t[s], this[s] = r ? r(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? F0 : Z4, this.isPropagationStopped = Z4, this;
  }
  return pt(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var r = this.nativeEvent;
    r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = F0);
  }, stopPropagation: function() {
    var r = this.nativeEvent;
    r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = F0);
  }, persist: function() {
  }, isPersistent: F0 }), e;
}
var zs = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, pg = en(zs), e0 = pt({}, zs, { view: 0, detail: 0 }), R_ = en(e0), xh, bh, cl, nd = pt({}, e0, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: mg, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== cl && (cl && t.type === "mousemove" ? (xh = t.screenX - cl.screenX, bh = t.screenY - cl.screenY) : bh = xh = 0, cl = t), xh);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : bh;
} }), J4 = en(nd), L_ = pt({}, nd, { dataTransfer: 0 }), I_ = en(L_), P_ = pt({}, e0, { relatedTarget: 0 }), wh = en(P_), $_ = pt({}, zs, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), F_ = en($_), B_ = pt({}, zs, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), z_ = en(B_), H_ = pt({}, zs, { data: 0 }), e2 = en(H_), U_ = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, j_ = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, V_ = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function q_(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = V_[t]) ? !!e[t] : !1;
}
function mg() {
  return q_;
}
var G_ = pt({}, e0, { key: function(t) {
  if (t.key) {
    var e = U_[t.key] || t.key;
    if (e !== "Unidentified")
      return e;
  }
  return t.type === "keypress" ? (t = Ec(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? j_[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: mg, charCode: function(t) {
  return t.type === "keypress" ? Ec(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? Ec(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), W_ = en(G_), Q_ = pt({}, nd, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), t2 = en(Q_), K_ = pt({}, e0, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: mg }), Y_ = en(K_), X_ = pt({}, zs, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Z_ = en(X_), J_ = pt({}, nd, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), eC = en(J_), tC = [9, 13, 27, 32], gg = Di && "CompositionEvent" in window, Bl = null;
Di && "documentMode" in document && (Bl = document.documentMode);
var rC = Di && "TextEvent" in window && !Bl, m6 = Di && (!gg || Bl && 8 < Bl && 11 >= Bl), r2 = String.fromCharCode(32), n2 = !1;
function g6(t, e) {
  switch (t) {
    case "keyup":
      return tC.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function v6(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var za = !1;
function nC(t, e) {
  switch (t) {
    case "compositionend":
      return v6(e);
    case "keypress":
      return e.which !== 32 ? null : (n2 = !0, r2);
    case "textInput":
      return t = e.data, t === r2 && n2 ? null : t;
    default:
      return null;
  }
}
function iC(t, e) {
  if (za)
    return t === "compositionend" || !gg && g6(t, e) ? (t = p6(), wc = hg = eo = null, za = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length)
          return e.char;
        if (e.which)
          return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return m6 && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var oC = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function i2(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!oC[t.type] : e === "textarea";
}
function y6(t, e, r, n) {
  K7(n), e = uf(e, "onChange"), 0 < e.length && (r = new pg("onChange", "change", null, r, n), t.push({ event: r, listeners: e }));
}
var zl = null, mu = null;
function aC(t) {
  k6(t, 0);
}
function id(t) {
  var e = ja(t);
  if (U7(e))
    return t;
}
function sC(t, e) {
  if (t === "change")
    return e;
}
var x6 = !1;
if (Di) {
  var Eh;
  if (Di) {
    var Sh = "oninput" in document;
    if (!Sh) {
      var o2 = document.createElement("div");
      o2.setAttribute("oninput", "return;"), Sh = typeof o2.oninput == "function";
    }
    Eh = Sh;
  } else
    Eh = !1;
  x6 = Eh && (!document.documentMode || 9 < document.documentMode);
}
function a2() {
  zl && (zl.detachEvent("onpropertychange", b6), mu = zl = null);
}
function b6(t) {
  if (t.propertyName === "value" && id(mu)) {
    var e = [];
    y6(e, mu, t, lg(t)), J7(aC, e);
  }
}
function lC(t, e, r) {
  t === "focusin" ? (a2(), zl = e, mu = r, zl.attachEvent("onpropertychange", b6)) : t === "focusout" && a2();
}
function uC(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return id(mu);
}
function cC(t, e) {
  if (t === "click")
    return id(e);
}
function fC(t, e) {
  if (t === "input" || t === "change")
    return id(e);
}
function dC(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Pn = typeof Object.is == "function" ? Object.is : dC;
function gu(t, e) {
  if (Pn(t, e))
    return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var r = Object.keys(t), n = Object.keys(e);
  if (r.length !== n.length)
    return !1;
  for (n = 0; n < r.length; n++) {
    var i = r[n];
    if (!P1.call(e, i) || !Pn(t[i], e[i]))
      return !1;
  }
  return !0;
}
function s2(t) {
  for (; t && t.firstChild; )
    t = t.firstChild;
  return t;
}
function l2(t, e) {
  var r = s2(t);
  t = 0;
  for (var n; r; ) {
    if (r.nodeType === 3) {
      if (n = t + r.textContent.length, t <= e && n >= e)
        return { node: r, offset: e - t };
      t = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = s2(r);
  }
}
function w6(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? w6(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function E6() {
  for (var t = window, e = tf(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var r = typeof e.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r)
      t = e.contentWindow;
    else
      break;
    e = tf(t.document);
  }
  return e;
}
function vg(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function hC(t) {
  var e = E6(), r = t.focusedElem, n = t.selectionRange;
  if (e !== r && r && r.ownerDocument && w6(r.ownerDocument.documentElement, r)) {
    if (n !== null && vg(r)) {
      if (e = n.start, t = n.end, t === void 0 && (t = e), "selectionStart" in r)
        r.selectionStart = e, r.selectionEnd = Math.min(t, r.value.length);
      else if (t = (e = r.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var i = r.textContent.length, o = Math.min(n.start, i);
        n = n.end === void 0 ? o : Math.min(n.end, i), !t.extend && o > n && (i = n, n = o, o = i), i = l2(r, o);
        var a = l2(
          r,
          n
        );
        i && a && (t.rangeCount !== 1 || t.anchorNode !== i.node || t.anchorOffset !== i.offset || t.focusNode !== a.node || t.focusOffset !== a.offset) && (e = e.createRange(), e.setStart(i.node, i.offset), t.removeAllRanges(), o > n ? (t.addRange(e), t.extend(a.node, a.offset)) : (e.setEnd(a.node, a.offset), t.addRange(e)));
      }
    }
    for (e = [], t = r; t = t.parentNode; )
      t.nodeType === 1 && e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < e.length; r++)
      t = e[r], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
  }
}
var pC = Di && "documentMode" in document && 11 >= document.documentMode, Ha = null, tp = null, Hl = null, rp = !1;
function u2(t, e, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  rp || Ha == null || Ha !== tf(n) || (n = Ha, "selectionStart" in n && vg(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = { anchorNode: n.anchorNode, anchorOffset: n.anchorOffset, focusNode: n.focusNode, focusOffset: n.focusOffset }), Hl && gu(Hl, n) || (Hl = n, n = uf(tp, "onSelect"), 0 < n.length && (e = new pg("onSelect", "select", null, e, r), t.push({ event: e, listeners: n }), e.target = Ha)));
}
function B0(t, e) {
  var r = {};
  return r[t.toLowerCase()] = e.toLowerCase(), r["Webkit" + t] = "webkit" + e, r["Moz" + t] = "moz" + e, r;
}
var Ua = { animationend: B0("Animation", "AnimationEnd"), animationiteration: B0("Animation", "AnimationIteration"), animationstart: B0("Animation", "AnimationStart"), transitionend: B0("Transition", "TransitionEnd") }, _h = {}, S6 = {};
Di && (S6 = document.createElement("div").style, "AnimationEvent" in window || (delete Ua.animationend.animation, delete Ua.animationiteration.animation, delete Ua.animationstart.animation), "TransitionEvent" in window || delete Ua.transitionend.transition);
function od(t) {
  if (_h[t])
    return _h[t];
  if (!Ua[t])
    return t;
  var e = Ua[t], r;
  for (r in e)
    if (e.hasOwnProperty(r) && r in S6)
      return _h[t] = e[r];
  return t;
}
var _6 = od("animationend"), C6 = od("animationiteration"), T6 = od("animationstart"), N6 = od("transitionend"), D6 = /* @__PURE__ */ new Map(), c2 = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ko(t, e) {
  D6.set(t, e), _a(e, [t]);
}
for (var Ch = 0; Ch < c2.length; Ch++) {
  var Th = c2[Ch], mC = Th.toLowerCase(), gC = Th[0].toUpperCase() + Th.slice(1);
  ko(mC, "on" + gC);
}
ko(_6, "onAnimationEnd");
ko(C6, "onAnimationIteration");
ko(T6, "onAnimationStart");
ko("dblclick", "onDoubleClick");
ko("focusin", "onFocus");
ko("focusout", "onBlur");
ko(N6, "onTransitionEnd");
ys("onMouseEnter", ["mouseout", "mouseover"]);
ys("onMouseLeave", ["mouseout", "mouseover"]);
ys("onPointerEnter", ["pointerout", "pointerover"]);
ys("onPointerLeave", ["pointerout", "pointerover"]);
_a("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
_a("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
_a("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
_a("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
_a("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
_a("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Dl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vC = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dl));
function f2(t, e, r) {
  var n = t.type || "unknown-event";
  t.currentTarget = r, m_(n, e, void 0, t), t.currentTarget = null;
}
function k6(t, e) {
  e = (e & 4) !== 0;
  for (var r = 0; r < t.length; r++) {
    var n = t[r], i = n.event;
    n = n.listeners;
    e: {
      var o = void 0;
      if (e)
        for (var a = n.length - 1; 0 <= a; a--) {
          var s = n[a], l = s.instance, u = s.currentTarget;
          if (s = s.listener, l !== o && i.isPropagationStopped())
            break e;
          f2(i, s, u), o = l;
        }
      else
        for (a = 0; a < n.length; a++) {
          if (s = n[a], l = s.instance, u = s.currentTarget, s = s.listener, l !== o && i.isPropagationStopped())
            break e;
          f2(i, s, u), o = l;
        }
    }
  }
  if (nf)
    throw t = X1, nf = !1, X1 = null, t;
}
function Je(t, e) {
  var r = e[sp];
  r === void 0 && (r = e[sp] = /* @__PURE__ */ new Set());
  var n = t + "__bubble";
  r.has(n) || (O6(e, t, 2, !1), r.add(n));
}
function Nh(t, e, r) {
  var n = 0;
  e && (n |= 4), O6(r, t, n, e);
}
var z0 = "_reactListening" + Math.random().toString(36).slice(2);
function vu(t) {
  if (!t[z0]) {
    t[z0] = !0, $7.forEach(function(r) {
      r !== "selectionchange" && (vC.has(r) || Nh(r, !1, t), Nh(r, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[z0] || (e[z0] = !0, Nh("selectionchange", !1, e));
  }
}
function O6(t, e, r, n) {
  switch (h6(e)) {
    case 1:
      var i = A_;
      break;
    case 4:
      i = M_;
      break;
    default:
      i = dg;
  }
  r = i.bind(null, e, r, t), i = void 0, !Y1 || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (i = !0), n ? i !== void 0 ? t.addEventListener(e, r, { capture: !0, passive: i }) : t.addEventListener(e, r, !0) : i !== void 0 ? t.addEventListener(e, r, { passive: i }) : t.addEventListener(e, r, !1);
}
function Dh(t, e, r, n, i) {
  var o = n;
  if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
    e:
      for (; ; ) {
        if (n === null)
          return;
        var a = n.tag;
        if (a === 3 || a === 4) {
          var s = n.stateNode.containerInfo;
          if (s === i || s.nodeType === 8 && s.parentNode === i)
            break;
          if (a === 4)
            for (a = n.return; a !== null; ) {
              var l = a.tag;
              if ((l === 3 || l === 4) && (l = a.stateNode.containerInfo, l === i || l.nodeType === 8 && l.parentNode === i))
                return;
              a = a.return;
            }
          for (; s !== null; ) {
            if (a = Jo(s), a === null)
              return;
            if (l = a.tag, l === 5 || l === 6) {
              n = o = a;
              continue e;
            }
            s = s.parentNode;
          }
        }
        n = n.return;
      }
  J7(function() {
    var u = o, c = lg(r), f = [];
    e: {
      var d = D6.get(t);
      if (d !== void 0) {
        var h = pg, m = t;
        switch (t) {
          case "keypress":
            if (Ec(r) === 0)
              break e;
          case "keydown":
          case "keyup":
            h = W_;
            break;
          case "focusin":
            m = "focus", h = wh;
            break;
          case "focusout":
            m = "blur", h = wh;
            break;
          case "beforeblur":
          case "afterblur":
            h = wh;
            break;
          case "click":
            if (r.button === 2)
              break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = J4;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = I_;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Y_;
            break;
          case _6:
          case C6:
          case T6:
            h = F_;
            break;
          case N6:
            h = Z_;
            break;
          case "scroll":
            h = R_;
            break;
          case "wheel":
            h = eC;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = z_;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = t2;
        }
        var g = (e & 4) !== 0, S = !g && t === "scroll", b = g ? d !== null ? d + "Capture" : null : d;
        g = [];
        for (var x = u, v; x !== null; ) {
          v = x;
          var w = v.stateNode;
          if (v.tag === 5 && w !== null && (v = w, b !== null && (w = fu(x, b), w != null && g.push(yu(x, w, v)))), S)
            break;
          x = x.return;
        }
        0 < g.length && (d = new h(d, m, null, r, c), f.push({ event: d, listeners: g }));
      }
    }
    if ((e & 7) === 0) {
      e: {
        if (d = t === "mouseover" || t === "pointerover", h = t === "mouseout" || t === "pointerout", d && r !== Q1 && (m = r.relatedTarget || r.fromElement) && (Jo(m) || m[ki]))
          break e;
        if ((h || d) && (d = c.window === c ? c : (d = c.ownerDocument) ? d.defaultView || d.parentWindow : window, h ? (m = r.relatedTarget || r.toElement, h = u, m = m ? Jo(m) : null, m !== null && (S = Ca(m), m !== S || m.tag !== 5 && m.tag !== 6) && (m = null)) : (h = null, m = u), h !== m)) {
          if (g = J4, w = "onMouseLeave", b = "onMouseEnter", x = "mouse", (t === "pointerout" || t === "pointerover") && (g = t2, w = "onPointerLeave", b = "onPointerEnter", x = "pointer"), S = h == null ? d : ja(h), v = m == null ? d : ja(m), d = new g(w, x + "leave", h, r, c), d.target = S, d.relatedTarget = v, w = null, Jo(c) === u && (g = new g(b, x + "enter", m, r, c), g.target = v, g.relatedTarget = S, w = g), S = w, h && m)
            t: {
              for (g = h, b = m, x = 0, v = g; v; v = Ma(v))
                x++;
              for (v = 0, w = b; w; w = Ma(w))
                v++;
              for (; 0 < x - v; )
                g = Ma(g), x--;
              for (; 0 < v - x; )
                b = Ma(b), v--;
              for (; x--; ) {
                if (g === b || b !== null && g === b.alternate)
                  break t;
                g = Ma(g), b = Ma(b);
              }
              g = null;
            }
          else
            g = null;
          h !== null && d2(f, d, h, g, !1), m !== null && S !== null && d2(f, S, m, g, !0);
        }
      }
      e: {
        if (d = u ? ja(u) : window, h = d.nodeName && d.nodeName.toLowerCase(), h === "select" || h === "input" && d.type === "file")
          var _ = sC;
        else if (i2(d))
          if (x6)
            _ = fC;
          else {
            _ = uC;
            var T = lC;
          }
        else
          (h = d.nodeName) && h.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (_ = cC);
        if (_ && (_ = _(t, u))) {
          y6(f, _, r, c);
          break e;
        }
        T && T(t, d, u), t === "focusout" && (T = d._wrapperState) && T.controlled && d.type === "number" && j1(d, "number", d.value);
      }
      switch (T = u ? ja(u) : window, t) {
        case "focusin":
          (i2(T) || T.contentEditable === "true") && (Ha = T, tp = u, Hl = null);
          break;
        case "focusout":
          Hl = tp = Ha = null;
          break;
        case "mousedown":
          rp = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          rp = !1, u2(f, r, c);
          break;
        case "selectionchange":
          if (pC)
            break;
        case "keydown":
        case "keyup":
          u2(f, r, c);
      }
      var N;
      if (gg)
        e: {
          switch (t) {
            case "compositionstart":
              var A = "onCompositionStart";
              break e;
            case "compositionend":
              A = "onCompositionEnd";
              break e;
            case "compositionupdate":
              A = "onCompositionUpdate";
              break e;
          }
          A = void 0;
        }
      else
        za ? g6(t, r) && (A = "onCompositionEnd") : t === "keydown" && r.keyCode === 229 && (A = "onCompositionStart");
      A && (m6 && r.locale !== "ko" && (za || A !== "onCompositionStart" ? A === "onCompositionEnd" && za && (N = p6()) : (eo = c, hg = "value" in eo ? eo.value : eo.textContent, za = !0)), T = uf(u, A), 0 < T.length && (A = new e2(A, t, null, r, c), f.push({ event: A, listeners: T }), N ? A.data = N : (N = v6(r), N !== null && (A.data = N)))), (N = rC ? nC(t, r) : iC(t, r)) && (u = uf(u, "onBeforeInput"), 0 < u.length && (c = new e2("onBeforeInput", "beforeinput", null, r, c), f.push({ event: c, listeners: u }), c.data = N));
    }
    k6(f, e);
  });
}
function yu(t, e, r) {
  return { instance: t, listener: e, currentTarget: r };
}
function uf(t, e) {
  for (var r = e + "Capture", n = []; t !== null; ) {
    var i = t, o = i.stateNode;
    i.tag === 5 && o !== null && (i = o, o = fu(t, r), o != null && n.unshift(yu(t, o, i)), o = fu(t, e), o != null && n.push(yu(t, o, i))), t = t.return;
  }
  return n;
}
function Ma(t) {
  if (t === null)
    return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function d2(t, e, r, n, i) {
  for (var o = e._reactName, a = []; r !== null && r !== n; ) {
    var s = r, l = s.alternate, u = s.stateNode;
    if (l !== null && l === n)
      break;
    s.tag === 5 && u !== null && (s = u, i ? (l = fu(r, o), l != null && a.unshift(yu(r, l, s))) : i || (l = fu(r, o), l != null && a.push(yu(r, l, s)))), r = r.return;
  }
  a.length !== 0 && t.push({ event: e, listeners: a });
}
var yC = /\r\n?/g, xC = /\u0000|\uFFFD/g;
function h2(t) {
  return (typeof t == "string" ? t : "" + t).replace(yC, `
`).replace(xC, "");
}
function H0(t, e, r) {
  if (e = h2(e), h2(t) !== e && r)
    throw Error(V(425));
}
function cf() {
}
var np = null, ip = null;
function op(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var ap = typeof setTimeout == "function" ? setTimeout : void 0, bC = typeof clearTimeout == "function" ? clearTimeout : void 0, p2 = typeof Promise == "function" ? Promise : void 0, wC = typeof queueMicrotask == "function" ? queueMicrotask : typeof p2 < "u" ? function(t) {
  return p2.resolve(null).then(t).catch(EC);
} : ap;
function EC(t) {
  setTimeout(function() {
    throw t;
  });
}
function kh(t, e) {
  var r = e, n = 0;
  do {
    var i = r.nextSibling;
    if (t.removeChild(r), i && i.nodeType === 8)
      if (r = i.data, r === "/$") {
        if (n === 0) {
          t.removeChild(i), pu(e);
          return;
        }
        n--;
      } else
        r !== "$" && r !== "$?" && r !== "$!" || n++;
    r = i;
  } while (r);
  pu(e);
}
function co(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3)
      break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?")
        break;
      if (e === "/$")
        return null;
    }
  }
  return t;
}
function m2(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var r = t.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (e === 0)
          return t;
        e--;
      } else
        r === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Hs = Math.random().toString(36).slice(2), Wn = "__reactFiber$" + Hs, xu = "__reactProps$" + Hs, ki = "__reactContainer$" + Hs, sp = "__reactEvents$" + Hs, SC = "__reactListeners$" + Hs, _C = "__reactHandles$" + Hs;
function Jo(t) {
  var e = t[Wn];
  if (e)
    return e;
  for (var r = t.parentNode; r; ) {
    if (e = r[ki] || r[Wn]) {
      if (r = e.alternate, e.child !== null || r !== null && r.child !== null)
        for (t = m2(t); t !== null; ) {
          if (r = t[Wn])
            return r;
          t = m2(t);
        }
      return e;
    }
    t = r, r = t.parentNode;
  }
  return null;
}
function t0(t) {
  return t = t[Wn] || t[ki], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function ja(t) {
  if (t.tag === 5 || t.tag === 6)
    return t.stateNode;
  throw Error(V(33));
}
function ad(t) {
  return t[xu] || null;
}
var lp = [], Va = -1;
function Oo(t) {
  return { current: t };
}
function tt(t) {
  0 > Va || (t.current = lp[Va], lp[Va] = null, Va--);
}
function Ye(t, e) {
  Va++, lp[Va] = t.current, t.current = e;
}
var wo = {}, hr = Oo(wo), Mr = Oo(!1), ca = wo;
function xs(t, e) {
  var r = t.type.contextTypes;
  if (!r)
    return wo;
  var n = t.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === e)
    return n.__reactInternalMemoizedMaskedChildContext;
  var i = {}, o;
  for (o in r)
    i[o] = e[o];
  return n && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = i), i;
}
function Rr(t) {
  return t = t.childContextTypes, t != null;
}
function ff() {
  tt(Mr), tt(hr);
}
function g2(t, e, r) {
  if (hr.current !== wo)
    throw Error(V(168));
  Ye(hr, e), Ye(Mr, r);
}
function A6(t, e, r) {
  var n = t.stateNode;
  if (e = e.childContextTypes, typeof n.getChildContext != "function")
    return r;
  n = n.getChildContext();
  for (var i in n)
    if (!(i in e))
      throw Error(V(108, l_(t) || "Unknown", i));
  return pt({}, r, n);
}
function df(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || wo, ca = hr.current, Ye(hr, t), Ye(Mr, Mr.current), !0;
}
function v2(t, e, r) {
  var n = t.stateNode;
  if (!n)
    throw Error(V(169));
  r ? (t = A6(t, e, ca), n.__reactInternalMemoizedMergedChildContext = t, tt(Mr), tt(hr), Ye(hr, t)) : tt(Mr), Ye(Mr, r);
}
var gi = null, sd = !1, Oh = !1;
function M6(t) {
  gi === null ? gi = [t] : gi.push(t);
}
function CC(t) {
  sd = !0, M6(t);
}
function Ao() {
  if (!Oh && gi !== null) {
    Oh = !0;
    var t = 0, e = Ue;
    try {
      var r = gi;
      for (Ue = 1; t < r.length; t++) {
        var n = r[t];
        do
          n = n(!0);
        while (n !== null);
      }
      gi = null, sd = !1;
    } catch (i) {
      throw gi !== null && (gi = gi.slice(t + 1)), n6(ug, Ao), i;
    } finally {
      Ue = e, Oh = !1;
    }
  }
  return null;
}
var qa = [], Ga = 0, hf = null, pf = 0, sn = [], ln = 0, fa = null, bi = 1, wi = "";
function Wo(t, e) {
  qa[Ga++] = pf, qa[Ga++] = hf, hf = t, pf = e;
}
function R6(t, e, r) {
  sn[ln++] = bi, sn[ln++] = wi, sn[ln++] = fa, fa = t;
  var n = bi;
  t = wi;
  var i = 32 - Rn(n) - 1;
  n &= ~(1 << i), r += 1;
  var o = 32 - Rn(e) + i;
  if (30 < o) {
    var a = i - i % 5;
    o = (n & (1 << a) - 1).toString(32), n >>= a, i -= a, bi = 1 << 32 - Rn(e) + i | r << i | n, wi = o + t;
  } else
    bi = 1 << o | r << i | n, wi = t;
}
function yg(t) {
  t.return !== null && (Wo(t, 1), R6(t, 1, 0));
}
function xg(t) {
  for (; t === hf; )
    hf = qa[--Ga], qa[Ga] = null, pf = qa[--Ga], qa[Ga] = null;
  for (; t === fa; )
    fa = sn[--ln], sn[ln] = null, wi = sn[--ln], sn[ln] = null, bi = sn[--ln], sn[ln] = null;
}
var Qr = null, Wr = null, ot = !1, Mn = null;
function L6(t, e) {
  var r = fn(5, null, null, 0);
  r.elementType = "DELETED", r.stateNode = e, r.return = t, e = t.deletions, e === null ? (t.deletions = [r], t.flags |= 16) : e.push(r);
}
function y2(t, e) {
  switch (t.tag) {
    case 5:
      var r = t.type;
      return e = e.nodeType !== 1 || r.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, Qr = t, Wr = co(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, Qr = t, Wr = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (r = fa !== null ? { id: bi, overflow: wi } : null, t.memoizedState = { dehydrated: e, treeContext: r, retryLane: 1073741824 }, r = fn(18, null, null, 0), r.stateNode = e, r.return = t, t.child = r, Qr = t, Wr = null, !0) : !1;
    default:
      return !1;
  }
}
function up(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function cp(t) {
  if (ot) {
    var e = Wr;
    if (e) {
      var r = e;
      if (!y2(t, e)) {
        if (up(t))
          throw Error(V(418));
        e = co(r.nextSibling);
        var n = Qr;
        e && y2(t, e) ? L6(n, r) : (t.flags = t.flags & -4097 | 2, ot = !1, Qr = t);
      }
    } else {
      if (up(t))
        throw Error(V(418));
      t.flags = t.flags & -4097 | 2, ot = !1, Qr = t;
    }
  }
}
function x2(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; )
    t = t.return;
  Qr = t;
}
function U0(t) {
  if (t !== Qr)
    return !1;
  if (!ot)
    return x2(t), ot = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !op(t.type, t.memoizedProps)), e && (e = Wr)) {
    if (up(t))
      throw I6(), Error(V(418));
    for (; e; )
      L6(t, e), e = co(e.nextSibling);
  }
  if (x2(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
      throw Error(V(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var r = t.data;
          if (r === "/$") {
            if (e === 0) {
              Wr = co(t.nextSibling);
              break e;
            }
            e--;
          } else
            r !== "$" && r !== "$!" && r !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      Wr = null;
    }
  } else
    Wr = Qr ? co(t.stateNode.nextSibling) : null;
  return !0;
}
function I6() {
  for (var t = Wr; t; )
    t = co(t.nextSibling);
}
function bs() {
  Wr = Qr = null, ot = !1;
}
function bg(t) {
  Mn === null ? Mn = [t] : Mn.push(t);
}
var TC = $i.ReactCurrentBatchConfig;
function kn(t, e) {
  if (t && t.defaultProps) {
    e = pt({}, e), t = t.defaultProps;
    for (var r in t)
      e[r] === void 0 && (e[r] = t[r]);
    return e;
  }
  return e;
}
var mf = Oo(null), gf = null, Wa = null, wg = null;
function Eg() {
  wg = Wa = gf = null;
}
function Sg(t) {
  var e = mf.current;
  tt(mf), t._currentValue = e;
}
function fp(t, e, r) {
  for (; t !== null; ) {
    var n = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, n !== null && (n.childLanes |= e)) : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e), t === r)
      break;
    t = t.return;
  }
}
function os(t, e) {
  gf = t, wg = Wa = null, t = t.dependencies, t !== null && t.firstContext !== null && ((t.lanes & e) !== 0 && (Ar = !0), t.firstContext = null);
}
function gn(t) {
  var e = t._currentValue;
  if (wg !== t)
    if (t = { context: t, memoizedValue: e, next: null }, Wa === null) {
      if (gf === null)
        throw Error(V(308));
      Wa = t, gf.dependencies = { lanes: 0, firstContext: t };
    } else
      Wa = Wa.next = t;
  return e;
}
var ea = null;
function _g(t) {
  ea === null ? ea = [t] : ea.push(t);
}
function P6(t, e, r, n) {
  var i = e.interleaved;
  return i === null ? (r.next = r, _g(e)) : (r.next = i.next, i.next = r), e.interleaved = r, Oi(t, n);
}
function Oi(t, e) {
  t.lanes |= e;
  var r = t.alternate;
  for (r !== null && (r.lanes |= e), r = t, t = t.return; t !== null; )
    t.childLanes |= e, r = t.alternate, r !== null && (r.childLanes |= e), r = t, t = t.return;
  return r.tag === 3 ? r.stateNode : null;
}
var Wi = !1;
function Cg(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function $6(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function _i(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function fo(t, e, r) {
  var n = t.updateQueue;
  if (n === null)
    return null;
  if (n = n.shared, (Le & 2) !== 0) {
    var i = n.pending;
    return i === null ? e.next = e : (e.next = i.next, i.next = e), n.pending = e, Oi(t, r);
  }
  return i = n.interleaved, i === null ? (e.next = e, _g(n)) : (e.next = i.next, i.next = e), n.interleaved = e, Oi(t, r);
}
function Sc(t, e, r) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (r & 4194240) !== 0)) {
    var n = e.lanes;
    n &= t.pendingLanes, r |= n, e.lanes = r, cg(t, r);
  }
}
function b2(t, e) {
  var r = t.updateQueue, n = t.alternate;
  if (n !== null && (n = n.updateQueue, r === n)) {
    var i = null, o = null;
    if (r = r.firstBaseUpdate, r !== null) {
      do {
        var a = { eventTime: r.eventTime, lane: r.lane, tag: r.tag, payload: r.payload, callback: r.callback, next: null };
        o === null ? i = o = a : o = o.next = a, r = r.next;
      } while (r !== null);
      o === null ? i = o = e : o = o.next = e;
    } else
      i = o = e;
    r = { baseState: n.baseState, firstBaseUpdate: i, lastBaseUpdate: o, shared: n.shared, effects: n.effects }, t.updateQueue = r;
    return;
  }
  t = r.lastBaseUpdate, t === null ? r.firstBaseUpdate = e : t.next = e, r.lastBaseUpdate = e;
}
function vf(t, e, r, n) {
  var i = t.updateQueue;
  Wi = !1;
  var o = i.firstBaseUpdate, a = i.lastBaseUpdate, s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var l = s, u = l.next;
    l.next = null, a === null ? o = u : a.next = u, a = l;
    var c = t.alternate;
    c !== null && (c = c.updateQueue, s = c.lastBaseUpdate, s !== a && (s === null ? c.firstBaseUpdate = u : s.next = u, c.lastBaseUpdate = l));
  }
  if (o !== null) {
    var f = i.baseState;
    a = 0, c = u = l = null, s = o;
    do {
      var d = s.lane, h = s.eventTime;
      if ((n & d) === d) {
        c !== null && (c = c.next = {
          eventTime: h,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var m = t, g = s;
          switch (d = e, h = r, g.tag) {
            case 1:
              if (m = g.payload, typeof m == "function") {
                f = m.call(h, f, d);
                break e;
              }
              f = m;
              break e;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = g.payload, d = typeof m == "function" ? m.call(h, f, d) : m, d == null)
                break e;
              f = pt({}, f, d);
              break e;
            case 2:
              Wi = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (t.flags |= 64, d = i.effects, d === null ? i.effects = [s] : d.push(s));
      } else
        h = { eventTime: h, lane: d, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, c === null ? (u = c = h, l = f) : c = c.next = h, a |= d;
      if (s = s.next, s === null) {
        if (s = i.shared.pending, s === null)
          break;
        d = s, s = d.next, d.next = null, i.lastBaseUpdate = d, i.shared.pending = null;
      }
    } while (1);
    if (c === null && (l = f), i.baseState = l, i.firstBaseUpdate = u, i.lastBaseUpdate = c, e = i.shared.interleaved, e !== null) {
      i = e;
      do
        a |= i.lane, i = i.next;
      while (i !== e);
    } else
      o === null && (i.shared.lanes = 0);
    ha |= a, t.lanes = a, t.memoizedState = f;
  }
}
function w2(t, e, r) {
  if (t = e.effects, e.effects = null, t !== null)
    for (e = 0; e < t.length; e++) {
      var n = t[e], i = n.callback;
      if (i !== null) {
        if (n.callback = null, n = r, typeof i != "function")
          throw Error(V(191, i));
        i.call(n);
      }
    }
}
var F6 = new P7.Component().refs;
function dp(t, e, r, n) {
  e = t.memoizedState, r = r(n, e), r = r == null ? e : pt({}, e, r), t.memoizedState = r, t.lanes === 0 && (t.updateQueue.baseState = r);
}
var ld = { isMounted: function(t) {
  return (t = t._reactInternals) ? Ca(t) === t : !1;
}, enqueueSetState: function(t, e, r) {
  t = t._reactInternals;
  var n = wr(), i = po(t), o = _i(n, i);
  o.payload = e, r != null && (o.callback = r), e = fo(t, o, i), e !== null && (Ln(e, t, i, n), Sc(e, t, i));
}, enqueueReplaceState: function(t, e, r) {
  t = t._reactInternals;
  var n = wr(), i = po(t), o = _i(n, i);
  o.tag = 1, o.payload = e, r != null && (o.callback = r), e = fo(t, o, i), e !== null && (Ln(e, t, i, n), Sc(e, t, i));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var r = wr(), n = po(t), i = _i(r, n);
  i.tag = 2, e != null && (i.callback = e), e = fo(t, i, n), e !== null && (Ln(e, t, n, r), Sc(e, t, n));
} };
function E2(t, e, r, n, i, o, a) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(n, o, a) : e.prototype && e.prototype.isPureReactComponent ? !gu(r, n) || !gu(i, o) : !0;
}
function B6(t, e, r) {
  var n = !1, i = wo, o = e.contextType;
  return typeof o == "object" && o !== null ? o = gn(o) : (i = Rr(e) ? ca : hr.current, n = e.contextTypes, o = (n = n != null) ? xs(t, i) : wo), e = new e(r, o), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = ld, t.stateNode = e, e._reactInternals = t, n && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = i, t.__reactInternalMemoizedMaskedChildContext = o), e;
}
function S2(t, e, r, n) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(r, n), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(r, n), e.state !== t && ld.enqueueReplaceState(e, e.state, null);
}
function hp(t, e, r, n) {
  var i = t.stateNode;
  i.props = r, i.state = t.memoizedState, i.refs = F6, Cg(t);
  var o = e.contextType;
  typeof o == "object" && o !== null ? i.context = gn(o) : (o = Rr(e) ? ca : hr.current, i.context = xs(t, o)), i.state = t.memoizedState, o = e.getDerivedStateFromProps, typeof o == "function" && (dp(t, e, o, r), i.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (e = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), e !== i.state && ld.enqueueReplaceState(i, i.state, null), vf(t, r, i, n), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308);
}
function fl(t, e, r) {
  if (t = r.ref, t !== null && typeof t != "function" && typeof t != "object") {
    if (r._owner) {
      if (r = r._owner, r) {
        if (r.tag !== 1)
          throw Error(V(309));
        var n = r.stateNode;
      }
      if (!n)
        throw Error(V(147, t));
      var i = n, o = "" + t;
      return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === o ? e.ref : (e = function(a) {
        var s = i.refs;
        s === F6 && (s = i.refs = {}), a === null ? delete s[o] : s[o] = a;
      }, e._stringRef = o, e);
    }
    if (typeof t != "string")
      throw Error(V(284));
    if (!r._owner)
      throw Error(V(290, t));
  }
  return t;
}
function j0(t, e) {
  throw t = Object.prototype.toString.call(e), Error(V(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function _2(t) {
  var e = t._init;
  return e(t._payload);
}
function z6(t) {
  function e(b, x) {
    if (t) {
      var v = b.deletions;
      v === null ? (b.deletions = [x], b.flags |= 16) : v.push(x);
    }
  }
  function r(b, x) {
    if (!t)
      return null;
    for (; x !== null; )
      e(b, x), x = x.sibling;
    return null;
  }
  function n(b, x) {
    for (b = /* @__PURE__ */ new Map(); x !== null; )
      x.key !== null ? b.set(x.key, x) : b.set(x.index, x), x = x.sibling;
    return b;
  }
  function i(b, x) {
    return b = mo(b, x), b.index = 0, b.sibling = null, b;
  }
  function o(b, x, v) {
    return b.index = v, t ? (v = b.alternate, v !== null ? (v = v.index, v < x ? (b.flags |= 2, x) : v) : (b.flags |= 2, x)) : (b.flags |= 1048576, x);
  }
  function a(b) {
    return t && b.alternate === null && (b.flags |= 2), b;
  }
  function s(b, x, v, w) {
    return x === null || x.tag !== 6 ? (x = $h(v, b.mode, w), x.return = b, x) : (x = i(x, v), x.return = b, x);
  }
  function l(b, x, v, w) {
    var _ = v.type;
    return _ === Ba ? c(b, x, v.props.children, w, v.key) : x !== null && (x.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === Gi && _2(_) === x.type) ? (w = i(x, v.props), w.ref = fl(b, x, v), w.return = b, w) : (w = kc(v.type, v.key, v.props, null, b.mode, w), w.ref = fl(b, x, v), w.return = b, w);
  }
  function u(b, x, v, w) {
    return x === null || x.tag !== 4 || x.stateNode.containerInfo !== v.containerInfo || x.stateNode.implementation !== v.implementation ? (x = Fh(v, b.mode, w), x.return = b, x) : (x = i(x, v.children || []), x.return = b, x);
  }
  function c(b, x, v, w, _) {
    return x === null || x.tag !== 7 ? (x = na(v, b.mode, w, _), x.return = b, x) : (x = i(x, v), x.return = b, x);
  }
  function f(b, x, v) {
    if (typeof x == "string" && x !== "" || typeof x == "number")
      return x = $h("" + x, b.mode, v), x.return = b, x;
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case M0:
          return v = kc(x.type, x.key, x.props, null, b.mode, v), v.ref = fl(b, null, x), v.return = b, v;
        case Fa:
          return x = Fh(x, b.mode, v), x.return = b, x;
        case Gi:
          var w = x._init;
          return f(b, w(x._payload), v);
      }
      if (Tl(x) || al(x))
        return x = na(x, b.mode, v, null), x.return = b, x;
      j0(b, x);
    }
    return null;
  }
  function d(b, x, v, w) {
    var _ = x !== null ? x.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number")
      return _ !== null ? null : s(b, x, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case M0:
          return v.key === _ ? l(b, x, v, w) : null;
        case Fa:
          return v.key === _ ? u(b, x, v, w) : null;
        case Gi:
          return _ = v._init, d(
            b,
            x,
            _(v._payload),
            w
          );
      }
      if (Tl(v) || al(v))
        return _ !== null ? null : c(b, x, v, w, null);
      j0(b, v);
    }
    return null;
  }
  function h(b, x, v, w, _) {
    if (typeof w == "string" && w !== "" || typeof w == "number")
      return b = b.get(v) || null, s(x, b, "" + w, _);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case M0:
          return b = b.get(w.key === null ? v : w.key) || null, l(x, b, w, _);
        case Fa:
          return b = b.get(w.key === null ? v : w.key) || null, u(x, b, w, _);
        case Gi:
          var T = w._init;
          return h(b, x, v, T(w._payload), _);
      }
      if (Tl(w) || al(w))
        return b = b.get(v) || null, c(x, b, w, _, null);
      j0(x, w);
    }
    return null;
  }
  function m(b, x, v, w) {
    for (var _ = null, T = null, N = x, A = x = 0, R = null; N !== null && A < v.length; A++) {
      N.index > A ? (R = N, N = null) : R = N.sibling;
      var F = d(b, N, v[A], w);
      if (F === null) {
        N === null && (N = R);
        break;
      }
      t && N && F.alternate === null && e(b, N), x = o(F, x, A), T === null ? _ = F : T.sibling = F, T = F, N = R;
    }
    if (A === v.length)
      return r(b, N), ot && Wo(b, A), _;
    if (N === null) {
      for (; A < v.length; A++)
        N = f(b, v[A], w), N !== null && (x = o(N, x, A), T === null ? _ = N : T.sibling = N, T = N);
      return ot && Wo(b, A), _;
    }
    for (N = n(b, N); A < v.length; A++)
      R = h(N, b, A, v[A], w), R !== null && (t && R.alternate !== null && N.delete(R.key === null ? A : R.key), x = o(R, x, A), T === null ? _ = R : T.sibling = R, T = R);
    return t && N.forEach(function(X) {
      return e(b, X);
    }), ot && Wo(b, A), _;
  }
  function g(b, x, v, w) {
    var _ = al(v);
    if (typeof _ != "function")
      throw Error(V(150));
    if (v = _.call(v), v == null)
      throw Error(V(151));
    for (var T = _ = null, N = x, A = x = 0, R = null, F = v.next(); N !== null && !F.done; A++, F = v.next()) {
      N.index > A ? (R = N, N = null) : R = N.sibling;
      var X = d(b, N, F.value, w);
      if (X === null) {
        N === null && (N = R);
        break;
      }
      t && N && X.alternate === null && e(b, N), x = o(X, x, A), T === null ? _ = X : T.sibling = X, T = X, N = R;
    }
    if (F.done)
      return r(
        b,
        N
      ), ot && Wo(b, A), _;
    if (N === null) {
      for (; !F.done; A++, F = v.next())
        F = f(b, F.value, w), F !== null && (x = o(F, x, A), T === null ? _ = F : T.sibling = F, T = F);
      return ot && Wo(b, A), _;
    }
    for (N = n(b, N); !F.done; A++, F = v.next())
      F = h(N, b, A, F.value, w), F !== null && (t && F.alternate !== null && N.delete(F.key === null ? A : F.key), x = o(F, x, A), T === null ? _ = F : T.sibling = F, T = F);
    return t && N.forEach(function(le) {
      return e(b, le);
    }), ot && Wo(b, A), _;
  }
  function S(b, x, v, w) {
    if (typeof v == "object" && v !== null && v.type === Ba && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case M0:
          e: {
            for (var _ = v.key, T = x; T !== null; ) {
              if (T.key === _) {
                if (_ = v.type, _ === Ba) {
                  if (T.tag === 7) {
                    r(b, T.sibling), x = i(T, v.props.children), x.return = b, b = x;
                    break e;
                  }
                } else if (T.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === Gi && _2(_) === T.type) {
                  r(b, T.sibling), x = i(T, v.props), x.ref = fl(b, T, v), x.return = b, b = x;
                  break e;
                }
                r(b, T);
                break;
              } else
                e(b, T);
              T = T.sibling;
            }
            v.type === Ba ? (x = na(v.props.children, b.mode, w, v.key), x.return = b, b = x) : (w = kc(v.type, v.key, v.props, null, b.mode, w), w.ref = fl(b, x, v), w.return = b, b = w);
          }
          return a(b);
        case Fa:
          e: {
            for (T = v.key; x !== null; ) {
              if (x.key === T)
                if (x.tag === 4 && x.stateNode.containerInfo === v.containerInfo && x.stateNode.implementation === v.implementation) {
                  r(b, x.sibling), x = i(x, v.children || []), x.return = b, b = x;
                  break e;
                } else {
                  r(b, x);
                  break;
                }
              else
                e(b, x);
              x = x.sibling;
            }
            x = Fh(v, b.mode, w), x.return = b, b = x;
          }
          return a(b);
        case Gi:
          return T = v._init, S(b, x, T(v._payload), w);
      }
      if (Tl(v))
        return m(b, x, v, w);
      if (al(v))
        return g(b, x, v, w);
      j0(b, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, x !== null && x.tag === 6 ? (r(b, x.sibling), x = i(x, v), x.return = b, b = x) : (r(b, x), x = $h(v, b.mode, w), x.return = b, b = x), a(b)) : r(b, x);
  }
  return S;
}
var ws = z6(!0), H6 = z6(!1), r0 = {}, Yn = Oo(r0), bu = Oo(r0), wu = Oo(r0);
function ta(t) {
  if (t === r0)
    throw Error(V(174));
  return t;
}
function Tg(t, e) {
  switch (Ye(wu, e), Ye(bu, t), Ye(Yn, r0), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : q1(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = q1(e, t);
  }
  tt(Yn), Ye(Yn, e);
}
function Es() {
  tt(Yn), tt(bu), tt(wu);
}
function U6(t) {
  ta(wu.current);
  var e = ta(Yn.current), r = q1(e, t.type);
  e !== r && (Ye(bu, t), Ye(Yn, r));
}
function Ng(t) {
  bu.current === t && (tt(Yn), tt(bu));
}
var ct = Oo(0);
function yf(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var r = e.memoizedState;
      if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!"))
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if ((e.flags & 128) !== 0)
        return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t)
      break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t)
        return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var Ah = [];
function Dg() {
  for (var t = 0; t < Ah.length; t++)
    Ah[t]._workInProgressVersionPrimary = null;
  Ah.length = 0;
}
var _c = $i.ReactCurrentDispatcher, Mh = $i.ReactCurrentBatchConfig, da = 0, ht = null, Mt = null, jt = null, xf = !1, Ul = !1, Eu = 0, NC = 0;
function or() {
  throw Error(V(321));
}
function kg(t, e) {
  if (e === null)
    return !1;
  for (var r = 0; r < e.length && r < t.length; r++)
    if (!Pn(t[r], e[r]))
      return !1;
  return !0;
}
function Og(t, e, r, n, i, o) {
  if (da = o, ht = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, _c.current = t === null || t.memoizedState === null ? AC : MC, t = r(n, i), Ul) {
    o = 0;
    do {
      if (Ul = !1, Eu = 0, 25 <= o)
        throw Error(V(301));
      o += 1, jt = Mt = null, e.updateQueue = null, _c.current = RC, t = r(n, i);
    } while (Ul);
  }
  if (_c.current = bf, e = Mt !== null && Mt.next !== null, da = 0, jt = Mt = ht = null, xf = !1, e)
    throw Error(V(300));
  return t;
}
function Ag() {
  var t = Eu !== 0;
  return Eu = 0, t;
}
function Hn() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return jt === null ? ht.memoizedState = jt = t : jt = jt.next = t, jt;
}
function vn() {
  if (Mt === null) {
    var t = ht.alternate;
    t = t !== null ? t.memoizedState : null;
  } else
    t = Mt.next;
  var e = jt === null ? ht.memoizedState : jt.next;
  if (e !== null)
    jt = e, Mt = t;
  else {
    if (t === null)
      throw Error(V(310));
    Mt = t, t = { memoizedState: Mt.memoizedState, baseState: Mt.baseState, baseQueue: Mt.baseQueue, queue: Mt.queue, next: null }, jt === null ? ht.memoizedState = jt = t : jt = jt.next = t;
  }
  return jt;
}
function Su(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Rh(t) {
  var e = vn(), r = e.queue;
  if (r === null)
    throw Error(V(311));
  r.lastRenderedReducer = t;
  var n = Mt, i = n.baseQueue, o = r.pending;
  if (o !== null) {
    if (i !== null) {
      var a = i.next;
      i.next = o.next, o.next = a;
    }
    n.baseQueue = i = o, r.pending = null;
  }
  if (i !== null) {
    o = i.next, n = n.baseState;
    var s = a = null, l = null, u = o;
    do {
      var c = u.lane;
      if ((da & c) === c)
        l !== null && (l = l.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), n = u.hasEagerState ? u.eagerState : t(n, u.action);
      else {
        var f = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        l === null ? (s = l = f, a = n) : l = l.next = f, ht.lanes |= c, ha |= c;
      }
      u = u.next;
    } while (u !== null && u !== o);
    l === null ? a = n : l.next = s, Pn(n, e.memoizedState) || (Ar = !0), e.memoizedState = n, e.baseState = a, e.baseQueue = l, r.lastRenderedState = n;
  }
  if (t = r.interleaved, t !== null) {
    i = t;
    do
      o = i.lane, ht.lanes |= o, ha |= o, i = i.next;
    while (i !== t);
  } else
    i === null && (r.lanes = 0);
  return [e.memoizedState, r.dispatch];
}
function Lh(t) {
  var e = vn(), r = e.queue;
  if (r === null)
    throw Error(V(311));
  r.lastRenderedReducer = t;
  var n = r.dispatch, i = r.pending, o = e.memoizedState;
  if (i !== null) {
    r.pending = null;
    var a = i = i.next;
    do
      o = t(o, a.action), a = a.next;
    while (a !== i);
    Pn(o, e.memoizedState) || (Ar = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), r.lastRenderedState = o;
  }
  return [o, n];
}
function j6() {
}
function V6(t, e) {
  var r = ht, n = vn(), i = e(), o = !Pn(n.memoizedState, i);
  if (o && (n.memoizedState = i, Ar = !0), n = n.queue, Mg(W6.bind(null, r, n, t), [t]), n.getSnapshot !== e || o || jt !== null && jt.memoizedState.tag & 1) {
    if (r.flags |= 2048, _u(9, G6.bind(null, r, n, i, e), void 0, null), Gt === null)
      throw Error(V(349));
    (da & 30) !== 0 || q6(r, e, i);
  }
  return i;
}
function q6(t, e, r) {
  t.flags |= 16384, t = { getSnapshot: e, value: r }, e = ht.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, ht.updateQueue = e, e.stores = [t]) : (r = e.stores, r === null ? e.stores = [t] : r.push(t));
}
function G6(t, e, r, n) {
  e.value = r, e.getSnapshot = n, Q6(e) && K6(t);
}
function W6(t, e, r) {
  return r(function() {
    Q6(e) && K6(t);
  });
}
function Q6(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var r = e();
    return !Pn(t, r);
  } catch {
    return !0;
  }
}
function K6(t) {
  var e = Oi(t, 1);
  e !== null && Ln(e, t, 1, -1);
}
function C2(t) {
  var e = Hn();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Su, lastRenderedState: t }, e.queue = t, t = t.dispatch = OC.bind(null, ht, t), [e.memoizedState, t];
}
function _u(t, e, r, n) {
  return t = { tag: t, create: e, destroy: r, deps: n, next: null }, e = ht.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, ht.updateQueue = e, e.lastEffect = t.next = t) : (r = e.lastEffect, r === null ? e.lastEffect = t.next = t : (n = r.next, r.next = t, t.next = n, e.lastEffect = t)), t;
}
function Y6() {
  return vn().memoizedState;
}
function Cc(t, e, r, n) {
  var i = Hn();
  ht.flags |= t, i.memoizedState = _u(1 | e, r, void 0, n === void 0 ? null : n);
}
function ud(t, e, r, n) {
  var i = vn();
  n = n === void 0 ? null : n;
  var o = void 0;
  if (Mt !== null) {
    var a = Mt.memoizedState;
    if (o = a.destroy, n !== null && kg(n, a.deps)) {
      i.memoizedState = _u(e, r, o, n);
      return;
    }
  }
  ht.flags |= t, i.memoizedState = _u(1 | e, r, o, n);
}
function T2(t, e) {
  return Cc(8390656, 8, t, e);
}
function Mg(t, e) {
  return ud(2048, 8, t, e);
}
function X6(t, e) {
  return ud(4, 2, t, e);
}
function Z6(t, e) {
  return ud(4, 4, t, e);
}
function J6(t, e) {
  if (typeof e == "function")
    return t = t(), e(t), function() {
      e(null);
    };
  if (e != null)
    return t = t(), e.current = t, function() {
      e.current = null;
    };
}
function e8(t, e, r) {
  return r = r != null ? r.concat([t]) : null, ud(4, 4, J6.bind(null, e, t), r);
}
function Rg() {
}
function t8(t, e) {
  var r = vn();
  e = e === void 0 ? null : e;
  var n = r.memoizedState;
  return n !== null && e !== null && kg(e, n[1]) ? n[0] : (r.memoizedState = [t, e], t);
}
function r8(t, e) {
  var r = vn();
  e = e === void 0 ? null : e;
  var n = r.memoizedState;
  return n !== null && e !== null && kg(e, n[1]) ? n[0] : (t = t(), r.memoizedState = [t, e], t);
}
function n8(t, e, r) {
  return (da & 21) === 0 ? (t.baseState && (t.baseState = !1, Ar = !0), t.memoizedState = r) : (Pn(r, e) || (r = a6(), ht.lanes |= r, ha |= r, t.baseState = !0), e);
}
function DC(t, e) {
  var r = Ue;
  Ue = r !== 0 && 4 > r ? r : 4, t(!0);
  var n = Mh.transition;
  Mh.transition = {};
  try {
    t(!1), e();
  } finally {
    Ue = r, Mh.transition = n;
  }
}
function i8() {
  return vn().memoizedState;
}
function kC(t, e, r) {
  var n = po(t);
  if (r = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null }, o8(t))
    a8(e, r);
  else if (r = P6(t, e, r, n), r !== null) {
    var i = wr();
    Ln(r, t, n, i), s8(r, e, n);
  }
}
function OC(t, e, r) {
  var n = po(t), i = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (o8(t))
    a8(e, i);
  else {
    var o = t.alternate;
    if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
      try {
        var a = e.lastRenderedState, s = o(a, r);
        if (i.hasEagerState = !0, i.eagerState = s, Pn(s, a)) {
          var l = e.interleaved;
          l === null ? (i.next = i, _g(e)) : (i.next = l.next, l.next = i), e.interleaved = i;
          return;
        }
      } catch {
      } finally {
      }
    r = P6(t, e, i, n), r !== null && (i = wr(), Ln(r, t, n, i), s8(r, e, n));
  }
}
function o8(t) {
  var e = t.alternate;
  return t === ht || e !== null && e === ht;
}
function a8(t, e) {
  Ul = xf = !0;
  var r = t.pending;
  r === null ? e.next = e : (e.next = r.next, r.next = e), t.pending = e;
}
function s8(t, e, r) {
  if ((r & 4194240) !== 0) {
    var n = e.lanes;
    n &= t.pendingLanes, r |= n, e.lanes = r, cg(t, r);
  }
}
var bf = { readContext: gn, useCallback: or, useContext: or, useEffect: or, useImperativeHandle: or, useInsertionEffect: or, useLayoutEffect: or, useMemo: or, useReducer: or, useRef: or, useState: or, useDebugValue: or, useDeferredValue: or, useTransition: or, useMutableSource: or, useSyncExternalStore: or, useId: or, unstable_isNewReconciler: !1 }, AC = { readContext: gn, useCallback: function(t, e) {
  return Hn().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: gn, useEffect: T2, useImperativeHandle: function(t, e, r) {
  return r = r != null ? r.concat([t]) : null, Cc(
    4194308,
    4,
    J6.bind(null, e, t),
    r
  );
}, useLayoutEffect: function(t, e) {
  return Cc(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return Cc(4, 2, t, e);
}, useMemo: function(t, e) {
  var r = Hn();
  return e = e === void 0 ? null : e, t = t(), r.memoizedState = [t, e], t;
}, useReducer: function(t, e, r) {
  var n = Hn();
  return e = r !== void 0 ? r(e) : e, n.memoizedState = n.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, n.queue = t, t = t.dispatch = kC.bind(null, ht, t), [n.memoizedState, t];
}, useRef: function(t) {
  var e = Hn();
  return t = { current: t }, e.memoizedState = t;
}, useState: C2, useDebugValue: Rg, useDeferredValue: function(t) {
  return Hn().memoizedState = t;
}, useTransition: function() {
  var t = C2(!1), e = t[0];
  return t = DC.bind(null, t[1]), Hn().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, r) {
  var n = ht, i = Hn();
  if (ot) {
    if (r === void 0)
      throw Error(V(407));
    r = r();
  } else {
    if (r = e(), Gt === null)
      throw Error(V(349));
    (da & 30) !== 0 || q6(n, e, r);
  }
  i.memoizedState = r;
  var o = { value: r, getSnapshot: e };
  return i.queue = o, T2(W6.bind(
    null,
    n,
    o,
    t
  ), [t]), n.flags |= 2048, _u(9, G6.bind(null, n, o, r, e), void 0, null), r;
}, useId: function() {
  var t = Hn(), e = Gt.identifierPrefix;
  if (ot) {
    var r = wi, n = bi;
    r = (n & ~(1 << 32 - Rn(n) - 1)).toString(32) + r, e = ":" + e + "R" + r, r = Eu++, 0 < r && (e += "H" + r.toString(32)), e += ":";
  } else
    r = NC++, e = ":" + e + "r" + r.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, MC = {
  readContext: gn,
  useCallback: t8,
  useContext: gn,
  useEffect: Mg,
  useImperativeHandle: e8,
  useInsertionEffect: X6,
  useLayoutEffect: Z6,
  useMemo: r8,
  useReducer: Rh,
  useRef: Y6,
  useState: function() {
    return Rh(Su);
  },
  useDebugValue: Rg,
  useDeferredValue: function(t) {
    var e = vn();
    return n8(e, Mt.memoizedState, t);
  },
  useTransition: function() {
    var t = Rh(Su)[0], e = vn().memoizedState;
    return [t, e];
  },
  useMutableSource: j6,
  useSyncExternalStore: V6,
  useId: i8,
  unstable_isNewReconciler: !1
}, RC = { readContext: gn, useCallback: t8, useContext: gn, useEffect: Mg, useImperativeHandle: e8, useInsertionEffect: X6, useLayoutEffect: Z6, useMemo: r8, useReducer: Lh, useRef: Y6, useState: function() {
  return Lh(Su);
}, useDebugValue: Rg, useDeferredValue: function(t) {
  var e = vn();
  return Mt === null ? e.memoizedState = t : n8(e, Mt.memoizedState, t);
}, useTransition: function() {
  var t = Lh(Su)[0], e = vn().memoizedState;
  return [t, e];
}, useMutableSource: j6, useSyncExternalStore: V6, useId: i8, unstable_isNewReconciler: !1 };
function Ss(t, e) {
  try {
    var r = "", n = e;
    do
      r += s_(n), n = n.return;
    while (n);
    var i = r;
  } catch (o) {
    i = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: t, source: e, stack: i, digest: null };
}
function Ih(t, e, r) {
  return { value: t, source: null, stack: r != null ? r : null, digest: e != null ? e : null };
}
function pp(t, e) {
  try {
    console.error(e.value);
  } catch (r) {
    setTimeout(function() {
      throw r;
    });
  }
}
var LC = typeof WeakMap == "function" ? WeakMap : Map;
function l8(t, e, r) {
  r = _i(-1, r), r.tag = 3, r.payload = { element: null };
  var n = e.value;
  return r.callback = function() {
    Ef || (Ef = !0, _p = n), pp(t, e);
  }, r;
}
function u8(t, e, r) {
  r = _i(-1, r), r.tag = 3;
  var n = t.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var i = e.value;
    r.payload = function() {
      return n(i);
    }, r.callback = function() {
      pp(t, e);
    };
  }
  var o = t.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (r.callback = function() {
    pp(t, e), typeof n != "function" && (ho === null ? ho = /* @__PURE__ */ new Set([this]) : ho.add(this));
    var a = e.stack;
    this.componentDidCatch(e.value, { componentStack: a !== null ? a : "" });
  }), r;
}
function N2(t, e, r) {
  var n = t.pingCache;
  if (n === null) {
    n = t.pingCache = new LC();
    var i = /* @__PURE__ */ new Set();
    n.set(e, i);
  } else
    i = n.get(e), i === void 0 && (i = /* @__PURE__ */ new Set(), n.set(e, i));
  i.has(r) || (i.add(r), t = QC.bind(null, t, e, r), e.then(t, t));
}
function D2(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e)
      return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function k2(t, e, r, n, i) {
  return (t.mode & 1) === 0 ? (t === e ? t.flags |= 65536 : (t.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (e = _i(-1, 1), e.tag = 2, fo(r, e, 1))), r.lanes |= 1), t) : (t.flags |= 65536, t.lanes = i, t);
}
var IC = $i.ReactCurrentOwner, Ar = !1;
function gr(t, e, r, n) {
  e.child = t === null ? H6(e, null, r, n) : ws(e, t.child, r, n);
}
function O2(t, e, r, n, i) {
  r = r.render;
  var o = e.ref;
  return os(e, i), n = Og(t, e, r, n, o, i), r = Ag(), t !== null && !Ar ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, Ai(t, e, i)) : (ot && r && yg(e), e.flags |= 1, gr(t, e, n, i), e.child);
}
function A2(t, e, r, n, i) {
  if (t === null) {
    var o = r.type;
    return typeof o == "function" && !Hg(o) && o.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (e.tag = 15, e.type = o, c8(t, e, o, n, i)) : (t = kc(r.type, null, n, e, e.mode, i), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (o = t.child, (t.lanes & i) === 0) {
    var a = o.memoizedProps;
    if (r = r.compare, r = r !== null ? r : gu, r(a, n) && t.ref === e.ref)
      return Ai(t, e, i);
  }
  return e.flags |= 1, t = mo(o, n), t.ref = e.ref, t.return = e, e.child = t;
}
function c8(t, e, r, n, i) {
  if (t !== null) {
    var o = t.memoizedProps;
    if (gu(o, n) && t.ref === e.ref)
      if (Ar = !1, e.pendingProps = n = o, (t.lanes & i) !== 0)
        (t.flags & 131072) !== 0 && (Ar = !0);
      else
        return e.lanes = t.lanes, Ai(t, e, i);
  }
  return mp(t, e, r, n, i);
}
function f8(t, e, r) {
  var n = e.pendingProps, i = n.children, o = t !== null ? t.memoizedState : null;
  if (n.mode === "hidden")
    if ((e.mode & 1) === 0)
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ye(Ka, Hr), Hr |= r;
    else {
      if ((r & 1073741824) === 0)
        return t = o !== null ? o.baseLanes | r : r, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, Ye(Ka, Hr), Hr |= t, null;
      e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, n = o !== null ? o.baseLanes : r, Ye(Ka, Hr), Hr |= n;
    }
  else
    o !== null ? (n = o.baseLanes | r, e.memoizedState = null) : n = r, Ye(Ka, Hr), Hr |= n;
  return gr(t, e, i, r), e.child;
}
function d8(t, e) {
  var r = e.ref;
  (t === null && r !== null || t !== null && t.ref !== r) && (e.flags |= 512, e.flags |= 2097152);
}
function mp(t, e, r, n, i) {
  var o = Rr(r) ? ca : hr.current;
  return o = xs(e, o), os(e, i), r = Og(t, e, r, n, o, i), n = Ag(), t !== null && !Ar ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~i, Ai(t, e, i)) : (ot && n && yg(e), e.flags |= 1, gr(t, e, r, i), e.child);
}
function M2(t, e, r, n, i) {
  if (Rr(r)) {
    var o = !0;
    df(e);
  } else
    o = !1;
  if (os(e, i), e.stateNode === null)
    Tc(t, e), B6(e, r, n), hp(e, r, n, i), n = !0;
  else if (t === null) {
    var a = e.stateNode, s = e.memoizedProps;
    a.props = s;
    var l = a.context, u = r.contextType;
    typeof u == "object" && u !== null ? u = gn(u) : (u = Rr(r) ? ca : hr.current, u = xs(e, u));
    var c = r.getDerivedStateFromProps, f = typeof c == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    f || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== n || l !== u) && S2(e, a, n, u), Wi = !1;
    var d = e.memoizedState;
    a.state = d, vf(e, n, a, i), l = e.memoizedState, s !== n || d !== l || Mr.current || Wi ? (typeof c == "function" && (dp(e, r, c, n), l = e.memoizedState), (s = Wi || E2(e, r, s, n, d, l, u)) ? (f || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = n, e.memoizedState = l), a.props = n, a.state = l, a.context = u, n = s) : (typeof a.componentDidMount == "function" && (e.flags |= 4194308), n = !1);
  } else {
    a = e.stateNode, $6(t, e), s = e.memoizedProps, u = e.type === e.elementType ? s : kn(e.type, s), a.props = u, f = e.pendingProps, d = a.context, l = r.contextType, typeof l == "object" && l !== null ? l = gn(l) : (l = Rr(r) ? ca : hr.current, l = xs(e, l));
    var h = r.getDerivedStateFromProps;
    (c = typeof h == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s !== f || d !== l) && S2(e, a, n, l), Wi = !1, d = e.memoizedState, a.state = d, vf(e, n, a, i);
    var m = e.memoizedState;
    s !== f || d !== m || Mr.current || Wi ? (typeof h == "function" && (dp(e, r, h, n), m = e.memoizedState), (u = Wi || E2(e, r, u, n, d, m, l) || !1) ? (c || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(n, m, l), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(n, m, l)), typeof a.componentDidUpdate == "function" && (e.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), e.memoizedProps = n, e.memoizedState = m), a.props = n, a.state = m, a.context = l, n = u) : (typeof a.componentDidUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && d === t.memoizedState || (e.flags |= 1024), n = !1);
  }
  return gp(t, e, r, n, o, i);
}
function gp(t, e, r, n, i, o) {
  d8(t, e);
  var a = (e.flags & 128) !== 0;
  if (!n && !a)
    return i && v2(e, r, !1), Ai(t, e, o);
  n = e.stateNode, IC.current = e;
  var s = a && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  return e.flags |= 1, t !== null && a ? (e.child = ws(e, t.child, null, o), e.child = ws(e, null, s, o)) : gr(t, e, s, o), e.memoizedState = n.state, i && v2(e, r, !0), e.child;
}
function h8(t) {
  var e = t.stateNode;
  e.pendingContext ? g2(t, e.pendingContext, e.pendingContext !== e.context) : e.context && g2(t, e.context, !1), Tg(t, e.containerInfo);
}
function R2(t, e, r, n, i) {
  return bs(), bg(i), e.flags |= 256, gr(t, e, r, n), e.child;
}
var vp = { dehydrated: null, treeContext: null, retryLane: 0 };
function yp(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function p8(t, e, r) {
  var n = e.pendingProps, i = ct.current, o = !1, a = (e.flags & 128) !== 0, s;
  if ((s = a) || (s = t !== null && t.memoizedState === null ? !1 : (i & 2) !== 0), s ? (o = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (i |= 1), Ye(ct, i & 1), t === null)
    return cp(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? ((e.mode & 1) === 0 ? e.lanes = 1 : t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824, null) : (a = n.children, t = n.fallback, o ? (n = e.mode, o = e.child, a = { mode: "hidden", children: a }, (n & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = dd(a, n, 0, null), t = na(t, n, r, null), o.return = e, t.return = e, o.sibling = t, e.child = o, e.child.memoizedState = yp(r), e.memoizedState = vp, t) : Lg(e, a));
  if (i = t.memoizedState, i !== null && (s = i.dehydrated, s !== null))
    return PC(t, e, a, n, s, i, r);
  if (o) {
    o = n.fallback, a = e.mode, i = t.child, s = i.sibling;
    var l = { mode: "hidden", children: n.children };
    return (a & 1) === 0 && e.child !== i ? (n = e.child, n.childLanes = 0, n.pendingProps = l, e.deletions = null) : (n = mo(i, l), n.subtreeFlags = i.subtreeFlags & 14680064), s !== null ? o = mo(s, o) : (o = na(o, a, r, null), o.flags |= 2), o.return = e, n.return = e, n.sibling = o, e.child = n, n = o, o = e.child, a = t.child.memoizedState, a = a === null ? yp(r) : { baseLanes: a.baseLanes | r, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = t.childLanes & ~r, e.memoizedState = vp, n;
  }
  return o = t.child, t = o.sibling, n = mo(o, { mode: "visible", children: n.children }), (e.mode & 1) === 0 && (n.lanes = r), n.return = e, n.sibling = null, t !== null && (r = e.deletions, r === null ? (e.deletions = [t], e.flags |= 16) : r.push(t)), e.child = n, e.memoizedState = null, n;
}
function Lg(t, e) {
  return e = dd({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function V0(t, e, r, n) {
  return n !== null && bg(n), ws(e, t.child, null, r), t = Lg(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function PC(t, e, r, n, i, o, a) {
  if (r)
    return e.flags & 256 ? (e.flags &= -257, n = Ih(Error(V(422))), V0(t, e, a, n)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (o = n.fallback, i = e.mode, n = dd({ mode: "visible", children: n.children }, i, 0, null), o = na(o, i, a, null), o.flags |= 2, n.return = e, o.return = e, n.sibling = o, e.child = n, (e.mode & 1) !== 0 && ws(e, t.child, null, a), e.child.memoizedState = yp(a), e.memoizedState = vp, o);
  if ((e.mode & 1) === 0)
    return V0(t, e, a, null);
  if (i.data === "$!") {
    if (n = i.nextSibling && i.nextSibling.dataset, n)
      var s = n.dgst;
    return n = s, o = Error(V(419)), n = Ih(o, n, void 0), V0(t, e, a, n);
  }
  if (s = (a & t.childLanes) !== 0, Ar || s) {
    if (n = Gt, n !== null) {
      switch (a & -a) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      i = (i & (n.suspendedLanes | a)) !== 0 ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, Oi(t, i), Ln(n, t, i, -1));
    }
    return zg(), n = Ih(Error(V(421))), V0(t, e, a, n);
  }
  return i.data === "$?" ? (e.flags |= 128, e.child = t.child, e = KC.bind(null, t), i._reactRetry = e, null) : (t = o.treeContext, Wr = co(i.nextSibling), Qr = e, ot = !0, Mn = null, t !== null && (sn[ln++] = bi, sn[ln++] = wi, sn[ln++] = fa, bi = t.id, wi = t.overflow, fa = e), e = Lg(e, n.children), e.flags |= 4096, e);
}
function L2(t, e, r) {
  t.lanes |= e;
  var n = t.alternate;
  n !== null && (n.lanes |= e), fp(t.return, e, r);
}
function Ph(t, e, r, n, i) {
  var o = t.memoizedState;
  o === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: n, tail: r, tailMode: i } : (o.isBackwards = e, o.rendering = null, o.renderingStartTime = 0, o.last = n, o.tail = r, o.tailMode = i);
}
function m8(t, e, r) {
  var n = e.pendingProps, i = n.revealOrder, o = n.tail;
  if (gr(t, e, n.children, r), n = ct.current, (n & 2) !== 0)
    n = n & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && (t.flags & 128) !== 0)
      e:
        for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && L2(t, r, e);
          else if (t.tag === 19)
            L2(t, r, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e)
            break e;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break e;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
    n &= 1;
  }
  if (Ye(ct, n), (e.mode & 1) === 0)
    e.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (r = e.child, i = null; r !== null; )
          t = r.alternate, t !== null && yf(t) === null && (i = r), r = r.sibling;
        r = i, r === null ? (i = e.child, e.child = null) : (i = r.sibling, r.sibling = null), Ph(e, !1, i, r, o);
        break;
      case "backwards":
        for (r = null, i = e.child, e.child = null; i !== null; ) {
          if (t = i.alternate, t !== null && yf(t) === null) {
            e.child = i;
            break;
          }
          t = i.sibling, i.sibling = r, r = i, i = t;
        }
        Ph(e, !0, r, null, o);
        break;
      case "together":
        Ph(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
  return e.child;
}
function Tc(t, e) {
  (e.mode & 1) === 0 && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function Ai(t, e, r) {
  if (t !== null && (e.dependencies = t.dependencies), ha |= e.lanes, (r & e.childLanes) === 0)
    return null;
  if (t !== null && e.child !== t.child)
    throw Error(V(153));
  if (e.child !== null) {
    for (t = e.child, r = mo(t, t.pendingProps), e.child = r, r.return = e; t.sibling !== null; )
      t = t.sibling, r = r.sibling = mo(t, t.pendingProps), r.return = e;
    r.sibling = null;
  }
  return e.child;
}
function $C(t, e, r) {
  switch (e.tag) {
    case 3:
      h8(e), bs();
      break;
    case 5:
      U6(e);
      break;
    case 1:
      Rr(e.type) && df(e);
      break;
    case 4:
      Tg(e, e.stateNode.containerInfo);
      break;
    case 10:
      var n = e.type._context, i = e.memoizedProps.value;
      Ye(mf, n._currentValue), n._currentValue = i;
      break;
    case 13:
      if (n = e.memoizedState, n !== null)
        return n.dehydrated !== null ? (Ye(ct, ct.current & 1), e.flags |= 128, null) : (r & e.child.childLanes) !== 0 ? p8(t, e, r) : (Ye(ct, ct.current & 1), t = Ai(t, e, r), t !== null ? t.sibling : null);
      Ye(ct, ct.current & 1);
      break;
    case 19:
      if (n = (r & e.childLanes) !== 0, (t.flags & 128) !== 0) {
        if (n)
          return m8(t, e, r);
        e.flags |= 128;
      }
      if (i = e.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), Ye(ct, ct.current), n)
        break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, f8(t, e, r);
  }
  return Ai(t, e, r);
}
var g8, xp, v8, y8;
g8 = function(t, e) {
  for (var r = e.child; r !== null; ) {
    if (r.tag === 5 || r.tag === 6)
      t.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      r.child.return = r, r = r.child;
      continue;
    }
    if (r === e)
      break;
    for (; r.sibling === null; ) {
      if (r.return === null || r.return === e)
        return;
      r = r.return;
    }
    r.sibling.return = r.return, r = r.sibling;
  }
};
xp = function() {
};
v8 = function(t, e, r, n) {
  var i = t.memoizedProps;
  if (i !== n) {
    t = e.stateNode, ta(Yn.current);
    var o = null;
    switch (r) {
      case "input":
        i = H1(t, i), n = H1(t, n), o = [];
        break;
      case "select":
        i = pt({}, i, { value: void 0 }), n = pt({}, n, { value: void 0 }), o = [];
        break;
      case "textarea":
        i = V1(t, i), n = V1(t, n), o = [];
        break;
      default:
        typeof i.onClick != "function" && typeof n.onClick == "function" && (t.onclick = cf);
    }
    G1(r, n);
    var a;
    r = null;
    for (u in i)
      if (!n.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var s = i[u];
          for (a in s)
            s.hasOwnProperty(a) && (r || (r = {}), r[a] = "");
        } else
          u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (uu.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
    for (u in n) {
      var l = n[u];
      if (s = i != null ? i[u] : void 0, n.hasOwnProperty(u) && l !== s && (l != null || s != null))
        if (u === "style")
          if (s) {
            for (a in s)
              !s.hasOwnProperty(a) || l && l.hasOwnProperty(a) || (r || (r = {}), r[a] = "");
            for (a in l)
              l.hasOwnProperty(a) && s[a] !== l[a] && (r || (r = {}), r[a] = l[a]);
          } else
            r || (o || (o = []), o.push(
              u,
              r
            )), r = l;
        else
          u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, s = s ? s.__html : void 0, l != null && s !== l && (o = o || []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (o = o || []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (uu.hasOwnProperty(u) ? (l != null && u === "onScroll" && Je("scroll", t), o || s === l || (o = [])) : (o = o || []).push(u, l));
    }
    r && (o = o || []).push("style", r);
    var u = o;
    (e.updateQueue = u) && (e.flags |= 4);
  }
};
y8 = function(t, e, r, n) {
  r !== n && (e.flags |= 4);
};
function dl(t, e) {
  if (!ot)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var r = null; e !== null; )
          e.alternate !== null && (r = e), e = e.sibling;
        r === null ? t.tail = null : r.sibling = null;
        break;
      case "collapsed":
        r = t.tail;
        for (var n = null; r !== null; )
          r.alternate !== null && (n = r), r = r.sibling;
        n === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : n.sibling = null;
    }
}
function ar(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, r = 0, n = 0;
  if (e)
    for (var i = t.child; i !== null; )
      r |= i.lanes | i.childLanes, n |= i.subtreeFlags & 14680064, n |= i.flags & 14680064, i.return = t, i = i.sibling;
  else
    for (i = t.child; i !== null; )
      r |= i.lanes | i.childLanes, n |= i.subtreeFlags, n |= i.flags, i.return = t, i = i.sibling;
  return t.subtreeFlags |= n, t.childLanes = r, e;
}
function FC(t, e, r) {
  var n = e.pendingProps;
  switch (xg(e), e.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ar(e), null;
    case 1:
      return Rr(e.type) && ff(), ar(e), null;
    case 3:
      return n = e.stateNode, Es(), tt(Mr), tt(hr), Dg(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (U0(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Mn !== null && (Np(Mn), Mn = null))), xp(t, e), ar(e), null;
    case 5:
      Ng(e);
      var i = ta(wu.current);
      if (r = e.type, t !== null && e.stateNode != null)
        v8(t, e, r, n, i), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!n) {
          if (e.stateNode === null)
            throw Error(V(166));
          return ar(e), null;
        }
        if (t = ta(Yn.current), U0(e)) {
          n = e.stateNode, r = e.type;
          var o = e.memoizedProps;
          switch (n[Wn] = e, n[xu] = o, t = (e.mode & 1) !== 0, r) {
            case "dialog":
              Je("cancel", n), Je("close", n);
              break;
            case "iframe":
            case "object":
            case "embed":
              Je("load", n);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Dl.length; i++)
                Je(Dl[i], n);
              break;
            case "source":
              Je("error", n);
              break;
            case "img":
            case "image":
            case "link":
              Je(
                "error",
                n
              ), Je("load", n);
              break;
            case "details":
              Je("toggle", n);
              break;
            case "input":
              j4(n, o), Je("invalid", n);
              break;
            case "select":
              n._wrapperState = { wasMultiple: !!o.multiple }, Je("invalid", n);
              break;
            case "textarea":
              q4(n, o), Je("invalid", n);
          }
          G1(r, o), i = null;
          for (var a in o)
            if (o.hasOwnProperty(a)) {
              var s = o[a];
              a === "children" ? typeof s == "string" ? n.textContent !== s && (o.suppressHydrationWarning !== !0 && H0(n.textContent, s, t), i = ["children", s]) : typeof s == "number" && n.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && H0(
                n.textContent,
                s,
                t
              ), i = ["children", "" + s]) : uu.hasOwnProperty(a) && s != null && a === "onScroll" && Je("scroll", n);
            }
          switch (r) {
            case "input":
              R0(n), V4(n, o, !0);
              break;
            case "textarea":
              R0(n), G4(n);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (n.onclick = cf);
          }
          n = i, e.updateQueue = n, n !== null && (e.flags |= 4);
        } else {
          a = i.nodeType === 9 ? i : i.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = q7(r)), t === "http://www.w3.org/1999/xhtml" ? r === "script" ? (t = a.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof n.is == "string" ? t = a.createElement(r, { is: n.is }) : (t = a.createElement(r), r === "select" && (a = t, n.multiple ? a.multiple = !0 : n.size && (a.size = n.size))) : t = a.createElementNS(t, r), t[Wn] = e, t[xu] = n, g8(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (a = W1(r, n), r) {
              case "dialog":
                Je("cancel", t), Je("close", t), i = n;
                break;
              case "iframe":
              case "object":
              case "embed":
                Je("load", t), i = n;
                break;
              case "video":
              case "audio":
                for (i = 0; i < Dl.length; i++)
                  Je(Dl[i], t);
                i = n;
                break;
              case "source":
                Je("error", t), i = n;
                break;
              case "img":
              case "image":
              case "link":
                Je(
                  "error",
                  t
                ), Je("load", t), i = n;
                break;
              case "details":
                Je("toggle", t), i = n;
                break;
              case "input":
                j4(t, n), i = H1(t, n), Je("invalid", t);
                break;
              case "option":
                i = n;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!n.multiple }, i = pt({}, n, { value: void 0 }), Je("invalid", t);
                break;
              case "textarea":
                q4(t, n), i = V1(t, n), Je("invalid", t);
                break;
              default:
                i = n;
            }
            G1(r, i), s = i;
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var l = s[o];
                o === "style" ? Q7(t, l) : o === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null && G7(t, l)) : o === "children" ? typeof l == "string" ? (r !== "textarea" || l !== "") && cu(t, l) : typeof l == "number" && cu(t, "" + l) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (uu.hasOwnProperty(o) ? l != null && o === "onScroll" && Je("scroll", t) : l != null && ig(t, o, l, a));
              }
            switch (r) {
              case "input":
                R0(t), V4(t, n, !1);
                break;
              case "textarea":
                R0(t), G4(t);
                break;
              case "option":
                n.value != null && t.setAttribute("value", "" + bo(n.value));
                break;
              case "select":
                t.multiple = !!n.multiple, o = n.value, o != null ? ts(t, !!n.multiple, o, !1) : n.defaultValue != null && ts(
                  t,
                  !!n.multiple,
                  n.defaultValue,
                  !0
                );
                break;
              default:
                typeof i.onClick == "function" && (t.onclick = cf);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (e.flags |= 4);
        }
        e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
      }
      return ar(e), null;
    case 6:
      if (t && e.stateNode != null)
        y8(t, e, t.memoizedProps, n);
      else {
        if (typeof n != "string" && e.stateNode === null)
          throw Error(V(166));
        if (r = ta(wu.current), ta(Yn.current), U0(e)) {
          if (n = e.stateNode, r = e.memoizedProps, n[Wn] = e, (o = n.nodeValue !== r) && (t = Qr, t !== null))
            switch (t.tag) {
              case 3:
                H0(n.nodeValue, r, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 && H0(n.nodeValue, r, (t.mode & 1) !== 0);
            }
          o && (e.flags |= 4);
        } else
          n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n), n[Wn] = e, e.stateNode = n;
      }
      return ar(e), null;
    case 13:
      if (tt(ct), n = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (ot && Wr !== null && (e.mode & 1) !== 0 && (e.flags & 128) === 0)
          I6(), bs(), e.flags |= 98560, o = !1;
        else if (o = U0(e), n !== null && n.dehydrated !== null) {
          if (t === null) {
            if (!o)
              throw Error(V(318));
            if (o = e.memoizedState, o = o !== null ? o.dehydrated : null, !o)
              throw Error(V(317));
            o[Wn] = e;
          } else
            bs(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
          ar(e), o = !1;
        } else
          Mn !== null && (Np(Mn), Mn = null), o = !0;
        if (!o)
          return e.flags & 65536 ? e : null;
      }
      return (e.flags & 128) !== 0 ? (e.lanes = r, e) : (n = n !== null, n !== (t !== null && t.memoizedState !== null) && n && (e.child.flags |= 8192, (e.mode & 1) !== 0 && (t === null || (ct.current & 1) !== 0 ? Rt === 0 && (Rt = 3) : zg())), e.updateQueue !== null && (e.flags |= 4), ar(e), null);
    case 4:
      return Es(), xp(t, e), t === null && vu(e.stateNode.containerInfo), ar(e), null;
    case 10:
      return Sg(e.type._context), ar(e), null;
    case 17:
      return Rr(e.type) && ff(), ar(e), null;
    case 19:
      if (tt(ct), o = e.memoizedState, o === null)
        return ar(e), null;
      if (n = (e.flags & 128) !== 0, a = o.rendering, a === null)
        if (n)
          dl(o, !1);
        else {
          if (Rt !== 0 || t !== null && (t.flags & 128) !== 0)
            for (t = e.child; t !== null; ) {
              if (a = yf(t), a !== null) {
                for (e.flags |= 128, dl(o, !1), n = a.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), e.subtreeFlags = 0, n = r, r = e.child; r !== null; )
                  o = r, t = n, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = t, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, t = a.dependencies, o.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), r = r.sibling;
                return Ye(ct, ct.current & 1 | 2), e.child;
              }
              t = t.sibling;
            }
          o.tail !== null && wt() > _s && (e.flags |= 128, n = !0, dl(o, !1), e.lanes = 4194304);
        }
      else {
        if (!n)
          if (t = yf(a), t !== null) {
            if (e.flags |= 128, n = !0, r = t.updateQueue, r !== null && (e.updateQueue = r, e.flags |= 4), dl(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !ot)
              return ar(e), null;
          } else
            2 * wt() - o.renderingStartTime > _s && r !== 1073741824 && (e.flags |= 128, n = !0, dl(o, !1), e.lanes = 4194304);
        o.isBackwards ? (a.sibling = e.child, e.child = a) : (r = o.last, r !== null ? r.sibling = a : e.child = a, o.last = a);
      }
      return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = wt(), e.sibling = null, r = ct.current, Ye(ct, n ? r & 1 | 2 : r & 1), e) : (ar(e), null);
    case 22:
    case 23:
      return Bg(), n = e.memoizedState !== null, t !== null && t.memoizedState !== null !== n && (e.flags |= 8192), n && (e.mode & 1) !== 0 ? (Hr & 1073741824) !== 0 && (ar(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ar(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(V(156, e.tag));
}
function BC(t, e) {
  switch (xg(e), e.tag) {
    case 1:
      return Rr(e.type) && ff(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return Es(), tt(Mr), tt(hr), Dg(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return Ng(e), null;
    case 13:
      if (tt(ct), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null)
          throw Error(V(340));
        bs();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return tt(ct), null;
    case 4:
      return Es(), null;
    case 10:
      return Sg(e.type._context), null;
    case 22:
    case 23:
      return Bg(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var q0 = !1, ur = !1, zC = typeof WeakSet == "function" ? WeakSet : Set, re = null;
function Qa(t, e) {
  var r = t.ref;
  if (r !== null)
    if (typeof r == "function")
      try {
        r(null);
      } catch (n) {
        gt(t, e, n);
      }
    else
      r.current = null;
}
function bp(t, e, r) {
  try {
    r();
  } catch (n) {
    gt(t, e, n);
  }
}
var I2 = !1;
function HC(t, e) {
  if (np = sf, t = E6(), vg(t)) {
    if ("selectionStart" in t)
      var r = { start: t.selectionStart, end: t.selectionEnd };
    else
      e: {
        r = (r = t.ownerDocument) && r.defaultView || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var i = n.anchorOffset, o = n.focusNode;
          n = n.focusOffset;
          try {
            r.nodeType, o.nodeType;
          } catch {
            r = null;
            break e;
          }
          var a = 0, s = -1, l = -1, u = 0, c = 0, f = t, d = null;
          t:
            for (; ; ) {
              for (var h; f !== r || i !== 0 && f.nodeType !== 3 || (s = a + i), f !== o || n !== 0 && f.nodeType !== 3 || (l = a + n), f.nodeType === 3 && (a += f.nodeValue.length), (h = f.firstChild) !== null; )
                d = f, f = h;
              for (; ; ) {
                if (f === t)
                  break t;
                if (d === r && ++u === i && (s = a), d === o && ++c === n && (l = a), (h = f.nextSibling) !== null)
                  break;
                f = d, d = f.parentNode;
              }
              f = h;
            }
          r = s === -1 || l === -1 ? null : { start: s, end: l };
        } else
          r = null;
      }
    r = r || { start: 0, end: 0 };
  } else
    r = null;
  for (ip = { focusedElem: t, selectionRange: r }, sf = !1, re = e; re !== null; )
    if (e = re, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
      t.return = e, re = t;
    else
      for (; re !== null; ) {
        e = re;
        try {
          var m = e.alternate;
          if ((e.flags & 1024) !== 0)
            switch (e.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (m !== null) {
                  var g = m.memoizedProps, S = m.memoizedState, b = e.stateNode, x = b.getSnapshotBeforeUpdate(e.elementType === e.type ? g : kn(e.type, g), S);
                  b.__reactInternalSnapshotBeforeUpdate = x;
                }
                break;
              case 3:
                var v = e.stateNode.containerInfo;
                v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(V(163));
            }
        } catch (w) {
          gt(e, e.return, w);
        }
        if (t = e.sibling, t !== null) {
          t.return = e.return, re = t;
          break;
        }
        re = e.return;
      }
  return m = I2, I2 = !1, m;
}
function jl(t, e, r) {
  var n = e.updateQueue;
  if (n = n !== null ? n.lastEffect : null, n !== null) {
    var i = n = n.next;
    do {
      if ((i.tag & t) === t) {
        var o = i.destroy;
        i.destroy = void 0, o !== void 0 && bp(e, r, o);
      }
      i = i.next;
    } while (i !== n);
  }
}
function cd(t, e) {
  if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
    var r = e = e.next;
    do {
      if ((r.tag & t) === t) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== e);
  }
}
function wp(t) {
  var e = t.ref;
  if (e !== null) {
    var r = t.stateNode;
    switch (t.tag) {
      case 5:
        t = r;
        break;
      default:
        t = r;
    }
    typeof e == "function" ? e(t) : e.current = t;
  }
}
function x8(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, x8(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[Wn], delete e[xu], delete e[sp], delete e[SC], delete e[_C])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function b8(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function P2(t) {
  e:
    for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || b8(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.flags & 2 || t.child === null || t.tag === 4)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2))
        return t.stateNode;
    }
}
function Ep(t, e, r) {
  var n = t.tag;
  if (n === 5 || n === 6)
    t = t.stateNode, e ? r.nodeType === 8 ? r.parentNode.insertBefore(t, e) : r.insertBefore(t, e) : (r.nodeType === 8 ? (e = r.parentNode, e.insertBefore(t, r)) : (e = r, e.appendChild(t)), r = r._reactRootContainer, r != null || e.onclick !== null || (e.onclick = cf));
  else if (n !== 4 && (t = t.child, t !== null))
    for (Ep(t, e, r), t = t.sibling; t !== null; )
      Ep(t, e, r), t = t.sibling;
}
function Sp(t, e, r) {
  var n = t.tag;
  if (n === 5 || n === 6)
    t = t.stateNode, e ? r.insertBefore(t, e) : r.appendChild(t);
  else if (n !== 4 && (t = t.child, t !== null))
    for (Sp(t, e, r), t = t.sibling; t !== null; )
      Sp(t, e, r), t = t.sibling;
}
var Yt = null, On = !1;
function Hi(t, e, r) {
  for (r = r.child; r !== null; )
    w8(t, e, r), r = r.sibling;
}
function w8(t, e, r) {
  if (Kn && typeof Kn.onCommitFiberUnmount == "function")
    try {
      Kn.onCommitFiberUnmount(rd, r);
    } catch {
    }
  switch (r.tag) {
    case 5:
      ur || Qa(r, e);
    case 6:
      var n = Yt, i = On;
      Yt = null, Hi(t, e, r), Yt = n, On = i, Yt !== null && (On ? (t = Yt, r = r.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(r) : t.removeChild(r)) : Yt.removeChild(r.stateNode));
      break;
    case 18:
      Yt !== null && (On ? (t = Yt, r = r.stateNode, t.nodeType === 8 ? kh(t.parentNode, r) : t.nodeType === 1 && kh(t, r), pu(t)) : kh(Yt, r.stateNode));
      break;
    case 4:
      n = Yt, i = On, Yt = r.stateNode.containerInfo, On = !0, Hi(t, e, r), Yt = n, On = i;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ur && (n = r.updateQueue, n !== null && (n = n.lastEffect, n !== null))) {
        i = n = n.next;
        do {
          var o = i, a = o.destroy;
          o = o.tag, a !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && bp(r, e, a), i = i.next;
        } while (i !== n);
      }
      Hi(t, e, r);
      break;
    case 1:
      if (!ur && (Qa(r, e), n = r.stateNode, typeof n.componentWillUnmount == "function"))
        try {
          n.props = r.memoizedProps, n.state = r.memoizedState, n.componentWillUnmount();
        } catch (s) {
          gt(r, e, s);
        }
      Hi(t, e, r);
      break;
    case 21:
      Hi(t, e, r);
      break;
    case 22:
      r.mode & 1 ? (ur = (n = ur) || r.memoizedState !== null, Hi(t, e, r), ur = n) : Hi(t, e, r);
      break;
    default:
      Hi(t, e, r);
  }
}
function $2(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var r = t.stateNode;
    r === null && (r = t.stateNode = new zC()), e.forEach(function(n) {
      var i = YC.bind(null, t, n);
      r.has(n) || (r.add(n), n.then(i, i));
    });
  }
}
function Cn(t, e) {
  var r = e.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var i = r[n];
      try {
        var o = t, a = e, s = a;
        e:
          for (; s !== null; ) {
            switch (s.tag) {
              case 5:
                Yt = s.stateNode, On = !1;
                break e;
              case 3:
                Yt = s.stateNode.containerInfo, On = !0;
                break e;
              case 4:
                Yt = s.stateNode.containerInfo, On = !0;
                break e;
            }
            s = s.return;
          }
        if (Yt === null)
          throw Error(V(160));
        w8(o, a, i), Yt = null, On = !1;
        var l = i.alternate;
        l !== null && (l.return = null), i.return = null;
      } catch (u) {
        gt(i, e, u);
      }
    }
  if (e.subtreeFlags & 12854)
    for (e = e.child; e !== null; )
      E8(e, t), e = e.sibling;
}
function E8(t, e) {
  var r = t.alternate, n = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Cn(e, t), zn(t), n & 4) {
        try {
          jl(3, t, t.return), cd(3, t);
        } catch (g) {
          gt(t, t.return, g);
        }
        try {
          jl(5, t, t.return);
        } catch (g) {
          gt(t, t.return, g);
        }
      }
      break;
    case 1:
      Cn(e, t), zn(t), n & 512 && r !== null && Qa(r, r.return);
      break;
    case 5:
      if (Cn(e, t), zn(t), n & 512 && r !== null && Qa(r, r.return), t.flags & 32) {
        var i = t.stateNode;
        try {
          cu(i, "");
        } catch (g) {
          gt(t, t.return, g);
        }
      }
      if (n & 4 && (i = t.stateNode, i != null)) {
        var o = t.memoizedProps, a = r !== null ? r.memoizedProps : o, s = t.type, l = t.updateQueue;
        if (t.updateQueue = null, l !== null)
          try {
            s === "input" && o.type === "radio" && o.name != null && j7(i, o), W1(s, a);
            var u = W1(s, o);
            for (a = 0; a < l.length; a += 2) {
              var c = l[a], f = l[a + 1];
              c === "style" ? Q7(i, f) : c === "dangerouslySetInnerHTML" ? G7(i, f) : c === "children" ? cu(i, f) : ig(i, c, f, u);
            }
            switch (s) {
              case "input":
                U1(i, o);
                break;
              case "textarea":
                V7(i, o);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!o.multiple;
                var h = o.value;
                h != null ? ts(i, !!o.multiple, h, !1) : d !== !!o.multiple && (o.defaultValue != null ? ts(
                  i,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : ts(i, !!o.multiple, o.multiple ? [] : "", !1));
            }
            i[xu] = o;
          } catch (g) {
            gt(t, t.return, g);
          }
      }
      break;
    case 6:
      if (Cn(e, t), zn(t), n & 4) {
        if (t.stateNode === null)
          throw Error(V(162));
        i = t.stateNode, o = t.memoizedProps;
        try {
          i.nodeValue = o;
        } catch (g) {
          gt(t, t.return, g);
        }
      }
      break;
    case 3:
      if (Cn(e, t), zn(t), n & 4 && r !== null && r.memoizedState.isDehydrated)
        try {
          pu(e.containerInfo);
        } catch (g) {
          gt(t, t.return, g);
        }
      break;
    case 4:
      Cn(e, t), zn(t);
      break;
    case 13:
      Cn(e, t), zn(t), i = t.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || ($g = wt())), n & 4 && $2(t);
      break;
    case 22:
      if (c = r !== null && r.memoizedState !== null, t.mode & 1 ? (ur = (u = ur) || c, Cn(e, t), ur = u) : Cn(e, t), zn(t), n & 8192) {
        if (u = t.memoizedState !== null, (t.stateNode.isHidden = u) && !c && (t.mode & 1) !== 0)
          for (re = t, c = t.child; c !== null; ) {
            for (f = re = c; re !== null; ) {
              switch (d = re, h = d.child, d.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  jl(4, d, d.return);
                  break;
                case 1:
                  Qa(d, d.return);
                  var m = d.stateNode;
                  if (typeof m.componentWillUnmount == "function") {
                    n = d, r = d.return;
                    try {
                      e = n, m.props = e.memoizedProps, m.state = e.memoizedState, m.componentWillUnmount();
                    } catch (g) {
                      gt(n, r, g);
                    }
                  }
                  break;
                case 5:
                  Qa(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    B2(f);
                    continue;
                  }
              }
              h !== null ? (h.return = d, re = h) : B2(f);
            }
            c = c.sibling;
          }
        e:
          for (c = null, f = t; ; ) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  i = f.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = f.stateNode, l = f.memoizedProps.style, a = l != null && l.hasOwnProperty("display") ? l.display : null, s.style.display = W7("display", a));
                } catch (g) {
                  gt(t, t.return, g);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (g) {
                  gt(t, t.return, g);
                }
            } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === t) && f.child !== null) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === t)
              break e;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === t)
                break e;
              c === f && (c = null), f = f.return;
            }
            c === f && (c = null), f.sibling.return = f.return, f = f.sibling;
          }
      }
      break;
    case 19:
      Cn(e, t), zn(t), n & 4 && $2(t);
      break;
    case 21:
      break;
    default:
      Cn(
        e,
        t
      ), zn(t);
  }
}
function zn(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var r = t.return; r !== null; ) {
          if (b8(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(V(160));
      }
      switch (n.tag) {
        case 5:
          var i = n.stateNode;
          n.flags & 32 && (cu(i, ""), n.flags &= -33);
          var o = P2(t);
          Sp(t, o, i);
          break;
        case 3:
        case 4:
          var a = n.stateNode.containerInfo, s = P2(t);
          Ep(t, s, a);
          break;
        default:
          throw Error(V(161));
      }
    } catch (l) {
      gt(t, t.return, l);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function UC(t, e, r) {
  re = t, S8(t);
}
function S8(t, e, r) {
  for (var n = (t.mode & 1) !== 0; re !== null; ) {
    var i = re, o = i.child;
    if (i.tag === 22 && n) {
      var a = i.memoizedState !== null || q0;
      if (!a) {
        var s = i.alternate, l = s !== null && s.memoizedState !== null || ur;
        s = q0;
        var u = ur;
        if (q0 = a, (ur = l) && !u)
          for (re = i; re !== null; )
            a = re, l = a.child, a.tag === 22 && a.memoizedState !== null ? z2(i) : l !== null ? (l.return = a, re = l) : z2(i);
        for (; o !== null; )
          re = o, S8(o), o = o.sibling;
        re = i, q0 = s, ur = u;
      }
      F2(t);
    } else
      (i.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = i, re = o) : F2(t);
  }
}
function F2(t) {
  for (; re !== null; ) {
    var e = re;
    if ((e.flags & 8772) !== 0) {
      var r = e.alternate;
      try {
        if ((e.flags & 8772) !== 0)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              ur || cd(5, e);
              break;
            case 1:
              var n = e.stateNode;
              if (e.flags & 4 && !ur)
                if (r === null)
                  n.componentDidMount();
                else {
                  var i = e.elementType === e.type ? r.memoizedProps : kn(e.type, r.memoizedProps);
                  n.componentDidUpdate(i, r.memoizedState, n.__reactInternalSnapshotBeforeUpdate);
                }
              var o = e.updateQueue;
              o !== null && w2(e, o, n);
              break;
            case 3:
              var a = e.updateQueue;
              if (a !== null) {
                if (r = null, e.child !== null)
                  switch (e.child.tag) {
                    case 5:
                      r = e.child.stateNode;
                      break;
                    case 1:
                      r = e.child.stateNode;
                  }
                w2(e, a, r);
              }
              break;
            case 5:
              var s = e.stateNode;
              if (r === null && e.flags & 4) {
                r = s;
                var l = e.memoizedProps;
                switch (e.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && r.focus();
                    break;
                  case "img":
                    l.src && (r.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (e.memoizedState === null) {
                var u = e.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && pu(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(V(163));
          }
        ur || e.flags & 512 && wp(e);
      } catch (d) {
        gt(e, e.return, d);
      }
    }
    if (e === t) {
      re = null;
      break;
    }
    if (r = e.sibling, r !== null) {
      r.return = e.return, re = r;
      break;
    }
    re = e.return;
  }
}
function B2(t) {
  for (; re !== null; ) {
    var e = re;
    if (e === t) {
      re = null;
      break;
    }
    var r = e.sibling;
    if (r !== null) {
      r.return = e.return, re = r;
      break;
    }
    re = e.return;
  }
}
function z2(t) {
  for (; re !== null; ) {
    var e = re;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var r = e.return;
          try {
            cd(4, e);
          } catch (l) {
            gt(e, r, l);
          }
          break;
        case 1:
          var n = e.stateNode;
          if (typeof n.componentDidMount == "function") {
            var i = e.return;
            try {
              n.componentDidMount();
            } catch (l) {
              gt(e, i, l);
            }
          }
          var o = e.return;
          try {
            wp(e);
          } catch (l) {
            gt(e, o, l);
          }
          break;
        case 5:
          var a = e.return;
          try {
            wp(e);
          } catch (l) {
            gt(e, a, l);
          }
      }
    } catch (l) {
      gt(e, e.return, l);
    }
    if (e === t) {
      re = null;
      break;
    }
    var s = e.sibling;
    if (s !== null) {
      s.return = e.return, re = s;
      break;
    }
    re = e.return;
  }
}
var jC = Math.ceil, wf = $i.ReactCurrentDispatcher, Ig = $i.ReactCurrentOwner, pn = $i.ReactCurrentBatchConfig, Le = 0, Gt = null, kt = null, Jt = 0, Hr = 0, Ka = Oo(0), Rt = 0, Cu = null, ha = 0, fd = 0, Pg = 0, Vl = null, kr = null, $g = 0, _s = 1 / 0, mi = null, Ef = !1, _p = null, ho = null, G0 = !1, to = null, Sf = 0, ql = 0, Cp = null, Nc = -1, Dc = 0;
function wr() {
  return (Le & 6) !== 0 ? wt() : Nc !== -1 ? Nc : Nc = wt();
}
function po(t) {
  return (t.mode & 1) === 0 ? 1 : (Le & 2) !== 0 && Jt !== 0 ? Jt & -Jt : TC.transition !== null ? (Dc === 0 && (Dc = a6()), Dc) : (t = Ue, t !== 0 || (t = window.event, t = t === void 0 ? 16 : h6(t.type)), t);
}
function Ln(t, e, r, n) {
  if (50 < ql)
    throw ql = 0, Cp = null, Error(V(185));
  Ju(t, r, n), ((Le & 2) === 0 || t !== Gt) && (t === Gt && ((Le & 2) === 0 && (fd |= r), Rt === 4 && Zi(t, Jt)), Lr(t, n), r === 1 && Le === 0 && (e.mode & 1) === 0 && (_s = wt() + 500, sd && Ao()));
}
function Lr(t, e) {
  var r = t.callbackNode;
  T_(t, e);
  var n = af(t, t === Gt ? Jt : 0);
  if (n === 0)
    r !== null && K4(r), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = n & -n, t.callbackPriority !== e) {
    if (r != null && K4(r), e === 1)
      t.tag === 0 ? CC(H2.bind(null, t)) : M6(H2.bind(null, t)), wC(function() {
        (Le & 6) === 0 && Ao();
      }), r = null;
    else {
      switch (s6(n)) {
        case 1:
          r = ug;
          break;
        case 4:
          r = i6;
          break;
        case 16:
          r = of;
          break;
        case 536870912:
          r = o6;
          break;
        default:
          r = of;
      }
      r = A8(r, _8.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = r;
  }
}
function _8(t, e) {
  if (Nc = -1, Dc = 0, (Le & 6) !== 0)
    throw Error(V(327));
  var r = t.callbackNode;
  if (as() && t.callbackNode !== r)
    return null;
  var n = af(t, t === Gt ? Jt : 0);
  if (n === 0)
    return null;
  if ((n & 30) !== 0 || (n & t.expiredLanes) !== 0 || e)
    e = _f(t, n);
  else {
    e = n;
    var i = Le;
    Le |= 2;
    var o = T8();
    (Gt !== t || Jt !== e) && (mi = null, _s = wt() + 500, ra(t, e));
    do
      try {
        GC();
        break;
      } catch (s) {
        C8(t, s);
      }
    while (1);
    Eg(), wf.current = o, Le = i, kt !== null ? e = 0 : (Gt = null, Jt = 0, e = Rt);
  }
  if (e !== 0) {
    if (e === 2 && (i = Z1(t), i !== 0 && (n = i, e = Tp(t, i))), e === 1)
      throw r = Cu, ra(t, 0), Zi(t, n), Lr(t, wt()), r;
    if (e === 6)
      Zi(t, n);
    else {
      if (i = t.current.alternate, (n & 30) === 0 && !VC(i) && (e = _f(t, n), e === 2 && (o = Z1(t), o !== 0 && (n = o, e = Tp(t, o))), e === 1))
        throw r = Cu, ra(t, 0), Zi(t, n), Lr(t, wt()), r;
      switch (t.finishedWork = i, t.finishedLanes = n, e) {
        case 0:
        case 1:
          throw Error(V(345));
        case 2:
          Qo(t, kr, mi);
          break;
        case 3:
          if (Zi(t, n), (n & 130023424) === n && (e = $g + 500 - wt(), 10 < e)) {
            if (af(t, 0) !== 0)
              break;
            if (i = t.suspendedLanes, (i & n) !== n) {
              wr(), t.pingedLanes |= t.suspendedLanes & i;
              break;
            }
            t.timeoutHandle = ap(Qo.bind(null, t, kr, mi), e);
            break;
          }
          Qo(t, kr, mi);
          break;
        case 4:
          if (Zi(t, n), (n & 4194240) === n)
            break;
          for (e = t.eventTimes, i = -1; 0 < n; ) {
            var a = 31 - Rn(n);
            o = 1 << a, a = e[a], a > i && (i = a), n &= ~o;
          }
          if (n = i, n = wt() - n, n = (120 > n ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * jC(n / 1960)) - n, 10 < n) {
            t.timeoutHandle = ap(Qo.bind(null, t, kr, mi), n);
            break;
          }
          Qo(t, kr, mi);
          break;
        case 5:
          Qo(t, kr, mi);
          break;
        default:
          throw Error(V(329));
      }
    }
  }
  return Lr(t, wt()), t.callbackNode === r ? _8.bind(null, t) : null;
}
function Tp(t, e) {
  var r = Vl;
  return t.current.memoizedState.isDehydrated && (ra(t, e).flags |= 256), t = _f(t, e), t !== 2 && (e = kr, kr = r, e !== null && Np(e)), t;
}
function Np(t) {
  kr === null ? kr = t : kr.push.apply(kr, t);
}
function VC(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var r = e.updateQueue;
      if (r !== null && (r = r.stores, r !== null))
        for (var n = 0; n < r.length; n++) {
          var i = r[n], o = i.getSnapshot;
          i = i.value;
          try {
            if (!Pn(o(), i))
              return !1;
          } catch {
            return !1;
          }
        }
    }
    if (r = e.child, e.subtreeFlags & 16384 && r !== null)
      r.return = e, e = r;
    else {
      if (e === t)
        break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t)
          return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function Zi(t, e) {
  for (e &= ~Pg, e &= ~fd, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var r = 31 - Rn(e), n = 1 << r;
    t[r] = -1, e &= ~n;
  }
}
function H2(t) {
  if ((Le & 6) !== 0)
    throw Error(V(327));
  as();
  var e = af(t, 0);
  if ((e & 1) === 0)
    return Lr(t, wt()), null;
  var r = _f(t, e);
  if (t.tag !== 0 && r === 2) {
    var n = Z1(t);
    n !== 0 && (e = n, r = Tp(t, n));
  }
  if (r === 1)
    throw r = Cu, ra(t, 0), Zi(t, e), Lr(t, wt()), r;
  if (r === 6)
    throw Error(V(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, Qo(t, kr, mi), Lr(t, wt()), null;
}
function Fg(t, e) {
  var r = Le;
  Le |= 1;
  try {
    return t(e);
  } finally {
    Le = r, Le === 0 && (_s = wt() + 500, sd && Ao());
  }
}
function pa(t) {
  to !== null && to.tag === 0 && (Le & 6) === 0 && as();
  var e = Le;
  Le |= 1;
  var r = pn.transition, n = Ue;
  try {
    if (pn.transition = null, Ue = 1, t)
      return t();
  } finally {
    Ue = n, pn.transition = r, Le = e, (Le & 6) === 0 && Ao();
  }
}
function Bg() {
  Hr = Ka.current, tt(Ka);
}
function ra(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var r = t.timeoutHandle;
  if (r !== -1 && (t.timeoutHandle = -1, bC(r)), kt !== null)
    for (r = kt.return; r !== null; ) {
      var n = r;
      switch (xg(n), n.tag) {
        case 1:
          n = n.type.childContextTypes, n != null && ff();
          break;
        case 3:
          Es(), tt(Mr), tt(hr), Dg();
          break;
        case 5:
          Ng(n);
          break;
        case 4:
          Es();
          break;
        case 13:
          tt(ct);
          break;
        case 19:
          tt(ct);
          break;
        case 10:
          Sg(n.type._context);
          break;
        case 22:
        case 23:
          Bg();
      }
      r = r.return;
    }
  if (Gt = t, kt = t = mo(t.current, null), Jt = Hr = e, Rt = 0, Cu = null, Pg = fd = ha = 0, kr = Vl = null, ea !== null) {
    for (e = 0; e < ea.length; e++)
      if (r = ea[e], n = r.interleaved, n !== null) {
        r.interleaved = null;
        var i = n.next, o = r.pending;
        if (o !== null) {
          var a = o.next;
          o.next = i, n.next = a;
        }
        r.pending = n;
      }
    ea = null;
  }
  return t;
}
function C8(t, e) {
  do {
    var r = kt;
    try {
      if (Eg(), _c.current = bf, xf) {
        for (var n = ht.memoizedState; n !== null; ) {
          var i = n.queue;
          i !== null && (i.pending = null), n = n.next;
        }
        xf = !1;
      }
      if (da = 0, jt = Mt = ht = null, Ul = !1, Eu = 0, Ig.current = null, r === null || r.return === null) {
        Rt = 1, Cu = e, kt = null;
        break;
      }
      e: {
        var o = t, a = r.return, s = r, l = e;
        if (e = Jt, s.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
          var u = l, c = s, f = c.tag;
          if ((c.mode & 1) === 0 && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d ? (c.updateQueue = d.updateQueue, c.memoizedState = d.memoizedState, c.lanes = d.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var h = D2(a);
          if (h !== null) {
            h.flags &= -257, k2(h, a, s, o, e), h.mode & 1 && N2(o, u, e), e = h, l = u;
            var m = e.updateQueue;
            if (m === null) {
              var g = /* @__PURE__ */ new Set();
              g.add(l), e.updateQueue = g;
            } else
              m.add(l);
            break e;
          } else {
            if ((e & 1) === 0) {
              N2(o, u, e), zg();
              break e;
            }
            l = Error(V(426));
          }
        } else if (ot && s.mode & 1) {
          var S = D2(a);
          if (S !== null) {
            (S.flags & 65536) === 0 && (S.flags |= 256), k2(S, a, s, o, e), bg(Ss(l, s));
            break e;
          }
        }
        o = l = Ss(l, s), Rt !== 4 && (Rt = 2), Vl === null ? Vl = [o] : Vl.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, e &= -e, o.lanes |= e;
              var b = l8(o, l, e);
              b2(o, b);
              break e;
            case 1:
              s = l;
              var x = o.type, v = o.stateNode;
              if ((o.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (ho === null || !ho.has(v)))) {
                o.flags |= 65536, e &= -e, o.lanes |= e;
                var w = u8(o, s, e);
                b2(o, w);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      D8(r);
    } catch (_) {
      e = _, kt === r && r !== null && (kt = r = r.return);
      continue;
    }
    break;
  } while (1);
}
function T8() {
  var t = wf.current;
  return wf.current = bf, t === null ? bf : t;
}
function zg() {
  (Rt === 0 || Rt === 3 || Rt === 2) && (Rt = 4), Gt === null || (ha & 268435455) === 0 && (fd & 268435455) === 0 || Zi(Gt, Jt);
}
function _f(t, e) {
  var r = Le;
  Le |= 2;
  var n = T8();
  (Gt !== t || Jt !== e) && (mi = null, ra(t, e));
  do
    try {
      qC();
      break;
    } catch (i) {
      C8(t, i);
    }
  while (1);
  if (Eg(), Le = r, wf.current = n, kt !== null)
    throw Error(V(261));
  return Gt = null, Jt = 0, Rt;
}
function qC() {
  for (; kt !== null; )
    N8(kt);
}
function GC() {
  for (; kt !== null && !v_(); )
    N8(kt);
}
function N8(t) {
  var e = O8(t.alternate, t, Hr);
  t.memoizedProps = t.pendingProps, e === null ? D8(t) : kt = e, Ig.current = null;
}
function D8(t) {
  var e = t;
  do {
    var r = e.alternate;
    if (t = e.return, (e.flags & 32768) === 0) {
      if (r = FC(r, e, Hr), r !== null) {
        kt = r;
        return;
      }
    } else {
      if (r = BC(r, e), r !== null) {
        r.flags &= 32767, kt = r;
        return;
      }
      if (t !== null)
        t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        Rt = 6, kt = null;
        return;
      }
    }
    if (e = e.sibling, e !== null) {
      kt = e;
      return;
    }
    kt = e = t;
  } while (e !== null);
  Rt === 0 && (Rt = 5);
}
function Qo(t, e, r) {
  var n = Ue, i = pn.transition;
  try {
    pn.transition = null, Ue = 1, WC(t, e, r, n);
  } finally {
    pn.transition = i, Ue = n;
  }
  return null;
}
function WC(t, e, r, n) {
  do
    as();
  while (to !== null);
  if ((Le & 6) !== 0)
    throw Error(V(327));
  r = t.finishedWork;
  var i = t.finishedLanes;
  if (r === null)
    return null;
  if (t.finishedWork = null, t.finishedLanes = 0, r === t.current)
    throw Error(V(177));
  t.callbackNode = null, t.callbackPriority = 0;
  var o = r.lanes | r.childLanes;
  if (N_(t, o), t === Gt && (kt = Gt = null, Jt = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || G0 || (G0 = !0, A8(of, function() {
    return as(), null;
  })), o = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || o) {
    o = pn.transition, pn.transition = null;
    var a = Ue;
    Ue = 1;
    var s = Le;
    Le |= 4, Ig.current = null, HC(t, r), E8(r, t), hC(ip), sf = !!np, ip = np = null, t.current = r, UC(r), y_(), Le = s, Ue = a, pn.transition = o;
  } else
    t.current = r;
  if (G0 && (G0 = !1, to = t, Sf = i), o = t.pendingLanes, o === 0 && (ho = null), w_(r.stateNode), Lr(t, wt()), e !== null)
    for (n = t.onRecoverableError, r = 0; r < e.length; r++)
      i = e[r], n(i.value, { componentStack: i.stack, digest: i.digest });
  if (Ef)
    throw Ef = !1, t = _p, _p = null, t;
  return (Sf & 1) !== 0 && t.tag !== 0 && as(), o = t.pendingLanes, (o & 1) !== 0 ? t === Cp ? ql++ : (ql = 0, Cp = t) : ql = 0, Ao(), null;
}
function as() {
  if (to !== null) {
    var t = s6(Sf), e = pn.transition, r = Ue;
    try {
      if (pn.transition = null, Ue = 16 > t ? 16 : t, to === null)
        var n = !1;
      else {
        if (t = to, to = null, Sf = 0, (Le & 6) !== 0)
          throw Error(V(331));
        var i = Le;
        for (Le |= 4, re = t.current; re !== null; ) {
          var o = re, a = o.child;
          if ((re.flags & 16) !== 0) {
            var s = o.deletions;
            if (s !== null) {
              for (var l = 0; l < s.length; l++) {
                var u = s[l];
                for (re = u; re !== null; ) {
                  var c = re;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      jl(8, c, o);
                  }
                  var f = c.child;
                  if (f !== null)
                    f.return = c, re = f;
                  else
                    for (; re !== null; ) {
                      c = re;
                      var d = c.sibling, h = c.return;
                      if (x8(c), c === u) {
                        re = null;
                        break;
                      }
                      if (d !== null) {
                        d.return = h, re = d;
                        break;
                      }
                      re = h;
                    }
                }
              }
              var m = o.alternate;
              if (m !== null) {
                var g = m.child;
                if (g !== null) {
                  m.child = null;
                  do {
                    var S = g.sibling;
                    g.sibling = null, g = S;
                  } while (g !== null);
                }
              }
              re = o;
            }
          }
          if ((o.subtreeFlags & 2064) !== 0 && a !== null)
            a.return = o, re = a;
          else
            e:
              for (; re !== null; ) {
                if (o = re, (o.flags & 2048) !== 0)
                  switch (o.tag) {
                    case 0:
                    case 11:
                    case 15:
                      jl(9, o, o.return);
                  }
                var b = o.sibling;
                if (b !== null) {
                  b.return = o.return, re = b;
                  break e;
                }
                re = o.return;
              }
        }
        var x = t.current;
        for (re = x; re !== null; ) {
          a = re;
          var v = a.child;
          if ((a.subtreeFlags & 2064) !== 0 && v !== null)
            v.return = a, re = v;
          else
            e:
              for (a = x; re !== null; ) {
                if (s = re, (s.flags & 2048) !== 0)
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        cd(9, s);
                    }
                  } catch (_) {
                    gt(s, s.return, _);
                  }
                if (s === a) {
                  re = null;
                  break e;
                }
                var w = s.sibling;
                if (w !== null) {
                  w.return = s.return, re = w;
                  break e;
                }
                re = s.return;
              }
        }
        if (Le = i, Ao(), Kn && typeof Kn.onPostCommitFiberRoot == "function")
          try {
            Kn.onPostCommitFiberRoot(rd, t);
          } catch {
          }
        n = !0;
      }
      return n;
    } finally {
      Ue = r, pn.transition = e;
    }
  }
  return !1;
}
function U2(t, e, r) {
  e = Ss(r, e), e = l8(t, e, 1), t = fo(t, e, 1), e = wr(), t !== null && (Ju(t, 1, e), Lr(t, e));
}
function gt(t, e, r) {
  if (t.tag === 3)
    U2(t, t, r);
  else
    for (; e !== null; ) {
      if (e.tag === 3) {
        U2(e, t, r);
        break;
      } else if (e.tag === 1) {
        var n = e.stateNode;
        if (typeof e.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (ho === null || !ho.has(n))) {
          t = Ss(r, t), t = u8(e, t, 1), e = fo(e, t, 1), t = wr(), e !== null && (Ju(e, 1, t), Lr(e, t));
          break;
        }
      }
      e = e.return;
    }
}
function QC(t, e, r) {
  var n = t.pingCache;
  n !== null && n.delete(e), e = wr(), t.pingedLanes |= t.suspendedLanes & r, Gt === t && (Jt & r) === r && (Rt === 4 || Rt === 3 && (Jt & 130023424) === Jt && 500 > wt() - $g ? ra(t, 0) : Pg |= r), Lr(t, e);
}
function k8(t, e) {
  e === 0 && ((t.mode & 1) === 0 ? e = 1 : (e = P0, P0 <<= 1, (P0 & 130023424) === 0 && (P0 = 4194304)));
  var r = wr();
  t = Oi(t, e), t !== null && (Ju(t, e, r), Lr(t, r));
}
function KC(t) {
  var e = t.memoizedState, r = 0;
  e !== null && (r = e.retryLane), k8(t, r);
}
function YC(t, e) {
  var r = 0;
  switch (t.tag) {
    case 13:
      var n = t.stateNode, i = t.memoizedState;
      i !== null && (r = i.retryLane);
      break;
    case 19:
      n = t.stateNode;
      break;
    default:
      throw Error(V(314));
  }
  n !== null && n.delete(e), k8(t, r);
}
var O8;
O8 = function(t, e, r) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps || Mr.current)
      Ar = !0;
    else {
      if ((t.lanes & r) === 0 && (e.flags & 128) === 0)
        return Ar = !1, $C(t, e, r);
      Ar = (t.flags & 131072) !== 0;
    }
  else
    Ar = !1, ot && (e.flags & 1048576) !== 0 && R6(e, pf, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var n = e.type;
      Tc(t, e), t = e.pendingProps;
      var i = xs(e, hr.current);
      os(e, r), i = Og(null, e, n, t, i, r);
      var o = Ag();
      return e.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, Rr(n) ? (o = !0, df(e)) : o = !1, e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, Cg(e), i.updater = ld, e.stateNode = i, i._reactInternals = e, hp(e, n, t, r), e = gp(null, e, n, !0, o, r)) : (e.tag = 0, ot && o && yg(e), gr(null, e, i, r), e = e.child), e;
    case 16:
      n = e.elementType;
      e: {
        switch (Tc(t, e), t = e.pendingProps, i = n._init, n = i(n._payload), e.type = n, i = e.tag = ZC(n), t = kn(n, t), i) {
          case 0:
            e = mp(null, e, n, t, r);
            break e;
          case 1:
            e = M2(null, e, n, t, r);
            break e;
          case 11:
            e = O2(null, e, n, t, r);
            break e;
          case 14:
            e = A2(null, e, n, kn(n.type, t), r);
            break e;
        }
        throw Error(V(
          306,
          n,
          ""
        ));
      }
      return e;
    case 0:
      return n = e.type, i = e.pendingProps, i = e.elementType === n ? i : kn(n, i), mp(t, e, n, i, r);
    case 1:
      return n = e.type, i = e.pendingProps, i = e.elementType === n ? i : kn(n, i), M2(t, e, n, i, r);
    case 3:
      e: {
        if (h8(e), t === null)
          throw Error(V(387));
        n = e.pendingProps, o = e.memoizedState, i = o.element, $6(t, e), vf(e, n, null, r);
        var a = e.memoizedState;
        if (n = a.element, o.isDehydrated)
          if (o = { element: n, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
            i = Ss(Error(V(423)), e), e = R2(t, e, n, r, i);
            break e;
          } else if (n !== i) {
            i = Ss(Error(V(424)), e), e = R2(t, e, n, r, i);
            break e;
          } else
            for (Wr = co(e.stateNode.containerInfo.firstChild), Qr = e, ot = !0, Mn = null, r = H6(e, null, n, r), e.child = r; r; )
              r.flags = r.flags & -3 | 4096, r = r.sibling;
        else {
          if (bs(), n === i) {
            e = Ai(t, e, r);
            break e;
          }
          gr(t, e, n, r);
        }
        e = e.child;
      }
      return e;
    case 5:
      return U6(e), t === null && cp(e), n = e.type, i = e.pendingProps, o = t !== null ? t.memoizedProps : null, a = i.children, op(n, i) ? a = null : o !== null && op(n, o) && (e.flags |= 32), d8(t, e), gr(t, e, a, r), e.child;
    case 6:
      return t === null && cp(e), null;
    case 13:
      return p8(t, e, r);
    case 4:
      return Tg(e, e.stateNode.containerInfo), n = e.pendingProps, t === null ? e.child = ws(e, null, n, r) : gr(t, e, n, r), e.child;
    case 11:
      return n = e.type, i = e.pendingProps, i = e.elementType === n ? i : kn(n, i), O2(t, e, n, i, r);
    case 7:
      return gr(t, e, e.pendingProps, r), e.child;
    case 8:
      return gr(t, e, e.pendingProps.children, r), e.child;
    case 12:
      return gr(t, e, e.pendingProps.children, r), e.child;
    case 10:
      e: {
        if (n = e.type._context, i = e.pendingProps, o = e.memoizedProps, a = i.value, Ye(mf, n._currentValue), n._currentValue = a, o !== null)
          if (Pn(o.value, a)) {
            if (o.children === i.children && !Mr.current) {
              e = Ai(t, e, r);
              break e;
            }
          } else
            for (o = e.child, o !== null && (o.return = e); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                a = o.child;
                for (var l = s.firstContext; l !== null; ) {
                  if (l.context === n) {
                    if (o.tag === 1) {
                      l = _i(-1, r & -r), l.tag = 2;
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null ? l.next = l : (l.next = c.next, c.next = l), u.pending = l;
                      }
                    }
                    o.lanes |= r, l = o.alternate, l !== null && (l.lanes |= r), fp(
                      o.return,
                      r,
                      e
                    ), s.lanes |= r;
                    break;
                  }
                  l = l.next;
                }
              } else if (o.tag === 10)
                a = o.type === e.type ? null : o.child;
              else if (o.tag === 18) {
                if (a = o.return, a === null)
                  throw Error(V(341));
                a.lanes |= r, s = a.alternate, s !== null && (s.lanes |= r), fp(a, r, e), a = o.sibling;
              } else
                a = o.child;
              if (a !== null)
                a.return = o;
              else
                for (a = o; a !== null; ) {
                  if (a === e) {
                    a = null;
                    break;
                  }
                  if (o = a.sibling, o !== null) {
                    o.return = a.return, a = o;
                    break;
                  }
                  a = a.return;
                }
              o = a;
            }
        gr(t, e, i.children, r), e = e.child;
      }
      return e;
    case 9:
      return i = e.type, n = e.pendingProps.children, os(e, r), i = gn(i), n = n(i), e.flags |= 1, gr(t, e, n, r), e.child;
    case 14:
      return n = e.type, i = kn(n, e.pendingProps), i = kn(n.type, i), A2(t, e, n, i, r);
    case 15:
      return c8(t, e, e.type, e.pendingProps, r);
    case 17:
      return n = e.type, i = e.pendingProps, i = e.elementType === n ? i : kn(n, i), Tc(t, e), e.tag = 1, Rr(n) ? (t = !0, df(e)) : t = !1, os(e, r), B6(e, n, i), hp(e, n, i, r), gp(null, e, n, !0, t, r);
    case 19:
      return m8(t, e, r);
    case 22:
      return f8(t, e, r);
  }
  throw Error(V(156, e.tag));
};
function A8(t, e) {
  return n6(t, e);
}
function XC(t, e, r, n) {
  this.tag = t, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function fn(t, e, r, n) {
  return new XC(t, e, r, n);
}
function Hg(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function ZC(t) {
  if (typeof t == "function")
    return Hg(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === ag)
      return 11;
    if (t === sg)
      return 14;
  }
  return 2;
}
function mo(t, e) {
  var r = t.alternate;
  return r === null ? (r = fn(t.tag, e, t.key, t.mode), r.elementType = t.elementType, r.type = t.type, r.stateNode = t.stateNode, r.alternate = t, t.alternate = r) : (r.pendingProps = e, r.type = t.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = t.flags & 14680064, r.childLanes = t.childLanes, r.lanes = t.lanes, r.child = t.child, r.memoizedProps = t.memoizedProps, r.memoizedState = t.memoizedState, r.updateQueue = t.updateQueue, e = t.dependencies, r.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, r.sibling = t.sibling, r.index = t.index, r.ref = t.ref, r;
}
function kc(t, e, r, n, i, o) {
  var a = 2;
  if (n = t, typeof t == "function")
    Hg(t) && (a = 1);
  else if (typeof t == "string")
    a = 5;
  else
    e:
      switch (t) {
        case Ba:
          return na(r.children, i, o, e);
        case og:
          a = 8, i |= 8;
          break;
        case $1:
          return t = fn(12, r, e, i | 2), t.elementType = $1, t.lanes = o, t;
        case F1:
          return t = fn(13, r, e, i), t.elementType = F1, t.lanes = o, t;
        case B1:
          return t = fn(19, r, e, i), t.elementType = B1, t.lanes = o, t;
        case z7:
          return dd(r, i, o, e);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case F7:
                a = 10;
                break e;
              case B7:
                a = 9;
                break e;
              case ag:
                a = 11;
                break e;
              case sg:
                a = 14;
                break e;
              case Gi:
                a = 16, n = null;
                break e;
            }
          throw Error(V(130, t == null ? t : typeof t, ""));
      }
  return e = fn(a, r, e, i), e.elementType = t, e.type = n, e.lanes = o, e;
}
function na(t, e, r, n) {
  return t = fn(7, t, n, e), t.lanes = r, t;
}
function dd(t, e, r, n) {
  return t = fn(22, t, n, e), t.elementType = z7, t.lanes = r, t.stateNode = { isHidden: !1 }, t;
}
function $h(t, e, r) {
  return t = fn(6, t, null, e), t.lanes = r, t;
}
function Fh(t, e, r) {
  return e = fn(4, t.children !== null ? t.children : [], t.key, e), e.lanes = r, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function JC(t, e, r, n, i) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = yh(0), this.expirationTimes = yh(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yh(0), this.identifierPrefix = n, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
}
function Ug(t, e, r, n, i, o, a, s, l) {
  return t = new JC(t, e, r, s, l), e === 1 ? (e = 1, o === !0 && (e |= 8)) : e = 0, o = fn(3, null, null, e), t.current = o, o.stateNode = t, o.memoizedState = { element: n, isDehydrated: r, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Cg(o), t;
}
function eT(t, e, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Fa, key: n == null ? null : "" + n, children: t, containerInfo: e, implementation: r };
}
function M8(t) {
  if (!t)
    return wo;
  t = t._reactInternals;
  e: {
    if (Ca(t) !== t || t.tag !== 1)
      throw Error(V(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (Rr(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(V(171));
  }
  if (t.tag === 1) {
    var r = t.type;
    if (Rr(r))
      return A6(t, r, e);
  }
  return e;
}
function R8(t, e, r, n, i, o, a, s, l) {
  return t = Ug(r, n, !0, t, i, o, a, s, l), t.context = M8(null), r = t.current, n = wr(), i = po(r), o = _i(n, i), o.callback = e != null ? e : null, fo(r, o, i), t.current.lanes = i, Ju(t, i, n), Lr(t, n), t;
}
function hd(t, e, r, n) {
  var i = e.current, o = wr(), a = po(i);
  return r = M8(r), e.context === null ? e.context = r : e.pendingContext = r, e = _i(o, a), e.payload = { element: t }, n = n === void 0 ? null : n, n !== null && (e.callback = n), t = fo(i, e, a), t !== null && (Ln(t, i, a, o), Sc(t, i, a)), a;
}
function Cf(t) {
  if (t = t.current, !t.child)
    return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function j2(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var r = t.retryLane;
    t.retryLane = r !== 0 && r < e ? r : e;
  }
}
function jg(t, e) {
  j2(t, e), (t = t.alternate) && j2(t, e);
}
function tT() {
  return null;
}
var L8 = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Vg(t) {
  this._internalRoot = t;
}
pd.prototype.render = Vg.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null)
    throw Error(V(409));
  hd(t, e, null, null);
};
pd.prototype.unmount = Vg.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    pa(function() {
      hd(null, t, null, null);
    }), e[ki] = null;
  }
};
function pd(t) {
  this._internalRoot = t;
}
pd.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = c6();
    t = { blockedOn: null, target: t, priority: e };
    for (var r = 0; r < Xi.length && e !== 0 && e < Xi[r].priority; r++)
      ;
    Xi.splice(r, 0, t), r === 0 && d6(t);
  }
};
function qg(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function md(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function V2() {
}
function rT(t, e, r, n, i) {
  if (i) {
    if (typeof n == "function") {
      var o = n;
      n = function() {
        var u = Cf(a);
        o.call(u);
      };
    }
    var a = R8(e, n, t, 0, null, !1, !1, "", V2);
    return t._reactRootContainer = a, t[ki] = a.current, vu(t.nodeType === 8 ? t.parentNode : t), pa(), a;
  }
  for (; i = t.lastChild; )
    t.removeChild(i);
  if (typeof n == "function") {
    var s = n;
    n = function() {
      var u = Cf(l);
      s.call(u);
    };
  }
  var l = Ug(t, 0, !1, null, null, !1, !1, "", V2);
  return t._reactRootContainer = l, t[ki] = l.current, vu(t.nodeType === 8 ? t.parentNode : t), pa(function() {
    hd(e, l, r, n);
  }), l;
}
function gd(t, e, r, n, i) {
  var o = r._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof i == "function") {
      var s = i;
      i = function() {
        var l = Cf(a);
        s.call(l);
      };
    }
    hd(e, a, t, i);
  } else
    a = rT(r, e, t, i, n);
  return Cf(a);
}
l6 = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var r = Nl(e.pendingLanes);
        r !== 0 && (cg(e, r | 1), Lr(e, wt()), (Le & 6) === 0 && (_s = wt() + 500, Ao()));
      }
      break;
    case 13:
      pa(function() {
        var n = Oi(t, 1);
        if (n !== null) {
          var i = wr();
          Ln(n, t, 1, i);
        }
      }), jg(t, 1);
  }
};
fg = function(t) {
  if (t.tag === 13) {
    var e = Oi(t, 134217728);
    if (e !== null) {
      var r = wr();
      Ln(e, t, 134217728, r);
    }
    jg(t, 134217728);
  }
};
u6 = function(t) {
  if (t.tag === 13) {
    var e = po(t), r = Oi(t, e);
    if (r !== null) {
      var n = wr();
      Ln(r, t, e, n);
    }
    jg(t, e);
  }
};
c6 = function() {
  return Ue;
};
f6 = function(t, e) {
  var r = Ue;
  try {
    return Ue = t, e();
  } finally {
    Ue = r;
  }
};
K1 = function(t, e, r) {
  switch (e) {
    case "input":
      if (U1(t, r), e = r.name, r.type === "radio" && e != null) {
        for (r = t; r.parentNode; )
          r = r.parentNode;
        for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < r.length; e++) {
          var n = r[e];
          if (n !== t && n.form === t.form) {
            var i = ad(n);
            if (!i)
              throw Error(V(90));
            U7(n), U1(n, i);
          }
        }
      }
      break;
    case "textarea":
      V7(t, r);
      break;
    case "select":
      e = r.value, e != null && ts(t, !!r.multiple, e, !1);
  }
};
X7 = Fg;
Z7 = pa;
var nT = { usingClientEntryPoint: !1, Events: [t0, ja, ad, K7, Y7, Fg] }, hl = { findFiberByHostInstance: Jo, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, iT = { bundleType: hl.bundleType, version: hl.version, rendererPackageName: hl.rendererPackageName, rendererConfig: hl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: $i.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = t6(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: hl.findFiberByHostInstance || tT, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var W0 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!W0.isDisabled && W0.supportsFiber)
    try {
      rd = W0.inject(iT), Kn = W0;
    } catch {
    }
}
Jr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nT;
Jr.createPortal = function(t, e) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!qg(e))
    throw Error(V(200));
  return eT(t, e, null, r);
};
Jr.createRoot = function(t, e) {
  if (!qg(t))
    throw Error(V(299));
  var r = !1, n = "", i = L8;
  return e != null && (e.unstable_strictMode === !0 && (r = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Ug(t, 1, !1, null, null, r, !1, n, i), t[ki] = e.current, vu(t.nodeType === 8 ? t.parentNode : t), new Vg(e);
};
Jr.findDOMNode = function(t) {
  if (t == null)
    return null;
  if (t.nodeType === 1)
    return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(V(188)) : (t = Object.keys(t).join(","), Error(V(268, t)));
  return t = t6(e), t = t === null ? null : t.stateNode, t;
};
Jr.flushSync = function(t) {
  return pa(t);
};
Jr.hydrate = function(t, e, r) {
  if (!md(e))
    throw Error(V(200));
  return gd(null, t, e, !0, r);
};
Jr.hydrateRoot = function(t, e, r) {
  if (!qg(t))
    throw Error(V(405));
  var n = r != null && r.hydratedSources || null, i = !1, o = "", a = L8;
  if (r != null && (r.unstable_strictMode === !0 && (i = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (a = r.onRecoverableError)), e = R8(e, null, t, 1, r != null ? r : null, i, !1, o, a), t[ki] = e.current, vu(t), n)
    for (t = 0; t < n.length; t++)
      r = n[t], i = r._getVersion, i = i(r._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [r, i] : e.mutableSourceEagerHydrationData.push(
        r,
        i
      );
  return new pd(e);
};
Jr.render = function(t, e, r) {
  if (!md(e))
    throw Error(V(200));
  return gd(null, t, e, !1, r);
};
Jr.unmountComponentAtNode = function(t) {
  if (!md(t))
    throw Error(V(40));
  return t._reactRootContainer ? (pa(function() {
    gd(null, null, t, !1, function() {
      t._reactRootContainer = null, t[ki] = null;
    });
  }), !0) : !1;
};
Jr.unstable_batchedUpdates = Fg;
Jr.unstable_renderSubtreeIntoContainer = function(t, e, r, n) {
  if (!md(r))
    throw Error(V(200));
  if (t == null || t._reactInternals === void 0)
    throw Error(V(38));
  return gd(t, e, r, !1, n);
};
Jr.version = "18.2.0-next-9e3b772b8-20220608";
(function(t) {
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (r) {
        console.error(r);
      }
  }
  e(), t.exports = Jr;
})(Do);
var q2 = Do.exports;
I1.createRoot = q2.createRoot, I1.hydrateRoot = q2.hydrateRoot;
var Dp = function(t, e) {
  return Dp = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Dp(t, e);
};
function rt(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Dp(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var O = function() {
  return O = Object.assign || function(e) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, O.apply(this, arguments);
};
function $r(t, e) {
  var r = {};
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(t); i < n.length; i++)
      e.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[i]) && (r[n[i]] = t[n[i]]);
  return r;
}
function Ko(t, e, r, n) {
  function i(o) {
    return o instanceof r ? o : new r(function(a) {
      a(o);
    });
  }
  return new (r || (r = Promise))(function(o, a) {
    function s(c) {
      try {
        u(n.next(c));
      } catch (f) {
        a(f);
      }
    }
    function l(c) {
      try {
        u(n.throw(c));
      } catch (f) {
        a(f);
      }
    }
    function u(c) {
      c.done ? o(c.value) : i(c.value).then(s, l);
    }
    u((n = n.apply(t, e || [])).next());
  });
}
function Yo(t, e) {
  var r = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, n, i, o, a;
  return a = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function s(u) {
    return function(c) {
      return l([u, c]);
    };
  }
  function l(u) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; r; )
      try {
        if (n = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return r.label++, { value: u[1], done: !1 };
          case 5:
            r.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (o = r.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              r = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              r.label = u[1];
              break;
            }
            if (u[0] === 6 && r.label < o[1]) {
              r.label = o[1], o = u;
              break;
            }
            if (o && r.label < o[2]) {
              r.label = o[2], r.ops.push(u);
              break;
            }
            o[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        u = e.call(t, r);
      } catch (c) {
        u = [6, c], i = 0;
      } finally {
        n = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function Xt(t, e, r) {
  if (r || arguments.length === 2)
    for (var n = 0, i = e.length, o; n < i; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return t.concat(o || Array.prototype.slice.call(e));
}
var Bh = "Invariant Violation", G2 = Object.setPrototypeOf, oT = G2 === void 0 ? function(t, e) {
  return t.__proto__ = e, t;
} : G2, Ge = function(t) {
  rt(e, t);
  function e(r) {
    r === void 0 && (r = Bh);
    var n = t.call(this, typeof r == "number" ? Bh + ": " + r + " (see https://github.com/apollographql/invariant-packages)" : r) || this;
    return n.framesToPop = 1, n.name = Bh, oT(n, e.prototype), n;
  }
  return e;
}(Error);
function Q(t, e) {
  if (!t)
    throw new Ge(e);
}
var I8 = ["debug", "log", "warn", "error", "silent"], aT = I8.indexOf("log");
function Q0(t) {
  return function() {
    if (I8.indexOf(t) >= aT) {
      var e = console[t] || console.log;
      return e.apply(console, arguments);
    }
  };
}
(function(t) {
  t.debug = Q0("debug"), t.log = Q0("log"), t.warn = Q0("warn"), t.error = Q0("error");
})(Q || (Q = {}));
function un(t) {
  try {
    return t();
  } catch {
  }
}
const W2 = un(function() {
  return globalThis;
}) || un(function() {
  return window;
}) || un(function() {
  return self;
}) || un(function() {
  return global;
}) || un(function() {
  return un.constructor("return this")();
});
var Q2 = "__", K2 = [Q2, Q2].join("DEV");
function sT() {
  try {
    return Boolean(__DEV__);
  } catch {
    return Object.defineProperty(W2, K2, {
      value: un(function() {
        return "production";
      }) !== "production",
      enumerable: !1,
      configurable: !0,
      writable: !0
    }), W2[K2];
  }
}
const zh = sT();
function Qi(t) {
  try {
    return t();
  } catch {
  }
}
var kp = Qi(function() {
  return globalThis;
}) || Qi(function() {
  return window;
}) || Qi(function() {
  return self;
}) || Qi(function() {
  return global;
}) || Qi(function() {
  return Qi.constructor("return this")();
}), Op = !1;
function lT() {
  kp && !Qi(function() {
    return "production";
  }) && !Qi(function() {
    return process;
  }) && (Object.defineProperty(kp, "process", {
    value: {
      env: {
        NODE_ENV: "production"
      }
    },
    configurable: !0,
    enumerable: !1,
    writable: !0
  }), Op = !0);
}
lT();
function Y2() {
  Op && (delete kp.process, Op = !1);
}
function Oc(t, e) {
  if (!Boolean(t))
    throw new Error(e);
}
function uT(t) {
  return typeof t == "object" && t !== null;
}
function cT(t, e) {
  if (!Boolean(t))
    throw new Error(
      e != null ? e : "Unexpected invariant triggered."
    );
}
const fT = /\r\n|[\n\r]/g;
function Ap(t, e) {
  let r = 0, n = 1;
  for (const i of t.body.matchAll(fT)) {
    if (typeof i.index == "number" || cT(!1), i.index >= e)
      break;
    r = i.index + i[0].length, n += 1;
  }
  return {
    line: n,
    column: e + 1 - r
  };
}
function dT(t) {
  return P8(
    t.source,
    Ap(t.source, t.start)
  );
}
function P8(t, e) {
  const r = t.locationOffset.column - 1, n = "".padStart(r) + t.body, i = e.line - 1, o = t.locationOffset.line - 1, a = e.line + o, s = e.line === 1 ? r : 0, l = e.column + s, u = `${t.name}:${a}:${l}
`, c = n.split(/\r\n|[\n\r]/g), f = c[i];
  if (f.length > 120) {
    const d = Math.floor(l / 80), h = l % 80, m = [];
    for (let g = 0; g < f.length; g += 80)
      m.push(f.slice(g, g + 80));
    return u + X2([
      [`${a} |`, m[0]],
      ...m.slice(1, d + 1).map((g) => ["|", g]),
      ["|", "^".padStart(h)],
      ["|", m[d + 1]]
    ]);
  }
  return u + X2([
    [`${a - 1} |`, c[i - 1]],
    [`${a} |`, f],
    ["|", "^".padStart(l)],
    [`${a + 1} |`, c[i + 1]]
  ]);
}
function X2(t) {
  const e = t.filter(([n, i]) => i !== void 0), r = Math.max(...e.map(([n]) => n.length));
  return e.map(([n, i]) => n.padStart(r) + (i ? " " + i : "")).join(`
`);
}
function hT(t) {
  const e = t[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: t[1],
    positions: t[2],
    path: t[3],
    originalError: t[4],
    extensions: t[5]
  } : e;
}
class Gg extends Error {
  constructor(e, ...r) {
    var n, i, o;
    const { nodes: a, source: s, positions: l, path: u, originalError: c, extensions: f } = hT(r);
    super(e), this.name = "GraphQLError", this.path = u != null ? u : void 0, this.originalError = c != null ? c : void 0, this.nodes = Z2(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const d = Z2(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((m) => m.loc).filter((m) => m != null)
    );
    this.source = s != null ? s : d == null || (i = d[0]) === null || i === void 0 ? void 0 : i.source, this.positions = l != null ? l : d == null ? void 0 : d.map((m) => m.start), this.locations = l && s ? l.map((m) => Ap(s, m)) : d == null ? void 0 : d.map((m) => Ap(m.source, m.start));
    const h = uT(
      c == null ? void 0 : c.extensions
    ) ? c == null ? void 0 : c.extensions : void 0;
    this.extensions = (o = f != null ? f : h) !== null && o !== void 0 ? o : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), c != null && c.stack ? Object.defineProperty(this, "stack", {
      value: c.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Gg) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const r of this.nodes)
        r.loc && (e += `

` + dT(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        e += `

` + P8(this.source, r);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function Z2(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function Vt(t, e, r) {
  return new Gg(`Syntax Error: ${r}`, {
    source: t,
    positions: [e]
  });
}
class pT {
  constructor(e, r, n) {
    this.start = e.start, this.end = r.end, this.startToken = e, this.endToken = r, this.source = n;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class $8 {
  constructor(e, r, n, i, o, a) {
    this.kind = e, this.start = r, this.end = n, this.line = i, this.column = o, this.value = a, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const F8 = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, mT = new Set(Object.keys(F8));
function J2(t) {
  const e = t == null ? void 0 : t.kind;
  return typeof e == "string" && mT.has(e);
}
var Ya;
(function(t) {
  t.QUERY = "query", t.MUTATION = "mutation", t.SUBSCRIPTION = "subscription";
})(Ya || (Ya = {}));
var Mp;
(function(t) {
  t.QUERY = "QUERY", t.MUTATION = "MUTATION", t.SUBSCRIPTION = "SUBSCRIPTION", t.FIELD = "FIELD", t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", t.INLINE_FRAGMENT = "INLINE_FRAGMENT", t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", t.SCHEMA = "SCHEMA", t.SCALAR = "SCALAR", t.OBJECT = "OBJECT", t.FIELD_DEFINITION = "FIELD_DEFINITION", t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", t.INTERFACE = "INTERFACE", t.UNION = "UNION", t.ENUM = "ENUM", t.ENUM_VALUE = "ENUM_VALUE", t.INPUT_OBJECT = "INPUT_OBJECT", t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Mp || (Mp = {}));
var me;
(function(t) {
  t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.VARIABLE = "Variable", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition", t.SCHEMA_EXTENSION = "SchemaExtension", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(me || (me = {}));
function Rp(t) {
  return t === 9 || t === 32;
}
function Tu(t) {
  return t >= 48 && t <= 57;
}
function B8(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function z8(t) {
  return B8(t) || t === 95;
}
function gT(t) {
  return B8(t) || Tu(t) || t === 95;
}
function vT(t) {
  var e;
  let r = Number.MAX_SAFE_INTEGER, n = null, i = -1;
  for (let a = 0; a < t.length; ++a) {
    var o;
    const s = t[a], l = yT(s);
    l !== s.length && (n = (o = n) !== null && o !== void 0 ? o : a, i = a, a !== 0 && l < r && (r = l));
  }
  return t.map((a, s) => s === 0 ? a : a.slice(r)).slice(
    (e = n) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function yT(t) {
  let e = 0;
  for (; e < t.length && Rp(t.charCodeAt(e)); )
    ++e;
  return e;
}
function xT(t, e) {
  const r = t.replace(/"""/g, '\\"""'), n = r.split(/\r\n|[\n\r]/g), i = n.length === 1, o = n.length > 1 && n.slice(1).every((h) => h.length === 0 || Rp(h.charCodeAt(0))), a = r.endsWith('\\"""'), s = t.endsWith('"') && !a, l = t.endsWith("\\"), u = s || l, c = !(e != null && e.minimize) && (!i || t.length > 70 || u || o || a);
  let f = "";
  const d = i && Rp(t.charCodeAt(0));
  return (c && !d || o) && (f += `
`), f += r, (c || u) && (f += `
`), '"""' + f + '"""';
}
var H;
(function(t) {
  t.SOF = "<SOF>", t.EOF = "<EOF>", t.BANG = "!", t.DOLLAR = "$", t.AMP = "&", t.PAREN_L = "(", t.PAREN_R = ")", t.SPREAD = "...", t.COLON = ":", t.EQUALS = "=", t.AT = "@", t.BRACKET_L = "[", t.BRACKET_R = "]", t.BRACE_L = "{", t.PIPE = "|", t.BRACE_R = "}", t.NAME = "Name", t.INT = "Int", t.FLOAT = "Float", t.STRING = "String", t.BLOCK_STRING = "BlockString", t.COMMENT = "Comment";
})(H || (H = {}));
class bT {
  constructor(e) {
    const r = new $8(H.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = r, this.token = r, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  lookahead() {
    let e = this.token;
    if (e.kind !== H.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const r = ET(this, e.end);
          e.next = r, r.prev = e, e = r;
        }
      while (e.kind === H.COMMENT);
    return e;
  }
}
function wT(t) {
  return t === H.BANG || t === H.DOLLAR || t === H.AMP || t === H.PAREN_L || t === H.PAREN_R || t === H.SPREAD || t === H.COLON || t === H.EQUALS || t === H.AT || t === H.BRACKET_L || t === H.BRACKET_R || t === H.BRACE_L || t === H.PIPE || t === H.BRACE_R;
}
function Us(t) {
  return t >= 0 && t <= 55295 || t >= 57344 && t <= 1114111;
}
function vd(t, e) {
  return H8(t.charCodeAt(e)) && U8(t.charCodeAt(e + 1));
}
function H8(t) {
  return t >= 55296 && t <= 56319;
}
function U8(t) {
  return t >= 56320 && t <= 57343;
}
function ma(t, e) {
  const r = t.source.body.codePointAt(e);
  if (r === void 0)
    return H.EOF;
  if (r >= 32 && r <= 126) {
    const n = String.fromCodePoint(r);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function Tt(t, e, r, n, i) {
  const o = t.line, a = 1 + r - t.lineStart;
  return new $8(e, r, n, o, a, i);
}
function ET(t, e) {
  const r = t.source.body, n = r.length;
  let i = e;
  for (; i < n; ) {
    const o = r.charCodeAt(i);
    switch (o) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++i;
        continue;
      case 10:
        ++i, ++t.line, t.lineStart = i;
        continue;
      case 13:
        r.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++t.line, t.lineStart = i;
        continue;
      case 35:
        return ST(t, i);
      case 33:
        return Tt(t, H.BANG, i, i + 1);
      case 36:
        return Tt(t, H.DOLLAR, i, i + 1);
      case 38:
        return Tt(t, H.AMP, i, i + 1);
      case 40:
        return Tt(t, H.PAREN_L, i, i + 1);
      case 41:
        return Tt(t, H.PAREN_R, i, i + 1);
      case 46:
        if (r.charCodeAt(i + 1) === 46 && r.charCodeAt(i + 2) === 46)
          return Tt(t, H.SPREAD, i, i + 3);
        break;
      case 58:
        return Tt(t, H.COLON, i, i + 1);
      case 61:
        return Tt(t, H.EQUALS, i, i + 1);
      case 64:
        return Tt(t, H.AT, i, i + 1);
      case 91:
        return Tt(t, H.BRACKET_L, i, i + 1);
      case 93:
        return Tt(t, H.BRACKET_R, i, i + 1);
      case 123:
        return Tt(t, H.BRACE_L, i, i + 1);
      case 124:
        return Tt(t, H.PIPE, i, i + 1);
      case 125:
        return Tt(t, H.BRACE_R, i, i + 1);
      case 34:
        return r.charCodeAt(i + 1) === 34 && r.charCodeAt(i + 2) === 34 ? kT(t, i) : CT(t, i);
    }
    if (Tu(o) || o === 45)
      return _T(t, i, o);
    if (z8(o))
      return OT(t, i);
    throw Vt(
      t.source,
      i,
      o === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Us(o) || vd(r, i) ? `Unexpected character: ${ma(t, i)}.` : `Invalid character: ${ma(t, i)}.`
    );
  }
  return Tt(t, H.EOF, n, n);
}
function ST(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const o = r.charCodeAt(i);
    if (o === 10 || o === 13)
      break;
    if (Us(o))
      ++i;
    else if (vd(r, i))
      i += 2;
    else
      break;
  }
  return Tt(
    t,
    H.COMMENT,
    e,
    i,
    r.slice(e + 1, i)
  );
}
function _T(t, e, r) {
  const n = t.source.body;
  let i = e, o = r, a = !1;
  if (o === 45 && (o = n.charCodeAt(++i)), o === 48) {
    if (o = n.charCodeAt(++i), Tu(o))
      throw Vt(
        t.source,
        i,
        `Invalid number, unexpected digit after 0: ${ma(
          t,
          i
        )}.`
      );
  } else
    i = Hh(t, i, o), o = n.charCodeAt(i);
  if (o === 46 && (a = !0, o = n.charCodeAt(++i), i = Hh(t, i, o), o = n.charCodeAt(i)), (o === 69 || o === 101) && (a = !0, o = n.charCodeAt(++i), (o === 43 || o === 45) && (o = n.charCodeAt(++i)), i = Hh(t, i, o), o = n.charCodeAt(i)), o === 46 || z8(o))
    throw Vt(
      t.source,
      i,
      `Invalid number, expected digit but got: ${ma(
        t,
        i
      )}.`
    );
  return Tt(
    t,
    a ? H.FLOAT : H.INT,
    e,
    i,
    n.slice(e, i)
  );
}
function Hh(t, e, r) {
  if (!Tu(r))
    throw Vt(
      t.source,
      e,
      `Invalid number, expected digit but got: ${ma(
        t,
        e
      )}.`
    );
  const n = t.source.body;
  let i = e + 1;
  for (; Tu(n.charCodeAt(i)); )
    ++i;
  return i;
}
function CT(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1, o = i, a = "";
  for (; i < n; ) {
    const s = r.charCodeAt(i);
    if (s === 34)
      return a += r.slice(o, i), Tt(t, H.STRING, e, i + 1, a);
    if (s === 92) {
      a += r.slice(o, i);
      const l = r.charCodeAt(i + 1) === 117 ? r.charCodeAt(i + 2) === 123 ? TT(t, i) : NT(t, i) : DT(t, i);
      a += l.value, i += l.size, o = i;
      continue;
    }
    if (s === 10 || s === 13)
      break;
    if (Us(s))
      ++i;
    else if (vd(r, i))
      i += 2;
    else
      throw Vt(
        t.source,
        i,
        `Invalid character within String: ${ma(
          t,
          i
        )}.`
      );
  }
  throw Vt(t.source, i, "Unterminated string.");
}
function TT(t, e) {
  const r = t.source.body;
  let n = 0, i = 3;
  for (; i < 12; ) {
    const o = r.charCodeAt(e + i++);
    if (o === 125) {
      if (i < 5 || !Us(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: i
      };
    }
    if (n = n << 4 | kl(o), n < 0)
      break;
  }
  throw Vt(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(
      e,
      e + i
    )}".`
  );
}
function NT(t, e) {
  const r = t.source.body, n = ey(r, e + 2);
  if (Us(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (H8(n) && r.charCodeAt(e + 6) === 92 && r.charCodeAt(e + 7) === 117) {
    const i = ey(r, e + 8);
    if (U8(i))
      return {
        value: String.fromCodePoint(n, i),
        size: 12
      };
  }
  throw Vt(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${r.slice(e, e + 6)}".`
  );
}
function ey(t, e) {
  return kl(t.charCodeAt(e)) << 12 | kl(t.charCodeAt(e + 1)) << 8 | kl(t.charCodeAt(e + 2)) << 4 | kl(t.charCodeAt(e + 3));
}
function kl(t) {
  return t >= 48 && t <= 57 ? t - 48 : t >= 65 && t <= 70 ? t - 55 : t >= 97 && t <= 102 ? t - 87 : -1;
}
function DT(t, e) {
  const r = t.source.body;
  switch (r.charCodeAt(e + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw Vt(
    t.source,
    e,
    `Invalid character escape sequence: "${r.slice(
      e,
      e + 2
    )}".`
  );
}
function kT(t, e) {
  const r = t.source.body, n = r.length;
  let i = t.lineStart, o = e + 3, a = o, s = "";
  const l = [];
  for (; o < n; ) {
    const u = r.charCodeAt(o);
    if (u === 34 && r.charCodeAt(o + 1) === 34 && r.charCodeAt(o + 2) === 34) {
      s += r.slice(a, o), l.push(s);
      const c = Tt(
        t,
        H.BLOCK_STRING,
        e,
        o + 3,
        vT(l).join(`
`)
      );
      return t.line += l.length - 1, t.lineStart = i, c;
    }
    if (u === 92 && r.charCodeAt(o + 1) === 34 && r.charCodeAt(o + 2) === 34 && r.charCodeAt(o + 3) === 34) {
      s += r.slice(a, o), a = o + 1, o += 4;
      continue;
    }
    if (u === 10 || u === 13) {
      s += r.slice(a, o), l.push(s), u === 13 && r.charCodeAt(o + 1) === 10 ? o += 2 : ++o, s = "", a = o, i = o;
      continue;
    }
    if (Us(u))
      ++o;
    else if (vd(r, o))
      o += 2;
    else
      throw Vt(
        t.source,
        o,
        `Invalid character within String: ${ma(
          t,
          o
        )}.`
      );
  }
  throw Vt(t.source, o, "Unterminated string.");
}
function OT(t, e) {
  const r = t.source.body, n = r.length;
  let i = e + 1;
  for (; i < n; ) {
    const o = r.charCodeAt(i);
    if (gT(o))
      ++i;
    else
      break;
  }
  return Tt(
    t,
    H.NAME,
    e,
    i,
    r.slice(e, i)
  );
}
const AT = 10, j8 = 2;
function V8(t) {
  return yd(t, []);
}
function yd(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return MT(t, e);
    default:
      return String(t);
  }
}
function MT(t, e) {
  if (t === null)
    return "null";
  if (e.includes(t))
    return "[Circular]";
  const r = [...e, t];
  if (RT(t)) {
    const n = t.toJSON();
    if (n !== t)
      return typeof n == "string" ? n : yd(n, r);
  } else if (Array.isArray(t))
    return IT(t, r);
  return LT(t, r);
}
function RT(t) {
  return typeof t.toJSON == "function";
}
function LT(t, e) {
  const r = Object.entries(t);
  if (r.length === 0)
    return "{}";
  if (e.length > j8)
    return "[" + PT(t) + "]";
  const n = r.map(
    ([i, o]) => i + ": " + yd(o, e)
  );
  return "{ " + n.join(", ") + " }";
}
function IT(t, e) {
  if (t.length === 0)
    return "[]";
  if (e.length > j8)
    return "[Array]";
  const r = Math.min(AT, t.length), n = t.length - r, i = [];
  for (let o = 0; o < r; ++o)
    i.push(yd(t[o], e));
  return n === 1 ? i.push("... 1 more item") : n > 1 && i.push(`... ${n} more items`), "[" + i.join(", ") + "]";
}
function PT(t) {
  const e = Object.prototype.toString.call(t).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    const r = t.constructor.name;
    if (typeof r == "string" && r !== "")
      return r;
  }
  return e;
}
const $T = function(e, r) {
  return e instanceof r;
};
class Wg {
  constructor(e, r = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || Oc(!1, `Body must be a string. Received: ${V8(e)}.`), this.body = e, this.name = r, this.locationOffset = n, this.locationOffset.line > 0 || Oc(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Oc(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function FT(t) {
  return $T(t, Wg);
}
function BT(t, e) {
  return new zT(t, e).parseDocument();
}
class zT {
  constructor(e, r = {}) {
    const n = FT(e) ? e : new Wg(e);
    this._lexer = new bT(n), this._options = r, this._tokenCounter = 0;
  }
  parseName() {
    const e = this.expectToken(H.NAME);
    return this.node(e, {
      kind: me.NAME,
      value: e.value
    });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: me.DOCUMENT,
      definitions: this.many(
        H.SOF,
        this.parseDefinition,
        H.EOF
      )
    });
  }
  parseDefinition() {
    if (this.peek(H.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), r = e ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === H.NAME) {
      switch (r.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (e)
        throw Vt(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(r);
  }
  parseOperationDefinition() {
    const e = this._lexer.token;
    if (this.peek(H.BRACE_L))
      return this.node(e, {
        kind: me.OPERATION_DEFINITION,
        operation: Ya.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let n;
    return this.peek(H.NAME) && (n = this.parseName()), this.node(e, {
      kind: me.OPERATION_DEFINITION,
      operation: r,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseOperationType() {
    const e = this.expectToken(H.NAME);
    switch (e.value) {
      case "query":
        return Ya.QUERY;
      case "mutation":
        return Ya.MUTATION;
      case "subscription":
        return Ya.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  parseVariableDefinitions() {
    return this.optionalMany(
      H.PAREN_L,
      this.parseVariableDefinition,
      H.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: me.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(H.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(H.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(H.DOLLAR), this.node(e, {
      kind: me.VARIABLE,
      name: this.parseName()
    });
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: me.SELECTION_SET,
      selections: this.many(
        H.BRACE_L,
        this.parseSelection,
        H.BRACE_R
      )
    });
  }
  parseSelection() {
    return this.peek(H.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const e = this._lexer.token, r = this.parseName();
    let n, i;
    return this.expectOptionalToken(H.COLON) ? (n = r, i = this.parseName()) : i = r, this.node(e, {
      kind: me.FIELD,
      alias: n,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(H.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  parseArguments(e) {
    const r = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(H.PAREN_L, r, H.PAREN_R);
  }
  parseArgument(e = !1) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(H.COLON), this.node(r, {
      kind: me.ARGUMENT,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  parseFragment() {
    const e = this._lexer.token;
    this.expectToken(H.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(H.NAME) ? this.node(e, {
      kind: me.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: me.INLINE_FRAGMENT,
      typeCondition: r ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentDefinition() {
    const e = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: me.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: me.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  parseValueLiteral(e) {
    const r = this._lexer.token;
    switch (r.kind) {
      case H.BRACKET_L:
        return this.parseList(e);
      case H.BRACE_L:
        return this.parseObject(e);
      case H.INT:
        return this.advanceLexer(), this.node(r, {
          kind: me.INT,
          value: r.value
        });
      case H.FLOAT:
        return this.advanceLexer(), this.node(r, {
          kind: me.FLOAT,
          value: r.value
        });
      case H.STRING:
      case H.BLOCK_STRING:
        return this.parseStringLiteral();
      case H.NAME:
        switch (this.advanceLexer(), r.value) {
          case "true":
            return this.node(r, {
              kind: me.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(r, {
              kind: me.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(r, {
              kind: me.NULL
            });
          default:
            return this.node(r, {
              kind: me.ENUM,
              value: r.value
            });
        }
      case H.DOLLAR:
        if (e)
          if (this.expectToken(H.DOLLAR), this._lexer.token.kind === H.NAME) {
            const n = this._lexer.token.value;
            throw Vt(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(r);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: me.STRING,
      value: e.value,
      block: e.kind === H.BLOCK_STRING
    });
  }
  parseList(e) {
    const r = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: me.LIST,
      values: this.any(H.BRACKET_L, r, H.BRACKET_R)
    });
  }
  parseObject(e) {
    const r = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: me.OBJECT,
      fields: this.any(H.BRACE_L, r, H.BRACE_R)
    });
  }
  parseObjectField(e) {
    const r = this._lexer.token, n = this.parseName();
    return this.expectToken(H.COLON), this.node(r, {
      kind: me.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(e)
    });
  }
  parseDirectives(e) {
    const r = [];
    for (; this.peek(H.AT); )
      r.push(this.parseDirective(e));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(e) {
    const r = this._lexer.token;
    return this.expectToken(H.AT), this.node(r, {
      kind: me.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
    });
  }
  parseTypeReference() {
    const e = this._lexer.token;
    let r;
    if (this.expectOptionalToken(H.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(H.BRACKET_R), r = this.node(e, {
        kind: me.LIST_TYPE,
        type: n
      });
    } else
      r = this.parseNamedType();
    return this.expectOptionalToken(H.BANG) ? this.node(e, {
      kind: me.NON_NULL_TYPE,
      type: r
    }) : r;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: me.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(H.STRING) || this.peek(H.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), i = this.many(
      H.BRACE_L,
      this.parseOperationTypeDefinition,
      H.BRACE_R
    );
    return this.node(e, {
      kind: me.SCHEMA_DEFINITION,
      description: r,
      directives: n,
      operationTypes: i
    });
  }
  parseOperationTypeDefinition() {
    const e = this._lexer.token, r = this.parseOperationType();
    this.expectToken(H.COLON);
    const n = this.parseNamedType();
    return this.node(e, {
      kind: me.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: n
    });
  }
  parseScalarTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: me.SCALAR_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  parseObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), o = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(e, {
      kind: me.OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: o,
      fields: a
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(H.AMP, this.parseNamedType) : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(
      H.BRACE_L,
      this.parseFieldDefinition,
      H.BRACE_R
    );
  }
  parseFieldDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(H.COLON);
    const o = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(e, {
      kind: me.FIELD_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      type: o,
      directives: a
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(
      H.PAREN_L,
      this.parseInputValueDef,
      H.PAREN_R
    );
  }
  parseInputValueDef() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseName();
    this.expectToken(H.COLON);
    const i = this.parseTypeReference();
    let o;
    this.expectOptionalToken(H.EQUALS) && (o = this.parseConstValueLiteral());
    const a = this.parseConstDirectives();
    return this.node(e, {
      kind: me.INPUT_VALUE_DEFINITION,
      description: r,
      name: n,
      type: i,
      defaultValue: o,
      directives: a
    });
  }
  parseInterfaceTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), i = this.parseImplementsInterfaces(), o = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(e, {
      kind: me.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: n,
      interfaces: i,
      directives: o,
      fields: a
    });
  }
  parseUnionTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), i = this.parseConstDirectives(), o = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: me.UNION_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      types: o
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(H.EQUALS) ? this.delimitedMany(H.PIPE, this.parseNamedType) : [];
  }
  parseEnumTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), i = this.parseConstDirectives(), o = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: me.ENUM_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      values: o
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      H.BRACE_L,
      this.parseEnumValueDefinition,
      H.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    const e = this._lexer.token, r = this.parseDescription(), n = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: me.ENUM_VALUE_DEFINITION,
      description: r,
      name: n,
      directives: i
    });
  }
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw Vt(
        this._lexer.source,
        this._lexer.token.start,
        `${K0(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), i = this.parseConstDirectives(), o = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: me.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: n,
      directives: i,
      fields: o
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(
      H.BRACE_L,
      this.parseInputValueDef,
      H.BRACE_R
    );
  }
  parseTypeSystemExtension() {
    const e = this._lexer.lookahead();
    if (e.kind === H.NAME)
      switch (e.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(e);
  }
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const r = this.parseConstDirectives(), n = this.optionalMany(
      H.BRACE_L,
      this.parseOperationTypeDefinition,
      H.BRACE_R
    );
    if (r.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: n
    });
  }
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const r = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: n
    });
  }
  parseObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && o.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: o
    });
  }
  parseInterfaceTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const r = this.parseName(), n = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    if (n.length === 0 && i.length === 0 && o.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: n,
      directives: i,
      fields: o
    });
  }
  parseUnionTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.UNION_TYPE_EXTENSION,
      name: r,
      directives: n,
      types: i
    });
  }
  parseEnumTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.ENUM_TYPE_EXTENSION,
      name: r,
      directives: n,
      values: i
    });
  }
  parseInputObjectTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const r = this.parseName(), n = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (n.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: me.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: n,
      fields: i
    });
  }
  parseDirectiveDefinition() {
    const e = this._lexer.token, r = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(H.AT);
    const n = this.parseName(), i = this.parseArgumentDefs(), o = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const a = this.parseDirectiveLocations();
    return this.node(e, {
      kind: me.DIRECTIVE_DEFINITION,
      description: r,
      name: n,
      arguments: i,
      repeatable: o,
      locations: a
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(H.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const e = this._lexer.token, r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Mp, r.value))
      return r;
    throw this.unexpected(e);
  }
  node(e, r) {
    return this._options.noLocation !== !0 && (r.loc = new pT(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), r;
  }
  peek(e) {
    return this._lexer.token.kind === e;
  }
  expectToken(e) {
    const r = this._lexer.token;
    if (r.kind === e)
      return this.advanceLexer(), r;
    throw Vt(
      this._lexer.source,
      r.start,
      `Expected ${q8(e)}, found ${K0(r)}.`
    );
  }
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  expectKeyword(e) {
    const r = this._lexer.token;
    if (r.kind === H.NAME && r.value === e)
      this.advanceLexer();
    else
      throw Vt(
        this._lexer.source,
        r.start,
        `Expected "${e}", found ${K0(r)}.`
      );
  }
  expectOptionalKeyword(e) {
    const r = this._lexer.token;
    return r.kind === H.NAME && r.value === e ? (this.advanceLexer(), !0) : !1;
  }
  unexpected(e) {
    const r = e != null ? e : this._lexer.token;
    return Vt(
      this._lexer.source,
      r.start,
      `Unexpected ${K0(r)}.`
    );
  }
  any(e, r, n) {
    this.expectToken(e);
    const i = [];
    for (; !this.expectOptionalToken(n); )
      i.push(r.call(this));
    return i;
  }
  optionalMany(e, r, n) {
    if (this.expectOptionalToken(e)) {
      const i = [];
      do
        i.push(r.call(this));
      while (!this.expectOptionalToken(n));
      return i;
    }
    return [];
  }
  many(e, r, n) {
    this.expectToken(e);
    const i = [];
    do
      i.push(r.call(this));
    while (!this.expectOptionalToken(n));
    return i;
  }
  delimitedMany(e, r) {
    this.expectOptionalToken(e);
    const n = [];
    do
      n.push(r.call(this));
    while (this.expectOptionalToken(e));
    return n;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, r = this._lexer.advance();
    if (e !== void 0 && r.kind !== H.EOF && (++this._tokenCounter, this._tokenCounter > e))
      throw Vt(
        this._lexer.source,
        r.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function K0(t) {
  const e = t.value;
  return q8(t.kind) + (e != null ? ` "${e}"` : "");
}
function q8(t) {
  return wT(t) ? `"${t}"` : t;
}
function HT(t) {
  return `"${t.replace(UT, jT)}"`;
}
const UT = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function jT(t) {
  return VT[t.charCodeAt(0)];
}
const VT = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], G8 = Object.freeze({});
function oi(t, e, r = F8) {
  const n = /* @__PURE__ */ new Map();
  for (const b of Object.values(me))
    n.set(b, qT(e, b));
  let i, o = Array.isArray(t), a = [t], s = -1, l = [], u = t, c, f;
  const d = [], h = [];
  do {
    s++;
    const b = s === a.length, x = b && l.length !== 0;
    if (b) {
      if (c = h.length === 0 ? void 0 : d[d.length - 1], u = f, f = h.pop(), x)
        if (o) {
          u = u.slice();
          let w = 0;
          for (const [_, T] of l) {
            const N = _ - w;
            T === null ? (u.splice(N, 1), w++) : u[N] = T;
          }
        } else {
          u = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(u)
          );
          for (const [w, _] of l)
            u[w] = _;
        }
      s = i.index, a = i.keys, l = i.edits, o = i.inArray, i = i.prev;
    } else if (f) {
      if (c = o ? s : a[s], u = f[c], u == null)
        continue;
      d.push(c);
    }
    let v;
    if (!Array.isArray(u)) {
      var m, g;
      J2(u) || Oc(!1, `Invalid AST Node: ${V8(u)}.`);
      const w = b ? (m = n.get(u.kind)) === null || m === void 0 ? void 0 : m.leave : (g = n.get(u.kind)) === null || g === void 0 ? void 0 : g.enter;
      if (v = w == null ? void 0 : w.call(e, u, c, f, d, h), v === G8)
        break;
      if (v === !1) {
        if (!b) {
          d.pop();
          continue;
        }
      } else if (v !== void 0 && (l.push([c, v]), !b))
        if (J2(v))
          u = v;
        else {
          d.pop();
          continue;
        }
    }
    if (v === void 0 && x && l.push([c, u]), b)
      d.pop();
    else {
      var S;
      i = {
        inArray: o,
        index: s,
        keys: a,
        edits: l,
        prev: i
      }, o = Array.isArray(u), a = o ? u : (S = r[u.kind]) !== null && S !== void 0 ? S : [], s = -1, l = [], f && h.push(f), f = u;
    }
  } while (i !== void 0);
  return l.length !== 0 ? l[l.length - 1][1] : t;
}
function qT(t, e) {
  const r = t[e];
  return typeof r == "object" ? r : typeof r == "function" ? {
    enter: r,
    leave: void 0
  } : {
    enter: t.enter,
    leave: t.leave
  };
}
function GT(t) {
  return oi(t, QT);
}
const WT = 80, QT = {
  Name: {
    leave: (t) => t.value
  },
  Variable: {
    leave: (t) => "$" + t.name
  },
  Document: {
    leave: (t) => ie(t.definitions, `

`)
  },
  OperationDefinition: {
    leave(t) {
      const e = Te("(", ie(t.variableDefinitions, ", "), ")"), r = ie(
        [
          t.operation,
          ie([t.name, e]),
          ie(t.directives, " ")
        ],
        " "
      );
      return (r === "query" ? "" : r + " ") + t.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: t, type: e, defaultValue: r, directives: n }) => t + ": " + e + Te(" = ", r) + Te(" ", ie(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: t }) => Tn(t)
  },
  Field: {
    leave({ alias: t, name: e, arguments: r, directives: n, selectionSet: i }) {
      const o = Te("", t, ": ") + e;
      let a = o + Te("(", ie(r, ", "), ")");
      return a.length > WT && (a = o + Te(`(
`, Ac(ie(r, `
`)), `
)`)), ie([a, ie(n, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  FragmentSpread: {
    leave: ({ name: t, directives: e }) => "..." + t + Te(" ", ie(e, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: t, directives: e, selectionSet: r }) => ie(
      [
        "...",
        Te("on ", t),
        ie(e, " "),
        r
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: t, typeCondition: e, variableDefinitions: r, directives: n, selectionSet: i }) => `fragment ${t}${Te("(", ie(r, ", "), ")")} on ${e} ${Te("", ie(n, " "), " ")}` + i
  },
  IntValue: {
    leave: ({ value: t }) => t
  },
  FloatValue: {
    leave: ({ value: t }) => t
  },
  StringValue: {
    leave: ({ value: t, block: e }) => e ? xT(t) : HT(t)
  },
  BooleanValue: {
    leave: ({ value: t }) => t ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: t }) => t
  },
  ListValue: {
    leave: ({ values: t }) => "[" + ie(t, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: t }) => "{" + ie(t, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: t, value: e }) => t + ": " + e
  },
  Directive: {
    leave: ({ name: t, arguments: e }) => "@" + t + Te("(", ie(e, ", "), ")")
  },
  NamedType: {
    leave: ({ name: t }) => t
  },
  ListType: {
    leave: ({ type: t }) => "[" + t + "]"
  },
  NonNullType: {
    leave: ({ type: t }) => t + "!"
  },
  SchemaDefinition: {
    leave: ({ description: t, directives: e, operationTypes: r }) => Te("", t, `
`) + ie(["schema", ie(e, " "), Tn(r)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: t, type: e }) => t + ": " + e
  },
  ScalarTypeDefinition: {
    leave: ({ description: t, name: e, directives: r }) => Te("", t, `
`) + ie(["scalar", e, ie(r, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => Te("", t, `
`) + ie(
      [
        "type",
        e,
        Te("implements ", ie(r, " & ")),
        ie(n, " "),
        Tn(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: t, name: e, arguments: r, type: n, directives: i }) => Te("", t, `
`) + e + (ty(r) ? Te(`(
`, Ac(ie(r, `
`)), `
)`) : Te("(", ie(r, ", "), ")")) + ": " + n + Te(" ", ie(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: t, name: e, type: r, defaultValue: n, directives: i }) => Te("", t, `
`) + ie(
      [e + ": " + r, Te("= ", n), ie(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: t, name: e, interfaces: r, directives: n, fields: i }) => Te("", t, `
`) + ie(
      [
        "interface",
        e,
        Te("implements ", ie(r, " & ")),
        ie(n, " "),
        Tn(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, types: n }) => Te("", t, `
`) + ie(
      ["union", e, ie(r, " "), Te("= ", ie(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, values: n }) => Te("", t, `
`) + ie(["enum", e, ie(r, " "), Tn(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: t, name: e, directives: r }) => Te("", t, `
`) + ie([e, ie(r, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: t, name: e, directives: r, fields: n }) => Te("", t, `
`) + ie(["input", e, ie(r, " "), Tn(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: t, name: e, arguments: r, repeatable: n, locations: i }) => Te("", t, `
`) + "directive @" + e + (ty(r) ? Te(`(
`, Ac(ie(r, `
`)), `
)`) : Te("(", ie(r, ", "), ")")) + (n ? " repeatable" : "") + " on " + ie(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: t, operationTypes: e }) => ie(
      ["extend schema", ie(t, " "), Tn(e)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: t, directives: e }) => ie(["extend scalar", t, ie(e, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => ie(
      [
        "extend type",
        t,
        Te("implements ", ie(e, " & ")),
        ie(r, " "),
        Tn(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: t, interfaces: e, directives: r, fields: n }) => ie(
      [
        "extend interface",
        t,
        Te("implements ", ie(e, " & ")),
        ie(r, " "),
        Tn(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: t, directives: e, types: r }) => ie(
      [
        "extend union",
        t,
        ie(e, " "),
        Te("= ", ie(r, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: t, directives: e, values: r }) => ie(["extend enum", t, ie(e, " "), Tn(r)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: t, directives: e, fields: r }) => ie(["extend input", t, ie(e, " "), Tn(r)], " ")
  }
};
function ie(t, e = "") {
  var r;
  return (r = t == null ? void 0 : t.filter((n) => n).join(e)) !== null && r !== void 0 ? r : "";
}
function Tn(t) {
  return Te(`{
`, Ac(ie(t, `
`)), `
}`);
}
function Te(t, e, r = "") {
  return e != null && e !== "" ? t + e + r : "";
}
function Ac(t) {
  return Te("  ", t.replace(/\n/g, `
  `));
}
function ty(t) {
  var e;
  return (e = t == null ? void 0 : t.some((r) => r.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
function KT() {
  return Y2();
}
function YT() {
  __DEV__ ? Q(typeof zh == "boolean", zh) : Q(typeof zh == "boolean", 36);
}
KT();
YT();
function xd(t, e) {
  var r = t.directives;
  return !r || !r.length ? !0 : eN(r).every(function(n) {
    var i = n.directive, o = n.ifArgument, a = !1;
    return o.value.kind === "Variable" ? (a = e && e[o.value.name.value], __DEV__ ? Q(a !== void 0, "Invalid variable referenced in @".concat(i.name.value, " directive.")) : Q(a !== void 0, 37)) : a = o.value.value, i.name.value === "skip" ? !a : a;
  });
}
function XT(t) {
  var e = [];
  return oi(t, {
    Directive: function(r) {
      e.push(r.name.value);
    }
  }), e;
}
function Lp(t, e) {
  return XT(e).some(function(r) {
    return t.indexOf(r) > -1;
  });
}
function ZT(t) {
  return t && Lp(["client"], t) && Lp(["export"], t);
}
function JT(t) {
  var e = t.name.value;
  return e === "skip" || e === "include";
}
function eN(t) {
  var e = [];
  return t && t.length && t.forEach(function(r) {
    if (!!JT(r)) {
      var n = r.arguments, i = r.name.value;
      __DEV__ ? Q(n && n.length === 1, "Incorrect number of arguments for the @".concat(i, " directive.")) : Q(n && n.length === 1, 38);
      var o = n[0];
      __DEV__ ? Q(o.name && o.name.value === "if", "Invalid argument for the @".concat(i, " directive.")) : Q(o.name && o.name.value === "if", 39);
      var a = o.value;
      __DEV__ ? Q(a && (a.kind === "Variable" || a.kind === "BooleanValue"), "Argument for the @".concat(i, " directive must be a variable or a boolean value.")) : Q(a && (a.kind === "Variable" || a.kind === "BooleanValue"), 40), e.push({ directive: r, ifArgument: o });
    }
  }), e;
}
function tN(t, e) {
  var r = e, n = [];
  t.definitions.forEach(function(o) {
    if (o.kind === "OperationDefinition")
      throw __DEV__ ? new Ge("Found a ".concat(o.operation, " operation").concat(o.name ? " named '".concat(o.name.value, "'") : "", ". ") + "No operations are allowed when using a fragment as a query. Only fragments are allowed.") : new Ge(41);
    o.kind === "FragmentDefinition" && n.push(o);
  }), typeof r > "u" && (__DEV__ ? Q(n.length === 1, "Found ".concat(n.length, " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.")) : Q(n.length === 1, 42), r = n[0].name.value);
  var i = O(O({}, t), { definitions: Xt([
    {
      kind: "OperationDefinition",
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: r
            }
          }
        ]
      }
    }
  ], t.definitions, !0) });
  return i;
}
function bd(t) {
  t === void 0 && (t = []);
  var e = {};
  return t.forEach(function(r) {
    e[r.name.value] = r;
  }), e;
}
function Qg(t, e) {
  switch (t.kind) {
    case "InlineFragment":
      return t;
    case "FragmentSpread": {
      var r = e && e[t.name.value];
      return __DEV__ ? Q(r, "No fragment named ".concat(t.name.value, ".")) : Q(r, 43), r;
    }
    default:
      return null;
  }
}
function vt(t) {
  return t !== null && typeof t == "object";
}
function ss(t) {
  return { __ref: String(t) };
}
function ze(t) {
  return Boolean(t && typeof t == "object" && typeof t.__ref == "string");
}
function rN(t) {
  return vt(t) && t.kind === "Document" && Array.isArray(t.definitions);
}
function nN(t) {
  return t.kind === "StringValue";
}
function iN(t) {
  return t.kind === "BooleanValue";
}
function oN(t) {
  return t.kind === "IntValue";
}
function aN(t) {
  return t.kind === "FloatValue";
}
function sN(t) {
  return t.kind === "Variable";
}
function lN(t) {
  return t.kind === "ObjectValue";
}
function uN(t) {
  return t.kind === "ListValue";
}
function cN(t) {
  return t.kind === "EnumValue";
}
function fN(t) {
  return t.kind === "NullValue";
}
function Cs(t, e, r, n) {
  if (oN(r) || aN(r))
    t[e.value] = Number(r.value);
  else if (iN(r) || nN(r))
    t[e.value] = r.value;
  else if (lN(r)) {
    var i = {};
    r.fields.map(function(a) {
      return Cs(i, a.name, a.value, n);
    }), t[e.value] = i;
  } else if (sN(r)) {
    var o = (n || {})[r.name.value];
    t[e.value] = o;
  } else if (uN(r))
    t[e.value] = r.values.map(function(a) {
      var s = {};
      return Cs(s, e, a, n), s[e.value];
    });
  else if (cN(r))
    t[e.value] = r.value;
  else if (fN(r))
    t[e.value] = null;
  else
    throw __DEV__ ? new Ge('The inline argument "'.concat(e.value, '" of kind "').concat(r.kind, '"') + "is not supported. Use variables instead of inline arguments to overcome this limitation.") : new Ge(52);
}
function dN(t, e) {
  var r = null;
  t.directives && (r = {}, t.directives.forEach(function(i) {
    r[i.name.value] = {}, i.arguments && i.arguments.forEach(function(o) {
      var a = o.name, s = o.value;
      return Cs(r[i.name.value], a, s, e);
    });
  }));
  var n = null;
  return t.arguments && t.arguments.length && (n = {}, t.arguments.forEach(function(i) {
    var o = i.name, a = i.value;
    return Cs(n, o, a, e);
  })), Kg(t.name.value, n, r);
}
var hN = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export"
], Kg = Object.assign(function(t, e, r) {
  if (e && r && r.connection && r.connection.key)
    if (r.connection.filter && r.connection.filter.length > 0) {
      var n = r.connection.filter ? r.connection.filter : [];
      n.sort();
      var i = {};
      return n.forEach(function(s) {
        i[s] = e[s];
      }), "".concat(r.connection.key, "(").concat(pl(i), ")");
    } else
      return r.connection.key;
  var o = t;
  if (e) {
    var a = pl(e);
    o += "(".concat(a, ")");
  }
  return r && Object.keys(r).forEach(function(s) {
    hN.indexOf(s) === -1 && (r[s] && Object.keys(r[s]).length ? o += "@".concat(s, "(").concat(pl(r[s]), ")") : o += "@".concat(s));
  }), o;
}, {
  setStringify: function(t) {
    var e = pl;
    return pl = t, e;
  }
}), pl = function(e) {
  return JSON.stringify(e, pN);
};
function pN(t, e) {
  return vt(e) && !Array.isArray(e) && (e = Object.keys(e).sort().reduce(function(r, n) {
    return r[n] = e[n], r;
  }, {})), e;
}
function wd(t, e) {
  if (t.arguments && t.arguments.length) {
    var r = {};
    return t.arguments.forEach(function(n) {
      var i = n.name, o = n.value;
      return Cs(r, i, o, e);
    }), r;
  }
  return null;
}
function ga(t) {
  return t.alias ? t.alias.value : t.name.value;
}
function Ip(t, e, r) {
  if (typeof t.__typename == "string")
    return t.__typename;
  for (var n = 0, i = e.selections; n < i.length; n++) {
    var o = i[n];
    if (Mi(o)) {
      if (o.name.value === "__typename")
        return t[ga(o)];
    } else {
      var a = Ip(t, Qg(o, r).selectionSet, r);
      if (typeof a == "string")
        return a;
    }
  }
}
function Mi(t) {
  return t.kind === "Field";
}
function W8(t) {
  return t.kind === "InlineFragment";
}
function Ed(t) {
  __DEV__ ? Q(t && t.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : Q(t && t.kind === "Document", 44);
  var e = t.definitions.filter(function(r) {
    return r.kind !== "FragmentDefinition";
  }).map(function(r) {
    if (r.kind !== "OperationDefinition")
      throw __DEV__ ? new Ge('Schema type definitions not allowed in queries. Found: "'.concat(r.kind, '"')) : new Ge(45);
    return r;
  });
  return __DEV__ ? Q(e.length <= 1, "Ambiguous GraphQL document: contains ".concat(e.length, " operations")) : Q(e.length <= 1, 46), t;
}
function n0(t) {
  return Ed(t), t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition";
  })[0];
}
function Pp(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "OperationDefinition" && e.name;
  }).map(function(e) {
    return e.name.value;
  })[0] || null;
}
function Sd(t) {
  return t.definitions.filter(function(e) {
    return e.kind === "FragmentDefinition";
  });
}
function Q8(t) {
  var e = n0(t);
  return __DEV__ ? Q(e && e.operation === "query", "Must contain a query definition.") : Q(e && e.operation === "query", 47), e;
}
function mN(t) {
  __DEV__ ? Q(t.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : Q(t.kind === "Document", 48), __DEV__ ? Q(t.definitions.length <= 1, "Fragment must have exactly one definition.") : Q(t.definitions.length <= 1, 49);
  var e = t.definitions[0];
  return __DEV__ ? Q(e.kind === "FragmentDefinition", "Must be a fragment definition.") : Q(e.kind === "FragmentDefinition", 50), e;
}
function Yg(t) {
  Ed(t);
  for (var e, r = 0, n = t.definitions; r < n.length; r++) {
    var i = n[r];
    if (i.kind === "OperationDefinition") {
      var o = i.operation;
      if (o === "query" || o === "mutation" || o === "subscription")
        return i;
    }
    i.kind === "FragmentDefinition" && !e && (e = i);
  }
  if (e)
    return e;
  throw __DEV__ ? new Ge("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.") : new Ge(51);
}
function Xg(t) {
  var e = /* @__PURE__ */ Object.create(null), r = t && t.variableDefinitions;
  return r && r.length && r.forEach(function(n) {
    n.defaultValue && Cs(e, n.variable.name, n.defaultValue);
  }), e;
}
function ry(t, e, r) {
  var n = 0;
  return t.forEach(function(i, o) {
    e.call(this, i, o, t) && (t[n++] = i);
  }, r), t.length = n, t;
}
var ny = {
  kind: "Field",
  name: {
    kind: "Name",
    value: "__typename"
  }
};
function K8(t, e) {
  return t.selectionSet.selections.every(function(r) {
    return r.kind === "FragmentSpread" && K8(e[r.name.value], e);
  });
}
function Zg(t) {
  return K8(n0(t) || mN(t), bd(Sd(t))) ? null : t;
}
function iy(t) {
  return function(r) {
    return t.some(function(n) {
      return n.name && n.name === r.name.value || n.test && n.test(r);
    });
  };
}
function Y8(t, e) {
  var r = /* @__PURE__ */ Object.create(null), n = [], i = /* @__PURE__ */ Object.create(null), o = [], a = Zg(oi(e, {
    Variable: {
      enter: function(s, l, u) {
        u.kind !== "VariableDefinition" && (r[s.name.value] = !0);
      }
    },
    Field: {
      enter: function(s) {
        if (t && s.directives) {
          var l = t.some(function(u) {
            return u.remove;
          });
          if (l && s.directives && s.directives.some(iy(t)))
            return s.arguments && s.arguments.forEach(function(u) {
              u.value.kind === "Variable" && n.push({
                name: u.value.name.value
              });
            }), s.selectionSet && X8(s.selectionSet).forEach(function(u) {
              o.push({
                name: u.name.value
              });
            }), null;
        }
      }
    },
    FragmentSpread: {
      enter: function(s) {
        i[s.name.value] = !0;
      }
    },
    Directive: {
      enter: function(s) {
        if (iy(t)(s))
          return null;
      }
    }
  }));
  return a && ry(n, function(s) {
    return !!s.name && !r[s.name];
  }).length && (a = xN(n, a)), a && ry(o, function(s) {
    return !!s.name && !i[s.name];
  }).length && (a = bN(o, a)), a;
}
var Jg = Object.assign(function(t) {
  return oi(t, {
    SelectionSet: {
      enter: function(e, r, n) {
        if (!(n && n.kind === "OperationDefinition")) {
          var i = e.selections;
          if (!!i) {
            var o = i.some(function(s) {
              return Mi(s) && (s.name.value === "__typename" || s.name.value.lastIndexOf("__", 0) === 0);
            });
            if (!o) {
              var a = n;
              if (!(Mi(a) && a.directives && a.directives.some(function(s) {
                return s.name.value === "export";
              })))
                return O(O({}, e), { selections: Xt(Xt([], i, !0), [ny], !1) });
            }
          }
        }
      }
    }
  });
}, {
  added: function(t) {
    return t === ny;
  }
}), gN = {
  test: function(t) {
    var e = t.name.value === "connection";
    return e && (!t.arguments || !t.arguments.some(function(r) {
      return r.name.value === "key";
    })) && __DEV__ && Q.warn("Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key."), e;
  }
};
function vN(t) {
  return Y8([gN], Ed(t));
}
function yN(t) {
  return function(r) {
    return t.some(function(n) {
      return r.value && r.value.kind === "Variable" && r.value.name && (n.name === r.value.name.value || n.test && n.test(r));
    });
  };
}
function xN(t, e) {
  var r = yN(t);
  return Zg(oi(e, {
    OperationDefinition: {
      enter: function(n) {
        return O(O({}, n), { variableDefinitions: n.variableDefinitions ? n.variableDefinitions.filter(function(i) {
          return !t.some(function(o) {
            return o.name === i.variable.name.value;
          });
        }) : [] });
      }
    },
    Field: {
      enter: function(n) {
        var i = t.some(function(a) {
          return a.remove;
        });
        if (i) {
          var o = 0;
          if (n.arguments && n.arguments.forEach(function(a) {
            r(a) && (o += 1);
          }), o === 1)
            return null;
        }
      }
    },
    Argument: {
      enter: function(n) {
        if (r(n))
          return null;
      }
    }
  }));
}
function bN(t, e) {
  function r(n) {
    if (t.some(function(i) {
      return i.name === n.name.value;
    }))
      return null;
  }
  return Zg(oi(e, {
    FragmentSpread: { enter: r },
    FragmentDefinition: { enter: r }
  }));
}
function X8(t) {
  var e = [];
  return t.selections.forEach(function(r) {
    (Mi(r) || W8(r)) && r.selectionSet ? X8(r.selectionSet).forEach(function(n) {
      return e.push(n);
    }) : r.kind === "FragmentSpread" && e.push(r);
  }), e;
}
function wN(t) {
  var e = Yg(t), r = e.operation;
  if (r === "query")
    return t;
  var n = oi(t, {
    OperationDefinition: {
      enter: function(i) {
        return O(O({}, i), { operation: "query" });
      }
    }
  });
  return n;
}
function EN(t) {
  Ed(t);
  var e = Y8([
    {
      test: function(r) {
        return r.name.value === "client";
      },
      remove: !0
    }
  ], t);
  return e && (e = oi(e, {
    FragmentDefinition: {
      enter: function(r) {
        if (r.selectionSet) {
          var n = r.selectionSet.selections.every(function(i) {
            return Mi(i) && i.name.value === "__typename";
          });
          if (n)
            return null;
        }
      }
    }
  })), e;
}
var SN = Object.prototype.hasOwnProperty;
function Tf() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  return ev(t);
}
function ev(t) {
  var e = t[0] || {}, r = t.length;
  if (r > 1)
    for (var n = new Ts(), i = 1; i < r; ++i)
      e = n.merge(e, t[i]);
  return e;
}
var _N = function(t, e, r) {
  return this.merge(t[r], e[r]);
}, Ts = function() {
  function t(e) {
    e === void 0 && (e = _N), this.reconciler = e, this.isObject = vt, this.pastCopies = /* @__PURE__ */ new Set();
  }
  return t.prototype.merge = function(e, r) {
    for (var n = this, i = [], o = 2; o < arguments.length; o++)
      i[o - 2] = arguments[o];
    return vt(r) && vt(e) ? (Object.keys(r).forEach(function(a) {
      if (SN.call(e, a)) {
        var s = e[a];
        if (r[a] !== s) {
          var l = n.reconciler.apply(n, Xt([e, r, a], i, !1));
          l !== s && (e = n.shallowCopyForMerge(e), e[a] = l);
        }
      } else
        e = n.shallowCopyForMerge(e), e[a] = r[a];
    }), e) : r;
  }, t.prototype.shallowCopyForMerge = function(e) {
    return vt(e) && (this.pastCopies.has(e) || (Array.isArray(e) ? e = e.slice(0) : e = O({ __proto__: Object.getPrototypeOf(e) }, e), this.pastCopies.add(e))), e;
  }, t;
}();
function CN(t) {
  return t === void 0 && (t = !1), {
    keyArgs: t,
    read: function(e, r) {
      var n = r.canRead, i = r.readField;
      if (!e)
        return e;
      var o = [], a = "", s = "";
      e.edges.forEach(function(f) {
        n(i("node", f)) && (o.push(f), f.cursor && (a = a || f.cursor || "", s = f.cursor || s));
      });
      var l = e.pageInfo || {}, u = l.startCursor, c = l.endCursor;
      return O(O({}, Uh(e)), { edges: o, pageInfo: O(O({}, e.pageInfo), { startCursor: u || a, endCursor: c || s }) });
    },
    merge: function(e, r, n) {
      var i = n.args, o = n.isReference, a = n.readField;
      if (e || (e = NN()), !r)
        return e;
      var s = r.edges ? r.edges.map(function(A) {
        return o(A = O({}, A)) && (A.cursor = a("cursor", A)), A;
      }) : [];
      if (r.pageInfo) {
        var l = r.pageInfo, u = l.startCursor, c = l.endCursor, f = s[0], d = s[s.length - 1];
        f && u && (f.cursor = u), d && c && (d.cursor = c);
        var h = f && f.cursor;
        h && !u && (r = Tf(r, {
          pageInfo: {
            startCursor: h
          }
        }));
        var m = d && d.cursor;
        m && !c && (r = Tf(r, {
          pageInfo: {
            endCursor: m
          }
        }));
      }
      var g = e.edges, S = [];
      if (i && i.after) {
        var b = g.findIndex(function(A) {
          return A.cursor === i.after;
        });
        b >= 0 && (g = g.slice(0, b + 1));
      } else if (i && i.before) {
        var b = g.findIndex(function(R) {
          return R.cursor === i.before;
        });
        S = b < 0 ? g : g.slice(b), g = [];
      } else
        r.edges && (g = []);
      var x = Xt(Xt(Xt([], g, !0), s, !0), S, !0), v = O(O({}, r.pageInfo), e.pageInfo);
      if (r.pageInfo) {
        var w = r.pageInfo, _ = w.hasPreviousPage, T = w.hasNextPage, u = w.startCursor, c = w.endCursor, N = $r(w, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
        Object.assign(v, N), g.length || (_ !== void 0 && (v.hasPreviousPage = _), u !== void 0 && (v.startCursor = u)), S.length || (T !== void 0 && (v.hasNextPage = T), c !== void 0 && (v.endCursor = c));
      }
      return O(O(O({}, Uh(e)), Uh(r)), { edges: x, pageInfo: v });
    }
  };
}
var Uh = function(t) {
  return $r(t, TN);
}, TN = ["edges", "pageInfo"];
function NN() {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: !1,
      hasNextPage: !0,
      startCursor: "",
      endCursor: ""
    }
  };
}
function DN(t, e) {
  var r = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r)
    return (r = r.call(t)).next.bind(r);
  if (Array.isArray(t) || (r = kN(t)) || e && t && typeof t.length == "number") {
    r && (t = r);
    var n = 0;
    return function() {
      return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kN(t, e) {
  if (!!t) {
    if (typeof t == "string")
      return oy(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return oy(t, e);
  }
}
function oy(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function ay(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function tv(t, e, r) {
  return e && ay(t.prototype, e), r && ay(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
var rv = function() {
  return typeof Symbol == "function";
}, nv = function(t) {
  return rv() && Boolean(Symbol[t]);
}, iv = function(t) {
  return nv(t) ? Symbol[t] : "@@" + t;
};
rv() && !nv("observable") && (Symbol.observable = Symbol("observable"));
var ON = iv("iterator"), $p = iv("observable"), Z8 = iv("species");
function Nf(t, e) {
  var r = t[e];
  if (r != null) {
    if (typeof r != "function")
      throw new TypeError(r + " is not a function");
    return r;
  }
}
function ml(t) {
  var e = t.constructor;
  return e !== void 0 && (e = e[Z8], e === null && (e = void 0)), e !== void 0 ? e : Be;
}
function AN(t) {
  return t instanceof Be;
}
function Ns(t) {
  Ns.log ? Ns.log(t) : setTimeout(function() {
    throw t;
  });
}
function Mc(t) {
  Promise.resolve().then(function() {
    try {
      t();
    } catch (e) {
      Ns(e);
    }
  });
}
function J8(t) {
  var e = t._cleanup;
  if (e !== void 0 && (t._cleanup = void 0, !!e))
    try {
      if (typeof e == "function")
        e();
      else {
        var r = Nf(e, "unsubscribe");
        r && r.call(e);
      }
    } catch (n) {
      Ns(n);
    }
}
function Fp(t) {
  t._observer = void 0, t._queue = void 0, t._state = "closed";
}
function MN(t) {
  var e = t._queue;
  if (!!e) {
    t._queue = void 0, t._state = "ready";
    for (var r = 0; r < e.length && (e9(t, e[r].type, e[r].value), t._state !== "closed"); ++r)
      ;
  }
}
function e9(t, e, r) {
  t._state = "running";
  var n = t._observer;
  try {
    var i = Nf(n, e);
    switch (e) {
      case "next":
        i && i.call(n, r);
        break;
      case "error":
        if (Fp(t), i)
          i.call(n, r);
        else
          throw r;
        break;
      case "complete":
        Fp(t), i && i.call(n);
        break;
    }
  } catch (o) {
    Ns(o);
  }
  t._state === "closed" ? J8(t) : t._state === "running" && (t._state = "ready");
}
function jh(t, e, r) {
  if (t._state !== "closed") {
    if (t._state === "buffering") {
      t._queue.push({
        type: e,
        value: r
      });
      return;
    }
    if (t._state !== "ready") {
      t._state = "buffering", t._queue = [{
        type: e,
        value: r
      }], Mc(function() {
        return MN(t);
      });
      return;
    }
    e9(t, e, r);
  }
}
var RN = /* @__PURE__ */ function() {
  function t(r, n) {
    this._cleanup = void 0, this._observer = r, this._queue = void 0, this._state = "initializing";
    var i = new LN(this);
    try {
      this._cleanup = n.call(void 0, i);
    } catch (o) {
      i.error(o);
    }
    this._state === "initializing" && (this._state = "ready");
  }
  var e = t.prototype;
  return e.unsubscribe = function() {
    this._state !== "closed" && (Fp(this), J8(this));
  }, tv(t, [{
    key: "closed",
    get: function() {
      return this._state === "closed";
    }
  }]), t;
}(), LN = /* @__PURE__ */ function() {
  function t(r) {
    this._subscription = r;
  }
  var e = t.prototype;
  return e.next = function(n) {
    jh(this._subscription, "next", n);
  }, e.error = function(n) {
    jh(this._subscription, "error", n);
  }, e.complete = function() {
    jh(this._subscription, "complete");
  }, tv(t, [{
    key: "closed",
    get: function() {
      return this._subscription._state === "closed";
    }
  }]), t;
}(), Be = /* @__PURE__ */ function() {
  function t(r) {
    if (!(this instanceof t))
      throw new TypeError("Observable cannot be called as a function");
    if (typeof r != "function")
      throw new TypeError("Observable initializer must be a function");
    this._subscriber = r;
  }
  var e = t.prototype;
  return e.subscribe = function(n) {
    return (typeof n != "object" || n === null) && (n = {
      next: n,
      error: arguments[1],
      complete: arguments[2]
    }), new RN(n, this._subscriber);
  }, e.forEach = function(n) {
    var i = this;
    return new Promise(function(o, a) {
      if (typeof n != "function") {
        a(new TypeError(n + " is not a function"));
        return;
      }
      function s() {
        l.unsubscribe(), o();
      }
      var l = i.subscribe({
        next: function(u) {
          try {
            n(u, s);
          } catch (c) {
            a(c), l.unsubscribe();
          }
        },
        error: a,
        complete: o
      });
    });
  }, e.map = function(n) {
    var i = this;
    if (typeof n != "function")
      throw new TypeError(n + " is not a function");
    var o = ml(this);
    return new o(function(a) {
      return i.subscribe({
        next: function(s) {
          try {
            s = n(s);
          } catch (l) {
            return a.error(l);
          }
          a.next(s);
        },
        error: function(s) {
          a.error(s);
        },
        complete: function() {
          a.complete();
        }
      });
    });
  }, e.filter = function(n) {
    var i = this;
    if (typeof n != "function")
      throw new TypeError(n + " is not a function");
    var o = ml(this);
    return new o(function(a) {
      return i.subscribe({
        next: function(s) {
          try {
            if (!n(s))
              return;
          } catch (l) {
            return a.error(l);
          }
          a.next(s);
        },
        error: function(s) {
          a.error(s);
        },
        complete: function() {
          a.complete();
        }
      });
    });
  }, e.reduce = function(n) {
    var i = this;
    if (typeof n != "function")
      throw new TypeError(n + " is not a function");
    var o = ml(this), a = arguments.length > 1, s = !1, l = arguments[1], u = l;
    return new o(function(c) {
      return i.subscribe({
        next: function(f) {
          var d = !s;
          if (s = !0, !d || a)
            try {
              u = n(u, f);
            } catch (h) {
              return c.error(h);
            }
          else
            u = f;
        },
        error: function(f) {
          c.error(f);
        },
        complete: function() {
          if (!s && !a)
            return c.error(new TypeError("Cannot reduce an empty sequence"));
          c.next(u), c.complete();
        }
      });
    });
  }, e.concat = function() {
    for (var n = this, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    var s = ml(this);
    return new s(function(l) {
      var u, c = 0;
      function f(d) {
        u = d.subscribe({
          next: function(h) {
            l.next(h);
          },
          error: function(h) {
            l.error(h);
          },
          complete: function() {
            c === o.length ? (u = void 0, l.complete()) : f(s.from(o[c++]));
          }
        });
      }
      return f(n), function() {
        u && (u.unsubscribe(), u = void 0);
      };
    });
  }, e.flatMap = function(n) {
    var i = this;
    if (typeof n != "function")
      throw new TypeError(n + " is not a function");
    var o = ml(this);
    return new o(function(a) {
      var s = [], l = i.subscribe({
        next: function(c) {
          if (n)
            try {
              c = n(c);
            } catch (d) {
              return a.error(d);
            }
          var f = o.from(c).subscribe({
            next: function(d) {
              a.next(d);
            },
            error: function(d) {
              a.error(d);
            },
            complete: function() {
              var d = s.indexOf(f);
              d >= 0 && s.splice(d, 1), u();
            }
          });
          s.push(f);
        },
        error: function(c) {
          a.error(c);
        },
        complete: function() {
          u();
        }
      });
      function u() {
        l.closed && s.length === 0 && a.complete();
      }
      return function() {
        s.forEach(function(c) {
          return c.unsubscribe();
        }), l.unsubscribe();
      };
    });
  }, e[$p] = function() {
    return this;
  }, t.from = function(n) {
    var i = typeof this == "function" ? this : t;
    if (n == null)
      throw new TypeError(n + " is not an object");
    var o = Nf(n, $p);
    if (o) {
      var a = o.call(n);
      if (Object(a) !== a)
        throw new TypeError(a + " is not an object");
      return AN(a) && a.constructor === i ? a : new i(function(s) {
        return a.subscribe(s);
      });
    }
    if (nv("iterator") && (o = Nf(n, ON), o))
      return new i(function(s) {
        Mc(function() {
          if (!s.closed) {
            for (var l = DN(o.call(n)), u; !(u = l()).done; ) {
              var c = u.value;
              if (s.next(c), s.closed)
                return;
            }
            s.complete();
          }
        });
      });
    if (Array.isArray(n))
      return new i(function(s) {
        Mc(function() {
          if (!s.closed) {
            for (var l = 0; l < n.length; ++l)
              if (s.next(n[l]), s.closed)
                return;
            s.complete();
          }
        });
      });
    throw new TypeError(n + " is not observable");
  }, t.of = function() {
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
      i[o] = arguments[o];
    var a = typeof this == "function" ? this : t;
    return new a(function(s) {
      Mc(function() {
        if (!s.closed) {
          for (var l = 0; l < i.length; ++l)
            if (s.next(i[l]), s.closed)
              return;
          s.complete();
        }
      });
    });
  }, tv(t, null, [{
    key: Z8,
    get: function() {
      return this;
    }
  }]), t;
}();
rv() && Object.defineProperty(Be, Symbol("extensions"), {
  value: {
    symbol: $p,
    hostReportError: Ns
  },
  configurable: !0
});
function IN(t) {
  var e, r = t.Symbol;
  if (typeof r == "function")
    if (r.observable)
      e = r.observable;
    else {
      typeof r.for == "function" ? e = r.for("https://github.com/benlesh/symbol-observable") : e = r("https://github.com/benlesh/symbol-observable");
      try {
        r.observable = e;
      } catch {
      }
    }
  else
    e = "@@observable";
  return e;
}
var Pa;
typeof self < "u" ? Pa = self : typeof window < "u" ? Pa = window : typeof global < "u" ? Pa = global : typeof module < "u" ? Pa = module : Pa = Function("return this")();
IN(Pa);
var sy = Be.prototype, ly = "@@observable";
sy[ly] || (sy[ly] = function() {
  return this;
});
var PN = Object.prototype.toString;
function t9(t) {
  return Bp(t);
}
function Bp(t, e) {
  switch (PN.call(t)) {
    case "[object Array]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var r = t.slice(0);
      return e.set(t, r), r.forEach(function(i, o) {
        r[o] = Bp(i, e);
      }), r;
    }
    case "[object Object]": {
      if (e = e || /* @__PURE__ */ new Map(), e.has(t))
        return e.get(t);
      var n = Object.create(Object.getPrototypeOf(t));
      return e.set(t, n), Object.keys(t).forEach(function(i) {
        n[i] = Bp(t[i], e);
      }), n;
    }
    default:
      return t;
  }
}
function $N(t) {
  var e = /* @__PURE__ */ new Set([t]);
  return e.forEach(function(r) {
    vt(r) && FN(r) === r && Object.getOwnPropertyNames(r).forEach(function(n) {
      vt(r[n]) && e.add(r[n]);
    });
  }), t;
}
function FN(t) {
  if (__DEV__ && !Object.isFrozen(t))
    try {
      Object.freeze(t);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  return t;
}
function Nu(t) {
  return __DEV__ && $N(t), t;
}
function Gl(t, e, r) {
  var n = [];
  t.forEach(function(i) {
    return i[e] && n.push(i);
  }), n.forEach(function(i) {
    return i[e](r);
  });
}
function Vh(t, e, r) {
  return new Be(function(n) {
    var i = n.next, o = n.error, a = n.complete, s = 0, l = !1, u = {
      then: function(h) {
        return new Promise(function(m) {
          return m(h());
        });
      }
    };
    function c(h, m) {
      return h ? function(g) {
        ++s;
        var S = function() {
          return h(g);
        };
        u = u.then(S, S).then(function(b) {
          --s, i && i.call(n, b), l && f.complete();
        }, function(b) {
          throw --s, b;
        }).catch(function(b) {
          o && o.call(n, b);
        });
      } : function(g) {
        return m && m.call(n, g);
      };
    }
    var f = {
      next: c(e, i),
      error: c(r, o),
      complete: function() {
        l = !0, s || a && a.call(n);
      }
    }, d = t.subscribe(f);
    return function() {
      return d.unsubscribe();
    };
  });
}
var Mo = typeof WeakMap == "function" && un(function() {
  return navigator.product;
}) !== "ReactNative", r9 = typeof WeakSet == "function", n9 = typeof Symbol == "function" && typeof Symbol.for == "function", BN = typeof un(function() {
  return window.document.createElement;
}) == "function", zN = un(function() {
  return navigator.userAgent.indexOf("jsdom") >= 0;
}) || !1, HN = BN && !zN;
function i9(t) {
  function e(r) {
    Object.defineProperty(t, r, { value: Be });
  }
  return n9 && Symbol.species && e(Symbol.species), e("@@species"), t;
}
function uy(t) {
  return t && typeof t.then == "function";
}
var Ol = function(t) {
  rt(e, t);
  function e(r) {
    var n = t.call(this, function(i) {
      return n.addObserver(i), function() {
        return n.removeObserver(i);
      };
    }) || this;
    return n.observers = /* @__PURE__ */ new Set(), n.addCount = 0, n.promise = new Promise(function(i, o) {
      n.resolve = i, n.reject = o;
    }), n.handlers = {
      next: function(i) {
        n.sub !== null && (n.latest = ["next", i], Gl(n.observers, "next", i));
      },
      error: function(i) {
        var o = n.sub;
        o !== null && (o && setTimeout(function() {
          return o.unsubscribe();
        }), n.sub = null, n.latest = ["error", i], n.reject(i), Gl(n.observers, "error", i));
      },
      complete: function() {
        var i = n.sub;
        if (i !== null) {
          var o = n.sources.shift();
          o ? uy(o) ? o.then(function(a) {
            return n.sub = a.subscribe(n.handlers);
          }) : n.sub = o.subscribe(n.handlers) : (i && setTimeout(function() {
            return i.unsubscribe();
          }), n.sub = null, n.latest && n.latest[0] === "next" ? n.resolve(n.latest[1]) : n.resolve(), Gl(n.observers, "complete"));
        }
      }
    }, n.cancel = function(i) {
      n.reject(i), n.sources = [], n.handlers.complete();
    }, n.promise.catch(function(i) {
    }), typeof r == "function" && (r = [new Be(r)]), uy(r) ? r.then(function(i) {
      return n.start(i);
    }, n.handlers.error) : n.start(r), n;
  }
  return e.prototype.start = function(r) {
    this.sub === void 0 && (this.sources = Array.from(r), this.handlers.complete());
  }, e.prototype.deliverLastMessage = function(r) {
    if (this.latest) {
      var n = this.latest[0], i = r[n];
      i && i.call(r, this.latest[1]), this.sub === null && n === "next" && r.complete && r.complete();
    }
  }, e.prototype.addObserver = function(r) {
    this.observers.has(r) || (this.deliverLastMessage(r), this.observers.add(r), ++this.addCount);
  }, e.prototype.removeObserver = function(r, n) {
    this.observers.delete(r) && --this.addCount < 1 && !n && this.handlers.complete();
  }, e.prototype.cleanup = function(r) {
    var n = this, i = !1, o = function() {
      i || (i = !0, n.observers.delete(a), r());
    }, a = {
      next: o,
      error: o,
      complete: o
    }, s = this.addCount;
    this.addObserver(a), this.addCount = s;
  }, e;
}(Be);
i9(Ol);
function Eo(t) {
  return Array.isArray(t) && t.length > 0;
}
function Rc(t) {
  return t.errors && t.errors.length > 0 || !1;
}
function i0() {
  for (var t = [], e = 0; e < arguments.length; e++)
    t[e] = arguments[e];
  var r = /* @__PURE__ */ Object.create(null);
  return t.forEach(function(n) {
    !n || Object.keys(n).forEach(function(i) {
      var o = n[i];
      o !== void 0 && (r[i] = o);
    });
  }), r;
}
var cy = /* @__PURE__ */ new Map();
function zp(t) {
  var e = cy.get(t) || 1;
  return cy.set(t, e + 1), "".concat(t, ":").concat(e, ":").concat(Math.random().toString(36).slice(2));
}
function UN(t) {
  var e = zp("stringifyForDisplay");
  return JSON.stringify(t, function(r, n) {
    return n === void 0 ? e : n;
  }).split(JSON.stringify(e)).join("<undefined>");
}
function ls(t, e) {
  return i0(t, e, e.variables && {
    variables: O(O({}, t && t.variables), e.variables)
  });
}
function Df(t) {
  return new Be(function(e) {
    e.error(t);
  });
}
var fy = function(t, e, r) {
  var n = new Error(r);
  throw n.name = "ServerError", n.response = t, n.statusCode = t.status, n.result = e, n;
};
function jN(t) {
  for (var e = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ], r = 0, n = Object.keys(t); r < n.length; r++) {
    var i = n[r];
    if (e.indexOf(i) < 0)
      throw __DEV__ ? new Ge("illegal argument: ".concat(i)) : new Ge(24);
  }
  return t;
}
function VN(t, e) {
  var r = O({}, t), n = function(o) {
    typeof o == "function" ? r = O(O({}, r), o(r)) : r = O(O({}, r), o);
  }, i = function() {
    return O({}, r);
  };
  return Object.defineProperty(e, "setContext", {
    enumerable: !1,
    value: n
  }), Object.defineProperty(e, "getContext", {
    enumerable: !1,
    value: i
  }), e;
}
function qN(t) {
  var e = {
    variables: t.variables || {},
    extensions: t.extensions || {},
    operationName: t.operationName,
    query: t.query
  };
  return e.operationName || (e.operationName = typeof e.query != "string" ? Pp(e.query) || void 0 : ""), e;
}
function dy(t, e) {
  return e ? e(t) : Be.of();
}
function gl(t) {
  return typeof t == "function" ? new ai(t) : t;
}
function Y0(t) {
  return t.request.length <= 1;
}
var GN = function(t) {
  rt(e, t);
  function e(r, n) {
    var i = t.call(this, r) || this;
    return i.link = n, i;
  }
  return e;
}(Error), ai = function() {
  function t(e) {
    e && (this.request = e);
  }
  return t.empty = function() {
    return new t(function() {
      return Be.of();
    });
  }, t.from = function(e) {
    return e.length === 0 ? t.empty() : e.map(gl).reduce(function(r, n) {
      return r.concat(n);
    });
  }, t.split = function(e, r, n) {
    var i = gl(r), o = gl(n || new t(dy));
    return Y0(i) && Y0(o) ? new t(function(a) {
      return e(a) ? i.request(a) || Be.of() : o.request(a) || Be.of();
    }) : new t(function(a, s) {
      return e(a) ? i.request(a, s) || Be.of() : o.request(a, s) || Be.of();
    });
  }, t.execute = function(e, r) {
    return e.request(VN(r.context, qN(jN(r)))) || Be.of();
  }, t.concat = function(e, r) {
    var n = gl(e);
    if (Y0(n))
      return __DEV__ && Q.warn(new GN("You are calling concat on a terminating link, which will have no effect", n)), n;
    var i = gl(r);
    return Y0(i) ? new t(function(o) {
      return n.request(o, function(a) {
        return i.request(a) || Be.of();
      }) || Be.of();
    }) : new t(function(o, a) {
      return n.request(o, function(s) {
        return i.request(s, a) || Be.of();
      }) || Be.of();
    });
  }, t.prototype.split = function(e, r, n) {
    return this.concat(t.split(e, r, n || new t(dy)));
  }, t.prototype.concat = function(e) {
    return t.concat(this, e);
  }, t.prototype.request = function(e, r) {
    throw __DEV__ ? new Ge("request is not implemented") : new Ge(19);
  }, t.prototype.onError = function(e, r) {
    if (r && r.error)
      return r.error(e), !1;
    throw e;
  }, t.prototype.setOnError = function(e) {
    return this.onError = e, this;
  }, t;
}(), Hp = ai.execute, WN = "3.6.9", hy = Object.prototype.hasOwnProperty;
function o9(t) {
  return function(e) {
    return e.text().then(function(r) {
      try {
        return JSON.parse(r);
      } catch (i) {
        var n = i;
        throw n.name = "ServerParseError", n.response = e, n.statusCode = e.status, n.bodyText = r, n;
      }
    }).then(function(r) {
      return e.status >= 300 && fy(e, r, "Response not successful: Received status code ".concat(e.status)), !Array.isArray(r) && !hy.call(r, "data") && !hy.call(r, "errors") && fy(e, r, "Server response was missing for query '".concat(Array.isArray(t) ? t.map(function(n) {
        return n.operationName;
      }) : t.operationName, "'.")), r;
    });
  };
}
var kf = function(t, e) {
  var r;
  try {
    r = JSON.stringify(t);
  } catch (i) {
    var n = __DEV__ ? new Ge("Network request failed. ".concat(e, " is not serializable: ").concat(i.message)) : new Ge(21);
    throw n.parseError = i, n;
  }
  return r;
}, QN = {
  includeQuery: !0,
  includeExtensions: !1
}, KN = {
  accept: "*/*",
  "content-type": "application/json"
}, YN = {
  method: "POST"
}, a9 = {
  http: QN,
  headers: KN,
  options: YN
}, s9 = function(t, e) {
  return e(t);
};
function l9(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = {}, o = {};
  r.forEach(function(f) {
    i = O(O(O({}, i), f.options), { headers: O(O({}, i.headers), XN(f.headers)) }), f.credentials && (i.credentials = f.credentials), o = O(O({}, o), f.http);
  });
  var a = t.operationName, s = t.extensions, l = t.variables, u = t.query, c = { operationName: a, variables: l };
  return o.includeExtensions && (c.extensions = s), o.includeQuery && (c.query = e(u, GT)), {
    options: i,
    body: c
  };
}
function XN(t) {
  if (t) {
    var e = /* @__PURE__ */ Object.create(null);
    return Object.keys(Object(t)).forEach(function(r) {
      e[r.toLowerCase()] = t[r];
    }), e;
  }
  return t;
}
var u9 = function(t) {
  if (!t && typeof fetch > "u")
    throw __DEV__ ? new Ge(`
"fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

import fetch from 'cross-fetch';
import { ApolloClient, HttpLink } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', fetch })
});
    `) : new Ge(20);
}, c9 = function() {
  if (typeof AbortController > "u")
    return { controller: !1, signal: !1 };
  var t = new AbortController(), e = t.signal;
  return { controller: t, signal: e };
}, Up = function(t, e) {
  var r = t.getContext(), n = r.uri;
  return n || (typeof e == "function" ? e(t) : e || "/graphql");
};
function ZN(t, e) {
  var r = [], n = function(f, d) {
    r.push("".concat(f, "=").concat(encodeURIComponent(d)));
  };
  if ("query" in e && n("query", e.query), e.operationName && n("operationName", e.operationName), e.variables) {
    var i = void 0;
    try {
      i = kf(e.variables, "Variables map");
    } catch (f) {
      return { parseError: f };
    }
    n("variables", i);
  }
  if (e.extensions) {
    var o = void 0;
    try {
      o = kf(e.extensions, "Extensions map");
    } catch (f) {
      return { parseError: f };
    }
    n("extensions", o);
  }
  var a = "", s = t, l = t.indexOf("#");
  l !== -1 && (a = t.substr(l), s = t.substr(0, l));
  var u = s.indexOf("?") === -1 ? "?" : "&", c = s + u + r.join("&") + a;
  return { newURI: c };
}
var py = un(function() {
  return fetch;
}), JN = function(t) {
  t === void 0 && (t = {});
  var e = t.uri, r = e === void 0 ? "/graphql" : e, n = t.fetch, i = t.print, o = i === void 0 ? s9 : i, a = t.includeExtensions, s = t.useGETForQueries, l = t.includeUnusedVariables, u = l === void 0 ? !1 : l, c = $r(t, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
  __DEV__ && u9(n || py);
  var f = {
    http: { includeExtensions: a },
    options: c.fetchOptions,
    credentials: c.credentials,
    headers: c.headers
  };
  return new ai(function(d) {
    var h = Up(d, r), m = d.getContext(), g = {};
    if (m.clientAwareness) {
      var S = m.clientAwareness, b = S.name, x = S.version;
      b && (g["apollographql-client-name"] = b), x && (g["apollographql-client-version"] = x);
    }
    var v = O(O({}, g), m.headers), w = {
      http: m.http,
      options: m.fetchOptions,
      credentials: m.credentials,
      headers: v
    }, _ = l9(d, o, a9, f, w), T = _.options, N = _.body;
    if (N.variables && !u) {
      var A = new Set(Object.keys(N.variables));
      oi(d.query, {
        Variable: function(de, z, W) {
          W && W.kind !== "VariableDefinition" && A.delete(de.name.value);
        }
      }), A.size && (N.variables = O({}, N.variables), A.forEach(function(de) {
        delete N.variables[de];
      }));
    }
    var R;
    if (!T.signal) {
      var F = c9(), X = F.controller, le = F.signal;
      R = X, R && (T.signal = le);
    }
    var ye = function(de) {
      return de.kind === "OperationDefinition" && de.operation === "mutation";
    };
    if (s && !d.query.definitions.some(ye) && (T.method = "GET"), T.method === "GET") {
      var Ce = ZN(h, N), _e = Ce.newURI, Ee = Ce.parseError;
      if (Ee)
        return Df(Ee);
      h = _e;
    } else
      try {
        T.body = kf(N, "Payload");
      } catch (de) {
        return Df(de);
      }
    return new Be(function(de) {
      var z = n || un(function() {
        return fetch;
      }) || py;
      return z(h, T).then(function(W) {
        return d.setContext({ response: W }), W;
      }).then(o9(d)).then(function(W) {
        return de.next(W), de.complete(), W;
      }).catch(function(W) {
        W.name !== "AbortError" && (W.result && W.result.errors && W.result.data && de.next(W.result), de.error(W));
      }), function() {
        R && R.abort();
      };
    });
  });
}, f9 = function(t) {
  rt(e, t);
  function e(r) {
    r === void 0 && (r = {});
    var n = t.call(this, JN(r).request) || this;
    return n.options = r, n;
  }
  return e;
}(ai), d9 = Object.prototype, my = d9.toString, eD = d9.hasOwnProperty, gy = Function.prototype.toString, jp = /* @__PURE__ */ new Map();
function ft(t, e) {
  try {
    return Vp(t, e);
  } finally {
    jp.clear();
  }
}
function Vp(t, e) {
  if (t === e)
    return !0;
  var r = my.call(t), n = my.call(e);
  if (r !== n)
    return !1;
  switch (r) {
    case "[object Array]":
      if (t.length !== e.length)
        return !1;
    case "[object Object]": {
      if (yy(t, e))
        return !0;
      var i = vy(t), o = vy(e), a = i.length;
      if (a !== o.length)
        return !1;
      for (var s = 0; s < a; ++s)
        if (!eD.call(e, i[s]))
          return !1;
      for (var s = 0; s < a; ++s) {
        var l = i[s];
        if (!Vp(t[l], e[l]))
          return !1;
      }
      return !0;
    }
    case "[object Error]":
      return t.name === e.name && t.message === e.message;
    case "[object Number]":
      if (t !== t)
        return e !== e;
    case "[object Boolean]":
    case "[object Date]":
      return +t == +e;
    case "[object RegExp]":
    case "[object String]":
      return t == "".concat(e);
    case "[object Map]":
    case "[object Set]": {
      if (t.size !== e.size)
        return !1;
      if (yy(t, e))
        return !0;
      for (var u = t.entries(), c = r === "[object Map]"; ; ) {
        var f = u.next();
        if (f.done)
          break;
        var d = f.value, h = d[0], m = d[1];
        if (!e.has(h) || c && !Vp(m, e.get(h)))
          return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      t = new Uint8Array(t), e = new Uint8Array(e);
    case "[object DataView]": {
      var g = t.byteLength;
      if (g === e.byteLength)
        for (; g-- && t[g] === e[g]; )
          ;
      return g === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      var S = gy.call(t);
      return S !== gy.call(e) ? !1 : !nD(S, rD);
    }
  }
  return !1;
}
function vy(t) {
  return Object.keys(t).filter(tD, t);
}
function tD(t) {
  return this[t] !== void 0;
}
var rD = "{ [native code] }";
function nD(t, e) {
  var r = t.length - e.length;
  return r >= 0 && t.indexOf(e, r) === r;
}
function yy(t, e) {
  var r = jp.get(t);
  if (r) {
    if (r.has(e))
      return !0;
  } else
    jp.set(t, r = /* @__PURE__ */ new Set());
  return r.add(e), !1;
}
var iD = function() {
  return /* @__PURE__ */ Object.create(null);
}, h9 = Array.prototype, oD = h9.forEach, aD = h9.slice, o0 = function() {
  function t(e, r) {
    e === void 0 && (e = !0), r === void 0 && (r = iD), this.weakness = e, this.makeData = r;
  }
  return t.prototype.lookup = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return this.lookupArray(e);
  }, t.prototype.lookupArray = function(e) {
    var r = this;
    return oD.call(e, function(n) {
      return r = r.getChildTrie(n);
    }), r.data || (r.data = this.makeData(aD.call(e)));
  }, t.prototype.getChildTrie = function(e) {
    var r = this.weakness && sD(e) ? this.weak || (this.weak = /* @__PURE__ */ new WeakMap()) : this.strong || (this.strong = /* @__PURE__ */ new Map()), n = r.get(e);
    return n || r.set(e, n = new t(this.weakness, this.makeData)), n;
  }, t;
}();
function sD(t) {
  switch (typeof t) {
    case "object":
      if (t === null)
        break;
    case "function":
      return !0;
  }
  return !1;
}
var Qt = null, xy = {}, lD = 1, uD = function() {
  return function() {
    function t() {
      this.id = [
        "slot",
        lD++,
        Date.now(),
        Math.random().toString(36).slice(2)
      ].join(":");
    }
    return t.prototype.hasValue = function() {
      for (var e = Qt; e; e = e.parent)
        if (this.id in e.slots) {
          var r = e.slots[this.id];
          if (r === xy)
            break;
          return e !== Qt && (Qt.slots[this.id] = r), !0;
        }
      return Qt && (Qt.slots[this.id] = xy), !1;
    }, t.prototype.getValue = function() {
      if (this.hasValue())
        return Qt.slots[this.id];
    }, t.prototype.withValue = function(e, r, n, i) {
      var o, a = (o = {
        __proto__: null
      }, o[this.id] = e, o), s = Qt;
      Qt = { parent: s, slots: a };
      try {
        return r.apply(i, n);
      } finally {
        Qt = s;
      }
    }, t.bind = function(e) {
      var r = Qt;
      return function() {
        var n = Qt;
        try {
          return Qt = r, e.apply(this, arguments);
        } finally {
          Qt = n;
        }
      };
    }, t.noContext = function(e, r, n) {
      if (Qt) {
        var i = Qt;
        try {
          return Qt = null, e.apply(n, r);
        } finally {
          Qt = i;
        }
      } else
        return e.apply(n, r);
    }, t;
  }();
}, qh = "@wry/context:Slot", Gh = Array, _d = Gh[qh] || function() {
  var t = uD();
  try {
    Object.defineProperty(Gh, qh, {
      value: Gh[qh] = t,
      enumerable: !1,
      writable: !1,
      configurable: !1
    });
  } finally {
    return t;
  }
}();
_d.bind;
_d.noContext;
function cD() {
}
var fD = function() {
  function t(e, r) {
    e === void 0 && (e = 1 / 0), r === void 0 && (r = cD), this.max = e, this.dispose = r, this.map = /* @__PURE__ */ new Map(), this.newest = null, this.oldest = null;
  }
  return t.prototype.has = function(e) {
    return this.map.has(e);
  }, t.prototype.get = function(e) {
    var r = this.getNode(e);
    return r && r.value;
  }, t.prototype.getNode = function(e) {
    var r = this.map.get(e);
    if (r && r !== this.newest) {
      var n = r.older, i = r.newer;
      i && (i.older = n), n && (n.newer = i), r.older = this.newest, r.older.newer = r, r.newer = null, this.newest = r, r === this.oldest && (this.oldest = i);
    }
    return r;
  }, t.prototype.set = function(e, r) {
    var n = this.getNode(e);
    return n ? n.value = r : (n = {
      key: e,
      value: r,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.map.set(e, n), n.value);
  }, t.prototype.clean = function() {
    for (; this.oldest && this.map.size > this.max; )
      this.delete(this.oldest.key);
  }, t.prototype.delete = function(e) {
    var r = this.map.get(e);
    return r ? (r === this.newest && (this.newest = r.older), r === this.oldest && (this.oldest = r.newer), r.newer && (r.newer.older = r.older), r.older && (r.older.newer = r.newer), this.map.delete(e), this.dispose(r.value, e), !0) : !1;
  }, t;
}(), Cd = new _d(), Wh, dD = Object.prototype.hasOwnProperty, ov = (Wh = Array.from, Wh === void 0 ? function(t) {
  var e = [];
  return t.forEach(function(r) {
    return e.push(r);
  }), e;
} : Wh);
function Of(t) {
  var e = t.unsubscribe;
  typeof e == "function" && (t.unsubscribe = void 0, e());
}
var Du = [], hD = 100;
function Ds(t, e) {
  if (!t)
    throw new Error(e || "assertion failure");
}
function pD(t, e) {
  var r = t.length;
  return r > 0 && r === e.length && t[r - 1] === e[r - 1];
}
function p9(t) {
  switch (t.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return t[0];
    case 2:
      throw t[1];
  }
}
function mD(t) {
  return t.slice(0);
}
var gD = function() {
  function t(e) {
    this.fn = e, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++t.count;
  }
  return t.prototype.peek = function() {
    if (this.value.length === 1 && !So(this))
      return by(this), this.value[0];
  }, t.prototype.recompute = function(e) {
    return Ds(!this.recomputing, "already recomputing"), by(this), So(this) ? vD(this, e) : p9(this.value);
  }, t.prototype.setDirty = function() {
    this.dirty || (this.dirty = !0, this.value.length = 0, m9(this), Of(this));
  }, t.prototype.dispose = function() {
    var e = this;
    this.setDirty(), b9(this), av(this, function(r, n) {
      r.setDirty(), w9(r, e);
    });
  }, t.prototype.forget = function() {
    this.dispose();
  }, t.prototype.dependOn = function(e) {
    e.add(this), this.deps || (this.deps = Du.pop() || /* @__PURE__ */ new Set()), this.deps.add(e);
  }, t.prototype.forgetDeps = function() {
    var e = this;
    this.deps && (ov(this.deps).forEach(function(r) {
      return r.delete(e);
    }), this.deps.clear(), Du.push(this.deps), this.deps = null);
  }, t.count = 0, t;
}();
function by(t) {
  var e = Cd.getValue();
  if (e)
    return t.parents.add(e), e.childValues.has(t) || e.childValues.set(t, []), So(t) ? v9(e, t) : y9(e, t), e;
}
function vD(t, e) {
  return b9(t), Cd.withValue(t, yD, [t, e]), bD(t, e) && xD(t), p9(t.value);
}
function yD(t, e) {
  t.recomputing = !0, t.value.length = 0;
  try {
    t.value[0] = t.fn.apply(null, e);
  } catch (r) {
    t.value[1] = r;
  }
  t.recomputing = !1;
}
function So(t) {
  return t.dirty || !!(t.dirtyChildren && t.dirtyChildren.size);
}
function xD(t) {
  t.dirty = !1, !So(t) && g9(t);
}
function m9(t) {
  av(t, v9);
}
function g9(t) {
  av(t, y9);
}
function av(t, e) {
  var r = t.parents.size;
  if (r)
    for (var n = ov(t.parents), i = 0; i < r; ++i)
      e(n[i], t);
}
function v9(t, e) {
  Ds(t.childValues.has(e)), Ds(So(e));
  var r = !So(t);
  if (!t.dirtyChildren)
    t.dirtyChildren = Du.pop() || /* @__PURE__ */ new Set();
  else if (t.dirtyChildren.has(e))
    return;
  t.dirtyChildren.add(e), r && m9(t);
}
function y9(t, e) {
  Ds(t.childValues.has(e)), Ds(!So(e));
  var r = t.childValues.get(e);
  r.length === 0 ? t.childValues.set(e, mD(e.value)) : pD(r, e.value) || t.setDirty(), x9(t, e), !So(t) && g9(t);
}
function x9(t, e) {
  var r = t.dirtyChildren;
  r && (r.delete(e), r.size === 0 && (Du.length < hD && Du.push(r), t.dirtyChildren = null));
}
function b9(t) {
  t.childValues.size > 0 && t.childValues.forEach(function(e, r) {
    w9(t, r);
  }), t.forgetDeps(), Ds(t.dirtyChildren === null);
}
function w9(t, e) {
  e.parents.delete(t), t.childValues.delete(e), x9(t, e);
}
function bD(t, e) {
  if (typeof t.subscribe == "function")
    try {
      Of(t), t.unsubscribe = t.subscribe.apply(null, e);
    } catch {
      return t.setDirty(), !1;
    }
  return !0;
}
var wD = {
  setDirty: !0,
  dispose: !0,
  forget: !0
};
function E9(t) {
  var e = /* @__PURE__ */ new Map(), r = t && t.subscribe;
  function n(i) {
    var o = Cd.getValue();
    if (o) {
      var a = e.get(i);
      a || e.set(i, a = /* @__PURE__ */ new Set()), o.dependOn(a), typeof r == "function" && (Of(a), a.unsubscribe = r(i));
    }
  }
  return n.dirty = function(o, a) {
    var s = e.get(o);
    if (s) {
      var l = a && dD.call(wD, a) ? a : "setDirty";
      ov(s).forEach(function(u) {
        return u[l]();
      }), e.delete(o), Of(s);
    }
  }, n;
}
function S9() {
  var t = new o0(typeof WeakMap == "function");
  return function() {
    return t.lookupArray(arguments);
  };
}
S9();
var Qh = /* @__PURE__ */ new Set();
function Af(t, e) {
  e === void 0 && (e = /* @__PURE__ */ Object.create(null));
  var r = new fD(e.max || Math.pow(2, 16), function(u) {
    return u.dispose();
  }), n = e.keyArgs, i = e.makeCacheKey || S9(), o = function() {
    var u = i.apply(null, n ? n.apply(null, arguments) : arguments);
    if (u === void 0)
      return t.apply(null, arguments);
    var c = r.get(u);
    c || (r.set(u, c = new gD(t)), c.subscribe = e.subscribe, c.forget = function() {
      return r.delete(u);
    });
    var f = c.recompute(Array.prototype.slice.call(arguments));
    return r.set(u, c), Qh.add(r), Cd.hasValue() || (Qh.forEach(function(d) {
      return d.clean();
    }), Qh.clear()), f;
  };
  Object.defineProperty(o, "size", {
    get: function() {
      return r.map.size;
    },
    configurable: !1,
    enumerable: !1
  });
  function a(u) {
    var c = r.get(u);
    c && c.setDirty();
  }
  o.dirtyKey = a, o.dirty = function() {
    a(i.apply(null, arguments));
  };
  function s(u) {
    var c = r.get(u);
    if (c)
      return c.peek();
  }
  o.peekKey = s, o.peek = function() {
    return s(i.apply(null, arguments));
  };
  function l(u) {
    return r.delete(u);
  }
  return o.forgetKey = l, o.forget = function() {
    return l(i.apply(null, arguments));
  }, o.makeCacheKey = i, o.getKey = n ? function() {
    return i.apply(null, n.apply(null, arguments));
  } : i, Object.freeze(o);
}
var ED = function() {
  function t() {
    this.getFragmentDoc = Af(tN);
  }
  return t.prototype.batch = function(e) {
    var r = this, n = typeof e.optimistic == "string" ? e.optimistic : e.optimistic === !1 ? null : void 0, i;
    return this.performTransaction(function() {
      return i = e.update(r);
    }, n), i;
  }, t.prototype.recordOptimisticTransaction = function(e, r) {
    this.performTransaction(e, r);
  }, t.prototype.transformDocument = function(e) {
    return e;
  }, t.prototype.identify = function(e) {
  }, t.prototype.gc = function() {
    return [];
  }, t.prototype.modify = function(e) {
    return !1;
  }, t.prototype.transformForLink = function(e) {
    return e;
  }, t.prototype.readQuery = function(e, r) {
    return r === void 0 && (r = !!e.optimistic), this.read(O(O({}, e), { rootId: e.id || "ROOT_QUERY", optimistic: r }));
  }, t.prototype.readFragment = function(e, r) {
    return r === void 0 && (r = !!e.optimistic), this.read(O(O({}, e), { query: this.getFragmentDoc(e.fragment, e.fragmentName), rootId: e.id, optimistic: r }));
  }, t.prototype.writeQuery = function(e) {
    var r = e.id, n = e.data, i = $r(e, ["id", "data"]);
    return this.write(Object.assign(i, {
      dataId: r || "ROOT_QUERY",
      result: n
    }));
  }, t.prototype.writeFragment = function(e) {
    var r = e.id, n = e.data, i = e.fragment, o = e.fragmentName, a = $r(e, ["id", "data", "fragment", "fragmentName"]);
    return this.write(Object.assign(a, {
      query: this.getFragmentDoc(i, o),
      dataId: r,
      result: n
    }));
  }, t.prototype.updateQuery = function(e, r) {
    return this.batch({
      update: function(n) {
        var i = n.readQuery(e), o = r(i);
        return o == null ? i : (n.writeQuery(O(O({}, e), { data: o })), o);
      }
    });
  }, t.prototype.updateFragment = function(e, r) {
    return this.batch({
      update: function(n) {
        var i = n.readFragment(e), o = r(i);
        return o == null ? i : (n.writeFragment(O(O({}, e), { data: o })), o);
      }
    });
  }, t;
}(), _9 = function() {
  function t(e, r, n, i) {
    this.message = e, this.path = r, this.query = n, this.variables = i;
  }
  return t;
}(), Ut = Object.prototype.hasOwnProperty;
function C9(t, e) {
  var r = t.__typename, n = t.id, i = t._id;
  if (typeof r == "string" && (e && (e.keyObject = n !== void 0 ? { id: n } : i !== void 0 ? { _id: i } : void 0), n === void 0 && (n = i), n !== void 0))
    return "".concat(r, ":").concat(typeof n == "number" || typeof n == "string" ? n : JSON.stringify(n));
}
var T9 = {
  dataIdFromObject: C9,
  addTypename: !0,
  resultCaching: !0,
  canonizeResults: !1
};
function SD(t) {
  return i0(T9, t);
}
function N9(t) {
  var e = t.canonizeResults;
  return e === void 0 ? T9.canonizeResults : e;
}
function _D(t, e) {
  return ze(e) ? t.get(e.__ref, "__typename") : e && e.__typename;
}
var D9 = /^[_a-z][_0-9a-z]*/i;
function _o(t) {
  var e = t.match(D9);
  return e ? e[0] : t;
}
function qp(t, e, r) {
  return vt(e) ? Et(e) ? e.every(function(n) {
    return qp(t, n, r);
  }) : t.selections.every(function(n) {
    if (Mi(n) && xd(n, r)) {
      var i = ga(n);
      return Ut.call(e, i) && (!n.selectionSet || qp(n.selectionSet, e[i], r));
    }
    return !0;
  }) : !1;
}
function Xa(t) {
  return vt(t) && !ze(t) && !Et(t);
}
function CD() {
  return new Ts();
}
var Et = function(t) {
  return Array.isArray(t);
}, Lc = /* @__PURE__ */ Object.create(null), Kh = function() {
  return Lc;
}, wy = /* @__PURE__ */ Object.create(null), ku = function() {
  function t(e, r) {
    var n = this;
    this.policies = e, this.group = r, this.data = /* @__PURE__ */ Object.create(null), this.rootIds = /* @__PURE__ */ Object.create(null), this.refs = /* @__PURE__ */ Object.create(null), this.getFieldValue = function(i, o) {
      return Nu(ze(i) ? n.get(i.__ref, o) : i && i[o]);
    }, this.canRead = function(i) {
      return ze(i) ? n.has(i.__ref) : typeof i == "object";
    }, this.toReference = function(i, o) {
      if (typeof i == "string")
        return ss(i);
      if (ze(i))
        return i;
      var a = n.policies.identify(i)[0];
      if (a) {
        var s = ss(a);
        return o && n.merge(a, i), s;
      }
    };
  }
  return t.prototype.toObject = function() {
    return O({}, this.data);
  }, t.prototype.has = function(e) {
    return this.lookup(e, !0) !== void 0;
  }, t.prototype.get = function(e, r) {
    if (this.group.depend(e, r), Ut.call(this.data, e)) {
      var n = this.data[e];
      if (n && Ut.call(n, r))
        return n[r];
    }
    if (r === "__typename" && Ut.call(this.policies.rootTypenamesById, e))
      return this.policies.rootTypenamesById[e];
    if (this instanceof qi)
      return this.parent.get(e, r);
  }, t.prototype.lookup = function(e, r) {
    if (r && this.group.depend(e, "__exists"), Ut.call(this.data, e))
      return this.data[e];
    if (this instanceof qi)
      return this.parent.lookup(e, r);
    if (this.policies.rootTypenamesById[e])
      return /* @__PURE__ */ Object.create(null);
  }, t.prototype.merge = function(e, r) {
    var n = this, i;
    ze(e) && (e = e.__ref), ze(r) && (r = r.__ref);
    var o = typeof e == "string" ? this.lookup(i = e) : e, a = typeof r == "string" ? this.lookup(i = r) : r;
    if (!!a) {
      __DEV__ ? Q(typeof i == "string", "store.merge expects a string ID") : Q(typeof i == "string", 1);
      var s = new Ts(ND).merge(o, a);
      if (this.data[i] = s, s !== o && (delete this.refs[i], this.group.caching)) {
        var l = /* @__PURE__ */ Object.create(null);
        o || (l.__exists = 1), Object.keys(a).forEach(function(u) {
          if (!o || o[u] !== s[u]) {
            l[u] = 1;
            var c = _o(u);
            c !== u && !n.policies.hasKeyArgs(s.__typename, c) && (l[c] = 1), s[u] === void 0 && !(n instanceof qi) && delete s[u];
          }
        }), l.__typename && !(o && o.__typename) && this.policies.rootTypenamesById[i] === s.__typename && delete l.__typename, Object.keys(l).forEach(function(u) {
          return n.group.dirty(i, u);
        });
      }
    }
  }, t.prototype.modify = function(e, r) {
    var n = this, i = this.lookup(e);
    if (i) {
      var o = /* @__PURE__ */ Object.create(null), a = !1, s = !0, l = {
        DELETE: Lc,
        INVALIDATE: wy,
        isReference: ze,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: function(u, c) {
          return n.policies.readField(typeof u == "string" ? {
            fieldName: u,
            from: c || ss(e)
          } : u, { store: n });
        }
      };
      if (Object.keys(i).forEach(function(u) {
        var c = _o(u), f = i[u];
        if (f !== void 0) {
          var d = typeof r == "function" ? r : r[u] || r[c];
          if (d) {
            var h = d === Kh ? Lc : d(Nu(f), O(O({}, l), { fieldName: c, storeFieldName: u, storage: n.getStorage(e, u) }));
            h === wy ? n.group.dirty(e, u) : (h === Lc && (h = void 0), h !== f && (o[u] = h, a = !0, f = h));
          }
          f !== void 0 && (s = !1);
        }
      }), a)
        return this.merge(e, o), s && (this instanceof qi ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
    }
    return !1;
  }, t.prototype.delete = function(e, r, n) {
    var i, o = this.lookup(e);
    if (o) {
      var a = this.getFieldValue(o, "__typename"), s = r && n ? this.policies.getStoreFieldName({ typename: a, fieldName: r, args: n }) : r;
      return this.modify(e, s ? (i = {}, i[s] = Kh, i) : Kh);
    }
    return !1;
  }, t.prototype.evict = function(e, r) {
    var n = !1;
    return e.id && (Ut.call(this.data, e.id) && (n = this.delete(e.id, e.fieldName, e.args)), this instanceof qi && this !== r && (n = this.parent.evict(e, r) || n), (e.fieldName || n) && this.group.dirty(e.id, e.fieldName || "__exists")), n;
  }, t.prototype.clear = function() {
    this.replace(null);
  }, t.prototype.extract = function() {
    var e = this, r = this.toObject(), n = [];
    return this.getRootIdSet().forEach(function(i) {
      Ut.call(e.policies.rootTypenamesById, i) || n.push(i);
    }), n.length && (r.__META = { extraRootIds: n.sort() }), r;
  }, t.prototype.replace = function(e) {
    var r = this;
    if (Object.keys(this.data).forEach(function(o) {
      e && Ut.call(e, o) || r.delete(o);
    }), e) {
      var n = e.__META, i = $r(e, ["__META"]);
      Object.keys(i).forEach(function(o) {
        r.merge(o, i[o]);
      }), n && n.extraRootIds.forEach(this.retain, this);
    }
  }, t.prototype.retain = function(e) {
    return this.rootIds[e] = (this.rootIds[e] || 0) + 1;
  }, t.prototype.release = function(e) {
    if (this.rootIds[e] > 0) {
      var r = --this.rootIds[e];
      return r || delete this.rootIds[e], r;
    }
    return 0;
  }, t.prototype.getRootIdSet = function(e) {
    return e === void 0 && (e = /* @__PURE__ */ new Set()), Object.keys(this.rootIds).forEach(e.add, e), this instanceof qi ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
  }, t.prototype.gc = function() {
    var e = this, r = this.getRootIdSet(), n = this.toObject();
    r.forEach(function(a) {
      Ut.call(n, a) && (Object.keys(e.findChildRefIds(a)).forEach(r.add, r), delete n[a]);
    });
    var i = Object.keys(n);
    if (i.length) {
      for (var o = this; o instanceof qi; )
        o = o.parent;
      i.forEach(function(a) {
        return o.delete(a);
      });
    }
    return i;
  }, t.prototype.findChildRefIds = function(e) {
    if (!Ut.call(this.refs, e)) {
      var r = this.refs[e] = /* @__PURE__ */ Object.create(null), n = this.data[e];
      if (!n)
        return r;
      var i = /* @__PURE__ */ new Set([n]);
      i.forEach(function(o) {
        ze(o) && (r[o.__ref] = !0), vt(o) && Object.keys(o).forEach(function(a) {
          var s = o[a];
          vt(s) && i.add(s);
        });
      });
    }
    return this.refs[e];
  }, t.prototype.makeCacheKey = function() {
    return this.group.keyMaker.lookupArray(arguments);
  }, t;
}(), k9 = function() {
  function t(e, r) {
    r === void 0 && (r = null), this.caching = e, this.parent = r, this.d = null, this.resetCaching();
  }
  return t.prototype.resetCaching = function() {
    this.d = this.caching ? E9() : null, this.keyMaker = new o0(Mo);
  }, t.prototype.depend = function(e, r) {
    if (this.d) {
      this.d(Yh(e, r));
      var n = _o(r);
      n !== r && this.d(Yh(e, n)), this.parent && this.parent.depend(e, r);
    }
  }, t.prototype.dirty = function(e, r) {
    this.d && this.d.dirty(Yh(e, r), r === "__exists" ? "forget" : "setDirty");
  }, t;
}();
function Yh(t, e) {
  return e + "#" + t;
}
function Ey(t, e) {
  Wl(t) && t.group.depend(e, "__exists");
}
(function(t) {
  var e = function(r) {
    rt(n, r);
    function n(i) {
      var o = i.policies, a = i.resultCaching, s = a === void 0 ? !0 : a, l = i.seed, u = r.call(this, o, new k9(s)) || this;
      return u.stump = new TD(u), u.storageTrie = new o0(Mo), l && u.replace(l), u;
    }
    return n.prototype.addLayer = function(i, o) {
      return this.stump.addLayer(i, o);
    }, n.prototype.removeLayer = function() {
      return this;
    }, n.prototype.getStorage = function() {
      return this.storageTrie.lookupArray(arguments);
    }, n;
  }(t);
  t.Root = e;
})(ku || (ku = {}));
var qi = function(t) {
  rt(e, t);
  function e(r, n, i, o) {
    var a = t.call(this, n.policies, o) || this;
    return a.id = r, a.parent = n, a.replay = i, a.group = o, i(a), a;
  }
  return e.prototype.addLayer = function(r, n) {
    return new e(r, this, n, this.group);
  }, e.prototype.removeLayer = function(r) {
    var n = this, i = this.parent.removeLayer(r);
    return r === this.id ? (this.group.caching && Object.keys(this.data).forEach(function(o) {
      var a = n.data[o], s = i.lookup(o);
      s ? a ? a !== s && Object.keys(a).forEach(function(l) {
        ft(a[l], s[l]) || n.group.dirty(o, l);
      }) : (n.group.dirty(o, "__exists"), Object.keys(s).forEach(function(l) {
        n.group.dirty(o, l);
      })) : n.delete(o);
    }), i) : i === this.parent ? this : i.addLayer(this.id, this.replay);
  }, e.prototype.toObject = function() {
    return O(O({}, this.parent.toObject()), this.data);
  }, e.prototype.findChildRefIds = function(r) {
    var n = this.parent.findChildRefIds(r);
    return Ut.call(this.data, r) ? O(O({}, n), t.prototype.findChildRefIds.call(this, r)) : n;
  }, e.prototype.getStorage = function() {
    for (var r = this.parent; r.parent; )
      r = r.parent;
    return r.getStorage.apply(r, arguments);
  }, e;
}(ku), TD = function(t) {
  rt(e, t);
  function e(r) {
    return t.call(this, "EntityStore.Stump", r, function() {
    }, new k9(r.group.caching, r.group)) || this;
  }
  return e.prototype.removeLayer = function() {
    return this;
  }, e.prototype.merge = function() {
    return this.parent.merge.apply(this.parent, arguments);
  }, e;
}(qi);
function ND(t, e, r) {
  var n = t[r], i = e[r];
  return ft(n, i) ? n : i;
}
function Wl(t) {
  return !!(t instanceof ku && t.group.caching);
}
function DD(t) {
  return vt(t) ? Et(t) ? t.slice(0) : O({ __proto__: Object.getPrototypeOf(t) }, t) : t;
}
var Gp = function() {
  function t() {
    this.known = new (r9 ? WeakSet : Set)(), this.pool = new o0(Mo), this.passes = /* @__PURE__ */ new WeakMap(), this.keysByJSON = /* @__PURE__ */ new Map(), this.empty = this.admit({});
  }
  return t.prototype.isKnown = function(e) {
    return vt(e) && this.known.has(e);
  }, t.prototype.pass = function(e) {
    if (vt(e)) {
      var r = DD(e);
      return this.passes.set(r, e), r;
    }
    return e;
  }, t.prototype.admit = function(e) {
    var r = this;
    if (vt(e)) {
      var n = this.passes.get(e);
      if (n)
        return n;
      var i = Object.getPrototypeOf(e);
      switch (i) {
        case Array.prototype: {
          if (this.known.has(e))
            return e;
          var o = e.map(this.admit, this), a = this.pool.lookupArray(o);
          return a.array || (this.known.add(a.array = o), __DEV__ && Object.freeze(o)), a.array;
        }
        case null:
        case Object.prototype: {
          if (this.known.has(e))
            return e;
          var s = Object.getPrototypeOf(e), l = [s], u = this.sortedKeys(e);
          l.push(u.json);
          var c = l.length;
          u.sorted.forEach(function(h) {
            l.push(r.admit(e[h]));
          });
          var a = this.pool.lookupArray(l);
          if (!a.object) {
            var f = a.object = Object.create(s);
            this.known.add(f), u.sorted.forEach(function(h, m) {
              f[h] = l[c + m];
            }), __DEV__ && Object.freeze(f);
          }
          return a.object;
        }
      }
    }
    return e;
  }, t.prototype.sortedKeys = function(e) {
    var r = Object.keys(e), n = this.pool.lookupArray(r);
    if (!n.keys) {
      r.sort();
      var i = JSON.stringify(r);
      (n.keys = this.keysByJSON.get(i)) || this.keysByJSON.set(i, n.keys = { sorted: r, json: i });
    }
    return n.keys;
  }, t;
}(), ia = Object.assign(function(t) {
  if (vt(t)) {
    Wp === void 0 && Sy();
    var e = Wp.admit(t), r = Qp.get(e);
    return r === void 0 && Qp.set(e, r = JSON.stringify(e)), r;
  }
  return JSON.stringify(t);
}, {
  reset: Sy
}), Wp, Qp;
function Sy() {
  Wp = new Gp(), Qp = new (Mo ? WeakMap : Map)();
}
function _y(t) {
  return [
    t.selectionSet,
    t.objectOrReference,
    t.context,
    t.context.canonizeResults
  ];
}
var kD = function() {
  function t(e) {
    var r = this;
    this.knownResults = new (Mo ? WeakMap : Map)(), this.config = i0(e, {
      addTypename: e.addTypename !== !1,
      canonizeResults: N9(e)
    }), this.canon = e.canon || new Gp(), this.executeSelectionSet = Af(function(n) {
      var i, o = n.context.canonizeResults, a = _y(n);
      a[3] = !o;
      var s = (i = r.executeSelectionSet).peek.apply(i, a);
      return s ? o ? O(O({}, s), { result: r.canon.admit(s.result) }) : s : (Ey(n.context.store, n.enclosingRef.__ref), r.execSelectionSetImpl(n));
    }, {
      max: this.config.resultCacheMaxSize,
      keyArgs: _y,
      makeCacheKey: function(n, i, o, a) {
        if (Wl(o.store))
          return o.store.makeCacheKey(n, ze(i) ? i.__ref : i, o.varString, a);
      }
    }), this.executeSubSelectedArray = Af(function(n) {
      return Ey(n.context.store, n.enclosingRef.__ref), r.execSubSelectedArrayImpl(n);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(n) {
        var i = n.field, o = n.array, a = n.context;
        if (Wl(a.store))
          return a.store.makeCacheKey(i, o, a.varString);
      }
    });
  }
  return t.prototype.resetCanon = function() {
    this.canon = new Gp();
  }, t.prototype.diffQueryAgainstStore = function(e) {
    var r = e.store, n = e.query, i = e.rootId, o = i === void 0 ? "ROOT_QUERY" : i, a = e.variables, s = e.returnPartialData, l = s === void 0 ? !0 : s, u = e.canonizeResults, c = u === void 0 ? this.config.canonizeResults : u, f = this.config.cache.policies;
    a = O(O({}, Xg(Q8(n))), a);
    var d = ss(o), h = this.executeSelectionSet({
      selectionSet: Yg(n).selectionSet,
      objectOrReference: d,
      enclosingRef: d,
      context: {
        store: r,
        query: n,
        policies: f,
        variables: a,
        varString: ia(a),
        canonizeResults: c,
        fragmentMap: bd(Sd(n))
      }
    }), m;
    if (h.missing && (m = [new _9(OD(h.missing), h.missing, n, a)], !l))
      throw m[0];
    return {
      result: h.result,
      complete: !m,
      missing: m
    };
  }, t.prototype.isFresh = function(e, r, n, i) {
    if (Wl(i.store) && this.knownResults.get(e) === n) {
      var o = this.executeSelectionSet.peek(n, r, i, this.canon.isKnown(e));
      if (o && e === o.result)
        return !0;
    }
    return !1;
  }, t.prototype.execSelectionSetImpl = function(e) {
    var r = this, n = e.selectionSet, i = e.objectOrReference, o = e.enclosingRef, a = e.context;
    if (ze(i) && !a.policies.rootTypenamesById[i.__ref] && !a.store.has(i.__ref))
      return {
        result: this.canon.empty,
        missing: "Dangling reference to missing ".concat(i.__ref, " object")
      };
    var s = a.variables, l = a.policies, u = a.store, c = u.getFieldValue(i, "__typename"), f = [], d, h = new Ts();
    this.config.addTypename && typeof c == "string" && !l.rootIdsByTypename[c] && f.push({ __typename: c });
    function m(v, w) {
      var _;
      return v.missing && (d = h.merge(d, (_ = {}, _[w] = v.missing, _))), v.result;
    }
    var g = new Set(n.selections);
    g.forEach(function(v) {
      var w, _;
      if (!!xd(v, s))
        if (Mi(v)) {
          var T = l.readField({
            fieldName: v.name.value,
            field: v,
            variables: a.variables,
            from: i
          }, a), N = ga(v);
          T === void 0 ? Jg.added(v) || (d = h.merge(d, (w = {}, w[N] = "Can't find field '".concat(v.name.value, "' on ").concat(ze(i) ? i.__ref + " object" : "object " + JSON.stringify(i, null, 2)), w))) : Et(T) ? T = m(r.executeSubSelectedArray({
            field: v,
            array: T,
            enclosingRef: o,
            context: a
          }), N) : v.selectionSet ? T != null && (T = m(r.executeSelectionSet({
            selectionSet: v.selectionSet,
            objectOrReference: T,
            enclosingRef: ze(T) ? T : o,
            context: a
          }), N)) : a.canonizeResults && (T = r.canon.pass(T)), T !== void 0 && f.push((_ = {}, _[N] = T, _));
        } else {
          var A = Qg(v, a.fragmentMap);
          A && l.fragmentMatches(A, c) && A.selectionSet.selections.forEach(g.add, g);
        }
    });
    var S = ev(f), b = { result: S, missing: d }, x = a.canonizeResults ? this.canon.admit(b) : Nu(b);
    return x.result && this.knownResults.set(x.result, n), x;
  }, t.prototype.execSubSelectedArrayImpl = function(e) {
    var r = this, n = e.field, i = e.array, o = e.enclosingRef, a = e.context, s, l = new Ts();
    function u(c, f) {
      var d;
      return c.missing && (s = l.merge(s, (d = {}, d[f] = c.missing, d))), c.result;
    }
    return n.selectionSet && (i = i.filter(a.store.canRead)), i = i.map(function(c, f) {
      return c === null ? null : Et(c) ? u(r.executeSubSelectedArray({
        field: n,
        array: c,
        enclosingRef: o,
        context: a
      }), f) : n.selectionSet ? u(r.executeSelectionSet({
        selectionSet: n.selectionSet,
        objectOrReference: c,
        enclosingRef: ze(c) ? c : o,
        context: a
      }), f) : (__DEV__ && AD(a.store, n, c), c);
    }), {
      result: a.canonizeResults ? this.canon.admit(i) : i,
      missing: s
    };
  }, t;
}();
function OD(t) {
  try {
    JSON.stringify(t, function(e, r) {
      if (typeof r == "string")
        throw r;
      return r;
    });
  } catch (e) {
    return e;
  }
}
function AD(t, e, r) {
  if (!e.selectionSet) {
    var n = /* @__PURE__ */ new Set([r]);
    n.forEach(function(i) {
      vt(i) && (__DEV__ ? Q(!ze(i), "Missing selection set for object of type ".concat(_D(t, i), " returned for query field ").concat(e.name.value)) : Q(!ze(i), 5), Object.values(i).forEach(n.add, n));
    });
  }
}
var sv = new _d(), Cy = /* @__PURE__ */ new WeakMap();
function Ql(t) {
  var e = Cy.get(t);
  return e || Cy.set(t, e = {
    vars: /* @__PURE__ */ new Set(),
    dep: E9()
  }), e;
}
function Ty(t) {
  Ql(t).vars.forEach(function(e) {
    return e.forgetCache(t);
  });
}
function MD(t) {
  Ql(t).vars.forEach(function(e) {
    return e.attachCache(t);
  });
}
function RD(t) {
  var e = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), n = function(o) {
    if (arguments.length > 0) {
      if (t !== o) {
        t = o, e.forEach(function(l) {
          Ql(l).dep.dirty(n), LD(l);
        });
        var a = Array.from(r);
        r.clear(), a.forEach(function(l) {
          return l(t);
        });
      }
    } else {
      var s = sv.getValue();
      s && (i(s), Ql(s).dep(n));
    }
    return t;
  };
  n.onNextChange = function(o) {
    return r.add(o), function() {
      r.delete(o);
    };
  };
  var i = n.attachCache = function(o) {
    return e.add(o), Ql(o).vars.add(n), n;
  };
  return n.forgetCache = function(o) {
    return e.delete(o);
  }, n;
}
function LD(t) {
  t.broadcastWatches && t.broadcastWatches();
}
var Ny = /* @__PURE__ */ Object.create(null);
function lv(t) {
  var e = JSON.stringify(t);
  return Ny[e] || (Ny[e] = /* @__PURE__ */ Object.create(null));
}
function Dy(t) {
  var e = lv(t);
  return e.keyFieldsFn || (e.keyFieldsFn = function(r, n) {
    var i = function(a, s) {
      return n.readField(s, a);
    }, o = n.keyObject = uv(t, function(a) {
      var s = us(n.storeObject, a, i);
      return s === void 0 && r !== n.storeObject && Ut.call(r, a[0]) && (s = us(r, a, A9)), __DEV__ ? Q(s !== void 0, "Missing field '".concat(a.join("."), "' while extracting keyFields from ").concat(JSON.stringify(r))) : Q(s !== void 0, 2), s;
    });
    return "".concat(n.typename, ":").concat(JSON.stringify(o));
  });
}
function ky(t) {
  var e = lv(t);
  return e.keyArgsFn || (e.keyArgsFn = function(r, n) {
    var i = n.field, o = n.variables, a = n.fieldName, s = uv(t, function(u) {
      var c = u[0], f = c.charAt(0);
      if (f === "@") {
        if (i && Eo(i.directives)) {
          var d = c.slice(1), h = i.directives.find(function(b) {
            return b.name.value === d;
          }), m = h && wd(h, o);
          return m && us(m, u.slice(1));
        }
        return;
      }
      if (f === "$") {
        var g = c.slice(1);
        if (o && Ut.call(o, g)) {
          var S = u.slice(0);
          return S[0] = g, us(o, S);
        }
        return;
      }
      if (r)
        return us(r, u);
    }), l = JSON.stringify(s);
    return (r || l !== "{}") && (a += ":" + l), a;
  });
}
function uv(t, e) {
  var r = new Ts();
  return O9(t).reduce(function(n, i) {
    var o, a = e(i);
    if (a !== void 0) {
      for (var s = i.length - 1; s >= 0; --s)
        a = (o = {}, o[i[s]] = a, o);
      n = r.merge(n, a);
    }
    return n;
  }, /* @__PURE__ */ Object.create(null));
}
function O9(t) {
  var e = lv(t);
  if (!e.paths) {
    var r = e.paths = [], n = [];
    t.forEach(function(i, o) {
      Et(i) ? (O9(i).forEach(function(a) {
        return r.push(n.concat(a));
      }), n.length = 0) : (n.push(i), Et(t[o + 1]) || (r.push(n.slice(0)), n.length = 0));
    });
  }
  return e.paths;
}
function A9(t, e) {
  return t[e];
}
function us(t, e, r) {
  return r = r || A9, M9(e.reduce(function n(i, o) {
    return Et(i) ? i.map(function(a) {
      return n(a, o);
    }) : i && r(i, o);
  }, t));
}
function M9(t) {
  return vt(t) ? Et(t) ? t.map(M9) : uv(Object.keys(t).sort(), function(e) {
    return us(t, e);
  }) : t;
}
Kg.setStringify(ia);
function Kp(t) {
  return t.args !== void 0 ? t.args : t.field ? wd(t.field, t.variables) : null;
}
var ID = function() {
}, Oy = function(t, e) {
  return e.fieldName;
}, Ay = function(t, e, r) {
  var n = r.mergeObjects;
  return n(t, e);
}, My = function(t, e) {
  return e;
}, PD = function() {
  function t(e) {
    this.config = e, this.typePolicies = /* @__PURE__ */ Object.create(null), this.toBeAdded = /* @__PURE__ */ Object.create(null), this.supertypeMap = /* @__PURE__ */ new Map(), this.fuzzySubtypes = /* @__PURE__ */ new Map(), this.rootIdsByTypename = /* @__PURE__ */ Object.create(null), this.rootTypenamesById = /* @__PURE__ */ Object.create(null), this.usingPossibleTypes = !1, this.config = O({ dataIdFromObject: C9 }, e), this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
  }
  return t.prototype.identify = function(e, r) {
    var n, i = this, o = r && (r.typename || ((n = r.storeObject) === null || n === void 0 ? void 0 : n.__typename)) || e.__typename;
    if (o === this.rootTypenamesById.ROOT_QUERY)
      return ["ROOT_QUERY"];
    for (var a = r && r.storeObject || e, s = O(O({}, r), { typename: o, storeObject: a, readField: r && r.readField || function() {
      var d = cv(arguments, a);
      return i.readField(d, {
        store: i.cache.data,
        variables: d.variables
      });
    } }), l, u = o && this.getTypePolicy(o), c = u && u.keyFn || this.config.dataIdFromObject; c; ) {
      var f = c(e, s);
      if (Et(f))
        c = Dy(f);
      else {
        l = f;
        break;
      }
    }
    return l = l ? String(l) : void 0, s.keyObject ? [l, s.keyObject] : [l];
  }, t.prototype.addTypePolicies = function(e) {
    var r = this;
    Object.keys(e).forEach(function(n) {
      var i = e[n], o = i.queryType, a = i.mutationType, s = i.subscriptionType, l = $r(i, ["queryType", "mutationType", "subscriptionType"]);
      o && r.setRootTypename("Query", n), a && r.setRootTypename("Mutation", n), s && r.setRootTypename("Subscription", n), Ut.call(r.toBeAdded, n) ? r.toBeAdded[n].push(l) : r.toBeAdded[n] = [l];
    });
  }, t.prototype.updateTypePolicy = function(e, r) {
    var n = this, i = this.getTypePolicy(e), o = r.keyFields, a = r.fields;
    function s(l, u) {
      l.merge = typeof u == "function" ? u : u === !0 ? Ay : u === !1 ? My : l.merge;
    }
    s(i, r.merge), i.keyFn = o === !1 ? ID : Et(o) ? Dy(o) : typeof o == "function" ? o : i.keyFn, a && Object.keys(a).forEach(function(l) {
      var u = n.getFieldPolicy(e, l, !0), c = a[l];
      if (typeof c == "function")
        u.read = c;
      else {
        var f = c.keyArgs, d = c.read, h = c.merge;
        u.keyFn = f === !1 ? Oy : Et(f) ? ky(f) : typeof f == "function" ? f : u.keyFn, typeof d == "function" && (u.read = d), s(u, h);
      }
      u.read && u.merge && (u.keyFn = u.keyFn || Oy);
    });
  }, t.prototype.setRootTypename = function(e, r) {
    r === void 0 && (r = e);
    var n = "ROOT_" + e.toUpperCase(), i = this.rootTypenamesById[n];
    r !== i && (__DEV__ ? Q(!i || i === e, "Cannot change root ".concat(e, " __typename more than once")) : Q(!i || i === e, 3), i && delete this.rootIdsByTypename[i], this.rootIdsByTypename[r] = n, this.rootTypenamesById[n] = r);
  }, t.prototype.addPossibleTypes = function(e) {
    var r = this;
    this.usingPossibleTypes = !0, Object.keys(e).forEach(function(n) {
      r.getSupertypeSet(n, !0), e[n].forEach(function(i) {
        r.getSupertypeSet(i, !0).add(n);
        var o = i.match(D9);
        (!o || o[0] !== i) && r.fuzzySubtypes.set(i, new RegExp(i));
      });
    });
  }, t.prototype.getTypePolicy = function(e) {
    var r = this;
    if (!Ut.call(this.typePolicies, e)) {
      var n = this.typePolicies[e] = /* @__PURE__ */ Object.create(null);
      n.fields = /* @__PURE__ */ Object.create(null);
      var i = this.supertypeMap.get(e);
      i && i.size && i.forEach(function(a) {
        var s = r.getTypePolicy(a), l = s.fields, u = $r(s, ["fields"]);
        Object.assign(n, u), Object.assign(n.fields, l);
      });
    }
    var o = this.toBeAdded[e];
    return o && o.length && o.splice(0).forEach(function(a) {
      r.updateTypePolicy(e, a);
    }), this.typePolicies[e];
  }, t.prototype.getFieldPolicy = function(e, r, n) {
    if (e) {
      var i = this.getTypePolicy(e).fields;
      return i[r] || n && (i[r] = /* @__PURE__ */ Object.create(null));
    }
  }, t.prototype.getSupertypeSet = function(e, r) {
    var n = this.supertypeMap.get(e);
    return !n && r && this.supertypeMap.set(e, n = /* @__PURE__ */ new Set()), n;
  }, t.prototype.fragmentMatches = function(e, r, n, i) {
    var o = this;
    if (!e.typeCondition)
      return !0;
    if (!r)
      return !1;
    var a = e.typeCondition.name.value;
    if (r === a)
      return !0;
    if (this.usingPossibleTypes && this.supertypeMap.has(a))
      for (var s = this.getSupertypeSet(r, !0), l = [s], u = function(m) {
        var g = o.getSupertypeSet(m, !1);
        g && g.size && l.indexOf(g) < 0 && l.push(g);
      }, c = !!(n && this.fuzzySubtypes.size), f = !1, d = 0; d < l.length; ++d) {
        var h = l[d];
        if (h.has(a))
          return s.has(a) || (f && __DEV__ && Q.warn("Inferring subtype ".concat(r, " of supertype ").concat(a)), s.add(a)), !0;
        h.forEach(u), c && d === l.length - 1 && qp(e.selectionSet, n, i) && (c = !1, f = !0, this.fuzzySubtypes.forEach(function(m, g) {
          var S = r.match(m);
          S && S[0] === r && u(g);
        }));
      }
    return !1;
  }, t.prototype.hasKeyArgs = function(e, r) {
    var n = this.getFieldPolicy(e, r, !1);
    return !!(n && n.keyFn);
  }, t.prototype.getStoreFieldName = function(e) {
    var r = e.typename, n = e.fieldName, i = this.getFieldPolicy(r, n, !1), o, a = i && i.keyFn;
    if (a && r)
      for (var s = {
        typename: r,
        fieldName: n,
        field: e.field || null,
        variables: e.variables
      }, l = Kp(e); a; ) {
        var u = a(l, s);
        if (Et(u))
          a = ky(u);
        else {
          o = u || n;
          break;
        }
      }
    return o === void 0 && (o = e.field ? dN(e.field, e.variables) : Kg(n, Kp(e))), o === !1 ? n : n === _o(o) ? o : n + ":" + o;
  }, t.prototype.readField = function(e, r) {
    var n = e.from;
    if (!!n) {
      var i = e.field || e.fieldName;
      if (!!i) {
        if (e.typename === void 0) {
          var o = r.store.getFieldValue(n, "__typename");
          o && (e.typename = o);
        }
        var a = this.getStoreFieldName(e), s = _o(a), l = r.store.getFieldValue(n, a), u = this.getFieldPolicy(e.typename, s, !1), c = u && u.read;
        if (c) {
          var f = Ry(this, n, e, r, r.store.getStorage(ze(n) ? n.__ref : n, a));
          return sv.withValue(this.cache, c, [l, f]);
        }
        return l;
      }
    }
  }, t.prototype.getReadFunction = function(e, r) {
    var n = this.getFieldPolicy(e, r, !1);
    return n && n.read;
  }, t.prototype.getMergeFunction = function(e, r, n) {
    var i = this.getFieldPolicy(e, r, !1), o = i && i.merge;
    return !o && n && (i = this.getTypePolicy(n), o = i && i.merge), o;
  }, t.prototype.runMergeFunction = function(e, r, n, i, o) {
    var a = n.field, s = n.typename, l = n.merge;
    return l === Ay ? R9(i.store)(e, r) : l === My ? r : (i.overwrite && (e = void 0), l(e, r, Ry(this, void 0, { typename: s, fieldName: a.name.value, field: a, variables: i.variables }, i, o || /* @__PURE__ */ Object.create(null))));
  }, t;
}();
function Ry(t, e, r, n, i) {
  var o = t.getStoreFieldName(r), a = _o(o), s = r.variables || n.variables, l = n.store, u = l.toReference, c = l.canRead;
  return {
    args: Kp(r),
    field: r.field || null,
    fieldName: a,
    storeFieldName: o,
    variables: s,
    isReference: ze,
    toReference: u,
    storage: i,
    cache: t.cache,
    canRead: c,
    readField: function() {
      return t.readField(cv(arguments, e, s), n);
    },
    mergeObjects: R9(n.store)
  };
}
function cv(t, e, r) {
  var n = t[0], i = t[1], o = t.length, a;
  return typeof n == "string" ? a = {
    fieldName: n,
    from: o > 1 ? i : e
  } : (a = O({}, n), Ut.call(a, "from") || (a.from = e)), __DEV__ && a.from === void 0 && __DEV__ && Q.warn("Undefined 'from' passed to readField with arguments ".concat(UN(Array.from(t)))), a.variables === void 0 && (a.variables = r), a;
}
function R9(t) {
  return function(r, n) {
    if (Et(r) || Et(n))
      throw __DEV__ ? new Ge("Cannot automatically merge arrays") : new Ge(4);
    if (vt(r) && vt(n)) {
      var i = t.getFieldValue(r, "__typename"), o = t.getFieldValue(n, "__typename"), a = i && o && i !== o;
      if (a)
        return n;
      if (ze(r) && Xa(n))
        return t.merge(r.__ref, n), r;
      if (Xa(r) && ze(n))
        return t.merge(r, n.__ref), n;
      if (Xa(r) && Xa(n))
        return O(O({}, r), n);
    }
    return n;
  };
}
function Xh(t, e, r) {
  var n = "".concat(e).concat(r), i = t.flavors.get(n);
  return i || t.flavors.set(n, i = t.clientOnly === e && t.deferred === r ? t : O(O({}, t), { clientOnly: e, deferred: r })), i;
}
var $D = function() {
  function t(e, r) {
    this.cache = e, this.reader = r;
  }
  return t.prototype.writeToStore = function(e, r) {
    var n = this, i = r.query, o = r.result, a = r.dataId, s = r.variables, l = r.overwrite, u = n0(i), c = CD();
    s = O(O({}, Xg(u)), s);
    var f = {
      store: e,
      written: /* @__PURE__ */ Object.create(null),
      merge: function(h, m) {
        return c.merge(h, m);
      },
      variables: s,
      varString: ia(s),
      fragmentMap: bd(Sd(i)),
      overwrite: !!l,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: !1,
      deferred: !1,
      flavors: /* @__PURE__ */ new Map()
    }, d = this.processSelectionSet({
      result: o || /* @__PURE__ */ Object.create(null),
      dataId: a,
      selectionSet: u.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context: f
    });
    if (!ze(d))
      throw __DEV__ ? new Ge("Could not identify object ".concat(JSON.stringify(o))) : new Ge(6);
    return f.incomingById.forEach(function(h, m) {
      var g = h.storeObject, S = h.mergeTree, b = h.fieldNodeSet, x = ss(m);
      if (S && S.map.size) {
        var v = n.applyMerges(S, x, g, f);
        if (ze(v))
          return;
        g = v;
      }
      if (__DEV__ && !f.overwrite) {
        var w = /* @__PURE__ */ Object.create(null);
        b.forEach(function(N) {
          N.selectionSet && (w[N.name.value] = !0);
        });
        var _ = function(N) {
          return w[_o(N)] === !0;
        }, T = function(N) {
          var A = S && S.map.get(N);
          return Boolean(A && A.info && A.info.merge);
        };
        Object.keys(g).forEach(function(N) {
          _(N) && !T(N) && FD(x, g, N, f.store);
        });
      }
      e.merge(m, g);
    }), e.retain(d.__ref), d;
  }, t.prototype.processSelectionSet = function(e) {
    var r = this, n = e.dataId, i = e.result, o = e.selectionSet, a = e.context, s = e.mergeTree, l = this.cache.policies, u = /* @__PURE__ */ Object.create(null), c = n && l.rootTypenamesById[n] || Ip(i, o, a.fragmentMap) || n && a.store.get(n, "__typename");
    typeof c == "string" && (u.__typename = c);
    var f = function() {
      var v = cv(arguments, u, a.variables);
      if (ze(v.from)) {
        var w = a.incomingById.get(v.from.__ref);
        if (w) {
          var _ = l.readField(O(O({}, v), { from: w.storeObject }), a);
          if (_ !== void 0)
            return _;
        }
      }
      return l.readField(v, a);
    }, d = /* @__PURE__ */ new Set();
    this.flattenFields(o, i, a, c).forEach(function(v, w) {
      var _, T = ga(w), N = i[T];
      if (d.add(w), N !== void 0) {
        var A = l.getStoreFieldName({
          typename: c,
          fieldName: w.name.value,
          field: w,
          variables: v.variables
        }), R = Ly(s, A), F = r.processFieldValue(N, w, w.selectionSet ? Xh(v, !1, !1) : v, R), X = void 0;
        w.selectionSet && (ze(F) || Xa(F)) && (X = f("__typename", F));
        var le = l.getMergeFunction(c, w.name.value, X);
        le ? R.info = {
          field: w,
          typename: c,
          merge: le
        } : Iy(s, A), u = v.merge(u, (_ = {}, _[A] = F, _));
      } else
        __DEV__ && !v.clientOnly && !v.deferred && !Jg.added(w) && !l.getReadFunction(c, w.name.value) && __DEV__ && Q.error("Missing field '".concat(ga(w), "' while writing result ").concat(JSON.stringify(i, null, 2)).substring(0, 1e3));
    });
    try {
      var h = l.identify(i, {
        typename: c,
        selectionSet: o,
        fragmentMap: a.fragmentMap,
        storeObject: u,
        readField: f
      }), m = h[0], g = h[1];
      n = n || m, g && (u = a.merge(u, g));
    } catch (v) {
      if (!n)
        throw v;
    }
    if (typeof n == "string") {
      var S = ss(n), b = a.written[n] || (a.written[n] = []);
      if (b.indexOf(o) >= 0 || (b.push(o), this.reader && this.reader.isFresh(i, S, o, a)))
        return S;
      var x = a.incomingById.get(n);
      return x ? (x.storeObject = a.merge(x.storeObject, u), x.mergeTree = Yp(x.mergeTree, s), d.forEach(function(v) {
        return x.fieldNodeSet.add(v);
      })) : a.incomingById.set(n, {
        storeObject: u,
        mergeTree: Mf(s) ? void 0 : s,
        fieldNodeSet: d
      }), S;
    }
    return u;
  }, t.prototype.processFieldValue = function(e, r, n, i) {
    var o = this;
    return !r.selectionSet || e === null ? __DEV__ ? t9(e) : e : Et(e) ? e.map(function(a, s) {
      var l = o.processFieldValue(a, r, n, Ly(i, s));
      return Iy(i, s), l;
    }) : this.processSelectionSet({
      result: e,
      selectionSet: r.selectionSet,
      context: n,
      mergeTree: i
    });
  }, t.prototype.flattenFields = function(e, r, n, i) {
    i === void 0 && (i = Ip(r, e, n.fragmentMap));
    var o = /* @__PURE__ */ new Map(), a = this.cache.policies, s = new o0(!1);
    return function l(u, c) {
      var f = s.lookup(u, c.clientOnly, c.deferred);
      f.visited || (f.visited = !0, u.selections.forEach(function(d) {
        if (!!xd(d, n.variables)) {
          var h = c.clientOnly, m = c.deferred;
          if (!(h && m) && Eo(d.directives) && d.directives.forEach(function(b) {
            var x = b.name.value;
            if (x === "client" && (h = !0), x === "defer") {
              var v = wd(b, n.variables);
              (!v || v.if !== !1) && (m = !0);
            }
          }), Mi(d)) {
            var g = o.get(d);
            g && (h = h && g.clientOnly, m = m && g.deferred), o.set(d, Xh(n, h, m));
          } else {
            var S = Qg(d, n.fragmentMap);
            S && a.fragmentMatches(S, i, r, n.variables) && l(S.selectionSet, Xh(n, h, m));
          }
        }
      }));
    }(e, n), o;
  }, t.prototype.applyMerges = function(e, r, n, i, o) {
    var a, s = this;
    if (e.map.size && !ze(n)) {
      var l = !Et(n) && (ze(r) || Xa(r)) ? r : void 0, u = n;
      l && !o && (o = [ze(l) ? l.__ref : l]);
      var c, f = function(d, h) {
        return Et(d) ? typeof h == "number" ? d[h] : void 0 : i.store.getFieldValue(d, String(h));
      };
      e.map.forEach(function(d, h) {
        var m = f(l, h), g = f(u, h);
        if (g !== void 0) {
          o && o.push(h);
          var S = s.applyMerges(d, m, g, i, o);
          S !== g && (c = c || /* @__PURE__ */ new Map(), c.set(h, S)), o && Q(o.pop() === h);
        }
      }), c && (n = Et(u) ? u.slice(0) : O({}, u), c.forEach(function(d, h) {
        n[h] = d;
      }));
    }
    return e.info ? this.cache.policies.runMergeFunction(r, n, e.info, i, o && (a = i.store).getStorage.apply(a, o)) : n;
  }, t;
}(), L9 = [];
function Ly(t, e) {
  var r = t.map;
  return r.has(e) || r.set(e, L9.pop() || { map: /* @__PURE__ */ new Map() }), r.get(e);
}
function Yp(t, e) {
  if (t === e || !e || Mf(e))
    return t;
  if (!t || Mf(t))
    return e;
  var r = t.info && e.info ? O(O({}, t.info), e.info) : t.info || e.info, n = t.map.size && e.map.size, i = n ? /* @__PURE__ */ new Map() : t.map.size ? t.map : e.map, o = { info: r, map: i };
  if (n) {
    var a = new Set(e.map.keys());
    t.map.forEach(function(s, l) {
      o.map.set(l, Yp(s, e.map.get(l))), a.delete(l);
    }), a.forEach(function(s) {
      o.map.set(s, Yp(e.map.get(s), t.map.get(s)));
    });
  }
  return o;
}
function Mf(t) {
  return !t || !(t.info || t.map.size);
}
function Iy(t, e) {
  var r = t.map, n = r.get(e);
  n && Mf(n) && (L9.push(n), r.delete(e));
}
var Py = /* @__PURE__ */ new Set();
function FD(t, e, r, n) {
  var i = function(f) {
    var d = n.getFieldValue(f, r);
    return typeof d == "object" && d;
  }, o = i(t);
  if (!!o) {
    var a = i(e);
    if (!!a && !ze(o) && !ft(o, a) && !Object.keys(o).every(function(f) {
      return n.getFieldValue(a, f) !== void 0;
    })) {
      var s = n.getFieldValue(t, "__typename") || n.getFieldValue(e, "__typename"), l = _o(r), u = "".concat(s, ".").concat(l);
      if (!Py.has(u)) {
        Py.add(u);
        var c = [];
        !Et(o) && !Et(a) && [o, a].forEach(function(f) {
          var d = n.getFieldValue(f, "__typename");
          typeof d == "string" && !c.includes(d) && c.push(d);
        }), __DEV__ && Q.warn("Cache data may be lost when replacing the ".concat(l, " field of a ").concat(s, ` object.

To address this problem (which is not a bug in Apollo Client), `).concat(c.length ? "either ensure all objects of type " + c.join(" and ") + " have an ID or a custom merge function, or " : "", "define a custom merge function for the ").concat(u, ` field, so InMemoryCache can safely merge these objects:

  existing: `).concat(JSON.stringify(o).slice(0, 1e3), `
  incoming: `).concat(JSON.stringify(a).slice(0, 1e3), `

For more information about these options, please refer to the documentation:

  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers
  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects
`));
      }
    }
  }
}
var I9 = function(t) {
  rt(e, t);
  function e(r) {
    r === void 0 && (r = {});
    var n = t.call(this) || this;
    return n.watches = /* @__PURE__ */ new Set(), n.typenameDocumentCache = /* @__PURE__ */ new Map(), n.makeVar = RD, n.txCount = 0, n.config = SD(r), n.addTypename = !!n.config.addTypename, n.policies = new PD({
      cache: n,
      dataIdFromObject: n.config.dataIdFromObject,
      possibleTypes: n.config.possibleTypes,
      typePolicies: n.config.typePolicies
    }), n.init(), n;
  }
  return e.prototype.init = function() {
    var r = this.data = new ku.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = r.stump, this.resetResultCache();
  }, e.prototype.resetResultCache = function(r) {
    var n = this, i = this.storeReader;
    this.storeWriter = new $D(this, this.storeReader = new kD({
      cache: this,
      addTypename: this.addTypename,
      resultCacheMaxSize: this.config.resultCacheMaxSize,
      canonizeResults: N9(this.config),
      canon: r ? void 0 : i && i.canon
    })), this.maybeBroadcastWatch = Af(function(o, a) {
      return n.broadcastWatch(o, a);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(o) {
        var a = o.optimistic ? n.optimisticData : n.data;
        if (Wl(a)) {
          var s = o.optimistic, l = o.rootId, u = o.variables;
          return a.makeCacheKey(o.query, o.callback, ia({ optimistic: s, rootId: l, variables: u }));
        }
      }
    }), (/* @__PURE__ */ new Set([
      this.data.group,
      this.optimisticData.group
    ])).forEach(function(o) {
      return o.resetCaching();
    });
  }, e.prototype.restore = function(r) {
    return this.init(), r && this.data.replace(r), this;
  }, e.prototype.extract = function(r) {
    return r === void 0 && (r = !1), (r ? this.optimisticData : this.data).extract();
  }, e.prototype.read = function(r) {
    var n = r.returnPartialData, i = n === void 0 ? !1 : n;
    try {
      return this.storeReader.diffQueryAgainstStore(O(O({}, r), { store: r.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData: i })).result || null;
    } catch (o) {
      if (o instanceof _9)
        return null;
      throw o;
    }
  }, e.prototype.write = function(r) {
    try {
      return ++this.txCount, this.storeWriter.writeToStore(this.data, r);
    } finally {
      !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
    }
  }, e.prototype.modify = function(r) {
    if (Ut.call(r, "id") && !r.id)
      return !1;
    var n = r.optimistic ? this.optimisticData : this.data;
    try {
      return ++this.txCount, n.modify(r.id || "ROOT_QUERY", r.fields);
    } finally {
      !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
    }
  }, e.prototype.diff = function(r) {
    return this.storeReader.diffQueryAgainstStore(O(O({}, r), { store: r.optimistic ? this.optimisticData : this.data, rootId: r.id || "ROOT_QUERY", config: this.config }));
  }, e.prototype.watch = function(r) {
    var n = this;
    return this.watches.size || MD(this), this.watches.add(r), r.immediate && this.maybeBroadcastWatch(r), function() {
      n.watches.delete(r) && !n.watches.size && Ty(n), n.maybeBroadcastWatch.forget(r);
    };
  }, e.prototype.gc = function(r) {
    ia.reset();
    var n = this.optimisticData.gc();
    return r && !this.txCount && (r.resetResultCache ? this.resetResultCache(r.resetResultIdentities) : r.resetResultIdentities && this.storeReader.resetCanon()), n;
  }, e.prototype.retain = function(r, n) {
    return (n ? this.optimisticData : this.data).retain(r);
  }, e.prototype.release = function(r, n) {
    return (n ? this.optimisticData : this.data).release(r);
  }, e.prototype.identify = function(r) {
    if (ze(r))
      return r.__ref;
    try {
      return this.policies.identify(r)[0];
    } catch (n) {
      __DEV__ && Q.warn(n);
    }
  }, e.prototype.evict = function(r) {
    if (!r.id) {
      if (Ut.call(r, "id"))
        return !1;
      r = O(O({}, r), { id: "ROOT_QUERY" });
    }
    try {
      return ++this.txCount, this.optimisticData.evict(r, this.data);
    } finally {
      !--this.txCount && r.broadcast !== !1 && this.broadcastWatches();
    }
  }, e.prototype.reset = function(r) {
    var n = this;
    return this.init(), ia.reset(), r && r.discardWatches ? (this.watches.forEach(function(i) {
      return n.maybeBroadcastWatch.forget(i);
    }), this.watches.clear(), Ty(this)) : this.broadcastWatches(), Promise.resolve();
  }, e.prototype.removeOptimistic = function(r) {
    var n = this.optimisticData.removeLayer(r);
    n !== this.optimisticData && (this.optimisticData = n, this.broadcastWatches());
  }, e.prototype.batch = function(r) {
    var n = this, i = r.update, o = r.optimistic, a = o === void 0 ? !0 : o, s = r.removeOptimistic, l = r.onWatchUpdated, u, c = function(d) {
      var h = n, m = h.data, g = h.optimisticData;
      ++n.txCount, d && (n.data = n.optimisticData = d);
      try {
        return u = i(n);
      } finally {
        --n.txCount, n.data = m, n.optimisticData = g;
      }
    }, f = /* @__PURE__ */ new Set();
    return l && !this.txCount && this.broadcastWatches(O(O({}, r), { onWatchUpdated: function(d) {
      return f.add(d), !1;
    } })), typeof a == "string" ? this.optimisticData = this.optimisticData.addLayer(a, c) : a === !1 ? c(this.data) : c(), typeof s == "string" && (this.optimisticData = this.optimisticData.removeLayer(s)), l && f.size ? (this.broadcastWatches(O(O({}, r), { onWatchUpdated: function(d, h) {
      var m = l.call(this, d, h);
      return m !== !1 && f.delete(d), m;
    } })), f.size && f.forEach(function(d) {
      return n.maybeBroadcastWatch.dirty(d);
    })) : this.broadcastWatches(r), u;
  }, e.prototype.performTransaction = function(r, n) {
    return this.batch({
      update: r,
      optimistic: n || n !== null
    });
  }, e.prototype.transformDocument = function(r) {
    if (this.addTypename) {
      var n = this.typenameDocumentCache.get(r);
      return n || (n = Jg(r), this.typenameDocumentCache.set(r, n), this.typenameDocumentCache.set(n, n)), n;
    }
    return r;
  }, e.prototype.broadcastWatches = function(r) {
    var n = this;
    this.txCount || this.watches.forEach(function(i) {
      return n.maybeBroadcastWatch(i, r);
    });
  }, e.prototype.broadcastWatch = function(r, n) {
    var i = r.lastDiff, o = this.diff(r);
    n && (r.optimistic && typeof n.optimistic == "string" && (o.fromOptimisticTransaction = !0), n.onWatchUpdated && n.onWatchUpdated.call(this, r, o, i) === !1) || (!i || !ft(i.result, o.result)) && r.callback(r.lastDiff = o, i);
  }, e;
}(ED);
function BD(t) {
  return t.hasOwnProperty("graphQLErrors");
}
var zD = function(t) {
  var e = "";
  if (Eo(t.graphQLErrors) || Eo(t.clientErrors)) {
    var r = (t.graphQLErrors || []).concat(t.clientErrors || []);
    r.forEach(function(n) {
      var i = n ? n.message : "Error message not found.";
      e += "".concat(i, `
`);
    });
  }
  return t.networkError && (e += "".concat(t.networkError.message, `
`)), e = e.replace(/\n$/, ""), e;
}, Ki = function(t) {
  rt(e, t);
  function e(r) {
    var n = r.graphQLErrors, i = r.clientErrors, o = r.networkError, a = r.errorMessage, s = r.extraInfo, l = t.call(this, a) || this;
    return l.graphQLErrors = n || [], l.clientErrors = i || [], l.networkError = o || null, l.message = a || zD(l), l.extraInfo = s, l.__proto__ = e.prototype, l;
  }
  return e;
}(Error), $e;
(function(t) {
  t[t.loading = 1] = "loading", t[t.setVariables = 2] = "setVariables", t[t.fetchMore = 3] = "fetchMore", t[t.refetch = 4] = "refetch", t[t.poll = 6] = "poll", t[t.ready = 7] = "ready", t[t.error = 8] = "error";
})($e || ($e = {}));
function Ou(t) {
  return t ? t < 7 : !1;
}
var HD = Object.assign, UD = Object.hasOwnProperty, Xp = function(t) {
  rt(e, t);
  function e(r) {
    var n = r.queryManager, i = r.queryInfo, o = r.options, a = t.call(this, function(S) {
      try {
        var b = S._subscription._observer;
        b && !b.error && (b.error = jD);
      } catch {
      }
      var x = !a.observers.size;
      a.observers.add(S);
      var v = a.last;
      return v && v.error ? S.error && S.error(v.error) : v && v.result && S.next && S.next(v.result), x && a.reobserve().catch(function() {
      }), function() {
        a.observers.delete(S) && !a.observers.size && a.tearDownQuery();
      };
    }) || this;
    a.observers = /* @__PURE__ */ new Set(), a.subscriptions = /* @__PURE__ */ new Set(), a.queryInfo = i, a.queryManager = n, a.isTornDown = !1;
    var s = n.defaultOptions.watchQuery, l = s === void 0 ? {} : s, u = l.fetchPolicy, c = u === void 0 ? "cache-first" : u, f = o.fetchPolicy, d = f === void 0 ? c : f, h = o.initialFetchPolicy, m = h === void 0 ? d === "standby" ? c : d : h;
    a.options = O(O({}, o), { initialFetchPolicy: m, fetchPolicy: d }), a.queryId = i.queryId || n.generateQueryId();
    var g = n0(a.query);
    return a.queryName = g && g.name && g.name.value, a;
  }
  return Object.defineProperty(e.prototype, "query", {
    get: function() {
      return this.queryManager.transform(this.options.query).document;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, "variables", {
    get: function() {
      return this.options.variables;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.result = function() {
    var r = this;
    return new Promise(function(n, i) {
      var o = {
        next: function(s) {
          n(s), r.observers.delete(o), r.observers.size || r.queryManager.removeQuery(r.queryId), setTimeout(function() {
            a.unsubscribe();
          }, 0);
        },
        error: i
      }, a = r.subscribe(o);
    });
  }, e.prototype.getCurrentResult = function(r) {
    r === void 0 && (r = !0);
    var n = this.getLastResult(!0), i = this.queryInfo.networkStatus || n && n.networkStatus || $e.ready, o = O(O({}, n), { loading: Ou(i), networkStatus: i }), a = this.options.fetchPolicy, s = a === void 0 ? "cache-first" : a;
    if (!(s === "network-only" || s === "no-cache" || s === "standby" || this.queryManager.transform(this.options.query).hasForcedResolvers)) {
      var l = this.queryInfo.getDiff();
      (l.complete || this.options.returnPartialData) && (o.data = l.result), ft(o.data, {}) && (o.data = void 0), l.complete ? (delete o.partial, l.complete && o.networkStatus === $e.loading && (s === "cache-first" || s === "cache-only") && (o.networkStatus = $e.ready, o.loading = !1)) : o.partial = !0, __DEV__ && !l.complete && !this.options.partialRefetch && !o.loading && !o.data && !o.error && $9(l.missing);
    }
    return r && this.updateLastResult(o), o;
  }, e.prototype.isDifferentFromLastResult = function(r) {
    return !this.last || !ft(this.last.result, r);
  }, e.prototype.getLast = function(r, n) {
    var i = this.last;
    if (i && i[r] && (!n || ft(i.variables, this.variables)))
      return i[r];
  }, e.prototype.getLastResult = function(r) {
    return this.getLast("result", r);
  }, e.prototype.getLastError = function(r) {
    return this.getLast("error", r);
  }, e.prototype.resetLastResults = function() {
    delete this.last, this.isTornDown = !1;
  }, e.prototype.resetQueryStoreErrors = function() {
    this.queryManager.resetErrors(this.queryId);
  }, e.prototype.refetch = function(r) {
    var n, i = {
      pollInterval: 0
    }, o = this.options.fetchPolicy;
    if (o === "cache-and-network" ? i.fetchPolicy = o : o === "no-cache" ? i.fetchPolicy = "no-cache" : i.fetchPolicy = "network-only", __DEV__ && r && UD.call(r, "variables")) {
      var a = Q8(this.query), s = a.variableDefinitions;
      (!s || !s.some(function(l) {
        return l.variable.name.value === "variables";
      })) && __DEV__ && Q.warn("Called refetch(".concat(JSON.stringify(r), ") for query ").concat(((n = a.name) === null || n === void 0 ? void 0 : n.value) || JSON.stringify(a), `, which does not declare a $variables variable.
Did you mean to call refetch(variables) instead of refetch({ variables })?`));
    }
    return r && !ft(this.options.variables, r) && (i.variables = this.options.variables = O(O({}, this.options.variables), r)), this.queryInfo.resetLastWrite(), this.reobserve(i, $e.refetch);
  }, e.prototype.fetchMore = function(r) {
    var n = this, i = O(O({}, r.query ? r : O(O(O(O({}, this.options), { query: this.query }), r), { variables: O(O({}, this.options.variables), r.variables) })), { fetchPolicy: "no-cache" }), o = this.queryManager.generateQueryId(), a = this.queryInfo, s = a.networkStatus;
    a.networkStatus = $e.fetchMore, i.notifyOnNetworkStatusChange && this.observe();
    var l = /* @__PURE__ */ new Set();
    return this.queryManager.fetchQuery(o, i, $e.fetchMore).then(function(u) {
      return n.queryManager.removeQuery(o), a.networkStatus === $e.fetchMore && (a.networkStatus = s), n.queryManager.cache.batch({
        update: function(c) {
          var f = r.updateQuery;
          f ? c.updateQuery({
            query: n.query,
            variables: n.variables,
            returnPartialData: !0,
            optimistic: !1
          }, function(d) {
            return f(d, {
              fetchMoreResult: u.data,
              variables: i.variables
            });
          }) : c.writeQuery({
            query: i.query,
            variables: i.variables,
            data: u.data
          });
        },
        onWatchUpdated: function(c) {
          l.add(c.query);
        }
      }), u;
    }).finally(function() {
      l.has(n.query) || P9(n);
    });
  }, e.prototype.subscribeToMore = function(r) {
    var n = this, i = this.queryManager.startGraphQLSubscription({
      query: r.document,
      variables: r.variables,
      context: r.context
    }).subscribe({
      next: function(o) {
        var a = r.updateQuery;
        a && n.updateQuery(function(s, l) {
          var u = l.variables;
          return a(s, {
            subscriptionData: o,
            variables: u
          });
        });
      },
      error: function(o) {
        if (r.onError) {
          r.onError(o);
          return;
        }
        __DEV__ && Q.error("Unhandled GraphQL subscription error", o);
      }
    });
    return this.subscriptions.add(i), function() {
      n.subscriptions.delete(i) && i.unsubscribe();
    };
  }, e.prototype.setOptions = function(r) {
    return this.reobserve(r);
  }, e.prototype.setVariables = function(r) {
    return ft(this.variables, r) ? this.observers.size ? this.result() : Promise.resolve() : (this.options.variables = r, this.observers.size ? this.reobserve({
      fetchPolicy: this.options.initialFetchPolicy,
      variables: r
    }, $e.setVariables) : Promise.resolve());
  }, e.prototype.updateQuery = function(r) {
    var n = this.queryManager, i = n.cache.diff({
      query: this.options.query,
      variables: this.variables,
      returnPartialData: !0,
      optimistic: !1
    }).result, o = r(i, {
      variables: this.variables
    });
    o && (n.cache.writeQuery({
      query: this.options.query,
      data: o,
      variables: this.variables
    }), n.broadcastQueries());
  }, e.prototype.startPolling = function(r) {
    this.options.pollInterval = r, this.updatePolling();
  }, e.prototype.stopPolling = function() {
    this.options.pollInterval = 0, this.updatePolling();
  }, e.prototype.applyNextFetchPolicy = function(r, n) {
    if (n.nextFetchPolicy) {
      var i = n.fetchPolicy, o = i === void 0 ? "cache-first" : i, a = n.initialFetchPolicy, s = a === void 0 ? o : a;
      o === "standby" || (typeof n.nextFetchPolicy == "function" ? n.fetchPolicy = n.nextFetchPolicy(o, {
        reason: r,
        options: n,
        observable: this,
        initialFetchPolicy: s
      }) : r === "variables-changed" ? n.fetchPolicy = s : n.fetchPolicy = n.nextFetchPolicy);
    }
    return n.fetchPolicy;
  }, e.prototype.fetch = function(r, n) {
    return this.queryManager.setObservableQuery(this), this.queryManager.fetchQueryObservable(this.queryId, r, n);
  }, e.prototype.updatePolling = function() {
    var r = this;
    if (!this.queryManager.ssrMode) {
      var n = this, i = n.pollingInfo, o = n.options.pollInterval;
      if (!o) {
        i && (clearTimeout(i.timeout), delete this.pollingInfo);
        return;
      }
      if (!(i && i.interval === o)) {
        __DEV__ ? Q(o, "Attempted to start a polling query without a polling interval.") : Q(o, 10);
        var a = i || (this.pollingInfo = {});
        a.interval = o;
        var s = function() {
          r.pollingInfo && (Ou(r.queryInfo.networkStatus) ? l() : r.reobserve({
            fetchPolicy: "network-only"
          }, $e.poll).then(l, l));
        }, l = function() {
          var u = r.pollingInfo;
          u && (clearTimeout(u.timeout), u.timeout = setTimeout(s, u.interval));
        };
        l();
      }
    }
  }, e.prototype.updateLastResult = function(r, n) {
    return n === void 0 && (n = this.variables), this.last = O(O({}, this.last), { result: this.queryManager.assumeImmutableResults ? r : t9(r), variables: n }), Eo(r.errors) || delete this.last.error, this.last;
  }, e.prototype.reobserve = function(r, n) {
    var i = this;
    this.isTornDown = !1;
    var o = n === $e.refetch || n === $e.fetchMore || n === $e.poll, a = this.options.variables, s = this.options.fetchPolicy, l = i0(this.options, r || {}), u = o ? l : HD(this.options, l);
    o || (this.updatePolling(), r && r.variables && !ft(r.variables, a) && u.fetchPolicy !== "standby" && u.fetchPolicy === s && (this.applyNextFetchPolicy("variables-changed", u), n === void 0 && (n = $e.setVariables)));
    var c = u.variables && O({}, u.variables), f = this.fetch(u, n), d = {
      next: function(h) {
        i.reportResult(h, c);
      },
      error: function(h) {
        i.reportError(h, c);
      }
    };
    return o || (this.concast && this.observer && this.concast.removeObserver(this.observer), this.concast = f, this.observer = d), f.addObserver(d), f.promise;
  }, e.prototype.observe = function() {
    this.reportResult(this.getCurrentResult(!1), this.variables);
  }, e.prototype.reportResult = function(r, n) {
    var i = this.getLastError();
    (i || this.isDifferentFromLastResult(r)) && ((i || !r.partial || this.options.returnPartialData) && this.updateLastResult(r, n), Gl(this.observers, "next", r));
  }, e.prototype.reportError = function(r, n) {
    var i = O(O({}, this.getLastResult()), { error: r, errors: r.graphQLErrors, networkStatus: $e.error, loading: !1 });
    this.updateLastResult(i, n), Gl(this.observers, "error", this.last.error = r);
  }, e.prototype.hasObservers = function() {
    return this.observers.size > 0;
  }, e.prototype.tearDownQuery = function() {
    this.isTornDown || (this.concast && this.observer && (this.concast.removeObserver(this.observer), delete this.concast, delete this.observer), this.stopPolling(), this.subscriptions.forEach(function(r) {
      return r.unsubscribe();
    }), this.subscriptions.clear(), this.queryManager.stopQuery(this.queryId), this.observers.clear(), this.isTornDown = !0);
  }, e;
}(Be);
i9(Xp);
function P9(t) {
  var e = t.options, r = e.fetchPolicy, n = e.nextFetchPolicy;
  return r === "cache-and-network" || r === "network-only" ? t.reobserve({
    fetchPolicy: "cache-first",
    nextFetchPolicy: function() {
      return this.nextFetchPolicy = n, typeof n == "function" ? n.apply(this, arguments) : r;
    }
  }) : t.reobserve();
}
function jD(t) {
  __DEV__ && Q.error("Unhandled error", t.message, t.stack);
}
function $9(t) {
  __DEV__ && t && __DEV__ && Q.debug("Missing cache result fields: ".concat(JSON.stringify(t)), t);
}
var F9 = function() {
  function t(e) {
    var r = e.cache, n = e.client, i = e.resolvers, o = e.fragmentMatcher;
    this.cache = r, n && (this.client = n), i && this.addResolvers(i), o && this.setFragmentMatcher(o);
  }
  return t.prototype.addResolvers = function(e) {
    var r = this;
    this.resolvers = this.resolvers || {}, Array.isArray(e) ? e.forEach(function(n) {
      r.resolvers = Tf(r.resolvers, n);
    }) : this.resolvers = Tf(this.resolvers, e);
  }, t.prototype.setResolvers = function(e) {
    this.resolvers = {}, this.addResolvers(e);
  }, t.prototype.getResolvers = function() {
    return this.resolvers || {};
  }, t.prototype.runResolvers = function(e) {
    var r = e.document, n = e.remoteResult, i = e.context, o = e.variables, a = e.onlyRunForcedResolvers, s = a === void 0 ? !1 : a;
    return Ko(this, void 0, void 0, function() {
      return Yo(this, function(l) {
        return r ? [2, this.resolveDocument(r, n.data, i, o, this.fragmentMatcher, s).then(function(u) {
          return O(O({}, n), { data: u.result });
        })] : [2, n];
      });
    });
  }, t.prototype.setFragmentMatcher = function(e) {
    this.fragmentMatcher = e;
  }, t.prototype.getFragmentMatcher = function() {
    return this.fragmentMatcher;
  }, t.prototype.clientQuery = function(e) {
    return Lp(["client"], e) && this.resolvers ? e : null;
  }, t.prototype.serverQuery = function(e) {
    return EN(e);
  }, t.prototype.prepareContext = function(e) {
    var r = this.cache;
    return O(O({}, e), { cache: r, getCacheKey: function(n) {
      return r.identify(n);
    } });
  }, t.prototype.addExportedVariables = function(e, r, n) {
    return r === void 0 && (r = {}), n === void 0 && (n = {}), Ko(this, void 0, void 0, function() {
      return Yo(this, function(i) {
        return e ? [2, this.resolveDocument(e, this.buildRootValueFromCache(e, r) || {}, this.prepareContext(n), r).then(function(o) {
          return O(O({}, r), o.exportedVariables);
        })] : [2, O({}, r)];
      });
    });
  }, t.prototype.shouldForceResolvers = function(e) {
    var r = !1;
    return oi(e, {
      Directive: {
        enter: function(n) {
          if (n.name.value === "client" && n.arguments && (r = n.arguments.some(function(i) {
            return i.name.value === "always" && i.value.kind === "BooleanValue" && i.value.value === !0;
          }), r))
            return G8;
        }
      }
    }), r;
  }, t.prototype.buildRootValueFromCache = function(e, r) {
    return this.cache.diff({
      query: wN(e),
      variables: r,
      returnPartialData: !0,
      optimistic: !1
    }).result;
  }, t.prototype.resolveDocument = function(e, r, n, i, o, a) {
    return n === void 0 && (n = {}), i === void 0 && (i = {}), o === void 0 && (o = function() {
      return !0;
    }), a === void 0 && (a = !1), Ko(this, void 0, void 0, function() {
      var s, l, u, c, f, d, h, m, g;
      return Yo(this, function(S) {
        return s = Yg(e), l = Sd(e), u = bd(l), c = s.operation, f = c ? c.charAt(0).toUpperCase() + c.slice(1) : "Query", d = this, h = d.cache, m = d.client, g = {
          fragmentMap: u,
          context: O(O({}, n), { cache: h, client: m }),
          variables: i,
          fragmentMatcher: o,
          defaultOperationType: f,
          exportedVariables: {},
          onlyRunForcedResolvers: a
        }, [2, this.resolveSelectionSet(s.selectionSet, r, g).then(function(b) {
          return {
            result: b,
            exportedVariables: g.exportedVariables
          };
        })];
      });
    });
  }, t.prototype.resolveSelectionSet = function(e, r, n) {
    return Ko(this, void 0, void 0, function() {
      var i, o, a, s, l, u = this;
      return Yo(this, function(c) {
        return i = n.fragmentMap, o = n.context, a = n.variables, s = [r], l = function(f) {
          return Ko(u, void 0, void 0, function() {
            var d, h;
            return Yo(this, function(m) {
              return xd(f, a) ? Mi(f) ? [2, this.resolveField(f, r, n).then(function(g) {
                var S;
                typeof g < "u" && s.push((S = {}, S[ga(f)] = g, S));
              })] : (W8(f) ? d = f : (d = i[f.name.value], __DEV__ ? Q(d, "No fragment named ".concat(f.name.value)) : Q(d, 9)), d && d.typeCondition && (h = d.typeCondition.name.value, n.fragmentMatcher(r, h, o)) ? [2, this.resolveSelectionSet(d.selectionSet, r, n).then(function(g) {
                s.push(g);
              })] : [2]) : [2];
            });
          });
        }, [2, Promise.all(e.selections.map(l)).then(function() {
          return ev(s);
        })];
      });
    });
  }, t.prototype.resolveField = function(e, r, n) {
    return Ko(this, void 0, void 0, function() {
      var i, o, a, s, l, u, c, f, d, h = this;
      return Yo(this, function(m) {
        return i = n.variables, o = e.name.value, a = ga(e), s = o !== a, l = r[a] || r[o], u = Promise.resolve(l), (!n.onlyRunForcedResolvers || this.shouldForceResolvers(e)) && (c = r.__typename || n.defaultOperationType, f = this.resolvers && this.resolvers[c], f && (d = f[s ? o : a], d && (u = Promise.resolve(sv.withValue(this.cache, d, [
          r,
          wd(e, i),
          n.context,
          { field: e, fragmentMap: n.fragmentMap }
        ]))))), [2, u.then(function(g) {
          if (g === void 0 && (g = l), e.directives && e.directives.forEach(function(S) {
            S.name.value === "export" && S.arguments && S.arguments.forEach(function(b) {
              b.name.value === "as" && b.value.kind === "StringValue" && (n.exportedVariables[b.value.value] = g);
            });
          }), !e.selectionSet || g == null)
            return g;
          if (Array.isArray(g))
            return h.resolveSubSelectedArray(e, g, n);
          if (e.selectionSet)
            return h.resolveSelectionSet(e.selectionSet, g, n);
        })];
      });
    });
  }, t.prototype.resolveSubSelectedArray = function(e, r, n) {
    var i = this;
    return Promise.all(r.map(function(o) {
      if (o === null)
        return null;
      if (Array.isArray(o))
        return i.resolveSubSelectedArray(e, o, n);
      if (e.selectionSet)
        return i.resolveSelectionSet(e.selectionSet, o, n);
    }));
  }, t;
}(), Za = new (Mo ? WeakMap : Map)();
function Zh(t, e) {
  var r = t[e];
  typeof r == "function" && (t[e] = function() {
    return Za.set(t, (Za.get(t) + 1) % 1e15), r.apply(this, arguments);
  });
}
function $y(t) {
  t.notifyTimeout && (clearTimeout(t.notifyTimeout), t.notifyTimeout = void 0);
}
var Jh = function() {
  function t(e, r) {
    r === void 0 && (r = e.generateQueryId()), this.queryId = r, this.listeners = /* @__PURE__ */ new Set(), this.document = null, this.lastRequestId = 1, this.subscriptions = /* @__PURE__ */ new Set(), this.stopped = !1, this.dirty = !1, this.observableQuery = null;
    var n = this.cache = e.cache;
    Za.has(n) || (Za.set(n, 0), Zh(n, "evict"), Zh(n, "modify"), Zh(n, "reset"));
  }
  return t.prototype.init = function(e) {
    var r = e.networkStatus || $e.loading;
    return this.variables && this.networkStatus !== $e.loading && !ft(this.variables, e.variables) && (r = $e.setVariables), ft(e.variables, this.variables) || (this.lastDiff = void 0), Object.assign(this, {
      document: e.document,
      variables: e.variables,
      networkError: null,
      graphQLErrors: this.graphQLErrors || [],
      networkStatus: r
    }), e.observableQuery && this.setObservableQuery(e.observableQuery), e.lastRequestId && (this.lastRequestId = e.lastRequestId), this;
  }, t.prototype.reset = function() {
    $y(this), this.lastDiff = void 0, this.dirty = !1;
  }, t.prototype.getDiff = function(e) {
    e === void 0 && (e = this.variables);
    var r = this.getDiffOptions(e);
    if (this.lastDiff && ft(r, this.lastDiff.options))
      return this.lastDiff.diff;
    this.updateWatch(this.variables = e);
    var n = this.observableQuery;
    if (n && n.options.fetchPolicy === "no-cache")
      return { complete: !1 };
    var i = this.cache.diff(r);
    return this.updateLastDiff(i, r), i;
  }, t.prototype.updateLastDiff = function(e, r) {
    this.lastDiff = e ? {
      diff: e,
      options: r || this.getDiffOptions()
    } : void 0;
  }, t.prototype.getDiffOptions = function(e) {
    var r;
    return e === void 0 && (e = this.variables), {
      query: this.document,
      variables: e,
      returnPartialData: !0,
      optimistic: !0,
      canonizeResults: (r = this.observableQuery) === null || r === void 0 ? void 0 : r.options.canonizeResults
    };
  }, t.prototype.setDiff = function(e) {
    var r = this, n = this.lastDiff && this.lastDiff.diff;
    this.updateLastDiff(e), !this.dirty && !ft(n && n.result, e && e.result) && (this.dirty = !0, this.notifyTimeout || (this.notifyTimeout = setTimeout(function() {
      return r.notify();
    }, 0)));
  }, t.prototype.setObservableQuery = function(e) {
    var r = this;
    e !== this.observableQuery && (this.oqListener && this.listeners.delete(this.oqListener), this.observableQuery = e, e ? (e.queryInfo = this, this.listeners.add(this.oqListener = function() {
      var n = r.getDiff();
      n.fromOptimisticTransaction ? e.observe() : P9(e);
    })) : delete this.oqListener);
  }, t.prototype.notify = function() {
    var e = this;
    $y(this), this.shouldNotify() && this.listeners.forEach(function(r) {
      return r(e);
    }), this.dirty = !1;
  }, t.prototype.shouldNotify = function() {
    if (!this.dirty || !this.listeners.size)
      return !1;
    if (Ou(this.networkStatus) && this.observableQuery) {
      var e = this.observableQuery.options.fetchPolicy;
      if (e !== "cache-only" && e !== "cache-and-network")
        return !1;
    }
    return !0;
  }, t.prototype.stop = function() {
    if (!this.stopped) {
      this.stopped = !0, this.reset(), this.cancel(), this.cancel = t.prototype.cancel, this.subscriptions.forEach(function(r) {
        return r.unsubscribe();
      });
      var e = this.observableQuery;
      e && e.stopPolling();
    }
  }, t.prototype.cancel = function() {
  }, t.prototype.updateWatch = function(e) {
    var r = this;
    e === void 0 && (e = this.variables);
    var n = this.observableQuery;
    if (!(n && n.options.fetchPolicy === "no-cache")) {
      var i = O(O({}, this.getDiffOptions(e)), { watcher: this, callback: function(o) {
        return r.setDiff(o);
      } });
      (!this.lastWatch || !ft(i, this.lastWatch)) && (this.cancel(), this.cancel = this.cache.watch(this.lastWatch = i));
    }
  }, t.prototype.resetLastWrite = function() {
    this.lastWrite = void 0;
  }, t.prototype.shouldWrite = function(e, r) {
    var n = this.lastWrite;
    return !(n && n.dmCount === Za.get(this.cache) && ft(r, n.variables) && ft(e.data, n.result.data));
  }, t.prototype.markResult = function(e, r, n) {
    var i = this;
    this.graphQLErrors = Eo(e.errors) ? e.errors : [], this.reset(), r.fetchPolicy === "no-cache" ? this.updateLastDiff({ result: e.data, complete: !0 }, this.getDiffOptions(r.variables)) : n !== 0 && (Zp(e, r.errorPolicy) ? this.cache.performTransaction(function(o) {
      if (i.shouldWrite(e, r.variables))
        o.writeQuery({
          query: i.document,
          data: e.data,
          variables: r.variables,
          overwrite: n === 1
        }), i.lastWrite = {
          result: e,
          variables: r.variables,
          dmCount: Za.get(i.cache)
        };
      else if (i.lastDiff && i.lastDiff.diff.complete) {
        e.data = i.lastDiff.diff.result;
        return;
      }
      var a = i.getDiffOptions(r.variables), s = o.diff(a);
      i.stopped || i.updateWatch(r.variables), i.updateLastDiff(s, a), s.complete && (e.data = s.result);
    }) : this.lastWrite = void 0);
  }, t.prototype.markReady = function() {
    return this.networkError = null, this.networkStatus = $e.ready;
  }, t.prototype.markError = function(e) {
    return this.networkStatus = $e.error, this.lastWrite = void 0, this.reset(), e.graphQLErrors && (this.graphQLErrors = e.graphQLErrors), e.networkError && (this.networkError = e.networkError), e;
  }, t;
}();
function Zp(t, e) {
  e === void 0 && (e = "none");
  var r = e === "ignore" || e === "all", n = !Rc(t);
  return !n && r && t.data && (n = !0), n;
}
var VD = Object.prototype.hasOwnProperty, qD = function() {
  function t(e) {
    var r = e.cache, n = e.link, i = e.defaultOptions, o = e.queryDeduplication, a = o === void 0 ? !1 : o, s = e.onBroadcast, l = e.ssrMode, u = l === void 0 ? !1 : l, c = e.clientAwareness, f = c === void 0 ? {} : c, d = e.localState, h = e.assumeImmutableResults;
    this.clientAwareness = {}, this.queries = /* @__PURE__ */ new Map(), this.fetchCancelFns = /* @__PURE__ */ new Map(), this.transformCache = new (Mo ? WeakMap : Map)(), this.queryIdCounter = 1, this.requestIdCounter = 1, this.mutationIdCounter = 1, this.inFlightLinkObservables = /* @__PURE__ */ new Map(), this.cache = r, this.link = n, this.defaultOptions = i || /* @__PURE__ */ Object.create(null), this.queryDeduplication = a, this.clientAwareness = f, this.localState = d || new F9({ cache: r }), this.ssrMode = u, this.assumeImmutableResults = !!h, (this.onBroadcast = s) && (this.mutationStore = /* @__PURE__ */ Object.create(null));
  }
  return t.prototype.stop = function() {
    var e = this;
    this.queries.forEach(function(r, n) {
      e.stopQueryNoBroadcast(n);
    }), this.cancelPendingFetches(__DEV__ ? new Ge("QueryManager stopped while query was in flight") : new Ge(11));
  }, t.prototype.cancelPendingFetches = function(e) {
    this.fetchCancelFns.forEach(function(r) {
      return r(e);
    }), this.fetchCancelFns.clear();
  }, t.prototype.mutate = function(e) {
    var r, n, i = e.mutation, o = e.variables, a = e.optimisticResponse, s = e.updateQueries, l = e.refetchQueries, u = l === void 0 ? [] : l, c = e.awaitRefetchQueries, f = c === void 0 ? !1 : c, d = e.update, h = e.onQueryUpdated, m = e.fetchPolicy, g = m === void 0 ? ((r = this.defaultOptions.mutate) === null || r === void 0 ? void 0 : r.fetchPolicy) || "network-only" : m, S = e.errorPolicy, b = S === void 0 ? ((n = this.defaultOptions.mutate) === null || n === void 0 ? void 0 : n.errorPolicy) || "none" : S, x = e.keepRootFields, v = e.context;
    return Ko(this, void 0, void 0, function() {
      var w, _, T;
      return Yo(this, function(N) {
        switch (N.label) {
          case 0:
            return __DEV__ ? Q(i, "mutation option is required. You must specify your GraphQL document in the mutation option.") : Q(i, 12), __DEV__ ? Q(g === "network-only" || g === "no-cache", "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write.") : Q(g === "network-only" || g === "no-cache", 13), w = this.generateMutationId(), i = this.transform(i).document, o = this.getVariables(i, o), this.transform(i).hasClientExports ? [4, this.localState.addExportedVariables(i, o, v)] : [3, 2];
          case 1:
            o = N.sent(), N.label = 2;
          case 2:
            return _ = this.mutationStore && (this.mutationStore[w] = {
              mutation: i,
              variables: o,
              loading: !0,
              error: null
            }), a && this.markMutationOptimistic(a, {
              mutationId: w,
              document: i,
              variables: o,
              fetchPolicy: g,
              errorPolicy: b,
              context: v,
              updateQueries: s,
              update: d,
              keepRootFields: x
            }), this.broadcastQueries(), T = this, [2, new Promise(function(A, R) {
              return Vh(T.getObservableFromLink(i, O(O({}, v), { optimisticResponse: a }), o, !1), function(F) {
                if (Rc(F) && b === "none")
                  throw new Ki({
                    graphQLErrors: F.errors
                  });
                _ && (_.loading = !1, _.error = null);
                var X = O({}, F);
                return typeof u == "function" && (u = u(X)), b === "ignore" && Rc(X) && delete X.errors, T.markMutationResult({
                  mutationId: w,
                  result: X,
                  document: i,
                  variables: o,
                  fetchPolicy: g,
                  errorPolicy: b,
                  context: v,
                  update: d,
                  updateQueries: s,
                  awaitRefetchQueries: f,
                  refetchQueries: u,
                  removeOptimistic: a ? w : void 0,
                  onQueryUpdated: h,
                  keepRootFields: x
                });
              }).subscribe({
                next: function(F) {
                  T.broadcastQueries(), A(F);
                },
                error: function(F) {
                  _ && (_.loading = !1, _.error = F), a && T.cache.removeOptimistic(w), T.broadcastQueries(), R(F instanceof Ki ? F : new Ki({
                    networkError: F
                  }));
                }
              });
            })];
        }
      });
    });
  }, t.prototype.markMutationResult = function(e, r) {
    var n = this;
    r === void 0 && (r = this.cache);
    var i = e.result, o = [], a = e.fetchPolicy === "no-cache";
    if (!a && Zp(i, e.errorPolicy)) {
      o.push({
        result: i.data,
        dataId: "ROOT_MUTATION",
        query: e.document,
        variables: e.variables
      });
      var s = e.updateQueries;
      s && this.queries.forEach(function(u, c) {
        var f = u.observableQuery, d = f && f.queryName;
        if (!(!d || !VD.call(s, d))) {
          var h = s[d], m = n.queries.get(c), g = m.document, S = m.variables, b = r.diff({
            query: g,
            variables: S,
            returnPartialData: !0,
            optimistic: !1
          }), x = b.result, v = b.complete;
          if (v && x) {
            var w = h(x, {
              mutationResult: i,
              queryName: g && Pp(g) || void 0,
              queryVariables: S
            });
            w && o.push({
              result: w,
              dataId: "ROOT_QUERY",
              query: g,
              variables: S
            });
          }
        }
      });
    }
    if (o.length > 0 || e.refetchQueries || e.update || e.onQueryUpdated || e.removeOptimistic) {
      var l = [];
      if (this.refetchQueries({
        updateCache: function(u) {
          a || o.forEach(function(d) {
            return u.write(d);
          });
          var c = e.update;
          if (c) {
            if (!a) {
              var f = u.diff({
                id: "ROOT_MUTATION",
                query: n.transform(e.document).asQuery,
                variables: e.variables,
                optimistic: !1,
                returnPartialData: !0
              });
              f.complete && (i = O(O({}, i), { data: f.result }));
            }
            c(u, i, {
              context: e.context,
              variables: e.variables
            });
          }
          !a && !e.keepRootFields && u.modify({
            id: "ROOT_MUTATION",
            fields: function(d, h) {
              var m = h.fieldName, g = h.DELETE;
              return m === "__typename" ? d : g;
            }
          });
        },
        include: e.refetchQueries,
        optimistic: !1,
        removeOptimistic: e.removeOptimistic,
        onQueryUpdated: e.onQueryUpdated || null
      }).forEach(function(u) {
        return l.push(u);
      }), e.awaitRefetchQueries || e.onQueryUpdated)
        return Promise.all(l).then(function() {
          return i;
        });
    }
    return Promise.resolve(i);
  }, t.prototype.markMutationOptimistic = function(e, r) {
    var n = this, i = typeof e == "function" ? e(r.variables) : e;
    return this.cache.recordOptimisticTransaction(function(o) {
      try {
        n.markMutationResult(O(O({}, r), { result: { data: i } }), o);
      } catch (a) {
        __DEV__ && Q.error(a);
      }
    }, r.mutationId);
  }, t.prototype.fetchQuery = function(e, r, n) {
    return this.fetchQueryObservable(e, r, n).promise;
  }, t.prototype.getQueryStore = function() {
    var e = /* @__PURE__ */ Object.create(null);
    return this.queries.forEach(function(r, n) {
      e[n] = {
        variables: r.variables,
        networkStatus: r.networkStatus,
        networkError: r.networkError,
        graphQLErrors: r.graphQLErrors
      };
    }), e;
  }, t.prototype.resetErrors = function(e) {
    var r = this.queries.get(e);
    r && (r.networkError = void 0, r.graphQLErrors = []);
  }, t.prototype.transform = function(e) {
    var r = this.transformCache;
    if (!r.has(e)) {
      var n = this.cache.transformDocument(e), i = vN(this.cache.transformForLink(n)), o = this.localState.clientQuery(n), a = i && this.localState.serverQuery(i), s = {
        document: n,
        hasClientExports: ZT(n),
        hasForcedResolvers: this.localState.shouldForceResolvers(n),
        clientQuery: o,
        serverQuery: a,
        defaultVars: Xg(n0(n)),
        asQuery: O(O({}, n), { definitions: n.definitions.map(function(u) {
          return u.kind === "OperationDefinition" && u.operation !== "query" ? O(O({}, u), { operation: "query" }) : u;
        }) })
      }, l = function(u) {
        u && !r.has(u) && r.set(u, s);
      };
      l(e), l(n), l(o), l(a);
    }
    return r.get(e);
  }, t.prototype.getVariables = function(e, r) {
    return O(O({}, this.transform(e).defaultVars), r);
  }, t.prototype.watchQuery = function(e) {
    e = O(O({}, e), { variables: this.getVariables(e.query, e.variables) }), typeof e.notifyOnNetworkStatusChange > "u" && (e.notifyOnNetworkStatusChange = !1);
    var r = new Jh(this), n = new Xp({
      queryManager: this,
      queryInfo: r,
      options: e
    });
    return this.queries.set(n.queryId, r), r.init({
      document: n.query,
      observableQuery: n,
      variables: n.variables
    }), n;
  }, t.prototype.query = function(e, r) {
    var n = this;
    return r === void 0 && (r = this.generateQueryId()), __DEV__ ? Q(e.query, "query option is required. You must specify your GraphQL document in the query option.") : Q(e.query, 14), __DEV__ ? Q(e.query.kind === "Document", 'You must wrap the query string in a "gql" tag.') : Q(e.query.kind === "Document", 15), __DEV__ ? Q(!e.returnPartialData, "returnPartialData option only supported on watchQuery.") : Q(!e.returnPartialData, 16), __DEV__ ? Q(!e.pollInterval, "pollInterval option only supported on watchQuery.") : Q(!e.pollInterval, 17), this.fetchQuery(r, e).finally(function() {
      return n.stopQuery(r);
    });
  }, t.prototype.generateQueryId = function() {
    return String(this.queryIdCounter++);
  }, t.prototype.generateRequestId = function() {
    return this.requestIdCounter++;
  }, t.prototype.generateMutationId = function() {
    return String(this.mutationIdCounter++);
  }, t.prototype.stopQueryInStore = function(e) {
    this.stopQueryInStoreNoBroadcast(e), this.broadcastQueries();
  }, t.prototype.stopQueryInStoreNoBroadcast = function(e) {
    var r = this.queries.get(e);
    r && r.stop();
  }, t.prototype.clearStore = function(e) {
    return e === void 0 && (e = {
      discardWatches: !0
    }), this.cancelPendingFetches(__DEV__ ? new Ge("Store reset while query was in flight (not completed in link chain)") : new Ge(18)), this.queries.forEach(function(r) {
      r.observableQuery ? r.networkStatus = $e.loading : r.stop();
    }), this.mutationStore && (this.mutationStore = /* @__PURE__ */ Object.create(null)), this.cache.reset(e);
  }, t.prototype.getObservableQueries = function(e) {
    var r = this;
    e === void 0 && (e = "active");
    var n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Set();
    return Array.isArray(e) && e.forEach(function(a) {
      typeof a == "string" ? i.set(a, !1) : rN(a) ? i.set(r.transform(a).document, !1) : vt(a) && a.query && o.add(a);
    }), this.queries.forEach(function(a, s) {
      var l = a.observableQuery, u = a.document;
      if (l) {
        if (e === "all") {
          n.set(s, l);
          return;
        }
        var c = l.queryName, f = l.options.fetchPolicy;
        if (f === "standby" || e === "active" && !l.hasObservers())
          return;
        (e === "active" || c && i.has(c) || u && i.has(u)) && (n.set(s, l), c && i.set(c, !0), u && i.set(u, !0));
      }
    }), o.size && o.forEach(function(a) {
      var s = zp("legacyOneTimeQuery"), l = r.getQuery(s).init({
        document: a.query,
        variables: a.variables
      }), u = new Xp({
        queryManager: r,
        queryInfo: l,
        options: O(O({}, a), { fetchPolicy: "network-only" })
      });
      Q(u.queryId === s), l.setObservableQuery(u), n.set(s, u);
    }), __DEV__ && i.size && i.forEach(function(a, s) {
      a || __DEV__ && Q.warn("Unknown query ".concat(typeof s == "string" ? "named " : "").concat(JSON.stringify(s, null, 2), " requested in refetchQueries options.include array"));
    }), n;
  }, t.prototype.reFetchObservableQueries = function(e) {
    var r = this;
    e === void 0 && (e = !1);
    var n = [];
    return this.getObservableQueries(e ? "all" : "active").forEach(function(i, o) {
      var a = i.options.fetchPolicy;
      i.resetLastResults(), (e || a !== "standby" && a !== "cache-only") && n.push(i.refetch()), r.getQuery(o).setDiff(null);
    }), this.broadcastQueries(), Promise.all(n);
  }, t.prototype.setObservableQuery = function(e) {
    this.getQuery(e.queryId).setObservableQuery(e);
  }, t.prototype.startGraphQLSubscription = function(e) {
    var r = this, n = e.query, i = e.fetchPolicy, o = e.errorPolicy, a = e.variables, s = e.context, l = s === void 0 ? {} : s;
    n = this.transform(n).document, a = this.getVariables(n, a);
    var u = function(f) {
      return r.getObservableFromLink(n, l, f).map(function(d) {
        if (i !== "no-cache" && (Zp(d, o) && r.cache.write({
          query: n,
          result: d.data,
          dataId: "ROOT_SUBSCRIPTION",
          variables: f
        }), r.broadcastQueries()), Rc(d))
          throw new Ki({
            graphQLErrors: d.errors
          });
        return d;
      });
    };
    if (this.transform(n).hasClientExports) {
      var c = this.localState.addExportedVariables(n, a, l).then(u);
      return new Be(function(f) {
        var d = null;
        return c.then(function(h) {
          return d = h.subscribe(f);
        }, f.error), function() {
          return d && d.unsubscribe();
        };
      });
    }
    return u(a);
  }, t.prototype.stopQuery = function(e) {
    this.stopQueryNoBroadcast(e), this.broadcastQueries();
  }, t.prototype.stopQueryNoBroadcast = function(e) {
    this.stopQueryInStoreNoBroadcast(e), this.removeQuery(e);
  }, t.prototype.removeQuery = function(e) {
    this.fetchCancelFns.delete(e), this.queries.has(e) && (this.getQuery(e).stop(), this.queries.delete(e));
  }, t.prototype.broadcastQueries = function() {
    this.onBroadcast && this.onBroadcast(), this.queries.forEach(function(e) {
      return e.notify();
    });
  }, t.prototype.getLocalState = function() {
    return this.localState;
  }, t.prototype.getObservableFromLink = function(e, r, n, i) {
    var o = this, a;
    i === void 0 && (i = (a = r == null ? void 0 : r.queryDeduplication) !== null && a !== void 0 ? a : this.queryDeduplication);
    var s, l = this.transform(e).serverQuery;
    if (l) {
      var u = this, c = u.inFlightLinkObservables, f = u.link, d = {
        query: l,
        variables: n,
        operationName: Pp(l) || void 0,
        context: this.prepareContext(O(O({}, r), { forceFetch: !i }))
      };
      if (r = d.context, i) {
        var h = c.get(l) || /* @__PURE__ */ new Map();
        c.set(l, h);
        var m = ia(n);
        if (s = h.get(m), !s) {
          var g = new Ol([
            Hp(f, d)
          ]);
          h.set(m, s = g), g.cleanup(function() {
            h.delete(m) && h.size < 1 && c.delete(l);
          });
        }
      } else
        s = new Ol([
          Hp(f, d)
        ]);
    } else
      s = new Ol([
        Be.of({ data: {} })
      ]), r = this.prepareContext(r);
    var S = this.transform(e).clientQuery;
    return S && (s = Vh(s, function(b) {
      return o.localState.runResolvers({
        document: S,
        remoteResult: b,
        context: r,
        variables: n
      });
    })), s;
  }, t.prototype.getResultsFromLink = function(e, r, n) {
    var i = e.lastRequestId = this.generateRequestId();
    return Vh(this.getObservableFromLink(e.document, n.context, n.variables), function(o) {
      var a = Eo(o.errors);
      if (i >= e.lastRequestId) {
        if (a && n.errorPolicy === "none")
          throw e.markError(new Ki({
            graphQLErrors: o.errors
          }));
        e.markResult(o, n, r), e.markReady();
      }
      var s = {
        data: o.data,
        loading: !1,
        networkStatus: $e.ready
      };
      return a && n.errorPolicy !== "ignore" && (s.errors = o.errors, s.networkStatus = $e.error), s;
    }, function(o) {
      var a = BD(o) ? o : new Ki({ networkError: o });
      throw i >= e.lastRequestId && e.markError(a), a;
    });
  }, t.prototype.fetchQueryObservable = function(e, r, n) {
    var i = this;
    n === void 0 && (n = $e.loading);
    var o = this.transform(r.query).document, a = this.getVariables(o, r.variables), s = this.getQuery(e), l = this.defaultOptions.watchQuery, u = r.fetchPolicy, c = u === void 0 ? l && l.fetchPolicy || "cache-first" : u, f = r.errorPolicy, d = f === void 0 ? l && l.errorPolicy || "none" : f, h = r.returnPartialData, m = h === void 0 ? !1 : h, g = r.notifyOnNetworkStatusChange, S = g === void 0 ? !1 : g, b = r.context, x = b === void 0 ? {} : b, v = Object.assign({}, r, {
      query: o,
      variables: a,
      fetchPolicy: c,
      errorPolicy: d,
      returnPartialData: m,
      notifyOnNetworkStatusChange: S,
      context: x
    }), w = function(N) {
      v.variables = N;
      var A = i.fetchQueryByPolicy(s, v, n);
      return v.fetchPolicy !== "standby" && A.length > 0 && s.observableQuery && s.observableQuery.applyNextFetchPolicy("after-fetch", r), A;
    }, _ = function() {
      return i.fetchCancelFns.delete(e);
    };
    this.fetchCancelFns.set(e, function(N) {
      _(), setTimeout(function() {
        return T.cancel(N);
      });
    });
    var T = new Ol(this.transform(v.query).hasClientExports ? this.localState.addExportedVariables(v.query, v.variables, v.context).then(w) : w(v.variables));
    return T.promise.then(_, _), T;
  }, t.prototype.refetchQueries = function(e) {
    var r = this, n = e.updateCache, i = e.include, o = e.optimistic, a = o === void 0 ? !1 : o, s = e.removeOptimistic, l = s === void 0 ? a ? zp("refetchQueries") : void 0 : s, u = e.onQueryUpdated, c = /* @__PURE__ */ new Map();
    i && this.getObservableQueries(i).forEach(function(d, h) {
      c.set(h, {
        oq: d,
        lastDiff: r.getQuery(h).getDiff()
      });
    });
    var f = /* @__PURE__ */ new Map();
    return n && this.cache.batch({
      update: n,
      optimistic: a && l || !1,
      removeOptimistic: l,
      onWatchUpdated: function(d, h, m) {
        var g = d.watcher instanceof Jh && d.watcher.observableQuery;
        if (g) {
          if (u) {
            c.delete(g.queryId);
            var S = u(g, h, m);
            return S === !0 && (S = g.refetch()), S !== !1 && f.set(g, S), S;
          }
          u !== null && c.set(g.queryId, { oq: g, lastDiff: m, diff: h });
        }
      }
    }), c.size && c.forEach(function(d, h) {
      var m = d.oq, g = d.lastDiff, S = d.diff, b;
      if (u) {
        if (!S) {
          var x = m.queryInfo;
          x.reset(), S = x.getDiff();
        }
        b = u(m, S, g);
      }
      (!u || b === !0) && (b = m.refetch()), b !== !1 && f.set(m, b), h.indexOf("legacyOneTimeQuery") >= 0 && r.stopQueryNoBroadcast(h);
    }), l && this.cache.removeOptimistic(l), f;
  }, t.prototype.fetchQueryByPolicy = function(e, r, n) {
    var i = this, o = r.query, a = r.variables, s = r.fetchPolicy, l = r.refetchWritePolicy, u = r.errorPolicy, c = r.returnPartialData, f = r.context, d = r.notifyOnNetworkStatusChange, h = e.networkStatus;
    e.init({
      document: this.transform(o).document,
      variables: a,
      networkStatus: n
    });
    var m = function() {
      return e.getDiff(a);
    }, g = function(w, _) {
      _ === void 0 && (_ = e.networkStatus || $e.loading);
      var T = w.result;
      __DEV__ && !c && !ft(T, {}) && $9(w.missing);
      var N = function(A) {
        return Be.of(O({ data: A, loading: Ou(_), networkStatus: _ }, w.complete ? null : { partial: !0 }));
      };
      return T && i.transform(o).hasForcedResolvers ? i.localState.runResolvers({
        document: o,
        remoteResult: { data: T },
        context: f,
        variables: a,
        onlyRunForcedResolvers: !0
      }).then(function(A) {
        return N(A.data || void 0);
      }) : N(T);
    }, S = s === "no-cache" ? 0 : n === $e.refetch && l !== "merge" ? 1 : 2, b = function() {
      return i.getResultsFromLink(e, S, {
        variables: a,
        context: f,
        fetchPolicy: s,
        errorPolicy: u
      });
    }, x = d && typeof h == "number" && h !== n && Ou(n);
    switch (s) {
      default:
      case "cache-first": {
        var v = m();
        return v.complete ? [
          g(v, e.markReady())
        ] : c || x ? [
          g(v),
          b()
        ] : [
          b()
        ];
      }
      case "cache-and-network": {
        var v = m();
        return v.complete || c || x ? [
          g(v),
          b()
        ] : [
          b()
        ];
      }
      case "cache-only":
        return [
          g(m(), e.markReady())
        ];
      case "network-only":
        return x ? [
          g(m()),
          b()
        ] : [b()];
      case "no-cache":
        return x ? [
          g(e.getDiff()),
          b()
        ] : [b()];
      case "standby":
        return [];
    }
  }, t.prototype.getQuery = function(e) {
    return e && !this.queries.has(e) && this.queries.set(e, new Jh(this, e)), this.queries.get(e);
  }, t.prototype.prepareContext = function(e) {
    e === void 0 && (e = {});
    var r = this.localState.prepareContext(e);
    return O(O({}, r), { clientAwareness: this.clientAwareness });
  }, t;
}(), Fy = !1, B9 = function() {
  function t(e) {
    var r = this;
    this.resetStoreCallbacks = [], this.clearStoreCallbacks = [];
    var n = e.uri, i = e.credentials, o = e.headers, a = e.cache, s = e.ssrMode, l = s === void 0 ? !1 : s, u = e.ssrForceFetchDelay, c = u === void 0 ? 0 : u, f = e.connectToDevTools, d = f === void 0 ? typeof window == "object" && !window.__APOLLO_CLIENT__ && __DEV__ : f, h = e.queryDeduplication, m = h === void 0 ? !0 : h, g = e.defaultOptions, S = e.assumeImmutableResults, b = S === void 0 ? !1 : S, x = e.resolvers, v = e.typeDefs, w = e.fragmentMatcher, _ = e.name, T = e.version, N = e.link;
    if (N || (N = n ? new f9({ uri: n, credentials: i, headers: o }) : ai.empty()), !a)
      throw __DEV__ ? new Ge(`To initialize Apollo Client, you must specify a 'cache' property in the options object. 
For more information, please visit: https://go.apollo.dev/c/docs`) : new Ge(7);
    if (this.link = N, this.cache = a, this.disableNetworkFetches = l || c > 0, this.queryDeduplication = m, this.defaultOptions = g || /* @__PURE__ */ Object.create(null), this.typeDefs = v, c && setTimeout(function() {
      return r.disableNetworkFetches = !1;
    }, c), this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this), d && typeof window == "object" && (window.__APOLLO_CLIENT__ = this), !Fy && __DEV__ && (Fy = !0, typeof window < "u" && window.document && window.top === window.self && !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__)) {
      var A = window.navigator, R = A && A.userAgent, F = void 0;
      typeof R == "string" && (R.indexOf("Chrome/") > -1 ? F = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm" : R.indexOf("Firefox/") > -1 && (F = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/")), F && __DEV__ && Q.log("Download the Apollo DevTools for a better development experience: " + F);
    }
    this.version = WN, this.localState = new F9({
      cache: a,
      client: this,
      resolvers: x,
      fragmentMatcher: w
    }), this.queryManager = new qD({
      cache: this.cache,
      link: this.link,
      defaultOptions: this.defaultOptions,
      queryDeduplication: m,
      ssrMode: l,
      clientAwareness: {
        name: _,
        version: T
      },
      localState: this.localState,
      assumeImmutableResults: b,
      onBroadcast: d ? function() {
        r.devToolsHookCb && r.devToolsHookCb({
          action: {},
          state: {
            queries: r.queryManager.getQueryStore(),
            mutations: r.queryManager.mutationStore || {}
          },
          dataWithOptimisticResults: r.cache.extract(!0)
        });
      } : void 0
    });
  }
  return t.prototype.stop = function() {
    this.queryManager.stop();
  }, t.prototype.watchQuery = function(e) {
    return this.defaultOptions.watchQuery && (e = ls(this.defaultOptions.watchQuery, e)), this.disableNetworkFetches && (e.fetchPolicy === "network-only" || e.fetchPolicy === "cache-and-network") && (e = O(O({}, e), { fetchPolicy: "cache-first" })), this.queryManager.watchQuery(e);
  }, t.prototype.query = function(e) {
    return this.defaultOptions.query && (e = ls(this.defaultOptions.query, e)), __DEV__ ? Q(e.fetchPolicy !== "cache-and-network", "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only.") : Q(e.fetchPolicy !== "cache-and-network", 8), this.disableNetworkFetches && e.fetchPolicy === "network-only" && (e = O(O({}, e), { fetchPolicy: "cache-first" })), this.queryManager.query(e);
  }, t.prototype.mutate = function(e) {
    return this.defaultOptions.mutate && (e = ls(this.defaultOptions.mutate, e)), this.queryManager.mutate(e);
  }, t.prototype.subscribe = function(e) {
    return this.queryManager.startGraphQLSubscription(e);
  }, t.prototype.readQuery = function(e, r) {
    return r === void 0 && (r = !1), this.cache.readQuery(e, r);
  }, t.prototype.readFragment = function(e, r) {
    return r === void 0 && (r = !1), this.cache.readFragment(e, r);
  }, t.prototype.writeQuery = function(e) {
    this.cache.writeQuery(e), this.queryManager.broadcastQueries();
  }, t.prototype.writeFragment = function(e) {
    this.cache.writeFragment(e), this.queryManager.broadcastQueries();
  }, t.prototype.__actionHookForDevTools = function(e) {
    this.devToolsHookCb = e;
  }, t.prototype.__requestRaw = function(e) {
    return Hp(this.link, e);
  }, t.prototype.resetStore = function() {
    var e = this;
    return Promise.resolve().then(function() {
      return e.queryManager.clearStore({
        discardWatches: !1
      });
    }).then(function() {
      return Promise.all(e.resetStoreCallbacks.map(function(r) {
        return r();
      }));
    }).then(function() {
      return e.reFetchObservableQueries();
    });
  }, t.prototype.clearStore = function() {
    var e = this;
    return Promise.resolve().then(function() {
      return e.queryManager.clearStore({
        discardWatches: !0
      });
    }).then(function() {
      return Promise.all(e.clearStoreCallbacks.map(function(r) {
        return r();
      }));
    });
  }, t.prototype.onResetStore = function(e) {
    var r = this;
    return this.resetStoreCallbacks.push(e), function() {
      r.resetStoreCallbacks = r.resetStoreCallbacks.filter(function(n) {
        return n !== e;
      });
    };
  }, t.prototype.onClearStore = function(e) {
    var r = this;
    return this.clearStoreCallbacks.push(e), function() {
      r.clearStoreCallbacks = r.clearStoreCallbacks.filter(function(n) {
        return n !== e;
      });
    };
  }, t.prototype.reFetchObservableQueries = function(e) {
    return this.queryManager.reFetchObservableQueries(e);
  }, t.prototype.refetchQueries = function(e) {
    var r = this.queryManager.refetchQueries(e), n = [], i = [];
    r.forEach(function(a, s) {
      n.push(s), i.push(a);
    });
    var o = Promise.all(i);
    return o.queries = n, o.results = i, o.catch(function(a) {
      __DEV__ && Q.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(a));
    }), o;
  }, t.prototype.getObservableQueries = function(e) {
    return e === void 0 && (e = "active"), this.queryManager.getObservableQueries(e);
  }, t.prototype.extract = function(e) {
    return this.cache.extract(e);
  }, t.prototype.restore = function(e) {
    return this.cache.restore(e);
  }, t.prototype.addResolvers = function(e) {
    this.localState.addResolvers(e);
  }, t.prototype.setResolvers = function(e) {
    this.localState.setResolvers(e);
  }, t.prototype.getResolvers = function() {
    return this.localState.getResolvers();
  }, t.prototype.setLocalStateFragmentMatcher = function(e) {
    this.localState.setFragmentMatcher(e);
  }, t.prototype.setLink = function(e) {
    this.link = this.queryManager.link = e;
  }, t;
}(), Ic = /* @__PURE__ */ new Map(), Jp = /* @__PURE__ */ new Map(), z9 = !0, Rf = !1;
function H9(t) {
  return t.replace(/[\s,]+/g, " ").trim();
}
function GD(t) {
  return H9(t.source.body.substring(t.start, t.end));
}
function WD(t) {
  var e = /* @__PURE__ */ new Set(), r = [];
  return t.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var i = n.name.value, o = GD(n.loc), a = Jp.get(i);
      a && !a.has(o) ? z9 && console.warn("Warning: fragment with name " + i + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : a || Jp.set(i, a = /* @__PURE__ */ new Set()), a.add(o), e.has(o) || (e.add(o), r.push(n));
    } else
      r.push(n);
  }), O(O({}, t), { definitions: r });
}
function QD(t) {
  var e = new Set(t.definitions);
  e.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(i) {
      var o = n[i];
      o && typeof o == "object" && e.add(o);
    });
  });
  var r = t.loc;
  return r && (delete r.startToken, delete r.endToken), t;
}
function KD(t) {
  var e = H9(t);
  if (!Ic.has(e)) {
    var r = BT(t, {
      experimentalFragmentVariables: Rf,
      allowLegacyFragmentVariables: Rf
    });
    if (!r || r.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ic.set(e, QD(WD(r)));
  }
  return Ic.get(e);
}
function $n(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  typeof t == "string" && (t = [t]);
  var n = t[0];
  return e.forEach(function(i, o) {
    i && i.kind === "Document" ? n += i.loc.source.body : n += i, n += t[o + 1];
  }), KD(n);
}
function YD() {
  Ic.clear(), Jp.clear();
}
function XD() {
  z9 = !1;
}
function ZD() {
  Rf = !0;
}
function JD() {
  Rf = !1;
}
var vl = {
  gql: $n,
  resetCaches: YD,
  disableFragmentWarnings: XD,
  enableExperimentalFragmentVariables: ZD,
  disableExperimentalFragmentVariables: JD
};
(function(t) {
  t.gql = vl.gql, t.resetCaches = vl.resetCaches, t.disableFragmentWarnings = vl.disableFragmentWarnings, t.enableExperimentalFragmentVariables = vl.enableExperimentalFragmentVariables, t.disableExperimentalFragmentVariables = vl.disableExperimentalFragmentVariables;
})($n || ($n = {}));
$n.default = $n;
var By = n9 ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
function fv() {
  var t = I.exports.createContext[By];
  return t || (Object.defineProperty(I.exports.createContext, By, {
    value: t = I.exports.createContext({}),
    enumerable: !1,
    writable: !1,
    configurable: !0
  }), t.displayName = "ApolloContext"), t;
}
var Td = { exports: {} }, Nd = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ek = I.exports, tk = Symbol.for("react.element"), rk = Symbol.for("react.fragment"), nk = Object.prototype.hasOwnProperty, ik = ek.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ok = { key: !0, ref: !0, __self: !0, __source: !0 };
function U9(t, e, r) {
  var n, i = {}, o = null, a = null;
  r !== void 0 && (o = "" + r), e.key !== void 0 && (o = "" + e.key), e.ref !== void 0 && (a = e.ref);
  for (n in e)
    nk.call(e, n) && !ok.hasOwnProperty(n) && (i[n] = e[n]);
  if (t && t.defaultProps)
    for (n in e = t.defaultProps, e)
      i[n] === void 0 && (i[n] = e[n]);
  return { $$typeof: tk, type: t, key: o, ref: a, props: i, _owner: ik.current };
}
Nd.Fragment = rk;
Nd.jsx = U9;
Nd.jsxs = U9;
(function(t) {
  t.exports = Nd;
})(Td);
const j9 = Td.exports.Fragment, P = Td.exports.jsx, Or = Td.exports.jsxs;
var ak = function(t) {
  var e = t.client, r = t.children, n = fv();
  return /* @__PURE__ */ P(n.Consumer, {
    children: function(i) {
      return i === void 0 && (i = {}), e && i.client !== e && (i = Object.assign({}, i, {
        client: e
      })), __DEV__ ? Q(i.client, 'ApolloProvider was not passed a client instance. Make sure you pass in your client via the "client" prop.') : Q(i.client, 26), /* @__PURE__ */ P(n.Provider, {
        value: i,
        children: r
      });
    }
  });
};
function dv(t) {
  var e = I.exports.useContext(fv()), r = t || e.client;
  return __DEV__ ? Q(!!r, 'Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.') : Q(!!r, 29), r;
}
var zy = !1, sk = "useSyncExternalStore", lk = L1[sk], uk = lk || function(t, e, r) {
  var n = e();
  __DEV__ && !zy && n !== e() && (zy = !0, __DEV__ && Q.error("The result of getSnapshot should be cached to avoid an infinite loop"));
  var i = I.exports.useState({ inst: { value: n, getSnapshot: e } }), o = i[0].inst, a = i[1];
  return HN ? I.exports.useLayoutEffect(function() {
    Object.assign(o, { value: n, getSnapshot: e }), e1(o) && a({ inst: o });
  }, [t, n, e]) : Object.assign(o, { value: n, getSnapshot: e }), I.exports.useEffect(function() {
    return e1(o) && a({ inst: o }), t(function() {
      e1(o) && a({ inst: o });
    });
  }, [t]), n;
};
function e1(t) {
  var e = t.value, r = t.getSnapshot;
  try {
    return e !== r();
  } catch {
    return !0;
  }
}
var Xn;
(function(t) {
  t[t.Query = 0] = "Query", t[t.Mutation = 1] = "Mutation", t[t.Subscription = 2] = "Subscription";
})(Xn || (Xn = {}));
var Hy = /* @__PURE__ */ new Map();
function Uy(t) {
  var e;
  switch (t) {
    case Xn.Query:
      e = "Query";
      break;
    case Xn.Mutation:
      e = "Mutation";
      break;
    case Xn.Subscription:
      e = "Subscription";
      break;
  }
  return e;
}
function ck(t) {
  var e = Hy.get(t);
  if (e)
    return e;
  var r, n, i;
  __DEV__ ? Q(!!t && !!t.kind, "Argument of ".concat(t, " passed to parser was not a valid GraphQL ") + "DocumentNode. You may need to use 'graphql-tag' or another method to convert your operation into a document") : Q(!!t && !!t.kind, 30);
  for (var o = [], a = [], s = [], l = [], u = 0, c = t.definitions; u < c.length; u++) {
    var f = c[u];
    if (f.kind === "FragmentDefinition") {
      o.push(f);
      continue;
    }
    if (f.kind === "OperationDefinition")
      switch (f.operation) {
        case "query":
          a.push(f);
          break;
        case "mutation":
          s.push(f);
          break;
        case "subscription":
          l.push(f);
          break;
      }
  }
  __DEV__ ? Q(!o.length || a.length || s.length || l.length, "Passing only a fragment to 'graphql' is not yet supported. You must include a query, subscription or mutation as well") : Q(!o.length || a.length || s.length || l.length, 31), __DEV__ ? Q(a.length + s.length + l.length <= 1, "react-apollo only supports a query, subscription, or a mutation per HOC. " + "".concat(t, " had ").concat(a.length, " queries, ").concat(l.length, " ") + "subscriptions and ".concat(s.length, " mutations. ") + "You can use 'compose' to join multiple operation types to a component") : Q(a.length + s.length + l.length <= 1, 32), n = a.length ? Xn.Query : Xn.Mutation, !a.length && !s.length && (n = Xn.Subscription);
  var d = a.length ? a : s.length ? s : l;
  __DEV__ ? Q(d.length === 1, "react-apollo only supports one definition per HOC. ".concat(t, " had ") + "".concat(d.length, " definitions. ") + "You can use 'compose' to join multiple operation types to a component") : Q(d.length === 1, 33);
  var h = d[0];
  r = h.variableDefinitions || [], h.name && h.name.kind === "Name" ? i = h.name.value : i = "data";
  var m = { name: i, type: n, variables: r };
  return Hy.set(t, m), m;
}
function V9(t, e) {
  var r = ck(t), n = Uy(e), i = Uy(r.type);
  __DEV__ ? Q(r.type === e, "Running a ".concat(n, " requires a graphql ") + "".concat(n, ", but a ").concat(i, " was used instead.")) : Q(r.type === e, 34);
}
var fk = Object.prototype.hasOwnProperty;
function q9(t, e) {
  return e === void 0 && (e = /* @__PURE__ */ Object.create(null)), G9(dv(e.client), t).useQuery(e);
}
function G9(t, e) {
  var r = I.exports.useRef();
  (!r.current || t !== r.current.client || e !== r.current.query) && (r.current = new dk(t, e, r.current));
  var n = r.current, i = I.exports.useState(0);
  i[0];
  var o = i[1];
  return n.forceUpdate = function() {
    o(function(a) {
      return a + 1;
    });
  }, n;
}
var dk = function() {
  function t(e, r, n) {
    this.client = e, this.query = r, this.asyncResolveFns = /* @__PURE__ */ new Set(), this.optionsToIgnoreOnce = new (r9 ? WeakSet : Set)(), this.ssrDisabledResult = Nu({
      loading: !0,
      data: void 0,
      error: void 0,
      networkStatus: $e.loading
    }), this.skipStandbyResult = Nu({
      loading: !1,
      data: void 0,
      error: void 0,
      networkStatus: $e.ready
    }), this.toQueryResultCache = new (Mo ? WeakMap : Map)(), V9(r, Xn.Query);
    var i = n && n.result, o = i && i.data;
    o && (this.previousData = o);
  }
  return t.prototype.forceUpdate = function() {
    __DEV__ && Q.warn("Calling default no-op implementation of InternalState#forceUpdate");
  }, t.prototype.asyncUpdate = function() {
    var e = this;
    return new Promise(function(r) {
      e.asyncResolveFns.add(r), e.optionsToIgnoreOnce.add(e.watchQueryOptions), e.forceUpdate();
    });
  }, t.prototype.useQuery = function(e) {
    var r = this;
    this.renderPromises = I.exports.useContext(fv()).renderPromises, this.useOptions(e);
    var n = this.useObservableQuery(), i = uk(I.exports.useCallback(function() {
      if (r.renderPromises)
        return function() {
        };
      var a = function() {
        var u = r.result, c = n.getCurrentResult();
        u && u.loading === c.loading && u.networkStatus === c.networkStatus && ft(u.data, c.data) || r.setResult(c);
      }, s = function(u) {
        var c = n.last;
        l.unsubscribe();
        try {
          n.resetLastResults(), l = n.subscribe(a, s);
        } finally {
          n.last = c;
        }
        if (!fk.call(u, "graphQLErrors"))
          throw u;
        var f = r.result;
        (!f || f && f.loading || !ft(u, f.error)) && r.setResult({
          data: f && f.data,
          error: u,
          loading: !1,
          networkStatus: $e.error
        });
      }, l = n.subscribe(a, s);
      return function() {
        return l.unsubscribe();
      };
    }, [
      n,
      this.renderPromises,
      this.client.disableNetworkFetches
    ]), function() {
      return r.getCurrentResult();
    }, function() {
      return r.getCurrentResult();
    });
    this.unsafeHandlePartialRefetch(i);
    var o = this.toQueryResult(i);
    return !o.loading && this.asyncResolveFns.size && (this.asyncResolveFns.forEach(function(a) {
      return a(o);
    }), this.asyncResolveFns.clear()), o;
  }, t.prototype.useOptions = function(e) {
    var r, n = this.createWatchQueryOptions(this.queryHookOptions = e), i = this.watchQueryOptions;
    (this.optionsToIgnoreOnce.has(i) || !ft(n, i)) && (this.watchQueryOptions = n, i && this.observable && (this.optionsToIgnoreOnce.delete(i), this.observable.reobserve(this.getObsQueryOptions()), this.previousData = ((r = this.result) === null || r === void 0 ? void 0 : r.data) || this.previousData, this.result = void 0)), this.onCompleted = e.onCompleted || t.prototype.onCompleted, this.onError = e.onError || t.prototype.onError, (this.renderPromises || this.client.disableNetworkFetches) && this.queryHookOptions.ssr === !1 && !this.queryHookOptions.skip ? this.result = this.ssrDisabledResult : this.queryHookOptions.skip || this.watchQueryOptions.fetchPolicy === "standby" ? this.result = this.skipStandbyResult : (this.result === this.ssrDisabledResult || this.result === this.skipStandbyResult) && (this.result = void 0);
  }, t.prototype.getObsQueryOptions = function() {
    var e = [], r = this.client.defaultOptions.watchQuery;
    return r && e.push(r), this.queryHookOptions.defaultOptions && e.push(this.queryHookOptions.defaultOptions), e.push(i0(this.observable && this.observable.options, this.watchQueryOptions)), e.reduce(ls);
  }, t.prototype.createWatchQueryOptions = function(e) {
    var r;
    e === void 0 && (e = {});
    var n = e.skip;
    e.ssr, e.onCompleted, e.onError, e.displayName, e.defaultOptions;
    var i = $r(e, ["skip", "ssr", "onCompleted", "onError", "displayName", "defaultOptions"]), o = Object.assign(i, { query: this.query });
    if (this.renderPromises && (o.fetchPolicy === "network-only" || o.fetchPolicy === "cache-and-network") && (o.fetchPolicy = "cache-first"), o.variables || (o.variables = {}), n) {
      var a = o.fetchPolicy, s = a === void 0 ? this.getDefaultFetchPolicy() : a, l = o.initialFetchPolicy, u = l === void 0 ? s : l;
      Object.assign(o, {
        initialFetchPolicy: u,
        fetchPolicy: "standby"
      });
    } else
      o.fetchPolicy || (o.fetchPolicy = ((r = this.observable) === null || r === void 0 ? void 0 : r.options.initialFetchPolicy) || this.getDefaultFetchPolicy());
    return o;
  }, t.prototype.getDefaultFetchPolicy = function() {
    var e, r;
    return ((e = this.queryHookOptions.defaultOptions) === null || e === void 0 ? void 0 : e.fetchPolicy) || ((r = this.client.defaultOptions.watchQuery) === null || r === void 0 ? void 0 : r.fetchPolicy) || "cache-first";
  }, t.prototype.onCompleted = function(e) {
  }, t.prototype.onError = function(e) {
  }, t.prototype.useObservableQuery = function() {
    var e = this.observable = this.renderPromises && this.renderPromises.getSSRObservable(this.watchQueryOptions) || this.observable || this.client.watchQuery(this.getObsQueryOptions());
    this.obsQueryFields = I.exports.useMemo(function() {
      return {
        refetch: e.refetch.bind(e),
        reobserve: e.reobserve.bind(e),
        fetchMore: e.fetchMore.bind(e),
        updateQuery: e.updateQuery.bind(e),
        startPolling: e.startPolling.bind(e),
        stopPolling: e.stopPolling.bind(e),
        subscribeToMore: e.subscribeToMore.bind(e)
      };
    }, [e]);
    var r = !(this.queryHookOptions.ssr === !1 || this.queryHookOptions.skip);
    return this.renderPromises && r && (this.renderPromises.registerSSRObservable(e), e.getCurrentResult().loading && this.renderPromises.addObservableQueryPromise(e)), e;
  }, t.prototype.setResult = function(e) {
    var r = this.result;
    r && r.data && (this.previousData = r.data), this.result = e, this.forceUpdate(), this.handleErrorOrCompleted(e);
  }, t.prototype.handleErrorOrCompleted = function(e) {
    e.loading || (e.error ? this.onError(e.error) : e.data && this.onCompleted(e.data));
  }, t.prototype.getCurrentResult = function() {
    return this.result || this.handleErrorOrCompleted(this.result = this.observable.getCurrentResult()), this.result;
  }, t.prototype.toQueryResult = function(e) {
    var r = this.toQueryResultCache.get(e);
    if (r)
      return r;
    var n = e.data;
    e.partial;
    var i = $r(e, ["data", "partial"]);
    return this.toQueryResultCache.set(e, r = O(O(O({ data: n }, i), this.obsQueryFields), { client: this.client, observable: this.observable, variables: this.observable.variables, called: !this.queryHookOptions.skip, previousData: this.previousData })), !r.error && Eo(e.errors) && (r.error = new Ki({ graphQLErrors: e.errors })), r;
  }, t.prototype.unsafeHandlePartialRefetch = function(e) {
    e.partial && this.queryHookOptions.partialRefetch && !e.loading && (!e.data || Object.keys(e.data).length === 0) && this.observable.options.fetchPolicy !== "cache-only" && (Object.assign(e, {
      loading: !0,
      networkStatus: $e.refetch
    }), this.observable.refetch());
  }, t;
}(), hk = [
  "refetch",
  "reobserve",
  "fetchMore",
  "updateQuery",
  "startPolling",
  "subscribeToMore"
];
function pk(t, e) {
  var r = G9(dv(e && e.client), t), n = I.exports.useRef(), i = n.current ? ls(e, n.current) : e, o = r.useQuery(O(O({}, i), { skip: !n.current })), a = o.observable.options.initialFetchPolicy || r.getDefaultFetchPolicy(), s = Object.assign(o, {
    called: !!n.current
  }), l = I.exports.useMemo(function() {
    for (var c = {}, f = function(g) {
      var S = s[g];
      c[g] = function() {
        return n.current || (n.current = /* @__PURE__ */ Object.create(null), r.forceUpdate()), S.apply(this, arguments);
      };
    }, d = 0, h = hk; d < h.length; d++) {
      var m = h[d];
      f(m);
    }
    return c;
  }, []);
  Object.assign(s, l);
  var u = I.exports.useCallback(function(c) {
    n.current = c ? O(O({}, c), { fetchPolicy: c.fetchPolicy || a }) : {
      fetchPolicy: a
    };
    var f = r.asyncUpdate().then(function(d) {
      return Object.assign(d, l);
    });
    return f.catch(function() {
    }), f;
  }, []);
  return [u, s];
}
function W9(t, e) {
  var r = dv(e == null ? void 0 : e.client);
  V9(t, Xn.Mutation);
  var n = I.exports.useState({
    called: !1,
    loading: !1,
    client: r
  }), i = n[0], o = n[1], a = I.exports.useRef({
    result: i,
    mutationId: 0,
    isMounted: !0,
    client: r,
    mutation: t,
    options: e
  });
  Object.assign(a.current, { client: r, options: e, mutation: t });
  var s = I.exports.useCallback(function(u) {
    u === void 0 && (u = {});
    var c = a.current, f = c.client, d = c.options, h = c.mutation, m = O(O({}, d), { mutation: h });
    !a.current.result.loading && !m.ignoreResults && o(a.current.result = {
      loading: !0,
      error: void 0,
      data: void 0,
      called: !0,
      client: f
    });
    var g = ++a.current.mutationId, S = ls(m, u);
    return f.mutate(S).then(function(b) {
      var x, v, w, _ = b.data, T = b.errors, N = T && T.length > 0 ? new Ki({ graphQLErrors: T }) : void 0;
      if (g === a.current.mutationId && !S.ignoreResults) {
        var A = {
          called: !0,
          loading: !1,
          data: _,
          error: N,
          client: f
        };
        a.current.isMounted && !ft(a.current.result, A) && o(a.current.result = A);
      }
      return (v = (x = a.current.options) === null || x === void 0 ? void 0 : x.onCompleted) === null || v === void 0 || v.call(x, b.data), (w = u.onCompleted) === null || w === void 0 || w.call(u, b.data), b;
    }).catch(function(b) {
      var x, v, w, _;
      if (g === a.current.mutationId && a.current.isMounted) {
        var T = {
          loading: !1,
          error: b,
          data: void 0,
          called: !0,
          client: f
        };
        ft(a.current.result, T) || o(a.current.result = T);
      }
      if (((x = a.current.options) === null || x === void 0 ? void 0 : x.onError) || S.onError)
        return (w = (v = a.current.options) === null || v === void 0 ? void 0 : v.onError) === null || w === void 0 || w.call(v, b), (_ = u.onError) === null || _ === void 0 || _.call(u, b), { data: void 0, errors: b };
      throw b;
    });
  }, []), l = I.exports.useCallback(function() {
    o({ called: !1, loading: !1, client: r });
  }, []);
  return I.exports.useEffect(function() {
    return a.current.isMounted = !0, function() {
      a.current.isMounted = !1;
    };
  }, []), [s, O({ reset: l }, i)];
}
var Q9 = { exports: {} }, je = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wt = typeof Symbol == "function" && Symbol.for, hv = Wt ? Symbol.for("react.element") : 60103, pv = Wt ? Symbol.for("react.portal") : 60106, Dd = Wt ? Symbol.for("react.fragment") : 60107, kd = Wt ? Symbol.for("react.strict_mode") : 60108, Od = Wt ? Symbol.for("react.profiler") : 60114, Ad = Wt ? Symbol.for("react.provider") : 60109, Md = Wt ? Symbol.for("react.context") : 60110, mv = Wt ? Symbol.for("react.async_mode") : 60111, Rd = Wt ? Symbol.for("react.concurrent_mode") : 60111, Ld = Wt ? Symbol.for("react.forward_ref") : 60112, Id = Wt ? Symbol.for("react.suspense") : 60113, mk = Wt ? Symbol.for("react.suspense_list") : 60120, Pd = Wt ? Symbol.for("react.memo") : 60115, $d = Wt ? Symbol.for("react.lazy") : 60116, gk = Wt ? Symbol.for("react.block") : 60121, vk = Wt ? Symbol.for("react.fundamental") : 60117, yk = Wt ? Symbol.for("react.responder") : 60118, xk = Wt ? Symbol.for("react.scope") : 60119;
function tn(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case hv:
        switch (t = t.type, t) {
          case mv:
          case Rd:
          case Dd:
          case Od:
          case kd:
          case Id:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case Md:
              case Ld:
              case $d:
              case Pd:
              case Ad:
                return t;
              default:
                return e;
            }
        }
      case pv:
        return e;
    }
  }
}
function K9(t) {
  return tn(t) === Rd;
}
je.AsyncMode = mv;
je.ConcurrentMode = Rd;
je.ContextConsumer = Md;
je.ContextProvider = Ad;
je.Element = hv;
je.ForwardRef = Ld;
je.Fragment = Dd;
je.Lazy = $d;
je.Memo = Pd;
je.Portal = pv;
je.Profiler = Od;
je.StrictMode = kd;
je.Suspense = Id;
je.isAsyncMode = function(t) {
  return K9(t) || tn(t) === mv;
};
je.isConcurrentMode = K9;
je.isContextConsumer = function(t) {
  return tn(t) === Md;
};
je.isContextProvider = function(t) {
  return tn(t) === Ad;
};
je.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === hv;
};
je.isForwardRef = function(t) {
  return tn(t) === Ld;
};
je.isFragment = function(t) {
  return tn(t) === Dd;
};
je.isLazy = function(t) {
  return tn(t) === $d;
};
je.isMemo = function(t) {
  return tn(t) === Pd;
};
je.isPortal = function(t) {
  return tn(t) === pv;
};
je.isProfiler = function(t) {
  return tn(t) === Od;
};
je.isStrictMode = function(t) {
  return tn(t) === kd;
};
je.isSuspense = function(t) {
  return tn(t) === Id;
};
je.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === Dd || t === Rd || t === Od || t === kd || t === Id || t === mk || typeof t == "object" && t !== null && (t.$$typeof === $d || t.$$typeof === Pd || t.$$typeof === Ad || t.$$typeof === Md || t.$$typeof === Ld || t.$$typeof === vk || t.$$typeof === yk || t.$$typeof === xk || t.$$typeof === gk);
};
je.typeOf = tn;
(function(t) {
  t.exports = je;
})(Q9);
var Y9 = Q9.exports, bk = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, wk = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, X9 = {};
X9[Y9.ForwardRef] = bk;
X9[Y9.Memo] = wk;
function Z9(t, e, r) {
  if (r === void 0 && (r = Error), !t)
    throw new r(e);
}
var ke;
(function(t) {
  t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(ke || (ke = {}));
var et;
(function(t) {
  t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
})(et || (et = {}));
var ks;
(function(t) {
  t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
})(ks || (ks = {}));
function jy(t) {
  return t.type === et.literal;
}
function Ek(t) {
  return t.type === et.argument;
}
function J9(t) {
  return t.type === et.number;
}
function ex(t) {
  return t.type === et.date;
}
function tx(t) {
  return t.type === et.time;
}
function rx(t) {
  return t.type === et.select;
}
function nx(t) {
  return t.type === et.plural;
}
function Sk(t) {
  return t.type === et.pound;
}
function ix(t) {
  return t.type === et.tag;
}
function ox(t) {
  return !!(t && typeof t == "object" && t.type === ks.number);
}
function em(t) {
  return !!(t && typeof t == "object" && t.type === ks.dateTime);
}
var ax = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, _k = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Ck(t) {
  var e = {};
  return t.replace(_k, function(r) {
    var n = r.length;
    switch (r[0]) {
      case "G":
        e.era = n === 4 ? "long" : n === 5 ? "narrow" : "short";
        break;
      case "y":
        e.year = n === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        e.month = ["numeric", "2-digit", "short", "long", "narrow"][n - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        e.day = ["numeric", "2-digit"][n - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        e.weekday = n === 4 ? "short" : n === 5 ? "narrow" : "short";
        break;
      case "e":
        if (n < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][n - 4];
        break;
      case "c":
        if (n < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][n - 4];
        break;
      case "a":
        e.hour12 = !0;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "H":
        e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "K":
        e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "k":
        e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][n - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        e.minute = ["numeric", "2-digit"][n - 1];
        break;
      case "s":
        e.second = ["numeric", "2-digit"][n - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        e.timeZoneName = n < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), e;
}
var Tk = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Nk(t) {
  if (t.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var e = t.split(Tk).filter(function(d) {
    return d.length > 0;
  }), r = [], n = 0, i = e; n < i.length; n++) {
    var o = i[n], a = o.split("/");
    if (a.length === 0)
      throw new Error("Invalid number skeleton");
    for (var s = a[0], l = a.slice(1), u = 0, c = l; u < c.length; u++) {
      var f = c[u];
      if (f.length === 0)
        throw new Error("Invalid number skeleton");
    }
    r.push({ stem: s, options: l });
  }
  return r;
}
function Dk(t) {
  return t.replace(/^(.*?)-/, "");
}
var Vy = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, sx = /^(@+)?(\+|#+)?[rs]?$/g, kk = /(\*)(0+)|(#+)(0+)|(0+)/g, lx = /^(0+)$/;
function qy(t) {
  var e = {};
  return t[t.length - 1] === "r" ? e.roundingPriority = "morePrecision" : t[t.length - 1] === "s" && (e.roundingPriority = "lessPrecision"), t.replace(sx, function(r, n, i) {
    return typeof i != "string" ? (e.minimumSignificantDigits = n.length, e.maximumSignificantDigits = n.length) : i === "+" ? e.minimumSignificantDigits = n.length : n[0] === "#" ? e.maximumSignificantDigits = n.length : (e.minimumSignificantDigits = n.length, e.maximumSignificantDigits = n.length + (typeof i == "string" ? i.length : 0)), "";
  }), e;
}
function ux(t) {
  switch (t) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function Ok(t) {
  var e;
  if (t[0] === "E" && t[1] === "E" ? (e = {
    notation: "engineering"
  }, t = t.slice(2)) : t[0] === "E" && (e = {
    notation: "scientific"
  }, t = t.slice(1)), e) {
    var r = t.slice(0, 2);
    if (r === "+!" ? (e.signDisplay = "always", t = t.slice(2)) : r === "+?" && (e.signDisplay = "exceptZero", t = t.slice(2)), !lx.test(t))
      throw new Error("Malformed concise eng/scientific notation");
    e.minimumIntegerDigits = t.length;
  }
  return e;
}
function Gy(t) {
  var e = {}, r = ux(t);
  return r || e;
}
function Ak(t) {
  for (var e = {}, r = 0, n = t; r < n.length; r++) {
    var i = n[r];
    switch (i.stem) {
      case "percent":
      case "%":
        e.style = "percent";
        continue;
      case "%x100":
        e.style = "percent", e.scale = 100;
        continue;
      case "currency":
        e.style = "currency", e.currency = i.options[0];
        continue;
      case "group-off":
      case ",_":
        e.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        e.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        e.style = "unit", e.unit = Dk(i.options[0]);
        continue;
      case "compact-short":
      case "K":
        e.notation = "compact", e.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        e.notation = "compact", e.compactDisplay = "long";
        continue;
      case "scientific":
        e = O(O(O({}, e), { notation: "scientific" }), i.options.reduce(function(l, u) {
          return O(O({}, l), Gy(u));
        }, {}));
        continue;
      case "engineering":
        e = O(O(O({}, e), { notation: "engineering" }), i.options.reduce(function(l, u) {
          return O(O({}, l), Gy(u));
        }, {}));
        continue;
      case "notation-simple":
        e.notation = "standard";
        continue;
      case "unit-width-narrow":
        e.currencyDisplay = "narrowSymbol", e.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        e.currencyDisplay = "code", e.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        e.currencyDisplay = "name", e.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        e.currencyDisplay = "symbol";
        continue;
      case "scale":
        e.scale = parseFloat(i.options[0]);
        continue;
      case "integer-width":
        if (i.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        i.options[0].replace(kk, function(l, u, c, f, d, h) {
          if (u)
            e.minimumIntegerDigits = c.length;
          else {
            if (f && d)
              throw new Error("We currently do not support maximum integer digits");
            if (h)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (lx.test(i.stem)) {
      e.minimumIntegerDigits = i.stem.length;
      continue;
    }
    if (Vy.test(i.stem)) {
      if (i.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      i.stem.replace(Vy, function(l, u, c, f, d, h) {
        return c === "*" ? e.minimumFractionDigits = u.length : f && f[0] === "#" ? e.maximumFractionDigits = f.length : d && h ? (e.minimumFractionDigits = d.length, e.maximumFractionDigits = d.length + h.length) : (e.minimumFractionDigits = u.length, e.maximumFractionDigits = u.length), "";
      });
      var o = i.options[0];
      o === "w" ? e = O(O({}, e), { trailingZeroDisplay: "stripIfInteger" }) : o && (e = O(O({}, e), qy(o)));
      continue;
    }
    if (sx.test(i.stem)) {
      e = O(O({}, e), qy(i.stem));
      continue;
    }
    var a = ux(i.stem);
    a && (e = O(O({}, e), a));
    var s = Ok(i.stem);
    s && (e = O(O({}, e), s));
  }
  return e;
}
var X0 = {
  AX: [
    "H"
  ],
  BQ: [
    "H"
  ],
  CP: [
    "H"
  ],
  CZ: [
    "H"
  ],
  DK: [
    "H"
  ],
  FI: [
    "H"
  ],
  ID: [
    "H"
  ],
  IS: [
    "H"
  ],
  ML: [
    "H"
  ],
  NE: [
    "H"
  ],
  RU: [
    "H"
  ],
  SE: [
    "H"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  AS: [
    "h",
    "H"
  ],
  BT: [
    "h",
    "H"
  ],
  DJ: [
    "h",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  GH: [
    "h",
    "H"
  ],
  IN: [
    "h",
    "H"
  ],
  LS: [
    "h",
    "H"
  ],
  PG: [
    "h",
    "H"
  ],
  PW: [
    "h",
    "H"
  ],
  SO: [
    "h",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  VU: [
    "h",
    "H"
  ],
  WS: [
    "h",
    "H"
  ],
  "001": [
    "H",
    "h"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  AR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CL: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CR: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  CU: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BO": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-EC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-PE": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  GT: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  HN: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MX: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  NI: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  PY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  SV: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  UY: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  JP: [
    "H",
    "h",
    "K"
  ],
  AD: [
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AT: [
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BR: [
    "H",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CI: [
    "H",
    "hB"
  ],
  CV: [
    "H",
    "hB"
  ],
  DE: [
    "H",
    "hB"
  ],
  EE: [
    "H",
    "hB"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GF: [
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  HR: [
    "H",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IT: [
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  MF: [
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NC: [
    "H",
    "hB"
  ],
  NL: [
    "H",
    "hB"
  ],
  PM: [
    "H",
    "hB"
  ],
  PT: [
    "H",
    "hB"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SR: [
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TR: [
    "H",
    "hB"
  ],
  WF: [
    "H",
    "hB"
  ],
  YT: [
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BO: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  EC: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  PE: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CD: [
    "hB",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ]
};
function Mk(t, e) {
  for (var r = "", n = 0; n < t.length; n++) {
    var i = t.charAt(n);
    if (i === "j") {
      for (var o = 0; n + 1 < t.length && t.charAt(n + 1) === i; )
        o++, n++;
      var a = 1 + (o & 1), s = o < 2 ? 1 : 3 + (o >> 1), l = "a", u = Rk(e);
      for ((u == "H" || u == "k") && (s = 0); s-- > 0; )
        r += l;
      for (; a-- > 0; )
        r = u + r;
    } else
      i === "J" ? r += "H" : r += i;
  }
  return r;
}
function Rk(t) {
  var e = t.hourCycle;
  if (e === void 0 && t.hourCycles && t.hourCycles.length && (e = t.hourCycles[0]), e)
    switch (e) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var r = t.language, n;
  r !== "root" && (n = t.maximize().region);
  var i = X0[n || ""] || X0[r || ""] || X0["".concat(r, "-001")] || X0["001"];
  return i[0];
}
var t1, Lk = new RegExp("^".concat(ax.source, "*")), Ik = new RegExp("".concat(ax.source, "*$"));
function Me(t, e) {
  return { start: t, end: e };
}
var Pk = !!String.prototype.startsWith, $k = !!String.fromCodePoint, Fk = !!Object.fromEntries, Bk = !!String.prototype.codePointAt, zk = !!String.prototype.trimStart, Hk = !!String.prototype.trimEnd, Uk = !!Number.isSafeInteger, jk = Uk ? Number.isSafeInteger : function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
}, tm = !0;
try {
  var Vk = fx("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  tm = ((t1 = Vk.exec("a")) === null || t1 === void 0 ? void 0 : t1[0]) === "a";
} catch {
  tm = !1;
}
var Wy = Pk ? function(e, r, n) {
  return e.startsWith(r, n);
} : function(e, r, n) {
  return e.slice(n, n + r.length) === r;
}, rm = $k ? String.fromCodePoint : function() {
  for (var e = [], r = 0; r < arguments.length; r++)
    e[r] = arguments[r];
  for (var n = "", i = e.length, o = 0, a; i > o; ) {
    if (a = e[o++], a > 1114111)
      throw RangeError(a + " is not a valid code point");
    n += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(((a -= 65536) >> 10) + 55296, a % 1024 + 56320);
  }
  return n;
}, Qy = Fk ? Object.fromEntries : function(e) {
  for (var r = {}, n = 0, i = e; n < i.length; n++) {
    var o = i[n], a = o[0], s = o[1];
    r[a] = s;
  }
  return r;
}, cx = Bk ? function(e, r) {
  return e.codePointAt(r);
} : function(e, r) {
  var n = e.length;
  if (!(r < 0 || r >= n)) {
    var i = e.charCodeAt(r), o;
    return i < 55296 || i > 56319 || r + 1 === n || (o = e.charCodeAt(r + 1)) < 56320 || o > 57343 ? i : (i - 55296 << 10) + (o - 56320) + 65536;
  }
}, qk = zk ? function(e) {
  return e.trimStart();
} : function(e) {
  return e.replace(Lk, "");
}, Gk = Hk ? function(e) {
  return e.trimEnd();
} : function(e) {
  return e.replace(Ik, "");
};
function fx(t, e) {
  return new RegExp(t, e);
}
var nm;
if (tm) {
  var Ky = fx("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  nm = function(e, r) {
    var n;
    Ky.lastIndex = r;
    var i = Ky.exec(e);
    return (n = i[1]) !== null && n !== void 0 ? n : "";
  };
} else
  nm = function(e, r) {
    for (var n = []; ; ) {
      var i = cx(e, r);
      if (i === void 0 || dx(i) || Yk(i))
        break;
      n.push(i), r += i >= 65536 ? 2 : 1;
    }
    return rm.apply(void 0, n);
  };
var Wk = function() {
  function t(e, r) {
    r === void 0 && (r = {}), this.message = e, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!r.ignoreTag, this.locale = r.locale, this.requiresOtherClause = !!r.requiresOtherClause, this.shouldParseSkeletons = !!r.shouldParseSkeletons;
  }
  return t.prototype.parse = function() {
    if (this.offset() !== 0)
      throw Error("parser can only be used once");
    return this.parseMessage(0, "", !1);
  }, t.prototype.parseMessage = function(e, r, n) {
    for (var i = []; !this.isEOF(); ) {
      var o = this.char();
      if (o === 123) {
        var a = this.parseArgument(e, n);
        if (a.err)
          return a;
        i.push(a.val);
      } else {
        if (o === 125 && e > 0)
          break;
        if (o === 35 && (r === "plural" || r === "selectordinal")) {
          var s = this.clonePosition();
          this.bump(), i.push({
            type: et.pound,
            location: Me(s, this.clonePosition())
          });
        } else if (o === 60 && !this.ignoreTag && this.peek() === 47) {
          if (n)
            break;
          return this.error(ke.UNMATCHED_CLOSING_TAG, Me(this.clonePosition(), this.clonePosition()));
        } else if (o === 60 && !this.ignoreTag && im(this.peek() || 0)) {
          var a = this.parseTag(e, r);
          if (a.err)
            return a;
          i.push(a.val);
        } else {
          var a = this.parseLiteral(e, r);
          if (a.err)
            return a;
          i.push(a.val);
        }
      }
    }
    return { val: i, err: null };
  }, t.prototype.parseTag = function(e, r) {
    var n = this.clonePosition();
    this.bump();
    var i = this.parseTagName();
    if (this.bumpSpace(), this.bumpIf("/>"))
      return {
        val: {
          type: et.literal,
          value: "<".concat(i, "/>"),
          location: Me(n, this.clonePosition())
        },
        err: null
      };
    if (this.bumpIf(">")) {
      var o = this.parseMessage(e + 1, r, !0);
      if (o.err)
        return o;
      var a = o.val, s = this.clonePosition();
      if (this.bumpIf("</")) {
        if (this.isEOF() || !im(this.char()))
          return this.error(ke.INVALID_TAG, Me(s, this.clonePosition()));
        var l = this.clonePosition(), u = this.parseTagName();
        return i !== u ? this.error(ke.UNMATCHED_CLOSING_TAG, Me(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
          val: {
            type: et.tag,
            value: i,
            children: a,
            location: Me(n, this.clonePosition())
          },
          err: null
        } : this.error(ke.INVALID_TAG, Me(s, this.clonePosition())));
      } else
        return this.error(ke.UNCLOSED_TAG, Me(n, this.clonePosition()));
    } else
      return this.error(ke.INVALID_TAG, Me(n, this.clonePosition()));
  }, t.prototype.parseTagName = function() {
    var e = this.offset();
    for (this.bump(); !this.isEOF() && Kk(this.char()); )
      this.bump();
    return this.message.slice(e, this.offset());
  }, t.prototype.parseLiteral = function(e, r) {
    for (var n = this.clonePosition(), i = ""; ; ) {
      var o = this.tryParseQuote(r);
      if (o) {
        i += o;
        continue;
      }
      var a = this.tryParseUnquoted(e, r);
      if (a) {
        i += a;
        continue;
      }
      var s = this.tryParseLeftAngleBracket();
      if (s) {
        i += s;
        continue;
      }
      break;
    }
    var l = Me(n, this.clonePosition());
    return {
      val: { type: et.literal, value: i, location: l },
      err: null
    };
  }, t.prototype.tryParseLeftAngleBracket = function() {
    return !this.isEOF() && this.char() === 60 && (this.ignoreTag || !Qk(this.peek() || 0)) ? (this.bump(), "<") : null;
  }, t.prototype.tryParseQuote = function(e) {
    if (this.isEOF() || this.char() !== 39)
      return null;
    switch (this.peek()) {
      case 39:
        return this.bump(), this.bump(), "'";
      case 123:
      case 60:
      case 62:
      case 125:
        break;
      case 35:
        if (e === "plural" || e === "selectordinal")
          break;
        return null;
      default:
        return null;
    }
    this.bump();
    var r = [this.char()];
    for (this.bump(); !this.isEOF(); ) {
      var n = this.char();
      if (n === 39)
        if (this.peek() === 39)
          r.push(39), this.bump();
        else {
          this.bump();
          break;
        }
      else
        r.push(n);
      this.bump();
    }
    return rm.apply(void 0, r);
  }, t.prototype.tryParseUnquoted = function(e, r) {
    if (this.isEOF())
      return null;
    var n = this.char();
    return n === 60 || n === 123 || n === 35 && (r === "plural" || r === "selectordinal") || n === 125 && e > 0 ? null : (this.bump(), rm(n));
  }, t.prototype.parseArgument = function(e, r) {
    var n = this.clonePosition();
    if (this.bump(), this.bumpSpace(), this.isEOF())
      return this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE, Me(n, this.clonePosition()));
    if (this.char() === 125)
      return this.bump(), this.error(ke.EMPTY_ARGUMENT, Me(n, this.clonePosition()));
    var i = this.parseIdentifierIfPossible().value;
    if (!i)
      return this.error(ke.MALFORMED_ARGUMENT, Me(n, this.clonePosition()));
    if (this.bumpSpace(), this.isEOF())
      return this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE, Me(n, this.clonePosition()));
    switch (this.char()) {
      case 125:
        return this.bump(), {
          val: {
            type: et.argument,
            value: i,
            location: Me(n, this.clonePosition())
          },
          err: null
        };
      case 44:
        return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE, Me(n, this.clonePosition())) : this.parseArgumentOptions(e, r, i, n);
      default:
        return this.error(ke.MALFORMED_ARGUMENT, Me(n, this.clonePosition()));
    }
  }, t.prototype.parseIdentifierIfPossible = function() {
    var e = this.clonePosition(), r = this.offset(), n = nm(this.message, r), i = r + n.length;
    this.bumpTo(i);
    var o = this.clonePosition(), a = Me(e, o);
    return { value: n, location: a };
  }, t.prototype.parseArgumentOptions = function(e, r, n, i) {
    var o, a = this.clonePosition(), s = this.parseIdentifierIfPossible().value, l = this.clonePosition();
    switch (s) {
      case "":
        return this.error(ke.EXPECT_ARGUMENT_TYPE, Me(a, l));
      case "number":
      case "date":
      case "time": {
        this.bumpSpace();
        var u = null;
        if (this.bumpIf(",")) {
          this.bumpSpace();
          var c = this.clonePosition(), f = this.parseSimpleArgStyleIfPossible();
          if (f.err)
            return f;
          var d = Gk(f.val);
          if (d.length === 0)
            return this.error(ke.EXPECT_ARGUMENT_STYLE, Me(this.clonePosition(), this.clonePosition()));
          var h = Me(c, this.clonePosition());
          u = { style: d, styleLocation: h };
        }
        var m = this.tryParseArgumentClose(i);
        if (m.err)
          return m;
        var g = Me(i, this.clonePosition());
        if (u && Wy(u == null ? void 0 : u.style, "::", 0)) {
          var S = qk(u.style.slice(2));
          if (s === "number") {
            var f = this.parseNumberSkeletonFromString(S, u.styleLocation);
            return f.err ? f : {
              val: { type: et.number, value: n, location: g, style: f.val },
              err: null
            };
          } else {
            if (S.length === 0)
              return this.error(ke.EXPECT_DATE_TIME_SKELETON, g);
            var b = S;
            this.locale && (b = Mk(S, this.locale));
            var d = {
              type: ks.dateTime,
              pattern: b,
              location: u.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? Ck(b) : {}
            }, x = s === "date" ? et.date : et.time;
            return {
              val: { type: x, value: n, location: g, style: d },
              err: null
            };
          }
        }
        return {
          val: {
            type: s === "number" ? et.number : s === "date" ? et.date : et.time,
            value: n,
            location: g,
            style: (o = u == null ? void 0 : u.style) !== null && o !== void 0 ? o : null
          },
          err: null
        };
      }
      case "plural":
      case "selectordinal":
      case "select": {
        var v = this.clonePosition();
        if (this.bumpSpace(), !this.bumpIf(","))
          return this.error(ke.EXPECT_SELECT_ARGUMENT_OPTIONS, Me(v, O({}, v)));
        this.bumpSpace();
        var w = this.parseIdentifierIfPossible(), _ = 0;
        if (s !== "select" && w.value === "offset") {
          if (!this.bumpIf(":"))
            return this.error(ke.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Me(this.clonePosition(), this.clonePosition()));
          this.bumpSpace();
          var f = this.tryParseDecimalInteger(ke.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ke.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
          if (f.err)
            return f;
          this.bumpSpace(), w = this.parseIdentifierIfPossible(), _ = f.val;
        }
        var T = this.tryParsePluralOrSelectOptions(e, s, r, w);
        if (T.err)
          return T;
        var m = this.tryParseArgumentClose(i);
        if (m.err)
          return m;
        var N = Me(i, this.clonePosition());
        return s === "select" ? {
          val: {
            type: et.select,
            value: n,
            options: Qy(T.val),
            location: N
          },
          err: null
        } : {
          val: {
            type: et.plural,
            value: n,
            options: Qy(T.val),
            offset: _,
            pluralType: s === "plural" ? "cardinal" : "ordinal",
            location: N
          },
          err: null
        };
      }
      default:
        return this.error(ke.INVALID_ARGUMENT_TYPE, Me(a, l));
    }
  }, t.prototype.tryParseArgumentClose = function(e) {
    return this.isEOF() || this.char() !== 125 ? this.error(ke.EXPECT_ARGUMENT_CLOSING_BRACE, Me(e, this.clonePosition())) : (this.bump(), { val: !0, err: null });
  }, t.prototype.parseSimpleArgStyleIfPossible = function() {
    for (var e = 0, r = this.clonePosition(); !this.isEOF(); ) {
      var n = this.char();
      switch (n) {
        case 39: {
          this.bump();
          var i = this.clonePosition();
          if (!this.bumpUntil("'"))
            return this.error(ke.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, Me(i, this.clonePosition()));
          this.bump();
          break;
        }
        case 123: {
          e += 1, this.bump();
          break;
        }
        case 125: {
          if (e > 0)
            e -= 1;
          else
            return {
              val: this.message.slice(r.offset, this.offset()),
              err: null
            };
          break;
        }
        default:
          this.bump();
          break;
      }
    }
    return {
      val: this.message.slice(r.offset, this.offset()),
      err: null
    };
  }, t.prototype.parseNumberSkeletonFromString = function(e, r) {
    var n = [];
    try {
      n = Nk(e);
    } catch {
      return this.error(ke.INVALID_NUMBER_SKELETON, r);
    }
    return {
      val: {
        type: ks.number,
        tokens: n,
        location: r,
        parsedOptions: this.shouldParseSkeletons ? Ak(n) : {}
      },
      err: null
    };
  }, t.prototype.tryParsePluralOrSelectOptions = function(e, r, n, i) {
    for (var o, a = !1, s = [], l = /* @__PURE__ */ new Set(), u = i.value, c = i.location; ; ) {
      if (u.length === 0) {
        var f = this.clonePosition();
        if (r !== "select" && this.bumpIf("=")) {
          var d = this.tryParseDecimalInteger(ke.EXPECT_PLURAL_ARGUMENT_SELECTOR, ke.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (d.err)
            return d;
          c = Me(f, this.clonePosition()), u = this.message.slice(f.offset, this.offset());
        } else
          break;
      }
      if (l.has(u))
        return this.error(r === "select" ? ke.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ke.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
      u === "other" && (a = !0), this.bumpSpace();
      var h = this.clonePosition();
      if (!this.bumpIf("{"))
        return this.error(r === "select" ? ke.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ke.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, Me(this.clonePosition(), this.clonePosition()));
      var m = this.parseMessage(e + 1, r, n);
      if (m.err)
        return m;
      var g = this.tryParseArgumentClose(h);
      if (g.err)
        return g;
      s.push([
        u,
        {
          value: m.val,
          location: Me(h, this.clonePosition())
        }
      ]), l.add(u), this.bumpSpace(), o = this.parseIdentifierIfPossible(), u = o.value, c = o.location;
    }
    return s.length === 0 ? this.error(r === "select" ? ke.EXPECT_SELECT_ARGUMENT_SELECTOR : ke.EXPECT_PLURAL_ARGUMENT_SELECTOR, Me(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !a ? this.error(ke.MISSING_OTHER_CLAUSE, Me(this.clonePosition(), this.clonePosition())) : { val: s, err: null };
  }, t.prototype.tryParseDecimalInteger = function(e, r) {
    var n = 1, i = this.clonePosition();
    this.bumpIf("+") || this.bumpIf("-") && (n = -1);
    for (var o = !1, a = 0; !this.isEOF(); ) {
      var s = this.char();
      if (s >= 48 && s <= 57)
        o = !0, a = a * 10 + (s - 48), this.bump();
      else
        break;
    }
    var l = Me(i, this.clonePosition());
    return o ? (a *= n, jk(a) ? { val: a, err: null } : this.error(r, l)) : this.error(e, l);
  }, t.prototype.offset = function() {
    return this.position.offset;
  }, t.prototype.isEOF = function() {
    return this.offset() === this.message.length;
  }, t.prototype.clonePosition = function() {
    return {
      offset: this.position.offset,
      line: this.position.line,
      column: this.position.column
    };
  }, t.prototype.char = function() {
    var e = this.position.offset;
    if (e >= this.message.length)
      throw Error("out of bound");
    var r = cx(this.message, e);
    if (r === void 0)
      throw Error("Offset ".concat(e, " is at invalid UTF-16 code unit boundary"));
    return r;
  }, t.prototype.error = function(e, r) {
    return {
      val: null,
      err: {
        kind: e,
        message: this.message,
        location: r
      }
    };
  }, t.prototype.bump = function() {
    if (!this.isEOF()) {
      var e = this.char();
      e === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
    }
  }, t.prototype.bumpIf = function(e) {
    if (Wy(this.message, e, this.offset())) {
      for (var r = 0; r < e.length; r++)
        this.bump();
      return !0;
    }
    return !1;
  }, t.prototype.bumpUntil = function(e) {
    var r = this.offset(), n = this.message.indexOf(e, r);
    return n >= 0 ? (this.bumpTo(n), !0) : (this.bumpTo(this.message.length), !1);
  }, t.prototype.bumpTo = function(e) {
    if (this.offset() > e)
      throw Error("targetOffset ".concat(e, " must be greater than or equal to the current offset ").concat(this.offset()));
    for (e = Math.min(e, this.message.length); ; ) {
      var r = this.offset();
      if (r === e)
        break;
      if (r > e)
        throw Error("targetOffset ".concat(e, " is at invalid UTF-16 code unit boundary"));
      if (this.bump(), this.isEOF())
        break;
    }
  }, t.prototype.bumpSpace = function() {
    for (; !this.isEOF() && dx(this.char()); )
      this.bump();
  }, t.prototype.peek = function() {
    if (this.isEOF())
      return null;
    var e = this.char(), r = this.offset(), n = this.message.charCodeAt(r + (e >= 65536 ? 2 : 1));
    return n != null ? n : null;
  }, t;
}();
function im(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Qk(t) {
  return im(t) || t === 47;
}
function Kk(t) {
  return t === 45 || t === 46 || t >= 48 && t <= 57 || t === 95 || t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 183 || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
}
function dx(t) {
  return t >= 9 && t <= 13 || t === 32 || t === 133 || t >= 8206 && t <= 8207 || t === 8232 || t === 8233;
}
function Yk(t) {
  return t >= 33 && t <= 35 || t === 36 || t >= 37 && t <= 39 || t === 40 || t === 41 || t === 42 || t === 43 || t === 44 || t === 45 || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || t === 91 || t === 92 || t === 93 || t === 94 || t === 96 || t === 123 || t === 124 || t === 125 || t === 126 || t === 161 || t >= 162 && t <= 165 || t === 166 || t === 167 || t === 169 || t === 171 || t === 172 || t === 174 || t === 176 || t === 177 || t === 182 || t === 187 || t === 191 || t === 215 || t === 247 || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || t === 8216 || t === 8217 || t === 8218 || t >= 8219 && t <= 8220 || t === 8221 || t === 8222 || t === 8223 || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || t === 8249 || t === 8250 || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || t === 8260 || t === 8261 || t === 8262 || t >= 8263 && t <= 8273 || t === 8274 || t === 8275 || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || t === 8608 || t >= 8609 && t <= 8610 || t === 8611 || t >= 8612 && t <= 8613 || t === 8614 || t >= 8615 && t <= 8621 || t === 8622 || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || t === 8658 || t === 8659 || t === 8660 || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || t === 8968 || t === 8969 || t === 8970 || t === 8971 || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || t === 9001 || t === 9002 || t >= 9003 && t <= 9083 || t === 9084 || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || t === 9655 || t >= 9656 && t <= 9664 || t === 9665 || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || t === 9839 || t >= 9840 && t <= 10087 || t === 10088 || t === 10089 || t === 10090 || t === 10091 || t === 10092 || t === 10093 || t === 10094 || t === 10095 || t === 10096 || t === 10097 || t === 10098 || t === 10099 || t === 10100 || t === 10101 || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || t === 10181 || t === 10182 || t >= 10183 && t <= 10213 || t === 10214 || t === 10215 || t === 10216 || t === 10217 || t === 10218 || t === 10219 || t === 10220 || t === 10221 || t === 10222 || t === 10223 || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || t === 10627 || t === 10628 || t === 10629 || t === 10630 || t === 10631 || t === 10632 || t === 10633 || t === 10634 || t === 10635 || t === 10636 || t === 10637 || t === 10638 || t === 10639 || t === 10640 || t === 10641 || t === 10642 || t === 10643 || t === 10644 || t === 10645 || t === 10646 || t === 10647 || t === 10648 || t >= 10649 && t <= 10711 || t === 10712 || t === 10713 || t === 10714 || t === 10715 || t >= 10716 && t <= 10747 || t === 10748 || t === 10749 || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || t === 11158 || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || t === 11778 || t === 11779 || t === 11780 || t === 11781 || t >= 11782 && t <= 11784 || t === 11785 || t === 11786 || t === 11787 || t === 11788 || t === 11789 || t >= 11790 && t <= 11798 || t === 11799 || t >= 11800 && t <= 11801 || t === 11802 || t === 11803 || t === 11804 || t === 11805 || t >= 11806 && t <= 11807 || t === 11808 || t === 11809 || t === 11810 || t === 11811 || t === 11812 || t === 11813 || t === 11814 || t === 11815 || t === 11816 || t === 11817 || t >= 11818 && t <= 11822 || t === 11823 || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || t === 11840 || t === 11841 || t === 11842 || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || t === 11858 || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || t === 12296 || t === 12297 || t === 12298 || t === 12299 || t === 12300 || t === 12301 || t === 12302 || t === 12303 || t === 12304 || t === 12305 || t >= 12306 && t <= 12307 || t === 12308 || t === 12309 || t === 12310 || t === 12311 || t === 12312 || t === 12313 || t === 12314 || t === 12315 || t === 12316 || t === 12317 || t >= 12318 && t <= 12319 || t === 12320 || t === 12336 || t === 64830 || t === 64831 || t >= 65093 && t <= 65094;
}
function om(t) {
  t.forEach(function(e) {
    if (delete e.location, rx(e) || nx(e))
      for (var r in e.options)
        delete e.options[r].location, om(e.options[r].value);
    else
      J9(e) && ox(e.style) || (ex(e) || tx(e)) && em(e.style) ? delete e.style.location : ix(e) && om(e.children);
  });
}
function Xk(t, e) {
  e === void 0 && (e = {}), e = O({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, e);
  var r = new Wk(t, e).parse();
  if (r.err) {
    var n = SyntaxError(ke[r.err.kind]);
    throw n.location = r.err.location, n.originalMessage = r.err.message, n;
  }
  return e != null && e.captureLocation || om(r.val), r.val;
}
function Un(t, e) {
  var r = e && e.cache ? e.cache : nO, n = e && e.serializer ? e.serializer : rO, i = e && e.strategy ? e.strategy : Jk;
  return i(t, {
    cache: r,
    serializer: n
  });
}
function Zk(t) {
  return t == null || typeof t == "number" || typeof t == "boolean";
}
function hx(t, e, r, n) {
  var i = Zk(n) ? n : r(n), o = e.get(i);
  return typeof o > "u" && (o = t.call(this, n), e.set(i, o)), o;
}
function px(t, e, r) {
  var n = Array.prototype.slice.call(arguments, 3), i = r(n), o = e.get(i);
  return typeof o > "u" && (o = t.apply(this, n), e.set(i, o)), o;
}
function gv(t, e, r, n, i) {
  return r.bind(e, t, n, i);
}
function Jk(t, e) {
  var r = t.length === 1 ? hx : px;
  return gv(t, this, r, e.cache.create(), e.serializer);
}
function eO(t, e) {
  return gv(t, this, px, e.cache.create(), e.serializer);
}
function tO(t, e) {
  return gv(t, this, hx, e.cache.create(), e.serializer);
}
var rO = function() {
  return JSON.stringify(arguments);
};
function vv() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
vv.prototype.get = function(t) {
  return this.cache[t];
};
vv.prototype.set = function(t, e) {
  this.cache[t] = e;
};
var nO = {
  create: function() {
    return new vv();
  }
}, jn = {
  variadic: eO,
  monadic: tO
}, ei;
(function(t) {
  t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
})(ei || (ei = {}));
var Ro = function(t) {
  rt(e, t);
  function e(r, n, i) {
    var o = t.call(this, r) || this;
    return o.code = n, o.originalMessage = i, o;
  }
  return e.prototype.toString = function() {
    return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
  }, e;
}(Error), Yy = function(t) {
  rt(e, t);
  function e(r, n, i, o) {
    return t.call(this, 'Invalid values for "'.concat(r, '": "').concat(n, '". Options are "').concat(Object.keys(i).join('", "'), '"'), ei.INVALID_VALUE, o) || this;
  }
  return e;
}(Ro), iO = function(t) {
  rt(e, t);
  function e(r, n, i) {
    return t.call(this, 'Value for "'.concat(r, '" must be of type ').concat(n), ei.INVALID_VALUE, i) || this;
  }
  return e;
}(Ro), oO = function(t) {
  rt(e, t);
  function e(r, n) {
    return t.call(this, 'The intl string context variable "'.concat(r, '" was not provided to the string "').concat(n, '"'), ei.MISSING_VALUE, n) || this;
  }
  return e;
}(Ro), mr;
(function(t) {
  t[t.literal = 0] = "literal", t[t.object = 1] = "object";
})(mr || (mr = {}));
function aO(t) {
  return t.length < 2 ? t : t.reduce(function(e, r) {
    var n = e[e.length - 1];
    return !n || n.type !== mr.literal || r.type !== mr.literal ? e.push(r) : n.value += r.value, e;
  }, []);
}
function mx(t) {
  return typeof t == "function";
}
function Pc(t, e, r, n, i, o, a) {
  if (t.length === 1 && jy(t[0]))
    return [
      {
        type: mr.literal,
        value: t[0].value
      }
    ];
  for (var s = [], l = 0, u = t; l < u.length; l++) {
    var c = u[l];
    if (jy(c)) {
      s.push({
        type: mr.literal,
        value: c.value
      });
      continue;
    }
    if (Sk(c)) {
      typeof o == "number" && s.push({
        type: mr.literal,
        value: r.getNumberFormat(e).format(o)
      });
      continue;
    }
    var f = c.value;
    if (!(i && f in i))
      throw new oO(f, a);
    var d = i[f];
    if (Ek(c)) {
      (!d || typeof d == "string" || typeof d == "number") && (d = typeof d == "string" || typeof d == "number" ? String(d) : ""), s.push({
        type: typeof d == "string" ? mr.literal : mr.object,
        value: d
      });
      continue;
    }
    if (ex(c)) {
      var h = typeof c.style == "string" ? n.date[c.style] : em(c.style) ? c.style.parsedOptions : void 0;
      s.push({
        type: mr.literal,
        value: r.getDateTimeFormat(e, h).format(d)
      });
      continue;
    }
    if (tx(c)) {
      var h = typeof c.style == "string" ? n.time[c.style] : em(c.style) ? c.style.parsedOptions : n.time.medium;
      s.push({
        type: mr.literal,
        value: r.getDateTimeFormat(e, h).format(d)
      });
      continue;
    }
    if (J9(c)) {
      var h = typeof c.style == "string" ? n.number[c.style] : ox(c.style) ? c.style.parsedOptions : void 0;
      h && h.scale && (d = d * (h.scale || 1)), s.push({
        type: mr.literal,
        value: r.getNumberFormat(e, h).format(d)
      });
      continue;
    }
    if (ix(c)) {
      var m = c.children, g = c.value, S = i[g];
      if (!mx(S))
        throw new iO(g, "function", a);
      var b = Pc(m, e, r, n, i, o), x = S(b.map(function(_) {
        return _.value;
      }));
      Array.isArray(x) || (x = [x]), s.push.apply(s, x.map(function(_) {
        return {
          type: typeof _ == "string" ? mr.literal : mr.object,
          value: _
        };
      }));
    }
    if (rx(c)) {
      var v = c.options[d] || c.options.other;
      if (!v)
        throw new Yy(c.value, d, Object.keys(c.options), a);
      s.push.apply(s, Pc(v.value, e, r, n, i));
      continue;
    }
    if (nx(c)) {
      var v = c.options["=".concat(d)];
      if (!v) {
        if (!Intl.PluralRules)
          throw new Ro(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, ei.MISSING_INTL_API, a);
        var w = r.getPluralRules(e, { type: c.pluralType }).select(d - (c.offset || 0));
        v = c.options[w] || c.options.other;
      }
      if (!v)
        throw new Yy(c.value, d, Object.keys(c.options), a);
      s.push.apply(s, Pc(v.value, e, r, n, i, d - (c.offset || 0)));
      continue;
    }
  }
  return aO(s);
}
function sO(t, e) {
  return e ? O(O(O({}, t || {}), e || {}), Object.keys(t).reduce(function(r, n) {
    return r[n] = O(O({}, t[n]), e[n] || {}), r;
  }, {})) : t;
}
function lO(t, e) {
  return e ? Object.keys(t).reduce(function(r, n) {
    return r[n] = sO(t[n], e[n]), r;
  }, O({}, t)) : t;
}
function r1(t) {
  return {
    create: function() {
      return {
        get: function(e) {
          return t[e];
        },
        set: function(e, r) {
          t[e] = r;
        }
      };
    }
  };
}
function uO(t) {
  return t === void 0 && (t = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: Un(function() {
      for (var e, r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return new ((e = Intl.NumberFormat).bind.apply(e, Xt([void 0], r, !1)))();
    }, {
      cache: r1(t.number),
      strategy: jn.variadic
    }),
    getDateTimeFormat: Un(function() {
      for (var e, r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return new ((e = Intl.DateTimeFormat).bind.apply(e, Xt([void 0], r, !1)))();
    }, {
      cache: r1(t.dateTime),
      strategy: jn.variadic
    }),
    getPluralRules: Un(function() {
      for (var e, r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return new ((e = Intl.PluralRules).bind.apply(e, Xt([void 0], r, !1)))();
    }, {
      cache: r1(t.pluralRules),
      strategy: jn.variadic
    })
  };
}
var gx = function() {
  function t(e, r, n, i) {
    r === void 0 && (r = t.defaultLocale);
    var o = this;
    if (this.formatterCache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    }, this.format = function(a) {
      var s = o.formatToParts(a);
      if (s.length === 1)
        return s[0].value;
      var l = s.reduce(function(u, c) {
        return !u.length || c.type !== mr.literal || typeof u[u.length - 1] != "string" ? u.push(c.value) : u[u.length - 1] += c.value, u;
      }, []);
      return l.length <= 1 ? l[0] || "" : l;
    }, this.formatToParts = function(a) {
      return Pc(o.ast, o.locales, o.formatters, o.formats, a, void 0, o.message);
    }, this.resolvedOptions = function() {
      var a;
      return {
        locale: ((a = o.resolvedLocale) === null || a === void 0 ? void 0 : a.toString()) || Intl.NumberFormat.supportedLocalesOf(o.locales)[0]
      };
    }, this.getAst = function() {
      return o.ast;
    }, this.locales = r, this.resolvedLocale = t.resolveLocale(r), typeof e == "string") {
      if (this.message = e, !t.__parse)
        throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
      this.ast = t.__parse(e, {
        ignoreTag: i == null ? void 0 : i.ignoreTag,
        locale: this.resolvedLocale
      });
    } else
      this.ast = e;
    if (!Array.isArray(this.ast))
      throw new TypeError("A message must be provided as a String or AST.");
    this.formats = lO(t.formats, n), this.formatters = i && i.formatters || uO(this.formatterCache);
  }
  return Object.defineProperty(t, "defaultLocale", {
    get: function() {
      return t.memoizedDefaultLocale || (t.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), t.memoizedDefaultLocale;
    },
    enumerable: !1,
    configurable: !0
  }), t.memoizedDefaultLocale = null, t.resolveLocale = function(e) {
    if (!(typeof Intl.Locale > "u")) {
      var r = Intl.NumberFormat.supportedLocalesOf(e);
      return r.length > 0 ? new Intl.Locale(r[0]) : new Intl.Locale(typeof e == "string" ? e : e[0]);
    }
  }, t.__parse = Xk, t.formats = {
    number: {
      integer: {
        maximumFractionDigits: 0
      },
      currency: {
        style: "currency"
      },
      percent: {
        style: "percent"
      }
    },
    date: {
      short: {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
      },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric"
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric"
      },
      full: {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    },
    time: {
      short: {
        hour: "numeric",
        minute: "numeric"
      },
      medium: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      },
      long: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      },
      full: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short"
      }
    }
  }, t;
}(), pr;
(function(t) {
  t.FORMAT_ERROR = "FORMAT_ERROR", t.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER", t.INVALID_CONFIG = "INVALID_CONFIG", t.MISSING_DATA = "MISSING_DATA", t.MISSING_TRANSLATION = "MISSING_TRANSLATION";
})(pr || (pr = {}));
var Br = function(t) {
  rt(e, t);
  function e(r, n, i) {
    var o = this, a = i ? i instanceof Error ? i : new Error(String(i)) : void 0;
    return o = t.call(this, "[@formatjs/intl Error ".concat(r, "] ").concat(n, `
`).concat(a ? `
`.concat(a.message, `
`).concat(a.stack) : "")) || this, o.code = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(o, e), o;
  }
  return e;
}(Error), cO = function(t) {
  rt(e, t);
  function e(r, n) {
    return t.call(this, pr.UNSUPPORTED_FORMATTER, r, n) || this;
  }
  return e;
}(Br), fO = function(t) {
  rt(e, t);
  function e(r, n) {
    return t.call(this, pr.INVALID_CONFIG, r, n) || this;
  }
  return e;
}(Br), Xy = function(t) {
  rt(e, t);
  function e(r, n) {
    return t.call(this, pr.MISSING_DATA, r, n) || this;
  }
  return e;
}(Br), yv = function(t) {
  rt(e, t);
  function e(r, n, i) {
    return t.call(this, pr.FORMAT_ERROR, "".concat(r, `
Locale: `).concat(n, `
`), i) || this;
  }
  return e;
}(Br), n1 = function(t) {
  rt(e, t);
  function e(r, n, i, o) {
    var a = t.call(this, "".concat(r, `
MessageID: `).concat(i == null ? void 0 : i.id, `
Default Message: `).concat(i == null ? void 0 : i.defaultMessage, `
Description: `).concat(i == null ? void 0 : i.description, `
`), n, o) || this;
    return a.descriptor = i, a;
  }
  return e;
}(yv), dO = function(t) {
  rt(e, t);
  function e(r, n) {
    var i = t.call(this, pr.MISSING_TRANSLATION, 'Missing message: "'.concat(r.id, '" for locale "').concat(n, '", using ').concat(r.defaultMessage ? "default message (".concat(typeof r.defaultMessage == "string" ? r.defaultMessage : r.defaultMessage.map(function(o) {
      var a;
      return (a = o.value) !== null && a !== void 0 ? a : JSON.stringify(o);
    }).join(), ")") : "id", " as fallback.")) || this;
    return i.descriptor = r, i;
  }
  return e;
}(Br);
function Ta(t, e, r) {
  return r === void 0 && (r = {}), e.reduce(function(n, i) {
    return i in t ? n[i] = t[i] : i in r && (n[i] = r[i]), n;
  }, {});
}
var hO = function(t) {
}, pO = function(t) {
}, vx = {
  formats: {},
  messages: {},
  timeZone: void 0,
  defaultLocale: "en",
  defaultFormats: {},
  fallbackOnEmptyString: !0,
  onError: hO,
  onWarn: pO
};
function yx() {
  return {
    dateTime: {},
    number: {},
    message: {},
    relativeTime: {},
    pluralRules: {},
    list: {},
    displayNames: {}
  };
}
function Ho(t) {
  return {
    create: function() {
      return {
        get: function(e) {
          return t[e];
        },
        set: function(e, r) {
          t[e] = r;
        }
      };
    }
  };
}
function mO(t) {
  t === void 0 && (t = yx());
  var e = Intl.RelativeTimeFormat, r = Intl.ListFormat, n = Intl.DisplayNames, i = Un(function() {
    for (var s, l = [], u = 0; u < arguments.length; u++)
      l[u] = arguments[u];
    return new ((s = Intl.DateTimeFormat).bind.apply(s, Xt([void 0], l, !1)))();
  }, {
    cache: Ho(t.dateTime),
    strategy: jn.variadic
  }), o = Un(function() {
    for (var s, l = [], u = 0; u < arguments.length; u++)
      l[u] = arguments[u];
    return new ((s = Intl.NumberFormat).bind.apply(s, Xt([void 0], l, !1)))();
  }, {
    cache: Ho(t.number),
    strategy: jn.variadic
  }), a = Un(function() {
    for (var s, l = [], u = 0; u < arguments.length; u++)
      l[u] = arguments[u];
    return new ((s = Intl.PluralRules).bind.apply(s, Xt([void 0], l, !1)))();
  }, {
    cache: Ho(t.pluralRules),
    strategy: jn.variadic
  });
  return {
    getDateTimeFormat: i,
    getNumberFormat: o,
    getMessageFormat: Un(function(s, l, u, c) {
      return new gx(s, l, u, O({ formatters: {
        getNumberFormat: o,
        getDateTimeFormat: i,
        getPluralRules: a
      } }, c || {}));
    }, {
      cache: Ho(t.message),
      strategy: jn.variadic
    }),
    getRelativeTimeFormat: Un(function() {
      for (var s = [], l = 0; l < arguments.length; l++)
        s[l] = arguments[l];
      return new (e.bind.apply(e, Xt([void 0], s, !1)))();
    }, {
      cache: Ho(t.relativeTime),
      strategy: jn.variadic
    }),
    getPluralRules: a,
    getListFormat: Un(function() {
      for (var s = [], l = 0; l < arguments.length; l++)
        s[l] = arguments[l];
      return new (r.bind.apply(r, Xt([void 0], s, !1)))();
    }, {
      cache: Ho(t.list),
      strategy: jn.variadic
    }),
    getDisplayNames: Un(function() {
      for (var s = [], l = 0; l < arguments.length; l++)
        s[l] = arguments[l];
      return new (n.bind.apply(n, Xt([void 0], s, !1)))();
    }, {
      cache: Ho(t.displayNames),
      strategy: jn.variadic
    })
  };
}
function xv(t, e, r, n) {
  var i = t && t[e], o;
  if (i && (o = i[r]), o)
    return o;
  n(new cO("No ".concat(e, " format named: ").concat(r)));
}
function Z0(t, e) {
  return Object.keys(t).reduce(function(r, n) {
    return r[n] = O({ timeZone: e }, t[n]), r;
  }, {});
}
function Zy(t, e) {
  var r = Object.keys(O(O({}, t), e));
  return r.reduce(function(n, i) {
    return n[i] = O(O({}, t[i] || {}), e[i] || {}), n;
  }, {});
}
function Jy(t, e) {
  if (!e)
    return t;
  var r = gx.formats;
  return O(O(O({}, r), t), { date: Zy(Z0(r.date, e), Z0(t.date || {}, e)), time: Zy(Z0(r.time, e), Z0(t.time || {}, e)) });
}
var am = function(t, e, r, n, i) {
  var o = t.locale, a = t.formats, s = t.messages, l = t.defaultLocale, u = t.defaultFormats, c = t.fallbackOnEmptyString, f = t.onError, d = t.timeZone, h = t.defaultRichTextElements;
  r === void 0 && (r = { id: "" });
  var m = r.id, g = r.defaultMessage;
  Z9(!!m, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
  var S = String(m), b = s && Object.prototype.hasOwnProperty.call(s, S) && s[S];
  if (Array.isArray(b) && b.length === 1 && b[0].type === et.literal)
    return b[0].value;
  if (!n && b && typeof b == "string" && !h)
    return b.replace(/'\{(.*?)\}'/gi, "{$1}");
  if (n = O(O({}, h), n || {}), a = Jy(a, d), u = Jy(u, d), !b) {
    if (c === !1 && b === "")
      return b;
    if ((!g || o && o.toLowerCase() !== l.toLowerCase()) && f(new dO(r, o)), g)
      try {
        var x = e.getMessageFormat(g, l, u, i);
        return x.format(n);
      } catch (v) {
        return f(new n1('Error formatting default message for: "'.concat(S, '", rendering default message verbatim'), o, r, v)), typeof g == "string" ? g : S;
      }
    return S;
  }
  try {
    var x = e.getMessageFormat(b, o, a, O({ formatters: e }, i || {}));
    return x.format(n);
  } catch (v) {
    f(new n1('Error formatting message: "'.concat(S, '", using ').concat(g ? "default message" : "id", " as fallback."), o, r, v));
  }
  if (g)
    try {
      var x = e.getMessageFormat(g, l, u, i);
      return x.format(n);
    } catch (v) {
      f(new n1('Error formatting the default message for: "'.concat(S, '", rendering message verbatim'), o, r, v));
    }
  return typeof b == "string" ? b : typeof g == "string" ? g : S;
}, xx = [
  "formatMatcher",
  "timeZone",
  "hour12",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "hourCycle",
  "dateStyle",
  "timeStyle",
  "calendar",
  "numberingSystem",
  "fractionalSecondDigits"
];
function Fd(t, e, r, n) {
  var i = t.locale, o = t.formats, a = t.onError, s = t.timeZone;
  n === void 0 && (n = {});
  var l = n.format, u = O(O({}, s && { timeZone: s }), l && xv(o, e, l, a)), c = Ta(n, xx, u);
  return e === "time" && !c.hour && !c.minute && !c.second && !c.timeStyle && !c.dateStyle && (c = O(O({}, c), { hour: "numeric", minute: "numeric" })), r(i, c);
}
function gO(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = r[0], o = r[1], a = o === void 0 ? {} : o, s = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return Fd(t, "date", e, a).format(s);
  } catch (l) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting date.", l));
  }
  return String(s);
}
function vO(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = r[0], o = r[1], a = o === void 0 ? {} : o, s = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return Fd(t, "time", e, a).format(s);
  } catch (l) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting time.", l));
  }
  return String(s);
}
function yO(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = r[0], o = r[1], a = r[2], s = a === void 0 ? {} : a, l = t.timeZone, u = t.locale, c = t.onError, f = Ta(s, xx, l ? { timeZone: l } : {});
  try {
    return e(u, f).formatRange(i, o);
  } catch (d) {
    c(new Br(pr.FORMAT_ERROR, "Error formatting date time range.", d));
  }
  return String(i);
}
function xO(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = r[0], o = r[1], a = o === void 0 ? {} : o, s = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return Fd(t, "date", e, a).formatToParts(s);
  } catch (l) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting date.", l));
  }
  return [];
}
function bO(t, e) {
  for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n];
  var i = r[0], o = r[1], a = o === void 0 ? {} : o, s = typeof i == "string" ? new Date(i || 0) : i;
  try {
    return Fd(t, "time", e, a).formatToParts(s);
  } catch (l) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting time.", l));
  }
  return [];
}
var wO = [
  "style",
  "type",
  "fallback"
];
function EO(t, e, r, n) {
  var i = t.locale, o = t.onError, a = Intl.DisplayNames;
  a || o(new Ro(`Intl.DisplayNames is not available in this environment.
Try polyfilling it using "@formatjs/intl-displaynames"
`, ei.MISSING_INTL_API));
  var s = Ta(n, wO);
  try {
    return e(i, s).of(r);
  } catch (l) {
    o(new Br(pr.FORMAT_ERROR, "Error formatting display name.", l));
  }
}
var SO = [
  "type",
  "style"
], e5 = Date.now();
function _O(t) {
  return "".concat(e5, "_").concat(t, "_").concat(e5);
}
function CO(t, e, r, n) {
  n === void 0 && (n = {});
  var i = bx(t, e, r, n).reduce(function(o, a) {
    var s = a.value;
    return typeof s != "string" ? o.push(s) : typeof o[o.length - 1] == "string" ? o[o.length - 1] += s : o.push(s), o;
  }, []);
  return i.length === 1 ? i[0] : i.length === 0 ? "" : i;
}
function bx(t, e, r, n) {
  var i = t.locale, o = t.onError;
  n === void 0 && (n = {});
  var a = Intl.ListFormat;
  a || o(new Ro(`Intl.ListFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-listformat"
`, ei.MISSING_INTL_API));
  var s = Ta(n, SO);
  try {
    var l = {}, u = r.map(function(c, f) {
      if (typeof c == "object") {
        var d = _O(f);
        return l[d] = c, d;
      }
      return String(c);
    });
    return e(i, s).formatToParts(u).map(function(c) {
      return c.type === "literal" ? c : O(O({}, c), { value: l[c.value] || c.value });
    });
  } catch (c) {
    o(new Br(pr.FORMAT_ERROR, "Error formatting list.", c));
  }
  return r;
}
var TO = ["type"];
function NO(t, e, r, n) {
  var i = t.locale, o = t.onError;
  n === void 0 && (n = {}), Intl.PluralRules || o(new Ro(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, ei.MISSING_INTL_API));
  var a = Ta(n, TO);
  try {
    return e(i, a).select(r);
  } catch (s) {
    o(new yv("Error formatting plural.", i, s));
  }
  return "other";
}
var DO = ["numeric", "style"];
function kO(t, e, r) {
  var n = t.locale, i = t.formats, o = t.onError;
  r === void 0 && (r = {});
  var a = r.format, s = !!a && xv(i, "relative", a, o) || {}, l = Ta(r, DO, s);
  return e(n, l);
}
function OO(t, e, r, n, i) {
  i === void 0 && (i = {}), n || (n = "second");
  var o = Intl.RelativeTimeFormat;
  o || t.onError(new Ro(`Intl.RelativeTimeFormat is not available in this environment.
Try polyfilling it using "@formatjs/intl-relativetimeformat"
`, ei.MISSING_INTL_API));
  try {
    return kO(t, e, i).format(r, n);
  } catch (a) {
    t.onError(new yv("Error formatting relative time.", t.locale, a));
  }
  return String(r);
}
var AO = [
  "style",
  "currency",
  "currencyDisplay",
  "unit",
  "unitDisplay",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "currencyDisplay",
  "currencySign",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "numberingSystem"
];
function wx(t, e, r) {
  var n = t.locale, i = t.formats, o = t.onError;
  r === void 0 && (r = {});
  var a = r.format, s = a && xv(i, "number", a, o) || {}, l = Ta(r, AO, s);
  return e(n, l);
}
function MO(t, e, r, n) {
  n === void 0 && (n = {});
  try {
    return wx(t, e, n).format(r);
  } catch (i) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting number.", i));
  }
  return String(r);
}
function RO(t, e, r, n) {
  n === void 0 && (n = {});
  try {
    return wx(t, e, n).formatToParts(r);
  } catch (i) {
    t.onError(new Br(pr.FORMAT_ERROR, "Error formatting number.", i));
  }
  return [];
}
function LO(t) {
  var e = t ? t[Object.keys(t)[0]] : void 0;
  return typeof e == "string";
}
function IO(t) {
  t.onWarn && t.defaultRichTextElements && LO(t.messages || {}) && t.onWarn(`[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. 
Please consider using "@formatjs/cli" to pre-compile your messages for performance.
For more details see https://formatjs.io/docs/getting-started/message-distribution`);
}
function PO(t, e) {
  var r = mO(e), n = O(O({}, vx), t), i = n.locale, o = n.defaultLocale, a = n.onError;
  return i ? !Intl.NumberFormat.supportedLocalesOf(i).length && a ? a(new Xy('Missing locale data for locale: "'.concat(i, '" in Intl.NumberFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : !Intl.DateTimeFormat.supportedLocalesOf(i).length && a && a(new Xy('Missing locale data for locale: "'.concat(i, '" in Intl.DateTimeFormat. Using default locale: "').concat(o, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details'))) : (a && a(new fO('"locale" was not configured, using "'.concat(o, '" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details'))), n.locale = n.defaultLocale || "en"), IO(n), O(O({}, n), {
    formatters: r,
    formatNumber: MO.bind(null, n, r.getNumberFormat),
    formatNumberToParts: RO.bind(null, n, r.getNumberFormat),
    formatRelativeTime: OO.bind(null, n, r.getRelativeTimeFormat),
    formatDate: gO.bind(null, n, r.getDateTimeFormat),
    formatDateToParts: xO.bind(null, n, r.getDateTimeFormat),
    formatTime: vO.bind(null, n, r.getDateTimeFormat),
    formatDateTimeRange: yO.bind(null, n, r.getDateTimeFormat),
    formatTimeToParts: bO.bind(null, n, r.getDateTimeFormat),
    formatPlural: NO.bind(null, n, r.getPluralRules),
    formatMessage: am.bind(null, n, r),
    $t: am.bind(null, n, r),
    formatList: CO.bind(null, n, r.getListFormat),
    formatListToParts: bx.bind(null, n, r.getListFormat),
    formatDisplayName: EO.bind(null, n, r.getDisplayNames)
  });
}
function Ex(t) {
  Z9(t, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.");
}
var Sx = O(O({}, vx), {
  textComponent: I.exports.Fragment
});
function $O(t) {
  return function(e) {
    return t(I.exports.Children.toArray(e));
  };
}
function FO(t, e) {
  if (t === e)
    return !0;
  if (!t || !e)
    return !1;
  var r = Object.keys(t), n = Object.keys(e), i = r.length;
  if (n.length !== i)
    return !1;
  for (var o = 0; o < i; o++) {
    var a = r[o];
    if (t[a] !== e[a] || !Object.prototype.hasOwnProperty.call(e, a))
      return !1;
  }
  return !0;
}
var bv = I.exports.createContext(null);
bv.Consumer;
var BO = bv.Provider, zO = BO, HO = bv;
function _x() {
  var t = I.exports.useContext(HO);
  return Ex(t), t;
}
var sm;
(function(t) {
  t.formatDate = "FormattedDate", t.formatTime = "FormattedTime", t.formatNumber = "FormattedNumber", t.formatList = "FormattedList", t.formatDisplayName = "FormattedDisplayName";
})(sm || (sm = {}));
var lm;
(function(t) {
  t.formatDate = "FormattedDateParts", t.formatTime = "FormattedTimeParts", t.formatNumber = "FormattedNumberParts", t.formatList = "FormattedListParts";
})(lm || (lm = {}));
function Cx(t) {
  var e = function(r) {
    var n = _x(), i = r.value, o = r.children, a = $r(r, ["value", "children"]), s = typeof i == "string" ? new Date(i || 0) : i, l = t === "formatDate" ? n.formatDateToParts(s, a) : n.formatTimeToParts(s, a);
    return o(l);
  };
  return e.displayName = lm[t], e;
}
function a0(t) {
  var e = function(r) {
    var n = _x(), i = r.value, o = r.children, a = $r(
      r,
      ["value", "children"]
    ), s = n[t](i, a);
    if (typeof o == "function")
      return o(s);
    var l = n.textComponent || I.exports.Fragment;
    return /* @__PURE__ */ P(l, {
      children: s
    });
  };
  return e.displayName = sm[t], e;
}
function i1(t) {
  return {
    locale: t.locale,
    timeZone: t.timeZone,
    fallbackOnEmptyString: t.fallbackOnEmptyString,
    formats: t.formats,
    textComponent: t.textComponent,
    messages: t.messages,
    defaultLocale: t.defaultLocale,
    defaultFormats: t.defaultFormats,
    onError: t.onError,
    onWarn: t.onWarn,
    wrapRichTextChunksInFragment: t.wrapRichTextChunksInFragment,
    defaultRichTextElements: t.defaultRichTextElements
  };
}
function Tx(t) {
  return t && Object.keys(t).reduce(function(e, r) {
    var n = t[r];
    return e[r] = mx(n) ? $O(n) : n, e;
  }, {});
}
var t5 = function(t, e, r, n) {
  for (var i = [], o = 4; o < arguments.length; o++)
    i[o - 4] = arguments[o];
  var a = Tx(n), s = am.apply(void 0, Xt([t, e, r, a], i, !1));
  return Array.isArray(s) ? I.exports.Children.toArray(s) : s;
}, r5 = function(t, e) {
  var r = t.defaultRichTextElements, n = $r(t, ["defaultRichTextElements"]), i = Tx(r), o = PO(O(O(O({}, Sx), n), {
    defaultRichTextElements: i
  }), e), a = {
    locale: o.locale,
    timeZone: o.timeZone,
    fallbackOnEmptyString: o.fallbackOnEmptyString,
    formats: o.formats,
    defaultLocale: o.defaultLocale,
    defaultFormats: o.defaultFormats,
    messages: o.messages,
    onError: o.onError,
    defaultRichTextElements: i
  };
  return O(O({}, o), {
    formatMessage: t5.bind(null, a, o.formatters),
    $t: t5.bind(null, a, o.formatters)
  });
}, UO = function(t) {
  rt(e, t);
  function e() {
    var r = t !== null && t.apply(this, arguments) || this;
    return r.cache = yx(), r.state = {
      cache: r.cache,
      intl: r5(i1(r.props), r.cache),
      prevConfig: i1(r.props)
    }, r;
  }
  return e.getDerivedStateFromProps = function(r, n) {
    var i = n.prevConfig, o = n.cache, a = i1(r);
    return FO(i, a) ? null : {
      intl: r5(a, o),
      prevConfig: a
    };
  }, e.prototype.render = function() {
    return Ex(this.state.intl), /* @__PURE__ */ P(zO, {
      value: this.state.intl,
      children: this.props.children
    });
  }, e.displayName = "IntlProvider", e.defaultProps = Sx, e;
}(I.exports.PureComponent);
const jO = UO;
a0("formatDate");
a0("formatTime");
a0("formatNumber");
a0("formatList");
a0("formatDisplayName");
Cx("formatDate");
Cx("formatTime");
var VO = function() {
  function t(e) {
    var r = e.batchDebounce, n = e.batchInterval, i = e.batchMax, o = e.batchHandler, a = e.batchKey;
    this.batchesByKey = /* @__PURE__ */ new Map(), this.batchDebounce = r, this.batchInterval = n, this.batchMax = i || 0, this.batchHandler = o, this.batchKey = a || function() {
      return "";
    };
  }
  return t.prototype.enqueueRequest = function(e) {
    var r = this, n = O(O({}, e), { next: [], error: [], complete: [], subscribers: /* @__PURE__ */ new Set() }), i = this.batchKey(e.operation);
    return n.observable || (n.observable = new Be(function(o) {
      var a = r.batchesByKey.get(i);
      a || r.batchesByKey.set(i, a = /* @__PURE__ */ new Set());
      var s = a.size === 0, l = n.subscribers.size === 0;
      return n.subscribers.add(o), l && a.add(n), o.next && n.next.push(o.next.bind(o)), o.error && n.error.push(o.error.bind(o)), o.complete && n.complete.push(o.complete.bind(o)), s ? r.scheduleQueueConsumption(i) : r.batchDebounce && (clearTimeout(r.scheduledBatchTimer), r.scheduleQueueConsumption(i)), a.size === r.batchMax && r.consumeQueue(i), function() {
        var u;
        n.subscribers.delete(o) && n.subscribers.size < 1 && a.delete(n) && a.size < 1 && (r.consumeQueue(i), (u = a.subscription) === null || u === void 0 || u.unsubscribe());
      };
    })), n.observable;
  }, t.prototype.consumeQueue = function(e) {
    e === void 0 && (e = "");
    var r = this.batchesByKey.get(e);
    if (this.batchesByKey.delete(e), !(!r || !r.size)) {
      var n = [], i = [], o = [], a = [], s = [], l = [];
      r.forEach(function(f) {
        n.push(f.operation), i.push(f.forward), o.push(f.observable), a.push(f.next), s.push(f.error), l.push(f.complete);
      });
      var u = this.batchHandler(n, i) || Be.of(), c = function(f) {
        s.forEach(function(d) {
          d && d.forEach(function(h) {
            return h(f);
          });
        });
      };
      return r.subscription = u.subscribe({
        next: function(f) {
          if (Array.isArray(f) || (f = [f]), a.length !== f.length) {
            var d = new Error("server returned results with length ".concat(f.length, ", expected length of ").concat(a.length));
            return d.result = f, c(d);
          }
          f.forEach(function(h, m) {
            a[m] && a[m].forEach(function(g) {
              return g(h);
            });
          });
        },
        error: c,
        complete: function() {
          l.forEach(function(f) {
            f && f.forEach(function(d) {
              return d();
            });
          });
        }
      }), o;
    }
  }, t.prototype.scheduleQueueConsumption = function(e) {
    var r = this;
    this.scheduledBatchTimer = setTimeout(function() {
      r.consumeQueue(e);
    }, this.batchInterval);
  }, t;
}(), qO = function(t) {
  rt(e, t);
  function e(r) {
    var n = t.call(this) || this, i = r || {}, o = i.batchDebounce, a = i.batchInterval, s = a === void 0 ? 10 : a, l = i.batchMax, u = l === void 0 ? 0 : l, c = i.batchHandler, f = c === void 0 ? function() {
      return null;
    } : c, d = i.batchKey, h = d === void 0 ? function() {
      return "";
    } : d;
    return n.batcher = new VO({
      batchDebounce: o,
      batchInterval: s,
      batchMax: u,
      batchHandler: f,
      batchKey: h
    }), r.batchHandler.length <= 1 && (n.request = function(m) {
      return n.batcher.enqueueRequest({ operation: m });
    }), n;
  }
  return e.prototype.request = function(r, n) {
    return this.batcher.enqueueRequest({
      operation: r,
      forward: n
    });
  }, e;
}(ai), GO = function(t) {
  rt(e, t);
  function e(r) {
    var n = t.call(this) || this, i = r || {}, o = i.uri, a = o === void 0 ? "/graphql" : o, s = i.fetch, l = i.print, u = l === void 0 ? s9 : l, c = i.includeExtensions, f = i.batchInterval, d = i.batchDebounce, h = i.batchMax, m = i.batchKey, g = $r(i, ["uri", "fetch", "print", "includeExtensions", "batchInterval", "batchDebounce", "batchMax", "batchKey"]);
    u9(s), s || (s = fetch);
    var S = {
      http: { includeExtensions: c },
      options: g.fetchOptions,
      credentials: g.credentials,
      headers: g.headers
    };
    n.batchDebounce = d, n.batchInterval = f || 10, n.batchMax = h || 10;
    var b = function(x) {
      var v = Up(x[0], a), w = x[0].getContext(), _ = {};
      if (w.clientAwareness) {
        var T = w.clientAwareness, N = T.name, A = T.version;
        N && (_["apollographql-client-name"] = N), A && (_["apollographql-client-version"] = A);
      }
      var R = {
        http: w.http,
        options: w.fetchOptions,
        credentials: w.credentials,
        headers: O(O({}, _), w.headers)
      }, F = x.map(function(de) {
        return l9(de, u, a9, S, R);
      }), X = F.map(function(de) {
        var z = de.body;
        return z;
      }), le = F[0].options;
      if (le.method === "GET")
        return Df(new Error("apollo-link-batch-http does not support GET requests"));
      try {
        le.body = kf(X, "Payload");
      } catch (de) {
        return Df(de);
      }
      var ye;
      if (!le.signal) {
        var Ce = c9(), _e = Ce.controller, Ee = Ce.signal;
        ye = _e, ye && (le.signal = Ee);
      }
      return new Be(function(de) {
        return s(v, le).then(function(z) {
          return x.forEach(function(W) {
            return W.setContext({ response: z });
          }), z;
        }).then(o9(x)).then(function(z) {
          return de.next(z), de.complete(), z;
        }).catch(function(z) {
          z.name !== "AbortError" && (z.result && z.result.errors && z.result.data && de.next(z.result), de.error(z));
        }), function() {
          ye && ye.abort();
        };
      });
    };
    return m = m || function(x) {
      var v = x.getContext(), w = {
        http: v.http,
        options: v.fetchOptions,
        credentials: v.credentials,
        headers: v.headers
      };
      return Up(x, a) + JSON.stringify(w);
    }, n.batcher = new qO({
      batchDebounce: n.batchDebounce,
      batchInterval: n.batchInterval,
      batchMax: n.batchMax,
      batchKey: m,
      batchHandler: b
    }), n;
  }
  return e.prototype.request = function(r) {
    return this.batcher.request(r);
  }, e;
}(ai);
function WO(t) {
  return new ai(function(e, r) {
    return new Be(function(n) {
      var i, o, a;
      try {
        i = r(e).subscribe({
          next: function(s) {
            if (s.errors && (a = t({
              graphQLErrors: s.errors,
              response: s,
              operation: e,
              forward: r
            }), a)) {
              o = a.subscribe({
                next: n.next.bind(n),
                error: n.error.bind(n),
                complete: n.complete.bind(n)
              });
              return;
            }
            n.next(s);
          },
          error: function(s) {
            if (a = t({
              operation: e,
              networkError: s,
              graphQLErrors: s && s.result && s.result.errors,
              forward: r
            }), a) {
              o = a.subscribe({
                next: n.next.bind(n),
                error: n.error.bind(n),
                complete: n.complete.bind(n)
              });
              return;
            }
            n.error(s);
          },
          complete: function() {
            a || n.complete.bind(n)();
          }
        });
      } catch (s) {
        t({ networkError: s, operation: e, forward: r }), n.error(s);
      }
      return function() {
        i && i.unsubscribe(), o && i.unsubscribe();
      };
    });
  });
}
var QO = function(t) {
  rt(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.link = WO(r), n;
  }
  return e.prototype.request = function(r, n) {
    return this.link.request(r, n);
  }, e;
}(ai);
const Nx = "https://paper.yechao.xyz/graphql";
class Ji {
  static get token() {
    if (!this._token && (this._token = this.paperToken, !this._token))
      try {
        const e = JSON.parse(localStorage.getItem(this.TOKEN_KEY) || "{}");
        typeof e.accessToken == "string" && typeof e.refreshToken == "string" && (this._token = { accessToken: e.accessToken, refreshToken: e.refreshToken });
      } catch {
      }
    return this._token;
  }
  static set token(e) {
    this._token = e, e ? localStorage.setItem(this.TOKEN_KEY, JSON.stringify(e)) : localStorage.removeItem(this.TOKEN_KEY);
  }
  static get paperToken() {
    try {
      const e = JSON.parse(JSON.parse(localStorage.getItem(this.PAPER_TOKEN_KEY) || '"{}"'));
      if (typeof e.accessToken == "string" && typeof e.refreshToken == "string")
        return { accessToken: e.accessToken, refreshToken: e.refreshToken };
    } catch {
    }
    return null;
  }
}
At(Ji, "TOKEN_KEY", "PAPER_EDITOR_ACCESS_TOKEN"), At(Ji, "_token", null), At(Ji, "PAPER_TOKEN_KEY", "flutter.PAPER_ACCESS_TOKEN");
async function KO({
  type: t,
  input: e
}) {
  var i;
  const n = await YO().mutate({
    mutation: $n`
      mutation Auth($type: String!, $input: JSONObject!) {
        auth(type: $type, input: $input) {
          accessToken
          refreshToken
          expiresIn
          tokenType
        }
      }
    `,
    variables: { type: t, input: e }
  });
  if ((i = n.errors) != null && i.length)
    throw n.errors[0];
  if (!n.data)
    throw new Error("Invalid response data of refreshToken");
  return n.data.auth;
}
function YO() {
  return new B9({
    link: new f9({
      uri: Nx
    }),
    cache: new I9()
  });
}
function XO() {
  const t = new ZO({
    needRefreshToken: (o) => {
      var s, l, u;
      return ((s = Ji.token) == null ? void 0 : s.refreshToken) ? ((u = (l = o == null ? void 0 : o[0]) == null ? void 0 : l.extensions) == null ? void 0 : u.code) === "UNAUTHENTICATED" : !1;
    },
    refreshToken: async () => {
      var a;
      const o = (a = Ji.token) == null ? void 0 : a.refreshToken;
      if (typeof o != "string")
        throw new Error("Invalid refresh token");
      Ji.token = await KO({ type: "refreshToken", input: { refreshToken: o } });
    },
    processOperation: (o) => {
      const { token: a } = Ji;
      if (!a)
        throw new Error("Invalid token");
      o.setContext(({ headers: s = {} }) => ({
        headers: {
          ...s,
          authorization: `Bearer ${a.accessToken}`
        }
      }));
    }
  }), e = new ai((o, a) => {
    const { token: s } = Ji;
    return s != null && s.accessToken && o.setContext(({ headers: l = {} }) => ({
      headers: {
        ...l,
        authorization: `Bearer ${s.accessToken}`
      }
    })), a(o);
  }), r = new GO({
    uri: Nx,
    batchMax: 5,
    batchInterval: 100
  }), n = e.concat(t).concat(r);
  return new B9({
    link: n,
    cache: new I9({
      typePolicies: {
        User: {
          fields: {
            objects: CN()
          }
        }
      }
    })
  });
}
class ZO extends QO {
  constructor(r) {
    super((n) => this.handleError(n));
    At(this, "options");
    At(this, "isRefreshing", !1);
    At(this, "pendings", []);
    At(this, "handleError", ({ graphQLErrors: r, operation: n, forward: i }) => {
      if (this.options.needRefreshToken(r))
        return new Be((o) => {
          (async () => {
            try {
              this.isRefreshing ? await new Promise((s) => this.pendings.push(s)) : (this.isRefreshing = !0, await this.options.refreshToken()), this.options.processOperation(n), i(n).subscribe(o);
            } catch (a) {
              o.error(a);
            } finally {
              const a = this.pendings;
              this.pendings = [], a.forEach((s) => s()), this.isRefreshing = !1;
            }
          })();
        });
    });
    this.options = r;
  }
}
function um() {
  return um = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, um.apply(this, arguments);
}
function Dx(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return e[r] === void 0 && (e[r] = t(r)), e[r];
  };
}
var JO = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, eA = /* @__PURE__ */ Dx(
  function(t) {
    return JO.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
);
function tA(t) {
  if (t.sheet)
    return t.sheet;
  for (var e = 0; e < document.styleSheets.length; e++)
    if (document.styleSheets[e].ownerNode === t)
      return document.styleSheets[e];
}
function rA(t) {
  var e = document.createElement("style");
  return e.setAttribute("data-emotion", t.key), t.nonce !== void 0 && e.setAttribute("nonce", t.nonce), e.appendChild(document.createTextNode("")), e.setAttribute("data-s", ""), e;
}
var nA = /* @__PURE__ */ function() {
  function t(r) {
    var n = this;
    this._insertTag = function(i) {
      var o;
      n.tags.length === 0 ? n.insertionPoint ? o = n.insertionPoint.nextSibling : n.prepend ? o = n.container.firstChild : o = n.before : o = n.tags[n.tags.length - 1].nextSibling, n.container.insertBefore(i, o), n.tags.push(i);
    }, this.isSpeedy = r.speedy === void 0 ? !0 : r.speedy, this.tags = [], this.ctr = 0, this.nonce = r.nonce, this.key = r.key, this.container = r.container, this.prepend = r.prepend, this.insertionPoint = r.insertionPoint, this.before = null;
  }
  var e = t.prototype;
  return e.hydrate = function(n) {
    n.forEach(this._insertTag);
  }, e.insert = function(n) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(rA(this));
    var i = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var o = tA(i);
      try {
        o.insertRule(n, o.cssRules.length);
      } catch {
      }
    } else
      i.appendChild(document.createTextNode(n));
    this.ctr++;
  }, e.flush = function() {
    this.tags.forEach(function(n) {
      return n.parentNode && n.parentNode.removeChild(n);
    }), this.tags = [], this.ctr = 0;
  }, t;
}(), sr = "-ms-", Lf = "-moz-", Pe = "-webkit-", kx = "comm", wv = "rule", Ev = "decl", iA = "@import", Ox = "@keyframes", oA = Math.abs, Bd = String.fromCharCode, aA = Object.assign;
function sA(t, e) {
  return (((e << 2 ^ Dr(t, 0)) << 2 ^ Dr(t, 1)) << 2 ^ Dr(t, 2)) << 2 ^ Dr(t, 3);
}
function Ax(t) {
  return t.trim();
}
function lA(t, e) {
  return (t = e.exec(t)) ? t[0] : t;
}
function Fe(t, e, r) {
  return t.replace(e, r);
}
function cm(t, e) {
  return t.indexOf(e);
}
function Dr(t, e) {
  return t.charCodeAt(e) | 0;
}
function Au(t, e, r) {
  return t.slice(e, r);
}
function Vn(t) {
  return t.length;
}
function Sv(t) {
  return t.length;
}
function J0(t, e) {
  return e.push(t), t;
}
function uA(t, e) {
  return t.map(e).join("");
}
var zd = 1, Os = 1, Mx = 0, Fr = 0, Nt = 0, js = "";
function Hd(t, e, r, n, i, o, a) {
  return { value: t, root: e, parent: r, type: n, props: i, children: o, line: zd, column: Os, length: a, return: "" };
}
function yl(t, e) {
  return aA(Hd("", null, null, "", null, null, 0), t, { length: -t.length }, e);
}
function cA() {
  return Nt;
}
function fA() {
  return Nt = Fr > 0 ? Dr(js, --Fr) : 0, Os--, Nt === 10 && (Os = 1, zd--), Nt;
}
function Kr() {
  return Nt = Fr < Mx ? Dr(js, Fr++) : 0, Os++, Nt === 10 && (Os = 1, zd++), Nt;
}
function Zn() {
  return Dr(js, Fr);
}
function $c() {
  return Fr;
}
function s0(t, e) {
  return Au(js, t, e);
}
function Mu(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Rx(t) {
  return zd = Os = 1, Mx = Vn(js = t), Fr = 0, [];
}
function Lx(t) {
  return js = "", t;
}
function Fc(t) {
  return Ax(s0(Fr - 1, fm(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function dA(t) {
  for (; (Nt = Zn()) && Nt < 33; )
    Kr();
  return Mu(t) > 2 || Mu(Nt) > 3 ? "" : " ";
}
function hA(t, e) {
  for (; --e && Kr() && !(Nt < 48 || Nt > 102 || Nt > 57 && Nt < 65 || Nt > 70 && Nt < 97); )
    ;
  return s0(t, $c() + (e < 6 && Zn() == 32 && Kr() == 32));
}
function fm(t) {
  for (; Kr(); )
    switch (Nt) {
      case t:
        return Fr;
      case 34:
      case 39:
        t !== 34 && t !== 39 && fm(Nt);
        break;
      case 40:
        t === 41 && fm(t);
        break;
      case 92:
        Kr();
        break;
    }
  return Fr;
}
function pA(t, e) {
  for (; Kr() && t + Nt !== 47 + 10; )
    if (t + Nt === 42 + 42 && Zn() === 47)
      break;
  return "/*" + s0(e, Fr - 1) + "*" + Bd(t === 47 ? t : Kr());
}
function mA(t) {
  for (; !Mu(Zn()); )
    Kr();
  return s0(t, Fr);
}
function gA(t) {
  return Lx(Bc("", null, null, null, [""], t = Rx(t), 0, [0], t));
}
function Bc(t, e, r, n, i, o, a, s, l) {
  for (var u = 0, c = 0, f = a, d = 0, h = 0, m = 0, g = 1, S = 1, b = 1, x = 0, v = "", w = i, _ = o, T = n, N = v; S; )
    switch (m = x, x = Kr()) {
      case 40:
        if (m != 108 && N.charCodeAt(f - 1) == 58) {
          cm(N += Fe(Fc(x), "&", "&\f"), "&\f") != -1 && (b = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        N += Fc(x);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        N += dA(m);
        break;
      case 92:
        N += hA($c() - 1, 7);
        continue;
      case 47:
        switch (Zn()) {
          case 42:
          case 47:
            J0(vA(pA(Kr(), $c()), e, r), l);
            break;
          default:
            N += "/";
        }
        break;
      case 123 * g:
        s[u++] = Vn(N) * b;
      case 125 * g:
      case 59:
      case 0:
        switch (x) {
          case 0:
          case 125:
            S = 0;
          case 59 + c:
            h > 0 && Vn(N) - f && J0(h > 32 ? i5(N + ";", n, r, f - 1) : i5(Fe(N, " ", "") + ";", n, r, f - 2), l);
            break;
          case 59:
            N += ";";
          default:
            if (J0(T = n5(N, e, r, u, c, i, s, v, w = [], _ = [], f), o), x === 123)
              if (c === 0)
                Bc(N, e, T, T, w, o, f, s, _);
              else
                switch (d) {
                  case 100:
                  case 109:
                  case 115:
                    Bc(t, T, T, n && J0(n5(t, T, T, 0, 0, i, s, v, i, w = [], f), _), i, _, f, s, n ? w : _);
                    break;
                  default:
                    Bc(N, T, T, T, [""], _, 0, s, _);
                }
        }
        u = c = h = 0, g = b = 1, v = N = "", f = a;
        break;
      case 58:
        f = 1 + Vn(N), h = m;
      default:
        if (g < 1) {
          if (x == 123)
            --g;
          else if (x == 125 && g++ == 0 && fA() == 125)
            continue;
        }
        switch (N += Bd(x), x * g) {
          case 38:
            b = c > 0 ? 1 : (N += "\f", -1);
            break;
          case 44:
            s[u++] = (Vn(N) - 1) * b, b = 1;
            break;
          case 64:
            Zn() === 45 && (N += Fc(Kr())), d = Zn(), c = f = Vn(v = N += mA($c())), x++;
            break;
          case 45:
            m === 45 && Vn(N) == 2 && (g = 0);
        }
    }
  return o;
}
function n5(t, e, r, n, i, o, a, s, l, u, c) {
  for (var f = i - 1, d = i === 0 ? o : [""], h = Sv(d), m = 0, g = 0, S = 0; m < n; ++m)
    for (var b = 0, x = Au(t, f + 1, f = oA(g = a[m])), v = t; b < h; ++b)
      (v = Ax(g > 0 ? d[b] + " " + x : Fe(x, /&\f/g, d[b]))) && (l[S++] = v);
  return Hd(t, e, r, i === 0 ? wv : s, l, u, c);
}
function vA(t, e, r) {
  return Hd(t, e, r, kx, Bd(cA()), Au(t, 2, -2), 0);
}
function i5(t, e, r, n) {
  return Hd(t, e, r, Ev, Au(t, 0, n), Au(t, n + 1, -1), n);
}
function Ix(t, e) {
  switch (sA(t, e)) {
    case 5103:
      return Pe + "print-" + t + t;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Pe + t + t;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Pe + t + Lf + t + sr + t + t;
    case 6828:
    case 4268:
      return Pe + t + sr + t + t;
    case 6165:
      return Pe + t + sr + "flex-" + t + t;
    case 5187:
      return Pe + t + Fe(t, /(\w+).+(:[^]+)/, Pe + "box-$1$2" + sr + "flex-$1$2") + t;
    case 5443:
      return Pe + t + sr + "flex-item-" + Fe(t, /flex-|-self/, "") + t;
    case 4675:
      return Pe + t + sr + "flex-line-pack" + Fe(t, /align-content|flex-|-self/, "") + t;
    case 5548:
      return Pe + t + sr + Fe(t, "shrink", "negative") + t;
    case 5292:
      return Pe + t + sr + Fe(t, "basis", "preferred-size") + t;
    case 6060:
      return Pe + "box-" + Fe(t, "-grow", "") + Pe + t + sr + Fe(t, "grow", "positive") + t;
    case 4554:
      return Pe + Fe(t, /([^-])(transform)/g, "$1" + Pe + "$2") + t;
    case 6187:
      return Fe(Fe(Fe(t, /(zoom-|grab)/, Pe + "$1"), /(image-set)/, Pe + "$1"), t, "") + t;
    case 5495:
    case 3959:
      return Fe(t, /(image-set\([^]*)/, Pe + "$1$`$1");
    case 4968:
      return Fe(Fe(t, /(.+:)(flex-)?(.*)/, Pe + "box-pack:$3" + sr + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Pe + t + t;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Fe(t, /(.+)-inline(.+)/, Pe + "$1$2") + t;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Vn(t) - 1 - e > 6)
        switch (Dr(t, e + 1)) {
          case 109:
            if (Dr(t, e + 4) !== 45)
              break;
          case 102:
            return Fe(t, /(.+:)(.+)-([^]+)/, "$1" + Pe + "$2-$3$1" + Lf + (Dr(t, e + 3) == 108 ? "$3" : "$2-$3")) + t;
          case 115:
            return ~cm(t, "stretch") ? Ix(Fe(t, "stretch", "fill-available"), e) + t : t;
        }
      break;
    case 4949:
      if (Dr(t, e + 1) !== 115)
        break;
    case 6444:
      switch (Dr(t, Vn(t) - 3 - (~cm(t, "!important") && 10))) {
        case 107:
          return Fe(t, ":", ":" + Pe) + t;
        case 101:
          return Fe(t, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Pe + (Dr(t, 14) === 45 ? "inline-" : "") + "box$3$1" + Pe + "$2$3$1" + sr + "$2box$3") + t;
      }
      break;
    case 5936:
      switch (Dr(t, e + 11)) {
        case 114:
          return Pe + t + sr + Fe(t, /[svh]\w+-[tblr]{2}/, "tb") + t;
        case 108:
          return Pe + t + sr + Fe(t, /[svh]\w+-[tblr]{2}/, "tb-rl") + t;
        case 45:
          return Pe + t + sr + Fe(t, /[svh]\w+-[tblr]{2}/, "lr") + t;
      }
      return Pe + t + sr + t + t;
  }
  return t;
}
function cs(t, e) {
  for (var r = "", n = Sv(t), i = 0; i < n; i++)
    r += e(t[i], i, t, e) || "";
  return r;
}
function yA(t, e, r, n) {
  switch (t.type) {
    case iA:
    case Ev:
      return t.return = t.return || t.value;
    case kx:
      return "";
    case Ox:
      return t.return = t.value + "{" + cs(t.children, n) + "}";
    case wv:
      t.value = t.props.join(",");
  }
  return Vn(r = cs(t.children, n)) ? t.return = t.value + "{" + r + "}" : "";
}
function xA(t) {
  var e = Sv(t);
  return function(r, n, i, o) {
    for (var a = "", s = 0; s < e; s++)
      a += t[s](r, n, i, o) || "";
    return a;
  };
}
function bA(t) {
  return function(e) {
    e.root || (e = e.return) && t(e);
  };
}
function wA(t, e, r, n) {
  if (t.length > -1 && !t.return)
    switch (t.type) {
      case Ev:
        t.return = Ix(t.value, t.length);
        break;
      case Ox:
        return cs([yl(t, { value: Fe(t.value, "@", "@" + Pe) })], n);
      case wv:
        if (t.length)
          return uA(t.props, function(i) {
            switch (lA(i, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return cs([yl(t, { props: [Fe(i, /:(read-\w+)/, ":" + Lf + "$1")] })], n);
              case "::placeholder":
                return cs([
                  yl(t, { props: [Fe(i, /:(plac\w+)/, ":" + Pe + "input-$1")] }),
                  yl(t, { props: [Fe(i, /:(plac\w+)/, ":" + Lf + "$1")] }),
                  yl(t, { props: [Fe(i, /:(plac\w+)/, sr + "input-$1")] })
                ], n);
            }
            return "";
          });
    }
}
var EA = function(e, r, n) {
  for (var i = 0, o = 0; i = o, o = Zn(), i === 38 && o === 12 && (r[n] = 1), !Mu(o); )
    Kr();
  return s0(e, Fr);
}, SA = function(e, r) {
  var n = -1, i = 44;
  do
    switch (Mu(i)) {
      case 0:
        i === 38 && Zn() === 12 && (r[n] = 1), e[n] += EA(Fr - 1, r, n);
        break;
      case 2:
        e[n] += Fc(i);
        break;
      case 4:
        if (i === 44) {
          e[++n] = Zn() === 58 ? "&\f" : "", r[n] = e[n].length;
          break;
        }
      default:
        e[n] += Bd(i);
    }
  while (i = Kr());
  return e;
}, _A = function(e, r) {
  return Lx(SA(Rx(e), r));
}, o5 = /* @__PURE__ */ new WeakMap(), CA = function(e) {
  if (!(e.type !== "rule" || !e.parent || e.length < 1)) {
    for (var r = e.value, n = e.parent, i = e.column === n.column && e.line === n.line; n.type !== "rule"; )
      if (n = n.parent, !n)
        return;
    if (!(e.props.length === 1 && r.charCodeAt(0) !== 58 && !o5.get(n)) && !i) {
      o5.set(e, !0);
      for (var o = [], a = _A(r, o), s = n.props, l = 0, u = 0; l < a.length; l++)
        for (var c = 0; c < s.length; c++, u++)
          e.props[u] = o[l] ? a[l].replace(/&\f/g, s[c]) : s[c] + " " + a[l];
    }
  }
}, TA = function(e) {
  if (e.type === "decl") {
    var r = e.value;
    r.charCodeAt(0) === 108 && r.charCodeAt(2) === 98 && (e.return = "", e.value = "");
  }
}, NA = [wA], Px = function(e) {
  var r = e.key;
  if (r === "css") {
    var n = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n, function(g) {
      var S = g.getAttribute("data-emotion");
      S.indexOf(" ") !== -1 && (document.head.appendChild(g), g.setAttribute("data-s", ""));
    });
  }
  var i = e.stylisPlugins || NA, o = {}, a, s = [];
  a = e.container || document.head, Array.prototype.forEach.call(
    document.querySelectorAll('style[data-emotion^="' + r + ' "]'),
    function(g) {
      for (var S = g.getAttribute("data-emotion").split(" "), b = 1; b < S.length; b++)
        o[S[b]] = !0;
      s.push(g);
    }
  );
  var l, u = [CA, TA];
  {
    var c, f = [yA, bA(function(g) {
      c.insert(g);
    })], d = xA(u.concat(i, f)), h = function(S) {
      return cs(gA(S), d);
    };
    l = function(S, b, x, v) {
      c = x, h(S ? S + "{" + b.styles + "}" : b.styles), v && (m.inserted[b.name] = !0);
    };
  }
  var m = {
    key: r,
    sheet: new nA({
      key: r,
      container: a,
      nonce: e.nonce,
      speedy: e.speedy,
      prepend: e.prepend,
      insertionPoint: e.insertionPoint
    }),
    nonce: e.nonce,
    inserted: o,
    registered: {},
    insert: l
  };
  return m.sheet.hydrate(s), m;
}, DA = !0;
function _v(t, e, r) {
  var n = "";
  return r.split(" ").forEach(function(i) {
    t[i] !== void 0 ? e.push(t[i] + ";") : n += i + " ";
  }), n;
}
var $x = function(e, r, n) {
  var i = e.key + "-" + r.name;
  (n === !1 || DA === !1) && e.registered[i] === void 0 && (e.registered[i] = r.styles);
}, Fx = function(e, r, n) {
  $x(e, r, n);
  var i = e.key + "-" + r.name;
  if (e.inserted[r.name] === void 0) {
    var o = r;
    do
      e.insert(r === o ? "." + i : "", o, e.sheet, !0), o = o.next;
    while (o !== void 0);
  }
};
function kA(t) {
  for (var e = 0, r, n = 0, i = t.length; i >= 4; ++n, i -= 4)
    r = t.charCodeAt(n) & 255 | (t.charCodeAt(++n) & 255) << 8 | (t.charCodeAt(++n) & 255) << 16 | (t.charCodeAt(++n) & 255) << 24, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), r ^= r >>> 24, e = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16) ^ (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16);
  switch (i) {
    case 3:
      e ^= (t.charCodeAt(n + 2) & 255) << 16;
    case 2:
      e ^= (t.charCodeAt(n + 1) & 255) << 8;
    case 1:
      e ^= t.charCodeAt(n) & 255, e = (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16);
  }
  return e ^= e >>> 13, e = (e & 65535) * 1540483477 + ((e >>> 16) * 59797 << 16), ((e ^ e >>> 15) >>> 0).toString(36);
}
var OA = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, AA = /[A-Z]|^ms/g, MA = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Bx = function(e) {
  return e.charCodeAt(1) === 45;
}, a5 = function(e) {
  return e != null && typeof e != "boolean";
}, o1 = /* @__PURE__ */ Dx(function(t) {
  return Bx(t) ? t : t.replace(AA, "-$&").toLowerCase();
}), s5 = function(e, r) {
  switch (e) {
    case "animation":
    case "animationName":
      if (typeof r == "string")
        return r.replace(MA, function(n, i, o) {
          return qn = {
            name: i,
            styles: o,
            next: qn
          }, i;
        });
  }
  return OA[e] !== 1 && !Bx(e) && typeof r == "number" && r !== 0 ? r + "px" : r;
};
function Ru(t, e, r) {
  if (r == null)
    return "";
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof r) {
    case "boolean":
      return "";
    case "object": {
      if (r.anim === 1)
        return qn = {
          name: r.name,
          styles: r.styles,
          next: qn
        }, r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            qn = {
              name: n.name,
              styles: n.styles,
              next: qn
            }, n = n.next;
        var i = r.styles + ";";
        return i;
      }
      return RA(t, e, r);
    }
    case "function": {
      if (t !== void 0) {
        var o = qn, a = r(t);
        return qn = o, Ru(t, e, a);
      }
      break;
    }
  }
  if (e == null)
    return r;
  var s = e[r];
  return s !== void 0 ? s : r;
}
function RA(t, e, r) {
  var n = "";
  if (Array.isArray(r))
    for (var i = 0; i < r.length; i++)
      n += Ru(t, e, r[i]) + ";";
  else
    for (var o in r) {
      var a = r[o];
      if (typeof a != "object")
        e != null && e[a] !== void 0 ? n += o + "{" + e[a] + "}" : a5(a) && (n += o1(o) + ":" + s5(o, a) + ";");
      else if (Array.isArray(a) && typeof a[0] == "string" && (e == null || e[a[0]] === void 0))
        for (var s = 0; s < a.length; s++)
          a5(a[s]) && (n += o1(o) + ":" + s5(o, a[s]) + ";");
      else {
        var l = Ru(t, e, a);
        switch (o) {
          case "animation":
          case "animationName": {
            n += o1(o) + ":" + l + ";";
            break;
          }
          default:
            n += o + "{" + l + "}";
        }
      }
    }
  return n;
}
var l5 = /label:\s*([^\s;\n{]+)\s*(;|$)/g, qn, zc = function(e, r, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var i = !0, o = "";
  qn = void 0;
  var a = e[0];
  a == null || a.raw === void 0 ? (i = !1, o += Ru(n, r, a)) : o += a[0];
  for (var s = 1; s < e.length; s++)
    o += Ru(n, r, e[s]), i && (o += a[s]);
  l5.lastIndex = 0;
  for (var l = "", u; (u = l5.exec(o)) !== null; )
    l += "-" + u[1];
  var c = kA(o) + l;
  return {
    name: c,
    styles: o,
    next: qn
  };
}, LA = function(e) {
  return e();
}, IA = L1["useInsertionEffect"] ? L1["useInsertionEffect"] : !1, PA = IA || LA, zx = /* @__PURE__ */ I.exports.createContext(
  typeof HTMLElement < "u" ? /* @__PURE__ */ Px({
    key: "css"
  }) : null
);
zx.Provider;
var $A = function(e) {
  return /* @__PURE__ */ I.exports.forwardRef(function(r, n) {
    var i = I.exports.useContext(zx);
    return e(r, i, n);
  });
}, FA = /* @__PURE__ */ I.exports.createContext({}), BA = eA, zA = function(e) {
  return e !== "theme";
}, u5 = function(e) {
  return typeof e == "string" && e.charCodeAt(0) > 96 ? BA : zA;
}, c5 = function(e, r, n) {
  var i;
  if (r) {
    var o = r.shouldForwardProp;
    i = e.__emotion_forwardProp && o ? function(a) {
      return e.__emotion_forwardProp(a) && o(a);
    } : o;
  }
  return typeof i != "function" && n && (i = e.__emotion_forwardProp), i;
}, HA = function(e) {
  var r = e.cache, n = e.serialized, i = e.isStringTag;
  return $x(r, n, i), PA(function() {
    return Fx(r, n, i);
  }), null;
}, UA = function t(e, r) {
  var n = e.__emotion_real === e, i = n && e.__emotion_base || e, o, a;
  r !== void 0 && (o = r.label, a = r.target);
  var s = c5(e, r, n), l = s || u5(i), u = !l("as");
  return function() {
    var c = arguments, f = n && e.__emotion_styles !== void 0 ? e.__emotion_styles.slice(0) : [];
    if (o !== void 0 && f.push("label:" + o + ";"), c[0] == null || c[0].raw === void 0)
      f.push.apply(f, c);
    else {
      f.push(c[0][0]);
      for (var d = c.length, h = 1; h < d; h++)
        f.push(c[h], c[0][h]);
    }
    var m = $A(function(g, S, b) {
      var x = u && g.as || i, v = "", w = [], _ = g;
      if (g.theme == null) {
        _ = {};
        for (var T in g)
          _[T] = g[T];
        _.theme = I.exports.useContext(FA);
      }
      typeof g.className == "string" ? v = _v(S.registered, w, g.className) : g.className != null && (v = g.className + " ");
      var N = zc(f.concat(w), S.registered, _);
      v += S.key + "-" + N.name, a !== void 0 && (v += " " + a);
      var A = u && s === void 0 ? u5(x) : l, R = {};
      for (var F in g)
        u && F === "as" || A(F) && (R[F] = g[F]);
      return R.className = v, R.ref = b, /* @__PURE__ */ I.exports.createElement(I.exports.Fragment, null, /* @__PURE__ */ I.exports.createElement(HA, {
        cache: S,
        serialized: N,
        isStringTag: typeof x == "string"
      }), /* @__PURE__ */ I.exports.createElement(x, R));
    });
    return m.displayName = o !== void 0 ? o : "Styled(" + (typeof i == "string" ? i : i.displayName || i.name || "Component") + ")", m.defaultProps = e.defaultProps, m.__emotion_real = m, m.__emotion_base = i, m.__emotion_styles = f, m.__emotion_forwardProp = s, Object.defineProperty(m, "toString", {
      value: function() {
        return "." + a;
      }
    }), m.withComponent = function(g, S) {
      return t(g, um({}, r, S, {
        shouldForwardProp: c5(m, S, !0)
      })).apply(void 0, f);
    }, m;
  };
}, jA = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], Qe = UA.bind();
jA.forEach(function(t) {
  Qe[t] = Qe(t);
});
var VA = function t(e, r) {
  if (e === r)
    return !0;
  if (e && r && typeof e == "object" && typeof r == "object") {
    if (e.constructor !== r.constructor)
      return !1;
    var n, i, o;
    if (Array.isArray(e)) {
      if (n = e.length, n != r.length)
        return !1;
      for (i = n; i-- !== 0; )
        if (!t(e[i], r[i]))
          return !1;
      return !0;
    }
    if (e instanceof Map && r instanceof Map) {
      if (e.size !== r.size)
        return !1;
      for (i of e.entries())
        if (!r.has(i[0]))
          return !1;
      for (i of e.entries())
        if (!t(i[1], r.get(i[0])))
          return !1;
      return !0;
    }
    if (e instanceof Set && r instanceof Set) {
      if (e.size !== r.size)
        return !1;
      for (i of e.entries())
        if (!r.has(i[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(r)) {
      if (n = e.length, n != r.length)
        return !1;
      for (i = n; i-- !== 0; )
        if (e[i] !== r[i])
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === r.source && e.flags === r.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === r.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === r.toString();
    if (o = Object.keys(e), n = o.length, n !== Object.keys(r).length)
      return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i]))
        return !1;
    for (i = n; i-- !== 0; ) {
      var a = o[i];
      if (!t(e[a], r[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
}, q = {};
let Hx = {}, Ux = {}, Lu = {}, Kl = {}, dm = {}, fs = {}, Cv = {}, hm = {}, Iu = {}, Pu = {}, ro = {}, Tv = {}, Nv = {}, jx = {}, Vx = {}, qx = {}, Gx = {}, Wx = {}, Qx = {}, If = {}, Kx = {}, Yx = {}, Xx = {}, Zx = {}, Jx = {}, eb = {}, tb = {}, rb = {}, nb = {}, Dv = {}, kv = {}, ib = {}, ob = {}, ab = {};
function ae(t) {
  throw Error(`Minified Lexical error #${t}; visit https://lexical.dev/docs/error?code=${t} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
let Vs = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", qA = Vs && "documentMode" in document ? document.documentMode : null, Cr = Vs && /Mac|iPod|iPhone|iPad/.test(navigator.platform), va = Vs && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent), GA = Vs && "InputEvent" in window && !qA ? "getTargetRanges" in new window.InputEvent("input") : !1, Ud = Vs && /Version\/[\d.]+.*Safari/.test(navigator.userAgent), jd = Vs && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, Vd = Ud || jd ? "\xA0" : "\u200B", WA = va ? "\xA0" : Vd, QA = /^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc]/, KA = /^[^\u0591-\u07ff\ufb1d-\ufdfd\ufe70-\ufefc]*[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/, oa = { bold: 1, code: 16, italic: 2, strikethrough: 4, subscript: 32, superscript: 64, underline: 8 }, YA = {
  directionless: 1,
  unmergeable: 2
}, f5 = { center: 2, justify: 4, left: 1, right: 3 }, XA = { 2: "center", 4: "justify", 1: "left", 3: "right" }, ZA = { normal: 0, segmented: 2, token: 1 }, JA = { 0: "normal", 2: "segmented", 1: "token" }, pm = !1, Ov = 0;
function eM(t) {
  Ov = t.timeStamp;
}
function a1(t, e, r) {
  return e.__lexicalLineBreak === t || t[`__lexicalKey_${r._key}`] !== void 0;
}
function tM(t) {
  return t.getEditorState().read(() => {
    let e = st();
    return e !== null ? e.clone() : null;
  });
}
function sb(t, e, r) {
  pm = !0;
  let n = 100 < performance.now() - Ov;
  try {
    Xr(t, () => {
      let i = st() || tM(t);
      var o = /* @__PURE__ */ new Map(), a = t.getRootElement(), s = t._editorState;
      let l = !1, u = "";
      for (var c = 0; c < e.length; c++) {
        var f = e[c], d = f.type, h = f.target, m = l0(h, s);
        if (!Dt(m)) {
          if (d === "characterData") {
            if (f = n && oe(m))
              e: {
                f = i, d = h;
                var g = m;
                if (Se(f)) {
                  var S = f.anchor.getNode();
                  if (S.is(g) && f.format !== S.getFormat()) {
                    f = !1;
                    break e;
                  }
                }
                f = d.nodeType === 3 && g.isAttached();
              }
            f && (g = window.getSelection(), d = f = null, g !== null && g.anchorNode === h && (f = g.anchorOffset, d = g.focusOffset), h = h.nodeValue, h !== null && Mv(m, h, f, d, !1));
          } else if (d === "childList") {
            for (l = !0, d = f.addedNodes, g = 0; g < d.length; g++) {
              S = d[g];
              var b = hb(S), x = S.parentNode;
              x == null || b !== null || S.nodeName === "BR" && a1(S, x, t) || (va && (b = S.innerText || S.nodeValue) && (u += b), x.removeChild(S));
            }
            if (f = f.removedNodes, d = f.length, 0 < d) {
              for (g = 0, S = 0; S < d; S++)
                x = f[S], x.nodeName === "BR" && a1(x, h, t) && (h.appendChild(x), g++);
              d !== g && (h === a && (m = s._nodeMap.get("root")), o.set(h, m));
            }
          }
        }
      }
      if (0 < o.size)
        for (let [v, w] of o)
          if (Y(w))
            for (o = w.__children, a = v.firstChild, s = 0; s < o.length; s++)
              c = t.getElementByKey(o[s]), c !== null && (a == null ? (v.appendChild(c), a = c) : a !== c && v.replaceChild(c, a), a = a.nextSibling);
          else
            oe(w) && w.markDirty();
      if (o = r.takeRecords(), 0 < o.length) {
        for (a = 0; a < o.length; a++)
          for (c = o[a], s = c.addedNodes, c = c.target, m = 0; m < s.length; m++)
            h = s[m], f = h.parentNode, f == null || h.nodeName !== "BR" || a1(h, c, t) || f.removeChild(h);
        r.takeRecords();
      }
      i !== null && (l && (i.dirty = !0, qs(i)), va && bb(t) && i.insertRawText(u));
    });
  } finally {
    pm = !1;
  }
}
function lb(t) {
  let e = t._observer;
  if (e !== null) {
    let r = e.takeRecords();
    sb(t, r, e);
  }
}
function ub(t) {
  Ov === 0 && Gd(t).addEventListener("textInput", eM, !0), t._observer = new MutationObserver((e, r) => {
    sb(t, e, r);
  });
}
let rM = 1, nM = typeof queueMicrotask == "function" ? queueMicrotask : (t) => {
  Promise.resolve().then(t);
};
function qd(t, e, r) {
  let n = t.getRootElement();
  try {
    var i;
    if (i = n !== null && n.contains(e) && n.contains(r) && e !== null) {
      let o = document.activeElement, a = o !== null ? o.nodeName : null;
      i = !Dt(l0(e)) || a !== "INPUT" && a !== "TEXTAREA";
    }
    return i && cb(e) === t;
  } catch {
    return !1;
  }
}
function cb(t) {
  for (; t != null; ) {
    let e = t.__lexicalEditor;
    if (e != null)
      return e;
    t = t.parentNode;
  }
  return null;
}
function mm(t) {
  return t.isToken() || t.isSegmented();
}
function Pf(t) {
  for (; t != null; ) {
    if (t.nodeType === 3)
      return t;
    t = t.firstChild;
  }
  return null;
}
function fb(t, e, r) {
  return e = oa[e], t & e && (r === null || (r & e) === 0) ? t ^ e : r === null || r & e ? t | e : t;
}
function db(t) {
  return oe(t) || ju(t) || Dt(t);
}
function Hc(t) {
  var e = t.getParent();
  if (e !== null) {
    e = e.getWritable().__children;
    let r = e.indexOf(t.__key);
    r === -1 && ae(31), ds(t), e.splice(r, 1);
  }
}
function As(t) {
  99 < Hu && ae(14);
  var e = t.getLatest(), r = e.__parent, n = ri();
  let i = It(), o = n._nodeMap;
  if (n = i._dirtyElements, r !== null)
    e:
      for (; r !== null; ) {
        if (n.has(r))
          break e;
        let a = o.get(r);
        if (a === void 0)
          break;
        n.set(r, !1), r = a.__parent;
      }
  e = e.__key, i._dirtyType = 1, Y(t) ? n.set(e, !0) : i._dirtyLeaves.add(e);
}
function ds(t) {
  let e = t.getPreviousSibling();
  t = t.getNextSibling(), e !== null && As(e), t !== null && As(t);
}
function Zt(t) {
  Vr();
  var e = It();
  let r = e._compositionKey;
  t !== r && (e._compositionKey = t, r !== null && (e = at(r), e !== null && e.getWritable()), t !== null && (t = at(t), t !== null && t.getWritable()));
}
function no() {
  return Lt ? null : It()._compositionKey;
}
function at(t, e) {
  return t = (e || ri())._nodeMap.get(t), t === void 0 ? null : t;
}
function hb(t, e) {
  let r = It();
  return t = t[`__lexicalKey_${r._key}`], t !== void 0 ? at(t, e) : null;
}
function l0(t, e) {
  for (; t != null; ) {
    let r = hb(t, e);
    if (r !== null)
      return r;
    t = t.parentNode;
  }
  return null;
}
function pb(t) {
  let e = Object.assign({}, t._decorators);
  return t._pendingDecorators = e;
}
function d5(t) {
  return t.read(() => Lo().getTextContent());
}
function iM(t, e) {
  Xr(t, () => {
    var r = ri();
    if (!r.isEmpty())
      if (e === "root")
        Lo().markDirty();
      else {
        r = r._nodeMap;
        for (let [, n] of r)
          n.markDirty();
      }
  }, t._pendingEditorState === null ? { tag: "history-merge" } : void 0);
}
function Lo() {
  return ri()._nodeMap.get("root");
}
function qs(t) {
  let e = ri();
  t !== null && (t.dirty = !0, t._cachedNodes = null), e._selection = t;
}
function Ja(t) {
  var e = It(), r;
  e: {
    for (r = t; r != null; ) {
      let n = r[`__lexicalKey_${e._key}`];
      if (n !== void 0) {
        r = n;
        break e;
      }
      r = r.parentNode;
    }
    r = null;
  }
  return r === null ? (e = e.getRootElement(), t === e ? at("root") : null) : at(r);
}
function mb(t) {
  return /[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(t);
}
function Av(t) {
  let e = [];
  for (; t !== null; )
    e.push(t), t = t._parentEditor;
  return e;
}
function gb() {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
}
function vb(t, e) {
  var r = window.getSelection();
  if (r !== null) {
    var n = r.anchorNode, { anchorOffset: i, focusOffset: o } = r;
    if (n !== null && n.nodeType === 3 && (r = l0(n), oe(r))) {
      if (n = n.nodeValue, n === Vd && e) {
        let a = e.length;
        n = e, o = i = a;
      }
      n !== null && Mv(r, n, i, o, t);
    }
  }
}
function Mv(t, e, r, n, i) {
  let o = t;
  if (o.isAttached() && (i || !o.isDirty())) {
    var a = o.isComposing();
    if (t = e, (a || i) && e[e.length - 1] === Vd && (t = e.slice(0, -1)), e = o.getTextContent(), i || t !== e)
      if (t === "")
        if (Zt(null), Ud || jd)
          o.remove();
        else {
          let s = It();
          setTimeout(() => {
            s.update(() => {
              o.isAttached() && o.remove();
            });
          }, 20);
        }
      else
        i = o.getParent(), e = c0(), o.isToken() || no() !== null && !a || i !== null && Se(e) && !i.canInsertTextBefore() && e.anchor.offset === 0 ? o.markDirty() : (a = st(), Se(a) && r !== null && n !== null && (a.setTextNodeRange(o, r, o, n), o.isSegmented() && (r = o.getTextContent(), r = vr(r), o.replace(r), o = r)), o.setTextContent(t));
  }
}
function oM(t, e) {
  if (e.isSegmented())
    return !0;
  if (!t.isCollapsed())
    return !1;
  t = t.anchor.offset;
  let r = e.getParentOrThrow(), n = e.isToken();
  return t === 0 ? ((t = !e.canInsertTextBefore() || !r.canInsertTextBefore() || n) || (e = e.getPreviousSibling(), t = (oe(e) || Y(e) && e.isInline()) && !e.canInsertTextAfter()), t) : t === e.getTextContentSize() ? !e.canInsertTextAfter() || !r.canInsertTextAfter() || n : !1;
}
function yb(t, e) {
  let r = t.anchor, n = t.focus, i = r.getNode();
  var o = window.getSelection();
  o = o !== null ? o.anchorNode : null;
  let a = r.key, s = It().getElementByKey(a), l = e.length;
  return a !== n.key || !oe(i) || (2 > l || mb(e)) && r.offset !== n.offset && !i.isComposing() || mm(i) || i.isDirty() && 1 < l || s !== null && !i.isComposing() && o !== Pf(s) || i.getFormat() !== t.format || oM(t, i);
}
function Uc(t, e) {
  var r = t[e];
  return typeof r == "string" ? (r = r.split(" "), t[e] = r) : r;
}
function Rv(t, e, r, n, i) {
  r.size !== 0 && (r = n.__key, e = e.get(n.__type), e === void 0 && ae(33), e = e.klass, n = t.get(e), n === void 0 && (n = /* @__PURE__ */ new Map(), t.set(e, n)), n.has(r) || n.set(r, i));
}
function h5(t, e, r) {
  let n = t.getParent(), i = r;
  return n !== null && (e && r === 0 ? (i = t.getIndexWithinParent(), t = n) : e || r !== t.getChildrenSize() || (i = t.getIndexWithinParent() + 1, t = n)), t.getChildAtIndex(e ? i - 1 : i);
}
function xb(t, e) {
  var r = t.offset;
  return t.type === "element" ? (t = t.getNode(), h5(t, e, r)) : (t = t.getNode(), e && r === 0 || !e && r === t.getTextContentSize() ? (r = e ? t.getPreviousSibling() : t.getNextSibling(), r === null ? h5(t.getParentOrThrow(), e, t.getIndexWithinParent() + (e ? 0 : 1)) : r) : null);
}
function bb(t) {
  return t = (t = Gd(t).event) && t.inputType, t === "insertFromPaste" || t === "insertFromPasteAsQuotation";
}
function gm(t) {
  return !ni(t) && !t.isLastChild() && !t.isInline();
}
function $f(t, e) {
  return t = t._keyToDOMMap.get(e), t === void 0 && ae(75), t;
}
function aM(t, e = 0) {
  if (e !== 0 && ae(1), e = st(), !Se(e) || !Y(t))
    return e;
  let { anchor: r, focus: n } = e, i = r.getNode(), o = n.getNode();
  return vm(i, t) && r.set(t.__key, 0, "element"), vm(o, t) && n.set(t.__key, 0, "element"), e;
}
function vm(t, e) {
  for (t = t.getParent(); t !== null; ) {
    if (t.is(e))
      return !0;
    t = t.getParent();
  }
  return !1;
}
function Gd(t) {
  return t = t._window, t === null && ae(78), t;
}
function io(t) {
  return ni(t) || Y(t) && t.isShadowRoot();
}
function wb(t, e, r, n, i) {
  t = t.__children;
  let o = t.length;
  for (let a = 0; a < o; a++) {
    let s = t[a], l = n.get(s);
    l !== void 0 && l.__parent === e && (Y(l) && wb(l, s, r, n, i), r.has(s) || i.delete(s), n.delete(s));
  }
}
function sM(t, e, r, n) {
  t = t._nodeMap, e = e._nodeMap;
  for (let i of r) {
    let o = e.get(i);
    o === void 0 || o.isAttached() || (t.has(i) || r.delete(i), e.delete(i));
  }
  for (let [i] of n)
    r = e.get(i), r === void 0 || r.isAttached() || (Y(r) && wb(r, i, t, e, n), t.has(i) || n.delete(i), e.delete(i));
}
function p5(t, e) {
  let r = t.__mode, n = t.__format;
  t = t.__style;
  let i = e.__mode, o = e.__format;
  return e = e.__style, (r === null || r === i) && (n === null || n === o) && (t === null || t === e);
}
function m5(t, e) {
  let r = t.mergeWithSibling(e), n = It()._normalizedNodes;
  return n.add(t.__key), n.add(e.__key), r;
}
function Eb(t) {
  if (t.__text === "" && t.isSimpleText() && !t.isUnmergeable())
    t.remove();
  else {
    for (var e; (e = t.getPreviousSibling()) !== null && oe(e) && e.isSimpleText() && !e.isUnmergeable(); )
      if (e.__text === "")
        e.remove();
      else {
        p5(e, t) && (t = m5(e, t));
        break;
      }
    for (var r; (r = t.getNextSibling()) !== null && oe(r) && r.isSimpleText() && !r.isUnmergeable(); )
      if (r.__text === "")
        r.remove();
      else {
        p5(t, r) && m5(t, r);
        break;
      }
  }
}
function g5(t) {
  for (; t.type === "element"; ) {
    var e = t.getNode(), r = t.offset;
    if (r === e.getChildrenSize() ? (e = e.getChildAtIndex(r - 1), r = !0) : (e = e.getChildAtIndex(r), r = !1), oe(e)) {
      t.set(e.__key, r ? e.getTextContentSize() : 0, "text");
      break;
    } else if (!Y(e))
      break;
    t.set(e.__key, r ? e.getChildrenSize() : 0, "element");
  }
}
let Ht = "", yr = "", vi = "", ya, xr, $u, Sb = !1, Lv = !1, Wd, jc = null, ym, xm, Fu, Ms, bm, Bu;
function Vc(t, e) {
  let r = Fu.get(t);
  if (e !== null) {
    let n = Sm(t);
    e.removeChild(n);
  }
  Ms.has(t) || xr._keyToDOMMap.delete(t), Y(r) && (t = r.__children, wm(t, 0, t.length - 1, null)), r !== void 0 && Rv(Bu, $u, Wd, r, "destroyed");
}
function wm(t, e, r, n) {
  for (; e <= r; ++e) {
    let i = t[e];
    i !== void 0 && Vc(i, n);
  }
}
function xl(t, e) {
  t.setProperty("text-align", e);
}
function _b(t, e) {
  t.style.setProperty("padding-inline-start", e === 0 ? "" : 20 * e + "px");
}
function Cb(t, e) {
  t = t.style, e === 0 ? xl(t, "") : e === 1 ? xl(t, "left") : e === 2 ? xl(t, "center") : e === 3 ? xl(t, "right") : e === 4 && xl(t, "justify");
}
function qc(t, e, r) {
  let n = Ms.get(t);
  n === void 0 && ae(60);
  let i = n.createDOM(ya, xr);
  var o = xr._keyToDOMMap;
  if (i["__lexicalKey_" + xr._key] = t, o.set(t, i), oe(n) ? i.setAttribute("data-lexical-text", "true") : Dt(n) && i.setAttribute("data-lexical-decorator", "true"), Y(n)) {
    t = n.__indent, t !== 0 && _b(i, t), t = n.__children;
    var a = t.length;
    if (a !== 0) {
      o = t, --a;
      let s = yr;
      yr = "", Em(o, 0, a, i, null), Nb(n, i), yr = s;
    }
    o = n.__format, o !== 0 && Cb(i, o), Tb(null, t, i), gm(n) && (Ht += `

`, vi += `

`);
  } else
    o = n.getTextContent(), Dt(n) ? (a = n.decorate(xr, ya), a !== null && Db(
      t,
      a
    ), i.contentEditable = "false") : oe(n) && (n.isDirectionless() || (yr += o)), Ht += o, vi += o;
  return e !== null && (r != null ? e.insertBefore(i, r) : (r = e.__lexicalLineBreak, r != null ? e.insertBefore(i, r) : e.appendChild(i))), Rv(Bu, $u, Wd, n, "created"), i;
}
function Em(t, e, r, n, i) {
  let o = Ht;
  for (Ht = ""; e <= r; ++e)
    qc(t[e], n, i);
  n.__lexicalTextContent = Ht, Ht = o + Ht;
}
function v5(t, e) {
  return t = e.get(t[t.length - 1]), ju(t) || Dt(t);
}
function Tb(t, e, r) {
  t = t !== null && (t.length === 0 || v5(t, Fu)), e = e !== null && (e.length === 0 || v5(e, Ms)), t ? e || (e = r.__lexicalLineBreak, e != null && r.removeChild(e), r.__lexicalLineBreak = null) : e && (e = document.createElement("br"), r.__lexicalLineBreak = e, r.appendChild(e));
}
function Nb(t, e) {
  var r = e.__lexicalDir;
  if (e.__lexicalDirTextContent !== yr || r !== jc) {
    let o = yr === "";
    if (o)
      var n = jc;
    else
      n = yr, n = QA.test(n) ? "rtl" : KA.test(n) ? "ltr" : null;
    if (n !== r) {
      let a = e.classList, s = ya.theme;
      var i = r !== null ? s[r] : void 0;
      let l = n !== null ? s[n] : void 0;
      i !== void 0 && (typeof i == "string" && (i = i.split(" "), i = s[r] = i), a.remove(...i)), n === null || o && n === "ltr" ? e.removeAttribute("dir") : (l !== void 0 && (typeof l == "string" && (r = l.split(" "), l = s[n] = r), l !== void 0 && a.add(...l)), e.dir = n), Lv || (t.getWritable().__dir = n);
    }
    jc = n, e.__lexicalDirTextContent = yr, e.__lexicalDir = n;
  }
}
function Al(t, e) {
  var r = Fu.get(t), n = Ms.get(t);
  r !== void 0 && n !== void 0 || ae(61);
  var i = Sb || xm.has(t) || ym.has(t);
  let o = $f(xr, t);
  if (r === n && !i)
    return Y(r) ? (n = o.__lexicalTextContent, n !== void 0 && (Ht += n, vi += n), n = o.__lexicalDirTextContent, n !== void 0 && (yr += n)) : (n = r.getTextContent(), oe(r) && !r.isDirectionless() && (yr += n), vi += n, Ht += n), o;
  if (r !== n && i && Rv(Bu, $u, Wd, n, "updated"), n.updateDOM(r, o, ya))
    return n = qc(t, null, null), e === null && ae(62), e.replaceChild(n, o), Vc(t, null), n;
  if (Y(r) && Y(n)) {
    if (t = n.__indent, t !== r.__indent && _b(o, t), t = n.__format, t !== r.__format && Cb(o, t), t = r.__children, r = n.__children, t !== r || i) {
      var a = t, s = r;
      i = n, e = yr, yr = "";
      let h = Ht;
      Ht = "";
      var l = a.length, u = s.length;
      if (l === 1 && u === 1) {
        var c = a[0];
        if (s = s[0], c === s)
          Al(c, o);
        else {
          var f = Sm(c);
          s = qc(s, null, null), o.replaceChild(s, f), Vc(c, null);
        }
      } else if (l === 0)
        u !== 0 && Em(s, 0, u - 1, o, null);
      else if (u === 0)
        l !== 0 && (c = o.__lexicalLineBreak == null, wm(a, 0, l - 1, c ? null : o), c && (o.textContent = ""));
      else {
        let m = l - 1;
        l = u - 1;
        let g = o.firstChild, S = 0;
        for (u = 0; S <= m && u <= l; ) {
          var d = a[S];
          let b = s[u];
          if (d === b)
            g = Al(b, o).nextSibling, S++, u++;
          else {
            c === void 0 && (c = new Set(a)), f === void 0 && (f = new Set(s));
            let x = f.has(d), v = c.has(b);
            x ? (v ? (d = $f(xr, b), d === g ? g = Al(b, o).nextSibling : (g != null ? o.insertBefore(d, g) : o.appendChild(d), Al(b, o)), S++) : qc(b, o, g), u++) : (g = Sm(d).nextSibling, Vc(d, o), S++);
          }
        }
        c = S > m, f = u > l, c && !f ? (c = s[l + 1], c = c === void 0 ? null : xr.getElementByKey(c), Em(s, u, l, o, c)) : f && !c && wm(a, S, m, o);
      }
      gm(i) && (Ht += `

`), o.__lexicalTextContent = Ht, Ht = h + Ht, Nb(i, o), yr = e, ni(n) || Tb(t, r, o);
    }
    gm(n) && (Ht += `

`, vi += `

`);
  } else
    r = n.getTextContent(), Dt(n) ? (i = n.decorate(
      xr,
      ya
    ), i !== null && Db(t, i)) : oe(n) && !n.isDirectionless() && (yr += r), Ht += r, vi += r;
  return !Lv && ni(n) && n.__cachedText !== vi && (n = n.getWritable(), n.__cachedText = vi), o;
}
function Db(t, e) {
  let r = xr._pendingDecorators, n = xr._decorators;
  if (r === null) {
    if (n[t] === e)
      return;
    r = pb(xr);
  }
  r[t] = e;
}
function Sm(t) {
  return t = bm.get(t), t === void 0 && ae(75), t;
}
let ci = Object.freeze({}), _m = [["keydown", gM], ["mousedown", uM], ["compositionstart", pM], ["compositionend", mM], ["input", hM], ["click", lM], ["cut", ci], ["copy", ci], ["dragstart", ci], ["dragover", ci], ["dragend", ci], ["paste", ci], ["focus", ci], ["blur", ci], ["drop", ci]];
GA && _m.push(["beforeinput", (t, e) => dM(t, e)]);
let zu = 0, kb = 0, Yl = 0, Cm = !1, Tm = !1, Xl = !1, Ml = !1, Ob = [0, 0, "root", 0];
function y5(t, e) {
  return t !== null && t.nodeValue !== null && t.nodeType === 3 && e !== 0 && e !== t.nodeValue.length;
}
function x5(t, e, r) {
  let { anchorNode: n, anchorOffset: i, focusNode: o, focusOffset: a } = t;
  Cm && (Cm = !1, y5(n, i) && y5(o, a)) || Xr(e, () => {
    if (!r)
      qs(null);
    else if (qd(e, n, o)) {
      var s = st();
      if (Se(s)) {
        var l = s.anchor, u = l.getNode();
        if (s.isCollapsed()) {
          t.type === "Range" && t.anchorNode === t.focusNode && (s.dirty = !0);
          var c = Gd(e).event;
          c = c ? c.timeStamp : performance.now();
          let [f, d, h, m] = Ob;
          c < m + 200 && l.offset === d && l.key === h ? s.format = f : l.type === "text" ? s.format = u.getFormat() : l.type === "element" && (s.format = 0);
        } else {
          l = 127, u = !1, c = s.getNodes();
          let f = c.length;
          for (let d = 0; d < f; d++) {
            let h = c[d];
            if (oe(h) && (u = !0, l &= h.getFormat(), l === 0))
              break;
          }
          s.format = u ? l : 0;
        }
      }
      te(e, Hx, void 0);
    }
  });
}
function lM(t, e) {
  Xr(e, () => {
    let r = st(), n = window.getSelection(), i = c0();
    if (Se(r)) {
      let o = r.anchor, a = o.getNode();
      n && o.type === "element" && o.offset === 0 && r.isCollapsed() && !ni(a) && Lo().getChildrenSize() === 1 && a.getTopLevelElementOrThrow().isEmpty() && i !== null && r.is(i) && (n.removeAllRanges(), r.dirty = !0);
    }
    te(e, Ux, t);
  });
}
function uM(t, e) {
  let r = t.target;
  r instanceof Node && Xr(e, () => {
    Dt(l0(r)) || (Tm = !0);
  });
}
function cM(t, e) {
  e.getTargetRanges && (e = e.getTargetRanges()[0]) && t.applyDOMRange(e);
}
function fM(t, e) {
  return t !== e || Y(t) || Y(e) || !t.isToken() || !e.isToken();
}
function dM(t, e) {
  let r = t.inputType;
  r === "deleteCompositionText" || va && bb(e) || r !== "insertCompositionText" && Xr(e, () => {
    let n = st();
    if (r === "deleteContentBackward") {
      if (n === null) {
        var i = c0();
        if (!Se(i))
          return;
        qs(i.clone());
      }
      if (Se(n)) {
        kb === 229 && t.timeStamp < zu + 30 && e.isComposing() && n.anchor.key === n.focus.key ? (Zt(null), zu = 0, setTimeout(() => {
          Xr(e, () => {
            Zt(null);
          });
        }, 30), Se(n) && (i = n.anchor.getNode(), i.markDirty(), n.format = i.getFormat())) : (t.preventDefault(), te(e, Lu, !0));
        return;
      }
    }
    if (Se(n)) {
      i = t.data, n.dirty || !n.isCollapsed() || ni(n.anchor.getNode()) || cM(n, t);
      var o = n.focus, a = n.anchor.getNode();
      if (o = o.getNode(), r === "insertText" || r === "insertTranspose")
        i === `
` ? (t.preventDefault(), te(e, Kl, !1)) : i === `

` ? (t.preventDefault(), te(e, dm, void 0)) : i == null && t.dataTransfer ? (i = t.dataTransfer.getData("text/plain"), t.preventDefault(), n.insertRawText(i)) : i != null && yb(n, i) && (t.preventDefault(), te(e, fs, i));
      else
        switch (t.preventDefault(), r) {
          case "insertFromYank":
          case "insertFromDrop":
          case "insertReplacementText":
            te(e, fs, t);
            break;
          case "insertFromComposition":
            Zt(null), te(
              e,
              fs,
              t
            );
            break;
          case "insertLineBreak":
            Zt(null), te(e, Kl, !1);
            break;
          case "insertParagraph":
            Zt(null), Xl ? (Xl = !1, te(e, Kl, !1)) : te(e, dm, void 0);
            break;
          case "insertFromPaste":
          case "insertFromPasteAsQuotation":
            te(e, Cv, t);
            break;
          case "deleteByComposition":
            fM(a, o) && te(e, hm, void 0);
            break;
          case "deleteByDrag":
          case "deleteByCut":
            te(e, hm, void 0);
            break;
          case "deleteContent":
            te(e, Lu, !1);
            break;
          case "deleteWordBackward":
            te(e, Iu, !0);
            break;
          case "deleteWordForward":
            te(e, Iu, !1);
            break;
          case "deleteHardLineBackward":
          case "deleteSoftLineBackward":
            te(
              e,
              Pu,
              !0
            );
            break;
          case "deleteContentForward":
          case "deleteHardLineForward":
          case "deleteSoftLineForward":
            te(e, Pu, !1);
            break;
          case "formatStrikeThrough":
            te(e, ro, "strikethrough");
            break;
          case "formatBold":
            te(e, ro, "bold");
            break;
          case "formatItalic":
            te(e, ro, "italic");
            break;
          case "formatUnderline":
            te(e, ro, "underline");
            break;
          case "historyUndo":
            te(e, Tv, void 0);
            break;
          case "historyRedo":
            te(e, Nv, void 0);
        }
    }
  });
}
function hM(t, e) {
  t.stopPropagation(), Xr(e, () => {
    var r = st(), n = t.data;
    n != null && Se(r) && yb(r, n) ? (Ml && (Nm(e, n), Ml = !1), te(e, fs, n), n = n.length, va && 1 < n && t.inputType === "insertCompositionText" && !e.isComposing() && (r.anchor.offset -= n), Ud || jd || !e.isComposing() || (zu = 0, Zt(null))) : (vb(!1), Ml && (Nm(e, n || void 0), Ml = !1)), Vr(), r = It(), lb(r);
  });
}
function pM(t, e) {
  Xr(e, () => {
    let r = st();
    if (Se(r) && !e.isComposing()) {
      let n = r.anchor;
      Zt(n.key), (t.timeStamp < zu + 30 || n.type === "element" || !r.isCollapsed() || r.anchor.getNode().getFormat() !== r.format) && te(e, fs, WA);
    }
  });
}
function Nm(t, e) {
  var r = t._compositionKey;
  if (Zt(null), r !== null && e != null) {
    if (e === "") {
      e = at(r), t = Pf(t.getElementByKey(r)), t !== null && t.nodeValue !== null && oe(e) && Mv(e, t.nodeValue, null, null, !0);
      return;
    }
    if (e[e.length - 1] === `
` && (r = st(), Se(r))) {
      e = r.focus, r.anchor.set(e.key, e.offset, e.type), te(t, If, null);
      return;
    }
  }
  vb(!0, e);
}
function mM(t, e) {
  va ? Ml = !0 : Xr(e, () => {
    Nm(e, t.data);
  });
}
function gM(t, e) {
  if (t._lexicalHandled !== !0 && (t._lexicalHandled = !0, zu = t.timeStamp, kb = t.keyCode, !e.isComposing())) {
    var { keyCode: r, shiftKey: n, ctrlKey: i, metaKey: o, altKey: a } = t;
    if (r !== 39 || i || o || a)
      if (r !== 39 || a || n || !i && !o)
        if (r !== 37 || i || o || a)
          if (r !== 37 || a || n || !i && !o)
            if (r !== 38 || i || o)
              if (r !== 40 || i || o)
                if (r === 13 && n)
                  Xl = !0, te(e, If, t);
                else if (r === 32)
                  te(e, Kx, t);
                else if (Cr && i && r === 79)
                  t.preventDefault(), Xl = !0, te(e, Kl, !0);
                else if (r !== 13 || n) {
                  var s = Cr ? a || o ? !1 : r === 8 || r === 72 && i : i || a || o ? !1 : r === 8;
                  s ? r === 8 ? te(e, Yx, t) : (t.preventDefault(), te(e, Lu, !0)) : r === 27 ? te(e, Xx, t) : (s = Cr ? n || a || o ? !1 : r === 46 || r === 68 && i : i || a || o ? !1 : r === 46, s ? r === 46 ? te(e, Zx, t) : (t.preventDefault(), te(e, Lu, !1)) : r === 8 && (Cr ? a : i) ? (t.preventDefault(), te(e, Iu, !0)) : r === 46 && (Cr ? a : i) ? (t.preventDefault(), te(e, Iu, !1)) : Cr && o && r === 8 ? (t.preventDefault(), te(e, Pu, !0)) : Cr && o && r === 46 ? (t.preventDefault(), te(e, Pu, !1)) : r === 66 && !a && (Cr ? o : i) ? (t.preventDefault(), te(e, ro, "bold")) : r === 85 && !a && (Cr ? o : i) ? (t.preventDefault(), te(e, ro, "underline")) : r === 73 && !a && (Cr ? o : i) ? (t.preventDefault(), te(e, ro, "italic")) : r !== 9 || a || i || o ? r === 90 && !n && (Cr ? o : i) ? (t.preventDefault(), te(e, Tv, void 0)) : (s = Cr ? r === 90 && o && n : r === 89 && i || r === 90 && i && n, s ? (t.preventDefault(), te(e, Nv, void 0)) : u0(e._editorState._selection) && (s = n ? !1 : r === 67 ? Cr ? o : i : !1, s ? (t.preventDefault(), te(e, Dv, t)) : (s = n ? !1 : r === 88 ? Cr ? o : i : !1, s && (t.preventDefault(), te(e, kv, t))))) : te(e, Jx, t));
                } else
                  Xl = !1, te(e, If, t);
              else
                te(e, Qx, t);
            else
              te(e, Wx, t);
          else
            te(e, Gx, t);
        else
          te(e, qx, t);
      else
        te(e, Vx, t);
    else
      te(e, jx, t);
    (i || n || a || o) && te(e, ab, t);
  }
}
function Ab(t) {
  let e = t.__lexicalEventHandles;
  return e === void 0 && (e = [], t.__lexicalEventHandles = e), e;
}
let hs = /* @__PURE__ */ new Map();
function Mb() {
  let t = window.getSelection();
  if (t !== null) {
    var e = cb(t.anchorNode);
    if (e !== null) {
      Tm && (Tm = !1, Xr(e, () => {
        var a = c0(), s = t.anchorNode;
        s !== null && (s = s.nodeType, s === 1 || s === 3) && (a = $b(a, t, e), qs(a));
      }));
      var r = Av(e);
      r = r[r.length - 1];
      var n = r._key, i = hs.get(n), o = i || r;
      o !== e && x5(t, o, !1), x5(t, e, !0), e !== r ? hs.set(n, e) : i && hs.delete(n);
    }
  }
}
function vM(t, e) {
  Yl === 0 && t.ownerDocument.addEventListener("selectionchange", Mb), Yl++, t.__lexicalEditor = e;
  let r = Ab(t);
  for (let n = 0; n < _m.length; n++) {
    let [i, o] = _m[n], a = typeof o == "function" ? (s) => {
      e.isEditable() && o(s, e);
    } : (s) => {
      if (e.isEditable())
        switch (i) {
          case "cut":
            return te(e, kv, s);
          case "copy":
            return te(e, Dv, s);
          case "paste":
            return te(e, Cv, s);
          case "dragstart":
            return te(e, tb, s);
          case "dragover":
            return te(e, rb, s);
          case "dragend":
            return te(e, nb, s);
          case "focus":
            return te(e, ib, s);
          case "blur":
            return te(e, ob, s);
          case "drop":
            return te(
              e,
              eb,
              s
            );
        }
    };
    t.addEventListener(i, a), r.push(() => {
      t.removeEventListener(i, a);
    });
  }
}
class ti {
  constructor(e, r, n) {
    this._selection = null, this.key = e, this.offset = r, this.type = n;
  }
  is(e) {
    return this.key === e.key && this.offset === e.offset && this.type === e.type;
  }
  isBefore(e) {
    let r = this.getNode(), n = e.getNode(), i = this.offset;
    if (e = e.offset, Y(r)) {
      var o = r.getDescendantByIndex(i);
      r = o != null ? o : r;
    }
    return Y(n) && (o = n.getDescendantByIndex(e), n = o != null ? o : n), r === n ? i < e : r.isBefore(n);
  }
  getNode() {
    let e = at(this.key);
    return e === null && ae(20), e;
  }
  set(e, r, n) {
    let i = this._selection, o = this.key;
    this.key = e, this.offset = r, this.type = n, Lt || (no() === o && Zt(e), i !== null && (i._cachedNodes = null, i.dirty = !0));
  }
}
function s1(t, e) {
  let r = e.__key, n = t.offset, i = "element";
  if (oe(e))
    i = "text", e = e.getTextContentSize(), n > e && (n = e);
  else if (!Y(e)) {
    var o = e.getNextSibling();
    oe(o) ? (r = o.__key, n = 0) : (o = e.getParent()) && (r = o.__key, n = e.getIndexWithinParent() + 1);
  }
  t.set(r, n, i);
}
function b5(t, e) {
  if (Y(e)) {
    let r = e.getLastDescendant();
    Y(r) || oe(r) ? s1(t, r) : s1(t, e);
  } else
    s1(t, e);
}
function w5(t, e, r) {
  let n = t.getNode(), i = n.getChildAtIndex(t.offset), o = vr(), a = ni(n) ? Rs().append(o) : o;
  o.setFormat(r), i === null ? n.append(a) : i.insertBefore(a), t.is(e) && e.set(o.__key, 0, "text"), t.set(o.__key, 0, "text");
}
function Yi(t, e, r, n) {
  t.key = e, t.offset = r, t.type = n;
}
class Qd {
  constructor(e) {
    this.dirty = !1, this._nodes = e, this._cachedNodes = null;
  }
  is(e) {
    if (!u0(e))
      return !1;
    let r = this._nodes, n = e._nodes;
    return r.size === n.size && Array.from(r).every((i) => n.has(i));
  }
  add(e) {
    this.dirty = !0, this._nodes.add(e), this._cachedNodes = null;
  }
  delete(e) {
    this.dirty = !0, this._nodes.delete(e), this._cachedNodes = null;
  }
  clear() {
    this.dirty = !0, this._nodes.clear(), this._cachedNodes = null;
  }
  has(e) {
    return this._nodes.has(e);
  }
  clone() {
    return new Qd(new Set(this._nodes));
  }
  extract() {
    return this.getNodes();
  }
  insertRawText() {
  }
  insertText() {
  }
  insertNodes(e, r) {
    let n = this.getNodes(), i = n.length;
    var o = n[i - 1];
    if (oe(o))
      o = o.select();
    else {
      let a = o.getIndexWithinParent() + 1;
      o = o.getParentOrThrow().select(a, a);
    }
    for (o.insertNodes(e, r), e = 0; e < i; e++)
      n[e].remove();
    return !0;
  }
  getNodes() {
    var e = this._cachedNodes;
    if (e !== null)
      return e;
    var r = this._nodes;
    e = [];
    for (let n of r)
      r = at(n), r !== null && e.push(r);
    return Lt || (this._cachedNodes = e), e;
  }
  getTextContent() {
    let e = this.getNodes(), r = "";
    for (let n = 0; n < e.length; n++)
      r += e[n].getTextContent();
    return r;
  }
}
function Se(t) {
  return t instanceof Gs;
}
class Kd {
  constructor(e, r, n) {
    this.gridKey = e, this.anchor = r, this.focus = n, this.dirty = !1, this._cachedNodes = null, r._selection = this, n._selection = this;
  }
  is(e) {
    return Iv(e) ? this.gridKey === e.gridKey && this.anchor.is(this.focus) : !1;
  }
  set(e, r, n) {
    this.dirty = !0, this.gridKey = e, this.anchor.key = r, this.focus.key = n, this._cachedNodes = null;
  }
  clone() {
    return new Kd(this.gridKey, this.anchor, this.focus);
  }
  isCollapsed() {
    return !1;
  }
  isBackward() {
    return this.focus.isBefore(this.anchor);
  }
  getCharacterOffsets() {
    return Gc(this);
  }
  extract() {
    return this.getNodes();
  }
  insertRawText() {
  }
  insertText() {
  }
  insertNodes(e, r) {
    var n = this.focus.getNode();
    return n = n.select(0, n.getChildrenSize()), g5(n.anchor), g5(n.focus), n.insertNodes(e, r);
  }
  getShape() {
    var e = at(this.anchor.key);
    e === null && ae(21);
    var r = e.getIndexWithinParent();
    e = e.getParentOrThrow().getIndexWithinParent();
    var n = at(this.focus.key);
    n === null && ae(22);
    var i = n.getIndexWithinParent();
    let o = n.getParentOrThrow().getIndexWithinParent();
    return n = Math.min(r, i), r = Math.max(r, i), i = Math.min(e, o), e = Math.max(e, o), { fromX: Math.min(n, r), fromY: Math.min(i, e), toX: Math.max(n, r), toY: Math.max(
      i,
      e
    ) };
  }
  getNodes() {
    var e = this._cachedNodes;
    if (e !== null)
      return e;
    e = /* @__PURE__ */ new Set();
    let { fromX: r, fromY: n, toX: i, toY: o } = this.getShape();
    var a = at(this.gridKey);
    qb(a) || ae(23), e.add(a), a = a.getChildren();
    for (let u = n; u <= o; u++) {
      var s = a[u];
      e.add(s), Wb(s) || ae(24), s = s.getChildren();
      for (let c = r; c <= i; c++) {
        var l = s[c];
        for (jb(l) || ae(25), e.add(l), l = l.getChildren(); 0 < l.length; ) {
          let f = l.shift();
          e.add(f), Y(f) && l.unshift(...f.getChildren());
        }
      }
    }
    return e = Array.from(e), Lt || (this._cachedNodes = e), e;
  }
  getTextContent() {
    let e = this.getNodes(), r = "";
    for (let n = 0; n < e.length; n++)
      r += e[n].getTextContent();
    return r;
  }
}
function Iv(t) {
  return t instanceof Kd;
}
class Gs {
  constructor(e, r, n) {
    this.anchor = e, this.focus = r, this.dirty = !1, this.format = n, this._cachedNodes = null, e._selection = this, r._selection = this;
  }
  is(e) {
    return Se(e) ? this.anchor.is(e.anchor) && this.focus.is(e.focus) && this.format === e.format : !1;
  }
  isBackward() {
    return this.focus.isBefore(this.anchor);
  }
  isCollapsed() {
    return this.anchor.is(this.focus);
  }
  getNodes() {
    var e = this._cachedNodes;
    if (e !== null)
      return e;
    var r = this.anchor, n = this.focus;
    e = r.getNode();
    let i = n.getNode();
    return Y(e) && (r = e.getDescendantByIndex(r.offset), e = r != null ? r : e), Y(i) && (n = i.getDescendantByIndex(n.offset), i = n != null ? n : i), e = e.is(i) ? Y(e) && (0 < e.getChildrenSize() || e.excludeFromCopy()) ? [] : [e] : e.getNodesBetween(i), Lt || (this._cachedNodes = e), e;
  }
  setTextNodeRange(e, r, n, i) {
    Yi(this.anchor, e.__key, r, "text"), Yi(this.focus, n.__key, i, "text"), this._cachedNodes = null, this.dirty = !0;
  }
  getTextContent() {
    let e = this.getNodes();
    if (e.length === 0)
      return "";
    let r = e[0], n = e[e.length - 1], i = this.anchor.isBefore(this.focus), [o, a] = Gc(this), s = "", l = !0;
    for (let u = 0; u < e.length; u++) {
      let c = e[u];
      if (Y(c) && !c.isInline())
        l || (s += `
`), l = !c.isEmpty();
      else if (l = !1, oe(c)) {
        let f = c.getTextContent();
        c === r ? f = c === n ? o < a ? f.slice(o, a) : f.slice(a, o) : i ? f.slice(o) : f.slice(a) : c === n && (f = i ? f.slice(0, a) : f.slice(0, o)), s += f;
      } else
        !Dt(c) && !ju(c) || c === n && this.isCollapsed() || (s += c.getTextContent());
    }
    return s;
  }
  applyDOMRange(e) {
    let r = It(), n = r.getEditorState()._selection;
    if (e = Lb(e.startContainer, e.startOffset, e.endContainer, e.endOffset, r, n), e !== null) {
      var [i, o] = e;
      Yi(this.anchor, i.key, i.offset, i.type), Yi(
        this.focus,
        o.key,
        o.offset,
        o.type
      ), this._cachedNodes = null;
    }
  }
  clone() {
    let e = this.anchor, r = this.focus;
    return new Gs(new ti(e.key, e.offset, e.type), new ti(r.key, r.offset, r.type), this.format);
  }
  toggleFormat(e) {
    this.format = fb(this.format, e, null), this.dirty = !0;
  }
  hasFormat(e) {
    return (this.format & oa[e]) !== 0;
  }
  insertRawText(e) {
    let r = e.split(/\r?\n/);
    if (r.length === 1)
      this.insertText(e);
    else {
      e = [];
      let n = r.length;
      for (let i = 0; i < n; i++) {
        let o = r[i];
        o !== "" && e.push(vr(o)), i !== n - 1 && e.push(Uu());
      }
      this.insertNodes(e);
    }
  }
  insertText(e) {
    var r = this.anchor, n = this.focus, i = this.isCollapsed() || r.isBefore(n), o = this.format;
    i && r.type === "element" ? w5(r, n, o) : i || n.type !== "element" || w5(n, r, o);
    var a = this.getNodes(), s = a.length, l = i ? n : r;
    n = (i ? r : n).offset;
    var u = l.offset;
    r = a[0], oe(r) || ae(26), i = r.getTextContent().length;
    var c = r.getParentOrThrow(), f = a[s - 1];
    if (this.isCollapsed() && n === i && (r.isSegmented() || r.isToken() || !r.canInsertTextAfter() || !c.canInsertTextAfter() && r.getNextSibling() === null)) {
      var d = r.getNextSibling();
      if ((!oe(d) || mm(d)) && (d = vr(), d.setFormat(o), c.canInsertTextAfter() ? r.insertAfter(d) : c.insertAfter(d)), d.select(0, 0), r = d, e !== "") {
        this.insertText(e);
        return;
      }
    } else if (this.isCollapsed() && n === 0 && (r.isSegmented() || r.isToken() || !r.canInsertTextBefore() || !c.canInsertTextBefore() && r.getPreviousSibling() === null)) {
      if (d = r.getPreviousSibling(), (!oe(d) || mm(d)) && (d = vr(), d.setFormat(o), c.canInsertTextBefore() ? r.insertBefore(d) : c.insertBefore(d)), d.select(), r = d, e !== "") {
        this.insertText(e);
        return;
      }
    } else if (r.isSegmented() && n !== i)
      c = vr(r.getTextContent()), c.setFormat(o), r.replace(c), r = c;
    else if (!(this.isCollapsed() || e === "" || (d = f.getParent(), c.canInsertTextBefore() && c.canInsertTextAfter() && (!Y(d) || d.canInsertTextBefore() && d.canInsertTextAfter())))) {
      this.insertText(""), Rb(this.anchor, this.focus, null), this.insertText(e);
      return;
    }
    if (s === 1)
      if (r.isToken())
        e = vr(e), e.select(), r.replace(e);
      else {
        if (a = r.getFormat(), n === u && a !== o)
          if (r.getTextContent() === "")
            r.setFormat(o);
          else {
            a = vr(e), a.setFormat(o), a.select(), n === 0 ? r.insertBefore(a) : ([s] = r.splitText(n), s.insertAfter(a)), a.isComposing() && this.anchor.type === "text" && (this.anchor.offset -= e.length);
            return;
          }
        r = r.spliceText(n, u - n, e, !0), r.getTextContent() === "" ? r.remove() : this.anchor.type === "text" && (r.isComposing() ? this.anchor.offset -= e.length : this.format = a);
      }
    else {
      o = /* @__PURE__ */ new Set([...r.getParentKeys(), ...f.getParentKeys()]);
      var h = Y(r) ? r : r.getParentOrThrow();
      if (c = Y(f) ? f : f.getParentOrThrow(), d = f, !h.is(c) && c.isInline())
        do
          d = c, c = c.getParentOrThrow();
        while (c.isInline());
      l.type === "text" && (u !== 0 || f.getTextContent() === "") || l.type === "element" && f.getIndexWithinParent() < u ? oe(f) && !f.isToken() && u !== f.getTextContentSize() ? (f.isSegmented() && (l = vr(f.getTextContent()), f.replace(l), f = l), f = f.spliceText(0, u, ""), o.add(f.__key)) : (l = f.getParentOrThrow(), l.canBeEmpty() || l.getChildrenSize() !== 1 ? f.remove() : l.remove()) : o.add(f.__key), l = c.getChildren(), u = new Set(a), f = h.is(c), h = h.isInline() && r.getNextSibling() === null ? h : r;
      for (let m = l.length - 1; 0 <= m; m--) {
        let g = l[m];
        if (g.is(r) || Y(g) && g.isParentOf(r))
          break;
        g.isAttached() && (!u.has(g) || g.is(d) ? f || h.insertAfter(g) : g.remove());
      }
      if (!f)
        for (l = c, u = null; l !== null; )
          f = l.getChildren(), c = f.length, (c === 0 || f[c - 1].is(u)) && (o.delete(l.__key), u = l), l = l.getParent();
      for (r.isToken() ? n === i ? r.select() : (e = vr(e), e.select(), r.replace(e)) : (r = r.spliceText(n, i - n, e, !0), r.getTextContent() === "" ? r.remove() : r.isComposing() && this.anchor.type === "text" && (this.anchor.offset -= e.length)), e = 1; e < s; e++)
        r = a[e], o.has(r.__key) || r.remove();
    }
  }
  removeText() {
    this.insertText("");
  }
  formatText(e) {
    if (this.isCollapsed())
      this.toggleFormat(e), Zt(null);
    else {
      var r = this.getNodes(), n = [];
      for (var i of r)
        oe(i) && n.push(i);
      var o = n.length;
      if (o === 0)
        this.toggleFormat(e), Zt(null);
      else {
        i = this.anchor;
        var a = this.focus, s = this.isBackward();
        r = s ? a : i, i = s ? i : a;
        var l = 0, u = n[0];
        if (a = r.type === "element" ? 0 : r.offset, r.type === "text" && a === u.getTextContentSize() && (l = 1, u = n[1], a = 0), u != null) {
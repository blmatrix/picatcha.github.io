window.Swipe = function (l, m) {
    if (!l) return null; this.options = m || {}; this.index = this.options.startSlide || 0; this.speed = this.options.speed || 400; this.callback = this.options.callback || function () { }; this.delay = this.options.auto || 3E3; this.container = l; this.element = this.container.children[0]; this.container.style.overflow = "hidden"; this.element.style.listStyle = "none"; this.setup(); this.begin(); this.element.addEventListener && (this.element.addEventListener("touchstart", this, !1), this.element.addEventListener("touchmove",
this, !1), this.element.addEventListener("touchend", this, !1), this.element.addEventListener("webkitTransitionEnd", this, !1), this.element.addEventListener("msTransitionEnd", this, !1), this.element.addEventListener("oTransitionEnd", this, !1), this.element.addEventListener("transitionend", this, !1), window.addEventListener("resize", this, !1))
};
Swipe.prototype = { setup: function () {
    this.slides = this.element.children; this.length = this.slides.length; if (2 > this.length) return null; this.width = this.container.getBoundingClientRect().width; if (!this.width) return null; this.container.style.visibility = "hidden"; this.element.style.width = this.slides.length * this.width + "px"; for (var l = this.slides.length; l--; ) { var m = this.slides[l]; m.style.width = this.width + "px"; m.style.display = "table-cell"; m.style.verticalAlign = "top" } this.slide(this.index, 0); this.container.style.visibility =
"visible"
}, slide: function (l, m) { var v = this.element.style; v.webkitTransitionDuration = v.MozTransitionDuration = v.msTransitionDuration = v.OTransitionDuration = v.transitionDuration = m + "ms"; v.webkitTransform = "translate3d(" + -(l * this.width) + "px,0,0)"; v.msTransform = v.MozTransform = v.OTransform = "translateX(" + -(l * this.width) + "px)"; this.index = l }, getPos: function () { return this.index }, prev: function (l) { this.delay = l || 0; clearTimeout(this.interval); this.index && this.slide(this.index - 1, this.speed) }, next: function (l) {
    this.delay =
l || 0; clearTimeout(this.interval); this.index < this.length - 1 ? this.slide(this.index + 1, this.speed) : this.slide(0, this.speed)
}, begin: function () { var l = this; this.interval = this.delay ? setTimeout(function () { l.next(l.delay) }, this.delay) : 0 }, stop: function () { this.delay = 0; clearTimeout(this.interval) }, resume: function () { this.delay = this.options.auto || 0; this.begin() }, handleEvent: function (l) {
    switch (l.type) {
        case "touchstart": this.onTouchStart(l); break; case "touchmove": this.onTouchMove(l); break; case "touchend": this.onTouchEnd(l);
            break; case "webkitTransitionEnd": case "msTransitionEnd": case "oTransitionEnd": case "transitionend": this.transitionEnd(l); break; case "resize": this.setup()
    } 
}, transitionEnd: function (l) { this.delay && this.begin(); this.callback(l, this.index, this.slides[this.index]) }, onTouchStart: function (l) { this.start = { pageX: l.touches[0].pageX, pageY: l.touches[0].pageY, time: Number(new Date) }; this.isScrolling = void 0; this.deltaX = 0; this.element.style.webkitTransitionDuration = 0 }, onTouchMove: function (l) {
    1 < l.touches.length || l.scale &&
1 !== l.scale || (this.deltaX = l.touches[0].pageX - this.start.pageX, "undefined" == typeof this.isScrolling && (this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(l.touches[0].pageY - this.start.pageY))), this.isScrolling || (l.preventDefault(), clearTimeout(this.interval), this.deltaX /= !this.index && 0 < this.deltaX || this.index == this.length - 1 && 0 > this.deltaX ? Math.abs(this.deltaX) / this.width + 1 : 1, this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)"))
}, onTouchEnd: function (l) {
    l =
250 > Number(new Date) - this.start.time && 20 < Math.abs(this.deltaX) || Math.abs(this.deltaX) > this.width / 2; var m = !this.index && 0 < this.deltaX || this.index == this.length - 1 && 0 > this.deltaX; this.isScrolling || this.slide(this.index + (l && !m ? 0 > this.deltaX ? 1 : -1 : 0), this.speed)
} 
};
(function (l, m) {
    function v(a) { return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1 } function t(a) {
        if (!fa[a]) {
            var b = p.body, e = c("<" + a + ">").appendTo(b), d = e.css("display"); e.remove(); if ("none" === d || "" === d) I || (I = p.createElement("iframe"), I.frameBorder = I.width = I.height = 0), b.appendChild(I), N && I.createElement || (N = (I.contentWindow || I.contentDocument).document, N.write(("CSS1Compat" === p.compatMode ? "<!doctype html>" : "") + "<html><body>"), N.close()), e = N.createElement(a), N.body.appendChild(e), d = c.css(e,
"display"), b.removeChild(I); fa[a] = d
        } return fa[a]
    } function u(a, b) { var e = {}; c.each(qa.concat.apply([], qa.slice(0, b)), function () { e[this] = a }); return e } function O() { Y = m } function w() { setTimeout(O, 0); return Y = c.now() } function G() { try { return new l.XMLHttpRequest } catch (a) { } } function H(a, b, e, d) { if (c.isArray(b)) c.each(b, function (b, f) { e || cb.test(a) ? d(a, f) : H(a + "[" + ("object" == typeof f || c.isArray(f) ? b : "") + "]", f, e, d) }); else if (e || null == b || "object" != typeof b) d(a, b); else for (var f in b) H(a + "[" + f + "]", b[f], e, d) } function Z(a,
b) { var e, d, f = c.ajaxSettings.flatOptions || {}; for (e in b) b[e] !== m && ((f[e] ? a : d || (d = {}))[e] = b[e]); d && c.extend(!0, a, d) } function V(a, b, c, d, f, g) { f = f || b.dataTypes[0]; g = g || {}; g[f] = !0; f = a[f]; for (var h = 0, k = f ? f.length : 0, n = a === ga, x; h < k && (n || !x); h++) x = f[h](b, c, d), "string" == typeof x && (!n || g[x] ? x = m : (b.dataTypes.unshift(x), x = V(a, b, c, d, x, g))); !n && x || g["*"] || (x = V(a, b, c, d, "*", g)); return x } function ra(a) {
    return function (b, e) {
        "string" != typeof b && (e = b, b = "*"); if (c.isFunction(e)) for (var d = b.toLowerCase().split(sa), f = 0, g =
d.length, h, k; f < g; f++) h = d[f], (k = /^\+/.test(h)) && (h = h.substr(1) || "*"), h = a[h] = a[h] || [], h[k ? "unshift" : "push"](e)
    } 
} function ta(a, b, e) {
    var d = "width" === b ? a.offsetWidth : a.offsetHeight, f = "width" === b ? db : eb; if (0 < d) return "border" !== e && c.each(f, function () { e || (d -= parseFloat(c.css(a, "padding" + this)) || 0); "margin" === e ? d += parseFloat(c.css(a, e + this)) || 0 : d -= parseFloat(c.css(a, "border" + this + "Width")) || 0 }), d + "px"; d = P(a, b, b); if (0 > d || null == d) d = a.style[b] || 0; d = parseFloat(d) || 0; e && c.each(f, function () {
        d += parseFloat(c.css(a,
"padding" + this)) || 0; "padding" !== e && (d += parseFloat(c.css(a, "border" + this + "Width")) || 0); "margin" === e && (d += parseFloat(c.css(a, e + this)) || 0)
    }); return d + "px"
} function fb(a, b) { b.src ? c.ajax({ url: b.src, async: !1, dataType: "script" }) : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(gb, "/*$0*/")); b.parentNode && b.parentNode.removeChild(b) } function ua(a) {
    var b = (a.nodeName || "").toLowerCase(); "input" === b ? va(a) : "script" !== b && "undefined" != typeof a.getElementsByTagName && c.grep(a.getElementsByTagName("input"),
va)
} function va(a) { if ("checkbox" === a.type || "radio" === a.type) a.defaultChecked = a.checked } function aa(a) { return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : [] } function wa(a, b) {
    var e; if (1 === b.nodeType) {
        b.clearAttributes && b.clearAttributes(); b.mergeAttributes && b.mergeAttributes(a); e = b.nodeName.toLowerCase(); if ("object" === e) b.outerHTML = a.outerHTML; else if ("input" !== e || "checkbox" !== a.type && "radio" !== a.type) if ("option" ===
e) b.selected = a.defaultSelected; else { if ("input" === e || "textarea" === e) b.defaultValue = a.defaultValue } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value); b.removeAttribute(c.expando)
    } 
} function xa(a, b) {
    if (1 === b.nodeType && c.hasData(a)) {
        var e, d, f; d = c._data(a); var g = c._data(b, d), h = d.events; if (h) for (e in delete g.handle, g.events = {}, h) for (d = 0, f = h[e].length; d < f; d++) c.event.add(b, e + (h[e][d].namespace ? "." : "") + h[e][d].namespace, h[e][d], h[e][d].data); g.data && (g.data = c.extend({},
g.data))
    } 
} function hb(a, b) { return c.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a } function ya(a) { var b = za.split(" "); a = a.createDocumentFragment(); if (a.createElement) for (; b.length; ) a.createElement(b.pop()); return a } function Aa(a, b, e) {
    b = b || 0; if (c.isFunction(b)) return c.grep(a, function (a, c) { return !!b.call(a, c, a) === e }); if (b.nodeType) return c.grep(a, function (a, c) { return a === b === e }); if ("string" == typeof b) {
        var d = c.grep(a, function (a) {
            return 1 ===
a.nodeType
        }); if (ib.test(b)) return c.filter(b, d, !e); b = c.filter(b, d)
    } return c.grep(a, function (a, d) { return 0 <= c.inArray(a, b) === e })
} function Ba(a) { return !a || !a.parentNode || 11 === a.parentNode.nodeType } function ba() { return !0 } function J() { return !1 } function Ca(a, b, e) { var d = b + "defer", f = b + "queue", g = b + "mark", h = c._data(a, d); !h || "queue" !== e && c._data(a, f) || "mark" !== e && c._data(a, g) || setTimeout(function () { c._data(a, f) || c._data(a, g) || (c.removeData(a, d, !0), h.fire()) }, 0) } function ha(a) {
    for (var b in a) if (("data" !== b ||
!c.isEmptyObject(a[b])) && "toJSON" !== b) return !1; return !0
} function Da(a, b, e) { if (e === m && 1 === a.nodeType) if (e = "data-" + b.replace(jb, "-$1").toLowerCase(), e = a.getAttribute(e), "string" == typeof e) { try { e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : c.isNumeric(e) ? parseFloat(e) : kb.test(e) ? c.parseJSON(e) : e } catch (d) { } c.data(a, b, e) } else e = m; return e } function lb(a) { var b = Ea[a] = {}, c, d; a = a.split(/\s+/); c = 0; for (d = a.length; c < d; c++) b[a[c]] = !0; return b } var p = l.document, mb = l.navigator, nb = l.location, c = function () {
    function a() {
        if (!b.isReady) {
            try { p.documentElement.doScroll("left") } catch (c) {
                setTimeout(a,
1); return
            } b.ready()
        } 
    } var b = function (a, c) { return new b.fn.init(a, c, f) }, c = l.jQuery, d = l.$, f, g = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, h = /\S/, k = /^\s+/, n = /\s+$/, x = /\d/, M = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, r = /^[\],:{}\s]*$/, A = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, q = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ob = /(?:^|:|,)(?:\s*\[)+/g, t = /(webkit)[ \/]([\w.]+)/, u = /(opera)(?:.*version)?[ \/]([\w.]+)/, D = /(msie) ([\w.]+)/, w = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, y = /^-ms-/, G =
function (a, b) { return (b + "").toUpperCase() }, B = mb.userAgent, T, W, pb = Object.prototype.toString, ja = Object.prototype.hasOwnProperty, ka = Array.prototype.push, X = Array.prototype.slice, Fa = String.prototype.trim, Ga = Array.prototype.indexOf, Ha = {}; b.fn = b.prototype = { constructor: b, init: function (a, c, e) {
    var d, f; if (!a) return this; if (a.nodeType) return this.context = this[0] = a, this.length = 1, this; if ("body" === a && !c && p.body) return this.context = p, this[0] = p.body, this.selector = a, this.length = 1, this; if ("string" == typeof a) {
        "<" !== a.charAt(0) ||
">" !== a.charAt(a.length - 1) || 3 > a.length ? d = g.exec(a) : d = [null, a, null]; if (d && (d[1] || !c)) { if (d[1]) return f = (c = c instanceof b ? c[0] : c) ? c.ownerDocument || c : p, (e = M.exec(a)) ? b.isPlainObject(c) ? (a = [p.createElement(e[1])], b.fn.attr.call(a, c, !0)) : a = [f.createElement(e[1])] : (e = b.buildFragment([d[1]], [f]), a = (e.cacheable ? b.clone(e.fragment) : e.fragment).childNodes), b.merge(this, a); if ((c = p.getElementById(d[2])) && c.parentNode) { if (c.id !== d[2]) return e.find(a); this.length = 1; this[0] = c } this.context = p; this.selector = a; return this } return !c ||
c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
    } if (b.isFunction(a)) return e.ready(a); a.selector !== m && (this.selector = a.selector, this.context = a.context); return b.makeArray(a, this)
}, selector: "", jquery: "1.7", length: 0, size: function () { return this.length }, toArray: function () { return X.call(this, 0) }, get: function (a) { return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a] }, pushStack: function (a, c, e) {
    var d = this.constructor(); b.isArray(a) ? ka.apply(d, a) : b.merge(d, a); d.prevObject = this; d.context = this.context;
    "find" === c ? d.selector = this.selector + (this.selector ? " " : "") + e : c && (d.selector = this.selector + "." + c + "(" + e + ")"); return d
}, each: function (a, c) { return b.each(this, a, c) }, ready: function (a) { b.bindReady(); T.add(a); return this }, eq: function (a) { return -1 === a ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(X.apply(this, arguments), "slice", X.call(arguments).join(",")) }, map: function (a) {
    return this.pushStack(b.map(this, function (b,
c) { return a.call(b, c, b) }))
}, end: function () { return this.prevObject || this.constructor(null) }, push: ka, sort: [].sort, splice: [].splice
}; b.fn.init.prototype = b.fn; b.extend = b.fn.extend = function () {
    var a, c, e, d, f, B, g = arguments[0] || {}, h = 1, T = arguments.length, k = !1; "boolean" == typeof g && (k = g, g = arguments[1] || {}, h = 2); "object" != typeof g && !b.isFunction(g) && (g = {}); for (T === h && (g = this, --h); h < T; h++) if (null != (a = arguments[h])) for (c in a) e = g[c], d = a[c], g !== d && (k && d && (b.isPlainObject(d) || (f = b.isArray(d))) ? (f ? (f = !1, B = e && b.isArray(e) ?
e : []) : B = e && b.isPlainObject(e) ? e : {}, g[c] = b.extend(k, B, d)) : d !== m && (g[c] = d)); return g
}; b.extend({ noConflict: function (a) { l.$ === b && (l.$ = d); a && l.jQuery === b && (l.jQuery = c); return b }, isReady: !1, readyWait: 1, holdReady: function (a) { a ? b.readyWait++ : b.ready(!0) }, ready: function (a) { if (!0 === a && ! --b.readyWait || !0 !== a && !b.isReady) { if (!p.body) return setTimeout(b.ready, 1); b.isReady = !0; !0 !== a && 0 < --b.readyWait || (T.fireWith(p, [b]), b.fn.trigger && b(p).trigger("ready").unbind("ready")) } }, bindReady: function () {
    if (!T) {
        T = b.Callbacks("once memory");
        if ("complete" === p.readyState) return setTimeout(b.ready, 1); if (p.addEventListener) p.addEventListener("DOMContentLoaded", W, !1), l.addEventListener("load", b.ready, !1); else if (p.attachEvent) { p.attachEvent("onreadystatechange", W); l.attachEvent("onload", b.ready); var c = !1; try { c = null == l.frameElement } catch (e) { } p.documentElement.doScroll && c && a() } 
    } 
}, isFunction: function (a) { return "function" === b.type(a) }, isArray: Array.isArray || function (a) { return "array" === b.type(a) }, isWindow: function (a) {
    return a && "object" == typeof a &&
"setInterval" in a
}, isNumeric: function (a) { return null != a && x.test(a) && !isNaN(a) }, type: function (a) { return null == a ? String(a) : Ha[pb.call(a)] || "object" }, isPlainObject: function (a) { if (!a || "object" !== b.type(a) || a.nodeType || b.isWindow(a)) return !1; try { if (a.constructor && !ja.call(a, "constructor") && !ja.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } for (var e in a); return e === m || ja.call(a, e) }, isEmptyObject: function (a) { for (var b in a) return !1; return !0 }, error: function (a) { throw a; }, parseJSON: function (a) {
    if ("string" !=
typeof a || !a) return null; a = b.trim(a); if (l.JSON && l.JSON.parse) return l.JSON.parse(a); if (r.test(a.replace(A, "@").replace(q, "]").replace(ob, ""))) return (new Function("return " + a))(); b.error("Invalid JSON: " + a)
}, parseXML: function (a) { var c, e; try { l.DOMParser ? (e = new DOMParser, c = e.parseFromString(a, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a)) } catch (d) { c = m } c && c.documentElement && !c.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + a); return c }, noop: function () { },
    globalEval: function (a) { a && h.test(a) && (l.execScript || function (a) { l.eval.call(l, a) })(a) }, camelCase: function (a) { return a.replace(y, "ms-").replace(v, G) }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase() }, each: function (a, c, e) { var d, f = 0, B = a.length, g = B === m || b.isFunction(a); if (e) if (g) for (d in a) { if (!1 === c.apply(a[d], e)) break } else for (; f < B && !1 !== c.apply(a[f++], e); ); else if (g) for (d in a) { if (!1 === c.call(a[d], d, a[d])) break } else for (; f < B && !1 !== c.call(a[f], f, a[f++]); ); return a },
    trim: Fa ? function (a) { return null == a ? "" : Fa.call(a) } : function (a) { return null == a ? "" : (a + "").replace(k, "").replace(n, "") }, makeArray: function (a, c) { var e = c || []; if (null != a) { var d = b.type(a); null == a.length || "string" === d || "function" === d || "regexp" === d || b.isWindow(a) ? ka.call(e, a) : b.merge(e, a) } return e }, inArray: function (a, b, c) { var e; if (b) { if (Ga) return Ga.call(b, a, c); e = b.length; for (c = c ? 0 > c ? Math.max(0, e + c) : c : 0; c < e; c++) if (c in b && b[c] === a) return c } return -1 }, merge: function (a, b) {
        var c = a.length, e = 0; if ("number" == typeof b.length) for (var d =
b.length; e < d; e++) a[c++] = b[e]; else for (; b[e] !== m; ) a[c++] = b[e++]; a.length = c; return a
    }, grep: function (a, b, c) { var e = [], d; c = !!c; for (var f = 0, B = a.length; f < B; f++) d = !!b(a[f], f), c !== d && e.push(a[f]); return e }, map: function (a, c, e) { var d, f, B = [], g = 0, h = a.length; if (a instanceof b || h !== m && "number" == typeof h && (0 < h && a[0] && a[h - 1] || 0 === h || b.isArray(a))) for (; g < h; g++) d = c(a[g], g, e), null != d && (B[B.length] = d); else for (f in a) d = c(a[f], f, e), null != d && (B[B.length] = d); return B.concat.apply([], B) }, guid: 1, proxy: function (a, c) {
        if ("string" ==
typeof c) { var e = a[c]; c = a; a = e } if (!b.isFunction(a)) return m; var d = X.call(arguments, 2), e = function () { return a.apply(c, d.concat(X.call(arguments))) }; e.guid = a.guid = a.guid || e.guid || b.guid++; return e
    }, access: function (a, c, e, d, f, B) { var g = a.length; if ("object" == typeof c) { for (var h in c) b.access(a, h, c[h], d, f, e); return a } if (e !== m) { d = !B && d && b.isFunction(e); for (h = 0; h < g; h++) f(a[h], c, d ? e.call(a[h], h, f(a[h], c)) : e, B); return a } return g ? f(a[0], c) : m }, now: function () { return (new Date).getTime() }, uaMatch: function (a) {
        a = a.toLowerCase();
        a = t.exec(a) || u.exec(a) || D.exec(a) || 0 > a.indexOf("compatible") && w.exec(a) || []; return { browser: a[1] || "", version: a[2] || "0"}
    }, sub: function () { function a(b, c) { return new a.fn.init(b, c) } b.extend(!0, a, this); a.superclass = this; a.fn = a.prototype = this(); a.fn.constructor = a; a.sub = this.sub; a.fn.init = function (e, d) { d && d instanceof b && !(d instanceof a) && (d = a(d)); return b.fn.init.call(this, e, d, c) }; a.fn.init.prototype = a.fn; var c = a(p); return a }, browser: {}
}); b.each("Boolean Number String Function Array Date RegExp Object".split(" "),
function (a, b) { Ha["[object " + b + "]"] = b.toLowerCase() }); B = b.uaMatch(B); B.browser && (b.browser[B.browser] = !0, b.browser.version = B.version); b.browser.webkit && (b.browser.safari = !0); h.test("\ufffd") && (k = /^[\s\xA0]+/, n = /[\s\xA0]+$/); f = b(p); p.addEventListener ? W = function () { p.removeEventListener("DOMContentLoaded", W, !1); b.ready() } : p.attachEvent && (W = function () { "complete" === p.readyState && (p.detachEvent("onreadystatechange", W), b.ready()) }); "function" == typeof define && define.amd && define.amd.jQuery && define("jquery",
[], function () { return b }); return b
} (), Ea = {}; c.Callbacks = function (a) {
    a = a ? Ea[a] || lb(a) : {}; var b = [], e = [], d, f, g, h, k, n = function (e) { var d, f, g, h; d = 0; for (f = e.length; d < f; d++) g = e[d], h = c.type(g), "array" === h ? n(g) : "function" !== h || a.unique && l.has(g) || b.push(g) }, x = function (c, n) { n = n || []; d = !a.memory || [c, n]; f = !0; k = g || 0; g = 0; for (h = b.length; b && k < h; k++) if (!1 === b[k].apply(c, n) && a.stopOnFalse) { d = !0; break } f = !1; b && (a.once ? !0 === d ? l.disable() : b = [] : e && e.length && (d = e.shift(), l.fireWith(d[0], d[1]))) }, l = { add: function () {
        if (b) {
            var a =
b.length; n(arguments); f ? h = b.length : d && !0 !== d && (g = a, x(d[0], d[1]))
        } return this
    }, remove: function () { if (b) for (var c = arguments, e = 0, d = c.length; e < d; e++) for (var g = 0; g < b.length && (c[e] !== b[g] || (f && g <= h && (h--, g <= k && k--), b.splice(g--, 1), !a.unique)); g++); return this }, has: function (a) { if (b) for (var c = 0, e = b.length; c < e; c++) if (a === b[c]) return !0; return !1 }, empty: function () { b = []; return this }, disable: function () { b = e = d = m; return this }, disabled: function () { return !b }, lock: function () { e = m; d && !0 !== d || l.disable(); return this }, locked: function () { return !e },
        fireWith: function (b, c) { e && (f ? a.once || e.push([b, c]) : (!a.once || !d) && x(b, c)); return this }, fire: function () { l.fireWith(this, arguments); return this }, fired: function () { return !!d } 
    }; return l
}; var la = [].slice; c.extend({ Deferred: function (a) {
    var b = c.Callbacks("once memory"), e = c.Callbacks("once memory"), d = c.Callbacks("memory"), f = "pending", g = { resolve: b, reject: e, notify: d }, h = { done: b.add, fail: e.add, progress: d.add, state: function () { return f }, isResolved: b.fired, isRejected: e.fired, then: function (a, b, c) {
        k.done(a).fail(b).progress(c);
        return this
    }, always: function () { return k.done.apply(k, arguments).fail.apply(k, arguments) }, pipe: function (a, b, e) { return c.Deferred(function (d) { c.each({ done: [a, "resolve"], fail: [b, "reject"], progress: [e, "notify"] }, function (a, b) { var e = b[0], f = b[1], g; c.isFunction(e) ? k[a](function () { (g = e.apply(this, arguments)) && c.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[f + "With"](this === k ? d : this, [g]) }) : k[a](d[f]) }) }).promise() }, promise: function (a) { if (null == a) a = h; else for (var b in h) a[b] = h[b]; return a } 
    },
k = h.promise({}), n; for (n in g) k[n] = g[n].fire, k[n + "With"] = g[n].fireWith; k.done(function () { f = "resolved" }, e.disable, d.lock).fail(function () { f = "rejected" }, b.disable, d.lock); a && a.call(k, k); return k
}, when: function (a) {
    function b(a) { return function (b) { h[a] = 1 < arguments.length ? la.call(arguments, 0) : b; n.notifyWith(x, h) } } function e(a) { return function (b) { d[a] = 1 < arguments.length ? la.call(arguments, 0) : b; --k || n.resolveWith(n, d) } } var d = la.call(arguments, 0), f = 0, g = d.length, h = Array(g), k = g, n = 1 >= g && a && c.isFunction(a.promise) ?
a : c.Deferred(), x = n.promise(); if (1 < g) { for (; f < g; f++) d[f] && d[f].promise && c.isFunction(d[f].promise) ? d[f].promise().then(e(f), n.reject, b(f)) : --k; k || n.resolveWith(n, d) } else n !== a && n.resolveWith(n, g ? [a] : []); return x
} 
}); c.support = function () {
    var a = p.createElement("div"), b = p.documentElement, e, d, f, g, h, k, n, x, l; a.setAttribute("className", "t"); a.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>"; e = a.getElementsByTagName("*"); d = a.getElementsByTagName("a")[0];
    if (!e || !e.length || !d) return {}; f = p.createElement("select"); g = f.appendChild(p.createElement("option")); e = a.getElementsByTagName("input")[0]; k = { leadingWhitespace: 3 === a.firstChild.nodeType, tbody: !a.getElementsByTagName("tbody").length, htmlSerialize: !!a.getElementsByTagName("link").length, style: /top/.test(d.getAttribute("style")), hrefNormalized: "/a" === d.getAttribute("href"), opacity: /^0.55/.test(d.style.opacity), cssFloat: !!d.style.cssFloat, unknownElems: !!a.getElementsByTagName("nav").length, checkOn: "on" ===
e.value, optSelected: g.selected, getSetAttribute: "t" !== a.className, enctype: !!p.createElement("form").enctype, submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0
    }; e.checked = !0; k.noCloneChecked = e.cloneNode(!0).checked; f.disabled = !0; k.optDisabled = !g.disabled; try { delete a.test } catch (m) { k.deleteExpando = !1 } !a.addEventListener && a.attachEvent && a.fireEvent && (a.attachEvent("onclick", function () {
        k.noCloneEvent =
!1
    }), a.cloneNode(!0).fireEvent("onclick")); e = p.createElement("input"); e.value = "t"; e.setAttribute("type", "radio"); k.radioValue = "t" === e.value; e.setAttribute("checked", "checked"); a.appendChild(e); d = p.createDocumentFragment(); d.appendChild(a.lastChild); k.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked; a.innerHTML = ""; a.style.width = a.style.paddingLeft = "1px"; n = p.getElementsByTagName("body")[0]; x = p.createElement(n ? "div" : "body"); d = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" };
    n && c.extend(d, { position: "absolute", left: "-999px", top: "-999px" }); for (l in d) x.style[l] = d[l]; x.appendChild(a); b = n || b; b.insertBefore(x, b.firstChild); k.appendChecked = e.checked; k.boxModel = 2 === a.offsetWidth; "zoom" in a.style && (a.style.display = "inline", a.style.zoom = 1, k.inlineBlockNeedsLayout = 2 === a.offsetWidth, a.style.display = "", a.innerHTML = "<div style='width:4px;'></div>", k.shrinkWrapBlocks = 2 !== a.offsetWidth); a.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
    d = a.getElementsByTagName("td"); e = 0 === d[0].offsetHeight; d[0].style.display = ""; d[1].style.display = "none"; k.reliableHiddenOffsets = e && 0 === d[0].offsetHeight; a.innerHTML = ""; p.defaultView && p.defaultView.getComputedStyle && (h = p.createElement("div"), h.style.width = "0", h.style.marginRight = "0", a.appendChild(h), k.reliableMarginRight = 0 === (parseInt((p.defaultView.getComputedStyle(h, null) || { marginRight: 0 }).marginRight, 10) || 0)); if (a.attachEvent) for (l in { submit: 1, change: 1, focusin: 1 }) h = "on" + l, (e = h in a) || (a.setAttribute(h,
"return;"), e = "function" == typeof a[h]), k[l + "Bubbles"] = e; c(function () {
    var a, b, e, d, f; n = p.getElementsByTagName("body")[0]; !n || (a = p.createElement("div"), a.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", n.insertBefore(a, n.firstChild), x = p.createElement("div"), x.style.cssText = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;visibility:hidden;border:0;", x.innerHTML = "<div style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;'><div></div></div><table style='position:absolute;top:0;left:0;width:1px;height:1px;margin:0;border:5px solid #000;padding:0;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>",
a.appendChild(x), b = x.firstChild, e = b.firstChild, d = b.nextSibling.firstChild.firstChild, f = { doesNotAddBorder: 5 !== e.offsetTop, doesAddBorderForTableAndCells: 5 === d.offsetTop }, e.style.position = "fixed", e.style.top = "20px", f.fixedPosition = 20 === e.offsetTop || 15 === e.offsetTop, e.style.position = e.style.top = "", b.style.overflow = "hidden", b.style.position = "relative", f.subtractsBorderForOverflowNotVisible = -5 === e.offsetTop, f.doesNotIncludeMarginInBodyOffset = 1 !== n.offsetTop, n.removeChild(a), x = null, c.extend(k, f))
}); x.innerHTML =
""; b.removeChild(x); x = d = f = g = n = h = a = e = null; return k
} (); c.boxModel = c.support.boxModel; var kb = /^(?:\{.*\}|\[.*\])$/, jb = /([A-Z])/g; c.extend({ cache: {}, uuid: 0, expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (a) { a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando]; return !!a && !ha(a) }, data: function (a, b, e, d) {
    if (c.acceptData(a)) {
        var f, g, h = "string" == typeof b, k = (f = a.nodeType) ? c.cache : a, n = f ? a[c.expando] : a[c.expando] &&
c.expando, l = "events" === b; if (n && k[n] && (l || d || k[n].data) || !h || e !== m) { n || (f ? a[c.expando] = n = ++c.uuid : n = c.expando); k[n] || (k[n] = {}, f || (k[n].toJSON = c.noop)); if ("object" == typeof b || "function" == typeof b) d ? k[n] = c.extend(k[n], b) : k[n].data = c.extend(k[n].data, b); a = f = k[n]; d || (f.data || (f.data = {}), f = f.data); e !== m && (f[c.camelCase(b)] = e); if (l && !f[b]) return a.events; h ? (g = f[b], null == g && (g = f[c.camelCase(b)])) : g = f; return g } 
    } 
}, removeData: function (a, b, e) {
    if (c.acceptData(a)) {
        var d, f, g, h = a.nodeType, k = h ? c.cache : a, n = h ? a[c.expando] :
c.expando; if (k[n]) { if (b && (d = e ? k[n] : k[n].data)) { c.isArray(b) || (b in d ? b = [b] : (b = c.camelCase(b), b in d ? b = [b] : b = b.split(" "))); f = 0; for (g = b.length; f < g; f++) delete d[b[f]]; if (!(e ? ha : c.isEmptyObject)(d)) return } if (!e && (delete k[n].data, !ha(k[n]))) return; c.support.deleteExpando || !k.setInterval ? delete k[n] : k[n] = null; h && (c.support.deleteExpando ? delete a[c.expando] : a.removeAttribute ? a.removeAttribute(c.expando) : a[c.expando] = null) } 
    } 
}, _data: function (a, b, e) { return c.data(a, b, e, !0) }, acceptData: function (a) {
    if (a.nodeName) {
        var b =
c.noData[a.nodeName.toLowerCase()]; if (b) return !0 !== b && a.getAttribute("classid") === b
    } return !0
} 
}); c.fn.extend({ data: function (a, b) {
    var e, d, f, g = null; if ("undefined" == typeof a) { if (this.length && (g = c.data(this[0]), 1 === this[0].nodeType && !c._data(this[0], "parsedAttrs"))) { d = this[0].attributes; for (var h = 0, k = d.length; h < k; h++) f = d[h].name, 0 === f.indexOf("data-") && (f = c.camelCase(f.substring(5)), Da(this[0], f, g[f])); c._data(this[0], "parsedAttrs", !0) } return g } if ("object" == typeof a) return this.each(function () {
        c.data(this,
a)
    }); e = a.split("."); e[1] = e[1] ? "." + e[1] : ""; return b === m ? (g = this.triggerHandler("getData" + e[1] + "!", [e[0]]), g === m && this.length && (g = c.data(this[0], a), g = Da(this[0], a, g)), g === m && e[1] ? this.data(e[0]) : g) : this.each(function () { var d = c(this), f = [e[0], b]; d.triggerHandler("setData" + e[1] + "!", f); c.data(this, a, b); d.triggerHandler("changeData" + e[1] + "!", f) })
}, removeData: function (a) { return this.each(function () { c.removeData(this, a) }) } 
}); c.extend({ _mark: function (a, b) {
    a && (b = (b || "fx") + "mark", c._data(a, b, (c._data(a, b) || 0) +
1))
}, _unmark: function (a, b, e) { !0 !== a && (e = b, b = a, a = !1); if (b) { e = e || "fx"; var d = e + "mark"; (a = a ? 0 : (c._data(b, d) || 1) - 1) ? c._data(b, d, a) : (c.removeData(b, d, !0), Ca(b, e, "mark")) } }, queue: function (a, b, e) { var d; if (a) return b = (b || "fx") + "queue", d = c._data(a, b), e && (!d || c.isArray(e) ? d = c._data(a, b, c.makeArray(e)) : d.push(e)), d || [] }, dequeue: function (a, b) {
    b = b || "fx"; var e = c.queue(a, b), d = e.shift(), f = {}; "inprogress" === d && (d = e.shift()); d && ("fx" === b && e.unshift("inprogress"), c._data(a, b + ".run", f), d.call(a, function () {
        c.dequeue(a,
b)
    }, f)); e.length || (c.removeData(a, b + "queue " + b + ".run", !0), Ca(a, b, "queue"))
} 
}); c.fn.extend({ queue: function (a, b) { "string" != typeof a && (b = a, a = "fx"); return b === m ? c.queue(this[0], a) : this.each(function () { var e = c.queue(this, a, b); "fx" === a && "inprogress" !== e[0] && c.dequeue(this, a) }) }, dequeue: function (a) { return this.each(function () { c.dequeue(this, a) }) }, delay: function (a, b) { a = c.fx ? c.fx.speeds[a] || a : a; return this.queue(b || "fx", function (b, c) { var f = setTimeout(b, a); c.stop = function () { clearTimeout(f) } }) }, clearQueue: function (a) {
    return this.queue(a ||
"fx", [])
}, promise: function (a, b) { function e() { --h || d.resolveWith(f, [f]) } "string" != typeof a && (a = m); a = a || "fx"; for (var d = c.Deferred(), f = this, g = f.length, h = 1, k = a + "defer", n = a + "queue", l = a + "mark", p; g--; ) if (p = c.data(f[g], k, m, !0) || (c.data(f[g], n, m, !0) || c.data(f[g], l, m, !0)) && c.data(f[g], k, c.Callbacks("once memory"), !0)) h++, p.add(e); e(); return d.promise() } 
}); var Ia = /[\n\t\r]/g, ca = /\s+/, qb = /\r/g, rb = /^(?:button|input)$/i, sb = /^(?:button|input|object|select|textarea)$/i, tb = /^a(?:rea)?$/i, Ja = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
Ka = c.support.getSetAttribute, F, La, Ma; c.fn.extend({ attr: function (a, b) { return c.access(this, a, b, !0, c.attr) }, removeAttr: function (a) { return this.each(function () { c.removeAttr(this, a) }) }, prop: function (a, b) { return c.access(this, a, b, !0, c.prop) }, removeProp: function (a) { a = c.propFix[a] || a; return this.each(function () { try { this[a] = m, delete this[a] } catch (b) { } }) }, addClass: function (a) {
    var b, e, d, f, g, h, k; if (c.isFunction(a)) return this.each(function (b) { c(this).addClass(a.call(this, b, this.className)) }); if (a && "string" ==
typeof a) for (b = a.split(ca), e = 0, d = this.length; e < d; e++) if (f = this[e], 1 === f.nodeType) if (f.className || 1 !== b.length) { g = " " + f.className + " "; h = 0; for (k = b.length; h < k; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " "); f.className = c.trim(g) } else f.className = a; return this
}, removeClass: function (a) {
    var b, e, d, f, g, h, k; if (c.isFunction(a)) return this.each(function (b) { c(this).removeClass(a.call(this, b, this.className)) }); if (a && "string" == typeof a || a === m) for (b = (a || "").split(ca), e = 0, d = this.length; e < d; e++) if (f = this[e], 1 === f.nodeType &&
f.className) if (a) { g = (" " + f.className + " ").replace(Ia, " "); h = 0; for (k = b.length; h < k; h++) g = g.replace(" " + b[h] + " ", " "); f.className = c.trim(g) } else f.className = ""; return this
}, toggleClass: function (a, b) {
    var e = typeof a, d = "boolean" == typeof b; return c.isFunction(a) ? this.each(function (e) { c(this).toggleClass(a.call(this, e, this.className, b), b) }) : this.each(function () {
        if ("string" === e) for (var f, g = 0, h = c(this), k = b, n = a.split(ca); f = n[g++]; ) k = d ? k : !h.hasClass(f), h[k ? "addClass" : "removeClass"](f); else if ("undefined" === e ||
"boolean" === e) this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") || ""
    })
}, hasClass: function (a) { a = " " + a + " "; for (var b = 0, c = this.length; b < c; b++) if (1 === this[b].nodeType && -1 < (" " + this[b].className + " ").replace(Ia, " ").indexOf(a)) return !0; return !1 }, val: function (a) {
    var b, e, d, f = this[0]; if (!arguments.length) {
        if (f) {
            if ((b = c.valHooks[f.nodeName.toLowerCase()] || c.valHooks[f.type]) && "get" in b && (e = b.get(f, "value")) !== m) return e; e = f.value;
            return "string" == typeof e ? e.replace(qb, "") : null == e ? "" : e
        } return m
    } d = c.isFunction(a); return this.each(function (e) { var f = c(this), k; 1 === this.nodeType && (d ? k = a.call(this, e, f.val()) : k = a, null == k ? k = "" : "number" == typeof k ? k += "" : c.isArray(k) && (k = c.map(k, function (a) { return null == a ? "" : a + "" })), b = c.valHooks[this.nodeName.toLowerCase()] || c.valHooks[this.type], b && "set" in b && b.set(this, k, "value") !== m || (this.value = k)) })
} 
}); c.extend({ valHooks: { option: { get: function (a) {
    var b = a.attributes.value; return !b || b.specified ? a.value :
a.text
} 
}, select: { get: function (a) { var b, e, d = a.selectedIndex, f = [], g = a.options, h = "select-one" === a.type; if (0 > d) return null; a = h ? d : 0; for (e = h ? d + 1 : g.length; a < e; a++) if (b = g[a], !(!b.selected || (c.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode, "optgroup"))) { b = c(b).val(); if (h) return b; f.push(b) } return h && !f.length && g.length ? c(g[d]).val() : f }, set: function (a, b) {
    var e = c.makeArray(b); c(a).find("option").each(function () {
        this.selected = 0 <= c.inArray(c(this).val(),
e)
    }); e.length || (a.selectedIndex = -1); return e
} 
}
}, attrFn: { val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0 }, attr: function (a, b, e, d) {
    var f, g, h = a.nodeType; if (!a || 3 === h || 8 === h || 2 === h) return m; if (d && b in c.attrFn) return c(a)[b](e); if (!("getAttribute" in a)) return c.prop(a, b, e); (d = 1 !== h || !c.isXMLDoc(a)) && (b = b.toLowerCase(), g = c.attrHooks[b] || (Ja.test(b) ? La : F)); if (e !== m) { if (null === e) return c.removeAttr(a, b), m; if (g && "set" in g && d && (f = g.set(a, e, b)) !== m) return f; a.setAttribute(b, "" + e); return e } if (g &&
"get" in g && d && null !== (f = g.get(a, b))) return f; f = a.getAttribute(b); return null === f ? m : f
}, removeAttr: function (a, b) { var e, d, f, g, h = 0; if (1 === a.nodeType) for (d = (b || "").split(ca), g = d.length; h < g; h++) f = d[h].toLowerCase(), e = c.propFix[f] || f, c.attr(a, f, ""), a.removeAttribute(Ka ? f : e), Ja.test(f) && e in a && (a[e] = !1) }, attrHooks: { type: { set: function (a, b) {
    if (rb.test(a.nodeName) && a.parentNode) c.error("type property can't be changed"); else if (!c.support.radioValue && "radio" === b && c.nodeName(a, "input")) {
        var e = a.value; a.setAttribute("type",
b); e && (a.value = e); return b
    } 
} 
}, value: { get: function (a, b) { return F && c.nodeName(a, "button") ? F.get(a, b) : b in a ? a.value : null }, set: function (a, b, e) { if (F && c.nodeName(a, "button")) return F.set(a, b, e); a.value = b } }
}, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function (a, b, e) {
    var d,
f, g = a.nodeType; if (!a || 3 === g || 8 === g || 2 === g) return m; (1 !== g || !c.isXMLDoc(a)) && (b = c.propFix[b] || b, f = c.propHooks[b]); return e !== m ? f && "set" in f && (d = f.set(a, e, b)) !== m ? d : a[b] = e : f && "get" in f && null !== (d = f.get(a, b)) ? d : a[b]
}, propHooks: { tabIndex: { get: function (a) { var b = a.getAttributeNode("tabindex"); return b && b.specified ? parseInt(b.value, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : m } }}
}); c.attrHooks.tabindex = c.propHooks.tabIndex; La = { get: function (a, b) {
    var e, d = c.prop(a, b); return !0 === d || "boolean" != typeof d &&
(e = a.getAttributeNode(b)) && !1 !== e.nodeValue ? b.toLowerCase() : m
}, set: function (a, b, e) { var d; !1 === b ? c.removeAttr(a, e) : (d = c.propFix[e] || e, d in a && (a[d] = !0), a.setAttribute(e, e.toLowerCase())); return e } 
}; Ka || (Ma = { name: !0, id: !0 }, F = c.valHooks.button = { get: function (a, b) { var c; return (c = a.getAttributeNode(b)) && (Ma[b] ? "" !== c.nodeValue : c.specified) ? c.nodeValue : m }, set: function (a, b, c) { var d = a.getAttributeNode(c); d || (d = p.createAttribute(c), a.setAttributeNode(d)); return d.nodeValue = b + "" } }, c.attrHooks.tabindex.set = F.set,
c.each(["width", "height"], function (a, b) { c.attrHooks[b] = c.extend(c.attrHooks[b], { set: function (a, c) { if ("" === c) return a.setAttribute(b, "auto"), c } }) }), c.attrHooks.contenteditable = { get: F.get, set: function (a, b, c) { "" === b && (b = "false"); F.set(a, b, c) } }); c.support.hrefNormalized || c.each(["href", "src", "width", "height"], function (a, b) { c.attrHooks[b] = c.extend(c.attrHooks[b], { get: function (a) { a = a.getAttribute(b, 2); return null === a ? m : a } }) }); c.support.style || (c.attrHooks.style = { get: function (a) {
    return a.style.cssText.toLowerCase() ||
m
}, set: function (a, b) { return a.style.cssText = "" + b } 
}); c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, { get: function (a) { a = a.parentNode; a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex); return null } })); c.support.enctype || (c.propFix.enctype = "encoding"); c.support.checkOn || c.each(["radio", "checkbox"], function () { c.valHooks[this] = { get: function (a) { return null === a.getAttribute("value") ? "on" : a.value } } }); c.each(["radio", "checkbox"], function () {
    c.valHooks[this] = c.extend(c.valHooks[this],
{ set: function (a, b) { if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b) } })
}); var ma = /^(?:textarea|input|select)$/i, Na = /^([^\.]*)?(?:\.(.+))?$/, ub = /\bhover(\.\S+)?/, vb = /^key/, wb = /^(?:mouse|contextmenu)|click/, xb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, yb = function (a) { (a = xb.exec(a)) && (a[1] = (a[1] || "").toLowerCase(), a[3] = a[3] && new RegExp("(?:^|\\s)" + a[3] + "(?:\\s|$)")); return a }, Oa = function (a) { return c.event.special.hover ? a : a.replace(ub, "mouseenter$1 mouseleave$1") }; c.event = { add: function (a, b, e,
d, f) {
    var g, h, k, n, l, p, r, A, q; if (3 !== a.nodeType && 8 !== a.nodeType && b && e && (g = c._data(a))) {
        e.handler && (r = e, e = r.handler); e.guid || (e.guid = c.guid++); (k = g.events) || (g.events = k = {}); (h = g.handle) || (g.handle = h = function (a) { return "undefined" == typeof c || a && c.event.triggered === a.type ? m : c.event.dispatch.apply(h.elem, arguments) }, h.elem = a); b = Oa(b).split(" "); for (g = 0; g < b.length; g++) n = Na.exec(b[g]) || [], l = n[1], p = (n[2] || "").split(".").sort(), q = c.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = c.event.special[l] ||
{}, n = c.extend({ type: l, origType: n[1], data: d, handler: e, guid: e.guid, selector: f, namespace: p.join(".") }, r), f && (n.quick = yb(f), !n.quick && c.expr.match.POS.test(f) && (n.isPositional = !0)), A = k[l], A || (A = k[l] = [], A.delegateCount = 0, q.setup && !1 !== q.setup.call(a, d, p, h) || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))), q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = e.guid)), f ? A.splice(A.delegateCount++, 0, n) : A.push(n), c.event.global[l] = !0; a = null
    } 
}, global: {}, remove: function (a,
b, e, d) {
    var f = c.hasData(a) && c._data(a), g, h, k, n, l, m, r, p, q, t; if (f && (m = f.events)) {
        b = Oa(b || "").split(" "); for (g = 0; g < b.length; g++) {
            h = Na.exec(b[g]) || []; k = h[1]; h = h[2]; if (!k) { h = h ? "." + h : ""; for (l in m) c.event.remove(a, l + h, e, d); return } r = c.event.special[k] || {}; k = (d ? r.delegateType : r.bindType) || k; q = m[k] || []; n = q.length; h = h ? new RegExp("(^|\\.)" + h.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null; if (e || h || d || r.remove) for (l = 0; l < q.length; l++) {
                if (t = q[l], !e || e.guid === t.guid) if (!h || h.test(t.namespace)) if (!d || d ===
t.selector || "**" === d && t.selector) q.splice(l--, 1), t.selector && q.delegateCount--, r.remove && r.remove.call(a, t)
            } else q.length = 0; 0 === q.length && n !== q.length && ((!r.teardown || !1 === r.teardown.call(a, h)) && c.removeEvent(a, k, f.handle), delete m[k])
        } c.isEmptyObject(m) && (p = f.handle, p && (p.elem = null), c.removeData(a, ["events", "handle"], !0))
    } 
}, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function (a, b, e, d) {
    if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
        var f = a.type || a, g = [], h, k, n, x, p; 0 <= f.indexOf("!") && (f = f.slice(0,
-1), h = !0); 0 <= f.indexOf(".") && (g = f.split("."), f = g.shift(), g.sort()); if (e && !c.event.customEvent[f] || c.event.global[f]) if (a = "object" == typeof a ? a[c.expando] ? a : new c.Event(f, a) : new c.Event(f), a.type = f, a.isTrigger = !0, a.exclusive = h, a.namespace = g.join("."), a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, g = 0 > f.indexOf(":") ? "on" + f : "", !d && e || a.preventDefault(), e) {
            if (a.result = m, a.target || (a.target = e), b = null != b ? c.makeArray(b) : [], b.unshift(a), h = c.event.special[f] || {}, !h.trigger ||
!1 !== h.trigger.apply(e, b)) {
                p = [[e, h.bindType || f]]; if (!d && !h.noBubble && !c.isWindow(e)) { k = h.delegateType || f; n = null; for (d = e.parentNode; d; d = d.parentNode) p.push([d, k]), n = d; n && n === e.ownerDocument && p.push([n.defaultView || n.parentWindow || l, k]) } for (k = 0; k < p.length && (d = p[k][0], a.type = p[k][1], (x = (c._data(d, "events") || {})[a.type] && c._data(d, "handle")) && x.apply(d, b), (x = g && d[g]) && c.acceptData(d) && x.apply(d, b), !a.isPropagationStopped()); k++); a.type = f; a.isDefaultPrevented() || !(h._default && !1 !== h._default.apply(e.ownerDocument,
b) || "click" === f && c.nodeName(e, "a")) && c.acceptData(e) && g && e[f] && ("focus" !== f && "blur" !== f || 0 !== a.target.offsetWidth) && !c.isWindow(e) && (n = e[g], n && (e[g] = null), c.event.triggered = f, e[f](), c.event.triggered = m, n && (e[g] = n)); return a.result
            } 
        } else for (k in e = c.cache, e) e[k].events && e[k].events[f] && c.event.trigger(a, b, e[k].handle.elem, !0)
    } 
}, dispatch: function (a) {
    a = c.event.fix(a || l.event); var b = (c._data(this, "events") || {})[a.type] || [], e = b.delegateCount, d = [].slice.call(arguments, 0), f = !a.exclusive && !a.namespace, g =
(c.event.special[a.type] || {}).handle, h = [], k, n, p, t, r, A, q; d[0] = a; a.delegateTarget = this; if (e && !a.target.disabled && (!a.button || "click" !== a.type)) for (n = a.target; n != this; n = n.parentNode || this) {
        t = {}; r = []; for (k = 0; k < e; k++) { p = b[k]; A = p.selector; q = t[A]; if (p.isPositional) q = 0 <= (q || (t[A] = c(A))).index(n); else if (q === m) { q = t; var u = A; if (p.quick) { A = n; var w = p.quick; A = (!w[1] || A.nodeName.toLowerCase() === w[1]) && (!w[2] || A.id === w[2]) && (!w[3] || w[3].test(A.className)) } else A = c(n).is(A); q = q[u] = A } q && r.push(p) } r.length && h.push({ elem: n,
            matches: r
        })
    } b.length > e && h.push({ elem: this, matches: b.slice(e) }); for (k = 0; k < h.length && !a.isPropagationStopped(); k++) for (e = h[k], a.currentTarget = e.elem, b = 0; b < e.matches.length && !a.isImmediatePropagationStopped(); b++) if (p = e.matches[b], f || !a.namespace && !p.namespace || a.namespace_re && a.namespace_re.test(p.namespace)) a.data = p.data, a.handleObj = p, p = (g || p.handler).apply(e.elem, d), p !== m && (a.result = p, !1 === p && (a.preventDefault(), a.stopPropagation())); return a.result
}, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {}, keyHooks: { props: ["char", "charCode", "key", "keyCode"], filter: function (a, b) { null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode); return a } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "), filter: function (a, b) {
        var c, d, f, g = b.button, h = b.fromElement; null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || p, d = c.documentElement, f = c.body, a.pageX = b.clientX + (d && d.scrollLeft || f && f.scrollLeft || 0) -
(d && d.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || f && f.scrollTop || 0) - (d && d.clientTop || f && f.clientTop || 0)); !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h); !a.which && g !== m && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0); return a
    } 
    }, fix: function (a) {
        if (a[c.expando]) return a; var b, e, d = a, f = c.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props; a = c.Event(d); for (b = g.length; b; ) e = g[--b], a[e] = d[e]; a.target || (a.target = d.srcElement || p); 3 === a.target.nodeType && (a.target =
a.target.parentNode); a.metaKey === m && (a.metaKey = a.ctrlKey); return f.filter ? f.filter(a, d) : a
    }, special: { ready: { setup: c.bindReady }, focus: { delegateType: "focusin", noBubble: !0 }, blur: { delegateType: "focusout", noBubble: !0 }, beforeunload: { setup: function (a, b, e) { c.isWindow(this) && (this.onbeforeunload = e) }, teardown: function (a, b) { this.onbeforeunload === b && (this.onbeforeunload = null) } } }, simulate: function (a, b, e, d) {
        a = c.extend(new c.Event, e, { type: a, isSimulated: !0, originalEvent: {} }); d ? c.event.trigger(a, null, b) : c.event.dispatch.call(b,
a); a.isDefaultPrevented() && e.preventDefault()
    } 
}; c.event.handle = c.event.dispatch; c.removeEvent = p.removeEventListener ? function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1) } : function (a, b, c) { a.detachEvent && a.detachEvent("on" + b, c) }; c.Event = function (a, b) {
    if (!(this instanceof c.Event)) return new c.Event(a, b); a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? ba : J) : this.type = a; b && c.extend(this,
b); this.timeStamp = a && a.timeStamp || c.now(); this[c.expando] = !0
}; c.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = ba; var a = this.originalEvent; !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1) }, stopPropagation: function () { this.isPropagationStopped = ba; var a = this.originalEvent; !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = ba; this.stopPropagation() }, isDefaultPrevented: J, isPropagationStopped: J,
    isImmediatePropagationStopped: J
}; c.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) { c.event.special[a] = c.event.special[b] = { delegateType: b, bindType: b, handle: function (a) { var b = a.relatedTarget, f = a.handleObj, g; if (!b || f.origType === a.type || b !== this && !c.contains(this, b)) b = a.type, a.type = f.origType, g = f.handler.apply(this, arguments), a.type = b; return g } } }); c.support.submitBubbles || (c.event.special.submit = { setup: function () {
    if (c.nodeName(this, "form")) return !1; c.event.add(this, "click._submit keypress._submit",
function (a) { a = a.target; (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : m) && !a._submit_attached && (c.event.add(a, "submit._submit", function (a) { this.parentNode && c.event.simulate("submit", this.parentNode, a, !0) }), a._submit_attached = !0) })
}, teardown: function () { if (c.nodeName(this, "form")) return !1; c.event.remove(this, "._submit") } 
}); c.support.changeBubbles || (c.event.special.change = { setup: function () {
    if (ma.test(this.nodeName)) {
        if ("checkbox" === this.type || "radio" === this.type) c.event.add(this, "propertychange._change",
function (a) { "checked" === a.originalEvent.propertyName && (this._just_changed = !0) }), c.event.add(this, "click._change", function (a) { this._just_changed && (this._just_changed = !1, c.event.simulate("change", this, a, !0)) }); return !1
    } c.event.add(this, "beforeactivate._change", function (a) { a = a.target; ma.test(a.nodeName) && !a._change_attached && (c.event.add(a, "change._change", function (a) { this.parentNode && !a.isSimulated && c.event.simulate("change", this.parentNode, a, !0) }), a._change_attached = !0) })
}, handle: function (a) {
    var b =
a.target; if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
}, teardown: function () { c.event.remove(this, "._change"); return ma.test(this.nodeName) } 
}); c.support.focusinBubbles || c.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var e = 0, d = function (a) { c.event.simulate(b, a.target, c.event.fix(a), !0) }; c.event.special[b] = { setup: function () { 0 === e++ && p.addEventListener(a, d, !0) }, teardown: function () {
        0 === --e && p.removeEventListener(a,
d, !0)
    } 
    }
}); c.fn.extend({ on: function (a, b, e, d, f) { var g, h; if ("object" == typeof a) { "string" != typeof b && (e = b, b = m); for (h in a) this.on(h, b, e, a[h], f); return this } null == e && null == d ? (d = b, e = b = m) : null == d && ("string" == typeof b ? (d = e, e = m) : (d = e, e = b, b = m)); if (!1 === d) d = J; else if (!d) return this; 1 === f && (g = d, d = function (a) { c().off(a); return g.apply(this, arguments) }, d.guid = g.guid || (g.guid = c.guid++)); return this.each(function () { c.event.add(this, a, d, e, b) }) }, one: function (a, b, c, d) { return this.on.call(this, a, b, c, d, 1) }, off: function (a,
b, e) { if (a && a.preventDefault && a.handleObj) { var d = a.handleObj; c(a.delegateTarget).off(d.namespace ? d.type + "." + d.namespace : d.type, d.selector, d.handler); return this } if ("object" == typeof a) { for (d in a) this.off(d, b, a[d]); return this } if (!1 === b || "function" == typeof b) e = b, b = m; !1 === e && (e = J); return this.each(function () { c.event.remove(this, a, e, b) }) }, bind: function (a, b, c) { return this.on(a, null, b, c) }, unbind: function (a, b) { return this.off(a, null, b) }, live: function (a, b, e) { c(this.context).on(a, this.selector, b, e); return this },
    die: function (a, b) { c(this.context).off(a, this.selector || "**", b); return this }, delegate: function (a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function (a, b, c) { return 1 == arguments.length ? this.off(a, "**") : this.off(b, a, c) }, trigger: function (a, b) { return this.each(function () { c.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { if (this[0]) return c.event.trigger(a, b, this[0], !0) }, toggle: function (a) {
        var b = arguments, e = a.guid || c.guid++, d = 0, f = function (e) {
            var f = (c._data(this, "lastToggle" + a.guid) || 0) % d; c._data(this,
"lastToggle" + a.guid, f + 1); e.preventDefault(); return b[f].apply(this, arguments) || !1
        }; for (f.guid = e; d < b.length; ) b[d++].guid = e; return this.click(f)
    }, hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } 
}); c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    c.fn[b] = function (a, c) {
        null == c && (c = a, a = null); return 0 < arguments.length ?
this.bind(b, a, c) : this.trigger(b)
    }; c.attrFn && (c.attrFn[b] = !0); vb.test(b) && (c.event.fixHooks[b] = c.event.keyHooks); wb.test(b) && (c.event.fixHooks[b] = c.event.mouseHooks)
}); (function () {
    function a(a, b, c, e, f, g) { f = 0; for (var h = e.length; f < h; f++) { var k = e[f]; if (k) { for (var n = !1, k = k[a]; k; ) { if (k[d] === c) { n = e[k.sizset]; break } if (1 === k.nodeType) if (g || (k[d] = c, k.sizset = f), "string" != typeof b) { if (k === b) { n = !0; break } } else if (0 < r.filter(b, [k]).length) { n = k; break } k = k[a] } e[f] = n } } } function b(a, b, c, e, f, g) {
        f = 0; for (var h = e.length; f <
h; f++) { var k = e[f]; if (k) { for (var n = !1, k = k[a]; k; ) { if (k[d] === c) { n = e[k.sizset]; break } 1 === k.nodeType && !g && (k[d] = c, k.sizset = f); if (k.nodeName.toLowerCase() === b) { n = k; break } k = k[a] } e[f] = n } } 
    } var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), f = 0, g = Object.prototype.toString, h = !1, k = !0, n = /\\/g, l = /\r\n/g, t = /\W/; [0, 0].sort(function () { k = !1; return 0 }); var r = function (a, b, c, d) {
        c = c ||
[]; var f = b = b || p; if (1 !== b.nodeType && 9 !== b.nodeType) return []; if (!a || "string" != typeof a) return c; var h, k, n, l, m, x, t = !0, A = r.isXML(b), z = [], M = a; do if (e.exec(""), h = e.exec(M)) if (M = h[3], z.push(h[1]), h[2]) { l = h[3]; break } while (h); if (1 < z.length && u.exec(a)) if (2 === z.length && q.relative[z[0]]) k = C(z[0] + z[1], b, d); else for (k = q.relative[z[0]] ? [b] : r(z.shift(), b); z.length; ) a = z.shift(), q.relative[a] && (a += z.shift()), k = C(a, k, d); else if (!d && 1 < z.length && 9 === b.nodeType && !A && q.match.ID.test(z[0]) && !q.match.ID.test(z[z.length - 1]) &&
(m = r.find(z.shift(), b, A), b = m.expr ? r.filter(m.expr, m.set)[0] : m.set[0]), b) for (m = d ? { expr: z.pop(), set: D(d)} : r.find(z.pop(), 1 !== z.length || "~" !== z[0] && "+" !== z[0] || !b.parentNode ? b : b.parentNode, A), k = m.expr ? r.filter(m.expr, m.set) : m.set, 0 < z.length ? n = D(k) : t = !1; z.length; ) h = x = z.pop(), q.relative[x] ? h = z.pop() : x = "", null == h && (h = b), q.relative[x](n, h, A); else n = []; n || (n = k); n || r.error(x || a); if ("[object Array]" === g.call(n)) if (t) if (b && 1 === b.nodeType) for (a = 0; null != n[a]; a++) n[a] && (!0 === n[a] || 1 === n[a].nodeType && r.contains(b,
n[a])) && c.push(k[a]); else for (a = 0; null != n[a]; a++) n[a] && 1 === n[a].nodeType && c.push(k[a]); else c.push.apply(c, n); else D(n, c); l && (r(l, f, c, d), r.uniqueSort(c)); return c
    }; r.uniqueSort = function (a) { if (H && (h = k, a.sort(H), h)) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1); return a }; r.matches = function (a, b) { return r(a, null, null, b) }; r.matchesSelector = function (a, b) { return 0 < r(b, null, null, [a]).length }; r.find = function (a, b, c) {
        var e, d, f, g, h, k; if (!a) return []; d = 0; for (f = q.order.length; d < f; d++) if (h = q.order[d],
g = q.leftMatch[h].exec(a)) if (k = g[1], g.splice(1, 1), "\\" !== k.substr(k.length - 1) && (g[1] = (g[1] || "").replace(n, ""), e = q.find[h](g, b, c), null != e)) { a = a.replace(q.match[h], ""); break } e || (e = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : []); return { set: e, expr: a}
    }; r.filter = function (a, b, c, e) {
        for (var d, f, g, h, k, n, l, p, x = a, t = [], A = b, M = b && b[0] && r.isXML(b[0]); a && b.length; ) {
            for (g in q.filter) if (null != (d = q.leftMatch[g].exec(a)) && d[2] && (n = q.filter[g], k = d[1], f = !1, d.splice(1, 1), "\\" !== k.substr(k.length -
1))) { A === t && (t = []); if (q.preFilter[g]) if (d = q.preFilter[g](d, A, c, t, e, M), !d) f = h = !0; else if (!0 === d) continue; if (d) for (l = 0; null != (k = A[l]); l++) k && (h = n(k, d, l, A), p = e ^ h, c && null != h ? p ? f = !0 : A[l] = !1 : p && (t.push(k), f = !0)); if (h !== m) { c || (A = t); a = a.replace(q.match[g], ""); if (!f) return []; break } } if (a === x) if (null == f) r.error(a); else break; x = a
        } return A
    }; r.error = function (a) { throw "Syntax error, unrecognized expression: " + a; }; var A = r.getText = function (a) {
        var b, c; b = a.nodeType; var d = ""; if (b) if (1 === b) {
            if ("string" == typeof a.textContent) return a.textContent;
            if ("string" == typeof a.innerText) return a.innerText.replace(l, ""); for (a = a.firstChild; a; a = a.nextSibling) d += A(a)
        } else { if (3 === b || 4 === b) return a.nodeValue } else for (b = 0; c = a[b]; b++) 8 !== c.nodeType && (d += A(c)); return d
    }, q = r.selectors = { order: ["ID", "NAME", "TAG"], match: { ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
    }, leftMatch: {}, attrMap: { "class": "className", "for": "htmlFor" }, attrHandle: { href: function (a) { return a.getAttribute("href") }, type: function (a) { return a.getAttribute("type") } }, relative: { "+": function (a, b) {
        var c =
"string" == typeof b, d = c && !t.test(b), c = c && !d; d && (b = b.toLowerCase()); for (var d = 0, e = a.length, f; d < e; d++) if (f = a[d]) { for (; (f = f.previousSibling) && 1 !== f.nodeType; ); a[d] = c || f && f.nodeName.toLowerCase() === b ? f || !1 : f === b } c && r.filter(b, a, !0)
    }, ">": function (a, b) { var c, d = "string" == typeof b, e = 0, f = a.length; if (d && !t.test(b)) for (b = b.toLowerCase(); e < f; e++) { if (c = a[e]) c = c.parentNode, a[e] = c.nodeName.toLowerCase() === b ? c : !1 } else { for (; e < f; e++) (c = a[e]) && (a[e] = d ? c.parentNode : c.parentNode === b); d && r.filter(b, a, !0) } }, "": function (c,
d, e) { var g, h = f++, k = a; "string" == typeof d && !t.test(d) && (d = d.toLowerCase(), g = d, k = b); k("parentNode", d, h, c, g, e) }, "~": function (c, d, e) { var g, h = f++, k = a; "string" == typeof d && !t.test(d) && (d = d.toLowerCase(), g = d, k = b); k("previousSibling", d, h, c, g, e) } 
    }, find: { ID: function (a, b, c) { if ("undefined" != typeof b.getElementById && !c) return (a = b.getElementById(a[1])) && a.parentNode ? [a] : [] }, NAME: function (a, b) {
        if ("undefined" != typeof b.getElementsByName) {
            for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") ===
a[1] && c.push(d[e]); return 0 === c.length ? null : c
        } 
    }, TAG: function (a, b) { if ("undefined" != typeof b.getElementsByTagName) return b.getElementsByTagName(a[1]) } 
    }, preFilter: { CLASS: function (a, b, c, d, e, f) { a = " " + a[1].replace(n, "") + " "; if (f) return a; f = 0; for (var g; null != (g = b[f]); f++) g && (e ^ (g.className && 0 <= (" " + g.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a)) ? c || d.push(g) : c && (b[f] = !1)); return !1 }, ID: function (a) { return a[1].replace(n, "") }, TAG: function (a, b) { return a[1].replace(n, "").toLowerCase() }, CHILD: function (a) {
        if ("nth" ===
a[1]) { a[2] || r.error(a[0]); a[2] = a[2].replace(/^\+|\s*/g, ""); var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]); a[2] = b[1] + (b[2] || 1) - 0; a[3] = b[3] - 0 } else a[2] && r.error(a[0]); a[0] = f++; return a
    }, ATTR: function (a, b, c, d, e, f) { b = a[1] = a[1].replace(n, ""); !f && q.attrMap[b] && (a[1] = q.attrMap[b]); a[4] = (a[4] || a[5] || "").replace(n, ""); "~=" === a[2] && (a[4] = " " + a[4] + " "); return a }, PSEUDO: function (a, b, c, d, f) {
        if ("not" === a[1]) if (1 < (e.exec(a[3]) || "").length ||
/^\w/.test(a[3])) a[3] = r(a[3], null, null, b); else return a = r.filter(a[3], b, c, 1 ^ f), c || d.push.apply(d, a), !1; else if (q.match.POS.test(a[0]) || q.match.CHILD.test(a[0])) return !0; return a
    }, POS: function (a) { a.unshift(!0); return a } 
    }, filters: { enabled: function (a) { return !1 === a.disabled && "hidden" !== a.type }, disabled: function (a) { return !0 === a.disabled }, checked: function (a) { return !0 === a.checked }, selected: function (a) { a.parentNode && a.parentNode.selectedIndex; return !0 === a.selected }, parent: function (a) { return !!a.firstChild },
        empty: function (a) { return !a.firstChild }, has: function (a, b, c) { return !!r(c[3], a).length }, header: function (a) { return /h\d/i.test(a.nodeName) }, text: function (a) { var b = a.getAttribute("type"), c = a.type; return "input" === a.nodeName.toLowerCase() && "text" === c && (b === c || null === b) }, radio: function (a) { return "input" === a.nodeName.toLowerCase() && "radio" === a.type }, checkbox: function (a) { return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type }, file: function (a) { return "input" === a.nodeName.toLowerCase() && "file" === a.type },
        password: function (a) { return "input" === a.nodeName.toLowerCase() && "password" === a.type }, submit: function (a) { var b = a.nodeName.toLowerCase(); return ("input" === b || "button" === b) && "submit" === a.type }, image: function (a) { return "input" === a.nodeName.toLowerCase() && "image" === a.type }, reset: function (a) { var b = a.nodeName.toLowerCase(); return ("input" === b || "button" === b) && "reset" === a.type }, button: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b }, input: function (a) { return /input|select|textarea|button/i.test(a.nodeName) },
        focus: function (a) { return a === a.ownerDocument.activeElement } 
    }, setFilters: { first: function (a, b) { return 0 === b }, last: function (a, b, c, d) { return b === d.length - 1 }, even: function (a, b) { return 0 === b % 2 }, odd: function (a, b) { return 1 === b % 2 }, lt: function (a, b, c) { return b < c[3] - 0 }, gt: function (a, b, c) { return b > c[3] - 0 }, nth: function (a, b, c) { return c[3] - 0 === b }, eq: function (a, b, c) { return c[3] - 0 === b } }, filter: { PSEUDO: function (a, b, c, d) {
        var e = b[1], f = q.filters[e]; if (f) return f(a, c, b, d); if ("contains" === e) return 0 <= (a.textContent || a.innerText ||
A([a]) || "").indexOf(b[3]); if ("not" === e) { b = b[3]; c = 0; for (d = b.length; c < d; c++) if (b[c] === a) return !1; return !0 } r.error(e)
    }, CHILD: function (a, b) {
        var c, e, f, g, h, k; c = b[1]; k = a; switch (c) {
            case "only": case "first": for (; k = k.previousSibling; ) if (1 === k.nodeType) return !1; if ("first" === c) return !0; k = a; case "last": for (; k = k.nextSibling; ) if (1 === k.nodeType) return !1; return !0; case "nth": c = b[2]; e = b[3]; if (1 === c && 0 === e) return !0; f = b[0]; if ((g = a.parentNode) && (g[d] !== f || !a.nodeIndex)) {
                    h = 0; for (k = g.firstChild; k; k = k.nextSibling) 1 === k.nodeType &&
(k.nodeIndex = ++h); g[d] = f
                } k = a.nodeIndex - e; return 0 === c ? 0 === k : 0 === k % c && 0 <= k / c
        } 
    }, ID: function (a, b) { return 1 === a.nodeType && a.getAttribute("id") === b }, TAG: function (a, b) { return "*" === b && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === b }, CLASS: function (a, b) { return -1 < (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) }, ATTR: function (a, b) {
        var c = b[1], c = r.attr ? r.attr(a, c) : q.attrHandle[c] ? q.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c), d = c + "", e = b[2], f = b[4]; return null == c ? "!=" === e : !e && r.attr ?
null != c : "=" === e ? d === f : "*=" === e ? 0 <= d.indexOf(f) : "~=" === e ? 0 <= (" " + d + " ").indexOf(f) : f ? "!=" === e ? d !== f : "^=" === e ? 0 === d.indexOf(f) : "$=" === e ? d.substr(d.length - f.length) === f : "|=" === e ? d === f || d.substr(0, f.length + 1) === f + "-" : !1 : d && !1 !== c
    }, POS: function (a, b, c, d) { var e = q.setFilters[b[2]]; if (e) return e(a, c, b, d) } 
    }
    }, u = q.match.POS, w = function (a, b) { return "\\" + (b - 0 + 1) }, v; for (v in q.match) q.match[v] = new RegExp(q.match[v].source + /(?![^\[]*\])(?![^\(]*\))/.source), q.leftMatch[v] = new RegExp(/(^(?:.|\r|\n)*?)/.source + q.match[v].source.replace(/\\(\d+)/g,
w)); var D = function (a, b) { a = Array.prototype.slice.call(a, 0); return b ? (b.push.apply(b, a), b) : a }; try { Array.prototype.slice.call(p.documentElement.childNodes, 0)[0].nodeType } catch (G) { D = function (a, b) { var c = 0, d = b || []; if ("[object Array]" === g.call(a)) Array.prototype.push.apply(d, a); else if ("number" == typeof a.length) for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]); return d } } var H, y; p.documentElement.compareDocumentPosition ? H = function (a, b) {
    return a === b ? (h = !0, 0) : a.compareDocumentPosition &&
b.compareDocumentPosition ? a.compareDocumentPosition(b) & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
} : (H = function (a, b) { if (a === b) return h = !0, 0; if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex; var c, d, e = [], f = []; c = a.parentNode; d = b.parentNode; var g = c; if (c === d) return y(a, b); if (!c) return -1; if (!d) return 1; for (; g; ) e.unshift(g), g = g.parentNode; for (g = d; g; ) f.unshift(g), g = g.parentNode; c = e.length; d = f.length; for (g = 0; g < c && g < d; g++) if (e[g] !== f[g]) return y(e[g], f[g]); return g === c ? y(a, f[g], -1) : y(e[g], b, 1) },
y = function (a, b, c) { if (a === b) return c; for (a = a.nextSibling; a; ) { if (a === b) return -1; a = a.nextSibling } return 1 }); (function () {
    var a = p.createElement("div"), b = "script" + (new Date).getTime(), c = p.documentElement; a.innerHTML = "<a name='" + b + "'/>"; c.insertBefore(a, c.firstChild); p.getElementById(b) && (q.find.ID = function (a, b, c) { if ("undefined" != typeof b.getElementById && !c) return (b = b.getElementById(a[1])) ? b.id === a[1] || "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id").nodeValue === a[1] ? [b] : m : [] }, q.filter.ID =
function (a, b) { var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id"); return 1 === a.nodeType && c && c.nodeValue === b }); c.removeChild(a); c = a = null
})(); (function () {
    var a = p.createElement("div"); a.appendChild(p.createComment("")); 0 < a.getElementsByTagName("*").length && (q.find.TAG = function (a, b) { var c = b.getElementsByTagName(a[1]); if ("*" === a[1]) { for (var d = [], e = 0; c[e]; e++) 1 === c[e].nodeType && d.push(c[e]); c = d } return c }); a.innerHTML = "<a href='#'></a>"; a.firstChild && "undefined" != typeof a.firstChild.getAttribute &&
"#" !== a.firstChild.getAttribute("href") && (q.attrHandle.href = function (a) { return a.getAttribute("href", 2) }); a = null
})(); p.querySelectorAll && function () {
    var a = r, b = p.createElement("div"); b.innerHTML = "<p class='TEST'></p>"; if (!b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
        r = function (b, c, d, e) {
            c = c || p; if (!e && !r.isXML(c)) {
                var f = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b); if (f && (1 === c.nodeType || 9 === c.nodeType)) {
                    if (f[1]) return D(c.getElementsByTagName(b), d); if (f[2] && q.find.CLASS && c.getElementsByClassName) return D(c.getElementsByClassName(f[2]),
d)
                } if (9 === c.nodeType) { if ("body" === b && c.body) return D([c.body], d); if (f && f[3]) { var g = c.getElementById(f[3]); if (!g || !g.parentNode) return D([], d); if (g.id === f[3]) return D([g], d) } try { return D(c.querySelectorAll(b), d) } catch (h) { } } else if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                    var f = c, k = (g = c.getAttribute("id")) || "__sizzle__", n = c.parentNode, l = /^\s*[+~]/.test(b); g ? k = k.replace(/'/g, "\\$&") : c.setAttribute("id", k); l && n && (c = c.parentNode); try {
                        if (!l || n) return D(c.querySelectorAll("[id='" + k + "'] " + b),
d)
                    } catch (m) { } finally { g || f.removeAttribute("id") } 
                } 
            } return a(b, c, d, e)
        }; for (var c in a) r[c] = a[c]; b = null
    } 
} (); (function () {
    var a = p.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector; if (b) {
        var c = !b.call(p.createElement("div"), "div"), d = !1; try { b.call(p.documentElement, "[test!='']:sizzle") } catch (e) { d = !0 } r.matchesSelector = function (a, e) {
            e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"); if (!r.isXML(a)) try {
                if (d || !q.match.PSEUDO.test(e) && !/!=/.test(e)) {
                    var f = b.call(a,
e); if (f || !c || a.document && 11 !== a.document.nodeType) return f
                } 
            } catch (g) { } return 0 < r(e, null, null, [a]).length
        } 
    } 
})(); (function () {
    var a = p.createElement("div"); a.innerHTML = "<div class='test e'></div><div class='test'></div>"; a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length && (a.lastChild.className = "e", 1 !== a.getElementsByClassName("e").length && (q.order.splice(1, 0, "CLASS"), q.find.CLASS = function (a, b, c) { if ("undefined" != typeof b.getElementsByClassName && !c) return b.getElementsByClassName(a[1]) },
a = null))
})(); p.documentElement.contains ? r.contains = function (a, b) { return a !== b && (a.contains ? a.contains(b) : !0) } : p.documentElement.compareDocumentPosition ? r.contains = function (a, b) { return !!(a.compareDocumentPosition(b) & 16) } : r.contains = function () { return !1 }; r.isXML = function (a) { return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1 }; var C = function (a, b, c) {
    var d, e = [], f = ""; for (b = b.nodeType ? [b] : b; d = q.match.PSEUDO.exec(a); ) f += d[0], a = a.replace(q.match.PSEUDO, ""); a = q.relative[a] ? a + "*" : a; d = 0;
    for (var g = b.length; d < g; d++) r(a, b[d], e, c); return r.filter(f, e)
}; r.attr = c.attr; r.selectors.attrMap = {}; c.find = r; c.expr = r.selectors; c.expr[":"] = c.expr.filters; c.unique = r.uniqueSort; c.text = r.getText; c.isXMLDoc = r.isXML; c.contains = r.contains
})(); var zb = /Until$/, Ab = /^(?:parents|prevUntil|prevAll)/, Bb = /,/, ib = /^.[^:#\[\.,]*$/, Cb = Array.prototype.slice, Pa = c.expr.match.POS, Db = { children: !0, contents: !0, next: !0, prev: !0 }; c.fn.extend({ find: function (a) {
    var b = this, e, d; if ("string" != typeof a) return c(a).filter(function () {
        e =
0; for (d = b.length; e < d; e++) if (c.contains(b[e], this)) return !0
    }); var f = this.pushStack("", "find", a), g, h, k; e = 0; for (d = this.length; e < d; e++) if (g = f.length, c.find(a, this[e], f), 0 < e) for (h = g; h < f.length; h++) for (k = 0; k < g; k++) if (f[k] === f[h]) { f.splice(h--, 1); break } return f
}, has: function (a) { var b = c(a); return this.filter(function () { for (var a = 0, d = b.length; a < d; a++) if (c.contains(this, b[a])) return !0 }) }, not: function (a) { return this.pushStack(Aa(this, a, !1), "not", a) }, filter: function (a) {
    return this.pushStack(Aa(this, a, !0), "filter",
a)
}, is: function (a) { return !!a && ("string" == typeof a ? Pa.test(a) ? 0 <= c(a, this.context).index(this[0]) : 0 < c.filter(a, this).length : 0 < this.filter(a).length) }, closest: function (a, b) {
    var e = [], d, f, g = this[0]; if (c.isArray(a)) { for (f = 1; g && g.ownerDocument && g !== b; ) { for (d = 0; d < a.length; d++) c(g).is(a[d]) && e.push({ selector: a[d], elem: g, level: f }); g = g.parentNode; f++ } return e } var h = Pa.test(a) || "string" != typeof a ? c(a, b || this.context) : 0; d = 0; for (f = this.length; d < f; d++) for (g = this[d]; g; ) {
        if (h ? -1 < h.index(g) : c.find.matchesSelector(g,
a)) { e.push(g); break } g = g.parentNode; if (!g || !g.ownerDocument || g === b || 11 === g.nodeType) break
    } e = 1 < e.length ? c.unique(e) : e; return this.pushStack(e, "closest", a)
}, index: function (a) { return a ? "string" == typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1 }, add: function (a, b) { var e = "string" == typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a), d = c.merge(this.get(), e); return this.pushStack(Ba(e[0]) || Ba(d[0]) ? d : c.unique(d)) }, andSelf: function () { return this.add(this.prevObject) } 
});
    c.each({ parent: function (a) { return (a = a.parentNode) && 11 !== a.nodeType ? a : null }, parents: function (a) { return c.dir(a, "parentNode") }, parentsUntil: function (a, b, e) { return c.dir(a, "parentNode", e) }, next: function (a) { return c.nth(a, 2, "nextSibling") }, prev: function (a) { return c.nth(a, 2, "previousSibling") }, nextAll: function (a) { return c.dir(a, "nextSibling") }, prevAll: function (a) { return c.dir(a, "previousSibling") }, nextUntil: function (a, b, e) { return c.dir(a, "nextSibling", e) }, prevUntil: function (a, b, e) {
        return c.dir(a, "previousSibling",
e)
    }, siblings: function (a) { return c.sibling(a.parentNode.firstChild, a) }, children: function (a) { return c.sibling(a.firstChild) }, contents: function (a) { return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes) } 
    }, function (a, b) {
        c.fn[a] = function (e, d) {
            var f = c.map(this, b, e), g = Cb.call(arguments); zb.test(a) || (d = e); d && "string" == typeof d && (f = c.filter(d, f)); f = 1 < this.length && !Db[a] ? c.unique(f) : f; (1 < this.length || Bb.test(d)) && Ab.test(a) && (f = f.reverse()); return this.pushStack(f,
a, g.join(","))
        } 
    }); c.extend({ filter: function (a, b, e) { e && (a = ":not(" + a + ")"); return 1 === b.length ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b) }, dir: function (a, b, e) { var d = []; for (a = a[b]; a && 9 !== a.nodeType && (e === m || 1 !== a.nodeType || !c(a).is(e)); ) 1 === a.nodeType && d.push(a), a = a[b]; return d }, nth: function (a, b, c, d) { b = b || 1; for (d = 0; a && (1 !== a.nodeType || ++d !== b); a = a[c]); return a }, sibling: function (a, b) { for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a); return c } }); var za = "abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
Eb = / jQuery\d+="(?:\d+|null)"/g, na = /^\s+/, Qa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Ra = /<([\w:]+)/, Fb = /<tbody/i, Gb = /<|&#?\w+;/, Hb = /<(?:script|style)/i, Ib = /<(?:script|object|embed|option|style)/i, Jb = new RegExp("<(?:" + za.replace(" ", "|") + ")", "i"), Sa = /checked\s*(?:[^=]|=\s*.checked.)/i, Kb = /\/(java|ecma)script/i, gb = /^\s*<!(?:\[CDATA\[|\-\-)/, C = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]
}, Lb = ya(p); C.optgroup = C.option; C.tbody = C.tfoot = C.colgroup = C.caption = C.thead; C.th = C.td; c.support.htmlSerialize || (C._default = [1, "div<div>", "</div>"]); c.fn.extend({ text: function (a) {
    return c.isFunction(a) ? this.each(function (b) { var e = c(this); e.text(a.call(this, b, e.text())) }) : "object" != typeof a && a !== m ?
this.empty().append((this[0] && this[0].ownerDocument || p).createTextNode(a)) : c.text(this)
}, wrapAll: function (a) { if (c.isFunction(a)) return this.each(function (b) { c(this).wrapAll(a.call(this, b)) }); if (this[0]) { var b = c(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && b.insertBefore(this[0]); b.map(function () { for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild; return a }).append(this) } return this }, wrapInner: function (a) {
    return c.isFunction(a) ? this.each(function (b) {
        c(this).wrapInner(a.call(this,
b))
    }) : this.each(function () { var b = c(this), e = b.contents(); e.length ? e.wrapAll(a) : b.append(a) })
}, wrap: function (a) { return this.each(function () { c(this).wrapAll(a) }) }, unwrap: function () { return this.parent().each(function () { c.nodeName(this, "body") || c(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, !0, function (a) { 1 === this.nodeType && this.appendChild(a) }) }, prepend: function () { return this.domManip(arguments, !0, function (a) { 1 === this.nodeType && this.insertBefore(a, this.firstChild) }) },
    before: function () { if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this) }); if (arguments.length) { var a = c(arguments[0]); a.push.apply(a, this.toArray()); return this.pushStack(a, "before", arguments) } }, after: function () {
        if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this.nextSibling) }); if (arguments.length) {
            var a = this.pushStack(this, "after", arguments); a.push.apply(a, c(arguments[0]).toArray());
            return a
        } 
    }, remove: function (a, b) { for (var e = 0, d; null != (d = this[e]); e++) if (!a || c.filter(a, [d]).length) !b && 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")), c.cleanData([d])), d.parentNode && d.parentNode.removeChild(d); return this }, empty: function () { for (var a = 0, b; null != (b = this[a]); a++) for (1 === b.nodeType && c.cleanData(b.getElementsByTagName("*")); b.firstChild; ) b.removeChild(b.firstChild); return this }, clone: function (a, b) { a = null == a ? !1 : a; b = null == b ? a : b; return this.map(function () { return c.clone(this, a, b) }) },
    html: function (a) { if (a === m) return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(Eb, "") : null; if ("string" != typeof a || Hb.test(a) || !c.support.leadingWhitespace && na.test(a) || C[(Ra.exec(a) || ["", ""])[1].toLowerCase()]) c.isFunction(a) ? this.each(function (b) { var d = c(this); d.html(a.call(this, b, d.html())) }) : this.empty().append(a); else { a = a.replace(Qa, "<$1></$2>"); try { for (var b = 0, e = this.length; b < e; b++) 1 === this[b].nodeType && (c.cleanData(this[b].getElementsByTagName("*")), this[b].innerHTML = a) } catch (d) { this.empty().append(a) } } return this },
    replaceWith: function (a) { if (this[0] && this[0].parentNode) { if (c.isFunction(a)) return this.each(function (b) { var e = c(this), d = e.html(); e.replaceWith(a.call(this, b, d)) }); "string" != typeof a && (a = c(a).detach()); return this.each(function () { var b = this.nextSibling, e = this.parentNode; c(this).remove(); b ? c(b).before(a) : c(e).append(a) }) } return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this }, detach: function (a) { return this.remove(a, !0) }, domManip: function (a, b, e) {
        var d, f, g, h = a[0], k = []; if (!c.support.checkClone &&
3 === arguments.length && "string" == typeof h && Sa.test(h)) return this.each(function () { c(this).domManip(a, b, e, !0) }); if (c.isFunction(h)) return this.each(function (d) { var f = c(this); a[0] = h.call(this, d, b ? f.html() : m); f.domManip(a, b, e) }); if (this[0]) {
            g = h && h.parentNode; c.support.parentNode && g && 11 === g.nodeType && g.childNodes.length === this.length ? d = { fragment: g} : d = c.buildFragment(a, this, k); g = d.fragment; 1 === g.childNodes.length ? f = g = g.firstChild : f = g.firstChild; if (f) {
                b = b && c.nodeName(f, "tr"); for (var n = 0, l = this.length, p =
l - 1; n < l; n++) e.call(b ? hb(this[n], f) : this[n], d.cacheable || 1 < l && n < p ? c.clone(g, !0, !0) : g)
            } k.length && c.each(k, fb)
        } return this
    } 
}); c.buildFragment = function (a, b, e) {
    var d, f, g, h, k = a[0]; b && b[0] && (h = b[0].ownerDocument || b[0]); h.createDocumentFragment || (h = p); 1 === a.length && "string" == typeof k && 512 > k.length && h === p && "<" === k.charAt(0) && !Ib.test(k) && (c.support.checkClone || !Sa.test(k)) && !c.support.unknownElems && Jb.test(k) && (f = !0, g = c.fragments[k], g && 1 !== g && (d = g)); d || (d = h.createDocumentFragment(), c.clean(a, h, d, e)); f && (c.fragments[k] =
g ? d : 1); return { fragment: d, cacheable: f}
}; c.fragments = {}; c.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { c.fn[a] = function (e) { var d = []; e = c(e); var f = 1 === this.length && this[0].parentNode; if (f && 11 === f.nodeType && 1 === f.childNodes.length && 1 === e.length) return e[b](this[0]), this; for (var f = 0, g = e.length; f < g; f++) { var h = (0 < f ? this.clone(!0) : this).get(); c(e[f])[b](h); d = d.concat(h) } return this.pushStack(d, a, e.selector) } }); c.extend({ clone: function (a,
b, e) { var d = a.cloneNode(!0), f, g, h; if (!(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a))) for (wa(a, d), f = aa(a), g = aa(d), h = 0; f[h]; ++h) g[h] && wa(f[h], g[h]); if (b && (xa(a, d), e)) for (f = aa(a), g = aa(d), h = 0; f[h]; ++h) xa(f[h], g[h]); return d }, clean: function (a, b, e, d) {
    b = b || p; "undefined" == typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || p); for (var f = [], g, h = 0, k; null != (k = a[h]); h++) if ("number" == typeof k && (k += ""), k) {
        if ("string" == typeof k) if (Gb.test(k)) {
            k =
k.replace(Qa, "<$1></$2>"); g = (Ra.exec(k) || ["", ""])[1].toLowerCase(); var n = C[g] || C._default, l = n[0], m = b.createElement("div"); b === p ? Lb.appendChild(m) : ya(b).appendChild(m); for (m.innerHTML = n[1] + k + n[2]; l--; ) m = m.lastChild; if (!c.support.tbody) for (l = Fb.test(k), n = "table" !== g || l ? "<table>" !== n[1] || l ? [] : m.childNodes : m.firstChild && m.firstChild.childNodes, g = n.length - 1; 0 <= g; --g) c.nodeName(n[g], "tbody") && !n[g].childNodes.length && n[g].parentNode.removeChild(n[g]); !c.support.leadingWhitespace && na.test(k) && m.insertBefore(b.createTextNode(na.exec(k)[0]),
m.firstChild); k = m.childNodes
        } else k = b.createTextNode(k); var r; if (!c.support.appendChecked) if (k[0] && "number" == typeof (r = k.length)) for (g = 0; g < r; g++) ua(k[g]); else ua(k); k.nodeType ? f.push(k) : f = c.merge(f, k)
    } if (e) for (a = function (a) { return !a.type || Kb.test(a.type) }, h = 0; f[h]; h++) !d || !c.nodeName(f[h], "script") || f[h].type && "text/javascript" !== f[h].type.toLowerCase() ? (1 === f[h].nodeType && (b = c.grep(f[h].getElementsByTagName("script"), a), f.splice.apply(f, [h + 1, 0].concat(b))), e.appendChild(f[h])) : d.push(f[h].parentNode ?
f[h].parentNode.removeChild(f[h]) : f[h]); return f
}, cleanData: function (a) { for (var b, e, d = c.cache, f = c.event.special, g = c.support.deleteExpando, h = 0, k; null != (k = a[h]); h++) if (!k.nodeName || !c.noData[k.nodeName.toLowerCase()]) if (e = k[c.expando]) { if ((b = d[e]) && b.events) { for (var n in b.events) f[n] ? c.event.remove(k, n) : c.removeEvent(k, n, b.handle); b.handle && (b.handle.elem = null) } g ? delete k[c.expando] : k.removeAttribute && k.removeAttribute(c.expando); delete d[e] } } 
}); var oa = /alpha\([^)]*\)/i, Mb = /opacity=([^)]*)/, Nb = /([A-Z]|^ms)/g,
Ta = /^-?\d+(?:px)?$/i, Ob = /^-?\d/, Pb = /^([\-+])=([\-+.\de]+)/, Qb = { position: "absolute", visibility: "hidden", display: "block" }, db = ["Left", "Right"], eb = ["Top", "Bottom"], P, Ua, Va; c.fn.css = function (a, b) { return 2 === arguments.length && b === m ? this : c.access(this, a, b, !0, function (a, b, f) { return f !== m ? c.style(a, b, f) : c.css(a, b) }) }; c.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) { var c = P(a, "opacity", "opacity"); return "" === c ? "1" : c } return a.style.opacity } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0,
    orphans: !0, widows: !0, zIndex: !0, zoom: !0
}, cssProps: { "float": c.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, b, e, d) {
    if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var f, g = c.camelCase(b), h = a.style, k = c.cssHooks[g]; b = c.cssProps[g] || g; if (e === m) return k && "get" in k && (f = k.get(a, !1, d)) !== m ? f : h[b]; d = typeof e; "string" === d && (f = Pb.exec(e)) && (e = +(f[1] + 1) * +f[2] + parseFloat(c.css(a, b)), d = "number"); if (!(null == e || "number" === d && isNaN(e) || ("number" === d && !c.cssNumber[g] && (e += "px"), k && "set" in k && (e = k.set(a, e)) ===
m))) try { h[b] = e } catch (n) { } 
    } 
}, css: function (a, b, e) { var d, f; b = c.camelCase(b); f = c.cssHooks[b]; b = c.cssProps[b] || b; "cssFloat" === b && (b = "float"); if (f && "get" in f && (d = f.get(a, !0, e)) !== m) return d; if (P) return P(a, b) }, swap: function (a, b, c) { var d = {}, f; for (f in b) d[f] = a.style[f], a.style[f] = b[f]; c.call(a); for (f in b) a.style[f] = d[f] } 
}); c.curCSS = c.css; c.each(["height", "width"], function (a, b) {
    c.cssHooks[b] = { get: function (a, d, f) { var g; if (d) { if (0 !== a.offsetWidth) return ta(a, b, f); c.swap(a, Qb, function () { g = ta(a, b, f) }); return g } },
        set: function (a, b) { if (!Ta.test(b)) return b; b = parseFloat(b); if (0 <= b) return b + "px" } 
    }
}); c.support.opacity || (c.cssHooks.opacity = { get: function (a, b) { return Mb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "" }, set: function (a, b) {
    var e = a.style, d = a.currentStyle, f = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", g = d && d.filter || e.filter || ""; e.zoom = 1; if (1 <= b && "" === c.trim(g.replace(oa, "")) && (e.removeAttribute("filter"), d && !d.filter)) return; e.filter = oa.test(g) ?
g.replace(oa, f) : g + " " + f
} 
}); c(function () { c.support.reliableMarginRight || (c.cssHooks.marginRight = { get: function (a, b) { var e; c.swap(a, { display: "inline-block" }, function () { b ? e = P(a, "margin-right", "marginRight") : e = a.style.marginRight }); return e } }) }); p.defaultView && p.defaultView.getComputedStyle && (Ua = function (a, b) {
    var e, d; b = b.replace(Nb, "-$1").toLowerCase(); if (!(d = a.ownerDocument.defaultView)) return m; if (d = d.getComputedStyle(a, null)) e = d.getPropertyValue(b), "" === e && !c.contains(a.ownerDocument.documentElement,
a) && (e = c.style(a, b)); return e
}); p.documentElement.currentStyle && (Va = function (a, b) { var c, d, f, g = a.currentStyle && a.currentStyle[b], h = a.style; null === g && h && (f = h[b]) && (g = f); !Ta.test(g) && Ob.test(g) && (c = h.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g || 0, g = h.pixelLeft + "px", h.left = c, d && (a.runtimeStyle.left = d)); return "" === g ? "auto" : g }); P = Ua || Va; c.expr && c.expr.filters && (c.expr.filters.hidden = function (a) {
    var b = a.offsetHeight; return 0 === a.offsetWidth &&
0 === b || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || c.css(a, "display"))
}, c.expr.filters.visible = function (a) { return !c.expr.filters.hidden(a) }); var Rb = /%20/g, cb = /\[\]$/, Wa = /\r?\n/g, Sb = /#.*$/, Tb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Ub = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, Vb = /^(?:GET|HEAD)$/, Wb = /^\/\//, Xa = /\?/, Xb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Yb = /^(?:select|textarea)/i, sa = /\s+/, Zb =
/([?&])_=[^&]*/, Ya = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, Za = c.fn.load, ga = {}, $a = {}, Q, K, ab = ["*/"] + ["*"]; try { Q = nb.href } catch (ec) { Q = p.createElement("a"), Q.href = "", Q = Q.href } K = Ya.exec(Q.toLowerCase()) || []; c.fn.extend({ load: function (a, b, e) {
    if ("string" != typeof a && Za) return Za.apply(this, arguments); if (!this.length) return this; var d = a.indexOf(" "); if (0 <= d) { var f = a.slice(d, a.length); a = a.slice(0, d) } d = "GET"; b && (c.isFunction(b) ? (e = b, b = m) : "object" == typeof b && (b = c.param(b, c.ajaxSettings.traditional), d =
"POST")); var g = this; c.ajax({ url: a, type: d, dataType: "html", data: b, complete: function (a, b, d) { d = a.responseText; a.isResolved() && (a.done(function (a) { d = a }), g.html(f ? c("<div>").append(d.replace(Xb, "")).find(f) : d)); e && g.each(e, [d, b, a]) } }); return this
}, serialize: function () { return c.param(this.serializeArray()) }, serializeArray: function () {
    return this.map(function () { return this.elements ? c.makeArray(this.elements) : this }).filter(function () {
        return this.name && !this.disabled && (this.checked || Yb.test(this.nodeName) ||
Ub.test(this.type))
    }).map(function (a, b) { var e = c(this).val(); return null == e ? null : c.isArray(e) ? c.map(e, function (a, c) { return { name: b.name, value: a.replace(Wa, "\r\n")} }) : { name: b.name, value: e.replace(Wa, "\r\n")} }).get()
} 
}); c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) { c.fn[b] = function (a) { return this.bind(b, a) } }); c.each(["get", "post"], function (a, b) { c[b] = function (a, d, f, g) { c.isFunction(d) && (g = g || f, f = d, d = m); return c.ajax({ type: b, url: a, data: d, success: f, dataType: g }) } });
    c.extend({ getScript: function (a, b) { return c.get(a, m, b, "script") }, getJSON: function (a, b, e) { return c.get(a, b, e, "json") }, ajaxSetup: function (a, b) { b ? Z(a, c.ajaxSettings) : (b = a, a = c.ajaxSettings); Z(a, b); return a }, ajaxSettings: { url: Q, isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(K[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript",
        "*": ab
    }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": l.String, "text html": !0, "text json": c.parseJSON, "text xml": c.parseXML }, flatOptions: { context: !0, url: !0}
    }, ajaxPrefilter: ra(ga), ajaxTransport: ra($a), ajax: function (a, b) {
        function e(a, b, e, p) {
            if (2 !== D) {
                D = 2; w && clearTimeout(w); u = m; t = p || ""; y.readyState = 0 < a ? 4 : 0; var r, q, v; p = b; if (e) {
                    var M = d, B = y, G = M.contents, C = M.dataTypes, I = M.responseFields, z, E, F, O; for (E in I) E in e && (B[I[E]] = e[E]); for (; "*" ===
C[0]; ) C.shift(), z === m && (z = M.mimeType || B.getResponseHeader("content-type")); if (z) for (E in G) if (G[E] && G[E].test(z)) { C.unshift(E); break } if (C[0] in e) F = C[0]; else { for (E in e) { if (!C[0] || M.converters[E + " " + C[0]]) { F = E; break } O || (O = E) } F = F || O } F ? (F !== C[0] && C.unshift(F), e = e[F]) : e = void 0
                } else e = m; if (200 <= a && 300 > a || 304 === a) {
                    if (d.ifModified) { if (z = y.getResponseHeader("Last-Modified")) c.lastModified[l] = z; if (z = y.getResponseHeader("Etag")) c.etag[l] = z } if (304 === a) p = "notmodified", r = !0; else try {
                        z = d; z.dataFilter && (e = z.dataFilter(e,
z.dataType)); var Q = z.dataTypes; E = {}; var K, N, V = Q.length, P, R = Q[0], J, ia, S, U, L; for (K = 1; K < V; K++) { if (1 === K) for (N in z.converters) "string" == typeof N && (E[N.toLowerCase()] = z.converters[N]); J = R; R = Q[K]; if ("*" === R) R = J; else if ("*" !== J && J !== R) { ia = J + " " + R; S = E[ia] || E["* " + R]; if (!S) for (U in L = m, E) if (P = U.split(" "), P[0] === J || "*" === P[0]) if (L = E[P[1] + " " + R]) { U = E[U]; !0 === U ? S = L : !0 === L && (S = U); break } S || L || c.error("No conversion from " + ia.replace(" ", " to ")); !0 !== S && (e = S ? S(e) : L(U(e))) } } q = e; p = "success"; r = !0
                    } catch (Z) {
                        p = "parsererror",
v = Z
                    } 
                } else if (v = p, !p || a) p = "error", 0 > a && (a = 0); y.status = a; y.statusText = "" + (b || p); r ? h.resolveWith(f, [q, p, y]) : h.rejectWith(f, [y, p, v]); y.statusCode(n); n = m; H && g.trigger("ajax" + (r ? "Success" : "Error"), [y, d, r ? q : v]); k.fireWith(f, [y, p]); H && (g.trigger("ajaxComplete", [y, d]), --c.active || c.event.trigger("ajaxStop"))
            } 
        } "object" == typeof a && (b = a, a = m); b = b || {}; var d = c.ajaxSetup({}, b), f = d.context || d, g = f !== d && (f.nodeType || f instanceof c) ? c(f) : c.event, h = c.Deferred(), k = c.Callbacks("once memory"), n = d.statusCode || {}, l, p = {}, r =
{}, t, q, u, w, v, D = 0, H, G, y = { readyState: 0, setRequestHeader: function (a, b) { if (!D) { var c = a.toLowerCase(); a = r[c] = r[c] || a; p[a] = b } return this }, getAllResponseHeaders: function () { return 2 === D ? t : null }, getResponseHeader: function (a) { var b; if (2 === D) { if (!q) for (q = {}; b = Tb.exec(t); ) q[b[1].toLowerCase()] = b[2]; b = q[a.toLowerCase()] } return b === m ? null : b }, overrideMimeType: function (a) { D || (d.mimeType = a); return this }, abort: function (a) { a = a || "abort"; u && u.abort(a); e(0, a); return this } }; h.promise(y); y.success = y.done; y.error = y.fail;
        y.complete = k.add; y.statusCode = function (a) { if (a) { var b; if (2 > D) for (b in a) n[b] = [n[b], a[b]]; else b = a[y.status], y.then(b, b) } return this }; d.url = ((a || d.url) + "").replace(Sb, "").replace(Wb, K[1] + "//"); d.dataTypes = c.trim(d.dataType || "*").toLowerCase().split(sa); null == d.crossDomain && (v = Ya.exec(d.url.toLowerCase()), d.crossDomain = !(!v || v[1] == K[1] && v[2] == K[2] && (v[3] || ("http:" === v[1] ? 80 : 443)) == (K[3] || ("http:" === K[1] ? 80 : 443)))); d.data && d.processData && "string" != typeof d.data && (d.data = c.param(d.data, d.traditional));
        V(ga, d, b, y); if (2 === D) return !1; H = d.global; d.type = d.type.toUpperCase(); d.hasContent = !Vb.test(d.type); H && 0 === c.active++ && c.event.trigger("ajaxStart"); if (!d.hasContent && (d.data && (d.url += (Xa.test(d.url) ? "&" : "?") + d.data, delete d.data), l = d.url, !1 === d.cache)) { v = c.now(); var C = d.url.replace(Zb, "$1_=" + v); d.url = C + (C === d.url ? (Xa.test(d.url) ? "&" : "?") + "_=" + v : "") } (d.data && d.hasContent && !1 !== d.contentType || b.contentType) && y.setRequestHeader("Content-Type", d.contentType); d.ifModified && (l = l || d.url, c.lastModified[l] &&
y.setRequestHeader("If-Modified-Since", c.lastModified[l]), c.etag[l] && y.setRequestHeader("If-None-Match", c.etag[l])); y.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + ab + "; q=0.01" : "") : d.accepts["*"]); for (G in d.headers) y.setRequestHeader(G, d.headers[G]); if (d.beforeSend && (!1 === d.beforeSend.call(f, y, d) || 2 === D)) return y.abort(), !1; for (G in { success: 1, error: 1, complete: 1 }) y[G](d[G]); if (u = V($a, d, b, y)) {
            y.readyState = 1; H && g.trigger("ajaxSend",
[y, d]); d.async && 0 < d.timeout && (w = setTimeout(function () { y.abort("timeout") }, d.timeout)); try { D = 1, u.send(p, e) } catch (B) { 2 > D ? e(-1, B) : c.error(B) } 
        } else e(-1, "No Transport"); return y
    }, param: function (a, b) { var e = [], d = function (a, b) { b = c.isFunction(b) ? b() : b; e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b) }; b === m && (b = c.ajaxSettings.traditional); if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function () { d(this.name, this.value) }); else for (var f in a) H(f, a[f], b, d); return e.join("&").replace(Rb, "+") } 
    });
    c.extend({ active: 0, lastModified: {}, etag: {} }); var $b = c.now(), da = /(\=)\?(&|$)|\?\?/i; c.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { return c.expando + "_" + $b++ } }); c.ajaxPrefilter("json jsonp", function (a, b, e) {
        b = "application/x-www-form-urlencoded" === a.contentType && "string" == typeof a.data; if ("jsonp" === a.dataTypes[0] || !1 !== a.jsonp && (da.test(a.url) || b && da.test(a.data))) {
            var d, f = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, g = l[f], h = a.url, k = a.data, n = "$1" + f + "$2"; !1 !==
a.jsonp && (h = h.replace(da, n), a.url === h && (b && (k = k.replace(da, n)), a.data === k && (h += (/\?/.test(h) ? "&" : "?") + a.jsonp + "=" + f))); a.url = h; a.data = k; l[f] = function (a) { d = [a] }; e.always(function () { l[f] = g; d && c.isFunction(g) && l[f](d[0]) }); a.converters["script json"] = function () { d || c.error(f + " was not called"); return d[0] }; a.dataTypes[0] = "json"; return "script"
        } 
    }); c.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ },
        converters: { "text script": function (a) { c.globalEval(a); return a } }
    }); c.ajaxPrefilter("script", function (a) { a.cache === m && (a.cache = !1); a.crossDomain && (a.type = "GET", a.global = !1) }); c.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c = p.head || p.getElementsByTagName("head")[0] || p.documentElement; return { send: function (d, f) {
                b = p.createElement("script"); b.async = "async"; a.scriptCharset && (b.charset = a.scriptCharset); b.src = a.url; b.onload = b.onreadystatechange = function (a, d) {
                    if (d || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload =
b.onreadystatechange = null, c && b.parentNode && c.removeChild(b), b = m, d || f(200, "success")
                }; c.insertBefore(b, c.firstChild)
            }, abort: function () { b && b.onload(0, 1) } 
            }
        } 
    }); var pa = l.ActiveXObject ? function () { for (var a in L) L[a](0, 1) } : !1, ac = 0, L; c.ajaxSettings.xhr = l.ActiveXObject ? function () { var a; if (!(a = !this.isLocal && G()))a: { try { a = new l.ActiveXObject("Microsoft.XMLHTTP"); break a } catch (b) { } a = void 0 } return a } : G; (function (a) { c.extend(c.support, { ajax: !!a, cors: !!a && "withCredentials" in a }) })(c.ajaxSettings.xhr()); c.support.ajax &&
c.ajaxTransport(function (a) {
    if (!a.crossDomain || c.support.cors) {
        var b; return { send: function (e, d) {
            var f = a.xhr(), g, h; a.username ? f.open(a.type, a.url, a.async, a.username, a.password) : f.open(a.type, a.url, a.async); if (a.xhrFields) for (h in a.xhrFields) f[h] = a.xhrFields[h]; a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType); a.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"); try { for (h in e) f.setRequestHeader(h, e[h]) } catch (k) { } f.send(a.hasContent && a.data || null); b = function (e,
h) { var k, l, p, q, t; try { if (b && (h || 4 === f.readyState)) if (b = m, g && (f.onreadystatechange = c.noop, pa && delete L[g]), h) 4 !== f.readyState && f.abort(); else { k = f.status; p = f.getAllResponseHeaders(); q = {}; (t = f.responseXML) && t.documentElement && (q.xml = t); q.text = f.responseText; try { l = f.statusText } catch (u) { l = "" } k || !a.isLocal || a.crossDomain ? 1223 === k && (k = 204) : k = q.text ? 200 : 404 } } catch (v) { h || d(-1, v) } q && d(k, l, q, p) }; a.async && 4 !== f.readyState ? (g = ++ac, pa && (L || (L = {}, c(l).unload(pa)), L[g] = b), f.onreadystatechange = b) : b()
        }, abort: function () {
            b &&
b(0, 1)
        } 
        }
    } 
}); var fa = {}, I, N, bc = /^(?:toggle|show|hide)$/, cc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, ea, qa = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], Y; c.fn.extend({ show: function (a, b, e) {
    var d; if (a || 0 === a) return this.animate(u("show", 3), a, b, e); b = 0; for (e = this.length; b < e; b++) a = this[b], a.style && (d = a.style.display, !c._data(a, "olddisplay") && "none" === d && (d = a.style.display = ""), "" === d && "none" === c.css(a, "display") &&
c._data(a, "olddisplay", t(a.nodeName))); for (b = 0; b < e; b++) if (a = this[b], a.style && (d = a.style.display, "" === d || "none" === d)) a.style.display = c._data(a, "olddisplay") || ""; return this
}, hide: function (a, b, e) { if (a || 0 === a) return this.animate(u("hide", 3), a, b, e); var d; b = 0; for (e = this.length; b < e; b++) a = this[b], a.style && (d = c.css(a, "display"), "none" !== d && !c._data(a, "olddisplay") && c._data(a, "olddisplay", d)); for (b = 0; b < e; b++) this[b].style && (this[b].style.display = "none"); return this }, _toggle: c.fn.toggle, toggle: function (a, b,
e) { var d = "boolean" == typeof a; c.isFunction(a) && c.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || d ? this.each(function () { var b = d ? a : c(this).is(":hidden"); c(this)[b ? "show" : "hide"]() }) : this.animate(u("toggle", 3), a, b, e); return this }, fadeTo: function (a, b, c, d) { return this.filter(":hidden").css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function (a, b, e, d) {
    function f() {
        !1 === g.queue && c._mark(this); var b = c.extend({}, g), d = 1 === this.nodeType, e = d && c(this).is(":hidden"), f, l, p, m, q, u, v, w;
        b.animatedProperties = {}; for (p in a) {
            f = c.camelCase(p); p !== f && (a[f] = a[p], delete a[p]); l = a[f]; c.isArray(l) ? (b.animatedProperties[f] = l[1], l = a[f] = l[0]) : b.animatedProperties[f] = b.specialEasing && b.specialEasing[f] || b.easing || "swing"; if ("hide" === l && e || "show" === l && !e) return b.complete.call(this); d && ("height" === f || "width" === f) && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === c.css(this, "display") && "none" === c.css(this, "float") && (c.support.inlineBlockNeedsLayout && "inline" !==
t(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
        } null != b.overflow && (this.style.overflow = "hidden"); for (p in a) d = new c.fx(this, b, p), l = a[p], bc.test(l) ? (w = c._data(this, "toggle" + p) || ("toggle" === l ? e ? "show" : "hide" : 0), w ? (c._data(this, "toggle" + p, "show" === w ? "hide" : "show"), d[w]()) : d[l]()) : (m = cc.exec(l), q = d.cur(), m ? (u = parseFloat(m[2]), v = m[3] || (c.cssNumber[p] ? "" : "px"), "px" !== v && (c.style(this, p, (u || 1) + v), q *= (u || 1) / d.cur(), c.style(this, p, q + v)), m[1] && (u = ("-=" === m[1] ? -1 : 1) * u + q), d.custom(q, u,
v)) : d.custom(q, l, "")); return !0
    } var g = c.speed(b, e, d); if (c.isEmptyObject(a)) return this.each(g.complete, [!1]); a = c.extend({}, a); return !1 === g.queue ? this.each(f) : this.queue(g.queue, f)
}, stop: function (a, b, e) {
    "string" != typeof a && (e = b, b = a, a = m); b && !1 !== a && this.queue(a || "fx", []); return this.each(function () {
        var b, f = !1, g = c.timers, h = c._data(this); e || c._unmark(!0, this); if (null == a) for (b in h) { if (h[b].stop && b.indexOf(".run") === b.length - 4) { var k = h[b]; c.removeData(this, b, !0); k.stop(e) } } else h[b = a + ".run"] && h[b].stop &&
(h = h[b], c.removeData(this, b, !0), h.stop(e)); for (b = g.length; b--; ) g[b].elem !== this || null != a && g[b].queue !== a || (e ? g[b](!0) : g[b].saveState(), f = !0, g.splice(b, 1)); e && f || c.dequeue(this, a)
    })
} 
}); c.each({ slideDown: u("show", 1), slideUp: u("hide", 1), slideToggle: u("toggle", 1), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle"} }, function (a, b) { c.fn[a] = function (a, c, f) { return this.animate(b, a, c, f) } }); c.extend({ speed: function (a, b, e) {
    var d = a && "object" == typeof a ? c.extend({}, a) : { complete: e || !e &&
b || c.isFunction(a) && a, duration: a, easing: e && b || b && !c.isFunction(b) && b
    }; d.duration = c.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in c.fx.speeds ? c.fx.speeds[d.duration] : c.fx.speeds._default; if (null == d.queue || !0 === d.queue) d.queue = "fx"; d.old = d.complete; d.complete = function (a) { c.isFunction(d.old) && d.old.call(this); d.queue ? c.dequeue(this, d.queue) : !1 !== a && c._unmark(this) }; return d
}, easing: { linear: function (a, b, c, d) { return c + d * a }, swing: function (a, b, c, d) { return (-Math.cos(a * Math.PI) / 2 + .5) * d + c } },
    timers: [], fx: function (a, b, c) { this.options = b; this.elem = a; this.prop = c; b.orig = b.orig || {} } 
}); c.fx.prototype = { update: function () { this.options.step && this.options.step.call(this.elem, this.now, this); (c.fx.step[this.prop] || c.fx.step._default)(this) }, cur: function () { if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop]; var a, b = c.css(this.elem, this.prop); return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b : 0 : a }, custom: function (a, b, e) {
    function d(a) { return f.step(a) }
    var f = this, g = c.fx; this.startTime = Y || w(); this.end = b; this.now = this.start = a; this.pos = this.state = 0; this.unit = e || this.unit || (c.cssNumber[this.prop] ? "" : "px"); d.queue = this.options.queue; d.elem = this.elem; d.saveState = function () { f.options.hide && c._data(f.elem, "fxshow" + f.prop) === m && c._data(f.elem, "fxshow" + f.prop, f.start) }; d() && c.timers.push(d) && !ea && (ea = setInterval(g.tick, g.interval))
}, show: function () {
    var a = c._data(this.elem, "fxshow" + this.prop); this.options.orig[this.prop] = a || c.style(this.elem, this.prop); this.options.show =
!0; a !== m ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()); c(this.elem).show()
}, hide: function () { this.options.orig[this.prop] = c._data(this.elem, "fxshow" + this.prop) || c.style(this.elem, this.prop); this.options.hide = !0; this.custom(this.cur(), 0) }, step: function (a) {
    var b, e, d = Y || w(), f = !0, g = this.elem, h = this.options; if (a || d >= h.duration + this.startTime) {
        this.now = this.end; this.pos = this.state = 1; this.update(); h.animatedProperties[this.prop] = !0; for (b in h.animatedProperties) !0 !==
h.animatedProperties[b] && (f = !1); if (f) { null != h.overflow && !c.support.shrinkWrapBlocks && c.each(["", "X", "Y"], function (a, b) { g.style["overflow" + b] = h.overflow[a] }); h.hide && c(g).hide(); if (h.hide || h.show) for (b in h.animatedProperties) c.style(g, b, h.orig[b]), c.removeData(g, "fxshow" + b, !0), c.removeData(g, "toggle" + b, !0); (a = h.complete) && (h.complete = !1, a.call(g)) } return !1
    } Infinity == h.duration ? this.now = d : (e = d - this.startTime, this.state = e / h.duration, this.pos = c.easing[h.animatedProperties[this.prop]](this.state, e, 0,
1, h.duration), this.now = this.start + (this.end - this.start) * this.pos); this.update(); return !0
} 
}; c.extend(c.fx, { tick: function () { for (var a, b = c.timers, e = 0; e < b.length; e++) a = b[e], !a() && b[e] === a && b.splice(e--, 1); b.length || c.fx.stop() }, interval: 13, stop: function () { clearInterval(ea); ea = null }, speeds: { slow: 600, fast: 200, _default: 400 }, step: { opacity: function (a) { c.style(a.elem, "opacity", a.now) }, _default: function (a) { a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now } } }); c.each(["width",
"height"], function (a, b) { c.fx.step[b] = function (a) { c.style(a.elem, b, Math.max(0, a.now)) } }); c.expr && c.expr.filters && (c.expr.filters.animated = function (a) { return c.grep(c.timers, function (b) { return a === b.elem }).length }); var dc = /^t(?:able|d|h)$/i, bb = /^(?:body|html)$/i; "getBoundingClientRect" in p.documentElement ? c.fn.offset = function (a) {
    var b = this[0], e; if (a) return this.each(function (b) { c.offset.setOffset(this, a, b) }); if (!b || !b.ownerDocument) return null; if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
    try { e = b.getBoundingClientRect() } catch (d) { } var f = b.ownerDocument, g = f.documentElement; if (!e || !c.contains(g, b)) return e ? { top: e.top, left: e.left} : { top: 0, left: 0 }; b = f.body; f = v(f); return { top: e.top + (f.pageYOffset || c.support.boxModel && g.scrollTop || b.scrollTop) - (g.clientTop || b.clientTop || 0), left: e.left + (f.pageXOffset || c.support.boxModel && g.scrollLeft || b.scrollLeft) - (g.clientLeft || b.clientLeft || 0)}
} : c.fn.offset = function (a) {
    var b = this[0]; if (a) return this.each(function (b) { c.offset.setOffset(this, a, b) }); if (!b ||
!b.ownerDocument) return null; if (b === b.ownerDocument.body) return c.offset.bodyOffset(b); var e, d = b.offsetParent, f = b.ownerDocument, g = f.documentElement, h = f.body; e = (f = f.defaultView) ? f.getComputedStyle(b, null) : b.currentStyle; for (var k = b.offsetTop, l = b.offsetLeft; (b = b.parentNode) && b !== h && b !== g && (!c.support.fixedPosition || "fixed" !== e.position); ) e = f ? f.getComputedStyle(b, null) : b.currentStyle, k -= b.scrollTop, l -= b.scrollLeft, b === d && (k += b.offsetTop, l += b.offsetLeft, c.support.doesNotAddBorder && (!c.support.doesAddBorderForTableAndCells ||
!dc.test(b.nodeName)) && (k += parseFloat(e.borderTopWidth) || 0, l += parseFloat(e.borderLeftWidth) || 0), d = b.offsetParent), c.support.subtractsBorderForOverflowNotVisible && "visible" !== e.overflow && (k += parseFloat(e.borderTopWidth) || 0, l += parseFloat(e.borderLeftWidth) || 0); if ("relative" === e.position || "static" === e.position) k += h.offsetTop, l += h.offsetLeft; c.support.fixedPosition && "fixed" === e.position && (k += Math.max(g.scrollTop, h.scrollTop), l += Math.max(g.scrollLeft, h.scrollLeft)); return { top: k, left: l}
}; c.offset = { bodyOffset: function (a) {
    var b =
a.offsetTop, e = a.offsetLeft; c.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(c.css(a, "marginTop")) || 0, e += parseFloat(c.css(a, "marginLeft")) || 0); return { top: b, left: e}
}, setOffset: function (a, b, e) {
    var d = c.css(a, "position"); "static" === d && (a.style.position = "relative"); var f = c(a), g = f.offset(), h = c.css(a, "top"), k = c.css(a, "left"), l = {}, p = {}, m, r; ("absolute" === d || "fixed" === d) && -1 < c.inArray("auto", [h, k]) ? (p = f.position(), m = p.top, r = p.left) : (m = parseFloat(h) || 0, r = parseFloat(k) || 0); c.isFunction(b) && (b = b.call(a,
e, g)); null != b.top && (l.top = b.top - g.top + m); null != b.left && (l.left = b.left - g.left + r); "using" in b ? b.using.call(a, l) : f.css(l)
} 
}; c.fn.extend({ position: function () {
    if (!this[0]) return null; var a = this[0], b = this.offsetParent(), e = this.offset(), d = bb.test(b[0].nodeName) ? { top: 0, left: 0} : b.offset(); e.top -= parseFloat(c.css(a, "marginTop")) || 0; e.left -= parseFloat(c.css(a, "marginLeft")) || 0; d.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0; d.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0; return { top: e.top - d.top, left: e.left -
d.left
    }
}, offsetParent: function () { return this.map(function () { for (var a = this.offsetParent || p.body; a && !bb.test(a.nodeName) && "static" === c.css(a, "position"); ) a = a.offsetParent; return a }) } 
}); c.each(["Left", "Top"], function (a, b) {
    var e = "scroll" + b; c.fn[e] = function (b) {
        var f, g; return b === m ? (f = this[0], f ? (g = v(f)) ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e] : null) : this.each(function () {
            (g = v(this)) ? g.scrollTo(a ? c(g).scrollLeft() : b, a ? b :
c(g).scrollTop()) : this[e] = b
        })
    } 
}); c.each(["Height", "Width"], function (a, b) {
    var e = b.toLowerCase(); c.fn["inner" + b] = function () { var a = this[0]; return a ? a.style ? parseFloat(c.css(a, e, "padding")) : this[e]() : null }; c.fn["outer" + b] = function (a) { var b = this[0]; return b ? b.style ? parseFloat(c.css(b, e, a ? "margin" : "border")) : this[e]() : null }; c.fn[e] = function (a) {
        var f = this[0]; if (!f) return null == a ? null : this; if (c.isFunction(a)) return this.each(function (b) { var f = c(this); f[e](a.call(this, b, f[e]())) }); if (c.isWindow(f)) {
            var g =
f.document.documentElement["client" + b], h = f.document.body; return "CSS1Compat" === f.document.compatMode && g || h && h["client" + b] || g
        } return 9 === f.nodeType ? Math.max(f.documentElement["client" + b], f.body["scroll" + b], f.documentElement["scroll" + b], f.body["offset" + b], f.documentElement["offset" + b]) : a === m ? (f = c.css(f, e), g = parseFloat(f), c.isNumeric(g) ? g : f) : this.css(e, "string" == typeof a ? a : a + "px")
    } 
}); l.jQuery = l.$ = c
})(window);
(function (l, m) {
    var v = l(m); l.fn.lazyload = function (t) {
        function u() { var m = 0; O.each(function () { var t = l(this); if (!(w.skip_invisible && !t.is(":visible") || l.abovethetop(this, w) || l.leftofbegin(this, w))) if (!l.belowthefold(this, w) && !l.rightoffold(this, w)) t.trigger("appear"); else if (++m > w.failure_limit) return !1 }) } var O = this, w = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: m, data_attribute: "original", skip_invisible: !0, appear: null, load: null }; t && (void 0 !== t.failurelimit && (t.failure_limit = t.failurelimit,
delete t.failurelimit), void 0 !== t.effectspeed && (t.effect_speed = t.effectspeed, delete t.effectspeed), l.extend(w, t)); t = void 0 === w.container || w.container === m ? v : l(w.container); 0 === w.event.indexOf("scroll") && t.bind(w.event, function (l) { return u() }); this.each(function () {
    var m = this, t = l(m); m.loaded = !1; t.one("appear", function () {
        this.loaded || (w.appear && w.appear.call(m, O.length, w), l("<img />").bind("load", function () {
            t.hide().attr("src", t.data(w.data_attribute))[w.effect](w.effect_speed); m.loaded = !0; var u = l.grep(O,
function (l) { return !l.loaded }); O = l(u); w.load && w.load.call(m, O.length, w)
        }).attr("src", t.data(w.data_attribute)))
    }); 0 !== w.event.indexOf("scroll") && t.bind(w.event, function (l) { m.loaded || t.trigger("appear") })
}); v.bind("resize", function (l) { u() }); u(); return this
    }; l.belowthefold = function (t, u) { return (void 0 === u.container || u.container === m ? v.height() + v.scrollTop() : l(u.container).offset().top + l(u.container).height()) <= l(t).offset().top - u.threshold }; l.rightoffold = function (t, u) {
        return (void 0 === u.container || u.container ===
m ? v.width() + v.scrollLeft() : l(u.container).offset().left + l(u.container).width()) <= l(t).offset().left - u.threshold
    }; l.abovethetop = function (t, u) { return (void 0 === u.container || u.container === m ? v.scrollTop() : l(u.container).offset().top) >= l(t).offset().top + u.threshold + l(t).height() }; l.leftofbegin = function (t, u) { return (void 0 === u.container || u.container === m ? v.scrollLeft() : l(u.container).offset().left) >= l(t).offset().left + u.threshold + l(t).width() }; l.inviewport = function (m, u) {
        return !l.rightofscreen(m, u) && !l.leftofscreen(m,
u) && !l.belowthefold(m, u) && !l.abovethetop(m, u)
    }; l.extend(l.expr[":"], { "below-the-fold": function (m) { return l.belowthefold(m, { threshold: 0 }) }, "above-the-top": function (m) { return !l.belowthefold(m, { threshold: 0 }) }, "right-of-screen": function (m) { return l.rightoffold(m, { threshold: 0 }) }, "left-of-screen": function (m) { return !l.rightoffold(m, { threshold: 0 }) }, "in-viewport": function (m) { return !l.inviewport(m, { threshold: 0 }) }, "above-the-fold": function (m) { return !l.belowthefold(m, { threshold: 0 }) }, "right-of-fold": function (m) {
        return l.rightoffold(m,
{ threshold: 0 })
    }, "left-of-fold": function (m) { return !l.rightoffold(m, { threshold: 0 }) } 
    })
})(jQuery, window);
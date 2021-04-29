(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

!function (e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var r = n[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports;
  }

  var n = {};
  return t.m = e, t.c = n, t.p = "", t(0);
}([function (e, t, n) {
  "use strict";

  var i = n(7),
      r = n(11),
      o = n(12),
      a = n(15),
      s = n(16);
  r.ready(function () {
    console.log("square grid is here!");
    var e = JSON.parse(i["default"].byId("square-grid-json").innerHTML),
        t = [];
    e.overlay_enabled && (t.push(a.bind()), t.push(s.bind())), o["default"](e, t, function (t) {
      e.overlay_enabled && a.bindEvents(t);
    });
  });
}, function (e, t, n) {
  "use strict";

  function i(e, t) {
    return function (n, i) {
      for (var r = i.target; r && r !== n;) {
        if (u.matchesSelector(r, e)) return t.call(this, r, i);
        r = r.parentElement;
      }
    };
  }

  function r(e, t, n) {
    var i = this,
        r = function r(t) {
      return n.call(i, e, t);
    };

    return e.addEventListener(t, r), {
      release: function release() {
        return e.removeEventListener(t, r);
      }
    };
  }

  function o(e, t, n) {
    return i = l(t, n), t = i[0], n = i[1], r(e, t, n);
    var i;
  }

  function a(e, t, n, o) {
    return a = l(t, o), t = a[0], o = a[1], r(e, t, i(n, o));
    var a;
  }

  var s = this,
      u = n(2),
      c = function c(e) {
    return function (t, n) {
      var i = n.relatedTarget;
      i && (i === t || t.contains(i)) || e.call(s, t, n);
    };
  },
      l = function l(e, t) {
    return "mouseenter" === e || "mouseleave" === e ? ["mouse" + ("mouseenter" === e ? "over" : "out"), c(t)] : [e, t];
  };

  t.addEvent = o, t.mapEvent = a;
}, function (e, t) {
  "use strict";

  var n = document.documentElement,
      i = n.matches || n.webkitMatchesSelector || n.msMatchesSelector;

  t.matchesSelector = function (e, t) {
    return i.call(e, t);
  };
}, function (e, t, n) {
  "use strict";

  function i() {}

  var r = n(4),
      o = n(5),
      a = n(6),
      s = 1e4,
      u = 6,
      c = function () {
    function e(e) {
      this.load = "", this.timeout = e, this.$state = "IDLE";
    }

    return e.prototype.isReady = function () {
      return "IDLE" == this.$state;
    }, e.prototype.loadImg = function (e, t) {
      this.$state = "LOADING";
      var n = document.createElement("img");
      n.onload = this.onLoad.bind(this, n, Date.now(), t), n.onerror = this.onError.bind(this, t), this.observe(t), n.src = this.load = e;
    }, e.prototype.cleanup = function () {
      this.$state = "IDLE", clearTimeout(this.wait);
    }, e.prototype.observe = function (e) {
      this.wait = setTimeout(function () {
        this.cleanup.bind(this), e();
      }.bind(this), this.timeout);
    }, e.prototype.onLoad = function (e, t, n) {
      e.onload = i, e.onerror = i, this.time = Date.now() - t, this.cleanup(), n(e);
    }, e.prototype.onError = function (e) {
      this.cleanup(), e();
    }, e;
  }(),
      l = function () {
    function e(e) {
      this.$update = e, this.$store = {}, this.$queue = [], this.$times = [], this.$workers = [], this.addWorker();
    }

    return e.prototype.addWorker = function () {
      this.$workers.push(new c(s));
    }, e.prototype.expandPool = function () {
      r.reduce(function (e, t) {
        return t.isReady() ? e + 1 : e;
      }, 0, this.$workers) < 2 && h(this.$times) < 1e3 && (this.addWorker(), this.$workers.length === u && (this.expandPool = function () {}));
    }, e.prototype.findWorker = function () {
      var e = r.find(function (e) {
        return e.isReady();
      }, this.$workers);
      if (e instanceof o.Just) return e.value;
    }, e.prototype.inStore = function (e) {
      return e in this.$store;
    }, e.prototype.inProgress = function (e) {
      return r.find(function (t) {
        return t.load === e;
      }, this.$workers) instanceof o.Just;
    }, e.prototype.load = function (e) {
      var t = e.src;
      if (this.inStore(t)) return this.$update(e, this.$store[t]), !0;
      if (this.inProgress(t)) return !0;
      var n = this.findWorker();
      return n instanceof c && (this.loadImg(n, e), !0);
    }, e.prototype.loadImg = function (e, t) {
      var n = this;
      e.loadImg(t.src, function (i) {
        i && (n.$store[t.src] = i, n.$update(t, i), n.$times.push(e.time), n.expandPool()), n.next();
      });
    }, e.prototype.next = function () {
      this.$queue.length && this.load(this.$queue[0]) && (this.$queue.shift(), setTimeout(this.next.bind(this), 0));
    }, e.prototype.run = function (e) {
      this.$queue = e.slice(), this.next();
    }, e;
  }(),
      d = new a["default"](),
      f = new l(d.fire.bind(d)),
      h = function h(e) {
    return r.reduce(function (e, t) {
      return e + t;
    }, 0, e) / e.length;
  };

  t.bind = d.bind.bind(d), t.load = f.run.bind(f);
}, function (e, t, n) {
  "use strict";

  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      e(t[n], n);
    }
  }

  function r(e, t, n) {
    return i(function (n, i) {
      return t = e(t, n, i);
    }, n), t;
  }

  function o(e, t) {
    return r(function (t, n) {
      return t.concat(e(n));
    }, [], t);
  }

  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      if (1 == e(i)) return [i, n];
    }
  }

  function s(e, t) {
    var n = a(e, t);
    return Array.isArray(n) ? new c.Just(n[1]) : new c.Nothing();
  }

  function u(e, t) {
    var n = a(e, t);
    return Array.isArray(n) ? new c.Just(n[0]) : new c.Nothing();
  }

  var c = n(5);
  t.each = i, t.reduce = r, t.map = o, t.filter = function (e, t) {
    return r(function (t, n) {
      return e(n) ? t.concat(n) : t;
    }, [], t);
  }, t.findIndex = s, t.find = u;
}, function (e, t) {
  "use strict";

  var n = function () {
    function e(e) {
      this.value = e;
    }

    return e.prototype.bind = function (e) {
      return e(this.value);
    }, e;
  }();

  t.Just = n;

  var i = function () {
    function e() {}

    return e.prototype.bind = function () {
      return this;
    }, e;
  }();

  t.Nothing = i;
}, function (e, t, n) {
  "use strict";

  var i = n(4),
      r = {},
      o = 0,
      a = function () {
    function e() {
      this.$bindings = [];
    }

    return e.prototype.bind = function (e) {
      var t = "em-" + o++;
      return this.$bindings.push({
        cid: t,
        binding: e
      }), {
        release: this.$release.bind(this, t)
      };
    }, e.prototype.fire = function () {
      for (var e = [], t = 0; t < arguments.length; t++) {
        e[t] = arguments[t];
      }

      i.each(function (t) {
        var n = t.binding;
        return n.apply(r, e);
      }, this.$bindings);
    }, e.prototype.$release = function (e) {
      this.$bindings = i.filter(function (t) {
        return t.cid !== e;
      }, this.$bindings);
    }, e;
  }();

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t["default"] = a;
}, function (e, t, n) {
  "use strict";

  var i = n(8),
      r = "getComputedStyle" in window ? "getComputedStyle" : "currentStyle",
      o = document,
      a = {
    $: function $(e, t) {
      return void 0 === t && (t = o), t.querySelectorAll(e);
    },
    byId: function byId(e, t) {
      return void 0 === t && (t = o), t.getElementById(e);
    },
    getStyle: function getStyle(e, t) {
      return window[r](e)[t];
    },
    height: function height(e) {
      return e.offsetHeight;
    },
    width: function width(e) {
      return e.offsetWidth;
    },
    addClass: function addClass(e, t) {
      return e.classList.add(t);
    },
    hasClass: function hasClass(e, t) {
      return e.classList.contains(t);
    },
    removeClass: function removeClass(e, t) {
      return e.classList.remove(t);
    }
  };
  a.size = function (e) {
    return {
      width: a.width(e),
      height: a.height(e)
    };
  }, a.offset = function (e) {
    var t = e.getBoundingClientRect(),
        n = document.documentElement;
    return {
      top: t.top + window.pageYOffset - n.clientTop,
      left: t.left + window.pageXOffset - n.clientLeft
    };
  }, a.rect = function (e) {
    return i.extend(a.offset(e), {
      width: a.width(e),
      height: a.height(e)
    });
  }, Object.defineProperty(t, "__esModule", {
    value: !0
  }), t["default"] = a;
}, function (e, t, n) {
  "use strict";

  function i(e) {
    for (var t = [], n = 1; n < arguments.length; n++) {
      t[n - 1] = arguments[n];
    }

    return o.each(function (t) {
      for (var n in t) {
        t.hasOwnProperty(n) && (e[n] = t[n]);
      }
    }, t), e;
  }

  function r(e) {
    var t,
        n = Object.keys(e),
        i = n.length;
    return function (r) {
      if (r === e) return !0;

      for (var o = 0; o < i; o++) {
        if (t = n[o], r[t] !== e[t]) return !1;
      }

      return !0;
    };
  }

  var o = n(4);
  t.extend = i, t.pick = function (e) {
    for (var t = [], n = 1; n < arguments.length; n++) {
      t[n - 1] = arguments[n];
    }

    return o.reduce(function (t, n) {
      return n in e && (t[n] = e[n]), t;
    }, {}, t);
  }, t.where = r;
}, function (e, t) {
  "use strict";

  function n(e, n, i) {
    for (var r = [t.normalize(e, i)], o = 0, a = 0, s = 0, u = 0; o < n; o++) {
      o % 2 ? (a = ++s, r.push(t.normalize(e - a, i))) : (a = ++u, r.push(t.normalize(e + a, i)));
    }

    return r.slice(0, Math.min(n + 1, i));
  }

  t.normalize = function (e, t) {
    return (t + e) % t;
  }, t.slice = n;
},, function (e, t, n) {
  "use strict";

  function i() {
    a.each(function (e) {
      return e();
    }, u), u = [], a.each(function (e) {
      return e.release();
    }, c), c = [];
  }

  function r(e) {
    return "loading" !== document.readyState ? setTimeout(e, 0) : (u.push(e), void (s || (s = !0, c.push(o.addEvent(document, "DOMContentLoaded", i)), c.push(o.addEvent(window, "load", i)))));
  }

  var o = n(1),
      a = n(4),
      s = !1,
      u = [],
      c = [];
  t.ready = r;
}, function (e, t, n) {
  "use strict";

  function i(e, t, n) {
    var i = [];
    return o.each(function (e) {
      var r = e.update(t[e.id], n),
          o = r[0],
          a = r[1];
      t[e.id] = o, i.push(a);
    }, e), [t, i];
  }

  function r(e, t, n) {
    var r = window.pageYOffset,
        f = a["default"].byId("square-grid-container");
    t.unshift(l.bind());
    var h = o.reduce(function (t, n) {
      return n.initialModel(e, f, t);
    }, {}, t),
        p = u.start(h, i.bind(d, t));
    c.bind(function (e, t) {
      var n = e.id,
          i = e.src;
      return p({
        ctor: "PlaceImg",
        id: n,
        src: i,
        img: t
      });
    }), n(p), s.addEvent(window, "resize", p.bind(d, {
      ctor: "Resize"
    })), s.addEvent(window, "scroll", function () {
      window.pageYOffset !== r && p({
        ctor: "Scroll"
      }), r = window.pageYOffset;
    }), p({
      ctor: "Resize"
    }), p({
      ctor: "Scroll"
    });
  }

  var o = n(4),
      a = n(7),
      s = n(1),
      u = n(13),
      c = n(3),
      l = n(14),
      d = {};
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t["default"] = r;
}, function (e, t, n) {
  "use strict";

  function i(e, t) {
    e instanceof u && t(e.task()), e instanceof c && e.runTask(t);
  }

  function r(e, t) {
    a.each(function (e) {
      Array.isArray(e) ? a.each(function (e) {
        return i(e, t);
      }, e) : i(e, t);
    }, e);
  }

  function o(e, t) {
    return function n(i) {
      var o = t(e, i),
          a = o[0],
          s = o[1];
      e = a, r(s, n);
    };
  }

  var a = n(4),
      s = function () {
    function e() {}

    return e;
  }(),
      u = function () {
    function e(e) {
      this.task = e;
    }

    return e;
  }(),
      c = function () {
    function e(e) {
      this.task = e;
    }

    return e.prototype.runTask = function (e) {
      this.task(e);
    }, e;
  }();

  t.noEffect = new s(), t.asyncTask = function (e) {
    return new c(e);
  }, t.task = function (e) {
    return new u(e);
  }, t.start = o;
}, function (e, t, n) {
  "use strict";

  function i(e, t) {
    var n = g(e, t);
    return [Math.min(t.max_width, t.max_width * n), Math.min(t.max_height, t.max_height * n)];
  }

  function r(e, t) {
    var n = i(e, t),
        r = n[0],
        o = n[1];
    t.width = r, t.height = o;
    var a = c["default"].rect(t.el);
    t.x1 = a.left, t.y1 = a.top, t.y2 = a.top + a.height;
  }

  function o(e, t) {
    return e.removeAttribute("srcSet"), e.classList.remove("fouc"), e.classList.remove("-no-srcset"), e.src = t, {
      ctor: "NoOp"
    };
  }

  function a(e, t) {
    var n = l.find(function (e) {
      return e.id == t.id;
    }, e.items);

    if (n instanceof d.Just) {
      var i = n.value;
      if (i.img.src !== t.src) return p.task(o.bind(m, i.img, t.src));
    }

    return p.noEffect;
  }

  function s(e, t, n) {
    return n.grid = {
      columns: e.columns,
      containerEl: t,
      items: l.reduce(function (e, n) {
        return l.reduce(function (e, t) {
          return l.reduce(function (e, i) {
            return e.concat(f.extend(n, {
              el: t,
              img: i
            }));
          }, e, c["default"].$("img", t));
        }, e, c["default"].$('li[data-id="' + n.id + '"]', t));
      }, [], e.items),
      tileSize: 0
    }, n;
  }

  function u() {
    return {
      id: "grid",
      update: w,
      initialModel: s
    };
  }

  var c = n(7),
      l = n(4),
      d = n(5),
      f = n(8),
      h = n(3),
      p = n(13),
      m = {},
      g = function g(e, t) {
    var n = t.highlighted,
        i = t.zoom,
        r = t.max_height,
        o = t.max_width;
    return (n ? 2 : 1) * e / (Math.min(r, o) * i);
  },
      v = function v(e) {
    var t = c["default"].width(e.containerEl) / e.columns;
    return e.tileSize = t, l.each(r.bind(m, t), e.items), [e, [b(e), p.task(y.bind(m, t, e.items))]];
  },
      y = function y(e, t) {
    return l.each(function (t) {
      var n = t.x,
          i = t.y,
          r = t.width,
          o = t.height,
          a = t.highlighted,
          s = t.img,
          u = e * (a ? 2 : 1);
      s.style.left = -n * (r - u) + "px", s.style.top = -i * (o - u) + "px", s.width = r, s.height = o;
    }, t), {
      ctor: "NoOp"
    };
  },
      _ = function _(e, t, n) {
    var i = Math.min(e.max_width, g(n, e) * e.max_width) / e.max_width,
        r = Math.ceil(5 * i) / 5;
    return {
      id: e.id,
      delta: t,
      x: e.x1,
      src: [e.src, ["w=" + e.max_width * r, "h=" + e.max_height * r].join("&")].join("?")
    };
  },
      b = function b(e) {
    return p.task(function () {
      var t = window.pageYOffset,
          n = c["default"].rect(e.containerEl),
          i = Math.max(n.top, t),
          r = Math.min(t + window.innerHeight, n.top + n.height);
      return h.load(l.reduce(function (t, n) {
        return n.y1 < i && r > n.y1 || n.y2 >= i && n.y1 <= r || i < n.y2 && r > n.y2 ? t.concat(_(n, Math.abs(i - n.y1), e.tileSize)) : t;
      }, [], e.items).sort(function (e, t) {
        return e.delta == t.delta ? e.x - t.x : e.delta - t.delta;
      })), {
        ctor: "NoOp"
      };
    });
  };

  t.initialModel = s;

  var w = function w(e, t) {
    return "Resize" === t.ctor ? v(e) : "Scroll" === t.ctor ? [e, b(e)] : "PlaceImg" === t.ctor ? [e, a(e, t)] : [e, p.noEffect];
  };

  t.bind = u;
}, function (e, t, n) {
  "use strict";

  function i() {
    var e = p["default"].$(".slide.active")[0],
        t = p["default"].size(e),
        n = t.height,
        i = t.width,
        r = parseFloat(p["default"].getStyle(e, "paddingBottom"));
    return {
      height: n - r,
      width: i,
      ratio: n / i
    };
  }

  function r(e) {
    return e.canvas = i(), [e, _.task(function () {
      return s(e.canvas, e.items), {
        ctor: "NoOp"
      };
    })];
  }

  function o(e, t) {
    return e.current = t, u(t, e.items), [e, _.task(function () {
      return {
        ctor: "Transition.ShowSlide",
        active: e.current
      };
    })];
  }

  function a(e, t) {
    var n = v.find(function (t) {
      return e.id == t.id;
    }, t);

    if (n instanceof g.Just) {
      var i = n.value;
      i.figEl.classList.remove("loading"), i.imgEl.src = e.img.src;
    }

    return {
      ctor: "NoOp"
    };
  }

  function s(e, t) {
    v.each(function (t) {
      var n = e.width,
          i = t.max_height / t.max_width;
      i > e.ratio && (n = e.height * (1 / i)), t.figEl.style.width = Math.min(t.max_width, n) + "px";
    }, t);
  }

  function u(e, t) {
    b.load(v.map(function (e) {
      return y.pick(t[e], "id", "src");
    }, w.slice(e, E, t.length)));
  }

  function c(e) {
    var t = e.current,
        n = e.canvas,
        i = e.containerEl,
        r = e.items;
    return i.classList.add("active"), u(t, r), s(n, r), {
      ctor: "Transition.Initialize",
      current: t
    };
  }

  function l(e) {
    return e.active = !1, p["default"].removeClass(e.containerEl, "active"), e;
  }

  function d(e, t) {
    console.log("SHOW OVERLAY"), e.active = !0;
    var n = v.findIndex(function (e) {
      return e.id == t.id;
    }, e.items);
    return n instanceof g.Just && (e.current = n.value), v.each(function (t, n) {
      n == e.current ? x.activateEl(t.slideEl) : x.deactivateEl(t.slideEl);
    }, e.items), e.containerEl.classList.add("active"), e.canvas = i(), [e, _.task(c.bind(S, e))];
  }

  function f(e, t, n) {
    var i = p["default"].byId("overlay"),
        r = {
      width: 0,
      height: 0,
      ratio: 0
    };
    return n.overlay = {
      active: !1,
      canvas: r,
      current: 0,
      containerEl: i,
      items: v.map(function (e) {
        return v.reduce(function (t, n) {
          return v.reduce(function (t, i) {
            return v.reduce(function (t, r) {
              return y.extend({
                slideEl: n,
                figEl: i,
                imgEl: r
              }, y.pick(e, "id", "src", "max_width", "max_height"));
            }, t, p["default"].$("div.fig > div > img", n));
          }, t, p["default"].$("div.fig", n));
        }, {}, p["default"].$('li[data-id="' + e.id + '"]', i));
      }, e.items)
    }, n;
  }

  function h(e) {
    var t = {
      sX: 0,
      sY: 0,
      eX: 0,
      eY: 0
    },
        n = 30,
        i = 30,
        r = 50,
        o = 60,
        a = "";
    m.mapEvent(document, "touchstart", ".slide", function (e, n) {
      var i = n.touches[0];
      t.sX = i.screenX, t.sY = i.screenY;
    }), m.mapEvent(document, "touchmove", ".slide", function (e, n) {
      var i = n.touches[0];
      t.eX = i.screenX, t.eY = i.screenY;
    }), m.mapEvent(document, "touchend", ".slide", function () {
      (t.eX - n > t.sX || t.eX + n < t.sX) && t.eY < t.sY + o && t.sY > t.eY - o && t.eX > 0 ? a = t.eX > t.sX ? "r" : "l" : (t.eY - r > t.sY || t.eY + r < t.sY) && t.eX < t.sX + i && t.sX > t.eX - i && t.eY > 0 && (a = t.eY > t.sY ? "d" : "u"), "" != a && ("r" == a ? e({
        ctor: "ShowNextSlide"
      }) : "l" == a && e({
        ctor: "ShowPreviousSlide"
      })), a = "", t.sX = 0, t.sY = 0, t.eX = 0, t.eY = 0;
    }), m.mapEvent(document, "click", "#overlay li[data-id] .share a", function (e, t) {
      t.stopImmediatePropagation(), t.stopPropagation();
    }), m.mapEvent(p["default"].byId("square-grid-container"), "click", "#square-grid-container li[data-id]", function (t) {
      e({
        ctor: "Show",
        id: Number(t.getAttribute("data-id"))
      });
    }), m.mapEvent(document, "click", "#overlay li[data-id]", function () {
      e({
        ctor: "ShowNextSlide"
      });
    }), m.mapEvent(document, "click", "#overlay .close", function () {
      e({
        ctor: "Exit"
      });
    }), m.mapEvent(document, "click", "#overlay .navigation .forward", function (t, n) {
      n.preventDefault(), e({
        ctor: "ShowNextSlide"
      });
    }), m.mapEvent(document, "click", "#overlay .navigation .backward", function (t, n) {
      n.preventDefault(), e({
        ctor: "ShowPreviousSlide"
      });
    }), m.addEvent(document, "keydown", function (t, n) {
      var i = n.which;
      return [37, 39].indexOf(i) > -1 ? e(37 == i ? {
        ctor: "ShowPreviousSlide"
      } : {
        ctor: "ShowNextSlide"
      }) : 27 === i ? e({
        ctor: "Exit"
      }) : void 0;
    });
  }

  var p = n(7),
      m = n(1),
      g = n(5),
      v = n(4),
      y = n(8),
      _ = n(13),
      b = n(3),
      w = n(9),
      x = n(16),
      E = 9,
      S = {},
      A = function A(e, t, n) {
    return (2 * n + (e + t)) % n;
  },
      C = function C(e, t) {
    return "Show" === t.ctor ? d(e, t) : e.active === !0 ? "Exit" === t.ctor ? [l(e), _.noEffect] : "ShowPreviousSlide" === t.ctor ? o(e, A(e.current, -1, e.items.length)) : "ShowNextSlide" === t.ctor ? o(e, A(e.current, 1, e.items.length)) : "PlaceImg" === t.ctor ? [e, _.task(a.bind(S, t, e.items))] : "Resize" === t.ctor ? r(e) : [e, _.noEffect] : [e, _.noEffect];
  };

  t.bindEvents = h, t.bind = function () {
    return {
      id: "overlay",
      update: C,
      initialModel: f
    };
  };
}, function (e, t, n) {
  "use strict";

  function i() {}

  function r(e) {
    p["default"].removeClass(e, "not-active"), p["default"].addClass(e, "active");
  }

  function o(e) {
    p["default"].removeClass(e, "active"), p["default"].addClass(e, "not-active");
  }

  function a(e, t) {
    e.state = "TRANSITIONING";
    var n = h.asyncTask(function (n) {
      var i = {
        ctor: "Deactivated",
        el: t
      };
      e.binding = m.addEvent(t, "transitionend", function () {
        return n(i);
      }), p["default"].removeClass(t, "active");
    });
    return [e, n];
  }

  function s(e, t) {
    e.state = "TRANSITIONING";
    var n = h.asyncTask(function (n) {
      var i = {
        ctor: "Activated",
        intended: e.intended,
        el: t
      };
      e.binding = m.addEvent(t, "transitionend", function () {
        return n(i);
      }), p["default"].addClass(t, "active");
    });
    return p["default"].removeClass(t, "not-active"), t.offsetHeight, [e, n];
  }

  function u(e, t) {
    return t.el.classList.add("not-active"), e.binding.release(), e.binding.release = i, s(e, e.slides[e.intended]);
  }

  function c(e, t) {
    return e.binding.release(), e.binding.release = i, t.intended !== e.intended ? a(e, t.el) : (e.current = e.intended, e.state = "ACTIVATED", [e, h.noEffect]);
  }

  function l(e, t) {
    return e.intended = t.active, e.fade ? "ACTIVATED" === e.state ? a(e, e.slides[e.current]) : [e, h.noEffect] : (o(e.slides[e.current]), r(e.slides[e.intended]), e.current = t.active, [e, h.noEffect]);
  }

  function d(e, t) {
    var n = t.current;
    return e.current = n, e.intended = n, e.state = "ACTIVATED", e.binding.release(), e.binding.release = i, [e, h.noEffect];
  }

  function f(e, t, n) {
    return n.transition = {
      current: 0,
      binding: {
        release: i
      },
      fade: e.overlay_transition_enabled,
      intended: 0,
      slides: p["default"].$("#overlay .slide"),
      state: "ACTIVATED"
    }, n;
  }

  var h = n(13),
      p = n(7),
      m = n(1);
  t.activateEl = r, t.deactivateEl = o;

  var g = function g(e, t) {
    return "Transition.Initialize" === t.ctor ? d(e, t) : "Transition.ShowSlide" === t.ctor ? l(e, t) : "Deactivated" === t.ctor ? u(e, t) : "Activated" === t.ctor ? c(e, t) : [e, h.noEffect];
  };

  t.bind = function () {
    return {
      id: "transition",
      update: g,
      initialModel: f
    };
  };
}]);

},{}]},{},[1]);

//# sourceMappingURL=style.bundle.js.map

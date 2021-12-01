(function () {
  'use strict';

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */
  (function () {
    // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

    var workingDefaultPrevented = function () {
      var e = document.createEvent('Event');
      e.initEvent('foo', true, true);
      e.preventDefault();
      return e.defaultPrevented;
    }();

    if (!workingDefaultPrevented) {
      var origPreventDefault = Event.prototype.preventDefault;

      Event.prototype.preventDefault = function () {
        if (!this.cancelable) {
          return;
        }

        origPreventDefault.call(this);
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          },
          configurable: true
        });
      };
    }

    var isIE = /Trident/.test(navigator.userAgent); // Event constructor shim

    if (!window.Event || isIE && typeof window.Event !== 'function') {
      var origEvent = window.Event;
      /**
       * @param {!string} inType
       * @param {?(EventInit)=} params
       */

      window.Event = function (inType, params) {
        params = params || {};
        var e = document.createEvent('Event');
        e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
        return e;
      };

      if (origEvent) {
        for (var i in origEvent) {
          window.Event[i] = origEvent[i];
        }

        window.Event.prototype = origEvent.prototype;
      }
    } // CustomEvent constructor shim


    if (!window.CustomEvent || isIE && typeof window.CustomEvent !== 'function') {
      /**
       * @template T
       * @param {!string} inType
       * @param {?(CustomEventInit<T>)=} params
       */
      window.CustomEvent = function (inType, params) {
        params = params || {};
        var e =
        /** @type {!CustomEvent} */
        document.createEvent('CustomEvent');
        e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
        return e;
      };

      window.CustomEvent.prototype = window.Event.prototype;
    }

    if (!window.MouseEvent || isIE && typeof window.MouseEvent !== 'function') {
      var origMouseEvent = window.MouseEvent;
      /**
       *
       * @param {!string} inType
       * @param {?(MouseEventInit)=} params
       */

      window.MouseEvent = function (inType, params) {
        params = params || {};
        var e = document.createEvent('MouseEvent');
        e.initMouseEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.view || window, params.detail, params.screenX, params.screenY, params.clientX, params.clientY, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.button, params.relatedTarget);
        return e;
      };

      if (origMouseEvent) {
        for (var i in origMouseEvent) {
          window.MouseEvent[i] = origMouseEvent[i];
        }
      }

      window.MouseEvent.prototype = origMouseEvent.prototype;
    } // ES6 stuff


    if (!Array.from) {
      Array.from = function (object) {
        return [].slice.call(
        /** @type {IArrayLike} */
        object);
      };
    }

    if (!Object.assign) {
      var assign = function (target, source) {
        var n$ = Object.getOwnPropertyNames(source);

        for (var i = 0, p; i < n$.length; i++) {
          p = n$[i];
          target[p] = source[p];
        }
      };

      Object.assign = function (target, sources) {
        var args = [].slice.call(arguments, 1);

        for (var i = 0, s; i < args.length; i++) {
          s = args[i];

          if (s) {
            assign(target, s);
          }
        }

        return target;
      };
    }
  })();

  (function () {

    var n = window.Document.prototype.createElement,
        p = window.Document.prototype.createElementNS,
        aa = window.Document.prototype.importNode,
        ba = window.Document.prototype.prepend,
        ca = window.Document.prototype.append,
        da = window.DocumentFragment.prototype.prepend,
        ea = window.DocumentFragment.prototype.append,
        q = window.Node.prototype.cloneNode,
        r = window.Node.prototype.appendChild,
        t = window.Node.prototype.insertBefore,
        u = window.Node.prototype.removeChild,
        v = window.Node.prototype.replaceChild,
        x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        y = window.Element.prototype.attachShadow,
        z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        A = window.Element.prototype.getAttribute,
        B = window.Element.prototype.setAttribute,
        C = window.Element.prototype.removeAttribute,
        D = window.Element.prototype.getAttributeNS,
        E = window.Element.prototype.setAttributeNS,
        F = window.Element.prototype.removeAttributeNS,
        G = window.Element.prototype.insertAdjacentElement,
        fa = window.Element.prototype.insertAdjacentHTML,
        ha = window.Element.prototype.prepend,
        ia = window.Element.prototype.append,
        ja = window.Element.prototype.before,
        ka = window.Element.prototype.after,
        la = window.Element.prototype.replaceWith,
        ma = window.Element.prototype.remove,
        na = window.HTMLElement,
        H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        oa = window.HTMLElement.prototype.insertAdjacentElement,
        pa = window.HTMLElement.prototype.insertAdjacentHTML;
    var qa = new Set();
    "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
      return qa.add(a);
    });

    function ra(a) {
      var b = qa.has(a);
      a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
      return !b && a;
    }

    var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);

    function I(a) {
      var b = a.isConnected;
      if (void 0 !== b) return b;
      if (sa(a)) return !0;

      for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);

      return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }

    function J(a) {
      var b = a.children;
      if (b) return Array.prototype.slice.call(b);
      b = [];

      for (a = a.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && b.push(a);

      return b;
    }

    function K(a, b) {
      for (; b && b !== a && !b.nextSibling;) b = b.parentNode;

      return b && b !== a ? b.nextSibling : null;
    }

    function L(a, b, c) {
      for (var f = a; f;) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var d = f;
          b(d);
          var e = d.localName;

          if ("link" === e && "import" === d.getAttribute("rel")) {
            f = d.import;
            void 0 === c && (c = new Set());
            if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) L(f, b, c);
            f = K(a, d);
            continue;
          } else if ("template" === e) {
            f = K(a, d);
            continue;
          }

          if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) L(d, b, c);
        }

        f = f.firstChild ? f.firstChild : K(a, f);
      }
    }

    function M(a, b, c) {
      a[b] = c;
    }

    function ta(a) {
      var b = document;
      this.c = a;
      this.a = b;
      this.b = void 0;
      N(this.c, this.a);
      "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, {
        childList: !0,
        subtree: !0
      }));
    }

    function ua(a) {
      a.b && a.b.disconnect();
    }

    ta.prototype.f = function (a) {
      var b = this.a.readyState;
      "interactive" !== b && "complete" !== b || ua(this);

      for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, f = 0; f < c.length; f++) N(this.c, c[f]);
    };

    function va() {
      var a = this;
      this.b = this.a = void 0;
      this.c = new Promise(function (b) {
        a.b = b;
        a.a && b(a.a);
      });
    }

    function wa(a) {
      if (a.a) throw Error("Already resolved.");
      a.a = void 0;
      a.b && a.b(void 0);
    }

    function O(a) {
      this.f = new Map();
      this.g = new Map();
      this.l = new Map();
      this.i = !1;
      this.b = a;
      this.j = new Map();

      this.c = function (b) {
        return b();
      };

      this.a = !1;
      this.h = [];
      this.m = a.f ? new ta(a) : void 0;
    }

    O.prototype.o = function (a, b) {
      var c = this;
      if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
      xa(this, a);
      this.f.set(a, b);
      this.h.push(a);
      this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };

    O.prototype.define = function (a, b) {
      var c = this;
      if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
      xa(this, a);
      za(this, a, b);
      this.h.push(a);
      this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };

    function xa(a, b) {
      if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");
      if (P(a, b)) throw Error("A custom element with name '" + b + "' has already been defined.");
      if (a.i) throw Error("A custom element is already being defined.");
    }

    function za(a, b, c) {
      a.i = !0;
      var f;

      try {
        var d = function (m) {
          var w = e[m];
          if (void 0 !== w && !(w instanceof Function)) throw Error("The '" + m + "' callback must be a function.");
          return w;
        },
            e = c.prototype;

        if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
        var g = d("connectedCallback");
        var h = d("disconnectedCallback");
        var k = d("adoptedCallback");
        var l = (f = d("attributeChangedCallback")) && c.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.i = !1;
      }

      c = {
        localName: b,
        constructorFunction: c,
        connectedCallback: g,
        disconnectedCallback: h,
        adoptedCallback: k,
        attributeChangedCallback: f,
        observedAttributes: l,
        constructionStack: []
      };
      a.g.set(b, c);
      a.l.set(c.constructorFunction, c);
      return c;
    }

    O.prototype.upgrade = function (a) {
      N(this.b, a);
    };

    function ya(a) {
      if (!1 !== a.a) {
        a.a = !1;

        for (var b = [], c = a.h, f = new Map(), d = 0; d < c.length; d++) f.set(c[d], []);

        N(a.b, document, {
          upgrade: function (k) {
            if (void 0 === k.__CE_state) {
              var l = k.localName,
                  m = f.get(l);
              m ? m.push(k) : a.g.has(l) && b.push(k);
            }
          }
        });

        for (d = 0; d < b.length; d++) Q(a.b, b[d]);

        for (d = 0; d < c.length; d++) {
          for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) Q(a.b, g[h]);

          (e = a.j.get(e)) && wa(e);
        }

        c.length = 0;
      }
    }

    O.prototype.get = function (a) {
      if (a = P(this, a)) return a.constructorFunction;
    };

    O.prototype.whenDefined = function (a) {
      if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
      var b = this.j.get(a);
      if (b) return b.c;
      b = new va();
      this.j.set(a, b);
      var c = this.g.has(a) || this.f.has(a);
      a = -1 === this.h.indexOf(a);
      c && a && wa(b);
      return b.c;
    };

    O.prototype.polyfillWrapFlushCallback = function (a) {
      this.m && ua(this.m);
      var b = this.c;

      this.c = function (c) {
        return a(function () {
          return b(c);
        });
      };
    };

    function P(a, b) {
      var c = a.g.get(b);
      if (c) return c;

      if (c = a.f.get(b)) {
        a.f.delete(b);

        try {
          return za(a, b, c());
        } catch (f) {
          R(f);
        }
      }
    }

    window.CustomElementRegistry = O;
    O.prototype.define = O.prototype.define;
    O.prototype.upgrade = O.prototype.upgrade;
    O.prototype.get = O.prototype.get;
    O.prototype.whenDefined = O.prototype.whenDefined;
    O.prototype.polyfillDefineLazy = O.prototype.o;
    O.prototype.polyfillWrapFlushCallback = O.prototype.polyfillWrapFlushCallback;

    function S() {
      var a = T && T.noDocumentConstructionObserver,
          b = T && T.shadyDomFastWalk;
      this.b = [];
      this.c = [];
      this.a = !1;
      this.shadyDomFastWalk = b;
      this.f = !a;
    }

    function U(a, b, c, f) {
      var d = window.ShadyDOM;

      if (a.shadyDomFastWalk && d && d.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) c(a[b]);
      } else L(b, c, f);
    }

    function Aa(a, b) {
      a.a = !0;
      a.b.push(b);
    }

    function Ba(a, b) {
      a.a = !0;
      a.c.push(b);
    }

    function V(a, b) {
      a.a && U(a, b, function (c) {
        return W(a, c);
      });
    }

    function W(a, b) {
      if (a.a && !b.__CE_patched) {
        b.__CE_patched = !0;

        for (var c = 0; c < a.b.length; c++) a.b[c](b);

        for (c = 0; c < a.c.length; c++) a.c[c](b);
      }
    }

    function X(a, b) {
      var c = [];
      U(a, b, function (d) {
        return c.push(d);
      });

      for (b = 0; b < c.length; b++) {
        var f = c[b];
        1 === f.__CE_state ? a.connectedCallback(f) : Q(a, f);
      }
    }

    function Y(a, b) {
      var c = [];
      U(a, b, function (d) {
        return c.push(d);
      });

      for (b = 0; b < c.length; b++) {
        var f = c[b];
        1 === f.__CE_state && a.disconnectedCallback(f);
      }
    }

    function N(a, b, c) {
      c = void 0 === c ? {} : c;

      var f = c.s,
          d = c.upgrade || function (g) {
        return Q(a, g);
      },
          e = [];

      U(a, b, function (g) {
        a.a && W(a, g);

        if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;
          h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);
          h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
            var k = g.import;

            if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = !0;
              var l = new Set();
              f && (f.forEach(function (m) {
                return l.add(m);
              }), l.delete(k));
              N(a, k, {
                s: l,
                upgrade: d
              });
            }
          });
        } else e.push(g);
      }, f);

      for (b = 0; b < e.length; b++) d(e[b]);
    }

    function Q(a, b) {
      try {
        var c = b.ownerDocument,
            f = c.__CE_registry;
        var d = f && (c.defaultView || c.__CE_isImportDocument) ? P(f, b.localName) : void 0;

        if (d && void 0 === b.__CE_state) {
          d.constructionStack.push(b);

          try {
            try {
              if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }

          b.__CE_state = 1;
          b.__CE_definition = d;

          if (d.attributeChangedCallback && b.hasAttributes()) {
            var e = d.observedAttributes;

            for (d = 0; d < e.length; d++) {
              var g = e[d],
                  h = b.getAttribute(g);
              null !== h && a.attributeChangedCallback(b, g, null, h, null);
            }
          }

          I(b) && a.connectedCallback(b);
        }
      } catch (k) {
        R(k);
      }
    }

    S.prototype.connectedCallback = function (a) {
      var b = a.__CE_definition;
      if (b.connectedCallback) try {
        b.connectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };

    S.prototype.disconnectedCallback = function (a) {
      var b = a.__CE_definition;
      if (b.disconnectedCallback) try {
        b.disconnectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };

    S.prototype.attributeChangedCallback = function (a, b, c, f, d) {
      var e = a.__CE_definition;
      if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
        e.attributeChangedCallback.call(a, b, c, f, d);
      } catch (g) {
        R(g);
      }
    };

    function Ca(a, b, c, f) {
      var d = b.__CE_registry;
      if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = P(d, c))) try {
        var e = new d.constructorFunction();
        if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");
        if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");
        if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");
        if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");
        if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");
        if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");
        if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
        return e;
      } catch (g) {
        return R(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, W(a, b), b;
      }
      b = null === f ? n.call(b, c) : p.call(b, f, c);
      W(a, b);
      return b;
    }

    function R(a) {
      var b = a.message,
          c = a.sourceURL || a.fileName || "",
          f = a.line || a.lineNumber || 0,
          d = a.column || a.columnNumber || 0,
          e = void 0;
      void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", {
        cancelable: !0,
        message: b,
        filename: c,
        lineno: f,
        colno: d,
        error: a
      }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
        Object.defineProperty(this, "defaultPrevented", {
          configurable: !0,
          get: function () {
            return !0;
          }
        });
      });
      void 0 === e.error && Object.defineProperty(e, "error", {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return a;
        }
      });
      window.dispatchEvent(e);
      e.defaultPrevented || console.error(a);
    }
    var Da = new function () {}();

    function Ea(a) {
      window.HTMLElement = function () {
        function b() {
          var c = this.constructor;

          var f = document.__CE_registry.l.get(c);

          if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
          var d = f.constructionStack;
          if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, W(a, d), d;
          var e = d.length - 1,
              g = d[e];
          if (g === Da) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
          d[e] = Da;
          Object.setPrototypeOf(g, c.prototype);
          W(a, g);
          return g;
        }

        b.prototype = na.prototype;
        Object.defineProperty(b.prototype, "constructor", {
          writable: !0,
          configurable: !0,
          enumerable: !1,
          value: b
        });
        return b;
      }();
    }

    function Z(a, b, c) {
      function f(d) {
        return function (e) {
          for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];

          h = [];

          for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];
            m instanceof Element && I(m) && k.push(m);
            if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) h.push(m);else h.push(m);
          }

          d.apply(this, g);

          for (g = 0; g < k.length; g++) Y(a, k[g]);

          if (I(this)) for (g = 0; g < h.length; g++) k = h[g], k instanceof Element && X(a, k);
        };
      }

      void 0 !== c.prepend && M(b, "prepend", f(c.prepend));
      void 0 !== c.append && M(b, "append", f(c.append));
    }

    function Fa(a) {
      M(Document.prototype, "createElement", function (b) {
        return Ca(a, this, b, null);
      });
      M(Document.prototype, "importNode", function (b, c) {
        b = aa.call(this, b, !!c);
        this.__CE_registry ? N(a, b) : V(a, b);
        return b;
      });
      M(Document.prototype, "createElementNS", function (b, c) {
        return Ca(a, this, c, b);
      });
      Z(a, Document.prototype, {
        prepend: ba,
        append: ca
      });
    }

    function Ga(a) {
      function b(c, f) {
        Object.defineProperty(c, "textContent", {
          enumerable: f.enumerable,
          configurable: !0,
          get: f.get,
          set: function (d) {
            if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
              var e = void 0;

              if (this.firstChild) {
                var g = this.childNodes,
                    h = g.length;

                if (0 < h && I(this)) {
                  e = Array(h);

                  for (var k = 0; k < h; k++) e[k] = g[k];
                }
              }

              f.set.call(this, d);
              if (e) for (d = 0; d < e.length; d++) Y(a, e[d]);
            }
          }
        });
      }

      M(Node.prototype, "insertBefore", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);
          c = t.call(this, c, f);
          if (I(this)) for (f = 0; f < d.length; f++) X(a, d[f]);
          return c;
        }

        d = c instanceof Element && I(c);
        f = t.call(this, c, f);
        d && Y(a, c);
        I(this) && X(a, c);
        return f;
      });
      M(Node.prototype, "appendChild", function (c) {
        if (c instanceof DocumentFragment) {
          var f = J(c);
          c = r.call(this, c);
          if (I(this)) for (var d = 0; d < f.length; d++) X(a, f[d]);
          return c;
        }

        f = c instanceof Element && I(c);
        d = r.call(this, c);
        f && Y(a, c);
        I(this) && X(a, c);
        return d;
      });
      M(Node.prototype, "cloneNode", function (c) {
        c = q.call(this, !!c);
        this.ownerDocument.__CE_registry ? N(a, c) : V(a, c);
        return c;
      });
      M(Node.prototype, "removeChild", function (c) {
        var f = c instanceof Element && I(c),
            d = u.call(this, c);
        f && Y(a, c);
        return d;
      });
      M(Node.prototype, "replaceChild", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);
          c = v.call(this, c, f);
          if (I(this)) for (Y(a, f), f = 0; f < d.length; f++) X(a, d[f]);
          return c;
        }

        d = c instanceof Element && I(c);
        var e = v.call(this, c, f),
            g = I(this);
        g && Y(a, f);
        d && Y(a, c);
        g && X(a, c);
        return e;
      });
      x && x.get ? b(Node.prototype, x) : Aa(a, function (c) {
        b(c, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            for (var f = [], d = this.firstChild; d; d = d.nextSibling) d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);

            return f.join("");
          },
          set: function (f) {
            for (; this.firstChild;) u.call(this, this.firstChild);

            null != f && "" !== f && r.call(this, document.createTextNode(f));
          }
        });
      });
    }

    function Ha(a) {
      function b(f) {
        return function (d) {
          for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];

          g = [];

          for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];
            l instanceof Element && I(l) && h.push(l);
            if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) g.push(l);else g.push(l);
          }

          f.apply(this, e);

          for (e = 0; e < h.length; e++) Y(a, h[e]);

          if (I(this)) for (e = 0; e < g.length; e++) h = g[e], h instanceof Element && X(a, h);
        };
      }

      var c = Element.prototype;
      void 0 !== ja && M(c, "before", b(ja));
      void 0 !== ka && M(c, "after", b(ka));
      void 0 !== la && M(c, "replaceWith", function (f) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];

        e = [];

        for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];
          k instanceof Element && I(k) && g.push(k);
          if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k);else e.push(k);
        }

        h = I(this);
        la.apply(this, d);

        for (d = 0; d < g.length; d++) Y(a, g[d]);

        if (h) for (Y(a, this), d = 0; d < e.length; d++) g = e[d], g instanceof Element && X(a, g);
      });
      void 0 !== ma && M(c, "remove", function () {
        var f = I(this);
        ma.call(this);
        f && Y(a, this);
      });
    }

    function Ia(a) {
      function b(d, e) {
        Object.defineProperty(d, "innerHTML", {
          enumerable: e.enumerable,
          configurable: !0,
          get: e.get,
          set: function (g) {
            var h = this,
                k = void 0;
            I(this) && (k = [], U(a, this, function (w) {
              w !== h && k.push(w);
            }));
            e.set.call(this, g);
            if (k) for (var l = 0; l < k.length; l++) {
              var m = k[l];
              1 === m.__CE_state && a.disconnectedCallback(m);
            }
            this.ownerDocument.__CE_registry ? N(a, this) : V(a, this);
            return g;
          }
        });
      }

      function c(d, e) {
        M(d, "insertAdjacentElement", function (g, h) {
          var k = I(h);
          g = e.call(this, g, h);
          k && Y(a, h);
          I(g) && X(a, h);
          return g;
        });
      }

      function f(d, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling) l.push(h);

          for (k = 0; k < l.length; k++) N(a, l[k]);
        }

        M(d, "insertAdjacentHTML", function (h, k) {
          h = h.toLowerCase();

          if ("beforebegin" === h) {
            var l = this.previousSibling;
            e.call(this, h, k);
            g(l || this.parentNode.firstChild, this);
          } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        });
      }

      y && M(Element.prototype, "attachShadow", function (d) {
        d = y.call(this, d);

        if (a.a && !d.__CE_patched) {
          d.__CE_patched = !0;

          for (var e = 0; e < a.b.length; e++) a.b[e](d);
        }

        return this.__CE_shadowRoot = d;
      });
      z && z.get ? b(Element.prototype, z) : H && H.get ? b(HTMLElement.prototype, H) : Ba(a, function (d) {
        b(d, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            return q.call(this, !0).innerHTML;
          },
          set: function (e) {
            var g = "template" === this.localName,
                h = g ? this.content : this,
                k = p.call(document, this.namespaceURI, this.localName);

            for (k.innerHTML = e; 0 < h.childNodes.length;) u.call(h, h.childNodes[0]);

            for (e = g ? k.content : k; 0 < e.childNodes.length;) r.call(h, e.childNodes[0]);
          }
        });
      });
      M(Element.prototype, "setAttribute", function (d, e) {
        if (1 !== this.__CE_state) return B.call(this, d, e);
        var g = A.call(this, d);
        B.call(this, d, e);
        e = A.call(this, d);
        a.attributeChangedCallback(this, d, g, e, null);
      });
      M(Element.prototype, "setAttributeNS", function (d, e, g) {
        if (1 !== this.__CE_state) return E.call(this, d, e, g);
        var h = D.call(this, d, e);
        E.call(this, d, e, g);
        g = D.call(this, d, e);
        a.attributeChangedCallback(this, e, h, g, d);
      });
      M(Element.prototype, "removeAttribute", function (d) {
        if (1 !== this.__CE_state) return C.call(this, d);
        var e = A.call(this, d);
        C.call(this, d);
        null !== e && a.attributeChangedCallback(this, d, e, null, null);
      });
      M(Element.prototype, "removeAttributeNS", function (d, e) {
        if (1 !== this.__CE_state) return F.call(this, d, e);
        var g = D.call(this, d, e);
        F.call(this, d, e);
        var h = D.call(this, d, e);
        g !== h && a.attributeChangedCallback(this, e, g, h, d);
      });
      oa ? c(HTMLElement.prototype, oa) : G ? c(Element.prototype, G) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
      pa ? f(HTMLElement.prototype, pa) : fa ? f(Element.prototype, fa) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
      Z(a, Element.prototype, {
        prepend: ha,
        append: ia
      });
      Ha(a);
    }
    var T = window.customElements;

    function Ja() {
      var a = new S();
      Ea(a);
      Fa(a);
      Z(a, DocumentFragment.prototype, {
        prepend: da,
        append: ea
      });
      Ga(a);
      Ia(a);
      a = new O(a);
      document.__CE_registry = a;
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: !0,
        value: a
      });
    }

    T && !T.forcePolyfill && "function" == typeof T.define && "function" == typeof T.get || Ja();
    window.__CE_installPolyfill = Ja;
  }).call(self);

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
        e = Symbol(),
        n = new Map();

  class s {
    constructor(t, n) {
      if (this._$cssResult$ = !0, n !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t;
    }

    get styleSheet() {
      let e = n.get(this.cssText);
      return t && void 0 === e && (n.set(this.cssText, e = new CSSStyleSheet()), e.replaceSync(this.cssText)), e;
    }

    toString() {
      return this.cssText;
    }

  }

  const o = t => new s("string" == typeof t ? t : t + "", e),
        i = (e, n) => {
    t ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
      const n = document.createElement("style"),
            s = window.litNonce;
      void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
    });
  },
        S = t ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";

    for (const n of t.cssRules) e += n.cssText;

    return o(e);
  })(t) : t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  var s$1;

  const e$1 = window.trustedTypes,
        r = e$1 ? e$1.emptyScript : "",
        h = window.reactiveElementPolyfillSupport,
        o$1 = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? r : null;
          break;

        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }

      return t;
    },

    fromAttribute(t, i) {
      let s = t;

      switch (i) {
        case Boolean:
          s = null !== t;
          break;

        case Number:
          s = null === t ? null : Number(t);
          break;

        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }

      }

      return s;
    }

  },
        n$1 = (t, i) => i !== t && (i == i || t == t),
        l = {
    attribute: !0,
    type: String,
    converter: o$1,
    reflect: !1,
    hasChanged: n$1
  };

  class a extends HTMLElement {
    constructor() {
      super(), this._$Et = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
    }

    static addInitializer(t) {
      var i;
      null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
    }

    static get observedAttributes() {
      this.finalize();
      const t = [];
      return this.elementProperties.forEach((i, s) => {
        const e = this._$Eh(s, i);

        void 0 !== e && (this._$Eu.set(e, s), t.push(e));
      }), t;
    }

    static createProperty(t, i = l) {
      if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
        const s = "symbol" == typeof t ? Symbol() : "__" + t,
              e = this.getPropertyDescriptor(t, s, i);
        void 0 !== e && Object.defineProperty(this.prototype, t, e);
      }
    }

    static getPropertyDescriptor(t, i, s) {
      return {
        get() {
          return this[i];
        },

        set(e) {
          const r = this[t];
          this[i] = e, this.requestUpdate(t, r, s);
        },

        configurable: !0,
        enumerable: !0
      };
    }

    static getPropertyOptions(t) {
      return this.elementProperties.get(t) || l;
    }

    static finalize() {
      if (this.hasOwnProperty("finalized")) return !1;
      this.finalized = !0;
      const t = Object.getPrototypeOf(this);

      if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
        const t = this.properties,
              i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

        for (const s of i) this.createProperty(s, t[s]);
      }

      return this.elementStyles = this.finalizeStyles(this.styles), !0;
    }

    static finalizeStyles(i) {
      const s = [];

      if (Array.isArray(i)) {
        const e = new Set(i.flat(1 / 0).reverse());

        for (const i of e) s.unshift(S(i));
      } else void 0 !== i && s.push(S(i));

      return s;
    }

    static _$Eh(t, i) {
      const s = i.attribute;
      return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
    }

    o() {
      var t;
      this._$Ep = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Em(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach(t => t(this));
    }

    addController(t) {
      var i, s;
      (null !== (i = this._$Eg) && void 0 !== i ? i : this._$Eg = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
    }

    removeController(t) {
      var i;
      null === (i = this._$Eg) || void 0 === i || i.splice(this._$Eg.indexOf(t) >>> 0, 1);
    }

    _$Em() {
      this.constructor.elementProperties.forEach((t, i) => {
        this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
      });
    }

    createRenderRoot() {
      var t;
      const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s, this.constructor.elementStyles), s;
    }

    connectedCallback() {
      var t;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
      });
    }

    enableUpdating(t) {}

    disconnectedCallback() {
      var t;
      null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
      });
    }

    attributeChangedCallback(t, i, s) {
      this._$AK(t, s);
    }

    _$ES(t, i, s = l) {
      var e, r;

      const h = this.constructor._$Eh(t, s);

      if (void 0 !== h && !0 === s.reflect) {
        const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o$1.toAttribute)(i, s.type);
        this._$Ei = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$Ei = null;
      }
    }

    _$AK(t, i) {
      var s, e, r;

      const h = this.constructor,
            n = h._$Eu.get(t);

      if (void 0 !== n && this._$Ei !== n) {
        const t = h.getPropertyOptions(n),
              l = t.converter,
              a = null !== (r = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== r ? r : o$1.fromAttribute;
        this._$Ei = n, this[n] = a(i, t.type), this._$Ei = null;
      }
    }

    requestUpdate(t, i, s) {
      let e = !0;
      void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n$1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$E_ && (this._$E_ = new Map()), this._$E_.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ep = this._$EC());
    }

    async _$EC() {
      this.isUpdatePending = !0;

      try {
        await this._$Ep;
      } catch (t) {
        Promise.reject(t);
      }

      const t = this.scheduleUpdate();
      return null != t && (await t), !this.isUpdatePending;
    }

    scheduleUpdate() {
      return this.performUpdate();
    }

    performUpdate() {
      var t;
      if (!this.isUpdatePending) return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t, i) => this[i] = t), this._$Et = void 0);
      let i = !1;
      const s = this._$AL;

      try {
        i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Eg) || void 0 === t || t.forEach(t => {
          var i;
          return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
        }), this.update(s)) : this._$EU();
      } catch (t) {
        throw i = !1, this._$EU(), t;
      }

      i && this._$AE(s);
    }

    willUpdate(t) {}

    _$AE(t) {
      var i;
      null === (i = this._$Eg) || void 0 === i || i.forEach(t => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
      }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }

    _$EU() {
      this._$AL = new Map(), this.isUpdatePending = !1;
    }

    get updateComplete() {
      return this.getUpdateComplete();
    }

    getUpdateComplete() {
      return this._$Ep;
    }

    shouldUpdate(t) {
      return !0;
    }

    update(t) {
      void 0 !== this._$E_ && (this._$E_.forEach((t, i) => this._$ES(i, this[i], t)), this._$E_ = void 0), this._$EU();
    }

    updated(t) {}

    firstUpdated(t) {}

  }

  a.finalized = !0, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
  }, null == h || h({
    ReactiveElement: a
  }), (null !== (s$1 = globalThis.reactiveElementVersions) && void 0 !== s$1 ? s$1 : globalThis.reactiveElementVersions = []).push("1.0.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  var t$1;

  const i$1 = globalThis.trustedTypes,
        s$2 = i$1 ? i$1.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
        e$2 = `lit$${(Math.random() + "").slice(9)}$`,
        o$2 = "?" + e$2,
        n$2 = `<${o$2}>`,
        l$1 = document,
        h$1 = (t = "") => l$1.createComment(t),
        r$1 = t => null === t || "object" != typeof t && "function" != typeof t,
        d = Array.isArray,
        u = t => {
    var i;
    return d(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
  },
        c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        v = /-->/g,
        a$1 = />/g,
        f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
        _ = /'/g,
        m = /"/g,
        g = /^(?:script|style|textarea)$/i,
        $ = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
        p = $(1),
        b = Symbol.for("lit-noChange"),
        T = Symbol.for("lit-nothing"),
        x = new WeakMap(),
        w = (t, i, s) => {
    var e, o;
    const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
    let l = n._$litPart$;

    if (void 0 === l) {
      const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
      n._$litPart$ = l = new N(i.insertBefore(h$1(), t), t, void 0, null != s ? s : {});
    }

    return l._$AI(t), l;
  },
        A = l$1.createTreeWalker(l$1, 129, null, !1),
        C = (t, i) => {
    const o = t.length - 1,
          l = [];
    let h,
        r = 2 === i ? "<svg>" : "",
        d = c;

    for (let i = 0; i < o; i++) {
      const s = t[i];
      let o,
          u,
          $ = -1,
          p = 0;

      for (; p < s.length && (d.lastIndex = p, u = d.exec(s), null !== u);) p = d.lastIndex, d === c ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a$1 : void 0 !== u[2] ? (g.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c, $ = -1) : void 0 === u[1] ? $ = -2 : ($ = d.lastIndex - u[2].length, o = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? m : _) : d === m || d === _ ? d = f : d === v || d === a$1 ? d = c : (d = f, h = void 0);

      const y = d === f && t[i + 1].startsWith("/>") ? " " : "";
      r += d === c ? s + n$2 : $ >= 0 ? (l.push(o), s.slice(0, $) + "$lit$" + s.slice($) + e$2 + y) : s + e$2 + (-2 === $ ? (l.push(void 0), i) : y);
    }

    const u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
    return [void 0 !== s$2 ? s$2.createHTML(u) : u, l];
  };

  class P {
    constructor({
      strings: t,
      _$litType$: s
    }, n) {
      let l;
      this.parts = [];
      let r = 0,
          d = 0;
      const u = t.length - 1,
            c = this.parts,
            [v, a] = C(t, s);

      if (this.el = P.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
        const t = this.el.content,
              i = t.firstChild;
        i.remove(), t.append(...i.childNodes);
      }

      for (; null !== (l = A.nextNode()) && c.length < u;) {
        if (1 === l.nodeType) {
          if (l.hasAttributes()) {
            const t = [];

            for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(e$2)) {
              const s = a[d++];

              if (t.push(i), void 0 !== s) {
                const t = l.getAttribute(s.toLowerCase() + "$lit$").split(e$2),
                      i = /([.?@])?(.*)/.exec(s);
                c.push({
                  type: 1,
                  index: r,
                  name: i[2],
                  strings: t,
                  ctor: "." === i[1] ? M : "?" === i[1] ? H : "@" === i[1] ? I : S$1
                });
              } else c.push({
                type: 6,
                index: r
              });
            }

            for (const i of t) l.removeAttribute(i);
          }

          if (g.test(l.tagName)) {
            const t = l.textContent.split(e$2),
                  s = t.length - 1;

            if (s > 0) {
              l.textContent = i$1 ? i$1.emptyScript : "";

              for (let i = 0; i < s; i++) l.append(t[i], h$1()), A.nextNode(), c.push({
                type: 2,
                index: ++r
              });

              l.append(t[s], h$1());
            }
          }
        } else if (8 === l.nodeType) if (l.data === o$2) c.push({
          type: 2,
          index: r
        });else {
          let t = -1;

          for (; -1 !== (t = l.data.indexOf(e$2, t + 1));) c.push({
            type: 7,
            index: r
          }), t += e$2.length - 1;
        }

        r++;
      }
    }

    static createElement(t, i) {
      const s = l$1.createElement("template");
      return s.innerHTML = t, s;
    }

  }

  function V(t, i, s = t, e) {
    var o, n, l, h;
    if (i === b) return i;
    let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
    const u = r$1(i) ? void 0 : i._$litDirective$;
    return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = V(t, d._$AS(t, i.values), d, e)), i;
  }

  class E {
    constructor(t, i) {
      this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }

    get parentNode() {
      return this._$AM.parentNode;
    }

    get _$AU() {
      return this._$AM._$AU;
    }

    p(t) {
      var i;
      const {
        el: {
          content: s
        },
        parts: e
      } = this._$AD,
            o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l$1).importNode(s, !0);
      A.currentNode = o;
      let n = A.nextNode(),
          h = 0,
          r = 0,
          d = e[0];

      for (; void 0 !== d;) {
        if (h === d.index) {
          let i;
          2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new L(n, this, t)), this.v.push(i), d = e[++r];
        }

        h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
      }

      return o;
    }

    m(t) {
      let i = 0;

      for (const s of this.v) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }

  }

  class N {
    constructor(t, i, s, e) {
      var o;
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
    }

    get _$AU() {
      var t, i;
      return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
    }

    get parentNode() {
      let t = this._$AA.parentNode;
      const i = this._$AM;
      return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
    }

    get startNode() {
      return this._$AA;
    }

    get endNode() {
      return this._$AB;
    }

    _$AI(t, i = this) {
      t = V(this, t, i), r$1(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== b && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.S(t) : u(t) ? this.M(t) : this.$(t);
    }

    A(t, i = this._$AB) {
      return this._$AA.parentNode.insertBefore(t, i);
    }

    S(t) {
      this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
    }

    $(t) {
      this._$AH !== T && r$1(this._$AH) ? this._$AA.nextSibling.data = t : this.S(l$1.createTextNode(t)), this._$AH = t;
    }

    T(t) {
      var i;
      const {
        values: s,
        _$litType$: e
      } = t,
            o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = P.createElement(e.h, this.options)), e);
      if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
        const t = new E(o, this),
              i = t.p(this.options);
        t.m(s), this.S(i), this._$AH = t;
      }
    }

    _$AC(t) {
      let i = x.get(t.strings);
      return void 0 === i && x.set(t.strings, i = new P(t)), i;
    }

    M(t) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i = this._$AH;
      let s,
          e = 0;

      for (const o of t) e === i.length ? i.push(s = new N(this.A(h$1()), this.A(h$1()), this, this.options)) : s = i[e], s._$AI(o), e++;

      e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }

    _$AR(t = this._$AA.nextSibling, i) {
      var s;

      for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
        const i = t.nextSibling;
        t.remove(), t = i;
      }
    }

    setConnected(t) {
      var i;
      void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
    }

  }

  class S$1 {
    constructor(t, i, s, e, o) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
    }

    get tagName() {
      return this.element.tagName;
    }

    get _$AU() {
      return this._$AM._$AU;
    }

    _$AI(t, i = this, s, e) {
      const o = this.strings;
      let n = !1;
      if (void 0 === o) t = V(this, t, i, 0), n = !r$1(t) || t !== this._$AH && t !== b, n && (this._$AH = t);else {
        const e = t;
        let l, h;

        for (t = o[0], l = 0; l < o.length - 1; l++) h = V(this, e[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r$1(h) || h !== this._$AH[l]), h === T ? t = T : t !== T && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
      }
      n && !e && this.k(t);
    }

    k(t) {
      t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
    }

  }

  class M extends S$1 {
    constructor() {
      super(...arguments), this.type = 3;
    }

    k(t) {
      this.element[this.name] = t === T ? void 0 : t;
    }

  }

  const k = i$1 ? i$1.emptyScript : "";

  class H extends S$1 {
    constructor() {
      super(...arguments), this.type = 4;
    }

    k(t) {
      t && t !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }

  }

  class I extends S$1 {
    constructor(t, i, s, e, o) {
      super(t, i, s, e, o), this.type = 5;
    }

    _$AI(t, i = this) {
      var s;
      if ((t = null !== (s = V(this, t, i, 0)) && void 0 !== s ? s : T) === b) return;
      const e = this._$AH,
            o = t === T && e !== T || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
            n = t !== T && (e === T || o);
      o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }

    handleEvent(t) {
      var i, s;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
    }

  }

  class L {
    constructor(t, i, s) {
      this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }

    get _$AU() {
      return this._$AM._$AU;
    }

    _$AI(t) {
      V(this, t);
    }

  }

  const z = window.litHtmlPolyfillSupport;
  null == z || z(P, N), (null !== (t$1 = globalThis.litHtmlVersions) && void 0 !== t$1 ? t$1 : globalThis.litHtmlVersions = []).push("2.0.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */

  var l$2, o$3;

  class s$3 extends a {
    constructor() {
      super(...arguments), this.renderOptions = {
        host: this
      }, this._$Dt = void 0;
    }

    createRenderRoot() {
      var t, e;
      const i = super.createRenderRoot();
      return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
    }

    update(t) {
      const i = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = w(i, this.renderRoot, this.renderOptions);
    }

    connectedCallback() {
      var t;
      super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
    }

    disconnectedCallback() {
      var t;
      super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
    }

    render() {
      return b;
    }

  }

  s$3.finalized = !0, s$3._$litElement$ = !0, null === (l$2 = globalThis.litElementHydrateSupport) || void 0 === l$2 || l$2.call(globalThis, {
    LitElement: s$3
  });
  const n$3 = globalThis.litElementPolyfillSupport;
  null == n$3 || n$3({
    LitElement: s$3
  });
  (null !== (o$3 = globalThis.litElementVersions) && void 0 !== o$3 ? o$3 : globalThis.litElementVersions = []).push("3.0.2");

  const anchors = parent => p`
      ${parent} a {
        display: flex;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        padding: 10px 7.5px;
        text-decoration: none;
        color: #828282;
      }
      ${parent} a.active {
        color: #61dafb;
      }
      ${parent} a:hover {
        color: #CCC;
      }
      @media screen and (min-width: 768px) {
        ${parent} a {
          padding: 10px 20px;
          text-decoration: none;
          color: #828282;
        }
      }
  `;

  const styles = document.createElement('style');
  w(anchors('wc-header'), styles);
  document.head.appendChild(styles);

  class WCHeader extends s$3 {
    static get properties() {
      return {
        duration: Number,
        name: String,
        isOpen: {
          type: Boolean,
          reflect: true
        }
      };
    }

    render() {
      return p`
      <style>
        :host {
          background: black;
          position: fixed;
          width: 100%;
        }

        ul {
          display: flex;
          list-style: none;
          justify-content: space-around;
          align-content: center;
          justify-items: inherit;
          align-items: center;
          flex-direction: row;
          margin: 0;
          max-width: 980px;
          margin: 0 auto;
          padding: 0;
        }

        @media screen and (min-width: 768px) {
          ul {
            justify-content: flex-start;
          }
          .navigation a {
            padding: 10px 20px;
            text-decoration: none;
            color: #828282;
          }
        }
      </style>

      <header>
        <ul>
          <slot></slot>
        </ul>
      </header>
    `;
    }

  }

  window.customElements.define('wc-header', WCHeader);

  class WCFooter extends s$3 {
    render() {
      return p`
      <style>
        footer {
          background: #000;
          bottom: 0;
          height: 40px;
          left: 0;
          position: fixed;
          text-align: center;
          width: 100%;
        }

        ul {
          display: inline-block;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          display: inline-block;
          vertical-align: middle;
        }

        svg {
          display: block;
          margin: auto;
        }

        ${anchors()}
      </style>
      <footer>
        <ul>
          <li>
            <svg width="30" height="30" viewBox="0 0 841.9 595.3">
              <path fill="#61DAFB" d="M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3 c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9 c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6 c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11 c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6 c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4 c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6 c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,328.9,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5 c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2 c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8 c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9 c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3 c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9 c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M310,490c-13.6-7.8-19.5-37.5-14.9-75.7 c1.1-9.4,2.9-19.3,5.1-29.4c19.6,4.8,41,8.5,63.5,10.9c13.5,18.5,27.5,35.3,41.6,50c-32.6,30.3-63.2,46.9-84,46.9 C316.8,492.6,313,491.7,310,490z M547.2,413.8c4.7,38.2-1.1,67.9-14.6,75.8c-3,1.8-6.9,2.6-11.5,2.6c-20.7,0-51.4-16.5-84-46.6 c14-14.7,28-31.4,41.3-49.9c22.6-2.4,44-6.1,63.6-11C544.3,394.8,546.1,404.5,547.2,413.8z M585.7,347.1c-8.6,3.7-18,7-27.7,10.1 c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,19.3,6.5,28.1,10.2c35.4,15.1,58.3,34.9,58.3,50.6 C644,312.2,621.1,332.1,585.7,347.1z"></path>
              <polygon fill="#61DAFB" points="320.8,78.4 320.8,78.4 320.8,78.4"></polygon>
              <circle fill="#61DAFB" cx="420.9" cy="296.5" r="45.7"></circle>
              <polygon fill="#61DAFB" points="520.5,78.1 520.5,78.1 520.5,78.1"></polygon>
            </svg>
          </li>
          <li>
            <a href="/terms">Terms</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </footer>
    `;
    }

  }

  window.customElements.define('wc-footer', WCFooter);

  class WCPagination extends s$3 {
    static get properties() {
      return {
        currentPage: Number,
        pages: Number,
        nextPage: Number,
        prevPage: Number,
        story: String
      };
    }

    render() {
      const {
        currentPage,
        pages,
        nextPage,
        prevPage,
        story
      } = this;
      return p`
      <style>
        .pagination {
          text-align: center;
          display: block;
        }
      </style>

      <div class="pagination">
        ${currentPage !== 1 && p`<a href="/${story}/${nextPage}">&lt; prev</a>`}
        <span>${currentPage}/${pages}</span>
        ${currentPage !== pages && p`<a href="/${story}/${prevPage}">next &gt;</a>`}
      </div>
    `;
    }

  }

  window.customElements.define('wc-pagination', WCPagination);

}());

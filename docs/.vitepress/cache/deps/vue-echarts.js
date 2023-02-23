import {
  computed2 as computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  toRefs,
  unref,
  watch,
  watchEffect
} from "./chunk-4S7LXNVO.js";
import {
  init,
  throttle
} from "./chunk-ZSCXFQ4L.js";
import "./chunk-4EOJPDL2.js";

// node_modules/vue-echarts/node_modules/vue-demi/lib/index.mjs
var Vue2 = void 0;

// node_modules/resize-detector/esm/index.js
var raf = null;
function requestAnimationFrame(callback) {
  if (!raf) {
    raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback2) {
      return setTimeout(callback2, 16);
    }).bind(window);
  }
  return raf(callback);
}
var caf = null;
function cancelAnimationFrame(id) {
  if (!caf) {
    caf = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(id2) {
      clearTimeout(id2);
    }).bind(window);
  }
  caf(id);
}
function createStyles(styleText) {
  var style2 = document.createElement("style");
  if (style2.styleSheet) {
    style2.styleSheet.cssText = styleText;
  } else {
    style2.appendChild(document.createTextNode(styleText));
  }
  (document.querySelector("head") || document.body).appendChild(style2);
  return style2;
}
function createElement(tagName, props) {
  if (props === void 0)
    props = {};
  var elem = document.createElement(tagName);
  Object.keys(props).forEach(function(key) {
    elem[key] = props[key];
  });
  return elem;
}
function getComputedStyle(elem, prop, pseudo) {
  var computedStyle = window.getComputedStyle(elem, pseudo || null) || {
    display: "none"
  };
  return computedStyle[prop];
}
function getRenderInfo(elem) {
  if (!document.documentElement.contains(elem)) {
    return {
      detached: true,
      rendered: false
    };
  }
  var current = elem;
  while (current !== document) {
    if (getComputedStyle(current, "display") === "none") {
      return {
        detached: false,
        rendered: false
      };
    }
    current = current.parentNode;
  }
  return {
    detached: false,
    rendered: true
  };
}
var css_248z = '.resize-triggers{visibility:hidden;opacity:0;pointer-events:none}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}';
var total = 0;
var style = null;
function addListener(elem, callback) {
  if (!elem.__resize_mutation_handler__) {
    elem.__resize_mutation_handler__ = handleMutation.bind(elem);
  }
  var listeners = elem.__resize_listeners__;
  if (!listeners) {
    elem.__resize_listeners__ = [];
    if (window.ResizeObserver) {
      var offsetWidth = elem.offsetWidth;
      var offsetHeight = elem.offsetHeight;
      var ro = new ResizeObserver(function() {
        if (!elem.__resize_observer_triggered__) {
          elem.__resize_observer_triggered__ = true;
          if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
            return;
          }
        }
        runCallbacks(elem);
      });
      var ref = getRenderInfo(elem);
      var detached = ref.detached;
      var rendered = ref.rendered;
      elem.__resize_observer_triggered__ = detached === false && rendered === false;
      elem.__resize_observer__ = ro;
      ro.observe(elem);
    } else if (elem.attachEvent && elem.addEventListener) {
      elem.__resize_legacy_resize_handler__ = function handleLegacyResize() {
        runCallbacks(elem);
      };
      elem.attachEvent("onresize", elem.__resize_legacy_resize_handler__);
      document.addEventListener("DOMSubtreeModified", elem.__resize_mutation_handler__);
    } else {
      if (!total) {
        style = createStyles(css_248z);
      }
      initTriggers(elem);
      elem.__resize_rendered__ = getRenderInfo(elem).rendered;
      if (window.MutationObserver) {
        var mo = new MutationObserver(elem.__resize_mutation_handler__);
        mo.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
        elem.__resize_mutation_observer__ = mo;
      }
    }
  }
  elem.__resize_listeners__.push(callback);
  total++;
}
function removeListener(elem, callback) {
  var listeners = elem.__resize_listeners__;
  if (!listeners) {
    return;
  }
  if (callback) {
    listeners.splice(listeners.indexOf(callback), 1);
  }
  if (!listeners.length || !callback) {
    if (elem.detachEvent && elem.removeEventListener) {
      elem.detachEvent("onresize", elem.__resize_legacy_resize_handler__);
      document.removeEventListener("DOMSubtreeModified", elem.__resize_mutation_handler__);
      return;
    }
    if (elem.__resize_observer__) {
      elem.__resize_observer__.unobserve(elem);
      elem.__resize_observer__.disconnect();
      elem.__resize_observer__ = null;
    } else {
      if (elem.__resize_mutation_observer__) {
        elem.__resize_mutation_observer__.disconnect();
        elem.__resize_mutation_observer__ = null;
      }
      elem.removeEventListener("scroll", handleScroll);
      elem.removeChild(elem.__resize_triggers__.triggers);
      elem.__resize_triggers__ = null;
    }
    elem.__resize_listeners__ = null;
  }
  if (!--total && style) {
    style.parentNode.removeChild(style);
  }
}
function getUpdatedSize(elem) {
  var ref = elem.__resize_last__;
  var width = ref.width;
  var height = ref.height;
  var offsetWidth = elem.offsetWidth;
  var offsetHeight = elem.offsetHeight;
  if (offsetWidth !== width || offsetHeight !== height) {
    return {
      width: offsetWidth,
      height: offsetHeight
    };
  }
  return null;
}
function handleMutation() {
  var ref = getRenderInfo(this);
  var rendered = ref.rendered;
  var detached = ref.detached;
  if (rendered !== this.__resize_rendered__) {
    if (!detached && this.__resize_triggers__) {
      resetTriggers(this);
      this.addEventListener("scroll", handleScroll, true);
    }
    this.__resize_rendered__ = rendered;
    runCallbacks(this);
  }
}
function handleScroll() {
  var this$1 = this;
  resetTriggers(this);
  if (this.__resize_raf__) {
    cancelAnimationFrame(this.__resize_raf__);
  }
  this.__resize_raf__ = requestAnimationFrame(function() {
    var updated = getUpdatedSize(this$1);
    if (updated) {
      this$1.__resize_last__ = updated;
      runCallbacks(this$1);
    }
  });
}
function runCallbacks(elem) {
  if (!elem || !elem.__resize_listeners__) {
    return;
  }
  elem.__resize_listeners__.forEach(function(callback) {
    callback.call(elem, elem);
  });
}
function initTriggers(elem) {
  var position = getComputedStyle(elem, "position");
  if (!position || position === "static") {
    elem.style.position = "relative";
  }
  elem.__resize_old_position__ = position;
  elem.__resize_last__ = {};
  var triggers = createElement("div", {
    className: "resize-triggers"
  });
  var expand = createElement("div", {
    className: "resize-expand-trigger"
  });
  var expandChild = createElement("div");
  var contract = createElement("div", {
    className: "resize-contract-trigger"
  });
  expand.appendChild(expandChild);
  triggers.appendChild(expand);
  triggers.appendChild(contract);
  elem.appendChild(triggers);
  elem.__resize_triggers__ = {
    triggers,
    expand,
    expandChild,
    contract
  };
  resetTriggers(elem);
  elem.addEventListener("scroll", handleScroll, true);
  elem.__resize_last__ = {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}
function resetTriggers(elem) {
  var ref = elem.__resize_triggers__;
  var expand = ref.expand;
  var expandChild = ref.expandChild;
  var contract = ref.contract;
  var csw = contract.scrollWidth;
  var csh = contract.scrollHeight;
  var eow = expand.offsetWidth;
  var eoh = expand.offsetHeight;
  var esw = expand.scrollWidth;
  var esh = expand.scrollHeight;
  contract.scrollLeft = csw;
  contract.scrollTop = csh;
  expandChild.style.width = eow + 1 + "px";
  expandChild.style.height = eoh + 1 + "px";
  expand.scrollLeft = esw;
  expand.scrollTop = esh;
}

// node_modules/vue-echarts/dist/index.esm.min.js
var O = function() {
  return O = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++)
      for (var o in t = arguments[n])
        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e;
  }, O.apply(this, arguments);
};
var b = ["getWidth", "getHeight", "getDom", "getOption", "resize", "dispatchAction", "convertToPixel", "convertFromPixel", "containPixel", "getDataURL", "getConnectedDataURL", "appendData", "clear", "isDisposed", "dispose"];
function y(e) {
  return t = /* @__PURE__ */ Object.create(null), b.forEach(function(n) {
    t[n] = function(t2) {
      return function() {
        for (var n2 = [], r = 0; r < arguments.length; r++)
          n2[r] = arguments[r];
        if (!e.value)
          throw new Error("ECharts is not initialized yet.");
        return e.value[t2].apply(e.value, n2);
      };
    }(n);
  }), t;
  var t;
}
var _ = { autoresize: Boolean };
var E = /^on[^a-z]/;
var x = function(e) {
  return E.test(e);
};
function j(e, n) {
  var r = unref(e);
  return r && "object" == typeof r && "value" in r ? r.value || n : r || n;
}
var A = "ecLoadingOptions";
var L = { loading: Boolean, loadingOptions: Object };
var w = null;
var z = [];
var C = [];
!function(e, t) {
  if (e && "undefined" != typeof document) {
    var n, r = true === t.prepend ? "prepend" : "append", o = true === t.singleTag, i = "string" == typeof t.container ? document.querySelector(t.container) : document.getElementsByTagName("head")[0];
    if (o) {
      var a = z.indexOf(i);
      -1 === a && (a = z.push(i) - 1, C[a] = {}), n = C[a] && C[a][r] ? C[a][r] : C[a][r] = u();
    } else
      n = u();
    65279 === e.charCodeAt(0) && (e = e.substring(1)), n.styleSheet ? n.styleSheet.cssText += e : n.appendChild(document.createTextNode(e));
  }
  function u() {
    var e2 = document.createElement("style");
    if (e2.setAttribute("type", "text/css"), t.attributes)
      for (var n2 = Object.keys(t.attributes), o2 = 0; o2 < n2.length; o2++)
        e2.setAttribute(n2[o2], t.attributes[n2[o2]]);
    var a2 = "prepend" === r ? "afterbegin" : "beforeend";
    return i.insertAdjacentElement(a2, e2), e2;
  }
}("x-vue-echarts{display:block;width:100%;height:100%;min-width:0}\n", {});
var T = function() {
  if (null != w)
    return w;
  if ("undefined" == typeof HTMLElement || "undefined" == typeof customElements)
    return w = false;
  try {
    new Function("tag", "class EChartsElement extends HTMLElement {\n  __dispose = null;\n\n  disconnectedCallback() {\n    if (this.__dispose) {\n      this.__dispose();\n      this.__dispose = null;\n    }\n  }\n}\n\nif (customElements.get(tag) == null) {\n  customElements.define(tag, EChartsElement);\n}\n")("x-vue-echarts");
  } catch (e) {
    return w = false;
  }
  return w = true;
}();
Vue2 && Vue2.config.ignoredElements.push("x-vue-echarts");
var U = "ecTheme";
var D = "ecInitOptions";
var k = "ecUpdateOptions";
var S = defineComponent({ name: "echarts", props: O(O({ option: Object, theme: { type: [Object, String] }, initOptions: Object, updateOptions: Object, group: String, manualUpdate: Boolean }, _), L), emits: {}, inheritAttrs: false, setup: function(t, i) {
  var a = i.attrs, p = shallowRef(), b2 = shallowRef(), _2 = shallowRef(), E2 = inject("ecTheme", null), A2 = inject("ecInitOptions", null), L2 = inject("ecUpdateOptions", null), w2 = toRefs(t), z2 = w2.autoresize, C2 = w2.manualUpdate, U2 = w2.loading, D2 = w2.loadingOptions, k2 = computed(function() {
    return _2.value || t.option || null;
  }), S2 = computed(function() {
    return t.theme || j(E2, {});
  }), B = computed(function() {
    return t.initOptions || j(A2, {});
  }), P = computed(function() {
    return t.updateOptions || j(L2, {});
  }), H = computed(function() {
    return function(e) {
      var t2 = {};
      for (var n in e)
        x(n) || (t2[n] = e[n]);
      return t2;
    }(a);
  }), M = getCurrentInstance().proxy.$listeners;
  function F(e) {
    if (p.value) {
      var n = b2.value = init(p.value, S2.value, B.value);
      t.group && (n.group = t.group);
      var r = M;
      r || (r = {}, Object.keys(a).filter(function(e2) {
        return 0 === e2.indexOf("on") && e2.length > 2;
      }).forEach(function(e2) {
        var t2 = e2.charAt(2).toLowerCase() + e2.slice(3);
        "Once" === t2.substring(t2.length - 4) && (t2 = "~".concat(t2.substring(0, t2.length - 4))), r[t2] = a[e2];
      })), Object.keys(r).forEach(function(e2) {
        var t2 = r[e2];
        if (t2) {
          var o2 = e2.toLowerCase();
          "~" === o2.charAt(0) && (o2 = o2.substring(1), t2.__once__ = true);
          var i2 = n;
          if (0 === o2.indexOf("zr:") && (i2 = n.getZr(), o2 = o2.substring(3)), t2.__once__) {
            delete t2.__once__;
            var a2 = t2;
            t2 = function() {
              for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
                e3[n2] = arguments[n2];
              a2.apply(void 0, e3), i2.off(o2, t2);
            };
          }
          i2.on(o2, t2);
        }
      }), z2.value ? nextTick(function() {
        n && !n.isDisposed() && n.resize(), o();
      }) : o();
    }
    function o() {
      var t2 = e || k2.value;
      t2 && n.setOption(t2, P.value);
    }
  }
  function I() {
    b2.value && (b2.value.dispose(), b2.value = void 0);
  }
  var N = null;
  watch(C2, function(n) {
    "function" == typeof N && (N(), N = null), n || (N = watch(function() {
      return t.option;
    }, function(e, t2) {
      e && (b2.value ? b2.value.setOption(e, O({ notMerge: e !== t2 }, P.value)) : F());
    }, { deep: true }));
  }, { immediate: true }), watch([S2, B], function() {
    I(), F();
  }, { deep: true }), watchEffect(function() {
    t.group && b2.value && (b2.value.group = t.group);
  });
  var R = y(b2);
  return function(e, t2, i2) {
    var a2 = inject("ecLoadingOptions", {}), u = computed(function() {
      return O(O({}, j(a2, {})), null == i2 ? void 0 : i2.value);
    });
    watchEffect(function() {
      var n = e.value;
      n && (t2.value ? n.showLoading(u.value) : n.hideLoading());
    });
  }(b2, U2, D2), function(t2, n, r) {
    var o = null;
    watch([r, t2, n], function(e, t3, n2) {
      var r2 = e[0], i2 = e[1], a2 = e[2];
      r2 && i2 && a2 && (o = throttle(function() {
        i2.resize();
      }, 100), addListener(r2, o)), n2(function() {
        o && r2 && removeListener(r2, o);
      });
    });
  }(b2, z2, p), onMounted(function() {
    F();
  }), onBeforeUnmount(function() {
    T && p.value ? p.value.__dispose = I : I();
  }), O({ chart: b2, root: p, setOption: function(e, n) {
    t.manualUpdate && (_2.value = e), b2.value ? b2.value.setOption(e, n || {}) : F(e);
  }, nonEventAttrs: H }, R);
}, render: function() {
  var e = Vue2 ? { attrs: this.nonEventAttrs } : O({}, this.nonEventAttrs);
  return e.ref = "root", e.class = e.class ? ["echarts"].concat(e.class) : "echarts", h("x-vue-echarts", e);
} });
export {
  D as INIT_OPTIONS_KEY,
  A as LOADING_OPTIONS_KEY,
  U as THEME_KEY,
  k as UPDATE_OPTIONS_KEY,
  S as default
};
//# sourceMappingURL=vue-echarts.js.map

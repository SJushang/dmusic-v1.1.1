(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"87fb":function(e,n,t){"use strict";(function(e){t("00e6"),t("921b");a(t("66fd"));var n=a(t("a0fa"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"893b":function(e,n,t){"use strict";t.r(n);var a=t("a34c"),u=t.n(a);for(var c in a)"default"!==c&&function(e){t.d(n,e,function(){return a[e]})}(c);n["default"]=u.a},a0fa:function(e,n,t){"use strict";t.r(n);var a=t("e180"),u=t("893b");for(var c in u)"default"!==c&&function(e){t.d(n,e,function(){return u[e]})}(c);var o=t("2877"),r=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);n["default"]=r.exports},a34c:function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{}},onLoad:function(){this.loadExecution()},methods:{loadExecution:function(){try{var n=e.getStorageSync("launchFlag");n?1==n?e.switchTab({url:"/pages/dmusic/index"}):e.redirectTo({url:"/pages/index/guide"}):(e.setStorage({key:"launchFlag",data:!0,success:function(){console.log(t("存储launchFlag"," at pages\\index\\index.vue:40"))}}),e.redirectTo({url:"/pages/index/guide"}))}catch(a){e.setStorage({key:"launchFlag",data:!0,success:function(){console.log(t("error时存储launchFlag"," at pages\\index\\index.vue:53"))}}),e.redirectTo({url:"/pages/index/guide"})}}}};n.default=a}).call(this,t("6e42")["default"],t("0de9")["default"])},e180:function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement;e._self._c},u=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return u})}},[["87fb","common/runtime","common/vendor"]]]);
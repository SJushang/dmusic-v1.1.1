(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"26ae":function(t,e,n){"use strict";n.r(e);var o=n("a783");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("c0ab");var i,a,u=n("2877"),c=Object(u["a"])(o["default"],i,a,!1,null,null,null);e["default"]=c.exports},"456b":function(t,e,n){"use strict";(function(t){n("00e6"),n("921b");var e=u(n("66fd")),o=u(n("26ae")),r=u(n("c1f6")),i=u(n("de4b")),a=u(n("b23b"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){s(t,e,n[e])})}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.prototype.$config=a.default,e.default.prototype.$store=i.default,e.default.config.productionTip=!1,e.default.use(r.default),o.default.mpType="app";var l=new e.default(c({store:i.default},o.default));t(l).$mount()}).call(this,n("6e42")["createApp"])},9700:function(t,e,n){"use strict";(function(t,n){function o(t,e){return a(t)||i(t,e)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(t,e){var n=[],o=!0,r=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(o=(a=u.next()).done);o=!0)if(n.push(a.value),e&&n.length===e)break}catch(c){r=!0,i=c}finally{try{o||null==u["return"]||u["return"]()}finally{if(r)throw i}}return n}function a(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={onLaunch:function(){var e=this,r=t.createInnerAudioContext();r.onEnded(function(){var t=e.$store.state;if(1===t.mode)r.src=t.song.src,r.coverImgUrl=t.song.al.picUrl,r.singer=t.song.ar.map(function(t){return t.name}).join(" / "),r.title=t.song.name,r.id=t.song.id;else if(2===t.mode){var n=!0,i=!1,a=void 0;try{for(var u,c=t.songList.entries()[Symbol.iterator]();!(n=(u=c.next()).done);n=!0){var s=o(u.value,2),l=s[0],d=s[1];if(d.id===t.song.id)return void(l===t.songList.length-1?(e.$store.dispatch("update",{item:t.songList[0]}),e.$store.dispatch("updateLyric",{id:t.songList[0].id})):(e.$store.dispatch("update",{item:t.songList[l+1]}),e.$store.dispatch("updateLyric",{id:t.songList[l+1].id})))}}catch(p){i=!0,a=p}finally{try{n||null==c.return||c.return()}finally{if(i)throw a}}}else if(3===t.mode){var f=Math.floor(Math.random()*t.songList.length);t.songList[f].id===t.song.id?(r.src=t.song.src,r.coverImgUrl=t.song.al.picUrl,r.singer=t.song.ar.map(function(t){return t.name}).join(" / "),r.title=t.song.name,r.id=t.song.id):(e.$store.dispatch("update",{item:t.songList[f]}),e.$store.dispatch("updateLyric",{id:t.songList[f].id}))}}),this.$store.dispatch("setGlobalData",{key:"audio",value:r}),console.log(n(r," at App.vue:71"))},onShow:function(){console.log(n("App Show"," at App.vue:74"))},onHide:function(){console.log(n("App Hide"," at App.vue:77"))}};e.default=u}).call(this,n("6e42")["default"],n("0de9")["default"])},a783:function(t,e,n){"use strict";n.r(e);var o=n("9700"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=r.a},acce:function(t,e,n){},c0ab:function(t,e,n){"use strict";var o=n("acce"),r=n.n(o);r.a}},[["456b","common/runtime","common/vendor"]]]);
/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("async-queue",function(e,t){e.AsyncQueue=function(){this._init(),this.add.apply(this,arguments)};var n=e.AsyncQueue,r="execute",i="shift",s="promote",o="remove",u=e.Lang.isObject,a=e.Lang.isFunction;n.defaults=e.mix({autoContinue:!0,iterations:1,timeout:10,until:function(){return this.iterations|=0,this.iterations<=0}},e.config.queueDefaults||{}),e.extend(n,e.EventTarget,{_running:!1,_init:function(){e.EventTarget.call(this,{prefix:"queue",emitFacade:!0}),this._q=[],this.defaults={},this._initEvents()},_initEvents:function(){this.publish({execute:{defaultFn:this._defExecFn,emitFacade:!0},shift:{defaultFn:this._defShiftFn,emitFacade:!0},add:{defaultFn:this._defAddFn,emitFacade:!0},promote:{defaultFn:this._defPromoteFn,emitFacade:!0},remove:{defaultFn:this._defRemoveFn,emitFacade:!0}})},next:function(){var e;while(this._q.length){e=this._q[0]=this._prepare(this._q[0]);if(!e||!e.until())break;this.fire(i,{callback:e}),e=null}return e||null},_defShiftFn:function(e){this.indexOf(e.callback)===0&&this._q.shift()},_prepare:function(t){if(a(t)&&t._prepared)return t;var r=e.merge(n.defaults,{context:this,args:[],_prepared:!0},this.defaults,a(t)?{fn:t}:t),i=e.bind(function(){i._running||i.iterations--,a(i.fn)&&i.fn.apply(i.context||e,e.Array(i.args))},this);return e.mix(i,r)},run:function(){var e,t=!0;for(e=this.next();t&&e&&!this.isRunning();e=this.next())t=e.timeout<0?this._execute(e):this._schedule(e);return e||this.fire("complete"),this},_execute:function(e){this._running=e._running=!0,e.iterations--,this.fire(r,{callback:e});var t=this._running&&e.autoContinue;return this._running=e._running=!1,t},_schedule:function(t){return this._running=e.later(t.timeout,this,function(){this._execute(t)&&this.run()}),!1},isRunning:function(){return!!this._running},_defExecFn:function(e){e.callback()},add:function(){return this.fire("add",{callbacks:e.Array(arguments,0,!0)}),this},_defAddFn:function(t){var n=this._q,r=[];e.Array.each(t.callbacks,function(e){u(e)&&(n.push(e),r.push(e))}),t.added=r},pause:function(){return u(this._running)&&this._running.cancel(),this._running=!1,this},stop:function(){return this._q=[],this.pause()},indexOf:function(e){var t=0,n=this._q.length,r;for(;t<n;++t){r=this._q[t];if(r===e||r.id===e)return t}return-1},getCallback:function(e){var t=this.indexOf(e);return t>-1?this._q[t]:null},promote:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(s,t),n.detach()},this):this.fire(s,t),this},_defPromoteFn:function(e){var t=this.indexOf(e.callback),n=t>-1?this._q.splice(t,1)[0]:null;e.promoted=n,n&&this._q.unshift(n)},remove:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(o,t),n.detach()},this):this.fire(o,t),this},_defRemoveFn:function(e){var t=this.indexOf(e.callback);e.removed=t>-1?this._q.splice(t,1)[0]:null},size:function(){return this.isRunning()||this.next(),this._q.length}})},"3.7.3",{requires:["event-custom"]});

AUI.add("aui-event-base",function(j){var c=j.Lang,o=j.Array,q=j.DOMEventFacade,f=q.prototype,n="BACKSPACE",p="CAPS_LOCK",m="DOWN",e="ENTER",r="ESC",h="INSERT",g="PAGE_UP",l="PRINT_SCREEN",d="SHIFT",b="TAB",a="WIN_IME",k="";var i={BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,RETURN:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUM_LOCK:144,WIN_KEY:224,WIN_IME:229,hasModifier:function(t){var s=this;return t&&(t.ctrlKey||t.altKey||t.shiftKey||t.metaKey);},isKey:function(u,t){var s=this;return t&&((s[t]||s[t.toUpperCase()])==u);},isKeyInRange:function(x,y,u){var t=this;var s=false;if(y&&u){var w=t[y]||t[y.toUpperCase()];var v=t[u]||t[u.toUpperCase()];s=w&&v&&(x>=w&&x<=v);}return s;},isKeyInSet:function(v,u){var s=this;var t=o(arguments,1,true);return s._isKeyInSet(v,t);},isNavKey:function(t){var s=this;return s.isKeyInRange(t,g,m)||s.isKeyInSet(t,e,b,r);},isSpecialKey:function(u,t){var s=this;var v=(t=="keypress"&&s.ctrlKey);return v||s.isNavKey(u)||s.isKeyInRange(u,d,p)||s.isKeyInSet(u,n,l,h,a);},_isKeyInSet:function(y,u){var t=this;var w=u.length;var s=false;var x;var v;while(w--){x=u[w];v=x&&(t[x]||t[String(x).toUpperCase()]);if(y==v){s=true;break;}}return s;}};j.mix(f,{hasModifier:function(){var s=this;return i.hasModifier(s);},isKey:function(t){var s=this;return i.isKey(s.keyCode,t);},isKeyInRange:function(u,t){var s=this;return i.isKeyInRange(s.keyCode,u,t);},isKeyInSet:function(){var s=this;var t=o(arguments,0,true);return i._isKeyInSet(s.keyCode,t);},isNavKey:function(){var s=this;return i.isNavKey(s.keyCode);},isSpecialKey:function(){var s=this;return i.isSpecialKey(s.keyCode,s.type);}});j.Event.KeyMap=i;j.Event.supportsDOMEvent=function(t,s){s="on"+s;if(!(s in t)){if(!t.setAttribute){t=document.createElement("div");}if(t.setAttribute){t.setAttribute(s,"");return(typeof t[s]==="function");}}t=null;return true;};},"1.7.0",{requires:["event"]});AUI.add("aui-event-input",function(b){var a=b.Node.DOM_EVENTS;if(b.Event.supportsDOMEvent(document.createElement("textarea"),"input")){a.input=1;return;}a.cut=1;a.dragend=1;a.paste=1;var f="activeElement",g="ownerDocument",d="~~aui|input|event~~",c=["keydown","paste","drop","cut"],e={cut:1,drop:1,paste:1};b.Event.define("input",{on:function(k,j,i){var h=this;j._handler=k.on(c,b.bind(h._dispatchEvent,h,i));},delegate:function(l,k,j,i){var h=this;k._handles=[];k._handler=l.delegate("focus",function(o){var m=o.target,n=m.getData(d);if(!n){n=m.on(c,b.bind(h._dispatchEvent,h,j));k._handles.push(n);m.setData(d,n);}},i);},detach:function(j,i,h){i._handler.detach();},detachDelegate:function(j,i,h){b.Array.each(i._handles,function(l){var k=b.one(l.evt.el);if(k){k.setData(d,null);}l.detach();});i._handler.detach();},_dispatchEvent:function(k,j){var h=this,i=j.target;if(e[j.type]||(i.get(g).get(f)===i)){k.fire(j);}}});},"1.7.0",{requires:["aui-base"]});AUI.add("aui-event-delegate-change",function(a){var f=a.Object,c=a.Node,b=a.Selector,e="beforeactivate",d="change";a.Event.define(d,{delegate:function(k,j,i,h){var g=this;g._attachEvents(k,j,i,h);},detach:function(j,i,h){var g=this;g._detachEvents(j,i,h);},detachDelegate:function(j,i,h){var g=this;g._detachEvents(j,i,h);},on:function(j,i,h){var g=this;g._attachEvent(j,i,h);},_attachEvent:function(i,n,o,j,g){var l=this;var k=l._getEventName(i);var m=l._prepareHandles(n,i);if(!f.owns(m,k)){var h=o.fire;if(j){h=function(t){var r=j.getDOM();var p=true;var s=i.getDOM();var q=a.clone(t);do{if(s&&b.test(s,g)){q.currentTarget=a.one(s);q.container=j;p=o.fire(q);}s=s.parentNode;}while(p!==false&&!q.stopped&&s&&s!==r);return((p!==false)&&(q.stopped!==2));};}m[k]=a.Event._attach([k,h,i,o]);}},_attachEvents:function(l,k,j,i){var g=this;var h=g._prepareHandles(k,l);h[e]=l.delegate(e,function(n){var m=n.target;g._attachEvent(m,k,j,l,i);},i);},_detachEvents:function(i,h,g){a.each(h._handles,function(k,l,j){a.each(k,function(o,n,m){o.detach();});});delete h._handles;},_getEventName:a.cached(function(j){var g=d;var h=j.attr("tagName").toLowerCase();var i=j.attr("type").toLowerCase();if(h=="input"&&(i=="checkbox"||i=="radio")){g="click";}return g;}),_prepareHandles:function(i,h){if(!f.owns(i,"_handles")){i._handles={};}var g=i._handles;if(!f.owns(g,h)){g[h]={};}return g[h];}},true);},"1.7.0",{condition:{name:"aui-event-delegate-change",trigger:"event-base-ie",ua:"ie"},requires:["aui-node-base","aui-event-base"]});AUI.add("aui-event-delegate-submit",function(c){var b=c.Array,l=c.Object,k=c.Node,a=c.Selector,d="click",g="submit",n="after",j="submit_delegate",f="submit_on";c.Event.define(g,{delegate:function(t,s,r,q){var p=this;var u=p._prepareHandles(s,t);if(!l.owns(u,d)){u[d]=t.delegate(d,function(x){var w=x.target;if(p._getNodeName(w,"input")||p._getNodeName(w,"button")){var v=w.get("form");if(v){p._attachEvent(v,t,s,r,q);}}},q);}},detach:function(s,r,q){var p=this;p._detachEvents(s,r,q);},detachDelegate:function(s,r,q){var p=this;p._detachEvents(s,r,q);},on:function(s,r,q){var p=this;p._attachEvent(s,s,r,q);},_attachEvent:function(w,v,u,t,s){var q=this;var p=function(A){var x=true;if(s){if(!A.stopped||!q._hasParent(A._stoppedOnNode,v)){var y=v.getDOM();var z=w.getDOM();do{if(z&&a.test(z,s)){A.currentTarget=c.one(z);A.container=v;x=t.fire(A);if(A.stopped&&!A._stoppedOnNode){A._stoppedOnNode=v;}}z=z.parentNode;}while(x!==false&&!A.stopped&&z&&z!==y);x=((x!==false)&&(A.stopped!==2));}}else{x=t.fire(A);
if(A.stopped&&!A._stoppedOnNode){A._stoppedOnNode=v;}}return x;};var r=q._prepareHandles(u,w);if(!l.owns(r,g)){r[g]=c.Event._attach([g,p,w,t,s?j:f]);}},_detachEvents:function(r,q,p){c.each(q._handles,function(t,u,s){c.each(t,function(x,w,v){x.detach();});});delete q._handles;},_getNodeName:function(q,p){var r=q.get("nodeName");return r&&r.toLowerCase()===p.toLowerCase();},_hasParent:function(p,q){return p.ancestor(function(r){return r===q;},false);},_prepareHandles:function(r,q){if(!l.owns(r,"_handles")){r._handles={};}var p=r._handles;if(!l.owns(p,q)){p[q]={};}return p[q];}},true);var i=c.CustomEvent.prototype._on;c.CustomEvent.prototype._on=function(u,s,r,q){var p=this;var t=i.apply(p,arguments);if(p._kds){o.call(p,t,u,s,r,q);}else{e.call(p,t,u,s,r,q);}return t;};function m(r){var p=this;var q=b.some(r,function(t,s){if(t.args&&t.args[0]===j){var u=r.splice(r.length-1,1)[0];r.splice(s,0,u);return true;}});}function h(r,t){var p=t;var s={};var u=t[r.sub.id];var q=false;l.each(t,function(w,v){if(!q&&w.args&&w.args[0]===j){s[u.id]=u;q=true;}if(w!==u){s[w.id]=w;}});if(q){p=s;}return p;}function e(u,t,s,r,q){var p=this;if(r&&r[0]===f){if(q===n&&p._afters.length){m.call(p,p._afters);}else{if(p._subscribers.length){m.call(p,p._subscribers);}}}}function o(u,t,s,r,q){var p=this;if(r&&r[0]===f){if(q===n&&!l.isEmpty(p.afters)){p.afters=h.call(p,u,p.afters);}else{if(!l.isEmpty(p.subscribers)){p.subscribers=h.call(p,p.subscribers);}}}}},"1.7.0",{condition:{name:"aui-event-delegate-submit",trigger:"event-base-ie",ua:"ie"},requires:["aui-node-base","aui-event-base"]});AUI.add("aui-event",function(a){},"1.7.0",{skinnable:false,use:["aui-event-base","aui-event-input"]});
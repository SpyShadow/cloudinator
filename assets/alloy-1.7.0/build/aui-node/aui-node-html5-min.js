AUI.add("aui-node-html5",function(a){if(a.UA.ie){var c=a.namespace("HTML5"),b=a.DOM._create;if(!c._fragHTML5Shived){c._fragHTML5Shived=YUI.AUI.html5shiv(a.config.doc.createDocumentFragment());}a.mix(c,{IECreateFix:function(f,e){var d=c._fragHTML5Shived;d.appendChild(f);f.innerHTML=e;d.removeChild(f);return f;},_doBeforeCreate:function(f,h,e){var g=b.apply(this,arguments);var d=c.IECreateFix(g,f);return new a.Do.Halt(null,d);}});a.Do.before(c._doBeforeCreate,a.DOM,"_create",a.DOM);}},"1.7.0",{requires:["collection","aui-base"]});
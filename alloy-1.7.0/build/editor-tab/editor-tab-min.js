/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("editor-tab",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host";e.extend(n,e.Base,{_onNodeChange:function(e){var t="indent";e.changedType==="tab"&&(e.changedNode.test("li, li *")||(e.changedEvent.halt(),e.preventDefault(),e.changedEvent.shiftKey&&(t="outdent"),this.get(r).execCommand(t,"")))},initializer:function(){this.get(r).on("nodeChange",e.bind(this._onNodeChange,this))}},{NAME:"editorTab",NS:"tab",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorTab=n},"3.7.3",{requires:["editor-base"]});

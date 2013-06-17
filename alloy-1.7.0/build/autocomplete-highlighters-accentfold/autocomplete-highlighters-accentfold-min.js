/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
YUI.add("autocomplete-highlighters-accentfold",function(e,t){var n=e.Highlight,r=e.Array;e.mix(e.namespace("AutoCompleteHighlighters"),{charMatchFold:function(e,t){var i=r.unique(e.split(""));return r.map(t,function(e){return n.allFold(e.text,i)})},phraseMatchFold:function(e,t){return r.map(t,function(t){return n.allFold(t.text,[e])})},startsWithFold:function(e,t){return r.map(t,function(t){return n.allFold(t.text,[e],{startsWith:!0})})},subWordMatchFold:function(t,i){var s=e.Text.WordBreak.getUniqueWords(t);return r.map(i,function(e){return n.allFold(e.text,s)})},wordMatchFold:function(e,t){return r.map(t,function(t){return n.wordsFold(t.text,e)})}})},"3.7.3",{requires:["array-extras","highlight-accentfold"]});

AUI.add("aui-classnamemanager",function(a){var d=a.ClassNameManager,b=d.getClassName,c="aui";a.getClassName=a.cached(function(){var e=a.Array(arguments,0,true);e.unshift(c);e[e.length]=true;return b.apply(d,e);});},"1.7.0",{skinnable:false,requires:["classnamemanager"],condition:{name:"aui-classnamemanager",trigger:"classnamemanager",test:function(){return true;}}});
AUI.add("aui-overlay-context-panel",function(l){var h=l.Lang,D=h.isBoolean,i=h.isString,G=h.isObject,T="align",b="anim",F="arrow",j="backgroundColor",n="",P="boundingBox",H="click",w="contentBox",U="overlaycontextpanel",J="default",r=".",M="end",N="hidden",C="inner",o="opacity",Q="pointer",c="showArrow",e="state",R="style",S="visible",I="bc",E="bl",z="br",p="cc",t="lb",s="lc",m="lt",x="rb",v="rc",q="rl",f=l.getClassName,k=f(U),K=f(U,F,n),O=f(U,N),y=f(U,Q),g=f(U,Q,C),u=f(e,J),a='<div class="'+[u,y].join(" ")+'"></div>',B='<div class="'+g+'"></div>';var d=l.Component.create({NAME:U,ATTRS:{anim:{lazyAdd:false,value:{show:false},setter:function(A){return this._setAnim(A);}},arrow:{value:null,validator:i},hideOn:{value:H},showOn:{value:H},showArrow:{lazyAdd:false,value:true,validator:D},stack:{lazyAdd:false,value:true,setter:function(A){return this._setStack(A);},validator:D}},EXTENDS:l.OverlayContext,prototype:{bindUI:function(){var A=this;A.after("showArrowChange",A._afterShowArrowChange);A.before("show",A._beforeShow);d.superclass.bindUI.apply(A,arguments);},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;d.superclass.syncUI.apply(A,arguments);A._syncElements();},align:function(V,L){var A=this;d.superclass.align.apply(this,arguments);A._syncElements();},fixPointerColor:function(){var L=this;var V=L.get(w);var aa=V.one(r+g);aa.removeAttribute(R);var A=V.getStyle(j);var X="borderBottomColor";var Y=[r+K+x,r+K+v,r+K+q].join(",");var W=[r+K+z,r+K+I,r+K+E].join(",");var Z=[r+K+t,r+K+s,r+K+m].join(",");if(V.test(Y)){X="borderLeftColor";}else{if(V.test(W)){X="borderTopColor";}else{if(V.test(Z)){X="borderRightColor";}}}aa.setStyle(X,A);},getAlignPoint:function(){var A=this;var L=A.get(T).points[0];if(L==p){L=I;}return A.get(F)||L;},hide:function(L){var A=this;if(A._hideAnim){var V=A.get(S);if(V){A._hideAnim.once(M,function(){d.superclass.hide.apply(A,arguments);});A._hideAnim.run();}}else{d.superclass.hide.apply(A,arguments);}},_renderElements:function(){var A=this;var L=A.get(w);var W=A.get(T);var V=W.points[0];L.addClass(u);A._pointerNode=l.Node.create(a).append(B);L.append(A._pointerNode);},_syncElements:function(){var A=this;var V=A.get(w);var L=A._pointerNode;var W=A.getAlignPoint();if(A.get(c)){L.removeClass(O);V.removeClass(K+A._lastOverlayPoint);V.addClass(K+W);A.fixPointerColor();}else{L.addClass(O);}A._lastOverlayPoint=W;},_setStack:function(L){var A=this;if(L){l.OverlayContextPanelManager.register(A);}else{l.OverlayContextPanelManager.remove(A);}return L;},_setAnim:function(X){var A=this;var L=A.get(P);if(X){var Y={node:L,duration:0.1};var V=l.merge(Y,{from:{opacity:0},to:{opacity:1}});var W=l.merge(Y,{from:{opacity:1},to:{opacity:0}});if(G(X)){V=l.merge(V,X.show);W=l.merge(W,X.hide);}A._showAnim=new l.Anim(V);A._hideAnim=new l.Anim(W);if(G(X)){if(X.show===false){A._showAnim=null;}if(X.hide===false){A._hideAnim=null;}}}return X;},_beforeShow:function(V){var A=this;var L=A.get(P);var W=A.get(S);if(!W&&A._showAnim){L.setStyle(o,0);A._showAnim.run();}else{L.setStyle(o,1);}},_afterShowArrowChange:function(){var A=this;A._syncElements();}}});l.OverlayContextPanel=d;l.OverlayContextPanelManager=new l.OverlayManager({zIndexBase:1000});},"1.7.0",{skinnable:true,requires:["aui-overlay-context","anim"]});
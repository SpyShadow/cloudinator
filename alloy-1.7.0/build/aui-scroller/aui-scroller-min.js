AUI.add("aui-scroller",function(u){var i=u.Lang,s=i.isNumber,l=i.isString,F="boundingBox",m="clientWidth",p="contentBox",w="duration",d="edgeProximity",v="Height",q="Left",z="offset",t="scroll",x="Top",g="Width",G="horizontal",b=z+v,a=z+q,o=z+x,j=z+g,E="orientation",h="px",f=t+v,C="scroller",n="scrollcontent",c="_",y="vertical",D=u.getClassName,r=D(C,G),k=D(C,"item"),e=D(C,y);var B=u.Component.create({NAME:C,ATTRS:{duration:{setter:function(A){return A*1000;},validator:s,value:0.1},edgeProximity:{value:0.1},itemSelector:{value:">*"},orientation:{validator:function(A){return l(A)&&(A===G||A===y);},value:G}},UI_ATTRS:[E],prototype:{nodeSelection:null,initializer:function(){var A=this;var I=A.get(F);var H=A.get(p);A._boundingBox=I;A._contentBox=H;A._duration=A.get(w);A._edgeProximity=A.get(d);A._orientation=A.get(E);A.boundingBoxXY=A._boundingBox.getXY();A._boundingBoxEl=I.getDOM();A._contentBoxEl=H.getDOM();A._setCoords(A._orientation==G);A._updateNodeSelection();},bindUI:function(){var A=this;A.publish(n,{defaultFn:A._defaultScrollFn});var H=A._contentBox;A.after(["durationChange","edgeProximityChange"],A._setPrivateAttr);H.on("mouseenter",u.rbind(A._updateDimensions,A));H.on("mousemove",u.rbind(A._onMouseMove,A,A._boundingBox,A._contentBox,A._orientation));A._boundingBox.on("focus",A._onItemFocus,A);A._createAnimation();},_adjustToEdge:function(J){var A=this;var H=A._edgeProximity;var I=J;if(H){J=Math.max(J,H);J=Math.min(J,1-H);J=J-H;I=J/(1-(H*2));}return I;},_animate:function(A){var O=this;var I=O._fx;var K=O._boundingBoxEl;var H=O._orientation;var L=t+O._coordTL;var J=O._coordXY.toLowerCase();var N=K[L]||0;var M=A[J];I.from=N;I.to=M;I.start();},_constrain:function(J,I,H){var A=this;return Math.max(Math.min(J,H),I);},_createAnimation:function(){var A=this;var H=A._boundingBoxEl;var J=H[t+A._coordTL]||0;var I=J;A._fx=new u.SimpleAnim({duration:A._duration,from:J,intervalRate:1,to:I,onTween:function(K){H[t+A._coordTL]=K;}});A._throttleAnimate=A._animate;},_defaultScrollFn:function(H){var A=this;A._throttleAnimate(H);},_getPositionData:function(A,R){var Q=this;var P=Q.boundingBoxXY;var J=A-P[0];var H=R-P[1];var M=J*Q.ratioX;var K=H*Q.ratioY;var O=Q._constrain(J/Q.boundingBoxWidth,0,1);var N=Q._constrain(H/Q.boundingBoxHeight,0,1);O=Q._adjustToEdge(O);N=Q._adjustToEdge(N);var L=(Q.deltaX*O);var I=(Q.deltaY*N);return{x:L,y:I,scaledX:M,scaledY:K,relativeX:J,relativeY:H};},_onItemFocus:function(H){var A=this;A._updateDimensions();var J=H.target.getXY();var I=A._getPositionData.apply(A,J);A.fire(n,I);A._updatePrevXY(I.relativeX,I.relativeY);},_onMouseMove:function(K,J,H,I){var A=this;var L=A._getPositionData(K.pageX,K.pageY);A.fire(n,L);A._updatePrevXY(L.relativeX,L.relativeY);},_setCoords:function(H){var A=this;var J=x;var I="Y";if(H){J=q;I="X";}A._coordTL=J;A._coordXY=I;},_setPrivateAttr:function(H){var A=this;A[c+H.attrName]=H.newVal;},_updateDimensions:function(A){var O=this;var K=O._boundingBox;var N=O._contentBox;var M=K.get(b);var P=K.get(j);var H=N.get(m);var L=N.get(f);var J=H-P;var I=L-M;O.boundingBoxXY=K.getXY();O.ratioX=J/P;O.ratioY=I/M;O.deltaX=J;O.deltaY=I;O.boundingBoxHeight=M;O.boundingBoxWidth=P;O.contentBoxHeight=L;O.contentBoxWidth=H;},_updatePrevXY:function(H,I){var A=this;A._prevX=H;A._prevY=I;},_uiSetOrientation:function(J){var A=this;var I=A._boundingBox;var H=(J===G);I.toggleClass(r,H);I.toggleClass(e,!H);A._setCoords(H);A._orientation=J;},_updateNodeSelection:function(){var A=this;var H=A.get("itemSelector");A.nodeSelection=A._contentBox.all(H).addClass(k);},_prevX:0,_prevY:0}});u.Scroller=B;},"1.7.0",{requires:["aui-base","aui-simple-anim"],skinnable:true});
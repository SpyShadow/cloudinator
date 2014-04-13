AUI.add("aui-scheduler-event-recorder",function(W){var L=W.Lang,a=L.isArray,v=L.isObject,al=L.isString,H=L.isUndefined,m=W.IO.prototype._serialize,t=L.toInt,ah=function(ay,ax,A){return Math.min(Math.max(ay,ax),A);},i=W.DataType.DateMath,at="-",d=".",ar=" ",O="scheduler-event",P="scheduler-event-recorder",z="activeView",c="arrow",Z="body",R="bodyContent",b="borderRadius",l="boundingBox",Q="cancel",ad="click",s="constrain",U="content",ab="date",V="dateFormat",K="delete",X="endDate",aq="event",q="footerContent",T="form",p="header",ac="isoTime",F="keydown",k="node",y="offsetHeight",ak="offsetWidth",g="overlay",B="overlayOffset",M="px",ap="recorder",ao="rendered",e="region",f="right",ae="save",G="scheduler",j="schedulerChange",S="shadow",am="startDate",x="strings",an="submit",af="template",aa="title",E="toolbar",h="top",Y="visibleChange",u=W.getClassName,n=u(O),r=u(O,aa),N=u(O,ap),au=u(G,aq,ap,g),o=u(G,aq,ap,g,c),ai=u(G,aq,ap,g,c,h),aj=u(G,aq,ap,g,c,S),I=u(G,aq,ap,g,Z),ag=u(G,aq,ap,g,U),J=u(G,aq,ap,g,ab),C=u(G,aq,ap,g,T),aw=u(G,aq,ap,g,p),w=new W.Template('<div class="',aj," ",o,'"></div>','<div class="',o,'"></div>','<input type="hidden" name="startDate" value="{startDate}" />','<input type="hidden" name="endDate" value="{endDate}" />','<div class="',aw,'">','<input class="',ag,'" name="content" value="{content}" />',"</div>",'<div class="',I,'">','<label class="',J,'">{date}</label>',"</div>"),av='<form class="'+C+'" id="schedulerEventRecorderForm"></form>';var D=W.Component.create({NAME:P,ATTRS:{allDay:{value:false},content:{},duration:{value:60},dateFormat:{validator:al,value:"%a, %B %d,"},event:{},eventClass:{valueFn:function(){return W.SchedulerEvent;}},strings:{value:{},setter:function(A){return W.merge({"delete":"Delete","description-hint":"e.g., Dinner at Brian's",cancel:"Cancel",description:"Description",edit:"Edit",save:"Save",when:"When"},A||{});},validator:v},overlay:{validator:v,value:{constrain:true,visible:false,width:300,zIndex:500}},overlayOffset:{value:[15,-38],validator:a},template:{value:w},toolbar:{setter:function(ay){var ax=this;var A=ax.get(x);return W.merge({children:[{handler:W.bind(ax._handleSaveEvent,ax),label:A[ae]},{handler:W.bind(ax._handleCancelEvent,ax),label:A[Q]},{handler:W.bind(ax._handleDeleteEvent,ax),label:A[K]}]},ay||{});},validator:v,value:{}}},EXTENDS:W.SchedulerEvent,prototype:{initializer:function(){var A=this;A.get(k).addClass(N);A.publish("cancel",{defaultFn:A._defCancelEventFn});A.publish("delete",{defaultFn:A._defDeleteEventFn});A.publish("edit",{defaultFn:A._defEditEventFn});A.publish("save",{defaultFn:A._defSaveEventFn});A.after(j,A._afterSchedulerChange);A[g]=new W.Overlay(A.get(g));A[E]=new W.Toolbar(A.get(E));A[g].on(Y,W.bind(A._onOverlayVisibleChange,A));},getOverlayContentNode:function(){var A=this;var ax=A[g].get(l);return ax.one(d+ag);},getUpdatedSchedulerEvent:function(ay){var A=this,az=A.get(aq),ax={silent:!az},aA=A.serializeForm();if(!az){az=A.clone();}az.set(G,A.get(G),{silent:true});az.setAttrs(W.merge(aA,ay),ax);return az;},_afterSchedulerChange:function(az){var A=this;var ay=az.newVal;var ax=ay.get(l);ax.delegate(ad,W.bind(A._onClickSchedulerEvent,A),d+n);},_defCancelEventFn:function(ax){var A=this;A.get(k).remove();A.hideOverlay();},_defDeleteEventFn:function(ay){var A=this;var ax=A.get(G);ax.removeEvents(A.get(aq));A.hideOverlay();ax.syncEventsUI();},_defEditEventFn:function(ay){var A=this;var ax=A.get(G);A.hideOverlay();ax.syncEventsUI();},_defSaveEventFn:function(ay){var A=this;var ax=A.get(G);ax.addEvents(ay.newSchedulerEvent);A.hideOverlay();ax.syncEventsUI();},_handleCancelEvent:function(ax){var A=this;A.fire("cancel");ax.preventDefault();},_handleClickOutSide:function(ax){var A=this;A.fire("cancel");},_handleDeleteEvent:function(ax){var A=this;A.fire("delete",{schedulerEvent:A.get(aq)});ax.preventDefault();},_handleEscapeEvent:function(ax){var A=this;if(A[g].get(ao)&&(ax.keyCode==W.Event.KeyMap.ESC)){A.fire("cancel");ax.preventDefault();}},_handleSaveEvent:function(ay){var A=this,ax=A.get(aq)?"edit":"save";A.fire(ax,{newSchedulerEvent:A.getUpdatedSchedulerEvent()});ay.preventDefault();},_onClickSchedulerEvent:function(ay){var A=this;var ax=ay.currentTarget.getData(O);if(ax){A.set(aq,ax,{silent:true});A.showOverlay([ay.pageX,ay.pageY]);A.get(k).remove();}},_onOverlayVisibleChange:function(ax){var A=this;if(ax.newVal){A.populateForm();if(!A.get(aq)){var ay=A.getOverlayContentNode();if(ay){setTimeout(function(){ay.selectText();},0);}}}else{A.set(aq,null,{silent:true});A.get(k).remove();}},_onSubmitForm:function(ax){var A=this;A._handleSaveEvent(ax);},_renderOverlay:function(){var ax=this;var aA=ax.get(G);var az=aA.get(l);var A=ax.get(x);ax[g].render(az);ax[E].render(az);var ay=ax[g].get(l);ay.addClass(au);ax[g].set(q,ax[E].get(l));ax.formNode=W.Node.create(av);ax[g].set(R,ax.formNode);ax.formNode.on(an,W.bind(ax._onSubmitForm,ax));aA.get(l).on("clickoutside",W.bind(ax._handleClickOutSide,ax));},getFormattedDate:function(){var ay=this;var ax=ay.get(V);var aA=(ay.get(aq)||ay);var aC=aA.get(X);var aB=aA.get(G);var A=aA.get(am);var az=(aB.get(z).get(ac)?i.toIsoTimeString:i.toUsTimeString);return[aA._formatDate(A,ax),az(A),at,az(aC)].join(ar);},getTemplateData:function(){var ax=this,A=ax.get(x),ay=ax.get(aq)||ax,az=ay.get(U);if(H(az)){az=A["description-hint"];}return{content:az,date:ax.getFormattedDate(),endDate:ay.get(X).getTime(),startDate:ay.get(am).getTime()};},hideOverlay:function(){var A=this;A[g].hide();},populateForm:function(){var A=this;A.formNode.setContent(A.get(af).parse(A.getTemplateData()));},serializeForm:function(){var A=this;return W.QueryString.parse(m(A.formNode.getDOM()));},showOverlay:function(aG){var aF=this,aC=aG.concat([]),aD=aF[g],aB=aD.get(l);if(!aF[g].get(ao)){aF._renderOverlay();}aD.show();aF.handleEscapeEvent=W.on(F,W.bind(aF._handleEscapeEvent,aF));var aE=aB.all(d+o),aA=aE.item(0),ax=aA.get(y),az=aA.get(ak);aE.removeClass(ai).show();aG[0]-=aB.get(ak)*0.5;aG[1]-=aB.get(y)+ax*0.5;var ay=aD.getConstrainedXY(aG);
if(ay[1]!==aG[1]){aG[1]=aC[1]+ax*0.5;aE.addClass(ai);}aG=aD.getConstrainedXY(aG);aD.set("xy",aG);var A=ah(aC[0]-az*0.5,aG[0],aG[0]+aB.get(ak));aE.setX(A);}}});W.SchedulerEventRecorder=D;},"1.7.0",{skinnable:true,requires:["aui-scheduler-base","aui-template","aui-toolbar","io-form","querystring","overlay"]});
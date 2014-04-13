/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.3
build: 3.7.3
*/
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/io-xdr/io-xdr.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/io-xdr/io-xdr.js",
    code: []
};
_yuitest_coverage["build/io-xdr/io-xdr.js"].code=["YUI.add('io-xdr', function (Y, NAME) {","","/**","Extends IO to provide an alternate, Flash transport, for making","cross-domain requests.","@module io","@submodule io-xdr","@for IO","**/","","/**","Fires when the XDR transport is ready for use.","@event io:xdrReady","**/","var E_XDR_READY = Y.publish('io:xdrReady', { fireOnce: true }),","","/**","Map of stored configuration objects when using","Flash as the transport for cross-domain requests.","","@property _cB","@private","@type {Object}","**/","_cB = {},","","/**","Map of transaction simulated readyState values","when XDomainRequest is the transport.","","@property _rS","@private","@type {Object}","**/","_rS = {},","","// Document reference","d = Y.config.doc,","// Window reference","w = Y.config.win,","// XDomainRequest cross-origin request detection","xdr = w && w.XDomainRequest;","","/**","Method that creates the Flash transport swf.","","@method _swf","@private","@param {String} uri - location of io.swf.","@param {String} yid - YUI sandbox id.","@param {String} yid - IO instance id.","**/","function _swf(uri, yid, uid) {","    var o = '<object id=\"io_swf\" type=\"application/x-shockwave-flash\" data=\"' +","            uri + '\" width=\"0\" height=\"0\">' +","            '<param name=\"movie\" value=\"' + uri + '\">' +","            '<param name=\"FlashVars\" value=\"yid=' + yid + '&uid=' + uid + '\">' +","            '<param name=\"allowScriptAccess\" value=\"always\">' +","            '</object>',","        c = d.createElement('div');","","    d.body.appendChild(c);","    c.innerHTML = o;","}","","/**","Creates a response object for XDR transactions, for success","and failure cases.","","@method _data","@private","@param {Object} o - Transaction object generated by _create() in io-base.","@param {Boolean} u - Configuration xdr.use.","@param {Boolean} d - Configuration xdr.dataType.","","@return {Object}","**/","function _data(o, u, d) {","    if (u === 'flash') {","        o.c.responseText = decodeURI(o.c.responseText);","    }","    if (d === 'xml') {","        o.c.responseXML = Y.DataType.XML.parse(o.c.responseText);","    }","","    return o;","}","","/**","Method for intiating an XDR transaction abort.","","@method _abort","@private","@param {Object} o - Transaction object generated by _create() in io-base.","@param {Object} c - configuration object for the transaction.","**/","function _abort(o, c) {","    return o.c.abort(o.id, c);","}","","/**","Method for determining if an XDR transaction has completed","and all data are received.","","@method _isInProgress","@private","@param {Object} o - Transaction object generated by _create() in io-base.","**/","function _isInProgress(o) {","    return xdr ? _rS[o.id] !== 4 : o.c.isInProgress(o.id);","}","","Y.mix(Y.IO.prototype, {","","    /**","    Map of io transports.","","    @property _transport","    @private","    @type {Object}","    **/","    _transport: {},","","    /**","    Sets event handlers for XDomainRequest transactions.","","    @method _ieEvt","    @private","    @static","    @param {Object} o - Transaction object generated by _create() in io-base.","    @param {Object} c - configuration object for the transaction.","    **/","    _ieEvt: function(o, c) {","        var io = this,","            i = o.id,","            t = 'timeout';","","        o.c.onprogress = function() { _rS[i] = 3; };","        o.c.onload = function() {","            _rS[i] = 4;","            io.xdrResponse('success', o, c);","        };","        o.c.onerror = function() {","            _rS[i] = 4;","            io.xdrResponse('failure', o, c);","        };","        if (c[t]) {","            o.c.ontimeout = function() {","                _rS[i] = 4;","                io.xdrResponse(t, o, c);","            };","            o.c[t] = c[t];","        }","    },","","    /**","    Method for accessing the transport's interface for making a","    cross-domain transaction.","","    @method xdr","    @param {String} uri - qualified path to transaction resource.","    @param {Object} o - Transaction object generated by _create() in io-base.","    @param {Object} c - configuration object for the transaction.","    **/","    xdr: function(uri, o, c) {","        var io = this;","","        if (c.xdr.use === 'flash') {","            // The configuration object cannot be serialized safely","            // across Flash's ExternalInterface.","            _cB[o.id] = c;","            w.setTimeout(function() {","                try {","                    o.c.send(uri, { id: o.id,","                                    uid: o.uid,","                                    method: c.method,","                                    data: c.data,","                                    headers: c.headers });","                }","                catch(e) {","                    io.xdrResponse('transport error', o, c);","                    delete _cB[o.id];","                }","            }, Y.io.xdr.delay);","        }","        else if (xdr) {","            io._ieEvt(o, c);","            o.c.open(c.method || 'GET', uri);","            o.c.send(c.data);","        }","        else {","            o.c.send(uri, o, c);","        }","","        return {","            id: o.id,","            abort: function() {","                return o.c ? _abort(o, c) : false;","            },","            isInProgress: function() {","                return o.c ? _isInProgress(o.id) : false;","            },","            io: io","        };","    },","","    /**","    Response controller for cross-domain requests when using the","    Flash transport or IE8's XDomainRequest object.","","    @method xdrResponse","    @param {String} e Event name","    @param {Object} o Transaction object generated by _create() in io-base.","    @param {Object} c Configuration object for the transaction.","    @return {Object}","    **/","    xdrResponse: function(e, o, c) {","        c = _cB[o.id] ? _cB[o.id] : c;","        var io = this,","            m = xdr ? _rS : _cB,","            u = c.xdr.use,","            d = c.xdr.dataType;","","        switch (e) {","            case 'start':","                io.start(o, c);","                break;","           //case 'complete':","                //This case is not used by Flash or XDomainRequest.","                //io.complete(o, c);","                //break;","            case 'success':","                io.success(_data(o, u, d), c);","                delete m[o.id];","                break;","            case 'timeout':","            case 'abort':","            case 'transport error':","                o.c = { status: 0, statusText: e };","            case 'failure':","                io.failure(_data(o, u, d), c);","                delete m[o.id];","                break;","        }","    },","","    /**","    Fires event \"io:xdrReady\"","","    @method _xdrReady","    @private","    @param {Number} yid - YUI sandbox id.","    @param {Number} uid - IO instance id.","    **/","    _xdrReady: function(yid, uid) {","        Y.fire(E_XDR_READY, yid, uid);","    },","","    /**","    Initializes the desired transport.","","    @method transport","    @param {Object} o - object of transport configurations.","    **/","    transport: function(c) {","        if (c.id === 'flash') {","            _swf(Y.UA.ie ? c.src + '?d=' + new Date().valueOf().toString() : c.src, Y.id, c.uid);","            Y.IO.transports.flash = function() { return d.getElementById('io_swf'); };","        }","    }","});","","/**","Fires event \"io:xdrReady\"","","@method xdrReady","@protected","@static","@param {Number} yid - YUI sandbox id.","@param {Number} uid - IO instance id.","**/","Y.io.xdrReady = function(yid, uid){","    var io = Y.io._map[uid];","    Y.io.xdr.delay = 0;","    io._xdrReady.apply(io, [yid, uid]);","};","","Y.io.xdrResponse = function(e, o, c){","    var io = Y.io._map[o.uid];","    io.xdrResponse.apply(io, [e, o, c]);","};","","Y.io.transport = function(c){","    var io = Y.io._map['io:0'] || new Y.IO();","    c.uid = io._uid;","    io.transport.apply(io, [c]);","};","","/**","Delay value to calling the Flash transport, in the","event io.swf has not finished loading.  Once the E_XDR_READY","event is fired, this value will be set to 0.","","@property delay","@static","@type {Number}","**/","Y.io.xdr = { delay : 100 };","","","}, '3.7.3', {\"requires\": [\"io-base\", \"datatype-xml-parse\"]});"];
_yuitest_coverage["build/io-xdr/io-xdr.js"].lines = {"1":0,"15":0,"53":0,"54":0,"62":0,"63":0,"78":0,"79":0,"80":0,"82":0,"83":0,"86":0,"97":0,"98":0,"109":0,"110":0,"113":0,"134":0,"138":0,"139":0,"140":0,"141":0,"143":0,"144":0,"145":0,"147":0,"148":0,"149":0,"150":0,"152":0,"166":0,"168":0,"171":0,"172":0,"173":0,"174":0,"181":0,"182":0,"186":0,"187":0,"188":0,"189":0,"192":0,"195":0,"198":0,"201":0,"218":0,"219":0,"224":0,"226":0,"227":0,"233":0,"234":0,"235":0,"239":0,"241":0,"242":0,"243":0,"256":0,"266":0,"267":0,"268":0,"282":0,"283":0,"284":0,"285":0,"288":0,"289":0,"290":0,"293":0,"294":0,"295":0,"296":0,"308":0};
_yuitest_coverage["build/io-xdr/io-xdr.js"].functions = {"_swf:53":0,"_data:78":0,"_abort:97":0,"_isInProgress:109":0,"onprogress:138":0,"onload:139":0,"onerror:143":0,"ontimeout:148":0,"_ieEvt:133":0,"(anonymous 2):172":0,"abort:197":0,"isInProgress:200":0,"xdr:165":0,"xdrResponse:217":0,"_xdrReady:255":0,"flash:268":0,"transport:265":0,"xdrReady:282":0,"xdrResponse:288":0,"transport:293":0,"(anonymous 1):1":0};
_yuitest_coverage["build/io-xdr/io-xdr.js"].coveredLines = 74;
_yuitest_coverage["build/io-xdr/io-xdr.js"].coveredFunctions = 21;
_yuitest_coverline("build/io-xdr/io-xdr.js", 1);
YUI.add('io-xdr', function (Y, NAME) {

/**
Extends IO to provide an alternate, Flash transport, for making
cross-domain requests.
@module io
@submodule io-xdr
@for IO
**/

/**
Fires when the XDR transport is ready for use.
@event io:xdrReady
**/
_yuitest_coverfunc("build/io-xdr/io-xdr.js", "(anonymous 1)", 1);
_yuitest_coverline("build/io-xdr/io-xdr.js", 15);
var E_XDR_READY = Y.publish('io:xdrReady', { fireOnce: true }),

/**
Map of stored configuration objects when using
Flash as the transport for cross-domain requests.

@property _cB
@private
@type {Object}
**/
_cB = {},

/**
Map of transaction simulated readyState values
when XDomainRequest is the transport.

@property _rS
@private
@type {Object}
**/
_rS = {},

// Document reference
d = Y.config.doc,
// Window reference
w = Y.config.win,
// XDomainRequest cross-origin request detection
xdr = w && w.XDomainRequest;

/**
Method that creates the Flash transport swf.

@method _swf
@private
@param {String} uri - location of io.swf.
@param {String} yid - YUI sandbox id.
@param {String} yid - IO instance id.
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 53);
function _swf(uri, yid, uid) {
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_swf", 53);
_yuitest_coverline("build/io-xdr/io-xdr.js", 54);
var o = '<object id="io_swf" type="application/x-shockwave-flash" data="' +
            uri + '" width="0" height="0">' +
            '<param name="movie" value="' + uri + '">' +
            '<param name="FlashVars" value="yid=' + yid + '&uid=' + uid + '">' +
            '<param name="allowScriptAccess" value="always">' +
            '</object>',
        c = d.createElement('div');

    _yuitest_coverline("build/io-xdr/io-xdr.js", 62);
d.body.appendChild(c);
    _yuitest_coverline("build/io-xdr/io-xdr.js", 63);
c.innerHTML = o;
}

/**
Creates a response object for XDR transactions, for success
and failure cases.

@method _data
@private
@param {Object} o - Transaction object generated by _create() in io-base.
@param {Boolean} u - Configuration xdr.use.
@param {Boolean} d - Configuration xdr.dataType.

@return {Object}
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 78);
function _data(o, u, d) {
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_data", 78);
_yuitest_coverline("build/io-xdr/io-xdr.js", 79);
if (u === 'flash') {
        _yuitest_coverline("build/io-xdr/io-xdr.js", 80);
o.c.responseText = decodeURI(o.c.responseText);
    }
    _yuitest_coverline("build/io-xdr/io-xdr.js", 82);
if (d === 'xml') {
        _yuitest_coverline("build/io-xdr/io-xdr.js", 83);
o.c.responseXML = Y.DataType.XML.parse(o.c.responseText);
    }

    _yuitest_coverline("build/io-xdr/io-xdr.js", 86);
return o;
}

/**
Method for intiating an XDR transaction abort.

@method _abort
@private
@param {Object} o - Transaction object generated by _create() in io-base.
@param {Object} c - configuration object for the transaction.
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 97);
function _abort(o, c) {
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_abort", 97);
_yuitest_coverline("build/io-xdr/io-xdr.js", 98);
return o.c.abort(o.id, c);
}

/**
Method for determining if an XDR transaction has completed
and all data are received.

@method _isInProgress
@private
@param {Object} o - Transaction object generated by _create() in io-base.
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 109);
function _isInProgress(o) {
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_isInProgress", 109);
_yuitest_coverline("build/io-xdr/io-xdr.js", 110);
return xdr ? _rS[o.id] !== 4 : o.c.isInProgress(o.id);
}

_yuitest_coverline("build/io-xdr/io-xdr.js", 113);
Y.mix(Y.IO.prototype, {

    /**
    Map of io transports.

    @property _transport
    @private
    @type {Object}
    **/
    _transport: {},

    /**
    Sets event handlers for XDomainRequest transactions.

    @method _ieEvt
    @private
    @static
    @param {Object} o - Transaction object generated by _create() in io-base.
    @param {Object} c - configuration object for the transaction.
    **/
    _ieEvt: function(o, c) {
        _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_ieEvt", 133);
_yuitest_coverline("build/io-xdr/io-xdr.js", 134);
var io = this,
            i = o.id,
            t = 'timeout';

        _yuitest_coverline("build/io-xdr/io-xdr.js", 138);
o.c.onprogress = function() { _yuitest_coverfunc("build/io-xdr/io-xdr.js", "onprogress", 138);
_rS[i] = 3; };
        _yuitest_coverline("build/io-xdr/io-xdr.js", 139);
o.c.onload = function() {
            _yuitest_coverfunc("build/io-xdr/io-xdr.js", "onload", 139);
_yuitest_coverline("build/io-xdr/io-xdr.js", 140);
_rS[i] = 4;
            _yuitest_coverline("build/io-xdr/io-xdr.js", 141);
io.xdrResponse('success', o, c);
        };
        _yuitest_coverline("build/io-xdr/io-xdr.js", 143);
o.c.onerror = function() {
            _yuitest_coverfunc("build/io-xdr/io-xdr.js", "onerror", 143);
_yuitest_coverline("build/io-xdr/io-xdr.js", 144);
_rS[i] = 4;
            _yuitest_coverline("build/io-xdr/io-xdr.js", 145);
io.xdrResponse('failure', o, c);
        };
        _yuitest_coverline("build/io-xdr/io-xdr.js", 147);
if (c[t]) {
            _yuitest_coverline("build/io-xdr/io-xdr.js", 148);
o.c.ontimeout = function() {
                _yuitest_coverfunc("build/io-xdr/io-xdr.js", "ontimeout", 148);
_yuitest_coverline("build/io-xdr/io-xdr.js", 149);
_rS[i] = 4;
                _yuitest_coverline("build/io-xdr/io-xdr.js", 150);
io.xdrResponse(t, o, c);
            };
            _yuitest_coverline("build/io-xdr/io-xdr.js", 152);
o.c[t] = c[t];
        }
    },

    /**
    Method for accessing the transport's interface for making a
    cross-domain transaction.

    @method xdr
    @param {String} uri - qualified path to transaction resource.
    @param {Object} o - Transaction object generated by _create() in io-base.
    @param {Object} c - configuration object for the transaction.
    **/
    xdr: function(uri, o, c) {
        _yuitest_coverfunc("build/io-xdr/io-xdr.js", "xdr", 165);
_yuitest_coverline("build/io-xdr/io-xdr.js", 166);
var io = this;

        _yuitest_coverline("build/io-xdr/io-xdr.js", 168);
if (c.xdr.use === 'flash') {
            // The configuration object cannot be serialized safely
            // across Flash's ExternalInterface.
            _yuitest_coverline("build/io-xdr/io-xdr.js", 171);
_cB[o.id] = c;
            _yuitest_coverline("build/io-xdr/io-xdr.js", 172);
w.setTimeout(function() {
                _yuitest_coverfunc("build/io-xdr/io-xdr.js", "(anonymous 2)", 172);
_yuitest_coverline("build/io-xdr/io-xdr.js", 173);
try {
                    _yuitest_coverline("build/io-xdr/io-xdr.js", 174);
o.c.send(uri, { id: o.id,
                                    uid: o.uid,
                                    method: c.method,
                                    data: c.data,
                                    headers: c.headers });
                }
                catch(e) {
                    _yuitest_coverline("build/io-xdr/io-xdr.js", 181);
io.xdrResponse('transport error', o, c);
                    _yuitest_coverline("build/io-xdr/io-xdr.js", 182);
delete _cB[o.id];
                }
            }, Y.io.xdr.delay);
        }
        else {_yuitest_coverline("build/io-xdr/io-xdr.js", 186);
if (xdr) {
            _yuitest_coverline("build/io-xdr/io-xdr.js", 187);
io._ieEvt(o, c);
            _yuitest_coverline("build/io-xdr/io-xdr.js", 188);
o.c.open(c.method || 'GET', uri);
            _yuitest_coverline("build/io-xdr/io-xdr.js", 189);
o.c.send(c.data);
        }
        else {
            _yuitest_coverline("build/io-xdr/io-xdr.js", 192);
o.c.send(uri, o, c);
        }}

        _yuitest_coverline("build/io-xdr/io-xdr.js", 195);
return {
            id: o.id,
            abort: function() {
                _yuitest_coverfunc("build/io-xdr/io-xdr.js", "abort", 197);
_yuitest_coverline("build/io-xdr/io-xdr.js", 198);
return o.c ? _abort(o, c) : false;
            },
            isInProgress: function() {
                _yuitest_coverfunc("build/io-xdr/io-xdr.js", "isInProgress", 200);
_yuitest_coverline("build/io-xdr/io-xdr.js", 201);
return o.c ? _isInProgress(o.id) : false;
            },
            io: io
        };
    },

    /**
    Response controller for cross-domain requests when using the
    Flash transport or IE8's XDomainRequest object.

    @method xdrResponse
    @param {String} e Event name
    @param {Object} o Transaction object generated by _create() in io-base.
    @param {Object} c Configuration object for the transaction.
    @return {Object}
    **/
    xdrResponse: function(e, o, c) {
        _yuitest_coverfunc("build/io-xdr/io-xdr.js", "xdrResponse", 217);
_yuitest_coverline("build/io-xdr/io-xdr.js", 218);
c = _cB[o.id] ? _cB[o.id] : c;
        _yuitest_coverline("build/io-xdr/io-xdr.js", 219);
var io = this,
            m = xdr ? _rS : _cB,
            u = c.xdr.use,
            d = c.xdr.dataType;

        _yuitest_coverline("build/io-xdr/io-xdr.js", 224);
switch (e) {
            case 'start':
                _yuitest_coverline("build/io-xdr/io-xdr.js", 226);
io.start(o, c);
                _yuitest_coverline("build/io-xdr/io-xdr.js", 227);
break;
           //case 'complete':
                //This case is not used by Flash or XDomainRequest.
                //io.complete(o, c);
                //break;
            case 'success':
                _yuitest_coverline("build/io-xdr/io-xdr.js", 233);
io.success(_data(o, u, d), c);
                _yuitest_coverline("build/io-xdr/io-xdr.js", 234);
delete m[o.id];
                _yuitest_coverline("build/io-xdr/io-xdr.js", 235);
break;
            case 'timeout':
            case 'abort':
            case 'transport error':
                _yuitest_coverline("build/io-xdr/io-xdr.js", 239);
o.c = { status: 0, statusText: e };
            case 'failure':
                _yuitest_coverline("build/io-xdr/io-xdr.js", 241);
io.failure(_data(o, u, d), c);
                _yuitest_coverline("build/io-xdr/io-xdr.js", 242);
delete m[o.id];
                _yuitest_coverline("build/io-xdr/io-xdr.js", 243);
break;
        }
    },

    /**
    Fires event "io:xdrReady"

    @method _xdrReady
    @private
    @param {Number} yid - YUI sandbox id.
    @param {Number} uid - IO instance id.
    **/
    _xdrReady: function(yid, uid) {
        _yuitest_coverfunc("build/io-xdr/io-xdr.js", "_xdrReady", 255);
_yuitest_coverline("build/io-xdr/io-xdr.js", 256);
Y.fire(E_XDR_READY, yid, uid);
    },

    /**
    Initializes the desired transport.

    @method transport
    @param {Object} o - object of transport configurations.
    **/
    transport: function(c) {
        _yuitest_coverfunc("build/io-xdr/io-xdr.js", "transport", 265);
_yuitest_coverline("build/io-xdr/io-xdr.js", 266);
if (c.id === 'flash') {
            _yuitest_coverline("build/io-xdr/io-xdr.js", 267);
_swf(Y.UA.ie ? c.src + '?d=' + new Date().valueOf().toString() : c.src, Y.id, c.uid);
            _yuitest_coverline("build/io-xdr/io-xdr.js", 268);
Y.IO.transports.flash = function() { _yuitest_coverfunc("build/io-xdr/io-xdr.js", "flash", 268);
return d.getElementById('io_swf'); };
        }
    }
});

/**
Fires event "io:xdrReady"

@method xdrReady
@protected
@static
@param {Number} yid - YUI sandbox id.
@param {Number} uid - IO instance id.
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 282);
Y.io.xdrReady = function(yid, uid){
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "xdrReady", 282);
_yuitest_coverline("build/io-xdr/io-xdr.js", 283);
var io = Y.io._map[uid];
    _yuitest_coverline("build/io-xdr/io-xdr.js", 284);
Y.io.xdr.delay = 0;
    _yuitest_coverline("build/io-xdr/io-xdr.js", 285);
io._xdrReady.apply(io, [yid, uid]);
};

_yuitest_coverline("build/io-xdr/io-xdr.js", 288);
Y.io.xdrResponse = function(e, o, c){
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "xdrResponse", 288);
_yuitest_coverline("build/io-xdr/io-xdr.js", 289);
var io = Y.io._map[o.uid];
    _yuitest_coverline("build/io-xdr/io-xdr.js", 290);
io.xdrResponse.apply(io, [e, o, c]);
};

_yuitest_coverline("build/io-xdr/io-xdr.js", 293);
Y.io.transport = function(c){
    _yuitest_coverfunc("build/io-xdr/io-xdr.js", "transport", 293);
_yuitest_coverline("build/io-xdr/io-xdr.js", 294);
var io = Y.io._map['io:0'] || new Y.IO();
    _yuitest_coverline("build/io-xdr/io-xdr.js", 295);
c.uid = io._uid;
    _yuitest_coverline("build/io-xdr/io-xdr.js", 296);
io.transport.apply(io, [c]);
};

/**
Delay value to calling the Flash transport, in the
event io.swf has not finished loading.  Once the E_XDR_READY
event is fired, this value will be set to 0.

@property delay
@static
@type {Number}
**/
_yuitest_coverline("build/io-xdr/io-xdr.js", 308);
Y.io.xdr = { delay : 100 };


}, '3.7.3', {"requires": ["io-base", "datatype-xml-parse"]});

"use strict";
function trace() {
	console.log( arguments );
}

function prop( t, pn, p ) {
	p.enumerable = true;
	p.configurable = true;
	Object.defineProperty( t, pn, p );
}

function cnst( t, pn, v ) {
	prop( t, pn, { get: function() { return v; } } );
}

function roFunc( t, pn, f ) {
	cnst( t, pn, f );
}

var ASJS = {
	t: {
		cc: function( t, p, a, oa ) {
			"asjstcc";
			( p || Object ).apply( t, oa || a );
			var s = {};
			for ( var k in t ) {
				if ( k != "$c" && k != "construct" ) {
					if ( Object.getOwnPropertyDescriptor( t, k ).writable ) s[ k ] = t[ k ];
					else prop( s, k, Object.getOwnPropertyDescriptor( t, k ) );
				}
			}
			return s;
		},
		c: function( t, s, a, f ) {
			"asjstc";
			if ( !t.$c ) t.$c = [];
			t.$c.push( f );
			
			if ( a.callee.caller.toString().indexOf( "asjstcc" ) == -1 ) {
				while ( t.$c.length > 0 ) {
					var fnc = t.$c.shift();
					if ( typeof fnc == "function" ) fnc.call( t );
				}
				t.$c = null;
				delete t.$c;
				t.construct = null;
				delete t.construct;
			}
	
			return t;
		},
		bc: function( t, p, a, oa, b ) {
			"asjstbc";
			var s = ASJS.t.cc( t, p, a, oa );
			b( t, s );
			return s;
		}
	}
};

function createClass( t, p, oa, b ) {
	var h = arguments.callee.caller;
	var a = h.toString().indexOf( "createSingletonClass" ) > -1 ? h.arguments.callee.caller.arguments : h.arguments;
	return ASJS.t.c( t, ASJS.t.bc( t, p, a, oa, b ), a, t.construct );
};

function createSingletonClass( o, t, p, oa, b ) {
	var a = arguments.callee.caller.arguments.callee.caller;
	if ( a.toString().indexOf( "createClass" ) > -1 ) return createClass( t, p, oa, b );
	return o.$i || ( o.$i = createClass( t, p, oa, b ) );
};

var sourcePath = "";
function sourcePath( v ) {
	if ( sourcePath == "" ) sourcePath = v;
}

var includedScript = {};
function includeOnce( filename ) {
	if ( includedScript[ filename ] ) return;
	includedScript[ filename ] = 1;
	$.ajaxSetup( { async: false } );
	$.getScript( sourcePath + filename );
	$.ajaxSetup( { async: true } );
}

var stage;
ASJS.inited = false;
ASJS.start = function( baseClass ) {
	if ( ASJS.inited ) return;
	ASJS.inited = true;
	window.onload = function() {
		stage = new ASJS.Stage();
		stage.init();
		new baseClass();
	};
}

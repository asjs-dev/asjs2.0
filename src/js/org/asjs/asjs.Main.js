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

function createClass( t, p, oa, b ) {
	function bc( t, p, a, oa, b ) {
		function bca( t, s, a, f ) {
			if ( !t.$c ) t.$c = [];
			if ( t.$c.indexOf( f ) == -1 ) t.$c.push( f );
			if ( a.callee.caller == null || a.callee.caller.name != bcb.name ) {
				while ( t.$c.length > 0 ) {
					var fnc = t.$c.shift();
					if ( typeof fnc == "function" ) fnc.call( t );
				}
				t.$c = null;
				t.new = null;
				delete t.$c;
				delete t.new;
			}
			return t;
		};
		
		function bcb( t, p, a, oa ) {
			( p || Object ).apply( t, oa || a );
			var s = {};
			for ( var k in t ) {
				if ( k != "$c" && k != "new" ) {
					if ( Object.getOwnPropertyDescriptor( t, k ).writable ) s[ k ] = t[ k ];
					else prop( s, k, Object.getOwnPropertyDescriptor( t, k ) );
				}
			}
			return s;
		};
		
		var s = bcb( t, p, a, oa );
		if ( typeof b == "function" ) b( t, s );
		return bca( t, s, a, t.new );
	};
	
	var h = arguments.callee.caller;
	var a = h && h.name == createSingletonClass.name ? h.arguments.callee.caller.arguments : h.arguments;
	return bc( t, p, a, oa, b );
};

function createSingletonClass( o, t, p, oa, b ) {
	var a = arguments.callee.caller.arguments.callee.caller;
	if ( a && a.name == createClass.name ) return createClass( t, p, oa, b );
	return o.$i || ( o.$i = createClass( t, p, oa, b ) );
};

function sourcePath( v ) {
	if ( ASJS.sourcePath == "" ) ASJS.sourcePath = v;
}

function includeOnce( f ) {
	if ( ASJS.includedScript[ f ] ) return;
	ASJS.includedScript[ f ] = 1;
	var script = ASJS.Tag( "script" );
		script.setAttr( "type", "text/javascript" );
		script.setAttr( "src", ASJS.sourcePath + f );
	( new ASJS.Head() ).addChild( script );
}

var stage;
var ASJS = {
	sourcePath: "",
	includedScript: {},
	inited: false,
	start: function( b ) {
		if ( ASJS.inited ) return;
		ASJS.inited = true;
		window.onload = function() {
			new ASJS.Polyfill();
			stage = new ASJS.Stage();
			stage.init();
			new b();
		};
	}
};

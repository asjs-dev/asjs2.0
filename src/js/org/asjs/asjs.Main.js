"use strict";

var trace = console.log;

function prop( t, pn, p ) {
	p.enumerable = true;
	p.configurable = true;
	Object.defineProperty( t, pn, p );
}

function cnst( t, pn, v ) {
	prop( t, pn, { get: function() { return v; } } );
}

var roFunc = cnst;

function stackTrace() {
	var list = [];
	try {
		throw new Error();
	} catch ( e ) {
		var re = new RegExp( "(new )*([a-zA-Z0-9\.]+)@|at (new )*([a-zA-Z0-9\.]+) \\(", "g" );
		var st = e.stack;
		var m;
		re.exec( st );
		while ( ( m = re.exec( st ) ) && list.length < 6 ) list.push( m[ 2 ] || m[ 4 ] );
	}
	return list;
}

function createClass( t, p, oa, b ) {
	function bc( t, p, a, oa, b ) {
		function bca( t, s, a, f ) {
			if ( !t.$c ) t.$c = [];
			if ( t.$c.indexOf( f ) == -1 ) t.$c.push( f );
			var cn = stackTrace()[ a ? 4 : 5 ];
			if ( cn != bcb.name ) {
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
		
		function bcb( t, p, oa ) {
			( p || Object ).apply( t, oa );
			var s = {};
			for ( var k in t ) {
				if ( k != "$c" && k != "new" ) {
					if ( Object.getOwnPropertyDescriptor( t, k ).writable ) s[ k ] = t[ k ];
					else prop( s, k, Object.getOwnPropertyDescriptor( t, k ) );
				}
			}
			return s;
		};
		
		var s = bcb( t, p, oa );
		if ( typeof b == "function" ) b( t, s );
		return bca( t, s, a, t.new );
	};
	
	var h = arguments.callee.caller;
	var cn = stackTrace()[ 1 ];
	var a = cn == createSingletonClass.name ? h.arguments.callee.caller.arguments : h.arguments;
	return bc( t, p, a.callee.caller, oa, b );
};

function createSingletonClass( o, t, p, oa, b ) {
	var cn = stackTrace()[ 4 ];
	if ( cn == createClass.name ) return createClass( t, p, oa, b );
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

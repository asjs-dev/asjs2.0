"use strict";

var trace = console.log;
var trc = trace;
try {
	trace( "" );
} catch ( e ) {
	console.log( e );
	trace = function() {};
	trc = trace;
}
console.clear();

var property = function( t, pn, p ) {
	p.enumerable = true;
	p.configurable = true;
	Object.defineProperty( t, pn, p );
}
var prop = property;

var constant = function( t, pn, v ) {
	prop( t, pn, {
		get: function() { return v; }
	});
}
var cnst = constant;

var readOnlyFunction = cnst;
var roFunc = readOnlyFunction;

var createClass = function( p, a, n ) {
	function extendProperties( t ) {
		var s = {};
		for ( var k in t ) {
			if ( k != "$i" && k != "$n" && k != "$f" && k != "new" && k != "constructor" ) {
				if ( Object.getOwnPropertyDescriptor( t, k ).writable ) s[ k ] = t[ k ];
				else prop( s, k, Object.getOwnPropertyDescriptor( t, k ) );
			}
		}
		return s;
	}

	function c() {
		var t = this;
		var arg = [];
		if ( a ) {
			for ( var i = 0; i < a.length; i++ ) {
				arg.push( a[ i ] );
			}
		}
		for ( var i = 0; i < arguments.length; i++ ) {
			arg.push( arguments[ i ] );
		}
		
		if ( !t.$n ) t.$n = [];
		t.$n.push( n );
		
		p.apply( t, arg );
		
		var s = extendProperties( t );
		
		if ( n ) n( t, s );
		
		if ( !t.$f ) t.$f = [];
		var f = t.new;
		if ( f ) {
			if ( t.$f.indexOf( f ) == -1 ) t.$f.push( f );
			t.new = null;
		}
		if ( t.$n[ 0 ] == n ) {
			t.$n = null;
			while ( t.$f.length > 0 ) t.$f.shift().apply( t, arg );
			t.$f = null;
		}
	}
	
	c.prototype = Object.create( p.prototype );
	c.prototype.constructor = c;
	
	return c;
}
var c0 = createClass;

var createSingletonClass = function( sc, p, a, n ) {
	roFunc( sc, "instance", function() {
		if ( !sc.$i ) cnst( sc, "$i", new ( createClass( p, a, n ) )() );
		return sc.$i;
	});
}
var c1 = createSingletonClass;

function sourcePath( v ) {
	if ( ASJS.sourcePath == "" ) ASJS.sourcePath = v;
}

function includeOnce( f ) {
	if ( ASJS.includedScript[ f ] ) return;
	ASJS.includedScript[ f ] = 1;
	var script = ASJS.Tag( "script" );
		script.setAttr( "type", "text/javascript" );
		script.setAttr( "src", ASJS.sourcePath + f );
	( ASJS.Head.instance() ).addChild( script );
}

var stage;
var ASJS = {
	sourcePath: "",
	includedScript: {},
	initedClasses: [],
	start: function( b ) {
		ASJS.Polyfill.instance();
		if ( !stage ) {
			stage = ASJS.Stage.instance();
			stage.init();
		}
		if ( ASJS.initedClasses.indexOf( b ) == -1 ) {
			ASJS.initedClasses.push( b );
			try {
				new b();
			} catch ( e ) {
				console.log( e );
			}
		}
	}
};

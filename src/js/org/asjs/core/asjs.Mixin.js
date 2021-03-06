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

var message = function( t, pn, v ) {
	cnst( t, pn, v + "_" + ( new Date() ).valueOf() + message.id++ );
}
message.id = 0;
var msg = message;

var readOnlyFunction = cnst;
var roFunc = readOnlyFunction;

var extendProperties = function( t ) {
	var s = {};
	for ( var k in t ) {
		if ( k != "$i" && k != "$n" && k != "$f" && k != "new" && k != "constructor" ) {
			if ( Object.getOwnPropertyDescriptor( t, k ).writable ) s[ k ] = t[ k ];
			else prop( s, k, Object.getOwnPropertyDescriptor( t, k ) );
		}
	}
	return s;
}
var createClass = function( p, a, n ) {
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
		var sp = extendProperties( t.protected );
		if ( n ) n( t, s, s.protected );
		
		if ( !t.$f ) t.$f = [];
		if ( t.new ) {
			if ( t.$f.indexOf( t.new ) == -1 ) t.$f.push( t.new );
			t.new = null;
			delete t.new;
		}
		if ( t.$n[ 0 ] == n ) {
			t.$n = null;
			delete t.$n;
			
			while ( t.$f.length > 0 ) t.$f.shift().apply( t, arg );
			
			t.$f = null;
			delete t.$f;
			
			t.protected = null;
			delete t.protected;
			
			s.protected = sp;
		}
		s = null;
		t = null;
	}
	
	c.prototype = Object.create( p.prototype );
	c.prototype.constructor = c;

	return c;
}
var c0 = createClass;

var createSingletonClass = function( p, a, n ) {
	return new ( c0( p, a, n ) )();
}
var c1 = createSingletonClass;

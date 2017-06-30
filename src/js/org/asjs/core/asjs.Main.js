var stage;
var ASJS = (function() {
	var _scope = {};
	
	var _sourcePath     = "";
	var _includedScript = {};
	var _initedClasses  = [];
	
	_scope.sourcePath = function( v ) {
		if ( _sourcePath == "" ) _sourcePath = v;
	}
	
	_scope.includeOnce = function( f ) {
		if ( _includedScript[ f ] ) return;
		_includedScript[ f ] = 1;
		var script = ASJS.Tag( "script" );
			script.setAttr( "type", "text/javascript" );
			script.setAttr( "src",  _sourcePath + f );
		( ASJS.Head.instance() ).addChild( script );
	}
	
	_scope.start = function( b ) {
		if ( !stage ) {
			ASJS.Polyfill.instance();
			stage = ASJS.Stage.instance();
			if ( _initedClasses.indexOf( b ) == -1 ) {
				trace( "<AS/JS> core version: 2.{{version}}" );
				_initedClasses.push( b );
				try {
					stage.addChild( new b() );
				} catch ( e ) {
					trace( e );
				}
			}
		} else return b;
	}
	
	_scope.BaseClass = createClass( Object, null,
		function( _scope ) {
			var _protected = {};
			
			prop( _scope, "protected", {
				get: function() { return _protected; },
				set: function( v ) { _protected = v; }
			});
		}
	);
	
	return _scope;
})();
var sourcePath = ASJS.sourcePath;
var includeOnce = ASJS.includeOnce;

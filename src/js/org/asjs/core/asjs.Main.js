var stage;
var ASJS = {
	sourcePath: "",
	includedScript: {},
	initedClasses: [],
	sourcePath: function( v ) {
		if ( ASJS.sourcePath == "" ) ASJS.sourcePath = v;
	},
	includeOnce: function( f ) {
		if ( ASJS.includedScript[ f ] ) return;
		ASJS.includedScript[ f ] = 1;
		var script = ASJS.Tag( "script" );
			script.setAttr( "type", "text/javascript" );
			script.setAttr( "src", ASJS.sourcePath + f );
		( ASJS.Head.instance() ).addChild( script );
	},
	start: function( b ) {
		ASJS.Polyfill.instance();
		stage = ASJS.Stage.instance();
		if ( ASJS.initedClasses.indexOf( b ) == -1 ) {
			trace( "<AS/JS> core version: 2.{{version}}" );
			ASJS.initedClasses.push( b );
			try {
				new b();
			} catch ( e ) {
				trace( e );
			}
		}
	}
};
var sourcePath = ASJS.sourcePath;
var includeOnce = ASJS.includeOnce;

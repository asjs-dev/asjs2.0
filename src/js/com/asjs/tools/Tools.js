var Tools = {};
// public static const

// public static variable

// public static property

// public static function
roFunc( Tools, "replaceText", function( s, o ) {
	var r = /{{.*?}}/g;
	var rt = s;
	var m;
	while ( ( m = r.exec( s ) ) !== null ) {
		if ( m.index === r.lastIndex ) r.lastIndex++;
		var e = m[ 0 ].split( "{{" ).join( "" ).split( "}}" ).join( "" );
		var c = Tools.ref( o, e );
		rt = rt.replace( m[ 0 ], c != null ? c : m[0] );
	}
	return rt;
});

roFunc( Tools, "ref", function( o, s ) {
	return s.split( "." ).reduce( function( o, x ) { return o[ x ]; }, o );
});

roFunc( Tools, "isValidEmailAddress", function( email ) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test( email );
});

roFunc( Tools, "getURLParams", function( param ) {
	var url = decodeURIComponent( new ASJS.Window().location.href ).split( "#" );
	if ( url[ 1 ] == '' || url[ 1 ] == undefined ) return [];
	var params = url[ 1 ].split( '&' );
	var i = -1;
	var l = params.length;
	var urlParams = {};
	while ( ++i < l ) {
		var line = params[ i ].split( '=' );
		urlParams[ line[ 0 ] ] = line[ 1 ];
	}
	return urlParams[ param ];
});

roFunc( Tools, "createUrlParams", function( params ) {
	var url = "";
	for ( var k in params ) {
		if ( url != "" ) url += "&";
		url += k + "=" + params[ k ];
	}
	new ASJS.Window().location.href = '#' + url;
	Tools.reload();
});

roFunc( Tools, "reload", function() {
	new ASJS.Window().location.reload( true );
});

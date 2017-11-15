var LZW = {};
roFunc( LZW, "encode", function( s ) {
	var dict = {};
	var data = ( s + "" ).split( "" );
	var code = 256;
	var out = [];
	var currChar;
	var phrase = data[ 0 ];
	for ( var i = 1; i < data.length; i++ ) {
		currChar = data[ i ];
		if ( dict[ '_' + phrase + currChar ] != null ) phrase += currChar;
		else {
			out.push( phrase.length > 1 ? dict[ '_' + phrase ] : phrase.charCodeAt( 0 ) );
			dict[ '_' + phrase + currChar ] = code;
			code++;
			phrase=currChar;
		}
	}
	out.push( phrase.length > 1 ? dict[ '_' + phrase ] : phrase.charCodeAt( 0 ) );
	for ( var i = 0; i < out.length; i++ ) out[ i ] = String.fromCharCode( out[ i ] );
	return out.join( "" );
});
roFunc( LZW, "decode", function(s) {
	var dict = {};
	var data = ( s + "" ).split( "" );
	var code = 256;
	var currChar = data[ 0 ];
	var oldPhrase = currChar;
	var out = [ currChar ];
	var phrase;
	for ( var i = 1; i < data.length; i++ ) {
		var currCode = data[ i ].charCodeAt( 0 );
		if ( currCode < 256 ) phrase = data[ i ];
		else phrase = dict[ '_' + currCode ] ? dict[ '_' + currCode ] : ( oldPhrase + currChar );
		out.push( phrase );
		currChar = phrase.charAt( 0 );
		dict[ '_' + code ] = oldPhrase + currChar;
		code++;
		oldPhrase = phrase;
	}
	return out.join( "" );
});

ASJS.Color = function( r, g, b, a ) {
	return createClass( this, Object, null,
		function( _scope, _super ) {
			_scope.r = r || 0;
			_scope.g = g || 0;
			_scope.b = b || 0;
			_scope.a = a || 255;
			
			prop( _scope, "hex", {
				get: function() { return ASJS.Color.rgbToHex( _scope ); },
				set: function( v ) {
					var color = ASJS.Color.hexToRgb( v );
					_scope.r = color.r;
					_scope.g = color.g;
					_scope.b = color.b;
					_scope.a = color.a;
				}
			});
		}
	);
};
// public static const

// public static variable

// public static property

// public static function
roFunc( ASJS.Color, "rgbToString", function( color ) {
	return "rgba( " + color.r + ", " + color.g + ", " + color.b + ", " + color.a + " )";
});

roFunc( ASJS.Color, "hexToRgb", function( hex ) {
	var shorthandRegex = /^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
		return r + r + g + g + b + b;
	});

	var result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result ? new ASJS.Color( parseInt( result[1], 16 ), parseInt( result[2], 16 ), parseInt( result[3], 16 ), 255 ) : null;
});
	
roFunc( ASJS.Color, "rgbToHex", function( color ) {
	var toHex = function( v ) {
		var hex = v.toString( 16 );
		return ( hex.length == 1 ? "0" : "" ) + hex;
	}
	return toHex( color.r ) + toHex( color.g ) + toHex( color.b );
});

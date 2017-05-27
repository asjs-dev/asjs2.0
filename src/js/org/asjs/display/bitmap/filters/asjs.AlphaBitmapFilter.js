includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.AlphaBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _isDarkness;
		
		// constructor
		_scope.new = function( type ) {
			_isDarkness = type == ASJS.AlphaBitmapFilter.TYPE_DARKNESS;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function( pixels ) {
			var d = pixels.data;
			var i = -4;
			var l = d.length;
			while ( ( i += 4 ) < l ) {
				var average = ( ( d[ i ] + d[ i + 1 ] + d[ i + 2 ] ) / 3 );
				var a = Math.round( _isDarkness ? 255 - average : average );
				d[ i + 3 ] -= a;
			}
			return pixels;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const
cnst( ASJS.AlphaBitmapFilter, "TYPE_DARKNESS",   "ASJS-AlphaBitmapFilter-typeDarkness" );
cnst( ASJS.AlphaBitmapFilter, "TYPE_BRIGHTNESS", "ASJS-AlphaBitmapFilter-typeBrightness" );

// public static variable

// public static property

// public static function


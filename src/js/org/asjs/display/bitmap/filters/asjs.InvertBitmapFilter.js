includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.InvertBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _map = {};
		
		// constructor
		
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
				d[ i ]     = convert( d[ i ] );
				d[ i + 1 ] = convert( d[ i + 1 ] );
				d[ i + 2 ] = convert( d[ i + 2 ] );
			}
			
			_map = {};
			
			return pixels;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function convert( value ) {
			if ( !_map[ value ] ) {
				_map[ value ] = 128 - ( value - 128 );
			}
			return _map[ value ];
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


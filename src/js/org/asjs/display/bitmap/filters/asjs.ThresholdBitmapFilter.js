includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ThresholdBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _map = {};
		
		// constructor
		_scope.new = function( threshold ) {
			_scope.threshold = threshold;
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
				var originalColor = new ASJS.Color( d[ i ], d[ i + 1 ], d[ i + 2 ], d[ i + 3 ] );
				var hexValue = originalColor.hex;
				
				if ( !_map[ hexValue ] ) {
					_map[ hexValue ] = 
						0.2126 * originalColor.r + 
						0.7152 * originalColor.g + 
						0.0722 * originalColor.b >= _scope.threshold 
							? 255 
							: 0;
				}
				
				d[ i ] = d[ i + 1 ] = d[ i + 2 ] = _map[ hexValue ];
			}
			
			_map = {};
			
			return pixels;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


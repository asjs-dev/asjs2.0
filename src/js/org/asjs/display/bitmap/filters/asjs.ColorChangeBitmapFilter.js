includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );
includeOnce( "org/asjs/display/bitmap/utils/asjs.Color.js" );

ASJS.ColorChangeBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( palette ) {
			_scope.palette = {};
			for ( var key in palette ) {
				var color = ASJS.Color.hexToRgb( key );
				_scope.palette[ color.hex ] = ASJS.Color.hexToRgb( palette[ key ] );
			}
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
			var m = _scope.palette.length;
			while ( ( i += 4 ) < l ) {
				var originalColor = new ASJS.Color( d[ i ], d[ i + 1 ], d[ i + 2 ], d[ i + 3 ] );
				var hexValue = originalColor.hex;
				
				if ( _scope.palette[ hexValue ] ) {
					var selectedColor = _scope.palette[ hexValue ];
				
					d[ i ] = selectedColor.r;
					d[ i + 1 ] = selectedColor.g;
					d[ i + 2 ] = selectedColor.b;
					d[ i + 3 ] = selectedColor.a;
				}
			}
			
			_scope.palette = {};
			
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


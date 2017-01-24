includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ThresholdBitmapFilter = function( threshold ) {
	return createClass( this, ASJS.AbstractBitmapFilter, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _threshold = threshold;
			
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
					var r = d[ i ];
					var g = d[ i + 1 ];
					var b = d[ i + 2 ];
					var v = ( 0.2126 * r + 0.7152 * g + 0.0722 * b >= _threshold ) ? 255 : 0;
					d[ i ] = d[ i + 1 ] = d[ i + 2 ] = v;
				}
				return pixels;
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
}
// public static const

// public static variable

// public static property

// public static function


includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.BrightnessBitmapFilter = function( adjustment ) {
	return createClass( this, ASJS.AbstractBitmapFilter, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _adjustment = adjustment;
			
			// constructor
			_scope.construct = function() {}
			
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
					d[ i ] += _adjustment;
					d[ i + 1 ] += _adjustment;
					d[ i + 2 ] += _adjustment;
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


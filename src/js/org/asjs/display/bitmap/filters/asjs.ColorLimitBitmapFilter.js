includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ColorLimitBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
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
				d[ i ] = Math.round( d[ i ] / _scope.threshold ) * _scope.threshold;
				d[ i + 1 ] = Math.round( d[ i + 1 ] / _scope.threshold ) * _scope.threshold;
				d[ i + 2 ] = Math.round( d[ i + 2 ] / _scope.threshold ) * _scope.threshold;
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

// public static variable

// public static property

// public static function


includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.ContrastBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( adjustment ) {
			_scope.adjustment = adjustment;
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
				d[ i ]     = 128 - ( ( 128 - d[ i ] ) * _scope.adjustment );
				d[ i + 1 ] = 128 - ( ( 128 - d[ i + 1 ] ) * _scope.adjustment );
				d[ i + 2 ] = 128 - ( ( 128 - d[ i + 2 ] ) * _scope.adjustment );
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


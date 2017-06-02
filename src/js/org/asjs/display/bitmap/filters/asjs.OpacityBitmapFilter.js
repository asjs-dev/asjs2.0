includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.OpacityBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		_scope.adjustment;
		
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
				d[ i + 3 ] *= _scope.adjustment;
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


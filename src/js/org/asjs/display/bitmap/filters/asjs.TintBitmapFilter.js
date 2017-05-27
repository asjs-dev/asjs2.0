includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );

ASJS.TintBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _r;
		var _g;
		var _b;
		var _a;
		
		// constructor
		_scope.new = function( r, g, b, a ) {
			_r = r || 0;
			_g = g || 0;
			_b = b || 0;
			_a = a || 0;
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
				d[ i ] += _r;
				d[ i + 1 ] += _g;
				d[ i + 2 ] += _b;
				d[ i + 3 ] += _a;
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


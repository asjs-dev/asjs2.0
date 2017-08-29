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
			_scope.palette = [];
			for ( var key in palette ) {
				_scope.palette.push( [ ASJS.Color.hexToRgb( key ), ASJS.Color.hexToRgb( palette[ key ] ) ] );
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
				var r = d[ i ];
				var g = d[ i + 1 ];
				var b = d[ i + 2 ];
				
				var selectedColor = new ASJS.Color( r, g, b );
				
				var j = -1;
				while ( ++j < m ) {
					var colorA = _scope.palette[ j ][ 0 ];
					var colorB = _scope.palette[ j ][ 1 ];
					if ( r == colorA.r && g == colorA.g && b == colorA.b ) {
						selectedColor = colorB;
						j = m;
						break;
					}
				}
				
				d[ i ] = selectedColor.r;
				d[ i + 1 ] = selectedColor.g;
				d[ i + 2 ] = selectedColor.b;
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


includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );
includeOnce( "org/asjs/display/bitmap/utils/asjs.Color.js" );

ASJS.PaletteLimitBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( palette ) {
			_scope.palette = [];
			if ( palette.length <= 0 ) return;
			
			var i = -1;
			var l = palette.length;
			while ( ++i < l ) {
				_scope.palette.push( ASJS.Color.hexToRgb( palette[ i ] ) );
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
			var pColor;
			var selectedColor;
			var i = -4;
			var l = d.length;
			var m = _scope.palette.length;
			while ( ( i += 4 ) < l ) {
				var nColor = new ASJS.Color( d[ i ], d[ i + 1 ], d[ i + 2 ], d[ i + 3 ] );
				
				if ( typeof pColor == "undefined" || 
					ASJS.Color.twoColorDistance( nColor, pColor ) != 0 ) {
					
					var minDist = 768;
					
					selectedColor = _scope.palette[ 0 ];
				
					var j = -1;
					while ( ++j < m ) {
						var color = _scope.palette[ j ];
						var dist = ASJS.Color.twoColorDistance( nColor, color );
						if ( dist < minDist ) {
							minDist = dist;
							selectedColor = color;
						}
					}
				}
				pColor = nColor;
				
				d[ i ] = selectedColor.r;
				d[ i + 1 ] = selectedColor.g;
				d[ i + 2 ] = selectedColor.b;
				d[ i + 3 ] = selectedColor.a;
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


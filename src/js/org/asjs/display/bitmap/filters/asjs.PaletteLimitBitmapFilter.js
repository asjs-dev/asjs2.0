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
			var i = -4;
			var l = d.length;
			var m = _scope.palette.length;
			while ( ( i += 4 ) < l ) {
				var r = d[ i ];
				var g = d[ i + 1 ];
				var b = d[ i + 2 ];
				
				var minDist = 768;
				var selectedColor = _scope.palette[ 0 ];
				
				var j = -1;
				while ( ++j < m ) {
					var color = _scope.palette[ j ];
					var dist = Math.abs( r - color.r ) + Math.abs( g - color.g ) + Math.abs( b - color.b );
					if ( dist < minDist ) {
						minDist = dist;
						selectedColor = _scope.palette[ j ];
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


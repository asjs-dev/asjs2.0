includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.BlurBitmapFilter = createClass( ASJS.AbstractConvoluteBitmapFilter, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( opaque, value ) {
			_scope.value = value;
		}
		
		// public property
		
		// protected property
		prop( _protected, "matrix", {
			get: function() {
				var value = 1 / Math.pow( _scope.value, 2 );
				var matrix = [];
				var i = -1;
				while ( ++i < _scope.value ) {
					var j = -1;
					while ( ++j < _scope.value ) {
						matrix.push( value );
					}
				}
				return matrix;
			}
		});
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		
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


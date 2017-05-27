includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.BlurBitmapFilter = createClass( ASJS.AbstractConvoluteBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _blurValue;
		
		// constructor
		_scope.new = function( opaque, value ) {
			_blurValue = Math.max( 1, value || 1 );
		}
		
		// public property
		
		// protected property
		prop( _scope, "_matrix", {
			get: function() {
				var value = 1 / Math.pow( _blurValue, 2 );
				var matrix = [];
				var i = -1;
				while ( ++i < _blurValue ) {
					var j = -1;
					while ( ++j < _blurValue ) {
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


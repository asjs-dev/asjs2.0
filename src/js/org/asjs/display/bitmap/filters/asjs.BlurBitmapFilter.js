includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.BlurBitmapFilter = createClass( ASJS.AbstractConvoluteBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _value;
		
		// constructor
		_scope.new = function( opaque, value ) {
			_scope.value = value;
		}
		
		// public property
		prop( _scope, "value", {
			get: function() { return _value; },
			set: function( v ) { _value = Math.max( 1, v || 1 ); }
		});
		
		// protected property
		prop( _scope, "_matrix", {
			get: function() {
				var value = 1 / Math.pow( _value, 2 );
				var matrix = [];
				var i = -1;
				while ( ++i < _value ) {
					var j = -1;
					while ( ++j < _value ) {
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


includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.SharpenBitmapFilter = function( opaque ) {
	return createClass( this, ASJS.AbstractConvoluteBitmapFilter, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			
			// public property
			
			// protected property
			prop( _scope, "_matrix", {
				get: function() {
					return [
						0, -1, 0,
						-1, 5, -1,
						0, -1, 0
					];
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
}
// public static const

// public static variable

// public static property

// public static function


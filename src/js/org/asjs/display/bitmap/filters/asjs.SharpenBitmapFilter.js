includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractConvoluteBitmapFilter.js" );

ASJS.SharpenBitmapFilter = createClass( ASJS.AbstractConvoluteBitmapFilter, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		
		// protected property
		prop( _protected, "matrix", {
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
// public static const

// public static variable

// public static property

// public static function


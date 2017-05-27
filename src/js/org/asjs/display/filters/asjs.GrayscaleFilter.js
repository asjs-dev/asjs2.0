includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.GrayscaleFilter = createClass( ASJS.AbstractFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _value;
		
		// constructor
		_scope.new = function( value ) {
			_value = value;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			return "grayscale(" + _value + "%)";
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


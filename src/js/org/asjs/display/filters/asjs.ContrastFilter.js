includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.ContrastFilter = createClass( ASJS.AbstractFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		_scope.value = 0;
		
		// constructor
		_scope.new = function( value ) {
			_scope.value = value;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			return "contrast(" + _scope.value + "%)";
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


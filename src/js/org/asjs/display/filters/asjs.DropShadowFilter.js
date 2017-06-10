includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.DropShadowFilter = createClass( ASJS.AbstractFilter, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( h, v, blur, spread, color ) {
			_scope.h      = h || 0;
			_scope.v      = v || 0;
			_scope.blur   = blur || 0;
			_scope.spread = spread || 0;
			_scope.color  = color || "#000000";
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			return "drop-shadow(" + _scope.h + "px " + _scope.v + "px " + _scope.blur + "px " + _scope.spread + "px " + _scope.color + ")";
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


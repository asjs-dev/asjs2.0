includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.DropShadowFilter = createClass( ASJS.AbstractFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		_scope.h      = 0;
		_scope.v      = 0;
		_scope.blur   = 0;
		_scope.spread = 0;
		_scope.color  = "#000000";
		
		// constructor
		_scope.new = function( h, v, blur, spread, color ) {
			_scope.h      = h;
			_scope.v      = v;
			_scope.blur   = blur;
			_scope.spread = spread;
			_scope.color  = color;
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


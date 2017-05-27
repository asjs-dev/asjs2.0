includeOnce( "org/asjs/display/filters/asjs.AbstractFilter.js" );

ASJS.DropShadowFilter = createClass( ASJS.AbstractFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _h;
		var _v;
		var _blur;
		var _spread;
		var _color;
		
		// constructor
		_scope.new = function( h, v, blur, spread, color ) {
			var _h = h;
			var _v = v;
			var _blur = blur;
			var _spread = spread;
			var _color = color;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			return "drop-shadow(" + _h + "px " + _v + "px " + _blur + "px " + _spread + "px " + _color + ")";
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


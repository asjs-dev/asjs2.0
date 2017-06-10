includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.FormElement = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			_scope.tabIndex = "auto";
		}
		
		// public property
		prop( _scope, "name", {
			get: function() { return _scope.getAttr( "name" ); },
			set: function( v ) { _scope.setAttr( "name", v ); }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {};
		
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


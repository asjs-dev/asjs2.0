includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.FormElement = function( tag ) {
	return createClass( this, ASJS.Sprite, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.construct = function() {
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
			_scope.drawNow = function() {};
			
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


includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Form = function() {
	return createClass( this, ASJS.Sprite, [ "<form />" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			
			// public property
			prop( _scope, "action", {
				get: function() { return _scope.getAttr( "action" ); },
				set: function( v ) { _scope.setAttr( "action", v ); }
			});
	
			prop( _scope, "method", {
				get: function() { return _scope.getAttr( "method" ); },
				set: function( v ) { _scope.setAttr( "method", v ); }
			});
	
			prop( _scope, "enctype", {
				get: function() { return _scope.getAttr( "enctype" ); },
				set: function( v ) { _scope.setAttr( "enctype", v ); }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.reset = function() {
				_scope.el.reset();
			}
	
			_scope.submit = function() {
				_scope.el.submit();
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
};
// public static const
cnst( ASJS.Form, "ENCTYPE_MULTIPART", "multipart/form-data" );

// public static variable

// public static property

// public static function


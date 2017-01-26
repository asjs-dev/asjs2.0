includeOnce( "org/asjs/display/form/asjs.AbstractTextElement.js" );

ASJS.TextInput = function() {
	return createClass( this, ASJS.AbstractTextElement, [ "input" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.new = function() {
				_scope.type = ASJS.TextInput.TYPE_TEXT;
			}
			
			// public property
			prop( _scope, "type", {
				get: function() { return _scope.getAttr( "type" ); },
				set: function( v ) { _scope.setAttr( "type", v ); }
			});
			
			// protected property
			
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
cnst( ASJS.TextInput, "TYPE_TEXT",     "text" );
cnst( ASJS.TextInput, "TYPE_PASSWORD", "password" );
cnst( ASJS.TextInput, "TYPE_EMAIL",    "email" );
cnst( ASJS.TextInput, "TYPE_NUMBER",   "number" );

// public static variable

// public static property

// public static function


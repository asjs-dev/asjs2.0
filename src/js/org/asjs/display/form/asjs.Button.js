includeOnce( "org/asjs/display/form/asjs.FormElement.js" );

ASJS.Button = createClass( ASJS.FormElement, [ "input" ], 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			_scope.setAttr( "type", "button" );
		}
		
		// public property
		prop( _scope, "label", {
			get: function() { return _scope.getAttr( "value" ); },
			set: function( v ) { _scope.setAttr( "value", v ); }
		});

		prop( _scope, "submit", {
			get: function() { return _scope.getAttr( "type" ) == "submit"; },
			set: function( v ) { _scope.setAttr( "type", v ? "submit" : "button" ); }
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
// public static const

// public static variable

// public static property

// public static function


includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Label = createClass( ASJS.DisplayObject, [ "label" ], 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		prop( _scope, "for", {
			get: function() { return _scope.getAttr( "for" ); },
			set: function( v ) { if ( v && v.id ) _scope.setAttr( "for", v.id ); }
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


includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.PrimitiveDisplayObject = function( tag ) {
	return createClass( this, ASJS.EventDispatcher, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.construct = function() {}
			
			// public property
			prop( _scope, "text", {
				get: function() { return _scope.jQuery.text(); },
				set: function( v ) { _scope.jQuery.text( v ); }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.getAttr = function( k ) {
				return _scope.jQuery.attr( k );
			};
	
			_scope.setAttr = function( k, v ) {
				_scope.jQuery.attr( k, v );
			};
	
			_scope.removeAttr = function( k ) {
				_scope.jQuery.removeAttr( k );
			};
			
			// protected read only function
			
			// protected function
			_scope._sendParentChangeEvent = function() {};
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


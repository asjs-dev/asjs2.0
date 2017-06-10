includeOnce( "org/asjs/display/asjs.Tag.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/utils/asjs.CSS.js" );

ASJS.PrimitiveDisplayObject = createClass( ASJS.Tag, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			_scope.id = "instance_" + ( ++ASJS.PrimitiveDisplayObject.instanceId );
		}
		
		// public property
		prop( _scope, "id", {
			get: function() { return _scope.getAttr( "id" ); },
			set: function( v ) { _scope.setAttr( "id", v ); }
		});

		prop( _scope, "enabled", {
			get: function() { return _scope.getAttr( "disabled" ) != "disabled"; },
			set: function( v ) {
				if ( v ) {
					_scope.removeAttr( "disabled" );
					_scope.setCSS( "pointer-events", "auto" );
				} else {
					_scope.setAttr( "disabled", "disabled" );
					_scope.setCSS( "pointer-events", "none" );
				}
			}
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.getCSS = function( k ) {
			return ASJS.CSS.getCSS( _scope, k );
		}

		_scope.setCSS = function( k, v ) {
			ASJS.CSS.setCSS( _scope, k, v );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable
ASJS.PrimitiveDisplayObject.instanceId = -1;

// public static property

// public static function


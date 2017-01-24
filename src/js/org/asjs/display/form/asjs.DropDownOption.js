includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );

ASJS.DropDownOption = function( value, label, disabled, selected ) {	
	return createClass( this, ASJS.PrimitiveDisplayObject, [ "<option />" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.new = function() {
				_scope.value = value || 0;
				_scope.label = label || "";
				_scope.disabled = disabled || false;
				_scope.selected = selected || false;
			}
			
			// public property
			prop( _scope, "value", {
				get: function() { return _scope.getAttr( "value" ); },
				set: function( v ) { _scope.setAttr( "value", v ); }
			});
	
			prop( _scope, "label", {
				get: function() { return _scope.text; },
				set: function( v ) { _scope.text = v; }
			});
	
			prop( _scope, "selected", {
				get: function() { return _scope.getAttr( "selected" ); },
				set: function( v ) {
					if ( v ) _scope.setAttr( "selected", "selected" );
					else _scope.removeAttr( "selected" );
				}
			});
	
			prop( _scope, "disabled", {
				get: function() { return _scope.getAttr( "disabled" ); },
				set: function( v ) {
					if ( v ) _scope.setAttr( "disabled", "disabled" );
					else _scope.removeAttr( "disabled" );
				}
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

// public static variable

// public static property

// public static function


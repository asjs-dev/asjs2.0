includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.RadioButton = function() {
	return createClass( this, ASJS.FormElement, [ "label" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _radio = new ASJS.DisplayObject( "input" );
			var _label = new ASJS.DisplayObject();
			
			// constructor
			_scope.new = function() {
				_radio.setAttr( "type", "radio" );
				_radio.visible = false;
				_scope.addChild( _radio );
		
				_label.setSize( "100%", "100%" );
				_label.enabled = false;
				_scope.addChild( _label );
			}
			
			// public property
			prop( _scope, "radio", {
				get: function() { return _radio; }
			});
	
			prop( _scope, "enabled", {
				set: function( v ) {
					_super.enabled = _radio.enabled = v;
					_scope.render();
				}
			});
	
			prop( _scope, "name", {
				get: function() { return _radio.getAttr( "name" ); },
				set: function( v ) { _radio.setAttr( "name", v ); }
			});
	
			prop( _scope, "checked", {
				get: function() { return _radio.el.checked; },
				set: function( v ) {
					_radio.el.checked = v;
					if ( v ) _radio.el.change();
				}
			});
	
			prop( _scope, "val", {
				get: function() { return _radio.value; },
				set: function( v ) { _radio.value = v; }
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
}
// public static const

// public static variable

// public static property

// public static function


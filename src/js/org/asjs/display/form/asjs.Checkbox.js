includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.Checkbox = createClass( ASJS.FormElement, [ "label" ], 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _checkbox = new ASJS.DisplayObject( "input" );
		var _label = new ASJS.DisplayObject();
		
		// constructor
		_scope.new = function() {
			_checkbox.setAttr( "type", "checkbox" );
			_checkbox.visible = false;
			_scope.addChild( _checkbox );
	
			_label.setSize( "100%", "100%" );
			_label.enabled = false;
			_scope.addChild( _label );
		}
		
		// public property
		prop( _scope, "label", {
			get: function() { return _label; }
		});

		prop( _scope, "checkbox", {
			get: function() { return _checkbox; }
		});
		
		prop( _scope, "enabled", {
			set: function( v ) {
				_super.enabled = _checkbox.enabled = v;
				_scope.render();
			}
		});

		prop( _scope, "name", {
			get: function() { return _checkbox.getAttr( "name" ); },
			set: function( v ) { _checkbox.setAttr( "name", v ); }
		});

		prop( _scope, "checked", {
			get: function() { return _checkbox.el.checked; },
			set: function( v ) {
				_checkbox.el.checked = v;
				_checkbox.el.change();
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
// public static const

// public static variable

// public static property

// public static function


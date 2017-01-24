includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/form/asjs.DropDownOption.js" );

ASJS.DropDown = function() {
	return createClass( this, ASJS.FormElement, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _select = new ASJS.Sprite( "<select />" );
			
			// constructor
			_scope.new = function() {
				_scope.setCSS( "overflow", "hidden" );
				_scope.addChild( _select );
			}
			
			// public property
			prop( _scope, "select", {
				get: function() { return _select; }
			});
			
			prop( _scope, "enabled", {
				set: function( v ) {
					_super.enabled = _select.enabled = v;
					_scope.drawNow();
				}
			});
	
			prop( _scope, "name", {
				get: function() { return _select.getAttr( "name" ); },
				set: function( v ) { _select.setAttr( "name", v ); }
			});
	
			prop( _scope, "val", {
				get: function() { return _select.jQuery.val(); },
				set: function( v ) { _select.jQuery.val( v ); }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.clearOptions = function() {
				_select.html = "";
			}
	
			_scope.setOptions = function( options ) {
				_scope.clearOptions();
				var i = -1;
				var l = options.length;
				while ( ++i < l ) _scope.addOption( options[ i ] );
			}
	
			_scope.addOption = function( option ) {
				_select.addChild( option );
			}
	
			_scope.drawNow = function() {
				_select.setSize( _scope.width + 30, _scope.height );
			}
			
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


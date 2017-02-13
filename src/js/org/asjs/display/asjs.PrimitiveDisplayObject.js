includeOnce( "org/asjs/display/asjs.Tag.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/utils/asjs.CSS.js" );

ASJS.PrimitiveDisplayObject = function( tag ) {
	return createClass( this, ASJS.Tag, null, 
		function( _scope, _super ) {
			// private object
			var priv = {};
			
			// private const
			cnst( priv, "ADD_PIXEL_TYPES", [ "width", "height", "top", "left" ] );
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.new = function() {
				_scope.id = "intance_" + ( ++ASJS.PrimitiveDisplayObject.instanceId );
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
				var style = window.getComputedStyle( _scope.el );
				var v = style.getPropertyValue( k );
				return priv.ADD_PIXEL_TYPES.indexOf( k ) > -1 ? parseFloat( v ) : v;
			}
	
			_scope.setCSS = function( k, v ) {
				k = ASJS.CSS.replaceHyphen( k );
				_scope.el.style[ k ] = priv.ADD_PIXEL_TYPES.indexOf( k ) > -1 && typeof v == "number" ? v + "px" : v;
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function getAbsoluteValue( v ) {
				return typeof v == "string" && v.indexOf( "%" ) > -1 && _scope.parent ? ( _scope.parent.width / 100 ) * parseFloat( v ) : v;
			}
		}
	);
};
// public static const

// public static variable
ASJS.PrimitiveDisplayObject.instanceId = -1;

// public static property

// public static function


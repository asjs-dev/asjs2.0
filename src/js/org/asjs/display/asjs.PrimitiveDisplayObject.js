includeOnce( "org/asjs/display/asjs.Tag.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

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
			var _eventHandlers = {};
			
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
				var v = _scope.el.style[ k ];
				return v.indexOf( "%" ) > -1 && _scope.parent ? ( _scope.parent.width / 100 ) * parseFloat( v ) : v;
			}
	
			_scope.setCSS = function( k, v ) {
				_scope.el.style[ k ] = priv.ADD_PIXEL_TYPES.indexOf( k ) > -1 && typeof v == "number" ? v + "px" : v;
			}
			
			_scope.dispatchEvent = function( event, data, bubble ) {
				var e;
				if ( typeof event == "string" ) {
					e = new CustomEvent( event, {
						bubbles: bubble == undefined ? true : bubble, 
						cancelable: true, 
						detail: data
					});
				} else e = event;
				_scope.el.dispatchEvent( e );
			}
	
			_scope.addEventListener = function( type, callback, capture ) {
				var types = type.split( " " );
				while ( types.length > 0 ) {
					var t = types.shift();
					if ( t != "" ) {
						if ( _scope.hasEventListener( t, callback ) ) return;
						if ( !_eventHandlers[ t ] ) _eventHandlers[ t ] = [];
						_eventHandlers[ t ].push( callback );
						_scope.el.addEventListener( t, callback, capture );
					}
				}
			}
	
			_scope.removeEventListeners = function() {
				for ( var type in _eventHandlers ) {
					var handlers = _eventHandlers[ type ];
					while ( handlers.length > 0 ) _scope.removeEventListener( type, handlers[ 0 ] );
				}
			}
	
			_scope.removeEventListener = function( type, callback ) {
				var handlers = _eventHandlers[ type ];
				if ( !handlers ) return;
				if ( callback ) {
					var i = handlers.indexOf( callback );
					if ( i == -1 ) return;
					handlers.splice( i, 1 );
					_scope.el.removeEventListener( type, callback );
				} else {
					while ( handlers.length > 0 ) _scope.removeEventListener( type, handlers[ 0 ] );
				}
				if ( handlers.length == 0 ) {
					_eventHandlers[ type ] = null;
					delete _eventHandlers[ type ];
				}
			}
	
			_scope.hasEventListener = function( type, callback ) {
				var handlers = _eventHandlers[ type ];
				if ( !handlers ) return false;
				if ( !callback ) return true;
				return handlers.indexOf( callback ) > -1;
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable
ASJS.PrimitiveDisplayObject.instanceId = -1;

// public static property

// public static function


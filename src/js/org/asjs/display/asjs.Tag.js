includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.Tag = function( tag ) {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			var priv = {};
			
			// private const
			cnst( priv, "CREATED", "created" );
			
			// public variable
			
			// protected variable
			
			// private variable
			var _el = !tag || typeof tag == "string" ? document.createElement(tag || "div") : tag;
			var _parent = null;
			var _state = priv.CREATED;
			var _eventHandlers = {};
			
			// constructor
			
			// public property
			prop( _scope, "text", {
				get: function() { return _el.textContent || _el.innerText; },
				set: function( v ) {
					_el.textContent = v;
					_el.innerText = v;
				}
			});
	
			prop( _scope, "html", {
				get: function() { return _el.innerHTML; },
				set: function( v ) { _el.innerHTML = v; }
			});
			
			prop( _scope, "el", {
				get: function() { return _el; }
			});
			
			prop( _scope, "bounds", {
				get: function() { return new ASJS.Rectangle(); }
			});
	
			prop( _scope, "parent", {
				get: function() { return _parent; },
				set: function( v ) {
					if ( v == null || v.getChildIndex( _scope ) > -1 ) {
						_parent = v;
						_scope._sendParentChangeEvent();
					}
				}
			});
	
			prop( _scope, "stage", {
				get: function() { return _scope.parent ? _scope.parent.stage : null; }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.hasClass = function( v ) {
				if ( _el.classList ) return _el.classList.contains( v );
				return !!_el.className.match( new RegExp( '(\\s|^)' + v + '(\\s|$)' ) );
			}
			
			_scope.addClass = function( v ) {
				if ( !_scope.hasClass( v ) ) _el.className += " " + v;
			}
			
			_scope.removeClass = function( v ) {
				if ( _el.classList ) _el.classList.remove( v );
				else if ( _scope.hasClass( v ) ) _el.className = _el.className.replace( new RegExp( '(\\s|^)' + v + '(\\s|$)' ), ' ' );
			}
			
			_scope.getAttr = function( k ) {
				return _el.getAttribute( k );
			}
	
			_scope.setAttr = function( k, v ) {
				if ( _el.setAttribute ) _el.setAttribute( k, v );
			}
			
			_scope.removeAttr = function( k ) {
				_el.removeAttribute( k );
			}
			
			_scope.clear = function() {
				_scope.html = "";
				_scope.text = "";
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
			_scope._sendParentChangeEvent = function() {
				var state = _scope.stage ? ASJS.Stage.ADDED_TO_STAGE : ASJS.Stage.REMOVED_FROM_STAGE;
				if ( _state != priv.CREATED || state != ASJS.Stage.REMOVED_FROM_STAGE ) _scope.dispatchEvent( state, null, false );
				_state = state;
			}
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


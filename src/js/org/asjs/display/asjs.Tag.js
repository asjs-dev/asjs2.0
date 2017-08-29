includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/core/asjs.Polyfill.js" );

ASJS.Tag = createClass( ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "CREATED", "created" );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _polyfill = ASJS.Polyfill.instance();
		var _el;
		var _parent = null;
		var _state = priv.CREATED;
		var _eventHandlers = {};
		
		// constructor
		_scope.new = function( tag ) {
			_el = !tag || typeof tag == "string" ? document.createElement( tag || "div" ) : tag;
		}
		
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
					_scope.sendParentChangeEvent();
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
			var classList = _scope.getClassList();
			if ( classList ) return classList.contains( v );
			return !!_el.className.match( new RegExp( '(\\s|^)' + v + '(\\s|$)' ) );
		}
		
		_scope.addClass = function( v ) {
			if ( !_scope.hasClass( v ) ) _el.className += " " + v;
		}
		
		_scope.removeClass = function( v ) {
			var classList = _scope.getClassList();
			if ( classList ) classList.remove( v );
			else if ( _scope.hasClass( v ) ) _el.className = _el.className.replace( new RegExp( '(\\s|^)' + v + '(\\s|$)' ), ' ' );
		}
		
		_scope.getClassList = function( v ) {
			return _el.classList;
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
			try {
				_scope.el.dispatchEvent( ASJS.EventDispatcher.createEvent( event, data, bubble ) );
			} catch ( error ) {
				trace( error.message );
			}
		}

		_scope.addEventListener = function( type, callback, capture ) {
			var types = type.split( " " );
			while ( types.length > 0 ) {
				var t = _polyfill.convertEventType( types.shift() );
				if ( t != "" ) {
					if ( _scope.hasEventListener( t, callback ) ) return;
					if ( !_eventHandlers[ t ] ) _eventHandlers[ t ] = [];
					_eventHandlers[ t ].push( callback );
					_scope.el.addEventListener( t, callback, capture || false );
				}
			}
		}

		_scope.removeEventListeners = function() {
			for ( var type in _eventHandlers ) {
				var t = _polyfill.convertEventType( type );
				var handlers = _eventHandlers[ t ];
				while ( handlers && handlers.length > 0 ) _scope.removeEventListener( t, handlers[ 0 ] );
			}
		}

		_scope.removeEventListener = function( type, callback ) {
			var t = _polyfill.convertEventType( type );
			var handlers = _eventHandlers[ t ];
			if ( !handlers ) return;
			if ( callback ) {
				var i = handlers.indexOf( callback );
				if ( i == -1 ) return;
				handlers.splice( i, 1 );
				_scope.el.removeEventListener( t, callback );
			} else {
				while ( handlers.length > 0 ) _scope.removeEventListener( t, handlers[ 0 ] );
			}
			if ( handlers.length == 0 ) {
				_eventHandlers[ t ] = null;
				delete _eventHandlers[ t ];
			}
		}

		_scope.hasEventListener = function( type, callback ) {
			var t = _polyfill.convertEventType( type );
			var handlers = _eventHandlers[ t ];
			if ( !handlers ) return false;
			if ( !callback ) return true;
			return handlers.indexOf( callback ) > -1;
		}
		
		_scope.sendParentChangeEvent = function() {
			var state = _scope.stage ? ASJS.Stage.ADDED_TO_STAGE : ASJS.Stage.REMOVED_FROM_STAGE;
			if ( _state != priv.CREATED || state != ASJS.Stage.REMOVED_FROM_STAGE ) _scope.dispatchEvent( state, null, false );
			_state = state;
		}
		
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


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


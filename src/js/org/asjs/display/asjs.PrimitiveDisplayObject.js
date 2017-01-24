includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.PrimitiveDisplayObject = function( tag ) {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			var priv = {};
			
			// private const
			cnst( priv, "CREATED", "created" );
			
			// public variable
			_scope.jQuery = $( tag || "<div />" );
			
			// protected variable
			
			// private variable
			var _parent = null;
			var _state = priv.CREATED;
			
			// constructor
			_scope.new = function() {
				_scope.id = "intance_" + ( ++ASJS.PrimitiveDisplayObject.instanceId );
			}
			
			// public property
			prop( _scope, "text", {
				get: function() { return _scope.jQuery.text(); },
				set: function( v ) { _scope.jQuery.text( v ); }
			});
	
			prop( _scope, "html", {
				get: function() { return _scope.jQuery.html(); },
				set: function( v ) { _scope.jQuery.html( v ); }
			});
			
			prop( _scope, "el", {
				get: function() { return _scope.jQuery[ 0 ]; }
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
			_scope.addClass = function( v ) {
				return _scope.jQuery.addClass( v );
			};
	
			_scope.removeClass = function( v ) {
				_scope.jQuery.removeClass( v );
			};
			
			_scope.getAttr = function( k ) {
				return _scope.jQuery.attr( k );
			};
	
			_scope.setAttr = function( k, v ) {
				_scope.jQuery.attr( k, v );
			};
			
			_scope.removeAttr = function( k ) {
				_scope.jQuery.removeAttr( k );
			};
			
			_scope.getCSS = function( k ) {
				return _scope.jQuery.css( k );
			};
	
			_scope.setCSS = function( k, v ) {
				_scope.jQuery.css( k, v );
			};
			
			_scope.dispatchEvent = function( type, data, bubble ) {
				var eb = bubble == undefined ? true : bubble;
				if ( eb ) _scope.jQuery.trigger( type, data );
				else _scope.jQuery.triggerHandler( type, data );
			};
	
			_scope.addEventListener = function( type, callback ) {
				if ( type == ASJS.MouseEvent.SCROLL && _scope.jQuery == new ASJS.Window().jQuery ) _scope.jQuery.scroll( callback );
				else _scope.jQuery.on( type, callback );
			};
	
			_scope.removeEventListeners = function() {
				_scope.jQuery.off();
			};
	
			_scope.removeEventListener = function( type, callback ) {
				_scope.jQuery.off( type, null, callback );
			};
	
			_scope.hasEventListener = function( which, handler ) {
				var events = $._data( _scope.el, "events" );
				if ( events == undefined ) return false;
				var w = which.indexOf( " " ) > -1 ? which.split( " " ) : [ which ];
				var i = -1;
				var l = w.length;
				while ( ++i < l ) {
					var event = events[ w[ i ] ];
					if ( event != undefined ) {
						var j = -1;
						var k = event.length;
						while ( ++j < k ) {
							if ( event[ j ].handler == handler ) return true;
						}
					}
				}
				return false;
			};
			
			_scope.clear = function() {
				_scope.html = "";
				_scope.text = "";
			};
			
			// protected read only function
			
			// protected function
			_scope._sendParentChangeEvent = function() {
				var state = _scope.stage ? ASJS.Stage.ADDED_TO_STAGE : ASJS.Stage.REMOVED_FROM_STAGE;
				if ( _state != priv.CREATED || state != ASJS.Stage.REMOVED_FROM_STAGE ) _scope.dispatchEvent( state, null, false );
				_state = state;
			};
			
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


includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.EventDispatcher = function( tag ) {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			_scope.jQuery = $( tag || "<div />" );
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.construct = function() {}
			
			// public property
			prop( _scope, "el", {
				get: function() { return _scope.jQuery[ 0 ]; }
			});
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.dispatchEvent = function( type, data, bubble ) {
				var eventBubble = bubble == undefined ? true : bubble;
		
				if ( eventBubble ) _scope.jQuery.trigger( type, data );
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
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


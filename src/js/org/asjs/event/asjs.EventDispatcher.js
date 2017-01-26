ASJS.EventDispatcher = function() {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _handlers = {};
			
			// constructor
			
			// public property
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.dispatchEvent = function( event, data, bubble ) {
				var e;
				if ( typeof event == "string" ) {
					e = new CustomEvent( event, {
						bubbles: bubble == undefined ? true : bubble, 
						cancelable: true, 
						detail: data
					});
				} else e = event;
				var t = e.type || event;
				if ( !_scope.hasEventListener( t ) ) return;
				var handlers = _handlers[ t ];
				var i = -1;
				var l = handlers.length;
				while ( ++i < l ) handlers[ i ]( e );
			}
			
			_scope.addEventListener = function( type, handler ) {
				var types = type.split( " " );
				while ( types.length > 0 ) {
					var t = types.shift();
					if ( t != "" ) {
						if ( _scope.hasEventListener( t, handler ) ) return;
						if ( !_handlers[ t ] ) _handlers[ t ] = [];
						_handlers[ t ].push( handler );
					}
				}
			}
	
			_scope.removeEventListeners = function() {
				_handlers = {};
			};
	
			_scope.removeEventListener = function( type, handler ) {
				if ( !_scope.hasEventListener( type, handler ) ) return;
				_handlers[ type ].slice( _handlers[ type ].indexOf( handler ), 1 );
			};
	
			_scope.hasEventListener = function( type, handler ) {
				var handlers = _handlers[ type ];
				if ( handlers ) {
					if ( !handler ) return true;
					
					var i = -1;
					var l = handlers.length;
					while ( ++i < l ) {
						if ( handlers[ i ] == handler ) return true;
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


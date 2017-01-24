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
			_scope.dispatchEvent = function( type, data, bubble ) {
				var eb = bubble == undefined ? true : bubble;
				
				var ev = new $.Event( type, data, eb );
				
				if ( !_scope.hasEventListener( type ) ) return;
				var handlers = _handlers[ type ];
				var i = -1;
				var l = handlers.length;
				while ( ++i < l ) {
					handlers[ i ]( ev );
				}
			};
	
			_scope.addEventListener = function( type, handler ) {
				if ( _scope.hasEventListener( type, handler ) ) return;
				if ( !_handlers[ type ] ) _handlers[ type ] = [];
				_handlers[ type ].push( handler );
			};
	
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


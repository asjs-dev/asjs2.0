ASJS.NotificationHandler = {};
createSingletonClass( ASJS.NotificationHandler, ASJS.BaseClass, null, 
	function( _scope ) {
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
		_scope.register = function( dispatcher, handlers ) {
			if ( !dispatcher || !handlers ) return;
			var i = -1;
			var l = handlers.length;
			while ( ++i < l ) {
				var type = handlers[ i ];
				if ( _handlers[ type ] && _handlers[ type ].indexOf( dispatcher ) > -1 ) break;
				if ( !_handlers[ type ] ) _handlers[ type ] = [];
				_handlers[ type ].push( dispatcher );
			}
		}

		_scope.remove = function( dispatcher, handlers ) {
			if ( !dispatcher || !handlers ) return;
			var i = -1;
			var l = handlers.length;
			while ( ++i < l ) {
				var type = handlers[ i ];
				if ( _handlers[ type ] ) {
					var index = _handlers[ type ].indexOf( dispatcher );
					if ( index > -1 ) _handlers[ type ].splice( index, 1 );
				}
			}
		}

		_scope.sendNotification = function( type, data ) {
			if ( !_handlers[ type ] ) return;
			var i = -1;
			var l = _handlers[ type ].length;
			while ( ++i < l ) {
				if ( _handlers[ type ][ i ] ) {
					_handlers[ type ][ i ].reciveNotification( type, data );
				} else {
					_handlers[ type ].splice( i, 1 );
					l--;
				}
			}
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


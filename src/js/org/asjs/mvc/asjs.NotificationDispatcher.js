includeOnce( "org/asjs/mvc/asjs.NotificationHandler.js" );

ASJS.NotificationDispatcher = createClass( ASJS.BaseClass, null,
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers = [];
		
		// private variable
		var _nHandler = ASJS.NotificationHandler;
		
		// constructor
		_scope.new = function() {
			registerHandlers();
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.destruct = function() {
			removeHandlers();
		};

		_scope.sendNotification = function( type, data ) {
			_nHandler.sendNotification( type, data );
		}

		_scope.reciveNotification = function( type, data ) {}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function registerHandlers() {
			_nHandler.register( _scope, _protected.handlers );
		}

		function removeHandlers() {
			_nHandler.remove( _scope, _protected.handlers );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


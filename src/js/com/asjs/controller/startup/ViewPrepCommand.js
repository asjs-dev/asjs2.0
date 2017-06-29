includeOnce( "com/asjs/module/content/ContentMediator.js" );
includeOnce( "com/asjs/module/externalApplication/ExternalApplicationMediator.js" );
includeOnce( "com/asjs/module/notificationWindow/NotificationWindowMediator.js" );

var ViewPrepCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function( app ) {
			new ContentMediator( app );
			new ExternalApplicationMediator( app );
			new NotificationWindowMediator( app );
			
			_scope.sendNotification( ContentMediator.SHOW );
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


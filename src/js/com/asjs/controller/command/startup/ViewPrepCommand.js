includeOnce( "com/asjs/modul/content/mediator/ContentMediator.js" );
includeOnce( "com/asjs/modul/notificationWindow/mediator/NotificationWindowMediator.js" );
includeOnce( "com/asjs/model/Language.js" );

function ViewPrepCommand() {
	return createClass( this, ASJS.AbstractCommand, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _language = new Language();
			
			// constructor
			_scope.construct = function() {}
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.execute = function( app ) {
				new ContentMediator( app.contentView );
	
				var notificationWindowMediator = new NotificationWindowMediator( app.notificationWindowView );
					notificationWindowMediator.setDefault( _language.getText( 'notification_ok_button' ), _language.getText( 'notification_cancel_button' ) );
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
}
// public static const

// public static variable

// public static property

// public static function


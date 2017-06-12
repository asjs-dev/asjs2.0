includeOnce( "com/external/controller/startup/EConfigLoaderCommand.js" );
includeOnce( "com/external/controller/startup/ELanguageLoaderCommand.js" );
includeOnce( "com/external/controller/startup/EEnvironmentCommand.js" );
includeOnce( "com/external/controller/startup/EViewPrepCommand.js" );
includeOnce( "com/external/module/content/EContentMediator.js" );

var EStartupCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _app;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function( app ) {
			_app = app;
			loadConfig();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function loadConfig() {
			( new EConfigLoaderCommand() ).execute().done( loadLanguage );
		}

		function loadLanguage() {
			( new ELanguageLoaderCommand() ).execute().done( initApplication );
		}

		function initApplication() {
			( new EEnvironmentCommand() ).execute();
			( new EViewPrepCommand() ).execute( _app );
			
			_scope.sendNotification( EContentMediator.SHOW );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


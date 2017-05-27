includeOnce( "com/asjs/controller/command/startup/ConfigLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/LanguageLoaderCommand.js" );
includeOnce( "com/asjs/controller/command/startup/EnvironmentCommand.js" );
includeOnce( "com/asjs/controller/command/startup/ViewPrepCommand.js" );
includeOnce( "com/asjs/module/content/mediator/ContentMediator.js" );

var StartupCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope, _super ) {
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
			( new ConfigLoaderCommand() ).execute().resolve( loadLanguage );
		}

		function loadLanguage() {
			( new LanguageLoaderCommand() ).execute().resolve( initApplication );
		}

		function initApplication() {
			( new EnvironmentCommand() ).execute();
			( new ViewPrepCommand() ).execute( _app );
			
			_scope.sendNotification( ContentMediator.SHOW );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


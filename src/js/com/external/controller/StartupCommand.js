includeOnce( "com/external/controller/startup/EnvironmentCommand.js" );
includeOnce( "com/external/controller/startup/ViewPrepCommand.js" );
includeOnce( "com/asjs/controller/service/LoadJSONServiceCommand.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/Language.js" );

var StartupCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "JSON_PATH", "json/external/" );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _config = Config.instance();
		var _language = Language.instance();
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
		function loadJSON( url, callback ) {
			( new LoadJSONServiceCommand() ).execute( url ).done( callback );
		}
		
		function loadConfig() {
			loadJSON( priv.JSON_PATH + "config.json", function( response ) {
				_config.data = response;
				loadLanguage();
			});
		}

		function loadLanguage() {
			loadJSON( priv.JSON_PATH + "language.json", function( response ) {
				_language.data = response;
				initApplication();
			});
		}

		function initApplication() {
			( new EnvironmentCommand() ).execute();
			( new ViewPrepCommand() ).execute( _app );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


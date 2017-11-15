sourcePath( "./" );

includeOnce( "com/external/controller/StartupCommand.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );

var Application = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _config = Config;
		var _styleLoader = new ASJS.StyleLoader();
		var _languageLoaded = false;
		
		// constructor
		_scope.new = function() {
			trace( "<AS/JS> External Application {{version}}" );
			
			_styleLoader.addEventListener( ASJS.LoaderEvent.LOAD, onStyleLoaded );
			_styleLoader.load( "css/external/application.css" );
			
			_language.addEventListener( ASJS.AbstractModel.CHANGED, onLanguageChanged );
		}
		
		// public property
		
		prop( _scope, "title", {
			get: function() { return _language.getText( "title" ); }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.destruct = function() {
			_styleLoader.unload();
			_language.clear();
			_config.clear();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onStyleLoaded() {
			_styleLoader.useStyle();
			( new StartupCommand() ).execute( _scope );
		}
		
		function onLanguageChanged() {
			if ( _languageLoaded ) return;
			_languageLoaded = true;
			_scope.dispatchEvent( ASJS.LoaderEvent.LOAD );
		}
		
		// internal classes
	}
);
// public static const

// public static variable

// public static property

// public static function

// -------------------- //
ASJS.start( Application );

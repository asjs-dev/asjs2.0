sourcePath( "./" );

includeOnce( "com/external/controller/StartupCommand.js" );
includeOnce( "com/asjs/model/Language.js" );

var Application = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language.instance();
		var _contentView = new ASJS.Sprite();
		var _styleLoader = new ASJS.StyleLoader();
		var _languageLoaded = false;
		
		// constructor
		_scope.new = function() {
			trace( "<AS/JS> External Application" );
			
			_styleLoader.addEventListener( ASJS.LoaderEvent.LOAD, onStyleLoaded );
			_styleLoader.load( "css/external/application.css" );
			
			_language.addEventListener( ASJS.AbstractModel.CHANGED, onLanguageChanged );
			
			_scope.addChild( _scope.contentView );
		}
		
		// public property
		prop( _scope, "contentView", {
			get: function() { return _contentView; }
		});
		
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

includeOnce( "com/asjs/tools/Tools.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/Cookies.js" );

var EnvironmentCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window;
		var _language = Language;
		var _cookies = Cookies;
		var _cycler = ASJS.Cycler;
		var _config = Config;
		var _sleepToResizeId;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			setupLanguage();
			setupCycler();
			setupStage();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function setupLanguage() {
			function validateLanguage( sl ) {
				return sl == undefined || _language.supportedLanguages.indexOf( sl ) == -1;
			}
			var selectedLanguage = Tools.getURLParams( 'lang' );
			if ( validateLanguage( selectedLanguage ) ) selectedLanguage = _cookies.readCookie( 'language' );
			if ( validateLanguage( selectedLanguage ) ) selectedLanguage = ( navigator.language || navigator.userLanguage ).split( "-" )[ 0 ];
			if ( validateLanguage( selectedLanguage ) ) selectedLanguage = _language.selectedLanguage;
			_language.set( "selectedLanguage", selectedLanguage );

			_cookies.createCookie( 'language', _language.selectedLanguage );
			stage.title = _language.getText( "title" );
		}

		function setupCycler() {
			_cycler.fps = _config.get( "fps" );
			_cycler.start();
		}

		function setupStage() {
			stage.addEventListener( ASJS.Stage.RESIZE, onStageResize );
		}

		function onStageResize() {
			_sleepToResizeId = _window.clearTimeout( _sleepToResizeId );
			_sleepToResizeId = _window.setTimeout( onTimeout, _config.get( "resizeInterval" ) );
		}

		function onTimeout() {
			_sleepToResizeId = _window.clearTimeout( _sleepToResizeId );
			_scope.sendNotification( ASJS.Stage.RESIZE );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


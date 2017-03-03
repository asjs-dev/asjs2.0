includeOnce( "com/asjs/tools/Tools.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/Cookies.js" );

function EnvironmentCommand() {
	return createClass( this, ASJS.AbstractCommand, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _window = new ASJS.Window();
			var _language = new Language();
			var _cookies = new Cookies();
			var _cycler = new ASJS.Cycler();
			var _config = new Config();
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
				var selectedLanguage = Tools.getURLParams( 'lang' );
				if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _cookies.readCookie( 'language' );
				if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _language.selectedLanguage;
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
}
// public static const

// public static variable

// public static property

// public static function


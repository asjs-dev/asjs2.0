includeOnce( "com/asjs/tools/Tools.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Cookies.js" );

var EnvironmentCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _cookies = Cookies;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			setupLanguage();
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
			if ( validateLanguage( selectedLanguage ) ) selectedLanguage = _language.selectedLanguage;
			_language.set( "selectedLanguage", selectedLanguage );

			_cookies.createCookie( 'language', _language.selectedLanguage );
		}

	}
);
// public static const

// public static variable

// public static property

// public static function


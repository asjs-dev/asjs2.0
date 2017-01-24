function Language() {
	return createSingletonClass( Language, this, ASJS.AbstractModel, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _languageItems = {};
			var _supportedLanguages;
			var _selectedLanguage;
			
			// constructor
			
			// public property
			prop( _scope, "supportedLanguages", {
				get: function() { return _supportedLanguages; }
			});

			prop( _scope, "data", {
				set: function( v ) {
					_super.data = v.elements;
					_supportedLanguages = v.supported_languages;
					_selectedLanguage = v.default_language;
				}
			});

			prop( _scope, "selectedLanguage", {
				get: function() { return _selectedLanguage; },
				set: function( v ) { _selectedLanguage = v; }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.getText = function( k ) {
				var i = _scope.get( k );
				return i != null && i[ _scope.selectedLanguage ] != undefined ? i[ _scope.selectedLanguage ] : "";
			}

			_scope.genText = function( str ) {
				for ( var k in _scope.data ) str = str.split( "{{" + k + "}}" ).join( _scope.getText( k ) );
				return str;
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


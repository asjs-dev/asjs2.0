var Language = {};
createSingletonClass( Language, ASJS.AbstractModel, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		prop( _scope, "supportedLanguages", {
			get: function() { return _super.data.supportedLanguages; }
		});
		
		prop( _scope, "selectedLanguage", {
			get: function() { return _super.data.selectedLanguage; }
		});

		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.getText = function( k ) {
			var i = _scope.get( "elements" )[ k ];
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
// public static const

// public static variable

// public static property

// public static function


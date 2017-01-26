includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

function LanguageLoaderCommand() {
	return createClass( this, ASJS.AbstractCommand, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _language = new Language();
			var _dataProxy = new DataProxy();
			
			// constructor
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.execute = function() {
				var promise = _dataProxy.loadJSON( "json/language.json" );
					promise.resolve(function( response ) {
						_language.data = response;
					});
		
				return promise;
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


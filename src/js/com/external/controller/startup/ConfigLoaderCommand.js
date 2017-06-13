includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

var ConfigLoaderCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _config = Config.instance();
		var _dataProxy = DataProxy.instance();
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function() {
			var promise = _dataProxy.loadJSON( "json/external/config.json" );
				promise.done(function( response ) {
					_config.data = response;
				});
	
			return promise;
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


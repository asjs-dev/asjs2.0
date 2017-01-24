includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

function ConfigLoaderCommand() {
	return createClass( this, ASJS.AbstractCommand, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _config = new Config();
			var _dataProxy = new DataProxy();
			
			// constructor
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.execute = function() {
				var dfd = _dataProxy.loadJSON( "json/config.json" );
					dfd.done(function( response ) {
						_config.data = response;
					});
		
				return dfd;
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


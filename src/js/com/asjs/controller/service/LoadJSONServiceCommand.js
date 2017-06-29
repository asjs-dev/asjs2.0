var LoadJSONServiceCommand = createClass( ASJS.AbstractCommand, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function( url ) {
			var dfd = new ASJS.Promise();
	
			var loader = new ASJS.Loader();
				loader.responseType = "json";
				loader.method = ASJS.RequestMethod.GET;
				loader.addEventListener( ASJS.LoaderEvent.LOAD, function( e ) {
					dfd.resolve( loader.content );
					loader.unload();
				});
				loader.addEventListener( ASJS.LoaderEvent.ERROR, function( e ) {
					dfd.reject( loader.content );
					loader.unload();
				});
				loader.load( url );
	
			return dfd;
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


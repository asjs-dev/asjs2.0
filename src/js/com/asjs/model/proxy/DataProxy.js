includeOnce( "com/asjs/services/JSONLoader.js" );

function DataProxy() {
	return createSingletonClass( DataProxy, this, Object, null, 
		function( _scope, _super ) {
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
			_scope.loadJSON = function( url ) {
				var dfd = new $.Deferred();
		
				var loader = new JSONLoader();
					loader.method = ASJS.RequestMethod.GET;
					loader.addEventListener( ASJS.LoaderEvent.LOAD, function( e ) {
						dfd.resolve( loader.content );
					});
					loader.addEventListener( ASJS.LoaderEvent.ERROR, function( e ) {
						dfd.reject( loader.content );
					});
					loader.load( url );
		
				return dfd.promise();
			}
	
			_scope.loadAnimation = function( url ) {
				return ( new ASJS.AnimationLoader() ).load( url );
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


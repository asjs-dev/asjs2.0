function Task() {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.construct = function() {
				self.addEventListener( 'message', _scope._onMessage, false);
			}
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			
			// protected read only function
			
			// protected function
			_scope._onMessage = function( e ) {};
	
			_scope._postMessage = function( data ) {
				self.postMessage( data );
			};
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


var Task = createClass( ASJS.BaseClass, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			self.addEventListener( ASJS.WindowEvent.MESSAGE, _protected.onMessage, false);
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		
		// protected read only function
		
		// protected function
		_protected.onMessage = function( e ) {};

		_protected.postMessage = function( data ) {
			self.postMessage( data );
		};
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


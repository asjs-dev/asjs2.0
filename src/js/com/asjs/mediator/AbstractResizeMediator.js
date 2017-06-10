var AbstractResizeMediator = createClass( ASJS.AbstractMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers = [ ASJS.Stage.RESIZE ];
		
		// private variable
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.reciveNotification = function( type, data ) {
			switch ( type ) {
				case ASJS.Stage.RESIZE: _protected.onResize();
				break;
			}
		}
		
		// protected read only function
		
		// protected function
		_protected.onResize = function() {}
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


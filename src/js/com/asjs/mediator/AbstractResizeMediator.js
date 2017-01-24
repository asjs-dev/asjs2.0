function AbstractResizeMediator( view ) {
	return createClass( this, ASJS.AbstractMediator, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			_scope._handlers = [ ASJS.Stage.RESIZE ];
			
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
					case ASJS.Stage.RESIZE: _scope._onResize();
					break;
				}
			}
			
			// protected read only function
			
			// protected function
			_scope._onResize = function() {}
			
			// private read only function
			
			// private function
		}
	);
}
// public static const

// public static variable

// public static property

// public static function


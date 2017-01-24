includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationDescriptor = function( name, spriteSheet, size, frameDelay, sequenceList ) {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			_scope.name = name || "";
			_scope.spriteSheet = spriteSheet || "";
			_scope.size = size || new ASJS.Point();
			_scope.frameDelay = Math.floor( Math.max( 1, frameDelay || 1 ) );
			_scope.sequenceList = sequenceList || [];
			
			// protected variable
			
			// private variable
			
			// constructor
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			
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


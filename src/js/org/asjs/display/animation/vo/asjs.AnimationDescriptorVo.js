includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationDescriptorVo = createClass( Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		_scope.name;
		_scope.spriteSheet;
		_scope.size;
		_scope.frameDelay;
		_scope.repeat;
		_scope.sequenceList;
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( name, spriteSheet, size, frameDelay, repeat, sequenceList ) {
			_scope.name = name || "";
			_scope.spriteSheet = spriteSheet || "";
			_scope.size = size || new ASJS.Point();
			_scope.frameDelay = Math.floor( Math.max( 1, frameDelay || 1 ) );
			_scope.repeat = repeat || 0;
			_scope.sequenceList = sequenceList || [];
		}
		
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
// public static const

// public static variable

// public static property

// public static function


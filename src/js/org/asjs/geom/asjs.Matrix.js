ASJS.Matrix = createClass( ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( a, b, c, d, e, f ) {
			_scope.a = a || 1;
			_scope.b = b || 0;
			_scope.c = c || 0;
			_scope.d = d || 1;
			_scope.e = e || 0;
			_scope.f = f || 0;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.translate = function( tx, ty ) {
			_scope.e = tx;
			_scope.f = ty;
		}

		_scope.skew = function( sx, sy ) {
			_scope.b = sx;
			_scope.c = sy;
		}

		_scope.scale = function( sw, sh ) {
			_scope.a = sw;
			_scope.d = sh;
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


ASJS.Matrix = function( a, b, c, d, e, f ) {
	return createClass( this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			_scope.a = a || 1;
			_scope.b = b || 0;
			_scope.c = c || 0;
			_scope.d = d || 1;
			_scope.e = e || 0;
			_scope.f = f || 0;
			
			// protected variable
			
			// private variable
			
			// constructor
			
			// public property
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.translate = function( tx, ty ) {
				matrix.e = tx;
				matrix.f = ty;
			}
	
			_scope.skew = function( sx, sy ) {
				matrix.b = sx;
				matrix.c = sy;
			}
	
			_scope.scale = function( sw, sh ) {
				matrix.a = sw;
				matrix.d = sh;
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


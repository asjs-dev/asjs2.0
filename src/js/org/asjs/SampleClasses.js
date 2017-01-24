EmptyClass = function() {
	return createSingletonClass( EmptyClass, this, [Object | parentClass ], [null | [p1, p2, pn]], 
	// OR //
	return createClass( this, [Object | parentClass ], [null | [p1, p2, pn]], 
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
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			
			// internal classes
		}
	);
};
// public static const

// public static variable

// public static property

// public static function

// ---------------------------------------------------------------------- //
BaseClass = function() {
	return createSingletonClass( BaseClass, this, [Object | parentClass ], [null | [p1, p2, pn]], 
	// OR //
	return createClass( this, [Object | parentClass ], [null | [p1, p2, pn]], 
		function( _scope, _super ) {
			// private object
			var priv = {};
			
			// private const
			cnst( priv, "PRIVATE_CONST", 0 );
			
			// public variable
			_scope.publicVar = 0;
			
			// protected variable
			_scope._protectedVar = 0;
			
			// private variable
			var _privateVar;
			
			// constructor
			_scope.new = function() {
				trace( "new BaseClass()" );
			}
			
			// public property
			prop( _scope, "val", {
				get: function() { return _privateVar; },
				set: function( v ) { _privateVar = v; }
			});
			
			// protected property
			prop( _scope, "_val", {
				get: function() { return _privateVar; },
				set: function( v ) { _privateVar = v; }
			});
			
			// private property
			prop( priv, "val", {
				get: function() { return _privateVar; },
				set: function( v ) { _privateVar = v; }
			});
			
			// public read only function
			roFunc( _scope, "publicFunction", function() {});
			
			// public function
			_scope.publicFunction = function() {};
			
			// protected read only function
			roFunc( _scope, "_protectedFunction", function() {});
			
			// protected function
			_scope._protectedFunction = function() {};
			
			// private read only function
			roFunc( priv, "privateFunction", function() {});
			
			// private function
			function privateFunction() {};
			
			// internal classes
			var InternalClass = function() {
				return createSingletonClass( InternalClass, this, [Object | parentClass], [null | [p1, p2, pn]],
				// OR //
				return createClass( this, [Object | parentClass ], [null | [p1, p2, pn]],
					function( _scope, _super ) {
						_scope.new = function() {}
					}
				);
			};
		}
	);
};
// public static const
cnst( BaseClass, "PUBLIC_STATIC_CONST", 10 );

// public static variable
BaseClass.publicStaticVar = 0;

// public static property
prop( BaseClass, "val", {
	get: function() { return BaseClass.publicStaticVar; },
	set: function( v ) { BaseClass.publicStaticVar = v; }
});

// public static function
roFunc( BaseClass, "publicStaticFunction", function( param ) {});

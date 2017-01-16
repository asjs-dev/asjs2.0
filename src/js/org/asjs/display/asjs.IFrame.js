includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.IFrame = function() {
	return createClass( this, ASJS.DisplayObject, [ "<iframe />" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.construct = function() {}
			
			// public property
			prop( _scope, "src", {
				get: function() { return _scope.getAttr( "src" ); },
				set: function( v ) { _scope.setAttr( "src", v ); }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.isLoaded = function() {
				return _scope.el.contentDocument.title.indexOf( "404" ) == -1;
			}
			
			_scope.sendMessage = function( data ) {
				_scope.el.contentWindow.postMessage( data, "*" );
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


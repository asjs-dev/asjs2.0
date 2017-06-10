includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/window/asjs.Head.js" );
includeOnce( "org/asjs/display/asjs.Tag.js" );

/*
	How to use:
	// external script (js/test.js)
	(function() {
		var Application = createClass( ASJS.BaseClass, null,
			function( _scope, _super ) {
				_scope.new = function() {
					trace( "Create external script" );
				}
			
				_scope.sayHello = function() {
					trace( "Hello!" );
				}
			}
		);
		ASJS.start( Application );
	})();
	
	// loader
	var scriptLoader = new ASJS.ScriptLoader();
		scriptLoader.addEventListener( ASJS.LoaderEvent.LOAD, function( e ) {
			var s = new scriptLoader.content();
				s.sayHello();
		});
		scriptLoader.load( "js/test.js" );
*/

ASJS.ScriptLoader = createClass( ASJS.Loader, null,
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _head = ASJS.Head.instance();
		var _content;
		
		// constructor
		
		// public property
		prop( _scope, "content", {
			get: function() {
				if ( !_content && _super.content != "" ) {
					_content = getScript();
					_scope.free();
				}
				return _content;
			}
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.unload = function() {
			_content = null;
			_super.unload();
		}
		
		_scope.load = function( url ) {
			_scope.unload();
			_super.load( url );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function preparateScript() {
			var h = _super.content.split( "ASJS.start(" );
			var preparated = h.shift() + "return ";
				h = h.shift().split( ");" );
				preparated += h.shift() + ";" + h.join( ");" );
			return preparated;
		}
		
		function getScript() {
			try {
				return Function( "return " + preparateScript() )();
			} catch ( e ) {
				trace( "The external script must be wrapped" );
			}
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


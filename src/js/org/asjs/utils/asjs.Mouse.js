includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Mouse = {};
createSingletonClass( ASJS.Mouse, Object, null, 
	function( _scope, _super ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "EVENT", ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window   = ASJS.Window.instance();
		var _mousePos = new ASJS.Point();
		
		// constructor
		
		// public property
		prop( _scope, "mouseX", {
			get: function() { return _mousePos.x; }
		});

		prop( _scope, "mouseY", {
			get: function() { return _mousePos.y; }
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.show = function() {
			stage.setCSS( "cursor", "default" );
		};

		_scope.hide = function() {
			stage.setCSS( "cursor", "none" );
		};

		_scope.getRelativePosition = function( target ) {
			return target.globalToLocal( _mousePos );
		};

		_scope.init = function() {
			if ( _window ) _window.addEventListener( priv.EVENT, onMouseMove );
		};

		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onMouseMove( e ) {
			var x = 0;
			var y = 0;
			var iosTouchEvent = e.touches;
			var androidTouchEvent = ( e.originalEvent ? e.originalEvent.touches : null );
			var touches = iosTouchEvent || androidTouchEvent;
			var touch = e;
			if ( touches && touches.length > 0 ) touch = touches[ 0 ];
			_mousePos.x = touch.pageX;
			_mousePos.y = touch.pageY;
		};

	}
);
// public static const

// public static variable

// public static property

// public static function


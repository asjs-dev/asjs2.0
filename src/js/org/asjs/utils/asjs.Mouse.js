includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Mouse = function() {
	return createSingletonClass( ASJS.Mouse, this, Object, null, 
		function( _scope, _super ) {
			// private object
			var priv = {};
			
			// private const
			cnst( priv, "EVENT", ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE );
			
			// public variable
			
			// protected variable
			
			// private variable
			var _window   = new ASJS.Window();
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
				if ( stage ) _window.addEventListener( priv.EVENT, onMouseMove );
			};
	
			_scope.getTouchPointByEvent = function( e ) {
				var iosTouchEvent = e.touches;
				var androidTouchEvent = ( e.originalEvent ? e.originalEvent.touches : null );
				var touches = iosTouchEvent || androidTouchEvent;
				if ( touches && touches.length > 0 ) {
					var touch = touches[ 0 ];
					return new ASJS.Point( touch.pageX, touch.pageY );
				}
				return new ASJS.Point( e.pageX, e.pageY );
			};
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function onMouseMove( e ) {
				_mousePos = _scope.getTouchPointByEvent( e );
			};

		}
	);
}
// public static const

// public static variable

// public static property

// public static function


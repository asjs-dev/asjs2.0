includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/geom/asjs.GeomUtils.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.DisplayObject = function( tag ) {
	return createClass( this, ASJS.PrimitiveDisplayObject, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _mouse = new ASJS.Mouse();
			var _filters = [];
			var _rotation = 0;
			var _scaleX = 1;
			var _scaleY = 1;
			var _cssDisplay = "block";
			
			// constructor
			_scope.new = function() {
				_scope.tabindex = -1;
				_scope.setCSS( "pointer-events", "auto" );
				_scope.setCSS( "position", "absolute" );
				_scope.setCSS( "display", _cssDisplay );
				_scope.setSize( 0, 0 );
				_scope.move( 0, 0 );
			}
			
			// public property
			prop( _scope, "bounds", {
				get: function() { return new ASJS.Rectangle( _scope.calcX, _scope.calcY, _scope.calcWidth, _scope.calcHeight ); }
			});
	
			prop( _scope, "calcX", {
				get: function() { return _scope.x + ( parseFloat( _scope.getCSS( "marginLeft" ) ) || 0 ); }
			});
	
			prop( _scope, "calcY", {
				get: function() { return _scope.y + ( parseFloat( _scope.getCSS( "marginTop" ) ) || 0 ); }
			});
	
			prop( _scope, "calcWidth", {
				get: function() {
					var paddingLeft = parseFloat( _scope.getCSS( "paddingLeft" ) ) || 0;
					var paddingRight = parseFloat( _scope.getCSS( "paddingRight" ) ) || 0;
					var borderLeft = parseFloat( _scope.getCSS( "borderLeft" ) ) || 0;
					var borderRight = parseFloat( _scope.getCSS( "borderRight" ) ) || 0;
					return _scope.width + paddingLeft + paddingRight + borderLeft + borderRight;
				}
			});
	
			prop( _scope, "calcHeight", {
				get: function() {
					var paddingTop = parseFloat( _scope.getCSS( "paddingTop" ) ) || 0;
					var paddingBottom = parseFloat( _scope.getCSS( "paddingBottom" ) ) || 0;
					var borderTop = parseFloat( _scope.getCSS( "borderTop" ) ) || 0;
					var borderBottom = parseFloat( _scope.getCSS( "borderBottom" ) ) || 0;
					return _scope.height + paddingTop + paddingBottom + borderTop + borderBottom;
				}
			});
	
			prop( _scope, "mouse", {
				get: function() { return _mouse.getRelativePosition( _scope ); }
			});
	
			prop( _scope, "tabIndex", {
				get: function() { return _scope.getAttr( "tabindex" ); },
				set: function( v ) { _scope.setAttr( "tabindex", v ); }
			});
	
			prop( _scope, "tooltip", {
				get: function() { return _scope.setAttr( "title" ); },
				set: function( v ) { _scope.setAttr( "title", v ); }
			});
	
			prop( _scope, "filters", {
				get: function() { return _filters; },
				set: function( v ) {
					_filters = v;
					var filters = "";
					var i = -1;
					var l = _filters.length;
					while ( ++i < l ) filters += " " + _filters[ i ].execute();
					_scope.setCSS( "-webkit-filter", filters );
					_scope.setCSS( "filter", filters );
				}
			});
	
			prop( _scope, "display", {
				get: function() { return _cssDisplay; },
				set: function( v ) {
					_cssDisplay = v;
					_scope.setCSS( "display", _cssDisplay );
				}
			});
	
			prop( _scope, "visible", {
				get: function() { return _scope.getCSS( "display" ) != "none"; },
				set: function( v ) { _scope.setCSS( "display", v ? _cssDisplay : "none" ); }
			});
	
			prop( _scope, "alpha", {
				get: function() { return parseFloat( _scope.getCSS( "opacity" ) ); },
				set: function( v ) { _scope.setCSS( "opacity", v ); }
			});
	
			prop( _scope, "x", {
				get: function() { return ( parseFloat( _scope.getCSS( "left" ) ) || 0 ) - ( _scope.width - _scope.width / _scaleX ) * 0.5; },
				set: function( v ) { _scope.setCSS( "left", v + ( _scope.width - _scope.width / _scaleX ) * 0.5 ); }
			});
	
			prop( _scope, "y", {
				get: function() { return ( parseFloat( _scope.getCSS( "top" ) ) || 0 ) - ( _scope.height - _scope.height / _scaleY ) * 0.5; },
				set: function( v ) { _scope.setCSS( "top", v + ( _scope.height - _scope.height / _scaleY ) * 0.5 ); }
			});
	
			prop( _scope, "width", {
				get: function() { return parseFloat( _scope.getCSS( "width" ) ) * _scaleX; },
				set: function( v ) { _scope.setCSS( "width", typeof v != "number" ? v : ( parseFloat( v ) / _scaleX ) ); }
			});
	
			prop( _scope, "height", {
				get: function() { return parseFloat( _scope.getCSS( "height" ) ) * _scaleY; },
				set: function( v ) { _scope.setCSS( "height", typeof v != "number" ? v : ( parseFloat( v ) / _scaleY ) ); }
			});
	
			prop( _scope, "rotation", {
				get: function() { return _rotation; },
				set: function( v ) {
					_rotation = parseFloat( v );
					drawTransform();
				}
			});
	
			prop( _scope, "scaleX", {
				get: function() { return _scaleX; },
				set: function( v ) {
					_scaleX = parseFloat( v );
					var oW = _scope.width / _scaleX;
					_scope.x += ( _scope.width - oW ) * 0.5;
					drawTransform();
				}
			});
	
			prop( _scope, "scaleY", {
				get: function() { return _scaleY; },
				set: function( v ) {
					_scaleY = parseFloat( v );
					var oH = _scope.height / _scaleY;
					_scope.y += ( _scope.height - oH ) * 0.5;
					drawTransform();
				}
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.requestFullscreen = function() {
				if ( !ASJS.DisplayObject.FULLSCREEN_ENABLED ) return;
		
				if ( _scope.el.requestFullscreen ) _scope.el.requestFullscreen();
				else if ( _scope.el.webkitRequestFullscreen ) _scope.el.webkitRequestFullscreen();
				else if ( _scope.el.mozRequestFullScreen ) _scope.el.mozRequestFullScreen();
				else if ( _scope.el.msRequestFullscreen ) _scope.el.msRequestFullscreen();
			};
	
			_scope.exitFullscreen = function() {
				if ( !ASJS.DisplayObject.FULLSCREEN_ENABLED ) return;
		
				if ( document.exitFullscreen ) document.exitFullscreen();
				else if ( document.webkitExitFullscreen ) document.webkitExitFullscreen();
				else if ( document.mozCancelFullScreen ) document.mozCancelFullScreen();
				else if ( document.msExitFullscreen ) document.msExitFullscreen();
			};
	
			_scope.scale = function( scaleX, scaleY ) {
				_scope.scaleX = scaleX;
				_scope.scaleY = scaleY;
			};
	
			_scope.move = function( x, y ) {
				_scope.x = x;
				_scope.y = y;
			}
	
			_scope.setSize = function( w, h ) {
				_scope.width = w;
				_scope.height = h;
			}
	
			_scope.hitTest = function( point ) {
				return ASJS.GeomUtils.hitTest( _scope, point );
			}
	
			_scope.localToGlobal = function( point ) {
				return ASJS.GeomUtils.localToGlobal( _scope, point );
			};
	
			_scope.globalToLocal = function( point ) {
				return ASJS.GeomUtils.globalToLocal( _scope, point );
			};
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function drawTransform() {
				_scope.setCSS( "transform", 'rotate(' + _rotation + 'deg) scaleX(' + _scaleX + ') scaleY(' + _scaleY + ')' );
			}
		}
	);
};
// public static const
cnst( ASJS.DisplayObject, "FULLSCREEN_ENABLED", document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled );

// public static variable

// public static property

// public static function


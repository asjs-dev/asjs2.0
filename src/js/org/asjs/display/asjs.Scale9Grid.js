includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );
includeOnce( "org/asjs/geom/asjs.Rectangle.js" );

ASJS.Scale9Grid = createClass( ASJS.Sprite, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _size = new ASJS.Point();
		var _rectangle = new ASJS.Rectangle();
		var _blocks = [];
		
		// constructor
		_scope.new = function() {
			var i = -1;
			var l = 9;
			while ( ++i < l ) {
				_blocks[ i ] = new ASJS.Sprite();
				_blocks[ i ].setCSS( "background-repeat", "no-repeat" );
				_scope.addChild( _blocks[ i ] );
			}
			
			_blocks[ 0 ].setCSS( "background-position", "left top" );
			_blocks[ 2 ].setCSS( "background-position", "right top" );
			_blocks[ 6 ].setCSS( "background-position", "left bottom" );
			_blocks[ 8 ].setCSS( "background-position", "right bottom" );
		}
		
		// public property
		prop( _scope, "backgroundImage", {
			set: function( v ) {
				var i = -1;
				var l = 9;
				while ( ++i < l ) _blocks[ i ].setCSS( "background-image", "url(" + v + ")" );
				var image = new ASJS.Image();
					image.addEventListener( ASJS.LoaderEvent.LOAD, function() {
						_size.x = image.imageWidth;
						_size.y = image.imageHeight;
						_scope.render();
					});
					image.src = v;
			}
		});

		prop( _scope, "rect", {
			get: function() { return _rectangle; },
			set: function( v ) { _rectangle = v; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {
			var rightSize = _size.x - ( _rectangle.x + _rectangle.width );
			var bottomSize = _size.y - ( _rectangle.y + _rectangle.height );

			var center = new ASJS.Point(
				_scope.width - _rectangle.x - rightSize,
				_scope.height - _rectangle.y - bottomSize
			);

			var percent = new ASJS.Point(
				Math.round( center.x / _rectangle.width ),
				Math.round( center.y / _rectangle.height )
			);

			var tl = new ASJS.Point(
				- ( percent.x * _rectangle.x ) * 2,
				- ( percent.y * _rectangle.y ) * 2
			);

			var ps = new ASJS.Point(
				( _size.x * percent.x ) * 2,
				( _size.y * percent.y ) * 2
			);

			_blocks[ 0 ].setSize( _rectangle.x, _rectangle.y );
			_blocks[ 1 ].setSize( _scope.width - _rectangle.x - rightSize, _rectangle.y );
			_blocks[ 2 ].setSize( _scope.width - _blocks[ 0 ].width - _blocks[ 1 ].width, _rectangle.y );
			_blocks[ 3 ].setSize( _rectangle.x, _scope.height - _rectangle.y - bottomSize );
			_blocks[ 4 ].setSize( _blocks[ 1 ].width, _blocks[ 3 ].height );
			_blocks[ 5 ].setSize( _blocks[ 2 ].width, _blocks[ 3 ].height );
			_blocks[ 6 ].setSize( _rectangle.x, _scope.height - _blocks[ 0 ].height - _blocks[ 3 ].height );
			_blocks[ 7 ].setSize( _blocks[ 1 ].width, _blocks[ 6 ].height );
			_blocks[ 8 ].setSize( _blocks[ 2 ].width, _blocks[ 6 ].height );

			_blocks[ 1 ].x = _blocks[ 0 ].width;
			_blocks[ 2 ].x = _blocks[ 1 ].x + _blocks[ 1 ].width;
			_blocks[ 3 ].y = _blocks[ 0 ].height;
			_blocks[ 4 ].move( _blocks[ 3 ].width, _blocks[ 1 ].height );
			_blocks[ 5 ].move( _blocks[ 4 ].x + _blocks[ 4 ].width, _blocks[ 1 ].height );
			_blocks[ 6 ].y = _blocks[ 3 ].y + _blocks[ 3 ].height;
			_blocks[ 7 ].move( _blocks[ 6 ].width, _blocks[ 6 ].y );
			_blocks[ 8 ].move( _blocks[ 7 ].x + _blocks[ 7 ].width, _blocks[ 6 ].y );

			drawBackground( _blocks[ 1 ], tl.x,    "top",    ps.x,    _size.y );
			drawBackground( _blocks[ 3 ], "left",  tl.y,     _size.x, ps.y );
			drawBackground( _blocks[ 4 ], tl.x,    tl.y,     ps.x,    ps.y );
			drawBackground( _blocks[ 5 ], "right", tl.y,     _size.x, ps.y );
			drawBackground( _blocks[ 7 ], tl.x,    "bottom", ps.x,    _size.y );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function drawBackground( block, a, b, c, d ) {
			block.setCSS( "background-position", addPixel( a ) + " " + addPixel( b ) );
			block.setCSS( "background-size", addPixel( c ) + " " + addPixel( d ) );
		}
		
		function addPixel( a ) {
			return a + ( typeof a == "number" ? "px" : "" );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


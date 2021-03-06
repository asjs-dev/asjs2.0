includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/bitmap/asjs.Bitmap.js" );

ASJS.Image = createClass( ASJS.DisplayObject, [ "img" ], 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		prop( _scope, "bitmap", {
			get: function() {
				var bmp = new ASJS.Bitmap( _scope.imageWidth, _scope.imageHeight );
					bmp.drawImage( _scope, 0, 0, _scope.imageWidth, _scope.imageHeight, 0, 0, _scope.imageWidth, _scope.imageHeight );
				return bmp;
			}
		});

		prop( _scope, "imageWidth", {
			get: function() { return _scope.el.width; }
		});

		prop( _scope, "imageHeight", {
			get: function() { return _scope.el.height; }
		});
		
		prop( _scope, "src", {
			get: function() { return _scope.getAttr( "src" ); },
			set: function( v ) { _scope.setAttr( "src", v ); }
		});

		prop( _scope, "alt", {
			get: function() { return _scope.getAttr( "alt" ); },
			set: function( v ) { _scope.setAttr( "alt", v ); }
		});
		
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


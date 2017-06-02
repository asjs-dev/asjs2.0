includeOnce( "org/asjs/display/bitmap/filters/asjs.AbstractBitmapFilter.js" );
includeOnce( "org/asjs/display/bitmap/asjs.Bitmap.js" );

ASJS.AbstractConvoluteBitmapFilter = createClass( ASJS.AbstractBitmapFilter, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		_scope.opaque;
		
		// constructor
		_scope.new = function( opaque ) {
			_scope.opaque = opaque;
		}
		
		// public property
		
		// protected property
		prop( _scope, "_matrix", {
			get: function() { return [ 1 ]; }
		});
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.execute = function( pixels ) {
			var d = pixels.data;
			return convolute( pixels );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function convolute( pixels ) {
			var weights = _scope._matrix;
			var side = Math.round( Math.sqrt( weights.length ) );
			var halfSide = Math.floor( side * 0.5 );
	
			var src = pixels.data;
			var sw = pixels.width;
			var sh = pixels.height;
	
			var w = sw;
			var h = sh;
	
			var bitmapHelper = new ASJS.Bitmap( w, h );
			var output = bitmapHelper.getImageData( 0, 0, w, h );
			var dst = output.data;
	
			var alphaFac = _scope.opaque ? 1 : 0;
	
			var y = -1;
			while ( ++y < h ) {
				var x = -1;
				while ( ++x < w ) {
					var sy = y;
					var sx = x;
					var dstOff = ( y * w + x ) * 4;
			
					var r = 0;
					var g = 0;
					var b = 0;
					var a = 0;
			
					var cy = -1;
					while ( ++cy < side ) {
						var cx = -1;
						while ( ++cx < side ) {
							var scy = sy + cy - halfSide;
							var scx = sx + cx - halfSide;
							if ( scy >= 0 && scy < sh && scx >= 0 && scx < sw ) {
								var srcOff = ( scy * sw + scx ) * 4;
								var wt = weights[ cy * side + cx ];
								r += src[ srcOff ] * wt;
								g += src[ srcOff + 1 ] * wt;
								b += src[ srcOff + 2 ] * wt;
								a += src[ srcOff + 3 ] * wt;
							}
						}
					}
					dst[ dstOff ] = r;
					dst[ dstOff + 1 ] = g;
					dst[ dstOff + 2 ] = b;
					dst[ dstOff + 3 ] = a + alphaFac * ( 255 - a );
				}
			}
			return output;
		};
	}
);
// public static const

// public static variable

// public static property

// public static function


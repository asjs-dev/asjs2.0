includeOnce( "org/asjs/utils/asjs.Promise.js" );

includeOnce( "org/asjs/display/animation/vo/asjs.AnimationDescriptorVo.js" );

includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationParser = createClass( ASJS.BaseClass, null, 
	function( _scope ) {
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
		_scope.parse = function( json ) {
			var i = -1;
			var l = json.length;
			var animationDescriptorList = [];
			while ( ++i < l ) animationDescriptorList.push( parseAnimationDescriptor( json[ i ] ) );
	
			return animationDescriptorList;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function parseAnimationDescriptor( data ) {
			var animationDescriptor = new ASJS.AnimationDescriptorVo(
				data.id, 
				data.image, 
				new ASJS.Point( data.imageSize.w, data.imageSize.h ),  
				data.frameDelay,
				data.repeat
			);
	
			var i = -1;
			var l = data.frames.length;
			var frames = [];
			while ( ++i < l ) {
				var frame = data.frames[ i ];
		
				var j = -1;
				var m = Math.max( 1, frame.l || 1 ) * animationDescriptor.frameDelay;
				while ( ++j < m ) frames.push( new ASJS.Rectangle( frame.x, frame.y, frame.w, frame.h ) );
			}
	
			animationDescriptor.sequenceList = frames;
			
			return animationDescriptor;
		}

	}
);
// public static const

// public static variable

// public static property

// public static function


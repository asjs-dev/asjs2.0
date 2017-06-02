includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );

includeOnce( "org/asjs/utils/asjs.Deferred.js" );

includeOnce( "org/asjs/display/animation/vo/asjs.AnimationDescriptorVo.js" );

includeOnce( "org/asjs/geom/asjs.Rectangle.js" );
includeOnce( "org/asjs/geom/asjs.Point.js" );

ASJS.AnimationLoader = createClass( Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _dfd;
		var _loader;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.load = function( url ) {
			_dfd = new ASJS.Deferred();
	
			_loader = new ASJS.Loader();
			_loader.addEventListener( ASJS.LoaderEvent.LOAD, onLoad );
			_loader.addEventListener( ASJS.LoaderEvent.ERROR, onLoadError );
			_loader.method = ASJS.RequestMethod.GET;
			_loader.responseType = "json";
			_loader.load( url );
	
			return _dfd.promise;
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

		function onLoad() {
			_loader.removeEventListeners();
	
			try {
				var i = -1;
				var l = _loader.content.length;
				var animationDescriptorList = [];
				while ( ++i < l ) animationDescriptorList.push( parseAnimationDescriptor( _loader.content[ i ] ) );
		
				_dfd.resolve( animationDescriptorList );
			} catch ( e ) {
				trace( e );
				throw new Error( "Invalid animation descriptor file: " + _loader.url );
				_dfd.reject();
			}
		}

		function onLoadError() {
			_loader.removeEventListeners();
			_dfd.reject();
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


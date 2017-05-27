var Media = {};
createSingletonClass( Media, Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.getUserMedia = function( constraints, callback, errorCallback ) {
			_window.userMedia.call( _window.navigator, constraints, callback, errorCallback );
		}

		_scope.getAudioConstraints = function() {
			return { audio: true };
		}

		_scope.getVideoConstraints = function( width, height, facingMode, frameRateIdeal, frameRateMax ) {
			var constraints = { video: true };
			if ( width ) constraints.video.width = width;
			if ( height ) constraints.video.height = height;
			if ( facingMode ) constraints.video.facingMode = facingMode;
			if ( frameRateIdeal || frameRateMax ) {
				constraints.video.frameRate = {};
				if ( frameRateIdeal ) constraints.video.frameRate.ideal = frameRateIdeal;
				if ( frameRateMax ) constraints.video.frameRate.max = frameRateMax;
			}
			return constraints;
		}

		_scope.isSupported = function() {
			return !!_window.userMedia;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const
cnst( Media, "FACING_MODE_USER",        "user" );
cnst( Media, "FACING_MODE_ENVIRONMENT", "environment" );

// public static variable

// public static property

// public static function


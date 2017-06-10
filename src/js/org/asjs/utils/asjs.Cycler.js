includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Cycler = {};
createSingletonClass( ASJS.Cycler, ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _isPlaying = false;
		var _fps = 24;
		var _interval = getIntervalByFps();
		var _callbacks = [];
		var _timeoutId;
		
		// constructor
		
		// public property
		prop( _scope, "isPlaying", {
			get: function() { return _isPlaying; }
		});

		prop( _scope, "fps", {
			get: function() { return _fps; },
			set: function( v ) {
				_fps = v;
				_interval = getIntervalByFps();
				_scope.start();
			}
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.addCallback = function( callback ) {
			if ( !_scope.callbackExists( callback ) ) _callbacks.push( callback );
		};

		_scope.removeCallback = function( callback ) {
			if ( !_scope.callbackExists( callback ) ) return;

			var i = -1;
			var l = _callbacks.length;
			var index;
			while ( ++i < l ) {
				if ( _callbacks[ i ] == callback ) index = i;
			}

			_callbacks.splice( index, 1 );
		};

		_scope.callbackExists = function( callback ) {
			var i = -1;
			var l = _callbacks.length;
			while ( ++i < l ) {
				if ( _callbacks[ i ] == callback ) return true;
			}

			return false;
		};

		_scope.start = function() {
			_isPlaying = true;
			tick();
		};

		_scope.stop = function() {
			_isPlaying = false;
			_timeoutId = _window.clearTimeout( _timeoutId );
		};
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function tick() {
			_timeoutId = _window.clearTimeout( _timeoutId );

			var i = -1;
			var l = _callbacks.length;
			while ( ++i < l ) {
				if ( _callbacks[ i ] ) _callbacks[ i ]();
			}

			_timeoutId = _window.setTimeout( tick, _interval );
		};

		function getIntervalByFps() {
			return 1000 / _fps;
		};
	}
);
// public static const

// public static variable

// public static property

// public static function


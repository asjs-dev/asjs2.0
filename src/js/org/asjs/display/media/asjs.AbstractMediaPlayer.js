includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.AbstractMediaPlayer = createClass( ASJS.Sprite, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			_scope.controls = false;
			_scope.preload = ASJS.AbstractMediaPlayer.PRELOAD_AUTO;
		}
		
		// public property
		prop( _scope, "buffered", {
			get: function() { return _scope.el.buffered; }
		});

		prop( _scope, "controller", {
			get: function() { return _scope.el.controller; }
		});

		prop( _scope, "currentSrc", {
			get: function() { return _scope.el.currentSrc; }
		});

		prop( _scope, "duration", {
			get: function() { return _scope.el.duration; }
		});

		prop( _scope, "ended", {
			get: function() { return _scope.el.ended; }
		});

		prop( _scope, "error", {
			get: function() { return _scope.el.error; }
		});

		prop( _scope, "networkState", {
			get: function() { return _scope.el.networkState; }
		});

		prop( _scope, "paused", {
			get: function() { return _scope.el.paused; }
		});

		prop( _scope, "played", {
			get: function() { return _scope.el.played; }
		});

		prop( _scope, "readyState", {
			get: function() { return _scope.el.readyState; }
		});

		prop( _scope, "seekable", {
			get: function() { return _scope.el.seekable; }
		});

		prop( _scope, "seeking", {
			get: function() { return _scope.el.seeking; }
		});

		prop( _scope, "startDate", {
			get: function() { return _scope.el.startDate; }
		});

		prop( _scope, "textTracks", {
			get: function() { return _scope.el.textTracks; }
		});

		prop( _scope, "controls", {
			get: function() { return _scope.el.controls; },
			set: function( v ) { _scope.el.controls = v; }
		});

		prop( _scope, "preload", {
			get: function() { return _scope.el.preload; },
			set: function( v ) { _scope.el.preload = v; }
		});

		prop( _scope, "muted", {
			get: function() { return _scope.el.muted; },
			set: function( v ) { _scope.el.muted = v; }
		});

		prop( _scope, "loop", {
			get: function() { return _scope.el.loop; },
			set: function( v ) { _scope.el.loop = v; }
		});

		prop( _scope, "autoplay", {
			get: function() { return _scope.el.autoplay; },
			set: function( v ) { _scope.el.autoplay = v; }
		});

		prop( _scope, "src", {
			get: function() { return _scope.el.src; },
			set: function( v ) { _scope.el.src = v; }
		});

		prop( _scope, "crossOrigin", {
			get: function() { return _scope.el.crossOrigin; },
			set: function( v ) { _scope.el.crossOrigin = v; }
		});

		prop( _scope, "currentTime", {
			get: function() { return _scope.el.currentTime; },
			set: function( v ) { _scope.el.currentTime = v; }
		});

		prop( _scope, "defaultMuted", {
			get: function() { return _scope.el.defaultMuted; },
			set: function( v ) { _scope.el.defaultMuted = v; }
		});

		prop( _scope, "defaultPlaybackRate", {
			get: function() { return _scope.el.defaultPlaybackRate; },
			set: function( v ) { _scope.el.defaultPlaybackRate = v; }
		});

		prop( _scope, "mediaGroup", {
			get: function() { return _scope.el.mediaGroup; },
			set: function( v ) { _scope.el.mediaGroup = v; }
		});

		prop( _scope, "playbackRate", {
			get: function() { return _scope.el.playbackRate; },
			set: function( v ) { _scope.el.playbackRate = v; }
		});

		prop( _scope, "volume", {
			get: function() { return _scope.el.volume; },
			set: function( v ) { _scope.el.volume = v; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.play = function() {
			_scope.el.play();
		}

		_scope.pause = function() {
			_scope.el.pause();
		}

		_scope.load = function() {
			_scope.el.load();
		}

		_scope.unload = function() {
			_scope.clear();
			_scope.removeAttr( "src" );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const
cnst( ASJS.AbstractMediaPlayer, "PRELOAD_NONE",     "none" );
cnst( ASJS.AbstractMediaPlayer, "PRELOAD_AUTO",     "auto" );
cnst( ASJS.AbstractMediaPlayer, "PRELOAD_METADATA", "metadata" );

// public static variable

// public static property

// public static function


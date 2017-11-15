var Oscillator = createClass( ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window;
		
		var _isPlaying = false;
		
		var _audioContext;
		var _analyser;
		var _sourceNode;
		var _flist;
		var _step;
		var _interval;
		var _rafID;
		
		// constructor
		_scope.new = function() {
			_scope.stepInterval = 200;
			_audioContext = new _window.audioContext();
			_analyser = _audioContext.createAnalyser();
			_analyser.fftSize = 2048;
			_analyser.connect( _audioContext.destination );
		}
		
		// public property
		prop( _scope, "stepInterval", {
			get: function() { return _interval; },
			set: function( v ) { _interval = v; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.play = function( flist ) {
			_flist = flist;
			_scope.stop();
			_sourceNode = _audioContext.createOscillator();
			_sourceNode.connect( _analyser );
			_sourceNode.start( 0 );
			_isPlaying = true;
			_step = 0;
			playList();
		}

		_scope.stop = function() {
			if ( _sourceNode ) _sourceNode.stop( 0 );
			_sourceNode = null;
			_isPlaying = false;
			if ( _rafID ) _window.clearTimeout( _rafID );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function playList() {
			playFrequency( _flist[ _step ] );
			if ( ++_step >= _flist.length ) _step = 0;
			_rafID = _window.setTimeout( playList, _interval );
		}
		
		function playFrequency( frequency ) {
			_sourceNode.frequency.value = frequency;
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


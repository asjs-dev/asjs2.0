includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.VideoTrack = createClass( ASJS.DisplayObject, [ "track" ], 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		prop( _scope, "src", {
			get: function() { return _scope.getAttr( "src" ); },
			set: function( v ) { _scope.setAttr( "src", v ); }
		});

		prop( _scope, "kind", {
			get: function() { return _scope.getAttr( "kind" ); },
			set: function( v ) { _scope.setAttr( "kind", v ); }
		});

		prop( _scope, "label", {
			get: function() { return _scope.getAttr( "label" ); },
			set: function( v ) { _scope.setAttr( "label", v ); }
		});

		prop( _scope, "srclang", {
			get: function() { return _scope.getAttr( "srclang" ); },
			set: function( v ) { _scope.setAttr( "srclang", v ); }
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
cnst( ASJS.VideoTrack, "KIND_CAPTIONS",     "captions" );
cnst( ASJS.VideoTrack, "KIND_CHAPTERS",     "chapters" );
cnst( ASJS.VideoTrack, "KIND_DESCRIPTIONS", "descriptions" );
cnst( ASJS.VideoTrack, "KIND_METADATA",     "metadata" );
cnst( ASJS.VideoTrack, "KIND_SUBTITLES",    "subtitles" );

// public static variable

// public static property

// public static function


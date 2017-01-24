includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

ASJS.MediaSource = function( src, type ) {
	return createClass( this, ASJS.DisplayObject, [ "<source />" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			
			// constructor
			_scope.new = function() {
				_scope.src = src;
				_scope.type = type;
			}
			
			// public property
			prop( _scope, "type", {
				get: function() { return _scope.getAttr( "type" ); },
				set: function( v ) { _scope.setAttr( "type", v ); }
			});
	
			prop( _scope, "src", {
				get: function() { return _scope.getAttr( "src" ); },
				set: function( v ) { _scope.setAttr( "src", v ); }
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
}
// public static const
cnst( ASJS.MediaSource, "TYPE_AUDIO_MP3",  "audio/mpeg" );
cnst( ASJS.MediaSource, "TYPE_AUDIO_OGG",  "audio/ogg" );
cnst( ASJS.MediaSource, "TYPE_AUDIO_WAV",  "audio/wav" );
cnst( ASJS.MediaSource, "TYPE_VIDEO_MP4",  "video/mp4" );
cnst( ASJS.MediaSource, "TYPE_VIDEO_OGG",  "video/ogg" );
cnst( ASJS.MediaSource, "TYPE_VIDEO_WEBM", "video/webm" );

// public static variable

// public static property

// public static function


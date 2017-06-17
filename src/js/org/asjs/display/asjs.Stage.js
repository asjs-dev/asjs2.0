includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/event/asjs.WindowEvent.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Stage = {};
createSingletonClass( ASJS.Stage, ASJS.Sprite, [ document.body ], 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _stageWidth = 0;
		var _stageHeight = 0;
		
		// constructor
		_scope.new = function() {
			_scope.clear();
			_scope.setSize( "100%", "100%" );
			_window.addEventListener( ASJS.WindowEvent.RESIZE, recalcStageSize );
			recalcStageSize();
	
			ASJS.Mouse.instance().init();
		}
		
		// public property
		prop( _scope, "title", {
			get: function() { return document.title; },
			set: function( v ) { document.title = v; }
		});
		
		prop( _scope, "stage", {
			get: function() { return _scope; }
		});

		prop( _scope, "stageWidth", {
			get: function() { return _stageWidth; }
		});

		prop( _scope, "stageHeight", {
			get: function() { return _stageHeight; }
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function recalcStageSize() {
			var overflowX = _scope.getCSS( "overflow-x" );
			var overflowY = _scope.getCSS( "overflow-y" );

			_scope.setCSS( "overflow-x", "hidden" );
			_scope.setCSS( "overflow-y", "hidden" );

			_stageWidth = _window.width;
			_stageHeight = _window.height;

			_scope.setCSS( "overflow-x", overflowX );
			_scope.setCSS( "overflow-y", overflowY );

			_scope.dispatchEvent( ASJS.Stage.RESIZE );
		}
	}
);
// public static const
msg( ASJS.Stage, "RESIZE",             "resize" );
msg( ASJS.Stage, "ADDED_TO_STAGE",     "addedToStage" );
msg( ASJS.Stage, "REMOVED_FROM_STAGE", "removedFromStage" );

// public static variable

// public static property

// public static function


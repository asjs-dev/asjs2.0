includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/event/asjs.WindowEvent.js" );
includeOnce( "org/asjs/utils/asjs.Mouse.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );

ASJS.Stage = function() {
	return createSingletonClass( ASJS.Stage, this, ASJS.Sprite, [ "body" ], 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _inited = false;
			var _mouse = new ASJS.Mouse();
			var _window = new ASJS.Window();
			var _stageWidth = 0;
			var _stageHeight = 0;
			
			// constructor
			
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
			_scope.init = function() {
				if ( _inited ) return;
				_inited = true;
		
				_scope.clear();
				_scope.setSize( "100%", "100%" );
				_window.addEventListener( ASJS.WindowEvent.RESIZE, recalcStageSize );
				recalcStageSize();
		
				_mouse.init();
			};
			
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
};
// public static const
cnst( ASJS.Stage, "RESIZE",             "ASJS-Stage-resize" );
cnst( ASJS.Stage, "ADDED_TO_STAGE",     "ASJS-Stage-addedToStage" );
cnst( ASJS.Stage, "REMOVED_FROM_STAGE", "ASJS-Stage-removedFromStage" );

// public static variable

// public static property

// public static function


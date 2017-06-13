sourcePath( "./" );

includeOnce( "com/external/controller/StartupCommand.js" );

var Application = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _contentView = new ASJS.Sprite();
		
		// constructor
		_scope.new = function() {
			trace( "<AS/JS> External Application" );
			
			var styleLoader = new ASJS.StyleLoader();
				styleLoader.addEventListener( ASJS.LoaderEvent.LOAD, function() {
					styleLoader.useStyle();
					( new StartupCommand() ).execute( _scope );
				});
				styleLoader.load( "css/external/application.css" );
			
			_scope.addChild( _scope.contentView );
			
		}
		
		// public property
		prop( _scope, "contentView", {
			get: function() { return _contentView; }
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
		
		// internal classes
	}
);
// public static const

// public static variable

// public static property

// public static function

// -------------------- //
ASJS.start( Application );

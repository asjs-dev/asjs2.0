sourcePath( "./" );

includeOnce( "com/asjs/controller/StartupCommand.js" );

var Application = createClass( Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _contentView = new ASJS.Sprite();
		var _notificationWindowView = new ASJS.Sprite();
		
		// constructor
		_scope.new = function() {
			trace( "<AS/JS> 2.0 Application" );
			
			stage.addChild( _scope.contentView );
			stage.addChild( _scope.notificationWindowView );
			
			( new StartupCommand() ).execute( _scope );
		}
		
		// public property
		prop( _scope, "contentView", {
			get: function() { return _contentView; }
		});
		
		prop( _scope, "notificationWindowView", {
			get: function() { return _notificationWindowView; }
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

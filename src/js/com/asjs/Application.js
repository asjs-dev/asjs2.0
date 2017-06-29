sourcePath( "./" );

includeOnce( "com/asjs/controller/StartupCommand.js" );

var Application = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function() {
			trace( "<AS/JS> Application 2.{{version}}" );
			
			( new StartupCommand() ).execute( _scope );
		}
		
		// public property
		
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

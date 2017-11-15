includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/view/AbstractView.js" );
includeOnce( "com/external/module/content/ContentMediator.js" );

var ContentView = createClass( AbstractView, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _parent;
		
		var _background = new ASJS.DisplayObject();
		
		// constructor
		_scope.new = function() {
			_scope.addClass( "external-content-view" );
			_scope.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
			_scope.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
			
			_background.addClass( "background" );
			_scope.addChild( _background );
			
			_scope.render();
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {
			if ( !_parent ) return;
			_background.setSize( _parent.width, _parent.height );
		}

		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function addedToStage() {
			_parent = _scope.parent.parent;
		}
		
		function removedFromStage() {
			_parent = null;
		}

	}
);
// public static const

// public static variable

// public static property

// public static function


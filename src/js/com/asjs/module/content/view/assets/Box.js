includeOnce( "com/asjs/module/content/ContentMediator.js" );
includeOnce( "com/asjs/model/Language.js" );

var Box = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _label = new ASJS.Label();
		var _button = new ASJS.Button();
		
		// constructor
		_scope.new = function() {
			_scope.addClass( "box" );
			_scope.setSize( 320, 130 );
			
			_label.text = _language.getText( "new_asjs_base_site" );
			_label.addClass( "label" );
			_label.setSize( _scope.width, 30 );
			_label.y = 34;
			_scope.addChild( _label );
	
			_button.label = _language.getText( "show_notification_window" );
			_button.addClass( "button" );
			_button.setSize( _scope.width, 40 );
			_button.y = _scope.height - _button.height;
			
			_button.addEventListener( ASJS.MouseEvent.CLICK, onButtonClick );
			_scope.addChild( _button );
		}
		
		// public property
		prop( _scope, "label", {
			get: function() { return _label; }
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
		function onButtonClick() {
			_scope.dispatchEvent( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


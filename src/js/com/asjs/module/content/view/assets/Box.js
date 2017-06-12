includeOnce( "com/asjs/module/content/ContentMediator.js" );
includeOnce( "com/asjs/model/Language.js" );

var Box = createClass( ASJS.Sprite, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language.instance();
		var _label = new ASJS.Label();
		var _button = new ASJS.Button();
		
		// constructor
		_scope.new = function() {
			_scope.addClass( "content-view--box" );
			
			_label.text = _language.getText( "new_asjs_base_site" );
			_label.addClass( "content-view--box--label" );
			_scope.addChild( _label );
	
			_button.label = _language.getText( "show_notification_window" );
			_button.addClass( "content-view--box--button" );
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
		_scope.render = function() {
			_label.setSize( 320, 30 );
			_label.move( 0, 34 );
			
			_button.setSize( 320, 40 );
			_button.move( 0, _scope.height - _button.height );
		}
		
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


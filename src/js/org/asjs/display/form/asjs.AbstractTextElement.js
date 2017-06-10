includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/event/asjs.KeyboardEvent.js" );
includeOnce( "org/asjs/event/asjs.Event.js" );
includeOnce( "org/asjs/utils/asjs.Keyboard.js" );

ASJS.AbstractTextElement = createClass( ASJS.FormElement, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _protectedChars = [
			ASJS.Keyboard.LEFT_ARROW,
			ASJS.Keyboard.UP_ARROW,
			ASJS.Keyboard.RIGHT_ARROW,
			ASJS.Keyboard.DOWN_ARROW,
			ASJS.Keyboard.BACKSPACE,
			ASJS.Keyboard.TAB,
			ASJS.Keyboard.DELETE,
			ASJS.Keyboard.ENTER,
			ASJS.Keyboard.SHIFT,
			ASJS.Keyboard.CTRL,
			ASJS.Keyboard.END,
			ASJS.Keyboard.HOME,
			ASJS.Keyboard.CAPS_LOCK,
			ASJS.Keyboard.ESCAPE
		];
		var _controlChars = [
			ASJS.Keyboard.A,
			ASJS.Keyboard.C,
			ASJS.Keyboard.V,
			ASJS.Keyboard.X,
			ASJS.Keyboard.NUMPAD_1,
			ASJS.Keyboard.NUMPAD_3,
			ASJS.Keyboard.F7,
			ASJS.Keyboard.F9
		];
		var _restrict;
		
		// constructor
		_scope.new = function() {
			_scope.addEventListener( ASJS.KeyboardEvent.KEY_PRESS, onKeyPress );
			_scope.addEventListener( ASJS.KeyboardEvent.KEY_UP, onKeyUp );
			_scope.addEventListener( ASJS.Event.CHANGE, onChange );
		}
		
		// public property
		prop( _scope, "readonly", {
			get: function() { return _scope.getAttr( "readonly" ); },
			set: function( v ) {
				if ( v ) _scope.setAttr( "readonly", "readonly" );
				else _scope.removeAttr( "readonly" );
			}
		});

		prop( _scope, "placeholder", {
			get: function() { return _scope.getAttr( "placeholder" ); },
			set: function( v ) { _scope.setAttr( "placeholder", v ); }
		});

		prop( _scope, "val", {
			get: function() { return _scope.el.value; },
			set: function( v ) { _scope.el.value = v; }
		});

		prop( _scope, "maxChar", {
			get: function() { return _scope.getAttr( "maxLength" ); },
			set: function( v ) { _scope.setAttr( "maxLength", v ); }
		});

		prop( _scope, "restrict", {
			get: function() { return _restrict; },
			set: function( v ) { _restrict = v; }
		});

		prop( _scope, "autofocus", {
			get: function() { return _scope.getAttr( "autofocus" ); },
			set: function( v ) {
				if ( v ) _scope.setAttr( "autofocus", "autofocus" );
				else _scope.removeAttr( "autofocus" );
			}
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
		function onKeyPress( e ) {
			if ( _restrict ) {
				var charCode = e.which ? e.which : e.keyCode;
				if ( _protectedChars.indexOf( e.keyCode ) > -1 || ( e.ctrlKey && _controlChars.indexOf( charCode ) > -1 ) ) return;
				if ( !new RegExp( _restrict, "i" ).test( String.fromCharCode( e.which ) ) ) return false;
			}
		}

		function onKeyUp( e ) {
			var charCode = e.which ? e.which : e.keyCode;
			if ( e.ctrlKey && _controlChars.indexOf( charCode ) > -1 ) onChange( e );
		}

		function onChange() {
			if ( _restrict ) _scope.val = _scope.val.replace( new RegExp( "(?!" + _restrict + ").", "g" ), '' );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


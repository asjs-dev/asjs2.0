includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );

ASJS.Cell = createClass( ASJS.Sprite, [ "li" ], 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _data = {};
		var _checked = false;
		
		// constructor
		_scope.new = function() {
			_scope.setCSS( "position", "relative" );
			_scope.mouseChildren = false;
			_scope.addEventListener( ASJS.MouseEvent.CLICK, onClick );
		}
		
		// public property
		prop( _scope, "name", {
			get: function() { return _scope.getAttr( "name" ); },
			set: function( v ) { _scope.setAttr( "name", v ); }
		});

		prop( _scope, "checked", {
			get: function() { return _checked; },
			set: function( v ) { _checked = v; }
		});

		prop( _scope, "data", {
			get: function() { return _data; },
			set: function( v ) {
				_data = v;
				if ( _data.id ) _scope.id = _data.id;
				_scope.showData();
			}
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {}

		_scope.showData = function() {}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onClick( e ) {
			_scope.dispatchEvent( ASJS.Cell.CLICK, {
				ctrlKey: e.ctrlKey,
				shiftKey: e.shiftKey
			});
		}
	}
);
// public static const
msg( ASJS.Cell, "CLICK", "click" );

// public static variable

// public static property

// public static function


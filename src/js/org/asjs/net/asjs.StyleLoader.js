includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/window/asjs.Head.js" );
includeOnce( "org/asjs/display/asjs.Tag.js" );

ASJS.StyleLoader = createClass( ASJS.Loader, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _head = ASJS.Head;
		var _style;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.useStyle = function() {
			if ( _style || _super.content == "" ) return;
			_style = new ASJS.Tag( "style" );
			_style.setAttr( "type", "text/css" );
			_style.text = _super.content;
			_head.addChild( _style );
			_scope.free();
		}
		
		_scope.unload = function() {
			if ( _style && _head.contains( _style ) ) _head.removeChild( _style );
			_style = null;
			_super.unload();
		}
		
		_scope.load = function( url ) {
			_scope.unload();
			_super.load( url );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


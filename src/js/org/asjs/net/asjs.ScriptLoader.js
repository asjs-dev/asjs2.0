includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/window/asjs.Head.js" );
includeOnce( "org/asjs/display/asjs.Tag.js" );

ASJS.ScriptLoader = createClass( ASJS.Loader, null,
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _head = ASJS.Head.instance();
		var _type = ASJS.ScriptLoader.TYPE_EVALUATE;
		var _content;
		
		// constructor
		
		// public property
		prop( _scope, "type", {
			get: function() { return _type; },
			set: function( v ) { _type = v; }
		});
		
		prop( _scope, "content", {
			get: function() {
				if ( !_content && _super.content != "" ) {
					_content = _type == ASJS.ScriptLoader.TYPE_EVALUATE ? getEvaluatedScript() : getImportedScript();
					_scope.free();
				}
				return _content;
			}
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.unload = function() {
			_content = null;
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
		function getEvaluatedScript() {
			return new Function( _super.content + " return Main;" )();
		}
		
		function getImportedScript() {
			var id = "ew" + ( ++ASJS.ScriptLoader.scripts );
			var script = new ASJS.Tag( "script" );
				script.setAttr( "type", "text/javascript" );
				script.text = "ASJS." + id + " = function(){" + _super.content + "return Main;};";
			_head.addChild( script );
			_head.removeChild( script );
			script = null;
			return ASJS[ id ]();
		}
	}
);
// public static const
cnst( ASJS.ScriptLoader, "TYPE_EVALUATE", "ASJS-ScriptLoader-typeEvaluate" );
cnst( ASJS.ScriptLoader, "TYPE_IMPORT",   "ASJS-ScriptLoader-typeImport" );

// public static variable
ASJS.ScriptLoader.scripts = 0;

// public static property

// public static function


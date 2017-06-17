includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.FileSelector = createClass( ASJS.FormElement, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.fileInput = new ASJS.DisplayObject( "input" );
		
		// private variable
		var _preview = new ASJS.Sprite();
		
		// constructor
		_scope.new = function() {
			_protected.fileInput.setAttr( "type", "file" );
			_protected.fileInput.addEventListener( ASJS.Event.CHANGE, _protected.onChange );
			_protected.fileInput.visible = false;
			_scope.addChild( _protected.fileInput );
	
			_preview.setSize( "100%", "100%" );
			_preview.move( 0, 0 );
			_scope.addChild( _preview );
	
			_scope.addEventListener( ASJS.MouseEvent.CLICK, onClick );
		}
		
		// public property
		prop( _scope, "preview", {
			get: function() { return _preview; }
		});

		prop( _scope, "val", {
			get: function() { return _protected.fileInput.el.value; }
		});

		prop( _scope, "fileInput", {
			get: function() { return _fileInput; }
		});
		
		prop( _scope, "enabled", {
			set: function( v ) {
				_super.enabled = _protected.fileInput.enabled = v;
				_scope.render();
			}
		});
		
		prop( _scope, "name", {
			get: function() { return _protected.fileInput.getAttr( "name" ); },
			set: function( v ) { _protected.fileInput.setAttr( "name", v ); }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		
		// protected read only function
		
		// protected function
		_protected.onChange = function() {
			_preview.text = _scope.val;
			_scope.dispatchEvent( ASJS.FileSelector.ON_CHANGE );
		}
		
		// private read only function
		
		// private function
		function onClick( e ) {
			if ( e.target == _protected.fileInput.el ) return;
			_protected.fileInput.el.click();
		}
	}
);
// public static const
msg( ASJS.FileSelector, "ON_CHANGE", "onChange" );

// public static variable

// public static property

// public static function


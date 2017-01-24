includeOnce( "org/asjs/display/form/asjs.FormElement.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/event/asjs.Event.js" );

ASJS.FileSelector = function() {
	return createClass( this, ASJS.FormElement, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			_scope._fileInput = new ASJS.DisplayObject( "<input />" );
			
			// private variable
			var _preview = new ASJS.Sprite();
			
			// constructor
			_scope.new = function() {
				_scope._fileInput.setAttr( "type", "file" );
				_scope._fileInput.addEventListener( ASJS.Event.CHANGE, _scope._onChange );
				_scope._fileInput.visible = false;
				_scope.addChild( _scope._fileInput );
		
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
				get: function() { return _scope._fileInput.jQuery.val(); }
			});
	
			prop( _scope, "fileInput", {
				get: function() { return _fileInput; }
			});
			
			prop( _scope, "enabled", {
				set: function( v ) {
					_super.enabled = _scope._fileInput.enabled = v;
					_scope.drawNow();
				}
			});
			
			prop( _scope, "name", {
				get: function() { return _scope._fileInput.getAttr( "name" ); },
				set: function( v ) { _scope._fileInput.setAttr( "name", v ); }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			
			// protected read only function
			
			// protected function
			_scope._onChange = function() {
				_preview.text = _scope.val;
				_scope.dispatchEvent( ASJS.FileSelector.ON_CHANGE );
			}
			
			// private read only function
			
			// private function
			function onClick( e ) {
				if ( e.target == _scope._fileInput.el ) return;
				_scope._fileInput.jQuery.click();
			}
		}
	);
}
// public static const
cnst( ASJS.FileSelector, "ON_CHANGE", "ASJS-FileSelector-onChange" );

// public static variable

// public static property

// public static function


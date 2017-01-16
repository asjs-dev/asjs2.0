includeOnce( "org/asjs/display/form/asjs.FileSelector.js" );

ASJS.ImageSelector = function() {
	return createClass( this, ASJS.FileSelector, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _reader = new FileReader();
			
			// constructor
			_scope.construct = function() {
				_reader.onload = readerOnLoad;
			}
			
			// public property
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			
			// protected read only function
			
			// protected function
			_scope._onChange = function() {
				var target = _scope._fileInput.el;
				if ( target.files && target.files[ 0 ] ) {
					_scope.dispatchEvent( ASJS.ImageSelector.ON_CHANGE_START );
					_reader.readAsDataURL( target.files[ 0 ] );
				}
			}
			
			// private read only function
			
			// private function
			function readerOnLoad( e ) {
				_scope.preview.setCSS( 'background-image', 'url(' + e.target.result + ')' );
				_scope.dispatchEvent( ASJS.FileSelector.ON_CHANGE );
			}
		}
	);
}
// public static const
cnst( ASJS.ImageSelector, "ON_CHANGE_START", "ASJS-ImageSelector-onChangeStart" );

// public static variable

// public static property

// public static function


includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/view/AbstractView.js" );
includeOnce( "com/asjs/module/externalApplication/ExternalApplicationMediator.js" );

var ExternalApplicationView = createClass( AbstractView, null, 
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _mouse = ASJS.Mouse;
		
		var _container = new ASJS.Sprite();
		var _title = new ASJS.Label();
		var _closeButton = new ASJS.Button();
		var _externalApplication;
		
		// constructor
		_scope.new = function() {
			_scope.addClass( "external-application-view" );
			_scope.setCSS( "position", "fixed" );
			
			_container.addClass( "container" );
			_container.move( 20, 20 );
			_scope.addChild( _container );
			
			_title.addClass( "title-label" );
			_title.height = 30;
			_title.move( 10, 10 );
			_container.addChild( _title );
			
			_closeButton.addClass( "close-button" );
			_closeButton.setSize( 30, 30 );
			_closeButton.y = 10;
			_closeButton.addEventListener( ASJS.MouseEvent.CLICK, onCloseClick );
			_container.addChild( _closeButton );
		}
		
		// public property
		prop( _scope, "title", {
			set: function( v ) { _title.text = v; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {
			_scope.setSize( stage.stageWidth, stage.stageHeight );
			_container.setSize( _scope.width - _container.x * 2, _scope.height - _container.y * 2 );
			
			_closeButton.x = _container.width - _closeButton.width - 10;
			
			_title.width = _closeButton.x - _title.x * 2;
			
			if ( _externalApplication && _container.contains( _externalApplication ) ) {
				_externalApplication.move( 10, _closeButton.y * 2 + _closeButton.height );
				_externalApplication.setSize( _container.width - _externalApplication.x * 2, _container.height - _externalApplication.y - _closeButton.y );
			}
		}
		
		_scope.addExternalApplication = function( externalApplication ) {
			_scope.removeExternalApplication();
			_externalApplication = externalApplication;
			_container.addChild( externalApplication );
			_scope.render();
		}
		
		_scope.removeExternalApplication = function() {
			if ( !_externalApplication ) return;
			_container.removeChild( _externalApplication );
			_externalApplication.destruct();
			_externalApplication = null;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onCloseClick() {
			_scope.dispatchEvent( ExternalApplicationMediator.CLOSE );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


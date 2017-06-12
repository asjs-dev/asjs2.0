includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/asjs/module/externalApplication/view/ExternalApplicationView.js" );

var ExternalApplicationMediator = createClass( AbstractResizeMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers.push( ExternalApplicationMediator.SHOW, ExternalApplicationMediator.HIDE );
		
		// private variable
		var _externalApplicationView = new ExternalApplicationView();
		var _loader = new ASJS.ScriptLoader();
		
		// constructor
		_scope.new = function() {
			_externalApplicationView.addEventListener( ExternalApplicationMediator.CLOSE, onClose );
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.reciveNotification = function( type, data ) {
			_super.reciveNotification( type, data );
			switch ( type ) {
				case ExternalApplicationMediator.SHOW: onShow();
				break;
				case ExternalApplicationMediator.HIDE: onHide();
				break;
			}
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onShow() {
			if ( !_protected.view.contains( _externalApplicationView ) ) _protected.view.addChild( _externalApplicationView );
			loadExternalApplication();
			
			_protected.showView();
		}
		
		function onHide() {
			if ( _protected.view.contains( _externalApplicationView ) ) _protected.view.removeChild( _externalApplicationView );
			unloadExternalApplication();
		}
		
		function onClose() {
			onHide();
		}
		
		function loadExternalApplication() {
			unloadExternalApplication();
			
			_loader.addEventListener( ASJS.LoaderEvent.LOAD, onLoadExternalApplication );
			_loader.load( "js/external/application.js?" + ( new Date() ).valueOf() );
		}
		
		function unloadExternalApplication() {
			_externalApplicationView.removeExternalApplication();
			_loader.cancel();
			_loader.unload();
		}
		
		function onLoadExternalApplication( e ) {
			_externalApplicationView.addExternalApplication( new _loader.content() );
			_loader.unload();
		}
	}
);
// public static const
cnst( ExternalApplicationMediator, "SHOW",  "ExternalApplicationMediator-show" );
cnst( ExternalApplicationMediator, "HIDE",  "ExternalApplicationMediator-hide" );
cnst( ExternalApplicationMediator, "CLOSE", "ExternalApplicationMediator-close" );

// public static variable

// public static property

// public static function


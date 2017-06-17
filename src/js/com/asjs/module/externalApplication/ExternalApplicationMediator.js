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
		var _externalApp;
		
		// constructor
		_scope.new = function() {
			_externalApplicationView.addEventListener( ExternalApplicationMediator.CLOSE, onClose );
			
			_loader.addEventListener( ASJS.LoaderEvent.LOAD, onLoadExternalApplication );
			_loader.addEventListener( ASJS.LoaderEvent.PROGRESS, onProgressExternalApplication );
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
			_loader.load( "js/external/application.js" );
		}
		
		function unloadExternalApplication() {
			_externalApplicationView.removeExternalApplication();
			_loader.cancel();
			_loader.unload();
			
			_externalApp = null;
		}
		
		function onLoadExternalApplication( e ) {
			_externalApp = new _loader.content();
			_externalApp.addEventListener( ASJS.LoaderEvent.LOAD, function() {
				_externalApplicationView.title = _externalApp.title;
			});
			
			_externalApplicationView.addExternalApplication( _externalApp );
			_loader.unload();
		}
		
		function onProgressExternalApplication( e ) {
			_externalApplicationView.title = ( ( e.detail.loaded / e.detail.total ) * 100 ) + "%";
		}
	}
);
// public static const
msg( ExternalApplicationMediator, "SHOW",  "show" );
msg( ExternalApplicationMediator, "HIDE",  "hide" );
msg( ExternalApplicationMediator, "CLOSE", "close" );

// public static variable

// public static property

// public static function


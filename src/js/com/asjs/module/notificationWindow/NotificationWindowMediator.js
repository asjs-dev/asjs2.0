includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/asjs/module/notificationWindow/view/NotificationWindowView.js" );
includeOnce( "com/asjs/module/notificationWindow/model/vo/NotificationWindowDataVo.js" );
includeOnce( "com/asjs/model/Language.js" );

var NotificationWindowMediator = createClass( AbstractResizeMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers.push( NotificationWindowMediator.SHOW );
		
		// private variable
		var _language = Language.instance();
		
		var _forceResize = true;
		
		var _pool = [];
		var _showed = false;
		var _defaultOkLabel = "";
		var _defaultCancelLabel = "";
		var _notificationWindowView = new NotificationWindowView();
		
		// constructor
		_scope.new = function() {
			_notificationWindowView.addEventListener( NotificationWindowMediator.HIDE, hide );
			_defaultOkLabel = _language.getText( 'notification_ok_button' );
			_defaultCancelLabel = _language.getText( 'notification_cancel_button' );
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
				case NotificationWindowMediator.SHOW: show( data );
				break;
			}
		}
		
		// protected read only function
		
		// protected function
		_protected.onResize = function() {
			_forceResize = true;
			if ( !_protected.view.contains( _notificationWindowView ) ) return;
			_notificationWindowView.render();
			_forceResize = false;
		}
		
		// private read only function
		
		// private function

		function show( data ) {
			if ( data == undefined ) data = new NotificationDataVo();
	
			if ( !data.okLabel ) data.okLabel = _defaultOkLabel;
			if ( !data.cancelLabel ) data.cancelLabel = _defaultCancelLabel;
	
			_pool.push( data );
	
			if ( !_showed ) showWindow();
		}

		function hide() {
			if ( _pool.length > 0 ) showWindow();
			else hideWindow();
		}
		
		function hideWindow() {
			_protected.view.removeChild( _notificationWindowView );
			_showed = false;
		}

		function showWindow() {
			var notificationItem = _pool[ 0 ];
			_pool.shift();
			_showed = true;
			_notificationWindowView.showWindow( notificationItem );
	
			if ( !_protected.view.contains( _notificationWindowView ) ) _protected.view.addChild( _notificationWindowView );
			
			if ( _forceResize ) _protected.onResize();
		}
	}
);
// public static const
cnst( NotificationWindowMediator, "SHOW", "NotificationWindowMediator-show" );
cnst( NotificationWindowMediator, "HIDE", "NotificationWindowMediator-hide" );

// public static variable

// public static property

// public static function


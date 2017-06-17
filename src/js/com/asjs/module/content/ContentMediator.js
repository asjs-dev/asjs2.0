includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

includeOnce( "com/asjs/module/content/view/ContentView.js" );

includeOnce( "com/asjs/module/notificationWindow/NotificationWindowMediator.js" );
includeOnce( "com/asjs/module/notificationWindow/model/vo/NotificationWindowDataVo.js" );

includeOnce( "com/asjs/module/externalApplication/ExternalApplicationMediator.js" );

var ContentMediator = createClass( AbstractResizeMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers.push( ContentMediator.SHOW );
		
		// private variable
		var _dataProxy = DataProxy.instance();
		var _language = Language.instance();
		var _contentView = new ContentView();
		
		// constructor
		_scope.new = function() {
			_contentView.addEventListener( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW, showNotificationWindow );
			_contentView.addEventListener( ContentMediator.ON_SHOW_EXTERNAL_APPLICATION, showExternalApplication );
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
				case ContentMediator.SHOW: onShow();
				break;
			}
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onLoadAnimation( data ) {
			_contentView.init( data );
			if ( !_protected.view.contains( _contentView ) ) _protected.view.addChild( _contentView );
		}

		function onShow() {
			_dataProxy.loadAnimation( "json/animation/contentAnimation.json" ).done( onLoadAnimation );
			
			_protected.showView();
		}
		
		function onHide() {
			if ( _protected.view.contains( _contentView ) ) _protected.view.removeChild( _contentView );
		}
		
		function showNotificationWindow() {
			var notificationWindowDataVo = new NotificationWindowDataVo();
				notificationWindowDataVo.title = _language.getText( "notification_title" );
				notificationWindowDataVo.content = _language.getText( "notification_content" );
				notificationWindowDataVo.height = 230;
			_scope.sendNotification( NotificationWindowMediator.SHOW, notificationWindowDataVo );
		}
		
		function showExternalApplication() {
			_scope.sendNotification( ExternalApplicationMediator.SHOW );
		}
	}
);
// public static const
msg( ContentMediator, "SHOW",                         "show" );
msg( ContentMediator, "ON_SHOW_EXTERNAL_APPLICATION", "onShowExternalApplication" );
msg( ContentMediator, "ON_SHOW_NOTIFICATION_WINDOW",  "onShowNotificationWindow" );

// public static variable

// public static property

// public static function


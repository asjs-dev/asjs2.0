includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

includeOnce( "com/asjs/module/content/view/ContentView.js" );

includeOnce( "com/asjs/module/notificationWindow/NotificationWindowMediator.js" );
includeOnce( "com/asjs/module/notificationWindow/model/vo/NotificationWindowDataVo.js" );

var ContentMediator = createClass( AbstractResizeMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers.push( ContentMediator.SHOW );
		
		// private variable
		var _forceResize = true;
		
		var _dataProxy = DataProxy.instance();
		var _language = Language.instance();
		var _contentView = new ContentView();
		
		// constructor
		
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
		_protected.onResize = function() {
			_forceResize = true;
			if ( !_protected.view.contains( _contentView ) ) return;
			_contentView.render();
			_forceResize = false;
		}
		
		// private read only function
		
		// private function
		function onLoadAnimation( data ) {
			_contentView.init( data );
			_protected.view.addChild( _contentView );
		}

		function onShow() {
			_contentView.addEventListener( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK, function() {
				var notificationWindowDataVo = new NotificationWindowDataVo();
					notificationWindowDataVo.title = _language.getText( "notification_title" );
					notificationWindowDataVo.content = _language.getText( "notification_content" );
					notificationWindowDataVo.height = 230;
				_scope.sendNotification( NotificationWindowMediator.SHOW, notificationWindowDataVo );
			});
	
			_dataProxy.loadAnimation( "json/animation/contentAnimation.json" ).done( onLoadAnimation );

			if ( _forceResize ) _protected.onResize();
		}
	}
);
// public static const
cnst( ContentMediator, "SHOW",                              "ContentMediator-show" );
cnst( ContentMediator, "ON_SHOW_NOTIFICATION_WINDOW_CLICK", "ContentMediator-onShowNotificationWindowClick" );

// public static variable

// public static property

// public static function


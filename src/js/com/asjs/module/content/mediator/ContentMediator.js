includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/proxy/DataProxy.js" );

includeOnce( "com/asjs/module/content/view/ContentView.js" );

includeOnce( "com/asjs/module/notificationWindow/mediator/NotificationWindowMediator.js" );
includeOnce( "com/asjs/module/notificationWindow/model/vo/NotificationWindowDataVo.js" );

function ContentMediator( view ) {
	return createClass( this, AbstractResizeMediator, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			_scope._handlers.push( ContentMediator.SHOW );
			
			// private variable
			var _forceResize = true;
			
			var _dataProxy = new DataProxy();
			var _language = new Language();
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
			_scope._onResize = function() {
				_forceResize = true;
				if ( !_scope._view.contains( _contentView ) ) return;
				_contentView.render();
				_forceResize = false;
			}
			
			// private read only function
			
			// private function
			function onLoadAnimation( data ) {
				_contentView.init( data );
				_scope._view.addChild( _contentView );
			}
	
			function onShow() {
				_contentView.addEventListener( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK, function() {
					var notificationWindowDataVo = new NotificationWindowDataVo();
						notificationWindowDataVo.title = _language.getText( "notification_title" );
						notificationWindowDataVo.content = _language.getText( "notification_content" );
						notificationWindowDataVo.height = 230;
					_scope.sendNotification( NotificationWindowMediator.SHOW, notificationWindowDataVo );
				});
		
				_dataProxy.loadAnimation( "json/animation/contentAnimation.json" ).resolve( onLoadAnimation );
	
				if ( _forceResize ) _scope._onResize();
			}
		}
	);
}
// public static const
cnst( ContentMediator, "SHOW",                              "ContentMediator-show" );
cnst( ContentMediator, "ON_SHOW_NOTIFICATION_WINDOW_CLICK", "ContentMediator-onShowNotificationWindowClick" );

// public static variable

// public static property

// public static function


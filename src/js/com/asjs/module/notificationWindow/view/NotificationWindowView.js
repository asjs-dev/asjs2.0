includeOnce( "com/asjs/view/AbstractView.js" );
includeOnce( "com/asjs/module/notificationWindow/NotificationWindowMediator.js" );

var NotificationWindowView = createClass( AbstractView, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _notificationItem = {};
		var _window = new ASJS.Scale9Grid();
		var _title = new ASJS.Sprite();
		var _content = new ASJS.Sprite();
		var _okButton = new ASJS.Button();
		var _cancelButton = new ASJS.Button();
		
		// constructor
		_scope.new = function() {
			_scope.setCSS( "background-color", "rgba( 0, 0, 0, 0.4 )" );
			_scope.setCSS( "position", "fixed" );
	
			_window.size = new ASJS.Point( 30, 80 );
			_window.rect = new ASJS.Rectangle( 13, 60, 4, 7 );
			_window.backgroundImage = "images/window.png";
			_scope.addChild( _window );

			_title.height = 50;
			_title.setCSS( "line-height", _title.height + "px" );
			_title.addClass( "notification-window-view--title-label" );
			_scope.addChild( _title );

			_content.addClass( "notification-window-view--content-label" );
			_scope.addChild( _content );

			_okButton.addEventListener( ASJS.MouseEvent.CLICK, function() {
				_scope.hideWindow();
				if ( _notificationItem[ 'okCallback' ] != undefined ) _notificationItem[ 'okCallback' ]();
			});
			drawButtonStyle( _okButton );

			_cancelButton.addEventListener( ASJS.MouseEvent.CLICK, function() {
				_scope.hideWindow();
				if ( _notificationItem[ 'cancelCallback' ] != undefined ) _notificationItem[ 'cancelCallback' ]();
			});
			drawButtonStyle( _cancelButton );
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.hideWindow = function() {
			_protected.animateTo( 0, function() {
				_scope.dispatchEvent( NotificationWindowMediator.HIDE );
				
				_title.html = "";
				_content.html = "";
	
				if ( hasOkButton() ) _scope.removeChild( _okButton );
				_okButton.label = "";
	
				if ( hasCancelButton() ) _scope.removeChild( _cancelButton );
				_cancelButton.label = "";
			});
		}

		_scope.showWindow = function( notificationItem ) {
			_notificationItem = notificationItem;
	
			_title.html = _notificationItem.title;
			_content.html = _notificationItem.content;
	
			if ( _notificationItem[ 'showOk' ] ) {
				_okButton.label = _notificationItem[ 'okLabel' ];
				if ( !hasOkButton() ) _scope.addChild( _okButton );
			} else if ( hasOkButton() ) _scope.removeChild( _okButton );
	
			if ( _notificationItem[ 'showCancel' ] ) {
				_cancelButton.label = _notificationItem[ 'cancelLabel' ];
				if ( !hasCancelButton() ) _scope.addChild( _cancelButton );
			} else if ( hasCancelButton() ) _scope.removeChild( _cancelButton );
		}

		_scope.render = function() {
			_scope.setSize( stage.stageWidth, stage.stageHeight );
			_window.setSize( Math.max( 150, Math.min( stage.stageWidth, _notificationItem.width ) ), Math.max( 150, Math.min( stage.stageHeight, _notificationItem.height ) ) );
			_window.move( ( stage.stageWidth - _window.width ) * 0.5, Math.max( 0, ( stage.stageHeight - _window.height ) * 0.5 ) );
			_window.render();
			
			_title.move( _window.x + 25, _window.y + 10 );
			_title.width = _window.width - 50;
	
			_content.move( _title.x, _title.y + _title.height + 25 );
			_content.setSize( _title.width, _window.height - _title.height - 55 - ( hasOkButton() || hasCancelButton() ? 60 : 0 ) );
			if ( _content.render ) _content.render();
	
			_okButton.width = _window.width * 0.5 - 20;
			if ( hasOkButton() ) {
				_okButton.x = _window.x + ( hasCancelButton() ? _window.width * 0.5 - 10 - _okButton.width : ( ( _window.width - _okButton.width ) * 0.5 ) );
				_okButton.y = _window.y + _window.height - _okButton.height - 30;
			}
	
			_cancelButton.width = _okButton.width;
			if ( hasCancelButton() ) {
				_cancelButton.x = _window.x + ( hasOkButton() ? _window.width * 0.5 + 10 : ( ( _window.width - _cancelButton.width ) * 0.5 ) );
				_cancelButton.y = _window.y + _window.height - _cancelButton.height - 30;
			}
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function hasOkButton() {
			return _scope.contains( _okButton );
		}
		
		function hasCancelButton() {
			return _scope.contains( _cancelButton );
		}
		
		function drawButtonStyle( target ) {
			target.addClass( "notification-window-view--button" );
			target.height = 42;
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


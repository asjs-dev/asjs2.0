includeOnce( "com/asjs/mediator/AbstractResizeMediator.js" );
includeOnce( "com/external/module/content/view/EContentView.js" );

var EContentMediator = createClass( AbstractResizeMediator, null, 
	function( _scope, _super, _protected ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		_protected.handlers.push( EContentMediator.SHOW );
		
		// private variable
		var _contentView = new EContentView();
		
		// constructor
		_scope.new = function() {
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
				case EContentMediator.SHOW: onShow();
				break;
			}
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onShow() {
			if ( !_protected.view.contains( _contentView ) ) _protected.view.addChild( _contentView );
			_protected.showView();
		}
		
		function onHide() {
			if ( _protected.view.contains( _contentView ) ) _protected.view.removeChild( _contentView );
		}
		
	}
);
// public static const
cnst( EContentMediator, "SHOW", "EContentMediator-show" );

// public static variable

// public static property

// public static function


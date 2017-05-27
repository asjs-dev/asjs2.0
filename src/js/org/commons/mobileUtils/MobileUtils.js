var MobileUtils = {};
createSingletonClass( MobileUtils, Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _dpi;
		var _baseSize;
		var _type;
		var _useDPI;
		var _useScreenSize;
		
		// constructor
		_scope.new = function() {
			_dpi = 1;
	
			_baseSize = 0;
	
			_type = MobileUtils.TYPE_WIDTH;
			_useDPI = false;
			_useScreenSize = false;
		}
		
		// public property
		prop( _scope, "width", {
			get: function() { return _useScreenSize ? stage.screenWidth : stage.stageWidth; }
		});

		prop( _scope, "height", {
			get: function() { return _useScreenSize ? stage.screenHeight : stage.stageHeight; }
		});
		
		prop( _scope, "type", {
			get: function() { return _type; },
			set: function( v ) { _type = v; }
		});

		prop( _scope, "useDPI", {
			get: function() { return _useDPI; },
			set: function( v ) {
				_useDPI = v;
				calcDPI();
			}
		});

		prop( _scope, "useScreenSize", {
			get: function() { return _useScreenSize; },
			set: function( v ) { _useScreenSize = v; }
		});

		prop( _scope, "baseSize", {
			get: function() { return _baseSize; },
			set: function( v ) {
				_baseSize = v;
				calcDPI();
			}
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.getOrientation = function() {
			return _scope.width > _scope.height ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}

		_scope.getBrowserOrientation = function() {
			return stage.stageWidth > stage.stageHeight ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}

		_scope.getDeviceOrientation = function() {
			return stage.screenWidth > stage.screenHeight ? MobileUtils.ORIENTATION_LANDSCAPE : MobileUtils.ORIENTATION_PORTRAIT;
		}

		_scope.getDPI = function() {
			return _dpi;
		}

		_scope.getScreenWidth = function( fp ) {
			if ( fp ) return _scope.width;
			switch ( _scope.type ) {
				case MobileUtils.TYPE_WIDTH: return _scope.width;
				break;
				case MobileUtils.TYPE_HEIGHT: return _scope.height;
				break;
				case MobileUtils.TYPE_MINIMUM: return Math.min( _scope.width, _scope.height );
				break;
				case MobileUtils.TYPE_MAXIMUM: return Math.max( _scope.width, _scope.height );
				break;
			}
		}

		_scope.getRatio = function( fp ) {
			return _scope.getScreenWidth( fp ) / _scope.baseSize;
		}

		_scope.convertRatio = function( v, fp, useDPI ) {
			return Math.floor( ( _scope.getRatio( fp ) * v ) * ( useDPI || _scope.useDPI ? _scope.getDPI() : 1 ) );
		}

		_scope.preventMobileScrolling = function() {
			stage.addEventListener( ASJS.MouseEvent.TOUCH_MOVE, function( e ) { e.preventDefault(); } );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function calcDPI() {
			_dpi = Math.min( 2, Math.max( 1, _window.devicePixelRatio || ( _window.screen.deviceXDPI / _window.screen.logicalXDPI ) || 1 ) );
		}
	}
);
// public static const
cnst( MobileUtils, "ORIENTATION_LANDSCAPE", "MobileUtils-orientationLandscape" );
cnst( MobileUtils, "ORIENTATION_PORTRAIT",  "MobileUtils-orientationPortrait" );
cnst( MobileUtils, "TYPE_MINIMUM",          "MobileUtils-typeMin" );
cnst( MobileUtils, "TYPE_MAXIMUM",          "MobileUtils-typeMax" );
cnst( MobileUtils, "TYPE_WIDTH",            "MobileUtils-typeWidth" );
cnst( MobileUtils, "TYPE_HEIGHT",           "MobileUtils-typeHeight" );

// public static variable

// public static property

// public static function


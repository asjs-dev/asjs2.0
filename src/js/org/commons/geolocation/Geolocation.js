includeOnce( "org/commons/geolocation/GeolocationData.js" );

var Geolocation = {};
createSingletonClass( Geolocation, ASJS.EventDispatcher, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _geolocation;
		var _watchID;
		var _location = new GeolocationData();
		
		// constructor
		
		// public property
		prop( _scope, "location", {
			get: function() { return _location; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.start = function( enableHighAccuracy, timeout, maximumAge ) {
			_scope.stop();
			if ( !_geolocation ) _geolocation = getGeolocation();
	
			if ( _geolocation ) {
				var obj = {
					'enableHighAccuracy': enableHighAccuracy || false,
					'timeout': timeout || 10000,
					'maximumAge': maximumAge || 60000
				}
				_watchID = _geolocation.watchPosition( setGeoDatas, errorGettingPosition, obj );
			} else errorGettingPosition( { code: "not_supported" } );
		}

		_scope.stop = function() {
			if ( _geolocation && _watchID ) _geolocation.clearWatch( _watchID );
		}

		_scope.isSupported = function() {
			return getGeolocation() != null;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function getGeolocation() {
			return _window.navigator.geolocation || null;
		}

		function setGeoDatas( position ) {
			_location = new GeolocationData( position.coords );

			_scope.dispatchEvent( Geolocation.UPDATED, _location );
		}

		function errorGettingPosition( error ) {
			_scope.dispatchEvent( Geolocation.ERROR, error );
		}
	}
);
// public static const
msg( Geolocation, "UPDATED", "updated" );
msg( Geolocation, "ERROR",   "error" );

// public static variable

// public static property

// public static function


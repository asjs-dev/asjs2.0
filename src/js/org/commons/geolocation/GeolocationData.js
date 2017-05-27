var GeolocationData = createClass( Object, null, 
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		_scope.latitude;
		_scope.longitude;
		_scope.altitude;
		_scope.accuracy;
		_scope.altitudeAccuracy;
		_scope.heading;
		_scope.speed;
		
		// protected variable
		
		// private variable
		
		// constructor
		_scope.new = function( data ) {
			var d = data || {};
			
			_scope.latitude = d.latitude || 0;
			_scope.longitude = d.longitude || 0;
			_scope.altitude = d.altitude || 0;
			_scope.accuracy = d.accuracy || 0;
			_scope.altitudeAccuracy	= d.altitudeAccuracy || 0;
			_scope.heading = d.heading || 0;
			_scope.speed = d.speed || 0;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


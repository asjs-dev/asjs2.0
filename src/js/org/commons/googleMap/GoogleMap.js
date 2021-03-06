var GoogleMap = createClass( ASJS.Sprite, [ "p" ], 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _latitude = 0;
		var _longitude = 0;
		var _zoom = 4;
		var _options = {};
		var _map;
		
		// constructor
		_scope.new = function() {
			_scope.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
	
			_scope.options = {
				center: _scope.latLng,
				zoom: _scope.zoom,
				mapTypeControlOptions: {
					mapTypeIds: []
				},
				zoomControl: true,
				disableDefaultUI: true,
				zoomControlOptions: {},
				panControl: false,
				scaleControl: false,
				streetViewControl: false,
				draggable: true
			};
	
			google.maps.visualRefresh = true;
			_map = new google.maps.Map( _scope.el, _scope.options );
			_map.addListener( 'center_changed', onCenterChanged );
		}
		
		// public property
		prop( _scope, "map", {
			get: function() { return _map; }
		});

		prop( _scope, "options", {
			get: function() { return _options; },
			set: function( v ) { _options = v; }
		});

		prop( _scope, "latitude", {
			get: function() { return _latitude; },
			set: function( v ) {
				_latitude = v;
				_map.panTo( _scope.latLng );
			}
		});

		prop( _scope, "longitude", {
			get: function() { return _longitude; },
			set: function( v ) {
				_longitude = v;
				_map.panTo( _scope.latLng );
			}
		});

		prop( _scope, "latLng", {
			get: function() { return new google.maps.LatLng( _scope.latitude, _scope.longitude ); }
		});

		prop( _scope, "zoom", {
			get: function() { return _zoom; },
			set: function( v ) {
				_zoom = v;
				_map.setZoom( _zoom );
			}
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.setPosition = function( latitude, longitude ) {
			_latitude = latitude;
			_longitude = longitude;
			_map.panTo( _scope.latLng );
		}

		_scope.destruct = function() {
			google.maps.event.clearListeners( _map, 'center_changed' );
			_map = null;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onCenterChanged() {
			var latLng = _map.getCenter();
			_latitude = latLng.lat();
			_longitude = latLng.lng();
		}

		function addedToStage() {
			google.maps.event.trigger( _map, 'resize' );
		}
	}
);
// public static const
msg( GoogleMap, "CLICK", "click" );

// public static variable

// public static property

// public static function


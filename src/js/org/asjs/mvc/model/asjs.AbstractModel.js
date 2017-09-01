includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.AbstractModel = createClass( ASJS.EventDispatcher, null,
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "PREFIX", "ASJS-AbstractModel-" );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _data = {};
		
		// constructor
		
		// public property
		prop( _scope, "data", {
			get: function() { return _data; },
			set: function( v ) {
				_data = v;
				_scope.dispatchEvent( ASJS.AbstractModel.CHANGED );
			}
		});
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.get = function( k ) {
			return _data && _data[ k ] != undefined ? _data[ k ] : null;
		}

		_scope.set = function( k, v ) {
			if ( !_data ) _data = {};
			var o = _data[ k ];
			_data[ k ] = v;
			_scope.dispatchEvent( ASJS.AbstractModel.CHANGED );
			_scope.dispatchEvent( priv.PREFIX + k, [ o, v ] );
		}

		_scope.clear = function() {
			_data = null;
			_scope.dispatchEvent( ASJS.AbstractModel.CLEARED );
		}

		_scope.watch = function( k, l ) {
			_scope.addEventListener( priv.PREFIX + k, l );
		}

		_scope.merge = function( d ) {
			merge( _data, d );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function merge( oData, nData ) {
			for ( var nk in nData ) {
				if ( typeof oData[ nk ] == "object" ) merge( oData[ nk ], nData[ nk ] );
				else oData[ nk ] = nData[ nk ];
			}
		}
	}
);
// public static const
msg( ASJS.AbstractModel, "CHANGED", "changed" );
msg( ASJS.AbstractModel, "CLEARED", "cleared" );

// public static variable

// public static property

// public static function


var WS = createClass( ASJS.EventDispatcher, null, 
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "RECONNECT_INTERVALS", [ 1, 2, 3, 15, 30, 60, 120, 240, 300 ] );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window;
		var _reconnectCounter = 0;
		var _tryToReconnect;
		var _reconnectTimeoutId;
		var _url;
		var _ws;
		
		// constructor
		
		// public property
		prop( _scope, "url", {
			get: function() { return _url; }
		});

		prop( _scope, "isOpen", {
			get: function() { return _scope.readyState == WS.OPEN; }
		});

		prop( _scope, "readyState", {
			get: function() { return _ws ? _ws.readyState : WS.CLOSED; }
		});

		prop( _scope, "protocol", {
			get: function() { return _ws ? _ws.protocol : null; }
		});

		prop( _scope, "bufferedAmount", {
			get: function() { return _ws ? _ws.bufferedAmount : 0; }
		});

		prop( _scope, "tryToReconnect", {
			get: function() { return _tryToReconnect; },
			set: function( v ) { _tryToReconnect = v; }
		});
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.connect = function( url ) {
			_url = url;
	
			if ( _ws ) {
				if ( _scope.isOpen ) _ws.close();
				_ws = null;
			}
	
			_ws = new WebSocket( _url );
			_ws.onopen = onOpen;
			_ws.onclose = onClose;
			_ws.onmessage = onMessage;
			_ws.onerror = onError;
		}

		_scope.send = function( data ) {
			if ( _scope.isOpen ) _ws.send( data );
		}

		_scope.close = function() {
			if ( _scope.isOpen ) _ws.close();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onOpen( e ) {
			_reconnectCounter = 0;
			_scope.dispatchEvent( WS.ON_OPEN );
		}

		function onClose( e ) {
			_scope.dispatchEvent( WS.ON_CLOSED );
			if ( !e.wasClean && _scope.tryToReconnect ) {
				_reconnectCounter = Math.min( priv.RECONNECT_INTERVALS.length - 1, _reconnectCounter + 1 );
				var timeout = priv.RECONNECT_INTERVALS[ _reconnectCounter ];
				_scope.dispatchEvent( WS.ON_RECONNECT, timeout );
				_window.clearTimeout( _reconnectTimeoutId );
				_reconnectTimeoutId = _window.setTimeout( reconnect, timeout * 1000 );
			}
		}

		function reconnect() {
			_window.clearTimeout( _reconnectTimeoutId );
			_scope.connect( _url );
		}

		function onMessage( e ) {
			_scope.dispatchEvent( WS.ON_MESSAGE, e.data );
		}

		function onError( e ) {
			_scope.dispatchEvent( WS.ON_ERROR, e );
		}
	}
);
// public static const
cnst( WS, "CONNECTING",   0 );
cnst( WS, "OPEN",         1 );
cnst( WS, "CLOSING",      2 );
cnst( WS, "CLOSED",       3 );
msg( WS, "ON_OPEN",      "onOpen" );
msg( WS, "ON_CLOSED",    "onClosed" );
msg( WS, "ON_ERROR",     "onError" );
msg( WS, "ON_MESSAGE",   "onMessage" );
msg( WS, "ON_RECONNECT", "onReconnect" );

// public static variable

// public static property

// public static function


includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );

ASJS.Loader = function() {
	return createClass( this, ASJS.EventDispatcher, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _async = true;
			var _method = ASJS.RequestMethod.GET;
			var _headers = {};
			var _responseType = "text";
			var _request;
			var _username;
			var _password;
			var _url;
			var _data;
			
			// constructor
			_scope.new = function() {
				reset();
			}
			
			// public property
			prop( _scope, "url", {
				get: function() { return _url; }
			});
	
			prop( _scope, "content", {
				get: function() {
					if ( _responseType == "json" && typeof _request.response == "string" ) return JSON.parse( _request.response );
                	return _request.response;
                }
			});
	
			prop( _scope, "status", {
				get: function() { return _request.status; }
			});
	
			prop( _scope, "statusText", {
				get: function() { return _request.statusText; }
			});
	
			prop( _scope, "readyState", {
				get: function() { return _request.readyState; }
			});

			prop( _scope, "contentType", {
				set: function( v ) { _headers[ "Content-type" ] = v; }
			});
	
			prop( _scope, "username", {
				set: function( v ) { _username = v; }
			});
	
			prop( _scope, "password", {
				set: function( v ) { _password = v; }
			});
	
			prop( _scope, "data", {
				set: function( v ) { _data = v; }
			});
	
			prop( _scope, "async", {
				set: function( v ) { _async = v; }
			});
	
			prop( _scope, "method", {
				set: function( v ) { _method = v; }
			});
	
			prop( _scope, "responseType", {
				set: function( v ) { _responseType = v; }
			});
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.unload = function() {
				_scope.free();
			}
			
			_scope.setHeader = function( k, v ) {
				_headers[ k ] = v;
			};
	
			_scope.getHeader = function( k ) {
				return _request.getRequestHeader( k );
			};
	
			_scope.cancel = function() {
				_request.abort();
			};
	
			_scope.load = function( url ) {
				if ( !url ) return;
				_url = url;
		
				_request.open( _method, _url, _async, _username, _password );
				_request.responseType = _responseType;
				for ( var k in _headers ) _request.setRequestHeader( k, _headers[ k ] );
				_request.send( _data );
			};
			
			_scope.free = function() {
				reset();
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function reset() {
				_request = null;
				_request = new XMLHttpRequest();
				if ( "withCredentials" in _request ) {
				} else if ( typeof XDomainRequest != "undefined" ) _request = new XDomainRequest();
				else _request = null;
		
				if ( _request == null ) throw new Error( "CORS not supported" );
				_request.withCredentials = true;
		
				_request.addEventListener( ASJS.LoaderEvent.READY_STATE_CHANGE,	onReadyStateChange );
				_request.addEventListener( ASJS.LoaderEvent.PROGRESS,			onProgress );
				_request.addEventListener( ASJS.LoaderEvent.LOAD,				onLoad );
				_request.addEventListener( ASJS.LoaderEvent.ERROR,				onError );
				_request.addEventListener( ASJS.LoaderEvent.ABORT,				onAbort );
				_request.addEventListener( ASJS.LoaderEvent.LOAD_START,			onLoadStart );
				_request.addEventListener( ASJS.LoaderEvent.TIMEOUT,			onTimeout );
				_request.addEventListener( ASJS.LoaderEvent.LOAD_END,			onLoadEnd );
			}
			
			function onReadyStateChange( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.READY_STATE_CHANGE, e );
			};

			function onLoadStart() {
				_scope.dispatchEvent( ASJS.LoaderEvent.LOAD_START );
			};

			function onProgress( e ) {
				if ( e.lengthComputable ) _scope.dispatchEvent( ASJS.LoaderEvent.PROGRESS, e );
			};

			function onLoad( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.LOAD, e );
			};

			function onAbort( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.ABORT, e );
			};

			function onTimeout( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.TIMEOUT, e );
			};

			function onLoadEnd( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.LOAD_END, e );
			};

			function onError( e ) {
				_scope.dispatchEvent( ASJS.LoaderEvent.ERROR, e );
			};
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


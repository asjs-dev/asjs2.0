includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );
includeOnce( "org/asjs/event/asjs.WindowEvent.js" );

ASJS.Window = function() {
	return createSingletonClass( ASJS.Window, this, ASJS.EventDispatcher, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
				
			// private variable
			var _el = window;
			var _browserStatus;
			var _requestAnimationFrame;
			var _cancelAnimationFrame;
			var _audioContext;
			var _navigator;
			var _userMedia;
			var _url;
			
			// constructor
			_scope.new = function() {
				for ( var key in _el ) {
					if( key.search( 'on' ) === 0 ) _el.addEventListener( key.slice( 2 ), function( e ) {
						_scope.dispatchEvent( e );
					});
				}
				
				_requestAnimationFrame = _scope.el.requestAnimationFrame
					|| _scope.el.mozRequestAnimationFrame
					|| _scope.el.webkitRequestAnimationFrame
					|| _scope.el.msRequestAnimationFrame
					|| function( f ) { return setTimeout( f, 1 ) };
				
				_cancelAnimationFrame = _scope.el.cancelAnimationFrame || _scope.el.webkitCancelAnimationFrame;
				_navigator = _scope.el.navigator || navigator;
				_audioContext = _scope.el.AudioContext || _scope.el.webkitAudioContext;
				_userMedia = _navigator.getUserMedia || _navigator.webkitGetUserMedia || _navigator.msGetUserMedia || _navigator.mozGetUserMedia;
				_url = _scope.el.webkitURL || _scope.el.URL;
				
				_browserStatus = _navigator.onLine ? ASJS.WindowEvent.ONLINE : ASJS.WindowEvent.OFFLINE;
				_scope.addEventListener( ASJS.WindowEvent.ONLINE + " " + ASJS.WindowEvent.OFFLINE, function( e ) {
					_browserStatus = e.type;
				});
			}
			
			// public property
			prop( _scope, "el", {
				get: function() { return _el; }
			});
			
			prop( _scope, "isOnline", {
				get: function() { return _browserStatus == ASJS.WindowEvent.ONLINE; }
			});
	
			prop( _scope, "width", {
				get: function() { return _scope.el.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; }
			});
	
			prop( _scope, "height", {
				get: function() { return _scope.el.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; }
			});
	
			prop( _scope, "screen", {
				get: function() { return _scope.el.screen; }
			});
	
			prop( _scope, "screenTop", {
				get: function() { return _scope.screen.availTop; }
			});
	
			prop( _scope, "screenLeft", {
				get: function() { return _scope.screen.availLeft; }
			});
	
			prop( _scope, "screenWidth", {
				get: function() { return _scope.screen.width; }
			});
	
			prop( _scope, "screenHeight", {
				get: function() { return _scope.screen.height; }
			});
	
			prop( _scope, "screenAvailWidth", {
				get: function() { return _scope.screen.availWidth; }
			});
	
			prop( _scope, "screenAvailHeight", {
				get: function() { return _scope.screen.availHeight; }
			});
	
			prop( _scope, "url", {
				get: function() { return _url; }
			});
		
			prop( _scope, "navigator", {
				get: function() { return _navigator; }
			});
	
			prop( _scope, "audioContext", {
				get: function() { return _audioContext; }
			});
	
			prop( _scope, "userMedia", {
				get: function() { return _userMedia; }
			});
	
			prop( _scope, "devicePixelRatio", {
				get: function() { return _scope.el.devicePixelRatio; }
			});
			
			prop( _scope, "scrollTop", {
				get: function() { return ( _scope.el.pageYOffset != undefined ? _scope.el.pageYOffset : document.scrollTop ) - ( document.clientTop || 0 ); },
				set: function( v ) { _scope.el.scrollTo( _scope.scrollLeft, v ); }
			});
	
			prop( _scope, "scrollLeft", {
				get: function() { return ( _scope.el.pageXOffset != undefined ? _scope.el.pageXOffset : document.scrollLeft ) - ( document.clientLeft || 0 ); },
				set: function( v ) { _scope.el.scrollTo( v, _scope.scrollTop ); }
			});
	
			prop( _scope, "location", {
				get: function() { return _scope.el.location; },
				set: function( v ) { _scope.el.location = v; }
			});
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.setTimeout = function( callback, duration ) {
				return _scope.el.setTimeout( function() {
					_scope.requestAnimationFrame( callback );
				}, duration );
			};
	
			_scope.clearTimeout = function( id ) {
				return _scope.el.clearTimeout( id );
			};
	
			_scope.setInterval = function( callback, duration ) {
				return _scope.el.setInterval( function() {
					_scope.requestAnimationFrame( callback );
				}, duration );
			};
	
			_scope.clearInterval = function( id ) {
				return _scope.el.clearInterval( id );
			};
	
			_scope.requestAnimationFrame = function( callback ) {
				return _requestAnimationFrame( callback );
			};
			
			_scope.cancelAnimationFrame = function( id ) {
				_cancelAnimationFrame( id );
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


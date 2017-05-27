ASJS.Polyfill = {};
createSingletonClass( ASJS.Polyfill, Object, null,
	function( _scope, _super ) {
		var _vendors = [ 'ms', 'moz', 'webkit', 'o' ];
		var _doc = document;
		var _win = window;
		
		var _addEventListener    = "addEventListener";
		var _removeEventListener = "removeEventListener";
		var _dispatchEvent       = "dispatchEvent";

		_scope.new = function() {
			checkCustomEvent();
			checkEventListeners();
			checkAnimationFrame();
			checkNavigator();
			checkAudioContext();
			checkUserMedia();
			checkURL();
			checkFullscreenEnabled();
			checkFunctionName();
			checkMediaSource();
		}
		
		prop( _scope, "addEventListener", {
			get: function() { return _addEventListener; }
		});
		
		prop( _scope, "removeEventListener", {
			get: function() { return _removeEventListener; }
		});
		
		prop( _scope, "dispatchEvent", {
			get: function() { return _dispatchEvent; }
		});
		
		function checkCustomEvent() {
			if ( typeof _win.CustomEvent === "function" ) return false;
			trace( "window.CustomEvent is not supported, but replaceable" );

			function CustomEvent( evt, p ) {
				p = p || { bubbles: true, cancelable: true, detail: undefined };
				if ( p.bubbles == undefined ) p.bubbles = true;
				var e = _doc.createEvent( 'CustomEvent' );
					e.initCustomEvent( evt, p.bubbles, p.cancelable, p.detail );
				return e;
			}

			CustomEvent.prototype = _win.Event.prototype;

			_win.CustomEvent = CustomEvent;
		};

		function checkAnimationFrame() {
			var lastTime = 0;
			for ( var x = 0; x < _vendors.length && !_win.requestAnimationFrame; ++x ) {
				_win.requestAnimationFrame = _win[ _vendors[ x ] + 'RequestAnimationFrame' ];
				_win.cancelAnimationFrame = _win[ _vendors[ x ] + 'CancelAnimationFrame' ] || _win[ _vendors[ x ] + 'CancelRequestAnimationFrame' ];
			}

			if ( !_win.requestAnimationFrame ) {
				trace( "window.requestAnimationFrame is not supported, but replaceable" );
				_win.requestAnimationFrame = function( callback, element ) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
					var id = _win.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
					lastTime = currTime + timeToCall;
					return id;
				};
			}

			if ( !_win.cancelAnimationFrame ) {
				trace( "window.cancelAnimationFrame is not supported, but replaceable" );
				_win.cancelAnimationFrame = function( id ) {
					clearTimeout(id);
				};
			}
		};

		function checkNavigator() {
			if ( !_win.navigator ) _win.navigator = navigator;
			if ( !_win.navigator ) trace( "window.navigator is not supported!" );
		};

		function checkAudioContext() {
			if ( !_win.AudioContext ) _win.AudioContext = _win.webkitAudioContext;
			if ( !_win.AudioContext ) trace( "window.AudioContext is not supported!" );
		};

		function checkUserMedia() {
			for ( var x = 0; x < _vendors.length && !_win.navigator.getUserMedia; ++x ) {
				_win.navigator.getUserMedia = _win.navigator[ _vendors[ x ] + 'GetUserMedia' ];
			}
			if ( !_win.navigator.getUserMedia ) trace( "window.navigator.getUserMedia is not supported!" );
		};

		function checkURL() {
			_win.URL = _win.webkitURL || _win.URL;
			if ( !_win.URL ) trace( "window.URL is not supported!" );
		};

		function checkFullscreenEnabled() {
			var pollute = true;
			var api;
			var vendor;
			var apis = {
					w3: {
						enabled: "fullscreenEnabled",
						element: "fullscreenElement",
						request: "requestFullscreen",
						exit:    "exitFullscreen",
						events: {
							change: "fullscreenchange",
							error:  "fullscreenerror"
						}
					},
					webkit: {
						enabled: "webkitFullscreenEnabled",
						element: "webkitCurrentFullScreenElement",
						request: "webkitRequestFullscreen",
						exit:    "webkitExitFullscreen",
						events: {
							change: "webkitfullscreenchange",
							error:  "webkitfullscreenerror"
						}
					},
					moz: {
						enabled: "mozFullScreenEnabled",
						element: "mozFullScreenElement",
						request: "mozRequestFullScreen",
						exit:    "mozCancelFullScreen",
						events: {
							change: "mozfullscreenchange",
							error:  "mozfullscreenerror"
						}
					},
					ms: {
						enabled: "msFullscreenEnabled",
						element: "msFullscreenElement",
						request: "msRequestFullscreen",
						exit:    "msExitFullscreen",
						events: {
							change: "MSFullscreenChange",
							error:  "MSFullscreenError"
						}
					}
				};
			var w3 = apis.w3;

			for ( vendor in apis ) {
				if ( apis[ vendor ].enabled in _doc ) {
					api = apis[ vendor ];
					break;
				}
			}

			function dispatch( type, target ) {
				var event = _doc.createEvent( "Event" );
					event.initEvent( type, true, false );
				target[ _dispatchEvent ]( event );
			}

			function handleChange( e ) {
				e.stopPropagation();
				e.stopImmediatePropagation();

				_doc[ w3.enabled ] = _doc[ api.enabled ];
				_doc[ w3.element ] = _doc[ api.element ];

				//dispatch( w3.events.change, e.target );
			}

			function handleError( e ) {
				//dispatch( w3.events.error, e.target );
			}

			function createResolver( method ) {
				return function resolver( resolve, reject ) {
					if ( method === w3.exit && !_doc[ api.element ] ) {
						setTimeout(function() {
							reject( new TypeError() );
						}, 1 );
						return;
					}

					function change() {
						resolve();
						_doc[ _removeEventListener ]( api.events.change, change, false );
					}

					function error() {
						reject( new TypeError() );
						_doc[ _removeEventListener ]( api.events.error, error, false );
					}

					_doc[ _addEventListener ]( api.events.change, change, false );
					_doc[ _addEventListener ]( api.events.error,  error,  false );
				};
			}

			if ( pollute && !( w3.enabled in _doc ) && api ) {
				_doc[ _addEventListener ]( api.events.change, handleChange, false );
				_doc[ _addEventListener ]( api.events.error,  handleError,  false );

				_doc[ w3.enabled ] = _doc[ api.enabled ];
				_doc[ w3.element ] = _doc[ api.element ];

				_doc[ w3.exit ] = function() {
					var result = _doc[ api.exit ]();
					return !result && _win.Promise ? new Promise( createResolver( w3.exit ) ) : result;
				};

				Element.prototype[ w3.request ] = function () {
					var result = this[ api.request ].apply( this, arguments );
					return !result && _win.Promise ? new Promise( createResolver( w3.request ) ) : result;
				};
			}
		};

		function checkFunctionName() {
			if ( checkFunctionName.name && typeof checkFunctionName.name == "string" ) return;
			prop( Function.prototype, "name", {
				get: function() {
					var matches = this.toString().match( /^function\s*([^\s(]+)/ );
					if ( matches ) return matches[ 1 ];
					return null;
				}
			});
		}

		function checkEventListeners() {
			var p = _doc.createElement( "p" );
	
			if ( p.addEventListener ) return;
			
			_addEventListener    = "attachEvent";
			_removeEventListener = "detachEvent";
			_dispatchEvent       = "fireEvent";
		}

		function checkMediaSource() {
			_win.MediaSource = _win.MediaSource || _win.WebKitMediaSource;
		}
	}
);

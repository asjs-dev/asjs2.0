(function() {
	var _vendors = [ 'ms', 'moz', 'webkit', 'o' ];
	
	function checkCustomEvent() {
		if ( typeof window.CustomEvent === "function" ) return false;
		trace( "window.CustomEvent is not supported, but replaceable" );

		function CustomEvent ( evt, p ) {
			p = p || { bubbles: false, cancelable: false, detail: undefined };
			var e = document.createEvent( 'CustomEvent' );
				e.initCustomEvent( evt, p.bubbles, p.cancelable, p.detail );
			return e;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	};
	
	function checkAnimationFrame() {
		var lastTime = 0;
		for ( var x = 0; x < _vendors.length && !window.requestAnimationFrame; ++x ) {
			window.requestAnimationFrame = window[ _vendors[ x ] + 'RequestAnimationFrame' ];
			window.cancelAnimationFrame = window[ _vendors[ x ] + 'CancelAnimationFrame' ] || window[ _vendors[ x ] + 'CancelRequestAnimationFrame' ];
		}

		if ( !window.requestAnimationFrame ) {
			trace( "window.requestAnimationFrame is not supported, but replaceable" );
			window.requestAnimationFrame = function( callback, element ) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if ( !window.cancelAnimationFrame ) {
			trace( "window.cancelAnimationFrame is not supported, but replaceable" );
			window.cancelAnimationFrame = function( id ) {
				clearTimeout(id);
			};
		}
	};
	
	function checkNavigator() {
		if ( !window.navigator ) window.navigator = navigator;
		if ( !window.navigator ) trace( "window.navigator is not supported!" );
	};
	
	function checkAudioContext() {
		if ( !window.AudioContext ) window.AudioContext = window.webkitAudioContext;
		if ( !window.AudioContext ) trace( "window.AudioContext is not supported!" );
	};
	
	function checkUserMedia() {
		for ( var x = 0; x < _vendors.length && !window.navigator.getUserMedia; ++x ) {
			window.navigator.getUserMedia = window.navigator[ _vendors[ x ] + 'GetUserMedia' ];
		}
		if ( !window.navigator.getUserMedia ) trace( "window.navigator.getUserMedia is not supported!" );
	};
	
	function checkURL() {
		window.URL = window.webkitURL || window.URL;
		if ( !window.URL ) trace( "window.URL is not supported!" );
	};
	
	function checkFullscreenEnabled() {
		var pollute = true,
			doc = document,
			api,
			vendor,
			apis = {
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
			},
			w3 = apis.w3;

		for ( vendor in apis ) {
			if ( apis[ vendor ].enabled in doc ) {
				api = apis[ vendor ];
				break;
			}
		}

		function dispatch( type, target ) {
			var event = doc.createEvent( "Event" );
				event.initEvent( type, true, false );
			target.dispatchEvent( event );
		}

		function handleChange( e ) {
			e.stopPropagation();
			e.stopImmediatePropagation();

			doc[ w3.enabled ] = doc[ api.enabled ];
			doc[ w3.element ] = doc[ api.element ];

			//dispatch( w3.events.change, e.target );
		}

		function handleError( e ) {
			//dispatch( w3.events.error, e.target );
		}

		function createResolver( method ) {
			return function resolver( resolve, reject ) {
				if ( method === w3.exit && !doc[ api.element ] ) {
					setTimeout(function() {
						reject( new TypeError() );
					}, 1 );
					return;
				}

				function change() {
					resolve();
					doc.removeEventListener( api.events.change, change, false );
				}

				function error() {
					reject(new TypeError());
					doc.removeEventListener( api.events.error, error, false );
				}

				doc.addEventListener( api.events.change, change, false );
				doc.addEventListener( api.events.error,  error,  false );
			};
		}

		if ( pollute && !( w3.enabled in doc ) && api ) {
			doc.addEventListener( api.events.change, handleChange, false );
			doc.addEventListener( api.events.error,  handleError,  false );

			doc[ w3.enabled ] = doc[ api.enabled ];
			doc[ w3.element ] = doc[ api.element ];

			doc[ w3.exit ] = function() {
				var result = doc[ api.exit ]();
				return !result && window.Promise ? new Promise( createResolver( w3.exit ) ) : result;
			};

			Element.prototype[ w3.request ] = function () {
				var result = this[ api.request ].apply( this, arguments );
				return !result && window.Promise ? new Promise( createResolver( w3.request ) ) : result;
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
	
	checkCustomEvent();
	checkAnimationFrame();
	checkNavigator();
	checkAudioContext();
	checkUserMedia();
	checkURL();
	checkFullscreenEnabled();
	checkFunctionName();
})();

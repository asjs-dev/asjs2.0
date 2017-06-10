ASJS.Polyfill = {};
createSingletonClass( ASJS.Polyfill, ASJS.BaseClass, null,
	function( _scope ) {
		var _vendors = [ 'ms', 'moz', 'webkit', 'o' ];
		var _doc = document;
		var _win = window;
		
		var _eventTypePrefix = "";
		var _stylePrefixJS = "";
		var _stylePrefixCSS = "";
		
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
			checkCSSPrefix();
		}
		
		prop( _scope, "eventTypePrefix", {
			get: function() { return _eventTypePrefix; }
		});
	
		prop( _scope, "stylePrefixJS", {
			get: function() { return _stylePrefixJS; }
		});
	
		prop( _scope, "stylePrefixCSS", {
			get: function() { return _stylePrefixCSS; }
		});
	
		_scope.convertEventType = function( type ) {
			if ( type.indexOf( _eventTypePrefix ) != 0 ) return _eventTypePrefix + type;
			return type;
		}
	
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
			var api;
			var vendor;
			var apis = {
					w3: {
						fullscreen: "fullScreen",
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
						fullscreen: "webkitFullScreen",
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
						fullscreen: "mozFullScreen",
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
						fullscreen: "msFullScreen",
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

			if ( !( w3.enabled in _doc ) && api ) {
				_doc[ "fullscreenEnabled" ] = _doc[ api.enabled ];
				_doc[ "fullscreen" ] = _doc[ api.fullscreen ];
				_doc[ "fullscreenElement" ] = _doc[ api.element ];
				_doc[ "exitFullscreen" ] = _doc[ api.exit ];
				
				Element.prototype.requestFullscreen = Element.prototype[ api.request ];
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
			
			Element.prototype.addEventListener    = Element.prototype.attachEvent;
			Element.prototype.removeEventListener = Element.prototype.detachEvent;
			Element.prototype.dispatchEvent       = Element.prototype.fireEvent;
			
			_eventTypePrefix = "on";
		}

		function checkMediaSource() {
			_win.MediaSource = _win.MediaSource || _win.WebKitMediaSource;
		}
		
		function checkCSSPrefix() {
			var jsCssMap = {
				Moz: '-moz-',
				ms: '-ms-',
				O: '-o-',
				Webkit: '-webkit-'
			};
			
			var style = document.createElement('p').style;
			var testProp = 'Transform';

			for ( var key in jsCssMap ) {
				if ( ( key + testProp ) in style ) {
					_stylePrefixJS = key;
					_stylePrefixCSS = jsCssMap[ key ];
					break;
				}
			}

			if ( _stylePrefixJS === 'Webkit' && 'msHyphens' in style ) {
				_stylePrefixJS = 'ms';
				_stylePrefixCSS = jsCssMap.ms;
			}
		}
	}
);

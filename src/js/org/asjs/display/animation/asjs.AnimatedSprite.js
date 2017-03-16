includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "org/asjs/utils/asjs.Cycler.js" );

ASJS.AnimatedSprite = function() {
	return createClass( this, ASJS.DisplayObject, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _cycler	= new ASJS.Cycler();
			var _animations = {};
			var _isPlaying = false;
			var _selectedAnimationName = "";
			var _selectedAnimation = "";
			var _step = 0;
			var _repeat = 0;
			var _reverseAnimation = false;
			var _imageCache = [];
			
			// constructor
			_scope.new = function() {
				_scope.stop();
			}
			
			// public property
			prop( _scope, "selectedAnimation", {
				get: function() { return _selectedAnimationName; }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.addAnimationDescriptorList = function( animationDescriptorList ) {
				var i = -1;
				var l = animationDescriptorList.length;
				while ( ++i < l ) _scope.addAnimationDescriptor( animationDescriptorList[ i ] );
			}
	
			_scope.addAnimationDescriptor = function( animationDescriptor ) {
				_animations[ animationDescriptor.name ] = animationDescriptor;
			}
	
			_scope.removeAnimationDescriptor = function( name ) {
				_animations[ name ] = null;
				delete _animations[ name ];
			}
	
			_scope.stop = function() {
				_step = 0;
				_repeat = 0;
				_isPlaying = false;
				_cycler.removeCallback( update );
			}
	
			_scope.play = function( name, type ) {
				if ( !_animations[ name ] ) return;
				_scope.stop();
		
				var reverseAnimation = !type ? false : type == ASJS.AnimatedSprite.PLAY_REVERSE;
				if ( _selectedAnimationName == name && _reverseAnimation == reverseAnimation ) {
					letsPlay();
					return;
				}
		
				_selectedAnimationName = name;
				_selectedAnimation = _animations[ _selectedAnimationName ];
				_reverseAnimation = reverseAnimation;
		
				_step = _reverseAnimation ? _selectedAnimation.sequenceList.length - 1 : 0;
				_repeat = 0;
				var spriteSheet = _selectedAnimation.spriteSheet;
				if ( spriteSheet != "" ) {
					if ( _imageCache.indexOf( spriteSheet ) > -1 ) setSpriteSheet( spriteSheet );
					else {
						var loader = new ASJS.Loader();
							loader.addEventListener( ASJS.LoaderEvent.LOAD, function() {
								_imageCache.push( spriteSheet );
								setSpriteSheet( spriteSheet );
							});
							loader.addEventListener( ASJS.LoaderEvent.ERROR, function() {
								trace( "Error: missing animation sprite sheet" );
							});
							loader.load( spriteSheet );
					}
				} else letsPlay();
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function setSpriteSheet( v ) {
				_scope.setCSS( "background-image", "url(" + v + ")" );
				letsPlay();
			}
			
			function letsPlay() {
				if ( _isPlaying ) return;
				_isPlaying = true;
				_cycler.addCallback( update );
			}
	
			function update() {
				if ( !_isPlaying ) return;
		
				var sequenceList = _selectedAnimation.sequenceList;
		
				var rect = sequenceList[ _step ];
				var size = _selectedAnimation.size;
		
				var percentW = _scope.width / rect.width;
				var percentH = _scope.height / rect.height;
		
				_scope.setCSS( "background-position", ( - rect.x * percentW ) + "px " + ( - rect.y * percentH ) + "px" );
				_scope.setCSS( "background-size", ( size.x * percentW ) + "px " + ( size.y * percentH ) + "px" );
				_scope.setSize( rect.width * percentW, rect.height * percentH );
		
				if ( !_reverseAnimation ) {
					if ( ++_step >= sequenceList.length ) {
						_step = 0;
						_repeat++;
					}
				} else {
					if ( --_step < 0 ) {
						_step = sequenceList.length - 1;
						_repeat++;
					}
				}
				
				if ( _selectedAnimation.repeat > 0 && _repeat == _selectedAnimation.repeat ) _scope.stop();
			}
		}
	);
}
// public static const
cnst( ASJS.AnimatedSprite, "PLAY_NORMAL",  "ASJS-AnimatedSprite-playNormal" );
cnst( ASJS.AnimatedSprite, "PLAY_REVERSE", "ASJS-AnimatedSprite-playReverse" );

// public static variable

// public static property

// public static function


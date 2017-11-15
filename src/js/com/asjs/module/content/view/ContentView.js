includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/view/AbstractView.js" );
includeOnce( "com/asjs/module/content/ContentMediator.js" );
includeOnce( "com/asjs/module/content/view/assets/Box.js" );

var ContentView = createClass( AbstractView, null, 
	function( _scope ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "ANIMATION_EXPLODE_ID", "animationExplode" );
		cnst( priv, "ANIMATION_FIREWORKS_ID", "animationFireworks" );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language;
		var _mouse = ASJS.Mouse;
		var _background = new ASJS.Sprite();
		var _box = new Box();
		var _externalApplicationButton = new ASJS.Button();
		var _animatedSprite = new ASJS.AnimatedSprite();
		var _drag = false;
		var _blurFilter = new ASJS.BlurFilter();
		
		// constructor
		_scope.new = function() {
			_scope.addClass( "content-view" );
			_scope.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
			_scope.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {
			_background.setSize( stage.stageWidth, stage.stageHeight );
			_externalApplicationButton.x = 
			_box.x = ( stage.stageWidth - _box.width ) * 0.5;
		}

		_scope.init = function( data ) {
			_background.addClass( "background" );
			_background.setCSS( "position", "fixed" );
			_background.alpha = 0.5;
			_scope.addChild( _background );
	
			_box.y = 100;
			_scope.addChild( _box );
	
			_animatedSprite.addAnimationDescriptorList( data );
			_animatedSprite.move( 10, 10 );
			_scope.addChild( _animatedSprite );
	
			_animatedSprite.addEventListener( ASJS.MouseEvent.CLICK, onAnimatedSpriteClick );
			_animatedSprite.addEventListener( ASJS.MouseEvent.MOUSE_DOWN + " " + ASJS.MouseEvent.TOUCH_START, onAnimatedSpriteMouseDown );
			
			_externalApplicationButton.label = _language.getText( "show_external_application_button_label" );
			_externalApplicationButton.addClass( "show-external-application-button" );
			_externalApplicationButton.setSize( 320, 40 );
			_externalApplicationButton.y = _box.y + _box.height + 20;
			_externalApplicationButton.addEventListener( ASJS.MouseEvent.CLICK, onExternalApplicationButtonClick );
			_scope.addChild( _externalApplicationButton );
			
			_scope.render();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function addedToStage() {
			stage.addEventListener( ASJS.MouseEvent.MOUSE_UP + " " + ASJS.MouseEvent.TOUCH_END, onDragStop );
			stage.addEventListener( ASJS.MouseEvent.MOUSE_LEAVE, onDragStop );
			stage.addEventListener( ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE, onStageMouseMove );
	
			_scope.addEventListener( ASJS.MouseEvent.CLICK, onMouseClick );
			
			playFireworksAnimation();
		}
		
		function removedFromStage() {
			stage.removeEventListener( ASJS.MouseEvent.MOUSE_UP + " " + ASJS.MouseEvent.TOUCH_END, onDragStop );
			stage.removeEventListener( ASJS.MouseEvent.MOUSE_LEAVE, onDragStop );
			stage.removeEventListener( ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE, onStageMouseMove );
	
			_scope.removeEventListener( ASJS.MouseEvent.CLICK, onMouseClick );
			
			_animatedSprite.stop();
		}

		function playExplodeAnimation() {
			if ( !_animatedSprite ) return;
			_animatedSprite.setSize( 256, 128 );
			_animatedSprite.play( priv.ANIMATION_EXPLODE_ID, ASJS.AnimatedSprite.PLAY_REVERSE );
		}

		function playFireworksAnimation() {
			if ( !_animatedSprite ) return;
			_animatedSprite.setSize( 200, 200 );
			_animatedSprite.play( priv.ANIMATION_FIREWORKS_ID );
		}

		function onAnimatedSpriteClick() {
			if ( _animatedSprite.selectedAnimation == priv.ANIMATION_FIREWORKS_ID ) playExplodeAnimation();
			else playFireworksAnimation();
		}

		function onAnimatedSpriteMouseDown() {
			_drag = true;
		}

		function onDragStop() {
			_drag = false;
		}

		function onStageMouseMove() {
			_blurFilter.value = ( Math.max( 0, stage.stageHeight / ( stage.stageHeight - _mouse.mouseY ) ) / 10 );
			
			_scope.filters = [ _blurFilter ];
			if ( !_drag ) return;
			_animatedSprite.move( _mouse.mouseX - _animatedSprite.width * 0.5, _mouse.mouseY - _animatedSprite.height * 0.5 );
		}

		function onMouseClick() {
			var hitTest = _box.hitTest( new ASJS.Point( _mouse.mouseX, _mouse.mouseY ) );
			_box.label.text = _language.getText( hitTest ? "hit_test_inside" : "hit_test_outside" );
		}
		
		function onExternalApplicationButtonClick() {
			_scope.dispatchEvent( ContentMediator.ON_SHOW_EXTERNAL_APPLICATION );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


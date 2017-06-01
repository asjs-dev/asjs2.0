includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/view/AbstractView.js" );
includeOnce( "com/asjs/module/content/mediator/ContentMediator.js" );

var ContentView = createClass( AbstractView, null, 
	function( _scope, _super ) {
		// private object
		var priv = {};
		
		// private const
		cnst( priv, "ANIMATION_EXPLODE_ID", "animationExplode" );
		cnst( priv, "ANIMATION_FIREWORKS_ID", "animationFireworks" );
		
		// public variable
		
		// protected variable
		
		// private variable
		var _language = Language.instance();
		var _mouse = ASJS.Mouse.instance();
		var _background = new ASJS.Sprite();
		var _box = new ASJS.Sprite();
		var _label = new ASJS.Label();
		var _button = new ASJS.Button();
		var _animatedSprite = new ASJS.AnimatedSprite();
		var _drag = false;
		var _blurFilter = new ASJS.BlurFilter();
		
		// constructor
		_scope.new = function() {
			_scope.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.render = function() {
			_background.setSize( stage.stageWidth, stage.stageHeight );
			_box.x = ( stage.stageWidth - _box.width ) * 0.5;
		}

		_scope.init = function( data ) {
			_background.addClass( "content-view--background" );
			_background.setCSS( "position", "fixed" );
			_background.alpha = 0.5;
			_scope.addChild( _background );
	
			_box.addClass( "content-view--box" );
			_box.setSize( 320, 130 );
			_box.y = 100;
			_scope.addChild( _box );
	
			_label.text = _language.getText( "new_asjs_base_site" );
			_label.addClass( "content-view--box--label" );
			_label.setSize( 320, 30 );
			_label.move( 0, 34 );
			_box.addChild( _label );
	
			_button.label = _language.getText( "show_notification_window" );
			_button.addClass( "content-view--box--button" );
			_button.setSize( 320, 40 );
			_button.move( 0, _box.height - _button.height );
			_button.addEventListener( ASJS.MouseEvent.CLICK, onButtonClick );
			_box.addChild( _button );
	
			_animatedSprite.addAnimationDescriptorList( data );
			_animatedSprite.move( 10, 10 );
			_scope.addChild( _animatedSprite );
	
			_animatedSprite.addEventListener( ASJS.MouseEvent.CLICK, onAnimatedSpriteClick );
			_animatedSprite.addEventListener( ASJS.MouseEvent.MOUSE_DOWN + " " + ASJS.MouseEvent.TOUCH_START, onAnimatedSpriteMouseDown );
	
			stage.addEventListener( ASJS.MouseEvent.MOUSE_UP + " " + ASJS.MouseEvent.TOUCH_END, onDragStop );
			stage.addEventListener( ASJS.MouseEvent.MOUSE_LEAVE, onDragStop );
			stage.addEventListener( ASJS.MouseEvent.MOUSE_MOVE + " " + ASJS.MouseEvent.TOUCH_MOVE, onStageMouseMove );
	
			_scope.addEventListener( ASJS.MouseEvent.CLICK, onMouseClick );
			
			_scope.render();
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function addedToStage() {
			playFireworksAnimation();
		}

		function onButtonClick() {
			_scope.dispatchEvent( ContentMediator.ON_SHOW_NOTIFICATION_WINDOW_CLICK );
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
			_label.text = _language.getText( hitTest ? "hit_test_inside" : "hit_test_outside" );
		}
	}
);
// public static const

// public static variable

// public static property

// public static function


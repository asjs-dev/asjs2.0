function AbstractView() {
	return createClass( this, ASJS.Sprite, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _easingTarget = { alpha: 0 };
			var _easing = new ASJS.Easing();
			
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
			
			// protected read only function
			
			// protected function
			_scope._animateTo = function( to, completeCallback ) {
				_easingTarget = { alpha: _scope.alpha };
				_easing.stop();
				_easing.play( _easingTarget, { alpha: to }, 1000, "easeInOutExpo",
					function() {
						_scope.alpha = _easingTarget.alpha;
					},
					completeCallback
				);
			}
			
			// private read only function
			
			// private function
			function addedToStage() {
				_scope.alpha = 0;
				_scope._animateTo( 1 );
			}
		}
	);
}
// public static const

// public static variable

// public static property

// public static function


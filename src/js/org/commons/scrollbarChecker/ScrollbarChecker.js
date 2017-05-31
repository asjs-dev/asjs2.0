/*
	This class can detect the browser use mobile or standard scrollbar
	Singleton Class: ScrollbarChecker.instance()
*/
var ScrollbarChecker = {};
createSingletonClass( ScrollbarChecker, Object, null,
	function( _scope, _super ) {
		
		var _isMobileScrollbar;
		
		_scope.new = function() {
			var scrollbarTester = new ASJS.Sprite();
				scrollbarTester.setSize( 30, 30 );
				scrollbarTester.setCSS( "overflow", "auto" );
				scrollbarTester.alpha = 0;
			
			var scrollbarContent = new ASJS.DisplayObject();
				scrollbarContent.setSize( scrollbarTester.width + 1, scrollbarTester.height + 1 );
			
			scrollbarTester.addChild( scrollbarContent );
			
			stage.addChild( scrollbarTester );
			
			_isMobileScrollbar = scrollbarTester.el.clientWidth == scrollbarTester.el.offsetWidth;
			
			stage.removeChild( scrollbarTester );
		}
		
		/*
		 * Returns the browser use mobile scrollbar or not
		 * @returns {Boolean} Browser use mobile scrollbar
		 */
		prop( _scope, "isMobileScrollbar", {
			get: function() { return _isMobileScrollbar; }
		});
	}
);

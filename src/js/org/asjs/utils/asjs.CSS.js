includeOnce( "org/asjs/window/asjs.Head.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );

ASJS.CSS = function() {
	return createSingletonClass( ASJS.CSS, this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
			
			// private variable
			var _window = new ASJS.Window();
			var _head = new ASJS.Head();
			var _runTimeStyle;
			var _merged;
			
			// constructor
			_scope.construct = function() {
				updateMergedList();
			}
			
			// public property
			prop( _scope, "styles", {
				get: function() { return _merged; }
			});
			
			// protected property
			
			// private property
			
			// public static function
			
			// public read only function
			
			// public function
			_scope.getRuleBySelector = function( s ) {
				var i = -1;
				var l = _merged.length;
				while ( ++i < l ) {
					var rule = _merged[ i ].rule;
					if ( rule.selectorText == s ) return rule;
				}
				return null;
			}
			
			_scope.getRuleExists = function( s ) {
				return _scope.getRuleBySelector( s ) != null;
			}
			
			_scope.getPropertyFromRule = function( s, t ) {
				var r = _scope.getRuleBySelector( s );
				return !r ? null : r.style[ t ];
			}
			
			_scope.setPropertyToRule = function( s, t, v ) {
				var r = _scope.getRuleBySelector( s );
				if ( r ) {
					r.style[ t ] = v;
					updateMergedList();
				}
			}
			
			_scope.addRule = function( s, t ) {
				if ( _scope.getRuleBySelector( s ) ) return;
				createRunTimeStyle();
				_runTimeStyle.el.sheet.insertRule( s + "{" + ( t || "" ) + "}", 0 );
				updateMergedList();
			}
			
			_scope.removeRule = function( s ) {
				var styles = getSheets();
				var i = -1;
				var l = _merged.length;
				while ( ++i < l ) {
					var rule = _merged[ i ];
					if ( rule.rule.selectorText == s ) {
						styles[ rule.sheetId ].deleteRule( rule.ruleId );
						updateMergedList();
						return;
					}
				}
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function updateMergedList() {
				var styles = getSheets();
				var i = -1;
				var l = styles.length;
				_merged = [];
				while ( ++i < l ) {
					var style = styles[ i ].cssRules;
					var j = -1;
					var m = style.length;
					while ( ++j < m ) _merged.push( new Rule( i, j, style[ j ] ) );
				}
			}
			
			function getSheets() {
				return document.styleSheets;
			}
			
			function hasRunTimeStyle () {
				return _runTimeStyle;
			}
			
			function createRunTimeStyle() {
				if ( hasRunTimeStyle() ) return;
				_runTimeStyle = new ASJS.PrimitiveDisplayObject( "<style />" );
				_runTimeStyle.setAttr( "type", "text/css" );
				_head.addChild( _runTimeStyle );
			}
			
			// internal classes
			var Rule = function( sheetId, ruleId, rule ) {
				return createClass( this, Object, null,
					function( _scope, _super ) {
						// private object
			
						// private const
			
						// public variable
						_scope.sheetId = sheetId;
						_scope.ruleId = ruleId;
						_scope.rule = rule;
						
						// protected variable
			
						// private variable
			
						// constructor
						_scope.construct = function() {}
			
						// public property
			
						// protected property
			
						// private property
			
						// public static function
			
						// public read only function
			
						// public function
			
						// protected read only function
			
						// protected function
			
						// private read only function
			
						// private function
			
						// internal classes
					}
				);
			};
			// public static const

			// public static variable

			// public static property

			// public static function
		}
	);
}
// public static const

// public static variable

// public static property
prop( ASJS.CSS, "styles", {
	get: function() { return ( new ASJS.CSS() ).styles; }
});


// public static function
roFunc( ASJS.CSS, "getRuleBySelector", function( s ) {
	return ( new ASJS.CSS() ).getRuleBySelector( s );
});

roFunc( ASJS.CSS, "getRuleExists", function( s ) {
	return ( new ASJS.CSS() ).getRuleExists( s );
});

roFunc( ASJS.CSS, "getPropertyFromRule", function( s, t ) {
	return ( new ASJS.CSS() ).getPropertyFromRule( s, t );
});

roFunc( ASJS.CSS, "setPropertyToRule", function( s, t, v ) {
	( new ASJS.CSS() ).setPropertyToRule( s, t, v );
});

roFunc( ASJS.CSS, "addRule", function( s, t ) {
	( new ASJS.CSS() ).addRule( s, t );
});

roFunc( ASJS.CSS, "removeRule", function( s ) {
	( new ASJS.CSS() ).removeRule( s );
});


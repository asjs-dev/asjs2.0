includeOnce( "org/asjs/window/asjs.Head.js" );
includeOnce( "org/asjs/window/asjs.Window.js" );
includeOnce( "org/asjs/display/asjs.PrimitiveDisplayObject.js" );
includeOnce( "org/asjs/core/asjs.Polyfill.js" );

ASJS.CSS = {};
createSingletonClass( ASJS.CSS, ASJS.BaseClass, null,
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _head = ASJS.Head.instance();
		var _runTimeStyle;
		var _merged;
		
		// constructor
		_scope.new = function() {
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
			_runTimeStyle = new ASJS.Tag( "style" );
			_runTimeStyle.setAttr( "type", "text/css" );
			_head.addChild( _runTimeStyle );
		}
		
		// internal classes
		var Rule = createClass( ASJS.BaseClass, null,
			function( _scope ) {
				// private object
	
				// private const
	
				// public variable
				_scope.sheetId;
				_scope.ruleId;
				_scope.rule;
				
				// protected variable
	
				// private variable
	
				// constructor
				_scope.new = function( sheetId, ruleId, rule ) {
					_scope.sheetId = sheetId;
					_scope.ruleId = ruleId;
					_scope.rule = rule;
				}
	
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
		// public static const

		// public static variable

		// public static property

		// public static function
	}
);

// public static const
cnst( ASJS.CSS, "ADD_PIXEL_TYPES", [ "width", "height", "top", "left" ] );

cnst( ASJS.CSS, "SELECTOR", [
	'fullscreen',
	'placeholder'
]);

cnst( ASJS.CSS, "VALUE", [
	'gradient',
	'intrinsic',
	'pixelated',
	'image-set',
	'cross-fade',
	'flex-values',
	'display-flex',
	'display-grid',
	'filter-value'
]);

// public static variable

// public static property
prop( ASJS.CSS, "styles", {
	get: function() { return ( ASJS.CSS.instance() ).styles; }
});

// public static function
roFunc( ASJS.CSS, "getRuleBySelector", function( s ) {
	return ( ASJS.CSS.instance() ).getRuleBySelector( s );
});

roFunc( ASJS.CSS, "getRuleExists", function( s ) {
	return ( ASJS.CSS.instance() ).getRuleExists( s );
});

roFunc( ASJS.CSS, "getPropertyFromRule", function( s, t ) {
	return ( ASJS.CSS.instance() ).getPropertyFromRule( s, t );
});

roFunc( ASJS.CSS, "setPropertyToRule", function( s, t, v ) {
	( ASJS.CSS.instance() ).setPropertyToRule( s, t, v );
});

roFunc( ASJS.CSS, "addRule", function( s, t ) {
	( ASJS.CSS.instance() ).addRule( s, t );
});

roFunc( ASJS.CSS, "removeRule", function( s ) {
	( ASJS.CSS.instance() ).removeRule( s );
});

roFunc( ASJS.CSS, "replaceHyphen", function( s ) {
	return s.replace( /-./g, function( v ) {
		return v.replace( "-", "" ).toUpperCase();
	});
});

roFunc( ASJS.CSS, "convertProperty", function( k ) {
	var nk = ASJS.Polyfill.instance().stylePrefixCSS + nk;
	var i = -1;
	var l = ASJS.CSS.SELECTOR.length;
	while ( ++i < l ) {
		if ( nk.indexOf( ":" + ASJS.CSS.SELECTOR[ i ] ) > -1 ) {
			nk = nk.replace( ":" + ASJS.CSS.SELECTOR[ i ], ":" + ASJS.Polyfill.instance().stylePrefixCSS + ASJS.CSS.SELECTOR[ i ] );
			i = l;
			break;
		}
	}
	
	return nk;
});

roFunc( ASJS.CSS, "convertValue", function( v ) {
	var i = -1;
	var l = ASJS.CSS.VALUE.length;
	while ( ++i < l ) {
		if ( String( v ).indexOf( ASJS.CSS.VALUE[ i ] ) > -1 ) return ASJS.Polyfill.instance().stylePrefixCSS + v;
	}
	return v;
});

roFunc( ASJS.CSS, "setCSS", function( t, k, v ) {
	v = ASJS.CSS.ADD_PIXEL_TYPES.indexOf( k ) > -1 && typeof v == "number" ? v + "px" : v;
	var nk = ASJS.CSS.convertProperty( k );
	var nv = ASJS.CSS.convertValue( v );
	t.el.style[ ASJS.CSS.replaceHyphen( k ) ] = v;
	t.el.style[ ASJS.CSS.replaceHyphen( nk ) ] = nv;
});

roFunc( ASJS.CSS, "getCSS", function( t, k ) {
	var style = window.getComputedStyle( t.el );
	var v = style.getPropertyValue( k );
	if ( v == "" ) v = t.el.style[ ASJS.CSS.replaceHyphen( k ) ];
	return ASJS.CSS.ADD_PIXEL_TYPES.indexOf( k ) > -1 ? parseFloat( v ) : v;
});

ASJS.Head = function() {
	return createSingletonClass( ASJS.Head, this, Object, null, 
		function( _scope, _super ) {
			// private object
			
			// private const
			
			// public variable
			
			// protected variable
				
			// private variable
			var _children = [];
			var _head = $( "head" );
			
			// constructor
			_scope.construct = function() {}
			
			// public property
			prop( _scope, "el", {
				get: function() { return _head; }
			});
			
			prop( _scope, "numChildren", {
				get: function() { return _children.length; }
			});
			
			// protected property
			
			// private property
			
			// public read only function
			
			// public function
			_scope.addChild = function( child ) {
				if ( !child ) return null;
				if ( child.parent ) child.parent.removeChild( child );
				child.enabled = child.enabled ? _mouseChildren : child.enabled;
				_children.push( child );
				_head.append( child.el );
				child.parent = _scope;
				return child;
			}
			
			_scope.removeChild = function( child ) {
				if ( !child ) return null;
				child.jQuery.detach();
				var index = getChildIndex( child );
				if ( index > -1 ) _children.splice( index, 1 );
				child.parent = null;
				return child;
			}
			
			_scope.contains = function( child ) {
				return getChildIndex( child ) > -1;
			}
			
			// protected read only function
			
			// protected function
			
			// private read only function
			
			// private function
			function getChildIndex( child ) {
				return !child ? -1 : _children.indexOf( child );
			}
		}
	);
};
// public static const

// public static variable

// public static property

// public static function


ASJS.Head = {};
ASJS.Head = createSingletonClass( ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
			
		// private variable
		var _children = [];
		var _el = document.head;
		
		// constructor
		
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
			_children.push( child );
			_el.append( child.el );
			child.parent = _scope;
			return child;
		}
		
		_scope.removeChild = function( child ) {
			if ( !child ) return null;
            _el.removeChild( child.el );
			var index = _scope.getChildIndex( child );
			if ( index > -1 ) _children.splice( index, 1 );
			child.parent = null;
			return child;
		}
		
		_scope.contains = function( child ) {
			return _scope.getChildIndex( child ) > -1;
		}
		
		_scope.getChildIndex = function( child ) {
			return !child ? -1 : _children.indexOf( child );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
	}
);
// public static const

// public static variable

// public static property

// public static function


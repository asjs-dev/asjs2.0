includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.Promise = createClass( Object, null,
	function( _scope, _super ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _resolveFunction = [];
		var _rejectFunction = [];
		var _calledResolve = false;
		var _calledReject = false;
		var _resolveData;
		var _rejectData;
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public read only function
		
		// public function
		_scope.resolve = function( data ) {
			_resolveData = data;
			_calledResolve = true;
			callResolve();
		}
		
		_scope.reject = function( data ) {
			_rejectData = data;
			_calledReject = true;
			callReject();
		}
		
		_scope.done = function( f ) {
			if ( _resolveFunction.indexOf( f ) == -1 ) {
				_resolveFunction.push( f );
				callResolve();
			}
			return _scope;
		}
		
		_scope.fail = function( f ) {
			if ( _rejectFunction.indexOf( f ) == -1 ) {
				_rejectFunction = f;
				callReject();
			}
			return _scope;
		}
		
		// protected read only function
		
		// protected function
		
		// private read only  function
		
		// private function
		function callResolve() {
			if ( !_calledResolve ) return;
			while ( _resolveFunction.length > 0 ) _resolveFunction.shift()( _resolveData );
		}
		
		function callReject() {
			if ( !_calledReject ) return;
			while ( _rejectFunction.length > 0 ) _rejectFunction.shift()( _rejectData );
		}
		
	}
);
// public static const

// public static variable

// public static property

// public static function


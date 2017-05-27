includeOnce( "org/asjs/event/asjs.EventDispatcher.js" );

ASJS.Deferred = createClass( Object, null,
	function( _scope, _super ) {
		// internal classes
		var Promise = createClass( ASJS.EventDispatcher, null,
			function( _scope, _super ) {
				_scope.resolveFunction = [];
				_scope.rejectFunction = [];
				
				_scope.resolve = function( f ) {
					if ( _scope.resolveFunction.indexOf( f ) == -1 ) {
						_scope.resolveFunction.push( f );
						_scope.dispatchEvent( Promise.ADD_RESOLVE );
					}
					return _scope;
				}
				
				_scope.reject = function( f ) {
					if ( _scope.rejectFunction.indexOf( f ) == -1 ) {
						_scope.rejectFunction = f;
						_scope.dispatchEvent( Promise.ADD_REJECT );
					}
					return _scope;
				}
			}
		);
		cnst( Promise, "ADD_RESOLVE", "Promise-addResolve" );
		cnst( Promise, "ADD_REJECT", "Promise-addReject" );
		
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _promise = new Promise();
		var _calledResolve = false;
		var _calledReject = false;
		var _resolveData;
		var _rejectData;
		
		// constructor
		_scope.new = function() {
			_promise.addEventListener( Promise.ADD_RESOLVE, callResolve );
			_promise.addEventListener( Promise.ADD_REJECT, callReject );
		}
		
		// public property
		prop( _scope, "promise", {
			get: function() { return _promise; }
		});
		
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
		
		// protected read only function
		
		// protected function
		
		// private read only  function
		
		// private function
		function callResolve() {
			if ( !_calledResolve ) return;
			while ( _promise.resolveFunction.length > 0 ) _promise.resolveFunction.shift()( _resolveData );
		}
		
		function callReject() {
			if ( !_calledReject ) return;
			while ( _promise.rejectFunction.length > 0 ) _promise.rejectFunction.shift()( _rejectData );
		}
		
	}
);
// public static const

// public static variable

// public static property

// public static function


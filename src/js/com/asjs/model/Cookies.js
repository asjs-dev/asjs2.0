var Cookies = {};
createSingletonClass( Cookies, ASJS.BaseClass, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		
		// constructor
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.createCookie = function( n, v, d ) {
			if ( d ) {
				var date = new Date();
				date.setTime( date.getTime() + ( d * 86400000 ) );
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = n + "=" + v + expires + "; path=/";
			try {
				if ( typeof( Storage ) !== "undefined" ) localStorage.setItem( n, v );
			} catch ( e ) {
				trace( e );
			}
		}

		_scope.readCookie = function( n ) {
			var nameEQ = n + "=";
			var ca = document.cookie.split( ';' );
			var i = -1;
			var l = ca.length;
			while ( ++i < l ) {
				var c = ca[ i ];
				while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
				if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
			}
			try {
				if ( typeof( Storage ) !== "undefined" ) return localStorage.getItem( n );
			} catch ( e ) {
				trace( e );
			}
			return null;
		}

		_scope.eraseCookie = function( n ) {
			_scope.createCookie( n, "", -1 );
			try {
				if ( typeof( Storage ) !== "undefined" ) localStorage.removeItem( n );
			} catch ( e ) {
				trace( e );
			}
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


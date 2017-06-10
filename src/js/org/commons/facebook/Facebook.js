var Facebook = {};
createSingletonClass( Facebook, ASJS.DisplayObject, null, 
	function( _scope ) {
		// private object
		
		// private const
		
		// public variable
		
		// protected variable
		
		// private variable
		var _window = ASJS.Window.instance();
		var _facebookAppId;
		var _version;
		
		// constructor
		_scope.new = function( facebookAppId, version ) {
			_scope.setAttr( "id", "fb-root" );
			stage.addChild( _scope );
			
			_facebookAppId = facebookAppId;
			_version = version;
			
			var e = document.createElement( 'script' ); 
				e.async = true;
				e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';        
			document.getElementById( 'fb-root' ).appendChild( e );
	
			_window.el.fbAsyncInit = onFBAsyncInit;
		}
		
		// public property
		
		// protected property
		
		// private property
		
		// public static function
		
		// public read only function
		
		// public function
		_scope.login = function() {
			FB.login( onLoginStatus );
		}

		_scope.logout = function() {
			FB.getLoginStatus( onGetLoginStatus );
		}

		_scope.postToFeed = function( title, desc, url, imageUrl ) {
			var obj = {
				method: 'feed',
				link: url,
				picture: imageUrl,
				name: title,
				description: desc
			};
			FB.ui( obj, onPostFeed );
		}
		
		// protected read only function
		
		// protected function
		
		// private read only function
		
		// private function
		function onPostFeed( response ) {
			_scope.dispatchEvent( Facebook.POST_COMPLETE, response );
		}

		function onLogout( response ) {
			_scope.dispatchEvent( Facebook.LOGOUT );
		}

		function onGetLoginStatus( response ) {
			if ( response.status == "connected" ) FB.logout(  onLogout );
			else _scope.dispatchEvent( Facebook.LOGOUT );
		}

		function onFBAsyncInit() {
			var obj = {
				appId: _facebookAppId,
				status: true,
				cookie: true,
				xfbml: true,
				oauth: true,
				version: ( _version || 'v2.4' )
			};
			FB.init( obj );
			FB.getLoginStatus( onLoginStatus );
		}

		function onLoginStatus( response ) {
			switch ( response.status ) {
				case "connected": _scope.dispatchEvent( Facebook.CONNECTED, response.authResponse );
				break;
				case "not_authorized": _scope.dispatchEvent( Facebook.NOT_AUTHORIZED );
				break;
				case "unknown": _scope.dispatchEvent( Facebook.UNKNOW );
				break;
			}
		}
	}
);
// public static const
cnst( Facebook, "CONNECTED",      "Facebook-connected" );
cnst( Facebook, "NOT_AUTHORIZED", "Facebook-notAuthorized" );
cnst( Facebook, "UNKNOW",         "Facebook-unknow" );
cnst( Facebook, "LOGOUT",         "Facebook-logout" );
cnst( Facebook, "POST_COMPLETE",  "Facebook-postComplete" );

// public static variable

// public static property

// public static function


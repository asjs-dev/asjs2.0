<?php
	include_once( "../builder/builder.php" );
	
	$config = array();
	
	/* Common config */
	$config[ "minimize" ]           = true; // optional (boolean)
	$config[ "compress" ]           = true; // optional (boolean)
	$config[ "watching" ]           = false; // optional (boolean)
	
	/* Watcher config */
	$config[ "watcherPath" ]        = array( "src/" ); // required, when use watcher (array(folder, folder, ... ))
	$config[ "watcherTimeout" ]     = 2; // optional (seconds)
	
	/* JS build config */
	$config[ "js" ] = array();
	$config[ "js" ][ "sourcePath" ] = "src/js/"; // required (folder)
	$config[ "js" ][ "baseClass" ]  = "com/asjs/Application.js"; // required (path/to/baseClass.js)
	$config[ "js" ][ "packages" ]   = array( // required, when use other packages
		// array( "path", "relativePath" )
	);
	$config[ "js" ][ "output" ]     = "bin/app/js/application.js"; // required
	
	/* CSS build config */
	$config[ "css" ] = array();
	$config[ "css" ][ "packages" ]  = array( // required
		"src/css/lib/",
		"src/css/style/"
	);
	$config[ "css" ][ "output" ]    = "bin/app/css/application.css"; // required
	
	$builder = new Builder();
	$builder->run( $config );
?>

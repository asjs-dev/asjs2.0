<?php
	include_once( dirname(__FILE__) . "/jsmin.php" );
	
	class BuildJS {
		private $output				= "";
		private $sourcePath			= "";
		private $includedClasses	= array();
		private $packages			= array();
		private $obfuscation		= true;
		
		public function __construct() {}
		
		public function clearCache() {
			$this->output			= "";
			$this->sourcePath		= "";
			$this->includedClasses	= array();
			$this->packages			= array();
		}
		
		public function addPackage( $path, $relativePath ) {
			array_push( $this->packages, array(
				"path" => $path,
				"relativePath" => $relativePath
			));
		}
		
		public function build( $projectFolder, $baseClass, $minimize = true, $obfuscation = true ) {
			if ( !isset( $baseClass ) || $baseClass == "" ) {
				throw new Exception( "Missing Parameter: baseClass" );
			}
			
			$this->obfuscation = $obfuscation;
			
			$this->includeJS( $projectFolder, $baseClass, "baseClass", 0 );
			
			if ( $minimize ) $this->minimize();
			$this->output = preg_replace( "/;+/", ";", $this->output );
		}
		
		public function save( $path ) {
			$f = fopen( $path, "w" );
			fwrite( $f, $this->output );
			fclose( $f );
		}
		
		private function minimize() {
			$this->output = JSMin::minify( $this->output );
			$this->output = preg_replace( "/\r+/", "\n", $this->output );
			$this->output = preg_replace( "/\n+/", "\n", $this->output );
			$this->output = str_replace( "}\n", "};\n", $this->output );
			$this->output = str_replace( "_scope", "scp", $this->output );
			$this->output = str_replace( "_super", "spr", $this->output );
			
			//$this->output = str_replace( "\n", "", $this->output );
			//$this->output = str_replace( "\n", ";", $this->output );
			$this->output = str_replace( ";\n", ";", $this->output );
		}
		
		private function openFile( $projectFolder, $path ) {
			$dir = $projectFolder;
			$i = -1;
			$l = count( $this->packages );
			while ( ++$i < $l ) {
				if ( stripos( $path, $this->packages[ $i ][ "path" ] ) > -1 ) {
					$explodePath = explode( $this->packages[ $i ][ "path" ], $path );
					$customDir = $this->packages[ $i ][ "relativePath" ];
					if ( file_exists( $customDir . $explodePath[ 1 ] ) ) {
						$dir = $customDir;
						$path = $explodePath[ 1 ];
					}
				}
			}
			return !file_exists( $dir . $path ) ? false : file( $dir . $path );
		}
	
		private function includeJS( $projectFolder, $path, $parent, $line ) {
			$fileContent = $this->openFile( $projectFolder, $path );
			if ( $fileContent === false ) {
				throw new Exception( "Missing dependency:\n\t" . $path . " in\n\t" . $parent . " on line " . ( $line + 1 ) );
			}
			
			$out = "";
			for ( $i = 0; $i < count( $fileContent ); $i++ ) {
				$isSourcePath = strpos( $fileContent[ $i ], "sourcePath" ) === 0;
				$isIncludeOnce = strpos( $fileContent[ $i ], "includeOnce" ) === 0;
				$line = $fileContent[ $i ];
				if ( $isSourcePath || $isIncludeOnce ) {
					$line = str_replace( "includeOnce(", "", $line );
					$line = str_replace( "sourcePath(", "", $line );
					$line = str_replace( ")", "", $line );
					$line = str_replace( "'", "", $line );
					$line = str_replace( "\"", "", $line );
					$line = str_replace( " ", "", $line );
					$line = str_replace( "\n", "", $line );
					$line = str_replace( "\r", "", $line );
					$line = str_replace( ";", "", $line );
					if ( $isIncludeOnce ) {
						if ( !isset( $this->includedClasses[ $line ] ) || $this->includedClasses[ $line ] != true ) {
							$this->includedClasses[ $line ] = true;
							$this->includeJS( $projectFolder, $this->sourcePath . $line, $path, $i );
						}
					} else if ( $isSourcePath ) {
						if ( $this->sourcePath == "" ) {
							$this->sourcePath = $line;
						}
					}
				} else $out .= $line;
			}
			
			if ( $this->obfuscation ) $out = $this->obfuscation( $out );
			
			$this->output .= ";" . $out;
		}
		
		private function obfuscation( $src ) {
			preg_match_all( "/\t(var|function) (?<!\.)(?<!\w)(\w+)/", $src, $matches );
			$results = $matches[ 2 ];
			
			asort( $results );
			usort( $results, function( $a, $b ) {
				preg_match( "/_v[0-9]+/", $b, $bm );
				if ( count( $bm ) > 0 ) return 1;
			});
			
			$variables = array();
			$i = -1;
			$l = count( $results );
			while ( ++$i < $l ) {
				$variables[ $results[ $i ] ] = true;
			}
			
			$i = 0;
			foreach ( $variables as $key => $value ) {
				$newKey = "_v" . $i;
				if ( strlen( $key ) >= strlen( $newKey ) ) {
					$src = preg_replace( "/(?<!\.)(?<!\")\b" . $key . "\b/", $newKey, $src );
					$i++;
				}
			}
			return $src;
		}
	
	}
?>

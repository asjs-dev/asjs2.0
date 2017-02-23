<?php
	include_once( dirname(__FILE__) . "/jsmin.php" );
	
	class BuildJS {
		private $output				= "";
		private $sourcePath			= "";
		private $includedClasses	= array();
		private $packages			= array();
		private $compression		= true;
		
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
		
		public function build( $projectFolder, $baseClass, $minimize = true, $compression = true ) {
			if ( !isset( $baseClass ) || $baseClass == "" ) {
				throw new Exception( "Missing Parameter: baseClass" );
			}
			
			$this->compression = $compression;
			
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
			//$this->output = str_replace( "_scope", "scp", $this->output );
			//$this->output = str_replace( "_super", "spr", $this->output );
			
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
			
			if ( $this->compression ) $out = $this->compress( $out );
			
			$this->output .= ";" . $out;
		}
		
		private function compress( $src ) {
			$cleanContent = preg_replace( "/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/mi", "", $src );
			$cleanContent = preg_replace( "/\n/mi", "", $cleanContent );
			$cleanContent = preg_replace( "/\r/mi", "", $cleanContent );
			$cleanContent = preg_replace( "/\t/mi", "", $cleanContent );

			preg_match_all( "/\W/mi", $src, $specChars );
			
			$i = -1;
			$l = count( $specChars[ 0 ] );
			$separators = "";
			while ( ++$i < $l ) {
				$char = $specChars[ 0 ][ $i ];
				if ( strpos( $separators, $char ) === false && strpos( "./\\", $char ) === false ) $separators .= $char;
			}
			
			$i = -1;
			$l = strlen( $cleanContent );
			$depth = 0;
			$wordsHelper = array();
			while ( ++$i < $l ) {
				$char = $cleanContent[ $i ];
				$isSep = strpos( $separators, $char ) !== false;
				if ( $isSep ) $depth++;
				
				if ( strpos( " ", $char ) === false ) {
					$key = "d_" . $depth;
					if ( !isset( $wordsHelper[ $key ] ) ) $wordsHelper[ $key ] = "";
					$wordsHelper[ $key ] .= $char;
				}
				
				if ( $isSep ) $depth++;
			}
			
			$words = array();
			foreach ( $wordsHelper as $key => $value ) array_push( $words, $value );
			
			$i = -1;
			$l = count( $words );
			$depth = 0;
			$bracketCount = 0;
			$braceCount = 0;
			$inBracket = false;
			$inBrace = false;
			$inString = false;
			$aposCount = 0;
			$quoteCount = 0;
			$changeList = array();
			while ( ++$i < $l ) {
				if ( $words[ $i ] == "{" ) {
					$braceCount++;
					$depth++;
					continue;
				} else if ( $words[ $i ] == "}" ) {
					$braceCount--;
					$depth--;
					continue;
				} else if ( $words[ $i ] == "(" ) {
					$bracketCount++;
					$depth++;
					continue;
				} else if ( $words[ $i ] == ")" ) {
					$bracketCount--;
					$depth--;
					continue;
				} else if ( $words[ $i ] == "\"" ) {
					$quoteCount++;
					continue;
				} else if ( $words[ $i ] == "'" ) {
					$aposCount++;
					continue;
				}
				$inString = $aposCount % 2 == 1 || $quoteCount % 2 == 1;
				$inBracket = $bracketCount > 0;
				$inBrace = $braceCount > 0;
				if ( !$inString && $depth > 0 ) {
					if ( $words[ $i ] == "var" ) $changeList[ $words[ $i + 1 ] ] = true;
					else if ( $words[ $i ] == "function" ) {
						if ( $i > 0 && $words[ $i - 1 ] == "=" && $words[ $i - 3 ] == "var" ) $changeList[ $words[ $i - 2 ] ] = true;
						else if ( $words[ $i + 1 ] != "(" ) $changeList[ $words[ $i + 1 ] ] = true;
						else {
							//print "\nanonym function ";
						}
						
						if ( $words[ $i + 1 ] == "(" ) {
							$i += 1;
							while ( ++$i < $l ) {
								if ( $words[ $i ] == ")" ) break;
								else if ( $words[ $i ] != "," ) $changeList[ $words[ $i ] ] = true;
							}
						} else if ( $words[ $i + 2 ] == "(" ) {
							$i += 2;
							while ( ++$i < $l ) {
								if ( $words[ $i ] == ")" ) break;
								else if ( $words[ $i ] != "," ) $changeList[ $words[ $i ] ] = true;
							}
						}
					}
				}
			}
			
			$list = array();
			foreach ( $changeList as $key => $value ) {
				array_push( $list, $key );
			}
			
			usort( $list, function( $a, $b ) {
				return strlen( $a ) - strlen( $b );
			});
			
			$i = -1;
			$l = count( $list );
			$id = 0;
			while ( ++$i < $l ) {
				$key = "v" . $id;
				if ( strlen( $key ) >= strlen( $list[ $i ] ) ) continue;
				$found = false;
				while ( !$found ) {
					$found = true;
					$j = -1;
					$m = $l;
					while ( ++$j < $m ) {
						if ( $key == $list[ $j ] ) {
							$found = false;
							$key = "v" . ++$id;
							break;
						}
					}
				}
				$key = "v" . $id;
				$src = preg_replace( "/(?<!\.)(?<!\")(?<!')\b" . $list[ $i ] . "\b/", $key, $src );
				$id++;
			}
			
			return $src;
		}
	
	}
?>

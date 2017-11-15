includeOnce( "org/commons/compressor/LZW.js" );

var FileSaver = {};
// public static const

// public static variable

// public static property

// public static function
roFunc( FileSaver, "save", function( fileName, data, compress ) {
	if ( !fileName ) fileName = 'untitled.json';
	var fileType = "application/json";
	
	if ( typeof data === "object" ) data = JSON.stringify( data );
	
	if ( compress ) {
		data = LZW.encode( data );
		fileType = "octet/stream";
	}
	
	var blob = new Blob( [ data ], { type: fileType } );
	var url = URL.createObjectURL( blob );
	var link = new ASJS.Link();
		link.href = url;
		link.download = fileName;
		link.el.click();
	
    URL.revokeObjectURL( url );
});

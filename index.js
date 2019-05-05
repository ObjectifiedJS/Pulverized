'use strict';

var compressionExports = {
		"zlib" : require('zlib')
	},
	methodsMapping = {
		"compress":{
			"async":{
				"br":["zlib","brotliCompress"],
				"df":["zlib","deflate"],
				"gz":["zlib","gzip"]
			},
			"stream":{
				"br":["zlib","createBrotliCompress"],
				"df":["zlib","createDeflate"],
				"gz":["zlib","createGzip"]
			},
			"sync":{
				"br":["zlib","brotliCompressSync"],
				"df":["zlib","deflateSync"],
				"gz":["zlib","gzipSync"]
			}
		},
		"decompress":{
			"async":{
				"br":["zlib","brotliDecompress"],
				"df":["zlib","inflate"],
				"gz":["zlib","unzip"]
			},
			"stream":{
				"br":["zlib","createBrotliDecompress"],
				"df":["zlib","createInflate"],
				"gz":["zlib","createUnzip"]
			},
			"sync":{
				"br":["zlib","brotliDecompressSync"],
				"df":["zlib","inflateSync"],
				"gz":["zlib","unzipSync"]
			}
		}
	};


function getMethod(
	processingActionString, 
	compressionAlgorithmString, 
	methodString 
){ 
	var compressionObject = methodsMapping[processingActionString][methodString][compressionAlgorithmString],
		compressionIndex = 0,
		retrivedCompressionMethod = compressionExports[compressionObject[compressionIndex]];

	while(!!compressionObject[compressionIndex+1]){
		retrivedCompressionMethod = retrivedCompressionMethod[compressionObject[++compressionIndex]];
	}

	return retrivedCompressionMethod;
}

function commonDataProcessing( 
	processingActionString, 
	compressionAlgorithmString, 
	methodString, 
	inputToActionOn, 
	PulverizedObject 
){
	var methodToUtilize = getMethod( 
		processingActionString, 
		compressionAlgorithmString, 
		methodString 
	);

	// unfortunely since we cant aim for multiple versions
	if( 
		methodToUtilize === undefined && 
		compressionAlgorithmString === "br"
	){
		throw ""+
			"It looks like you are in an environment in which Brotli is not "+
			"native to Node... If you download an older version of Pulverized, "+
			"it will install another module which will give you the ability for "+
			"it to work in your environment\n\n"+
			"npm install Pulverized@1.2.2\n"+
			"^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n";
	}

	switch(methodString){
		case "async":
			return methodToUtilize(
				Buffer.from(inputToActionOn), 
				!!PulverizedObject.asyncCallback ? PulverizedObject.asyncCallback : PulverizedObject, 
				PulverizedObject 
			);
		case "stream":
			return methodToUtilize(
				PulverizedObject 
			);
		case "sync":
			return methodToUtilize(
				Buffer.from(inputToActionOn),
				PulverizedObject
			);
	}
}

module.exports = {
	compress : {
		br: {
			async : function(
				inputToCompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"compress", 
					"br", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"compress", 
					"br", 
					"stream", 
					null, 
					PulverizedObject 
				);
			},
			sync : function(
				inputToCompress, 
				PulverizedObject
			) {
				return commonDataProcessing( 
					"compress", 
					"br", 
					"sync", 
					inputToCompress, 
					PulverizedObject 
				);
			}
		},
		gz:{
			async : function(
				inputToCompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"compress", 
					"gz", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"compress", 
					"gz", 
					"stream", 
					null, 
					PulverizedObject 
				);
			},
			sync : function(
				inputToCompress, 
				PulverizedObject
			) {
				return commonDataProcessing(
					"compress", 
					"gz", 
					"sync", 
					inputToCompress, 
					PulverizedObject 
				);
			}
		},
		df:{
			async : function(
				inputToCompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"compress", 
					"df", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"compress", 
					"df", 
					"stream", 
					null, 
					PulverizedObject 
				);
			},
			sync : function(
				inputToCompress, 
				PulverizedObject
			) {
				return commonDataProcessing(
					"compress", 
					"df", 
					"sync", 
					inputToCompress, 
					PulverizedObject 
				);
			}
		}
	},
	decompress : {
		br: {
			async : function(
				inputToDecompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"decompress", 
					"br", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"decompress", 
					"br", 
					"stream", 
					null,
					PulverizedObject 
				);
			},
			sync : function(
				inputToDecompress, 
				PulverizedObject
			) {
				return commonDataProcessing( 
					"decompress", 
					"br", 
					"sync", 
					inputToDecompress, 
					PulverizedObject 
				);
			}
		},
		gz:{
			async : function(
				inputToDecompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"decompress", 
					"gz", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"decompress", 
					"gz", 
					"stream", 
					null, 
					PulverizedObject 
				);
			},
			sync : function(
				inputToDecompress, 
				PulverizedObject
			) {
				return commonDataProcessing( 
					"decompress", 
					"gz", 
					"sync", 
					inputToDecompress, 
					PulverizedObject 
				);
			}
		},
		df:{
			async : function(
				inputToDecompress, 
				PulverizedObject, 
				callback
			) {
				callback && (PulverizedObject.asyncCallback = callback);
				return commonDataProcessing( 
					"decompress", 
					"df", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDataProcessing( 
					"decompress", 
					"df", 
					"stream", 
					null, 
					PulverizedObject 
				);
			},
			sync : function(
				inputToDecompress, 
				PulverizedObject
			) {
				return commonDataProcessing( 
					"decompress", 
					"df", 
					"sync", 
					inputToDecompress, 
					PulverizedObject 
				);
			}
		}
	}
};

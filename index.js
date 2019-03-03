'use strict';

var compressionExports = {
		"zlib" : require('zlib'),
		"iltorb" : require('iltorb')
	},
	methodsMapping = {
		"compress":{
			"async":{
				"br":["iltorb","compress"],
				"gz":["zlib","gzip"],
				"df":["zlib","deflate"]
			},
			"stream":{
				"br":["iltorb","compressStream"],
				"gz":["zlib","createGzip"],
				"df":["zlib","createDeflate"]
			},
			"sync":{
				"br":["iltorb","compressSync"],
				"gz":["zlib","gzipSync"],
				"df":["zlib","deflateSync"]
			}
		},
		"decompress":{
			"async":{
				"br":["iltorb","decompress"],
				"gz":["zlib","unzip"],
				"df":["zlib","inflate"]
			},
			"stream":{
				"br":["iltorb","decompressStream"],
				"gz":["zlib","createUnzip"],
				"df":["zlib","createInflate"]
			},
			"sync":{
				"br":["iltorb","decompressSync"],
				"gz":["zlib","unzipSync"],
				"df":["zlib","inflateSync"]
			}
		}
	};


function getMethod(
	actionString, 
	compressionAlgorithmString, 
	methodString 
){ 
	var compressionObject = methodsMapping[actionString][methodString][compressionAlgorithmString],
		compressionIndex = 0,
		retrivedCompressionMethod = compressionExports[compressionObject[compressionIndex]];

	while(!!compressionObject[compressionIndex+1]){
		retrivedCompressionMethod = retrivedCompressionMethod[compressionObject[++compressionIndex]];
	}

	return retrivedCompressionMethod;
}

function commonCompress( 
	compressionAlgorithmString, 
	methodString, 
	inputToCompress, 
	PulverizedObject 
){ 
	var methodToUtilize = getMethod( 
		"compress", 
		compressionAlgorithmString, 
		methodString 
	);

	switch(methodString){
		case "async":
			return methodToUtilize(
				Buffer.from(inputToCompress), 
				!!PulverizedObject.asyncCallback ? PulverizedObject.asyncCallback : PulverizedObject, 
				PulverizedObject 
			);
		case "stream":
			return methodToUtilize(
				PulverizedObject 
			);
		case "sync":
			return methodToUtilize(
				Buffer.from(inputToCompress),
				PulverizedObject
			);
	}
}

function commonDecompress( 
	compressionAlgorithmString, 
	methodString, 
	inputToDecompress, 
	PulverizedObject 
){ 
	var methodToUtilize = getMethod( 
		"decompress", 
		compressionAlgorithmString, 
		methodString 
	);
	
	switch(methodString){
		case "async":
			return methodToUtilize(
				Buffer.from(inputToDecompress), 
				!!PulverizedObject.asyncCallback ? PulverizedObject.asyncCallback : PulverizedObject, 
				PulverizedObject 
			);
		case "stream":
			return methodToUtilize(
				PulverizedObject 
			);
		case "sync":
			return methodToUtilize(
				Buffer.from(inputToDecompress),
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
				return commonCompress( 
					"br", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonCompress( 
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
				return commonCompress( 
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
				return commonCompress( 
					"gz", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonCompress( 
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
				return commonCompress(
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
				return commonCompress( 
					"df", 
					"async", 
					inputToCompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonCompress( 
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
				return commonCompress(
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
				return commonDecompress( 
					"br", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDecompress( 
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
				return commonDecompress( 
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
				return commonDecompress( 
					"gz", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDecompress( 
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
				return commonDecompress( 
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
				return commonDecompress( 
					"df", 
					"async", 
					inputToDecompress, 
					PulverizedObject 
				);
			},
			stream : function(PulverizedObject) {
				return commonDecompress( 
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
				return commonDecompress( 
					"df", 
					"sync", 
					inputToDecompress, 
					PulverizedObject 
				);
			}
		}
	}
};

var Pulverized = require('../index'),
	fs = require('fs'),
	loremFilename = "lorem.txt";

fs.createReadStream(loremFilename)
	.pipe(Pulverized.compress.br.stream({
		quality:1
	}))
	.pipe(fs.createWriteStream("lorem-stream-q1.txt.br"));

fs.createReadStream(loremFilename)
	.pipe(Pulverized.compress.gz.stream({
		quality:9
	}))
	.pipe(fs.createWriteStream("lorem-stream-q9.txt.gz"));

fs.createReadStream(loremFilename)
	.pipe(Pulverized.compress.df.stream({
		quality:5
	}))
	.pipe(fs.createWriteStream("lorem-stream-q5.txt.df"));

setTimeout(function(){
	fs.createReadStream("lorem-stream-q1.txt.br")
		.pipe(Pulverized.decompress.br.stream())
		.pipe(fs.createWriteStream("lorem-stream-uncompressed-br.txt"));

	fs.createReadStream("lorem-stream-q9.txt.gz")
		.pipe(Pulverized.decompress.gz.stream())
		.pipe(fs.createWriteStream("lorem-stream-uncompressed-gz.txt"));

	fs.createReadStream("lorem-stream-q5.txt.df")
		.pipe(Pulverized.decompress.df.stream())
		.pipe(fs.createWriteStream("lorem-stream-uncompressed-df.txt"));
}, 1000);

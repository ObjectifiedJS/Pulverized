var Pulverized = require('../index'),
	fs = require('fs'),
	loremFilename = "./examples/lorem.txt";


Pulverized.compress.df.async(
	fs.readFileSync(loremFilename,"utf8"),
	function(err, output){
		fs.writeFileSync(
			"./examples/lorem-async-q5.txt.df",
			output
		);
		
		console.log(
			"df decompressed async setup",
			Pulverized.decompress.df.async(
				fs.readFileSync(
					"./examples/lorem-async-q5.txt.df"
				), function(err, output){
					console.log(
						"df decompressed output",
						err,
						output
					)
				}
			)
		);
	},{
		quality:5
	}
)

Pulverized.compress.gz.async(
	fs.readFileSync(loremFilename,"utf8"),
	function(err, output){
		fs.writeFileSync(
			"./examples/lorem-async-q9.txt.gz",
			output
		);

		console.log(
			"gz decompressed async setup",
			Pulverized.decompress.gz.async(
				fs.readFileSync(
					"./examples/lorem-async-q9.txt.gz"
				), function(err, output){
					console.log(
						"gz decompressed output",
						err,
						output
					)
				}
			)
		);
	},{
		quality:9
	}
)

Pulverized.compress.br.async(
	fs.readFileSync(loremFilename,"utf8"),
	function(err, output){
		fs.writeFileSync(
			"./examples/lorem-async-q1.txt.br",
			output
		);
		
		console.log(
			"br decompressed async setup",
			Pulverized.decompress.br.async(
				fs.readFileSync(
					"./examples/lorem-async-q1.txt.br"
				), function(err, output){
					console.log(
						"br decompressed output",
						err,
						output
					)
				}
			)
		);
	},{
		quality:1
	}
)

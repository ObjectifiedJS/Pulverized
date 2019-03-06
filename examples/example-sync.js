var Pulverized = require('../index'),
	fs = require('fs'),
	loremFilename = "lorem.txt";

fs.writeFileSync(
	"lorem-sync-q5.txt.df",
	Pulverized.compress.df.sync(
		fs.readFileSync(loremFilename,"utf8"), {
			quality:5
		}
	)
);

fs.writeFileSync(
	"lorem-sync-q9.txt.gz",
	Pulverized.compress.gz.sync(
		fs.readFileSync(loremFilename,"utf8"), {
			quality:9
		}
	)
);

fs.writeFileSync(
	"lorem-sync-q1.txt.br",
	Pulverized.compress.br.sync(
		fs.readFileSync(loremFilename,"utf8"), {
			quality:1
		}
	)
);

console.log(
	"df decompressed",
	Pulverized.decompress.df.sync(
		fs.readFileSync(
			"lorem-sync-q5.txt.df"
		)
	)
);

console.log(
	"gz decompressed",
	Pulverized.decompress.gz.sync(
		fs.readFileSync(
			"lorem-sync-q9.txt.gz"
		)
	)
);

console.log(
	"br decompressed",
	Pulverized.decompress.br.sync(
		fs.readFileSync(
			"lorem-sync-q1.txt.br"
		)
	)
);

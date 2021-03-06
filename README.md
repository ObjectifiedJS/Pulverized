[![License](https://img.shields.io/npm/l/pulverized.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)
[![Version](https://img.shields.io/npm/v/pulverized.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)
[![Weekly Downloads](https://img.shields.io/npm/dw/pulverized.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)
[![Issues Open](https://img.shields.io/github/issues/ObjectifiedJS/Pulverized.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)
[![CircleCi Build](https://img.shields.io/circleci/project/github/ObjectifiedJS/Pulverized/master.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)
[![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/pulverized.svg?style=flat-square)](https://www.npmjs.com/package/pulverized)


# Pulverized
Utilize any compression algorithm with just a single module... The compression methods that are taken care of as of now are gzip, deflate and brotli.. if any new cool methods become mainstream, we will do our best to include them...

## Notes
Any version **below 1.3** works using the [iltorb](https://www.npmjs.com/package/iltorb) npm module which is ideal for **any node version below 11**...
Versions **1.3 and above** use node's native zlib brotli methods and are ideal with Node.js version 11 (and above)... There is a thrown error when you attempt to use the latest version but aren't in an
ideal environment to do such...

## Install
Like we need to tell you but run this...

```
npm install pulverized
```

And then you can start using the module by doing the below...

```
var Pulverized = require('pulverized');
```

Lastly, you can understand the methods and signatures of those methods if you read the below section...

## Methods
This is the Pulverized singleton 'illustrated' as a tree...

```
Pulverized
|-- compress
|   |-- async
|   |   |-- br ( dataToCompress, callback, brotliSettingsObject )
|   |   |-- df ( dataToCompress, callback, deflateSettingsObject )
|   |   \-- gz ( dataToCompress, callback, gzipSettingsObject )
|   |
|   |-- stream
|   |   |-- br ( brotliSettingsObject )
|   |   |-- df ( deflateSettingsObject )
|   |   \-- gz ( gzipSettingsObject )
|   |
|   \-- sync
|       |-- br ( dataToCompress, brotliSettingsObject )
|       |-- df ( dataToCompress, deflateSettingsObject )
|       \-- gz ( dataToCompress, gzipSettingsObject )
|
\-- decompress
    |-- async
    |   |-- br ( dataToDecompress, callback )
    |   |-- df ( dataToDecompress, callback )
    |   \-- gz ( dataToDecompress, callback )
    |
    |-- stream
    |   |-- br ( )
    |   |-- df ( )
    |   \-- gz ( )
    |
    \-- sync
        |-- br ( dataToDecompress )
        |-- df ( dataToDecompress )
        \-- gz ( dataToDecompress )
```
## Examples
Within all compression methods, the `pulverizedSettingsObject` uses the encoding parameters of the relevant algorithm [deflate](https://nodejs.org/api/zlib.html#zlib_class_options), [gzip](https://nodejs.org/api/zlib.html#zlib_class_options) or [brotli](https://github.com/google/brotli/blob/v1.0.4/c/enc/params.h#L30-L42) within the object.

The below pretty much points out what is in the `examples` folder... so I have each example from below in those files and more...

### Compress Methods
#### Sync Examples
```javascript
Pulverized["COMPRESS OR DECOMPRESS"]["ALGORITHM"].sync(
    buffer /* required */, 
    pulverizedSettingsObject /* optional */
)
```

```javascript
fs.writeFileSync(
	"./examples/lorem-sync-l9.txt.gz",
	Pulverized.compress.gz.sync(
		fs.readFileSync(loremFilename,"utf8"), {
			level:9
		}
	)
);
```

#### Async Examples
```javascript
Pulverized["COMPRESS OR DECOMPRESS"]["ALGORITHM"].async(
    buffer /* required */, 
    callback /* required */, 
    pulverizedSettingsObject /* optional */
)
```

```javascript
Pulverized.compress.df.async(
	fs.readFileSync(loremFilename,"utf8"),
	function(err, output){
		fs.writeFileSync(
			"./examples/lorem-async-l5.txt.df",
			output
		);
		
		console.log(
			"df decompressed async setup",
			Pulverized.decompress.df.async(
				fs.readFileSync(
					"./examples/lorem-async-l5.txt.df"
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
		level:5
	}
)
```

#### Stream Examples
```javascript
Pulverized["COMPRESS OR DECOMPRESS"]["ALGORITHM"].stream(
    pulverizedSettingsObject /* optional */
)
```

```javascript
fs.createReadStream(loremFilename)
	.pipe(Pulverized.compress.br.stream({
		quality:1
	}))
	.pipe(fs.createWriteStream("./examples/lorem-stream-q1.txt.br"));
```

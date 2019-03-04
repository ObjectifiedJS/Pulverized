# Pulverized
Utilize any compression algorithm with just a single module... The compression methods that are taken care of as of now are gzip, deflate and brotli.. if any new cool methods become mainstream, we will do our best to include them...

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
|
|-- compress
|   |
|   |-- async
|   |   |
|   |   |-- br
|   |   |
|   |   |-- df
|   |   |
|   |   \-- gz
|   |
|   |-- stream
|   |   |
|   |   |-- br
|   |   |
|   |   |-- df
|   |   |
|   |   \-- gz
|   |
|   \-- sync
|       |
|       |-- br
|       |
|       |-- df
|       |
|       \-- gz
|
|
\-- decompress
    |
    |-- async
    |   |
    |   |-- br
    |   |
    |   |-- df
    |   |
    |   \-- gz
    |
    |-- stream
    |   |
    |   |-- br
    |   |
    |   |-- df
    |   |
    |   \-- gz
    |
    \-- sync
        |
        |-- br
        |
        |-- df
        |
        \-- gz
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
	"./examples/lorem-sync-q9.txt.gz",
	Pulverized.compress.gz.sync(
		fs.readFileSync(loremFilename,"utf8"), {
			quality:9
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

## Notes
I would like to add the ability to use the 'native' brotli versus the npm module [iltorb](https://www.npmjs.com/package/iltorb) which is only possible with Node.js version 11 (and I assume above)

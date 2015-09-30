# collapseLib
Library to collapse an multi-level object into one level object, using dot notation

### Note
This script isn't mine. I just took it from this [gist](https://gist.github.com/alabid/3154631) made by [alabid](https://github.com/alabid)

## Example use: 
 ```js
var object = {
	"dict1key": {
		"dict2key": [
			{
				"dict3key": {
					"tell":"me"
				}
			}
		]
	},
	"dict4key": {
		"dict5key": {
			"dict6key": "hi!",
			"dict7key": "how are you?"
		}
	}
};

var objectCollapsed = CollapseLib.collapseDict(object);
```

Results in:

```js
{
	"dict1key.dict2key.[0].dict3key.tell": "me",
	"dict4key.dict5key.dict6key": "hi!",
	"dict4key.dict5key.dict7key": "how are you?"
}
```

## TODO: Fix bug with empty plain object



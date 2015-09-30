# collapseLib
Library to collapse an multi-level object into one level object, using dot notation

### Note
This script isn't mine. I just took it from this [gist](https://gist.github.com/alabid/3154631) made by [alabid](https://github.com/alabid)

## Example use: 
 ```js
var object = {
	"obj1key": {
		"obj2key": [
			{
				"obj3key": {
					"tell":"me"
				}
			}
		]
	},
	"obj4key": {
		"obj5key": {
			"obj6key": "hi!",
			"obj7key": "how are you?"
		}
	}
};

var objectCollapsed = CollapseLib.collapseObj(object);
```

Results in:

```js
{
	"obj1key.obj2key.[0].obj3key.tell": "me",
	"obj4key.obj5key.obj6key": "hi!",
	"obj4key.obj5key.obj7key": "how are you?"
}
```

## TODO: Fix bug with empty plain object



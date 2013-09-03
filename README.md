jquery.domidentify.js
=====================

With this plugin, this will be able to get dom identifier and to get the element by using the dom identifier

## Installing

Just drop it into your page's `head` after jQuery. Then it just works.

__Add to your page:__
```html
<script type="text/javascript" src="jquery.domidentify.js"></script>
```


## Usage

Way to get a dom identifier is as follow.

```Javascript
var identifier = $(element).getIdentifyingInfo();
```

Way to get the dom element from dom identifier you got is as follow.

```Javascript
$().getElementByIdentifyingInfo(identifier);
```


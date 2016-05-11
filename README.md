lasso-inline-slots
==================

This plugin allows you to designate certain slots as being "inline". That is, any JavaScript or CSS dependency targeted for a designated inline slot will be inlined into the page as an inline `<script>` tag or an inline `<style>` tag.

# Installation

```bash
npm install lasso-inline-slots --save
```

# Usage

Configure Lasso to use this
```javascript
require('lasso').configure({
    plugins: [
        {
            plugin: 'lasso-inline-slots',
            config: {
                inlineSlots: [
                    'my-inline-slot',
                    'another-inline-slot'
                ]
            }
        }
    ]
});
```

A dependency can be targeted for a slot as shown below:

_browser.json:_

```json
{
    "dependencies": [
        {
            "path": "./foo.js",
            "slot": "my-inline-slot"
        },
        {
            "path": "./foo.css",
            "slot": "my-inline-slot"
        },
        {
            "path": "src/components/foo/browser.json",
            "slot": "another-inline-slot"
        }
    ]
}
```

Finally, you will need to add those slots to your HTML template as shown below:

_template.marko:_

```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>

    <lasso-slot name="my-inline-slot"/>
</head>
<body>
    <h1>Inline Slots Demo</h1>

    <lasso-slot name="another-inline-slot"/>
</body>
</html>
```

The final output might be similar to the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>

    <!-- BEGIN: my-inline-slot -->
    <style>
    .foo {
        color: red;
    }
    </style>
    <script>console.log('foo');</script>
    <!-- END: my-inline-slot -->
</head>
<body>
    <h1>Inline Slots Demo</h1>

    <!-- BEGIN: another-inline-slot -->
    <script>console.log('bar');</script>
    <!-- END: another-inline-slot -->
</body>
</html>
```
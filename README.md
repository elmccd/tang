# tang
Templating language concept

### Motivation

Simple templating language allowing syntax similar to AngularJS directives.

Key points:
- Template is a valid HTML
- Because it's a valid HTML we can use any other markup language that transpile to HTML (e.g Jade)
- Because it's a valid HTML we can minify the template (as HTML) safetly
- Because it's a valid HTML we are getting highlight support in editors
- It looks way more readable
- It doesn't allow custom code in templates - so it's keeping them logic free

### Features

- [ ] Text binding in a text nodes

```js
tang(`<span>{{msg}}</span>`, { msg: 'Hi' });
// --> <span>Hi</span>
```

- [ ] Attribute text binding

```js
tang(`<span :bind=msg></span>`, { msg: 'Hi' });
// --> <span>Hi</span>
```

- [ ] Text binding in attributes

```js
tang(`<span data-id="{{id}}"></span>`, { id: 41 });
// --> <span data-id="41"></span>
```

```js
tang(`<span :data-id=id></span>`, { id: 41 });
// --> <span data-id="41"></span>
```
- [ ] If statements

```js
tang(`<div><span :if=active></span></div>`, { active: false });
// --> <div></div>
```

```js
tang(`<div><span :if=active>Active</span></div>`, { active: true });
// --> <div><span>Active</span></div>
```

- [ ] Loops

```js
tang(`<span :repeat="item of items" :bind="item"></span>`, { items: [1, 2, 3] });
// --> <span>1</span><span>2</span><span>3</span>
```

- [ ] Conditional attribiutes

```js
tang(`<input :disabled="isDisabled"></input>`, { isDisabled: true });
// --> <input disabled="disabled"></input>
```

- [ ] Templates

TBD

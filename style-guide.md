
## ES5-ES7

#### Arrow functions
- Prefer them where sensible
- Do not use in classes where `this` scoping is undesired

#### Async/Await
- Use to make control flow clear whenever async occurs
- ALWAYS prefer just promises in performance-important async code.

```js
class Test {
    async getStuff() {
        const arrayOfStuff = await this.db.stuff.get()
        return arrayOfStuff
    }
}
```

#### Strings
`'` and `"`, it doesnt matter, just use template strings as much as possible.


#### Merging
When merging objects and arrays, prefer ES6 spreads:
```js
let obj = { ...defaultProps, newProp: 1 }
let arr = [ ...defaultItems, 1 ]
```

Keep in mind this is a **shallow** merge, thus references will persist. For deep merging and cloning, use `lutils-merge` and `lutils-clone`.

## Semicolons
*Backed up by [NPM's style guide](https://docs.npmjs.com/misc/coding-style)*

Know your javascript, don't use them, except in these 4 situations:

- In loops, `for (;;)`, they are required
- For single liners `case 'foo': doStuff(); break`
- In front of leading `(` and `[` at the start of the line, to prevent ambiguity from following expressions.
- ES6-7 class non-fn properties, they require them

An example of the only places you need semicolons:

```js
var a = someFunction()
;(x || y).doSomething() // Prevents someFunction()(x || y)

;(function() {
	a = 1
})()

for (var i = 0; i < 10; i ++) {
    switch (state) {
        case 'begin': start(); continue
        case 'end': finish(); break
        default: throw new Error('unknown state')
    }
}

class Test {
    fn() {}
    property = 1;
    static prop = 1;
}
```

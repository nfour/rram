#### Spacing & Indent
- Use `4` spaces throughout
- The linter will also dictate additional minor asthetic spacings and autofix them, for readability
- [x] *Autofixed by linter*

#### Classes
- Utilize ES6 classes over ES5 prototypal "classes"
- `super` and `extends` is permitted
- Do not extend classes roughly beyond twice, as this produces too large of a dependency chain to reason about.

#### Parameters
- Opt int to use keyed objects for paramaters over 3-4 anonymous params in functions
- This improves readability significantly
- Utilize object destructuring in the parameters
- Utilize default values in the parameters

```js
fn({ foo: true , bar: obj })
function fn({ foo, bar = {} }) {
    // ...
}
```

#### Arrow functions
- Prefer them where scope is necessary
- Do not use where `this` scoping is needed
- Utilize named functions for exports to enhance error stacks, as `this` will be `global` and thus useless

```js
export function fn() {
    return {
        foo: 100,
        fn() { // Shorthand standard function
            return () => this.foo // Preserve `this` scoping
        }
    }
}

```

It is an antipattern to use `arguments` which is also discarded by arrow functions which further supports the use case for arrow functions everywhere.

#### Async/Await
- Prefer async await and async denoted functions for async operations
- Make use of `.then` and `.catch` for side effects in order to preserve readability

Async await allows one to bubble errors up just like normal synchronous javascript by default, and always returns a promise.

```js
class Test {
    async getStuff() {
        const arrayOfStuff = await this.db.stuff.get()
        return arrayOfStuff
    }
}
```

#### Strings
- Utilize `template strings` as much as possible.
- [x] *Detected by linter*

#### Merging
- When merging objects and arrays, prefer ES6 spreads:
```js
const obj = { ...defaultProps, newProp: 1 }
const arr = [ ...defaultItems, 1 ]
```

Keep in mind this is a **shallow** merge, thus references will persist.
- For deep merging and cloning, use `lutils-merge` and `lutils-clone`.
- [x] *Detected by linter*

## Semicolons
*Inherited from [NPM's style guide](https://docs.npmjs.com/misc/coding-style)*

Semicolons are not required in javascript and can be reliably excluded in all but one situation:

```js
const a = test()
;[1, 2].map((v) => v)
```
As above, in any instance where `()` can normally be expanded on.
Aside from for loops and multi statement lines, semicolons are not necessary in any other situation.

- [x] *Autofixed by linter*


## ECMASCRIPT FEATURES

#### Arrow functions
- Prefer them always
- Do not use where `this` scoping is needed

It iss an antipattern to use `arguments` which is also discarded by arrow functions which further supports the use case for arrow functions everywhere.

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

#### Merging
- When merging objects and arrays, prefer ES6 spreads:
```js
const obj = { ...defaultProps, newProp: 1 }
const arr = [ ...defaultItems, 1 ]
```

Keep in mind this is a **shallow** merge, thus references will persist.
- For deep merging and cloning, use `lutils-merge` and `lutils-clone`.

## Semicolons
*Inherited from [NPM's style guide](https://docs.npmjs.com/misc/coding-style)*

Semicolons are not required in javascript and can be reliably excluded in all but one situation:

```js
const a = test()
;[1, 2].map((v) => v)
```
As above, in any instance where `()` can normally be expanded on.
Aside from for loops and multi statement lines, semicolons are not necessary in any other situation.

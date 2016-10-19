![RRAM](http://i.imgur.com/JPnXeab.png)

- **React** & **Redux**
- **Airbnb** linted
- **Modular** by design

## INSTALL
```bash
git clone https://github.com/nfour/rram && cd rram
npm run install:all
npm start
```

## STRUCTURE
```
___/ index.jsx
     - Routing, initialization & store creation
     |
     |___/ components
     |     - JSX views
     |
     |___/ containers
     |     - State assignment
     |
     |___/ store
           - Redux store management
           |
           |___/ ${storeItemName}
                 |
                 |___/ actions.js
                 |___/ reducer.js
                 |___/ sources.js
```

## FLOW

Where the route is `/`, a render occurs as such:
```
___/ index.jsx
     + State is reduced
     |
     |___/ store/index.js
     |     + Resolve reducers to state
     |     |
     |     |___/ store/Example/reducer.js
     |
     + Route matched
     + State passed down
     |
     |___/ components/Root/Root.jsx
     |     + All routes pass through this component
     |
     |___/ containers/Page.js
     |     + Any route which should inherit the "page" layout pass through this.
     |     |
     |     |___/ components/Page/Page.jsx
     |           + Wraps children in a page layout component
     |
     |___/ containers/Example.js
           + Assign state to props
           + Retrieve actions
           |
           |___/ store/Example/actions.js
           |
           + Bind dispatch to actions & assign to props
           |
           |___/ components/Example/Example.jsx
                 + Renders
```

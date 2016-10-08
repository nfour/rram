![R2AM](http://i.imgur.com/8WGl3mi.png)

- React & Redux
- Linted with Airbnb
- Enforces modularity

## INSTALL
```bash
git clone https://github.com/nfour/r2am
cd r2am
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

The above is re-run every time the state is changed.

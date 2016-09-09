# LAYOUT - REACT REDUX MODULAR AIRBNB

A layout for a `react`, `redux` client with dev server.
This intends to be an airbnb linted project.


## INSTALL
```bash
git clone https://github.com/nfour/js-structures _temp-js-structures
cp -R ./_temp-js-structures/layouts/react-redux-modular .
rm -rf _temp-js-structures
cd react-redux-modular
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

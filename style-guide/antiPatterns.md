# Antipatterns


## React
### Pure render immutability
In order to preserve performance one needs to consider creation of new entities needlessly in the render method.

#### BAD
```jsx
class Component extends React.Component {
    onClick() { this.setState({ clicked: true }) }

    render() {
        const options = this.props.options || { test: 1 } // Options object created each render if not set

        return <Something
            options={options}
            onClick={this.onClick.bind(this)} // New function created each render
            onTouchTap={(event) => this.onClick(event)} // New function & closure created each render
        />
    }
}
```

#### GOOD
```jsx
class Component extends React.Component {
    options = { test: 1 }

    onClick = () => { this.setState({ clicked: true }) }

    render() {
        const options = this.props.options || this.options // Options object created once

        return <Something
            options={options}
            onClick={this.onClick} // Function created once, bound once
            onTouchTap={this.onClick} // Function created once, bound once
        />
    }
}
```


### Pure render functions
- Use https://github.com/acdlite/recompose

#### BAD
```jsx
export default (props, context) => {
    // ... do expensive compute on props ...

    return (
        {props.items.map((item) =>
            <SomeComponent {...item} />)
        }
    )
}
```

#### GOOD
```jsx
import { pure } from 'recompose'

// See: https://github.com/acdlite/recompose#composition
// For full examples

// This won't be called when the props dont change
export default pure((props, context) => {
    // ... do expensive compute on props ...

    return (
        {props.items.map((item) =>
            <SomeComponent {...item} />)
        }
    )
})
```

In the above example props are computed on heavily and thus the render method should be avoided as much as possible.
In react it is important to break components up when they do expensive operations, as the component hierachy is always rendered
from the top down.

```
- Root
  -> Expensive
    -> UserInput
```

In the above heirachy, if `UserInput` requires a re-render, `Expensive` will have to render. When possible the heirachy should be
something like this:

```
- Root
  -> Container
    -> Expensive
    -> UserInput
```

This way `Expensive` will be skipped.

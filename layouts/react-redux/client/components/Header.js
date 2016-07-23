import React from 'react'
import {
    AppBar, Drawer, MenuItem
} from 'material-ui'

export default class Header extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    }

    state = { drawer: false }

    links = [
        {
            name : "Index",
            to   : "/"
        },
        {
            name : "Pure Render",
            to   : "/pure"
        },
    ]

    navigate(to) {
        this.context.router.push(to)
    }

    render() {
        let title = this.props.location.pathname
            .split('/').slice(1)
            .map((str = '') =>
                str
                    ? str[0].toUpperCase() + str.slice(1)
                    : '/'
            )
            .join(' - ')

        return (
            <div>
                <AppBar
                    title={title}
                    onLeftIconButtonClick={() => this.setState({ drawer: true })}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Drawer
                    docked={false}
                    open={this.state.drawer}
                    onRequestChange={() => this.setState({ drawer: false })}
                >
                    {this.links.map(({ name, to }) =>
                        <MenuItem
                            key={name}
                            onClick={() => {
                                this.navigate(to)
                                this.setState({ drawer: false })
                            }}
                        >{name}</MenuItem>
                    )}
                </Drawer>
            </div>
        )
    }
}

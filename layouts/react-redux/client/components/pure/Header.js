import React from 'react'
import { pure } from 'recompose'
import { AppBar, Drawer, MenuItem } from 'material-ui'

const links = [
    {
        name : "Index",
        to   : "/"
    },
    {
        name : "Pure Render",
        to   : "/pure"
    },
]

const Header = ({ drawer, actions: { setDrawer }, location }, { router }) => {
    let title = location.pathname
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
                onLeftIconButtonTouchTap={() => {
                    setDrawer({ open: true })
                }}
                style={{ background: "#999" }} // Because we pure 
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Drawer
                docked={false}
                open={drawer.open}
                onRequestChange={() => setDrawer({ open: false })}
            >
                {links.map(({ name, to }) =>
                    <MenuItem
                        key={name}
                        onTouchTap={() => {
                            router.push(to)
                            setDrawer({ open: false })
                        }}
                    >{name}</MenuItem>
                )}
            </Drawer>
        </div>
    )
}

Header.contextTypes = {
    router: React.PropTypes.object,
}


export default pure(Header)

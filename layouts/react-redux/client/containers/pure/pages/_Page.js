import React from 'react'
import Header from '../../../components/pure/Header'
import { pure } from 'recompose'

const Page = ({ drawer, location, children, actions }) =>
    <div className="page">
        <Header drawer={drawer} actions={actions} location={location} />
        {children}
    </div>

export default pure(Page)

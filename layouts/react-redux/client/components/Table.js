import React from 'react'
import sorty from 'sorty'
import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized'

import 'react-virtualized/styles.css'

// https://github.com/bvaughn/react-virtualized
export default class Table extends React.Component {
    render() {
        let {
            columns, rows = {}, options = {}
        } = this.props

        if ( options.sortInfo )
            rows = sorty(options.sortInfo, rows)

        return (
            <AutoSizer
                className="components__Table"
                disableHeight={true}
            >
                {({ width }) =>
                    <FlexTable
                        headerHeight={40}
                        rowGetter={ ({ index }) => rows[index] }
                        rowCount={rows.length}
                        rowHeight={40}
                        {...{ width: this.props.width || width }}
                        {...this.props}
                        className="table__flexTable"
                    >
                        {columns.map((column) => {
                            const { key } = column
                            return (
                                <FlexColumn
                                    dataKey={key}
                                    label={key}
                                    width={40}
                                    {...column}
                                />
                            )
                        })}
                    </FlexTable>
                }
            </AutoSizer>
        )
    }
}

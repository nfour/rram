import React from 'react'
import sorty from 'sorty'
import { pure } from 'recompose'
import { AutoSizer, FlexTable, FlexColumn } from 'react-virtualized'

import 'react-virtualized/styles.css'

/**
 *  Virtualized table component.
 *  https://github.com/bvaughn/react-virtualized
 *
 *  Extend & minimize this as needed.
 *  Currently the props are highly dynamic, arbitrary as this is not battle-tested.
 */
export const Table = (props) => {
    let { columns, rows = {}, options = {} } = props

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
                    {...{ width: props.width || width }}
                    {...props}
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

export default pure(Table)

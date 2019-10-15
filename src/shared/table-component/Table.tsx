import React from 'react'
import cn from './table-component.module.css'

import { Table } from 'react-bootstrap'

interface Props {
    tableHead: []
    tableData: []
    stripped?: boolean
    bordered?: boolean
    hover?: boolean
    emptyPlaceholder?: string
}
interface State {}
export default class TableComponent extends React.Component<Props, State> {
    get showTable() {
        return (
            this.props.tableData &&
            this.props.tableData.length &&
            this.props.tableHead &&
            this.props.tableHead.length
        )
    }
    render() {
        const {
            tableHead,
            tableData,
            stripped = false,
            bordered = true,
            hover = true,
            emptyPlaceholder = 'List Is Empty',
        } = this.props

        if (this.showTable) {
            return (
                <div className={cn.table}>
                    <Table
                        striped={stripped}
                        bordered={bordered}
                        hover={hover}
                        hidden={}>
                        <thead>
                            {this.props.tableHead.map((headCell) => {
                                return <th>{headCell}</th>
                            })}
                        </thead>
                        <tbody>
                            {this.props.tableData.map((dataItem) => {
                                return (
                                    <tr>
                                        {dataItem &&
                                            dataItem.map((cell) => {
                                                return <td>{cell}</td>
                                            })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return <div>{emptyPlaceholder}</div>
        }
    }
}

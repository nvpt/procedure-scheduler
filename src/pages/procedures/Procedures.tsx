import React from 'react'
import cn from './procedures.module.css'
import { Table } from 'react-bootstrap'
import { ProceduresList } from '../../mock/ProceduresMock'

interface ProceduresProps {}
interface ProceduresState {}
export default class Procedures extends React.Component<
    ProceduresProps,
    ProceduresState
> {
    state = {
        procedures: ProceduresList,
        emptyPlaceholder: 'No procedures.',
    }
    render() {
        const { procedures, emptyPlaceholder } = this.state

        if (procedures && procedures.length) {
            return (
                <div className={cn.procedures}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Patient</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Planned Start Time</th>
                                <th>Estimated End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {procedures.map((procedure) => {
                                return (
                                    <tr key={procedure.Id}>
                                        <td>{procedure.Id}</td>
                                        <td>{procedure.Patient}</td>
                                        <td>{procedure.Description}</td>
                                        <td>{procedure.Status}</td>
                                        <td>{procedure.PlannedStartTime}</td>
                                        <td>{procedure.EstimatedEndTime}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return <div className={cn.procedures}>{emptyPlaceholder}</div>
        }
    }
}

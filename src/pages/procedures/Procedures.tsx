import React from 'react'
import cn from './procedures.module.css'
import { Table } from 'react-bootstrap'
import { ProceduresList } from '../../mock/ProceduresMock'
import TopPanel from '../../shared/top-panel/TopPanel'
import ProcedureInterface from '../../interfaces/ProcedureInterface'
import AddProcedureModal from './coponents/add-procedure-modal/AddProcedureModal'

interface ProceduresProps {}
interface ProceduresState {
    procedures: ProcedureInterface[]
    emptyPlaceholder: string
    showAdding: boolean
}
export default class Procedures extends React.Component<
    ProceduresProps,
    ProceduresState
> {
    state = {
        procedures: ProceduresList,
        emptyPlaceholder: 'No procedures.',
        showAdding: false,
    }

    handleShowHideModal(status: boolean = false) {
        this.setState({
            showAdding: status,
        })
    }

    render() {
        const { procedures, emptyPlaceholder, showAdding } = this.state

        if (procedures && procedures.length) {
            return (
                <div className={cn.procedures}>
                    <TopPanel
                        title={'Procedures'}
                        buttonLabel={'Procedure'}
                        addAction={() => {
                            this.handleShowHideModal(true)
                        }}
                    />
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
                    <AddProcedureModal
                        show={showAdding}
                        setOnHideShow={()=>{this.handleShowHideModal()}}
                    />
                </div>
            )
        } else {
            return <div className={cn.procedures}>{emptyPlaceholder}</div>
        }
    }
}

import React from 'react'
import cn from './procedures.module.css'
import { Table } from 'react-bootstrap'
import { ProceduresList } from '../../mock/ProceduresMock'
import TopPanel from '../../shared/top-panel/TopPanel'
import ProcedureInterface from '../../interfaces/ProcedureInterface'
import ProcedureModal from './coponents/procedure-modal/ProcedureModal'

interface ProceduresProps {}
interface ProceduresState {
    procedures: ProcedureInterface[]
    emptyPlaceholder: string
    showModal: boolean
}
export default class Procedures extends React.Component<
    ProceduresProps,
    ProceduresState
> {
    state = {
        procedures: ProceduresList,
        emptyPlaceholder: 'No procedures.',
        showModal: false,
    }

    handleShowHideModal(status: boolean = false) {
        this.setState({
            showModal: status,
        })
    }

    render() {
        const { procedures, emptyPlaceholder, showModal } = this.state

        if (procedures && procedures.length) {
            return (
                <div className={cn.procedures}>
                    <TopPanel
                        title={'Procedures'}
                        buttonLabel={'Procedure'}
                        onAction={() => {
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
                                    <tr
                                        key={procedure.Id}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            this.handleShowHideModal(true)
                                        }}>
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
                    <ProcedureModal
                        show={showModal}
                        setOnHideShow={() => {
                            this.handleShowHideModal()
                        }}
                    />
                </div>
            )
        } else {
            return <div className={cn.procedures}>{emptyPlaceholder}</div>
        }
    }
}

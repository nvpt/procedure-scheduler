import React from 'react'
import { Table } from 'react-bootstrap'

import { connect } from 'react-redux'
import { proceduresActions } from '../../store-global/reducers/ProceduresReducer'

import cn from './procedures.module.css'
import TopPanel from '../../shared/top-panel/TopPanel'

import ProcedureModal from './coponents/procedure-modal/ProcedureModal'
import ProcedureInterface from '../../interfaces/ProcedureInterface'
import { ProceduresList } from '../../mock/ProceduresMock'


interface ProceduresProps {
    procedures: ProcedureInterface[]
    onGetProcedures: (procedures: ProcedureInterface[]) => void
    onAddProcedure: (procedures: ProcedureInterface[]) => void
    onUpdateProcedure: (procedures: ProcedureInterface[]) => void
    onDeleteProcedure: (procedures: ProcedureInterface[]) => void
}
interface ProceduresState {
    emptyPlaceholder: string
    showModal: boolean
    currentProcedureData: ProcedureInterface
}
class Procedures extends React.Component<
    ProceduresProps,
    ProceduresState
> {
    constructor(props: ProceduresProps) {
        super(props)
        this.state = {
            emptyPlaceholder: 'No procedures.',
            showModal: false,
            currentProcedureData: {} as ProcedureInterface,
        }
        this.getProcedures()
    }

    handleSaveAndHideModal(
        status: boolean = false,
        currentProcedureData: ProcedureInterface = {} as ProcedureInterface,
    ) {
        if (this._procedureIsExist(currentProcedureData)) {
            this.props.onUpdateProcedure([currentProcedureData])
        } else {
            this.props.onAddProcedure([currentProcedureData])
        }
        this.setState({
            showModal: status,
            currentProcedureData: {} as ProcedureInterface,
        })
    }

    handleShowModal(
        status: boolean = false,
        procedure: ProcedureInterface = {} as ProcedureInterface,
    ) {
        if (procedure && Object.keys(procedure).length) {
            this.setState({
                currentProcedureData: Object.assign(
                    this.state.currentProcedureData,
                    procedure,
                ),
            })
        } else {
            this.setState({
                currentProcedureData: {} as ProcedureInterface,
            })
        }

        this.setState({
            showModal: status,
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        })
    }

    handleDeleteProcedure(event: any, procedure: ProcedureInterface) {
        event.stopPropagation()
        this.props.onDeleteProcedure([procedure])
    }

    getProcedures() {
        //todo: *** here should be request
        this.props.onGetProcedures(ProceduresList)
    }

    render() {
        const { emptyPlaceholder, showModal, currentProcedureData } = this.state
        const { procedures } = this.props

        return (
            <div className={cn.procedures}>
                <TopPanel
                    title={'Procedures'}
                    buttonLabel={'Procedure'}
                    onAction={() => {
                        this.handleShowModal(true)
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
                            <th> </th>
                        </tr>
                    </thead>
                    {procedures && procedures.length ? (
                        <tbody>
                            {procedures.map((procedure, i) => {
                                return (
                                    <tr
                                        key={i}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            this.handleShowModal(true)
                                        }}>
                                        <td>{procedure.Id}</td>
                                        <td>{procedure.Patient}</td>
                                        <td>{procedure.Description}</td>
                                        <td>{procedure.Status}</td>
                                        <td>{procedure.PlannedStartTime}</td>
                                        <td>{procedure.EstimatedEndTime}</td>
                                        <td
                                            className={cn.delete}
                                            onClick={(event) => {
                                                this.handleDeleteProcedure(
                                                    event,
                                                    procedure,
                                                )
                                            }}>
                                            x
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={7}>{emptyPlaceholder}</td>
                            </tr>
                        </tbody>
                    )}
                </Table>
                {this.state.showModal ? (
                    <ProcedureModal
                        show={showModal}
                        procedureData={currentProcedureData}
                        closeModal={() => {
                            this.handleCloseModal()
                        }}
                        saveAndHide={(showModal, currentProcedureData) => {
                            this.handleSaveAndHideModal(
                                showModal,
                                currentProcedureData,
                            )
                        }}
                    />
                ) : null}
            </div>
        )
    }
    _procedureIsExist(checkedProcedure: ProcedureInterface) {
        return this.props.procedures.some(
            (procedure: ProcedureInterface) =>
                procedure.Id === checkedProcedure.Id,
        )
    }
}

export default connect(
    (storeGlobal: any) => {
        return { procedures: storeGlobal.procedures }
    },
    (dispatch) => ({
        onGetProcedures: (procedures: ProcedureInterface[]) => {
            dispatch({ type: proceduresActions.GET_PROCEDURES, procedures })
        },
        onAddProcedure: (procedures: ProcedureInterface[]) => {
            dispatch({ type: proceduresActions.ADD_PROCEDURE, procedures })
        },
        onUpdateProcedure: (procedures: ProcedureInterface[]) => {
            dispatch({ type: proceduresActions.UPDATE_PROCEDURE, procedures })
        },
        onDeleteProcedure: (procedures: ProcedureInterface[]) => {
            dispatch({ type: proceduresActions.DELETE_PROCEDURE, procedures })
        },
    }),
)(Procedures)

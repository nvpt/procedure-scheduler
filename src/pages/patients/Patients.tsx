import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { patientsActions } from '../../store-global/reducers/PatientsReducer'

import cn from './patients.module.css'

import TopPanel from '../../shared/top-panel/TopPanel'
import PatientModal from './coponents/patient-modal/PatientModal'
import PatientInterface from '../../interfaces/PatientInterface'

import { PatientsList } from '../../mock/PatientsMock'

interface PatientsProps {
    patients: PatientInterface[]
    onGetPatients: (patients: PatientInterface[]) => void
    onAddPatient: (patients: PatientInterface[]) => void
    onUpdatePatient: (patients: PatientInterface[]) => void
    onDeletePatient: (patients: PatientInterface[]) => void
}
interface PatientsState {
    emptyPlaceholder: string
    showModal: boolean
    currentPatientData: PatientInterface
}

class Patients extends React.Component<PatientsProps, PatientsState> {
    constructor(props: PatientsProps) {
        super(props)
        this.state = {
            emptyPlaceholder: 'No patients.',
            showModal: false,
            currentPatientData: {} as PatientInterface,
        }
        this.getPatients()
    }

    handleSaveAndHideModal(
        status: boolean = false,
        currentPatientData: PatientInterface = {} as PatientInterface,
    ) {
        if (this._patientIsExist(currentPatientData)) {
            this.props.onUpdatePatient([currentPatientData])
        } else {
            this.props.onAddPatient([currentPatientData])
        }
        this.setState({
            showModal: status,
            currentPatientData: {} as PatientInterface,
        })
    }

    handleShowModal(
        status: boolean = false,
        patient: PatientInterface = {} as PatientInterface,
    ) {
        if (patient && Object.keys(patient).length) {
            this.setState({
                currentPatientData: Object.assign(
                    this.state.currentPatientData,
                    patient,
                ),
            })
        } else {
            this.setState({
                currentPatientData: {} as PatientInterface,
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

    handleDeletePatient(event: any, patient: PatientInterface) {
        event.stopPropagation()
        this.props.onDeletePatient([patient])
    }

    getPatients() {
        //todo: *** here should be request
        this.props.onGetPatients(PatientsList)
    }

    render() {
        const { emptyPlaceholder, showModal, currentPatientData } = this.state
        const { patients } = this.props

        return (
            <div className={cn.patients}>
                <TopPanel
                    title={'Patients'}
                    buttonLabel={'Patient'}
                    onAction={() => {
                        this.handleShowModal(true)
                    }}
                />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Day of Birth</th>
                            <th> </th>
                        </tr>
                    </thead>
                    {patients && patients.length ? (
                        <tbody>
                            {patients.map((patient, i) => {
                                return (
                                    <tr
                                        key={i}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            this.handleShowModal(true, patient)
                                        }}>
                                        <td>{patient.Id}</td>
                                        <td>{patient.Name}</td>
                                        <td>{patient.Sex}</td>
                                        <td>{patient.DayOfBirth}</td>
                                        <td
                                            className={cn.delete}
                                            onClick={(event) => {
                                                this.handleDeletePatient(
                                                    event,
                                                    patient,
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
                                <td colSpan={5}>{emptyPlaceholder}</td>
                            </tr>
                        </tbody>
                    )}
                </Table>

                {this.state.showModal ? (
                    <PatientModal
                        show={showModal}
                        patientData={currentPatientData}
                        closeModal={() => {
                            this.handleCloseModal()
                        }}
                        saveAndHide={(showModal, currentPatientData) => {
                            this.handleSaveAndHideModal(
                                showModal,
                                currentPatientData,
                            )
                        }}
                    />
                ) : null}
            </div>
        )
    }

    _patientIsExist(patient: PatientInterface) {
        return this.props.patients.some(
            (person: PatientInterface) => person.Id === patient.Id,
        )
    }
}

export default connect(
    //todo: *** should define type
    (storeGlobal: any) => {
        return { patients: storeGlobal.patients }
    },
    (dispatch) => ({
        onGetPatients: (patients: PatientInterface[]) => {
            dispatch({ type: patientsActions.GET_PATIENTS, patients })
        },
        onAddPatient: (patients: PatientInterface[]) => {
            dispatch({ type: patientsActions.ADD_PATIENT, patients })
        },
        onUpdatePatient: (patients: PatientInterface[]) => {
            dispatch({ type: patientsActions.UPDATE_PATIENT, patients })
        },
        onDeletePatient: (patients: PatientInterface[]) => {
            dispatch({ type: patientsActions.DELETE_PATIENT, patients })
        },
    }),
)(Patients)

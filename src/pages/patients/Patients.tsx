import React from 'react'
import cn from './patients.module.css'
import { Table } from 'react-bootstrap'
import { PatientsList } from '../../mock/PatientsMock'
import TopPanel from '../../shared/top-panel/TopPanel'
import AddPatientModal from './coponents/add-patient-modal/AddPatientModal'
import PatientInterface from '../../interfaces/PatientInterface'

interface PatientsProps {}
interface PatientsState {
    patients: PatientInterface[]
    emptyPlaceholder: string
    showModal: boolean
    currentPatientData: PatientInterface
}

export default class Patients extends React.Component<
    PatientsProps,
    PatientsState
> {
    state = {
        patients: PatientsList,
        emptyPlaceholder: 'No patients.',
        showModal: false,
        currentPatientData: {} as PatientInterface,
    }

    handleSaveAndHideModal(
        status: boolean = false,
        currentPatientData: PatientInterface = {} as PatientInterface,
    ) {
        this.setState({
            showModal: status,
            currentPatientData: Object.assign(
                this.state.currentPatientData,
                currentPatientData,
            ),
        })
    }

    handleShowModal(
        status: boolean = false,
        patient: PatientInterface = {} as PatientInterface,
    ) {
        if (patient && Object.keys(patient).length) {
            this.setState({
                currentPatientData: { ...patient },
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

    render() {
        const {
            patients,
            emptyPlaceholder,
            showModal,
            currentPatientData,
        } = this.state

        if (patients && patients.length) {
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
                            </tr>
                        </thead>
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div>{this.state.currentPatientData.Name}</div>

                    {this.state.showModal ? (
                        <AddPatientModal
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
        } else {
            return <div className={cn.patients}>{emptyPlaceholder}</div>
        }
    }
}

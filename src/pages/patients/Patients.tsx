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
    showAdding: boolean
    formData: PatientInterface | {}
}

export default class Patients extends React.Component<
    PatientsProps,
    PatientsState
> {
    state = {
        patients: PatientsList,
        emptyPlaceholder: 'No patients.',
        showAdding: false,
        formData: {},
    }

    handleHideModal(
        status: boolean = false,
        formData: PatientInterface | {} = {},
    ) {
        console.log(
            'Patients.tsx__handleShowHideModal__30 >>> formData: ',
            formData,
        )
        console.log(
            'Patients.tsx__handleShowHideModal__31 >>> this.state: ',
            this.state,
        )
        this.setState({
            showAdding: status,
            formData: Object.assign(this.state.formData, formData),
        })
        console.log(
            'Patients.tsx__handleHideModal >>> this.state: ',
            this.state,
        )
    }

    handleShowModal(
        status: boolean = false,
        patient: PatientInterface | {} = {},
    ) {
        this.setState({
            showAdding: status,
        })
        if(patient && Object.keys(patient).length) {
            console.log('58');
            
            this.setState({
                formData: { ...patient },
            })
        } else {
            console.log('64');
            
            this.setState({
                formData: {},
            })
        }

    }

    render() {
        const { patients, emptyPlaceholder, showAdding, formData } = this.state

        if (patients && patients.length) {
            return (
                <div className={cn.patients}>
                    <TopPanel
                        title={'Patients'}
                        buttonLabel={'Patient'}
                        addAction={() => {
                            this.handleShowModal(true, this.state.formData)
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
                            {patients.map((patient) => {
                                return (
                                    <tr
                                        key={patient.Id}
                                        style={{ cursor: 'pointer' }}>
                                        <td>{patient.Id}</td>
                                        <td>{patient.Name}</td>
                                        <td>{patient.Sex}</td>
                                        <td>{patient.DayOfBirth}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <AddPatientModal
                        show={showAdding}
                        setOnHideModal={(showModal, formData) => {
                            this.handleHideModal(showModal, formData)
                        }}
                    />
                </div>
            )
        } else {
            return <div className={cn.patients}>{emptyPlaceholder}</div>
        }
    }
}

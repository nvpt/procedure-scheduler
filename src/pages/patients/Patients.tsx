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
    show: boolean
}
export default class Patients extends React.Component<
    PatientsProps,
    PatientsState
> {
    state = {
        patients: PatientsList,
        emptyPlaceholder: 'No patients.',
        show: false,
    }

    addPatient() {
        this.setState({
            show: true,
        })
    }

    hahdleShowHideModal(status: boolean) {
        this.setState({
            show: status,
        })
    }

    render() {
        const { patients, emptyPlaceholder, show } = this.state

        if (patients && patients.length) {
            return (
                <div className={cn.patients}>
                    <TopPanel
                        title={'Patients'}
                        buttonLabel={'Patient'}
                        addAction={() => {
                            this.addPatient()
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
                                    <tr key={patient.Id}>
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
                        show={show}
                        setOnHideShow={() => {
                            this.hahdleShowHideModal(false)
                        }}
                    />
                </div>
            )
        } else {
            return <div className={cn.patients}>{emptyPlaceholder}</div>
        }
    }
}

import React from 'react'
import cn from './patients.module.css'
import { Table } from 'react-bootstrap'
import { PatientsList } from '../../mock/PatientsMock'

interface PatientsProps {}
interface PatientsState {}
export default class Patients extends React.Component<
    PatientsProps,
    PatientsState


> {
    state = {
        patients: PatientsList,
        emptyPlaceholder: 'No patients.',
    }
    render(): React.ReactElement<any> | null | undefined {
        const { patients, emptyPlaceholder } = this.state

        if (patients && patients.length) {
            return (
                <div className={cn.patients}>
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
                </div>
            )
        } else {
            return <div className={cn.patients}>{emptyPlaceholder}</div>
        }
    }
}

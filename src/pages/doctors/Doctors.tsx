import React from 'react'

import cn from './doctors.module.css'
import { DoctorsList } from '../../mock/DoctorsMock'
import DoctorInterface from '../../interfaces/DoctorInterface'
import { Table } from 'react-bootstrap'
import TopPanel from '../../shared/top-panel/TopPanel'

interface DoctorsProps {}
interface DoctorsState {
    doctors: Array<DoctorInterface>
    emptyPlaceholder: string
}

export default class Doctors extends React.Component<
    DoctorsProps,
    DoctorsState
> {
    state: DoctorsState = {
        doctors: DoctorsList,
        emptyPlaceholder: 'No Doctors.',
    }
    render() {
        const { doctors, emptyPlaceholder } = this.state

        return (
            <div className={cn.doctors}>
                <TopPanel title={'Doctors'} />
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    {doctors && doctors.length ? (
                        <tbody>
                            {doctors.map((doctor) => {
                                return (
                                    <tr key={doctor.Id}>
                                        <td>{doctor.Id}</td>
                                        <td>{doctor.Name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={2}>{emptyPlaceholder}</td>
                            </tr>
                        </tbody>
                    )}
                </Table>
            </div>
        )
    }
}

import React from 'react'

import cn from './doctors.module.css'
import { DoctorsList } from '../../mock/DoctorsMock'
import DoctorInterface from '../../interfaces/DoctorInterface'

interface DoctorsProps {}
interface DoctorsState {
    doctors: Array<DoctorInterface>
}

export default class Doctors extends React.Component<
    DoctorsProps,
    DoctorsState
> {
    state: DoctorsState = {
        doctors: DoctorsList,
    }
    render() {
        console.log('Doctors.tsx__render >>> DoctorsList: ', DoctorsList)

        return <div>Here will be doctors table</div>
    }
}

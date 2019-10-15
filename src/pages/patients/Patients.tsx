import React from 'react'

import cn from './patients.module.css'
interface PatientsProps {}
interface PatientsState {}
export default class Patients extends React.Component<PatientsProps, PatientsState> {

    render(): React.ReactElement<any> | null | undefined {
        return (
            <div>Here will be patients table</div>
        )
    }
}

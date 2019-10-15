import React from 'react'

import cn from './doctors.module.css'
interface DoctorsProps {}
interface DoctorsState {}

export default class Doctors extends React.Component<
    DoctorsProps,
    DoctorsState
> {
    constructor(props: DoctorsProps) {
        super(props)
    }
    render() {
        return <div>Here will be doctors table</div>
    }
}

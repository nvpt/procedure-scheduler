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
    formData: any
}
export default class Patients extends React.Component<
    PatientsProps,
    PatientsState
> {
    state = {
        patients: PatientsList,
        emptyPlaceholder: 'No patients.',
        showAdding: false,
        formData: {}
    }

    handleShowHideModal(status: boolean = false, formData: any = null) {
        this.setState({
            showAdding: status,
            // formData
        })
        // console.log('this.state.formData: ', this.state.formData)
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
                            this.handleShowHideModal(true)
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
                        writeFormData={(data: any)=>{
                            console.log('Patients.tsx__76 >>> data: ', data);
                            
                            this.setState({
                                formData: data
                            })
                            console.log('Patients.tsx__83 >>> data: ', data);
                            if(this.state.formData){
                                // @ts-ignore
                                console.log('Patients.tsx__86 >>> this.state: ', this.state.formData.current);
                            }
                            
                        }}
                        setOnHideShow={(showModal, formData) => {
                            this.handleShowHideModal(showModal, formData)
                        }}
                    />
                </div>
            )
        } else {
            return <div className={cn.patients}>{emptyPlaceholder}</div>
        }
    }
}

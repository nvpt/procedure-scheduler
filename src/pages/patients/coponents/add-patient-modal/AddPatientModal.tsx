import React from 'react'
import cn from './add-patient-modal.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PatientInterface from '../../../../interfaces/PatientInterface'

interface PropsAddPatients {
    show: boolean
    patientData: PatientInterface
    saveAndHide: (status: boolean, patientData: any) => void
    closeModal: () => void
}

interface StateAddPatients {
    modalTitle: string
    formData: PatientInterface
}

export default class AddPatientModal extends React.Component<PropsAddPatients,
    StateAddPatients> {
    constructor(props: PropsAddPatients) {
        super(props)
        this.state = {
            modalTitle: 'Add Patient',
            formData: {
                Id: null,
                Name: '',
                Sex: null,
                DayOfBirth: null,
            } as PatientInterface,
        }
        // this.initFormData()
        console.log(
            'AddPatientModal.tsx__constructor >>> this.state.formData: ',
            this.state.formData,
        )
    }

    handleChangeName(event: any) {
        const formData = { ...this.state.formData }
        formData.Name = event.target.value
        formData.Id = formData.Id ? formData.Id : Number(Date.now())
        this.setState({ formData })
    }

    // initFormData() {
    //     console.log('39')
    //
    //     if (
    //         this.props.patientData &&
    //         Object.keys(this.props.patientData).length
    //     ) {
    //         console.log('42')
    //
    //         this.setState({
    //             formData: { ...this.props.patientData },
    //         })
    //     }
    // }

    resetForm() {
        const resetForm: PatientInterface = {
            Id: 0,
            Name: '',
        }
        this.setState({
            formData: { ...resetForm },
        })
    }

    render() {
        const { modalTitle } = this.state
        const { show, saveAndHide, closeModal, patientData } = this.props
console.log('AddPatientModal.tsx__render >>> patientData: ', patientData);

        const handleSave = () => {
            saveAndHide(false, { ...this.state.formData })
            this.resetForm()
        }

        const handleCLose = () => {
            closeModal()
            this.resetForm()
        }

        return (
            <div>
                <Modal show={show} onHide={handleCLose} animation={true}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSave()
                        }}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId='formName'>
                                <Form.Label column={false}>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Name'
                                    required
                                    value={this.props.patientData.Name ? this.props.patientData.Name : this.state.formData.Name}
                                    onChange={(event: any) => {
                                        this.handleChangeName(event)
                                    }}
                                />
                                <Form.Text className='text-muted'>
                                    Field is required
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formDayOfBirth'>
                                <Form.Label column={false}>
                                    Day of Birth
                                </Form.Label>
                                <Form.Control
                                    type='date'
                                    name='Day of Birth'
                                    placeholder='Day of Birth'
                                />
                                <Form.Text className='text-muted'>
                                    Field is required
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formSex'>
                                <Form.Label column={false}>Sex</Form.Label>
                                <Form.Check
                                    type='radio'
                                    id='Male'
                                    label='Male'
                                    name='Sex'
                                />
                                <Form.Check
                                    type='radio'
                                    id='Female'
                                    label='Female'
                                    name='Sex'
                                />
                                <Form.Text className='text-muted'>
                                    Field is required
                                </Form.Text>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleCLose}>
                                Cancel
                            </Button>
                            <Button variant='primary' onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

import React from 'react'
import cn from './add-patient-modal.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PatientInterface from '../../../../interfaces/PatientInterface'

interface AddPatientsProps {
    show: boolean
    setOnHideModal: (status: boolean, formData: any) => void
}
interface AddPatientsState {
    modalTitle: string
    formData: PatientInterface
}

export default class AddPatientModal extends React.Component<
    AddPatientsProps,
    AddPatientsState
> {
    state = {
        modalTitle: 'Add Patient',
        formData: {
            Id: 0,
            Name: '',
            Sex: null,
            DayOfBirth: null,
        },
    }

    handleChangeName(event: any) {
        const formData = { ...this.state.formData }
        formData.Name = event.target.value
        formData.Id = Number(Date.now())
        this.setState({ formData })
    }

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
        const { show, setOnHideModal } = this.props

        const handleClose = () => {
            setOnHideModal(false, { ...this.state.formData });
            this.resetForm();
            console.log('this.state: ', this.state);
            
        }

        return (
            <div>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleClose()
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
                                    value={this.state.formData.Name}
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
                            <Button variant='secondary' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant='primary' onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

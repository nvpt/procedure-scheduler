import React, { createRef } from 'react'
import cn from './add-patient-modal.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

interface AddPatientsProps {
    show: boolean
    setOnHideShow: (status: boolean, formData: any) => void
    writeFormData: (data: any) => void
}
interface AddPatientsState {
    modalTitle: string
    refs: any
}

export default class AddPatientModal extends React.Component<
    AddPatientsProps,
    AddPatientsState
> {
    state = {
        modalTitle: 'Add Patient',
        // refs: React.createRef<Form<any>>()
        refs: React.createRef<HTMLFormElement>(),
    }

    render() {
        const { modalTitle } = this.state
        const { show, setOnHideShow, writeFormData } = this.props
        const handleClose = () => {
            writeFormData({...this.state.refs})
            let x = {...this.state.refs.current}
            console.log('AddPatientModal.tsx__handleClose__33 >>> x: ', x);
            
            setOnHideShow(false, x)
        }

        return (
            <div>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <form
                        ref={this.state.refs}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleClose();
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
                                />
                                <Form.Text className='text-muted'>
                                    Field is required
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId='formBirthDay'>
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

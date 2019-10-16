import React from 'react'
import cn from './patient-modal.module.css'
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

export default class PatientModal extends React.Component<
    PropsAddPatients,
    StateAddPatients
> {
    constructor(props: PropsAddPatients) {
        super(props)
        this.state = {
            modalTitle: 'Add Patient',
            formData: {
                Id: 0,
                Name: '',
                Sex: null,
                DayOfBirth: '',
            } as PatientInterface,
        }
    }

    handleChangeName(event: any) {
        const formData = { ...this.state.formData }
        formData.Name = event.target.value
        this.setState({ formData })
    }

    handleChangeSex(event: any) {
        const formData = { ...this.state.formData }
        formData.Sex = event.target.value
        this.setState({ formData })
    }

    handleChangeDoB(event: any) {
        const formData = { ...this.state.formData }
        formData.DayOfBirth = event.target.value
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

    initFormData() {
        if (
            this.props.patientData &&
            Object.keys(this.props.patientData).length
        ) {
            this.setState({
                formData: { ...this.props.patientData },
            })
        }
    }

    componentDidMount(): void {
        this.initFormData()
    }

    render() {
        const { modalTitle } = this.state
        const { show, saveAndHide, closeModal } = this.props

        const handleSave = () => {
            const formData = this.state.formData;
            formData.Id = formData.Id && formData.Id !== 0 ? formData.Id : Number(Date.now())
            saveAndHide(false, { ...this.state.formData })
            this.resetForm()
        }

        const handleCLose = () => {
            closeModal()
            this.resetForm()
        }

        return (
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
                            <Form.Label column={false}>Day of Birth</Form.Label>
                            <Form.Control
                                type='date'
                                name='Day of Birth'
                                placeholder='Day of Birth'
                                value={this.state.formData.DayOfBirth}
                                onChange={(event: any) => {
                                    this.handleChangeDoB(event)
                                }}
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
                                checked={
                                    (this.state.formData.Sex as string) ===
                                    'Male'
                                }
                                value={'Male'}
                                onChange={(event: any) => {
                                    this.handleChangeSex(event)
                                }}
                            />
                            <Form.Check
                                type='radio'
                                id='Female'
                                label='Female'
                                name='Sex'
                                checked={
                                    (this.state.formData.Sex as string) ===
                                    'Female'
                                }
                                value={'Female'}
                                onChange={(event: any) => {
                                    this.handleChangeSex(event)
                                }}
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
        )
    }
}

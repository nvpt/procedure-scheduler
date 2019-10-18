import React from 'react'
import cn from './patient-modal.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PatientInterface from '../../../../interfaces/PatientInterface'

type optionName = 'Name' | 'Sex' | 'DayOfBirth' // according to PatientInterface keys

interface PropsAddPatients {
    show: boolean
    patientData: PatientInterface
    saveAndHide: (status: boolean, patientData: PatientInterface) => void
    closeModal: () => void
}

interface StateAddPatients {
    modalTitle: string
    formData: PatientInterface
    validated: boolean
}

export default class PatientModal extends React.Component<
    PropsAddPatients,
    StateAddPatients
> {
    state = {
        modalTitle: 'Add Patient',
        formData: {
            Id: 0,
            Name: '',
            Sex: null,
            DayOfBirth: '',
        } as PatientInterface,
        validated: false
    }

    handleChangeOption(event: any, optionName: optionName) {
        console.log(
            'PatientModal.tsx__handleChangeOption >>> event: ',
            event.target,
        )
        const formData = { ...this.state.formData }
        formData[optionName] = event.target.value
        this.setState({ formData })
    }

    resetForm() {
        const resetForm: PatientInterface = {
            Id: 0,
            Name: '',
        }
        this.setState({
            formData: resetForm,
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
        const { modalTitle, validated } = this.state
        const { show, saveAndHide, closeModal } = this.props

        const handleSave = () => {
            const formData = this.state.formData
            formData.Id =
                formData.Id && formData.Id !== 0
                    ? formData.Id
                    : Number(Date.now())
            saveAndHide(false, { ...this.state.formData })
            this.resetForm()
        }

        const handleClose = () => {
            closeModal()
            this.resetForm()
        }

        const handleSubmit = (event: any) => {
            this.setState({validated: true})
            const form = event.currentTarget
            console.log('PatientModal.tsx__handleSubmit >>> form: ', form);
            
            const isValid = form.checkValidity();

            
            console.log('PatientModal.tsx__handleSubmit >>> isValid: ', isValid);
            
            if(isValid){
                handleSave()
            } else {
                event.preventDefault()
                event.stopPropagation();
            }
        }

        return (
            <Modal show={show} onHide={handleClose} animation={true}>
                <Form
                    className={validated ? 'was-validated' : ''}
                    noValidate
                    onSubmit={handleSubmit}
                    validated={validated}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId='formName'>
                            <Form.Label column={false}>Name*</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                placeholder='Enter the Name'
                                value={this.state.formData.Name}
                                onChange={(event: any) => {
                                    this.handleChangeOption(event, 'Name')
                                }}
                            />
                            <Form.Control.Feedback
                                type={'invalid'}>
                                Field is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formDayOfBirth'>
                            <Form.Label column={false}>Day of Birth*</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                onFocus={(event:any)=>{event.target.type='date'}}
                                onBlur={(event:any):void=>{
                                    if(!event.target.value) event.target.type='text'}}
                                placeholder='Enter the Day of Birth'
                                value={this.state.formData.DayOfBirth ? this.state.formData.DayOfBirth : ''}
                                onChange={(event: any) => {
                                    this.handleChangeOption(event, 'DayOfBirth')
                                }}
                            />
                            <Form.Control.Feedback
                                type={'invalid'}>
                                Field is required
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formSex'>
                            <Form.Label column={false}>Sex*</Form.Label>
                            <Form.Check
                                type='radio'
                                id='Male'
                                label='Male'
                                name='Sex'
                                required
                                checked={
                                    (this.state.formData.Sex as string) ===
                                    'Male'
                                }
                                value={'Male'}
                                isInvalid={validated && !this.state.formData.Sex}
                                onChange={(event: any) => {
                                    this.handleChangeOption(event, 'Sex')
                                }}
                            />
                            <Form.Check
                                type='radio'
                                id='Female'
                                label='Female'
                                name='Sex'
                                required
                                checked={
                                    (this.state.formData.Sex as string) ===
                                    'Female'
                                }
                                value={'Female'}
                                isInvalid={validated && !this.state.formData.Sex}
                                feedback="Field is required"
                                onChange={(event: any) => {
                                    this.handleChangeOption(event, 'Sex')
                                }}
                            />
                            <Form.Text className={['text-muted', cn.required].join(' ')}>* - required fields</Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant='primary' type={'submit'}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

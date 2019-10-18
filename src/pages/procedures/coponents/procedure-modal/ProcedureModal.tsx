import React from 'react'
import cn from './procedure-modal.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ProcedureInterface, {
    statusType,
} from '../../../../interfaces/ProcedureInterface'
import Form from 'react-bootstrap/Form'
import PatientInterface from '../../../../interfaces/PatientInterface'

type optionName =
    | 'Patient'
    | 'Description'
    | 'Status'
    | 'PlannedStartTime'
    | 'EstimatedEndTime' // according to ProcedureInterface keys

const STATUSES: statusType[] = ['Planned', 'In Progress', 'Finished']

interface AddProceduresProps {
    show: boolean
    procedureData: ProcedureInterface
    patients: PatientInterface[]
    saveAndHide: (status: boolean, procedureData: ProcedureInterface) => void
    closeModal: () => void
}
interface AddProceduresState {
    modalTitle: string
    formData: ProcedureInterface
    validated: boolean
}

export default class ProcedureModal extends React.Component<
    AddProceduresProps,
    AddProceduresState
> {
    state = {
        modalTitle: 'Add Procedure',
        formData: {
            Id: 0,
            Patient: '',
            Description: '',
            Status: 'Planned',
            DateOfProcedure: '',
            PlannedStartTime: '',
            EstimatedEndTime: '',
        } as ProcedureInterface,
        validated: false,
    }

    handleChangeOption(event: any, optionName: optionName) {
        const formData = { ...this.state.formData }
        formData[optionName] = event.target.value
        this.setState({ formData })
    }

    handleChangePatient(patientName: string) {
        const formData = { ...this.state.formData }
        formData.Patient = patientName
        this.setState({ formData })
    }

    handleChangeStatus(status: statusType) {
        const formData = { ...this.state.formData }
        formData.Status = status
        this.setState({ formData })
    }

    resetForm() {
        const resetForm: ProcedureInterface = {
            Id: 0,
            Patient: '',
            Description: '',
            Status: 'Planned',
            DateOfProcedure: '',
            PlannedStartTime: '',
        }

        this.setState({
            formData: resetForm,
        })
    }

    initFormData() {
        if (
            this.props.procedureData &&
            Object.keys(this.props.procedureData).length
        ) {
            this.setState({
                formData: Object.assign(
                    this.state.formData,
                    this.props.procedureData,
                ),
            })
        }
    }

    componentDidMount(): void {
        this.initFormData()
    }

    render() {
        const { modalTitle, validated, formData } = this.state
        const { show, saveAndHide, closeModal } = this.props

        const handleSave = () => {
            // const formData = this.state.formData
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
            console.log(
                'ProcedureModal.tsx__handleSubmit >>> formData: ',
                formData,
            )

            this.setState({ validated: true })
            const form = event.currentTarget
            const isValid = form.checkValidity()
            if (isValid) {
                handleSave()
            } else {
                event.preventDefault()
                event.stopPropagation()
            }
        }

        return (
            <div>
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
                            <Form.Group controlId='patient'>
                                <Form.Label column={false}>Patient</Form.Label>
                                <Form.Control
                                    as='select'
                                    required
                                    isInvalid={validated && !formData.Patient}
                                    onChange={(event: any) => {
                                        this.handleChangePatient(
                                            event.target.value,
                                        )
                                    }}>
                                    <option> </option>
                                    {this.props.patients.map(
                                        (patient: PatientInterface, i) => {
                                            return (
                                                <option key={i}>
                                                    {patient.Name}
                                                </option>
                                            )
                                        },
                                    )}
                                </Form.Control>
                                <Form.Control.Feedback type={'invalid'}>
                                    Field is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='Description'>
                                <Form.Label column={false}>
                                    Description
                                </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    required
                                    isInvalid={
                                        validated && !formData.Description
                                    }
                                    rows='3'
                                    value={
                                        this.state.formData.Description
                                            ? this.state.formData.Description
                                            : ''
                                    }
                                    placeholder={'Enter Description'}
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'Description',
                                        )
                                    }}
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Field is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='patient'>
                                <Form.Label column={false}>Status</Form.Label>
                                <DropdownButton
                                    id='Status'
                                    variant={
                                        this.state.formData.Status === 'Planned'
                                            ? 'primary'
                                            : this.state.formData.Status ===
                                              'In Progress'
                                            ? 'success'
                                            : this.state.formData.Status ===
                                              'Finished'
                                            ? 'secondary'
                                            : 'primary'
                                    }
                                    title={this.state.formData.Status}>
                                    {STATUSES.map((status: statusType, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={i}
                                                onClick={() => {
                                                    this.handleChangeStatus(
                                                        status,
                                                    )
                                                }}>
                                                {status}
                                            </Dropdown.Item>
                                        )
                                    })}
                                </DropdownButton>
                            </Form.Group>

                            <Form.Group controlId='PlannedStartTime'>
                                <Form.Label column={false}>Date*</Form.Label>
                                <Form.Control
                                    type='text'
                                    required
                                    onFocus={(event: any) => {
                                        event.target.type = 'date'
                                    }}
                                    onBlur={(event: any): void => {
                                        if (!event.target.value)
                                            event.target.type = 'text'
                                    }}
                                    placeholder='Date of Procedure'
                                    value={
                                        this.state.formData.PlannedStartTime
                                            ? this.state.formData
                                                  .PlannedStartTime
                                            : ''
                                    }
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'PlannedStartTime',
                                        )
                                    }}
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Field is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label column={false}>
                                    Planned Start Time*
                                </Form.Label>
                                <Form.Control
                                    type={'time'}
                                    name={'time'}
                                    min='09:00'
                                    max='18:00'
                                    placeholder='e.g. 30m or 1h 20m'
                                    required
                                    value={this.state.formData.PlannedStartTime}
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'PlannedStartTime',
                                        )
                                    }}
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Field is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formName'>
                                <Form.Label column={false}>
                                    Estimated End Time
                                </Form.Label>
                                <Form.Control
                                    type={'time'}
                                    name={'time'}
                                    min='09:00'
                                    max='18:00'
                                    placeholder='e.g. 30m or 1h 20m'
                                    required
                                    value={this.state.formData.EstimatedEndTime}
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'EstimatedEndTime',
                                        )
                                    }}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant='primary' type={'submit'}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}

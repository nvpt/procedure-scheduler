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
import { WORK_TIME } from '../../../../Constants'

type optionName =
    | 'Patient'
    | 'Description'
    | 'Status'
    | 'DateOfProcedure'
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
        const { show, saveAndHide, closeModal, patients } = this.props

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
                            {/*PATIENT*/}
                            <Form.Group controlId='Patient'>
                                <Form.Label column={false}>Patient*</Form.Label>
                                <Form.Control
                                    as='select'
                                    required
                                    isInvalid={validated && !formData.Patient}
                                    onChange={(event: any) => {
                                        this.handleChangePatient(
                                            event.target.value,
                                        )
                                    }}>
                                    <option>
                                        {formData.Patient
                                            ? formData.Patient
                                            : ''}
                                    </option>
                                    {formData.Patient
                                        ? patients
                                              .filter(
                                                  (patient) =>
                                                      patient.Name !==
                                                      formData.Patient,
                                              )
                                              .map(
                                                  (
                                                      patient: PatientInterface,
                                                      i,
                                                  ) => {
                                                      return (
                                                          <option key={i}>
                                                              {patient.Name}
                                                          </option>
                                                      )
                                                  },
                                              )
                                        : patients.map(
                                              (
                                                  patient: PatientInterface,
                                                  i,
                                              ) => {
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
                            {/*END PATIENT*/}
                            {/*DESCRIPTION*/}
                            <Form.Group controlId='Description'>
                                <Form.Label column={false}>
                                    Description*
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
                            {/*END DESCRIPTION*/}
                            {/*STATUS*/}
                            <Form.Group controlId='Status'>
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
                            {/*STATUS*/}
                            {/*DATE*/}
                            <Form.Group controlId='DateOfProcedure'>
                                <Form.Label column={false}>Date*</Form.Label>
                                <Form.Control
                                    type='text'
                                    required={formData.Status !== 'Finished'}
                                    disabled={formData.Status === 'Finished'}
                                    onFocus={(event: any) => {
                                        event.target.type = 'date'
                                    }}
                                    onBlur={(event: any): void => {
                                        if (!event.target.value)
                                            event.target.type = 'text'
                                    }}
                                    placeholder='Date of Procedure'
                                    value={
                                        this.state.formData.DateOfProcedure
                                            ? this.state.formData
                                                  .DateOfProcedure
                                            : ''
                                    }
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'DateOfProcedure',
                                        )
                                    }}
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Field is required
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/*END DATE*/}
                            {/*START TIME*/}
                            <Form.Group controlId='StartTimeOfProcedure'>
                                <Form.Label column={false}>
                                    Planned Start Time*
                                </Form.Label>
                                <Form.Control
                                    type={'time'}
                                    name={'time'}
                                    required={formData.Status !== 'Finished'}
                                    disabled={formData.Status === 'Finished'}
                                    min={WORK_TIME.MIN}
                                    max={WORK_TIME.MAX}
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
                            {/*END START TIME*/}
                            {/*END TIME*/}
                            <Form.Group controlId='EndTimeOfProcedure'>
                                <Form.Label column={false}>
                                    Estimated End Time
                                </Form.Label>
                                <Form.Control
                                    type={'time'}
                                    name={'time'}
                                    disabled={formData.Status === 'Finished'}
                                    min={WORK_TIME.MIN}
                                    max={WORK_TIME.MAX}
                                    value={this.state.formData.EstimatedEndTime}
                                    onChange={(event: any) => {
                                        this.handleChangeOption(
                                            event,
                                            'EstimatedEndTime',
                                        )
                                    }}
                                />
                            </Form.Group>
                            {/*END END TIME*/}
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

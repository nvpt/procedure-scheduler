import React from 'react'
import cn from './procedure-modal.module.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface AddPatientsProps {
    show: boolean
    setOnHideShow: (status: boolean) => void
}
interface AddPatientsState {}
export default class ProcedureModal extends React.Component<
    AddPatientsProps,
    AddPatientsState
> {
    state = {}

    render() {
        const { show, setOnHideShow } = this.props
        const handleClose = () => setOnHideShow(false)
        const handleShow = () => setOnHideShow(true)

        return (
            <div>
                <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

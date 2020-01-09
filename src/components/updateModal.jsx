import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class updateModal extends Component {
    state = {
        show:"",
        setShow:""
    }
    ModalUpdate() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    render() {

        return(<ModalUpdate />);
    }
}

export default updateModal

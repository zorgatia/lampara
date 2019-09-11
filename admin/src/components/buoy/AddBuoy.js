import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

const AddBuoy = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Add Buoy
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Buoy</Modal.Title>
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
      </Fragment>
    
  );
};

AddBuoy.propTypes = {};

export default AddBuoy;

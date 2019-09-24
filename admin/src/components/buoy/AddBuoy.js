import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import {addBuoy} from '../../actions/buoy'
import {connect} from 'react-redux'

const AddBuoy = ({plage,addBuoy}) => {
  const [show, setShow] = useState(false);
  const [num,setNum] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) =>{
    setNum(e.target.value)
  }
  const onSubmit = () =>{
    console.log(plage)
    addBuoy(plage,num);
    handleClose()
  }

  return (
   <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Add Buoy
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Buoy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <input type="text" name="num" value={num} onChange={e=>onChange(e)} />
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
      </Fragment>
    
  );
};

AddBuoy.propTypes = {
  plage: PropTypes.string.isRequired,
  addBuoy: PropTypes.func.isRequired,
};
const mapStateToProp = () =>({

})
export default connect(null,{addBuoy})(AddBuoy);

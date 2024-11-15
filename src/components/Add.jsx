import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { saveEmpDetailsAPI } from '../api/allAPI';

const Add = ({ setResponseFromHome }) => {
  const [empDetails, setEmpDetails] = useState({
    empId: "",
    userName: "",
    email: "",
    status: ""
  });

  const [selectedOption, setSelectedOption] = useState('Select an option');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setEmpDetails((prevDetails) => ({ ...prevDetails, status: eventKey }));
  };

  // to add new employee to the api
  const uploadDetails = async () => {
    const { empId, userName, email, status } = empDetails;
    if (empId && userName && email && status) {
      try {
        const result = await saveEmpDetailsAPI(empDetails);
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
          setResponseFromHome(result)
          handleClose();
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill all fields!!");
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary mt-3">
        Add Employee <i className="fa-solid fa-arrow-right"></i>
      </button>
      <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => setEmpDetails({ ...empDetails, userName: e.target.value })}
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmpId">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control
                  onChange={(e) => setEmpDetails({ ...empDetails, empId: e.target.value })}
                  type="text"
                  placeholder="Enter employee ID"
                />
              </Form.Group>

              <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title={selectedOption}>
                <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
              </DropdownButton>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button onClick={uploadDetails} variant="primary">Add</Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default Add;
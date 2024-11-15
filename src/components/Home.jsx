import { useEffect, useState } from 'react'
import Add from './Add'
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import { deleteEmployeeAPI, getAllEmployeeAPI, updateEmployeeAPI } from '../api/allAPI'

const Home = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[allEmployees,setAllEmployees] = useState([])
    const [responseFromHome, setResponseFromHome] = useState("")
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(()=>{
        getAllEmpDetails()
    },[responseFromHome])

    const [empDetails, setEmpDetails] = useState({
        empId: "",
        userName: "",
        email: "",
        status: ""
    });

    // to get all employee details from API
    const getAllEmpDetails = async () => {
        try {
          const result = await getAllEmployeeAPI()
          if (result.status > 199 && result.status < 300) {
            console.log(result.data)
            setAllEmployees(result.data)
          }
        } catch (err) {
          console.log(err)
        }
    }
    
    // to delete an employee
    const deleteEmp = async (id) => {
        try {
            const result = await deleteEmployeeAPI(id)
            if (result.status >= 200 && result.status < 300) {
                getAllEmpDetails()
            }
        }catch(err){
            console.log(err);
        }
    }

    // to update the values of dropdown
    const updateDropdown = (eventKey) => {
        setSelectedOption(eventKey);
        setEmpDetails((prevDetails) => ({ ...prevDetails, status: eventKey }));
    };

    // to fetch the details to edit the employee details
    const editEmp = async (id) => {
        const result = await getAllEmployeeAPI()
        // console.log(`result: ${result}`);
        const emp = result.data.find((emp) => emp.id === id)
        // console.log(`emp:${emp}`);
        setEmpDetails(emp)
        updateDropdown(emp.status)
        handleShow()
    }

    // to save the updated changes in the api
    const updateChanges = async (id) => {
        try{
            const result = await updateEmployeeAPI(id,empDetails)
            if (result.status >= 200 && result.status < 300) {
                getAllEmpDetails();
                handleClose();
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <>
        <div className="container">
            <h1 className='text-center mt-3'>Employee Management System</h1>
            <Add setResponseFromHome={setResponseFromHome}/>
            <table className="table table-bordered table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    { allEmployees.length>0 ?
                        ( allEmployees.map((employee)=>
                            (<tr key={employee.empId}>
                                <td>{employee.empId}</td>
                                <td>{employee.userName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.status}</td>
                                <td className='text-center'><button onClick={()=> editEmp(employee.id)} className='border-0 bg-body'><i className="fa-solid fa-pen-to-square text-primary"></i></button></td>
                                <td className='text-center'><button onClick={()=> deleteEmp(employee?.id)} className='border-0 bg-body'><i className="fa-solid fa-trash text-danger"></i></button></td>
                            </tr>)
                        ))
                        :
                        (
                            <tr>
                                <th>No Employees Available!!</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        defaultValue={empDetails.userName}
                        onChange={(e) => setEmpDetails({ ...empDetails, userName: e.target.value })}
                        type="text"
                        placeholder="Enter your name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        defaultValue={empDetails.email}
                        onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })}
                        type="email"
                        placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmpId">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control
                        defaultValue={empDetails.empId}
                        onChange={(e) => setEmpDetails({ ...empDetails, empId: e.target.value })}
                        type="text"
                        placeholder="Enter employee ID"
                        />
                    </Form.Group>

                    <DropdownButton onSelect={updateDropdown} id="dropdown-basic-button" title={selectedOption}>
                        <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
                        <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={()=>{updateChanges(empDetails.id)}}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

        </div>
    </>
  )
}

export default Home
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {useMoralis} from "react-moralis";
import {Button, Form, Container, Col, Row, Modal, Badge} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";
import AddCandidate from './AddCandidate';
import AddTestsToCandidate from './AddTestsToCandidate';
import  { Navigate, useNavigate } from 'react-router-dom'

const CandidatesHeader = ()=>{
    useEffect(() => {
        getUsers()
        console.log("ok")
      }, []);

    const [users, setUsers] = useState([{
        _id:"NmCfSx1i9FknXCQFbBBocIbi",
        username:"Abel ",
        email:"abel@redriverwest.com",
        post:"Full Stack",
        status:"Hired",
        stack:['React',", ",'Node'],
    }]);

    const getUsers = () => {
        axios.get("https://www.skilli-project-node-app.site/getUsers").then((response)=>{
            setUsers(response.data)
        })
        .catch(error => console.error(error))
    }
    

    const [addCandidate,setAddCandidate]=useState(false)
    const [addTestsToCandidate,setaddTestsToCandidate]=useState(false)
    const [candidateUserName,setcandidateUserName]=useState("")
    const [candidateId,setcandidateId]=useState("")


    const addedCandidate=(value) => {
        setcandidateUserName(value)
        setAddCandidate(false)
        setaddTestsToCandidate(true)
    }

    const closeTest =()=>{
        setaddTestsToCandidate(false)
    }

    return <div>
        <Container className= "w-100" >
            <Row style={{height:"80px"}}></Row>
            <Row style={{height:"80px"}}>
            <Col xl={3} lg={4}  xs={5} className="d-flex align-items-center"> <h3 className="h3" style={{color:"#5c4dff"}}> My candidates</h3></Col>
            <Col xl={6} lg={4}   xs={2} > </Col>
            <Col xl={3} lg={4}  xs={5} className="d-flex align-items-center justify-content-end" >
            <Button class="btn btn-lg btn-primary login" onClick={()=>setAddCandidate(true)}>Add candidate</Button>
            
            
            <Modal show={addCandidate}>
                
                
                <Modal.Header> <Button onClick={()=>setAddCandidate(false)}> X </Button> </Modal.Header>
                <Modal.Body> <AddCandidate candidateAdded = {addedCandidate} /> </Modal.Body>
                <Modal.Footer> </Modal.Footer>
            
            </Modal>

            <Modal show={addTestsToCandidate} size="xl">
            
                <Modal.Body> <AddTestsToCandidate closeTest={closeTest} candidateUserName={candidateUserName}/> </Modal.Body>
            
            </Modal>



            </Col>
            </Row>
            
        </Container>
    </div>
}

export default CandidatesHeader
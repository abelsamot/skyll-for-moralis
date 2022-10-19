import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from '../components/Signup.jsx';
import {useMoralis} from 'react-moralis'
import {Button, Form, Container, Col, Row, Badge, Nav, ListGroup, Link} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import  { Navigate } from 'react-router-dom'
import MyAccountSettings from '../components/adminPanel/MyAccountSettings'
import ModifyTest from '../components/adminPanel/ModifyTest.jsx';
import '../styles/styles.css'
import axios from "axios";
import TestsResults from '../components/adminPanel/TestsResults.jsx';

function Settings() {
    const {isAuthenticated, user}=useMoralis();

    const [userType,setUserType]=useState('')
    useEffect(()=>{
        if(isAuthenticated){
            console.log("==> ICI User")
            console.log(user)
            getUser()
            console.log(userType)
        }
    },[user])
    const getUser = ()=> {
        axios.get("https://www.skilli-project-node-app.site/getUserById",{params: {id:user.id}})
        .then(function (response) {
            console.log(response.data)
            setUserType(response.data.typeOfUser)
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
    const [pageState,setPageState]= useState("userManagement")
    if(isAuthenticated && userType != "Candidate"){


       return <div class="">
       <div className="userMenue">
            <Nav variant="tabs" activeKey={pageState} style={{marginLeft:"5%"}}>
                <Nav.Item>
                    <Nav.Link eventKey="userManagement" title="userManagement" onClick={()=>setPageState("userManagement")}>User Management</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="modifyTests" title="modifyTests" onClick={()=>setPageState("modifyTests")}>Modify tests</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Tests results" title="Tests results" onClick={()=>setPageState("Tests results")}>Tests results</Nav.Link>
                </Nav.Item>
                
            </Nav>
        </div>
        <div style={{height:"100px"}}></div>
        <Container>{pageState==="userManagement" ? 
       
        <Row>
            <Col sm={5}>
            <MyAccountSettings />
            </Col>
            <Col sm={2}> </Col>
            <Col sm={5}>
            <Signup/>
            </Col>
        </Row>: pageState==="modifyTests" ?
       <Row>
       <ModifyTest/>
       </Row>
       
        : <Row><TestsResults/></Row>}</Container>

       </div>
    }
    else{
        return <Navigate to="/"/>
    }

}

export default Settings;
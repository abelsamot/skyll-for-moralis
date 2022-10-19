import React from 'react';
import {Button, Form, Card, Badge, Modal, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useMoralis} from 'react-moralis'
import {useState, useEffect} from 'react'
import  { Navigate } from 'react-router-dom'
import '../styles/test.css'
import { BsSearch } from "react-icons/bs";

function TestCard(props) {

    const [testClicked,setTestClicked]=useState(false)
    const [buttonAddVisible,setbuttonAddVisible]=useState(true)
    const [buttonModifyIsVisible,setbuttonModifyIsVisible]=useState(true)
    const [buttonChangeIsVisible,setbuttonChangeIsVisible]=useState(true)

    const buttonAdd = () => {
        if (props.buttonAddIsVisible){
            if(!buttonAddVisible){
                return <div> <Card.Link ><Button size="sm"  style={{backgroundColor:"#ff4136", borderColor:"#ff4136", margin: "0 auto"} } onClick={()=>{
                    props.removeTest(props.name,props.id,props.typeOfTest)
                    setbuttonAddVisible(!buttonAddVisible)
                    }}>remove</Button> </Card.Link> </div>
            }
            return <div> <Card.Link ><Button size="sm"  style={{backgroundColor:"#27BC49", borderColor:"#27BC49", margin: "0 auto"}} onClick={
                ()=>{
                    props.addTest(props.name,props.id,props.typeOfTest)
                    setbuttonAddVisible(!buttonAddVisible)
                }}>Add</Button> </Card.Link> </div>
        }

    }

    const buttonModify= () => {
        if (props.buttonModifyIsVisible){
            return <div> <Card.Link ><Button size="sm"  style={{backgroundColor:"#27BC49", borderColor:"#27BC49", margin: "0 auto"}} onClick={
                ()=>{
                    props.modifyTest(props.name,props.id,props.typeOfTest)
                    setbuttonModifyIsVisible(!buttonModifyIsVisible)
                }}> Add question </Button> </Card.Link> </div>
        }

    }

    const buttonChange= () => {
        if (props.buttonChangeIsVisible){
            return <div> <Card.Link ><Button size="sm"  style={{backgroundColor:"#27BC49", borderColor:"#27BC49", margin: "0 auto"}} onClick={
                ()=>{
                    props.changeTest(props.name,props.id,props.typeOfTest)
                    setbuttonChangeIsVisible(!buttonChangeIsVisible)
                }}> Modify </Button> </Card.Link> </div>
        }

    }

       return  <div>
       
       
       <Modal show={testClicked}>
                
                
                <Modal.Header> <Button onClick={()=>setTestClicked(false)}> X </Button> </Modal.Header>
                <Container >
                <div style={{height:"30px"}}></div>
                <Modal.Title style={{color:"#5c4dff", fontWeight:600}} className="d-flex justify-content-center">{props.name}</Modal.Title>
                <Modal.Body style={{fontWeight:300, fontSize:"13px"}}>  <p dangerouslySetInnerHTML={{__html:  props.longDescription}}/> </Modal.Body>
                <div style={{height:"30px"}}></div>
                </Container>

                <Modal.Footer className="h5"> 
                <Badge bg="secondary">{props.typeOfTest} </Badge>
                <Badge bg="primary">{props.duration} min </Badge> 
                <Badge bg="primary">{props.nbOfQuestions} questions </Badge>
                </Modal.Footer>
                
        </Modal>


            
       <Card style={{ width: props.cardWidth}} className="testCard" >
            <Card.Body>
                <Card.Title style={{color:"#5c4dff", fontWeight:600, fontSize:props.titleSize}}>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{fontSize:props.subTitleSize}}>{props.typeOfTest}</Card.Subtitle>
                <Card.Text style={{fontWeight:300, fontSize: props.textSize}}>
                {props.smallDescription}
                </Card.Text>
                <div style={{height:"15px"}}></div>
                <div className="d-flex justify-content-end d-grid gap-2">
                {props.hideMin ? <div> </div> : <Card.Link><Badge bg="primary">{props.duration} min </Badge>  </Card.Link>}
                {props.hideMin ? <div> </div> : <Card.Link ><Button size="md"  onClick={()=>setTestClicked(true)} style={{backgroundColor:"#27BC49", borderColor:"#27BC49", margin: "0 auto"}}> <BsSearch/> </Button> </Card.Link>}
                {buttonAdd()}
                {buttonChange()}
                {buttonModify()}
                </div>
            </Card.Body>
        </Card>
        </div>
        
    }



export default TestCard;
import React from 'react';
import {Button, Form, Container, Row, Col, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import axios from "axios";
import TestCard from './TestCard';
import ListOfTests from './listOfTests';
const AddTestsToCandidate = (props)=>{

    useEffect(() => {
        getTests()
        console.log("ok")
      }, []);


    const [tests, setTests] = useState([]);
    const [ShowLink,setShotLink] = useState(false)
    const [testsSelected, setTestsSelected] = useState([{}]);


    // We get the different tests that can be chosed in order to display them
    const getTests = () => {
        axios.get("https://www.skilli-project-node-app.site/getTests").then((response)=>{
            setTests(response.data)
        })
        .catch(error => console.error(error))
    }


    // When a test is added by clicking on the button "Add" we add it in the list "testsSelected"
    const addTest=(name,id,typeOfTest)=>{
        setTestsSelected((prevItems) => {
            return [...prevItems, {
            _id:id,
            testName:name,
            testScore:0,
            testType:typeOfTest,
            testPictures:[],
            testDone:false,
            testBegun:false,
            }];
          });

    }

    // This function removes tests from the list "testsSelected" when needed
    const removeTest=(name,id)=>{
        setTestsSelected(testsSelected.filter(item=>item.testName !== name));
        console.log("remove" +id)

    }

    // This function add the selected tests to the database.
    const addTests = () =>{
        const bodyFormData = {
            username:props.candidateUserName,
            listOfTests:testsSelected
        }
        axios.post("https://www.skilli-project-node-app.site/addTestsToUser", null, {params:bodyFormData})
                .then(function (response) {
                //handle success
                console.log(response);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });

        setShotLink(true)
        }
    const finish =()=> {
        props.closeTest(false)
    }
    return <div>
    <Container className= "w-100">
    <Row>
        <Col lg={6} xs={12}>
        <div style={{height:"30px"}}></div>

        <Container >
       <Row  className="d-flex justify-content-left">
        {tests.map(cardInfo =>(
            <Col lg={6} sm={12} >
            <TestCard key={cardInfo._id} id={cardInfo._id} textSize="11px" subTitleSize="14px" titleSize="16px" cardWidth="15rem" buttonAddIsVisible="true" addTest={addTest} removeTest={removeTest} name={cardInfo.name} nbOfQuestions={cardInfo.nbOfQuestions} duration={cardInfo.durationInMinutes} longDescription={cardInfo.longDescription} smallDescription={cardInfo.smallDescription} typeOfTest={cardInfo.typeOfTest}/>
            <div style={{height:"20px"}}></div>
            </Col>
        ))}
        </Row>
        </Container>



        </Col>

        <Col lg={6} xs={12} style={{borderLeft:"1px solid", borderColor:"#DDDDDD"} }>
        <Container className="w-75">
        <div style={{height:"40px"}}></div>
        <h4 className="h4 d-flex justify-content-center">Test for  {' '+props.candidateUserName}</h4>
        <div style={{height:"20px"}}></div>
        <ListOfTests testsSelected={testsSelected} />
        <div style={{height:"50px"}}></div>
        {!ShowLink &&<div>
        <Button onClick={addTests} className="w-100"> Add tests & send sign up e-mail </Button>
        <div style={{height:"20px"}}></div>
        </div>}
        {ShowLink && <Form> 
        <Alert> An e-mail was sent to your candidate :) </Alert>
        <div style={{height:"30px"}}></div>
        <Button className="w-100" size="md" onClick={finish} style={{backgroundColor:"#27BC49", borderColor:"#27BC49", margin: "0 auto"}}> Close tab </Button> 
        </Form> }
        </Container>
        </Col>
    </Row>
        <div style={{height:"30px"}}></div>
    </Container>
    </div>
}

export default AddTestsToCandidate
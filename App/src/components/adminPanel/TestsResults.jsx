import React from 'react';
import {Button, Container, Row, Col, Grid, Alert, Card, ProgressBar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useMoralis} from 'react-moralis'
import {useState, useEffect} from 'react'
import axios from "axios";
import "./style.css"

const TestsResults = ()=>{

    const {user, isAuthenticated}=useMoralis();

    useEffect(() => {
        getTests()
        console.log("==> ICI")
      }, []);
    const [tests, setTests] = useState([{
        name:"Test1",
        qcmQuestions:[
        {question: "Sélectionner un hardware wallet ",
        nbCorrectAnswers: 2,
        nbAnswers: 2}
        ]
    }]);
    const [testData,setTest] = useState({})



    const getTests = () => {
        axios.get("https://www.skilli-project-node-app.site/getTests").then((response)=>{
            response.data.map((test)=>{
                if(test.typeOfTest==="QCM"){
                    console.log(test._id)
                    axios.get("https://www.skilli-project-node-app.site/getQuestionsAndResultsForOneQCM", {params: {id:test._id}}).then((response)=>{
                        setTests(oldArray => [...oldArray, {
                            name:test.name,
                            typeOfTest:"QCM",
                            qcmQuestions:response.data
                        }]);
                        console.log(tests)
                    })
                    .catch(error => console.error(error))
                }
            })
            console.log("==> ICI 2")
            console.log(response.data)
        })
        .catch(error => console.error(error))
    }



    return <div>
        {tests.map((test)=>{
            if(test.typeOfTest==="QCM"){
            return <div><Card style={{padding:"20px"}} className="scrolableCard">
                <Container>
            <Card.Title> {test.name}</Card.Title>
            <Card.Body> {test.qcmQuestions.map((quest)=>{
                const percentage = (quest.nbCorrectAnswers/quest.nbAnswers)*100
                return <div>
                    <div style={{backgroundColor:"#f7f7f7",borderRadius:"10px", padding:"20px"}}>
                        <Row>
                            <Col xs={8}>{quest.question}</Col>
                            <Col xs={4}><ProgressBar 
                            now={Math.round(percentage)} 
                            label={`${quest.nbCorrectAnswers}/${quest.nbAnswers}`} />
                            </Col>

                        </Row>
                        </div>
                    <div style={{height:"10px"}}></div>
                </div>
            })}</Card.Body>
            </Container>
            
          </Card>
          <div style={{height:"20px"}}></div></div>
            }
        })}
    </div>
}

export default TestsResults
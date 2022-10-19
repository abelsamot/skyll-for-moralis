import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect, useRef} from 'react'
import {Button, Form, Container, Col, Row, Badge, Modal} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";
import SkillCard from './SkillCard';

const UserSkills = (props)=>{
    const testsDone= props.tests.filter(test => test.testDone == true)
    const [skillClicked,setSkillClicked]=useState(false)
    const [everyTestsResults,setEveryTestsResults]= useState([{
        testName:"test",
        resultsByCategory: []
    }])
    useEffect(() => {
        
        getUserResults()
      },[props.userId]);
    const getUserResults = () =>{
        axios.get("https://www.skilli-project-node-app.site/getTestResultByCategory",{params: {id:props.userId}})
    .then(function (response) {
        setEveryTestsResults(response.data)
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
        
    } 

    return <div style={{backgroundColor:"#282c34", height:"80vh", marginTop:"3px" }}>
    <div style={{height:"50px"}}>
    </div>

    <Container >
        <Row>
    {testsDone.length === 0 ? <div className="d-flex align-items-center justify-content-center"> <p style={{color:"white"}}>You will find your skill badges here once you will have finished your first tests. </p> </div>
    : testsDone.map(cardInfo =>(
        <Col lg={4} sm={6} xs={12}>
            <SkillCard cardInfo={cardInfo} username={props.username} everyTestsResults={everyTestsResults}/>
        </Col>
    ))}
    </Row>
    
        </Container>
    </div>
}

export default UserSkills
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {Container, Col, Row, Badge} from 'react-bootstrap'
import '../styles/styles.css'
import { BsFillInfoCircleFill } from "react-icons/bs";
import WelcomeTutorialModal from './WelcomeTutorialModal';
import axios from "axios";

const UserProfileBar = (props)=>{
    const testsDone = (props.tests || []).filter(test => test.testDone == true)
    const sum = (testsDone|| []).reduce((accumulator, object,i) => {
        const lengthOfTests = props.tests.length - 1
        const diffTestDoneTest = lengthOfTests-testsDone.length
        if(i+1+diffTestDoneTest===lengthOfTests){
            return (accumulator + object.testScore)/lengthOfTests
        }
        else{
            return (accumulator + object.testScore);
        }
      }, 0);
    console.log(sum)

    useEffect(() => {
        if(!props.welcomeDone){
            handleShow()
        }
      },[props.welcomeDone]);


    const userStack = props.stack
    const [show, setShow] = useState(false);

    const handleClose = () => {
        axios.post("https://www.skilli-project-node-app.site/welcomeTutorialDone", null, {params: {userId:props.userId}})
                .then(function (response) {
                //handle success
                console.log(response);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
        setShow(false)};
    const handleShow = () => setShow(true);


    
    

    return <div className= "profileBar">
        <Container className= "w-100">
                <WelcomeTutorialModal show={show} handleClose={handleClose} username={props.username}/>

            <Row >
                <Col xl={6} lg={6}  sm={7} xs={7} className="regularCol titleProfile"> 
                    <div>
                    <Row ><h3 className="h3"> {props.username} </h3>  </Row>
                    <Row> <div className="p"> <span style={{color:"#5c4dff", fontWeight:600, fontSize:props.titleSize}}> Position : </span> {props.post} </div></Row>
                    <div style={{height:"5px"}}></div>
                    <Row> <div className="p"> <span style={{color:"#5c4dff", fontWeight:600, fontSize:props.titleSize}}> E-mail : </span> {props.email} </div></Row>
                    <div style={{height:"5px"}}></div>
                    <Row> <div> <span style={{color:"#5c4dff", fontWeight:600, fontSize:props.titleSize}}> Stack : </span> {userStack && userStack.map((item) => <Badge style={{marginLeft:"10px"}} key={item}> {item} </Badge> )} </div></Row>
                    <div style={{height:"5px"}}></div>
                    <Row> <div className="p">  <span style={{color:"#5c4dff", fontWeight:600, fontSize:props.titleSize}}> Seniority : </span>  {props.seniority} </div></Row>
                    </div>
                    
                    
                </Col>
                <Col xl={4} lg={4}  sm={2} xs={2} className="regularCol">
                    
                    
                      </Col>
                <Col xl={2} lg={2}  sm={3} xs={3} className="regularCol titleProfile"> 
                    <div>
                    <Row><BsFillInfoCircleFill onClick={handleShow}> </BsFillInfoCircleFill></Row>
                    <Row ><h1 className="h1 d-flex align-items-center justify-content-center" style={{color:"#5c4dff", fontWeight:800}} > {Math.round(sum)}% </h1> </Row>
                    <Row> <div className="p" >Total score  </div></Row>
                    <div style={{height:"5px"}}></div>
                    </div>
                    
                    
                </Col>
            </Row>
        </Container>
    </div>
}

export default UserProfileBar
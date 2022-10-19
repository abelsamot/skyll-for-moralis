import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form, Container, Col, Row} from 'react-bootstrap'
import '../styles/styles.css'
import { BsClock } from 'react-icons/bs';
import { BsCheckCircle } from 'react-icons/bs';

import {BsInfoCircle} from 'react-icons/bs';


const QuizStart = (props)=>{

    const test = props.test
    return <div>
       <Row >
            <Col sm={6}>
                <Container>
                    <Row className="gap-4">
                        <Col md={3}  style={{backgroundColor:"#34323B", borderRadius:"10px", padding:"20px"}} > 
                        <div className="d-flex justify-content-center"><BsClock style={{color:"white"}} size={28} /> </div>
                        <div className="d-flex justify-content-center" style={{marginTop:"10px", color:'white'}}><p> {test.durationInMinutes} min</p></div>
                        </Col>
                        <Col md={3} style={{backgroundColor:"#34323B", borderRadius:"10px", padding:"20px"}} >
                        <div className="d-flex justify-content-center"><BsCheckCircle style={{color:"white"}} size={28}/> </div>
                        <div className="d-flex justify-content-center" style={{marginTop:"10px", color:'white'}}> <p> {test.typeOfTest} </p> </div>
                        </Col>
                        <Col md={3} style={{backgroundColor:"#34323B", borderRadius:"10px", padding:"20px"}} >
                        <div className="d-flex justify-content-center"> <BsInfoCircle style={{color:"white"}} size={28}/> </div>
                        <div className="d-flex justify-content-center" style={{marginTop:"10px", color:'white'}}><p > {test.nbOfQuestions} questions </p> </div>
                        </Col>

                    </Row>

                </Container>
            </Col>


            <Col sm={6}>
            <Container>
                <Row style={{backgroundColor:"#F8F8F8", borderRadius:"10px", padding:"20px"}}>
                <Col sm={12}>
                <span style={{fontSize:"15px"}} dangerouslySetInnerHTML={{__html:  test.longDescription}}/>
                </Col>
                </Row>
                <Row >
                <div style={{height:"30px"}}></div>
                </Row>
                <Row >
                <Col lg={8}>
                </Col>
                <Col lg={4}>
                <Button className= "w-100" onClick={props.quizStep}> Launch test</Button>
                </Col>
                </Row>
                
                </Container>
            </Col>
        </Row>
    </div>
}

export default QuizStart
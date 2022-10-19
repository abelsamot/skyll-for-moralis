import {Button, Form, Card, Badge, Modal, Container, ProgressBar, Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'

function SkillCard(props) {
    const [testResults,setTestResults]=useState([{
        categoryName:"Salut",
        numberOfAppearance:1,
        numberOfCorrectAnswers:1
    }])
    useEffect(() => {
        props.everyTestsResults.map((o)=>{
            if(o.testName===props.cardInfo.testName){
                setTestResults(o.resultsByCategory)
                console.log("RESULLT")
                console.log(o.resultsByCategory)
            }
        }
        )
      },[props.everyTestsResults]);
    const now = props.cardInfo.testScore;
    const [skillClicked,setSkillClicked]=useState(false)
    return  <div>
        <Modal show={skillClicked}>
                
                
                <Modal.Header> <Button onClick={()=>setSkillClicked(false)}> X </Button> </Modal.Header>
                <Container >
                <div style={{height:"30px"}}></div>
                <Modal.Title style={{color:"#5c4dff", fontWeight:600}} className="d-flex justify-content-center">{props.cardInfo.testName}</Modal.Title>
                <Modal.Body style={{fontWeight:300, fontSize:"13px"}}>
                    <div style={{height:"10px"}}></div>
                    <Row>
                         <Col xs={1}></Col>
                         <Col>Detail of scores by category of questions :</Col>
                    </Row>
                    <div style={{height:"20px"}}></div>
                    {testResults.map((cat)=>{
                    const percentage = (cat.numberOfCorrectAnswers/cat.numberOfAppearance)*100
                    return <Row>
                         <Col xs={1}></Col>
                    <Col xs={cat.numberOfAppearance+1}>
                        <ProgressBar  now={Math.round(percentage)} label={`${cat.numberOfCorrectAnswers}/${cat.numberOfAppearance}`} />
                        </Col>
                    <Col xs={5} style={{fontWeight:"500"}}>{cat.categoryName} </Col>
                    <div style={{height:"20px"}}></div>
                    </Row>
                })}  </Modal.Body>
                <div style={{height:"30px"}}></div>
                </Container>

                <Modal.Footer className="h5"> 
                </Modal.Footer>
                
        </Modal>
            
       <Card style={{ width: "16rem"}} className="testCard" onClick={()=>setSkillClicked(true)}>
            <Card.Body>
                <div style={{height:"10px"}}></div>
                <Card.Title style={{color:"#5c4dff", fontWeight:600, fontSize:"18px"}}> {props.cardInfo.testName}</Card.Title>
                <Card.Text style={{fontWeight:300, fontSize: "12px"}}>
                <span style={{fontWeight:"600"}}>{props.username}</span> optained <span style={{fontWeight:"600"}}>{now}</span>  % in this test
                <div style={{height:"15px"}}></div>
                <ProgressBar variant="primary" now={now} label={`${now}%`} />
                </Card.Text>
                <div className="d-flex justify-content-end d-grid gap-2">
                
                </div>
            </Card.Body>
        </Card>
        </div>
        
    }



export default SkillCard;
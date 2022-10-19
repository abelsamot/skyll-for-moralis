import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import '../styles/styles.css'
import CountDownTimer from './CountDownTimer';
import Webcam from "react-webcam";
const QuizHeader = (props)=>{
    

    const [imageArray,setImageArray] = useState([])
    const quizStep =()=>{
        props.finishQuiz()
    }
    var currentDate = new Date();
    var datePlusxMin = new Date(currentDate.getTime() + (props.time*60*1000))
    var xMinutesLater = datePlusxMin.getTime()
    const user = props.user
    const test = props.test
    

    useEffect(()=>{
        setTimeout(function () {
            capture()
        }, 3000);
    },[imageArray])

    const videoConstraints = {
        width: 128,
        height: 72,
        facingMode: "user"
        };
        const webcamRef = React.useRef(null);
        const capture = React.useCallback(
          () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log("===> IMAGE")
          },
          [webcamRef]
        );
        console.log(capture)
    
    return <div className= "">
       <Row style={{backgroundColor:"#F8F8F8", borderRadius:"10px", paddingLeft:"20px", paddingTop:"15px", paddingBottom:"15px"}}>
                <Col md={3} sm={4}>
                    <a className="h4" style={{color:"#5c4dff"}} href={window.location.origin+"/user/"+user._id}> {user.username}  </a> 
                    <p className="p">Test : {test.name} </p>
                </Col>
                <Col md={2} sm={3}> 
                <Webcam
                    style={{borderRadius:"10px"}}
                    ref={webcamRef}
                    audio={false}
                    height={72}
                    screenshotFormat="image/jpeg"
                    width={128}
                    videoConstraints={videoConstraints}
                />
                </Col>
                <Col md={5} sm={1}> 
                </Col>
                <Col md={2} sm={4}> {props.launchTimer && <CountDownTimer countdownTimeStampMs={xMinutesLater} quizStep={quizStep}/>} </Col>
        </Row>
    </div>
}

export default QuizHeader
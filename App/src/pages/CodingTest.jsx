import '../styles/styles.css'
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import {Button, Form, Container, Col, Row} from 'react-bootstrap'
import axios from "axios";
import '../styles/quiz.css'
import QuizHeader from '../components/QuizHeader';
import QuizStart from '../components/QuizStart';
import CodeAndRun from '../components/CodeAndRun';

function CodingTest() {
    const code= "const a =0;"
    const addTests = () =>{
        const bodyFormData = {
            testId:quizID,
            testScore:score,
            userId:userID
        }
        axios.post("https://www.skilli-project-node-app.site/addTestsResultsToUser", null, {params:bodyFormData})
                .then(function (response) {
                //handle success
                })
                .catch(function (response) {
                //handle error
                });
        }

    const {quizID, userID} = useParams();
	const [user, setUser] = useState([{}])
    const [test, setTest] = useState([{}])
    const [codingQuestionList, setcodingQuestionList] = useState([{}])
	useEffect(() => {
        getUser()
        getTest()
        getCodingQuestions()
      }, []);

    const getUser = () => {
        axios.get("https://www.skilli-project-node-app.site/getUserByID", {params: {id:userID}}).then((response)=>{
            setUser(response.data)
            return response.data
        })
        .catch(error => console.error(error))
    }

    const getTest = () => {
        axios.get("https://www.skilli-project-node-app.site/getTestByID", {params: {id:quizID}}).then((response)=>{
            setTest(response.data)
            return response.data
        })
        .catch(error => console.error(error))
    }

    const getCodingQuestions = () => {
        axios.get("https://www.skilli-project-node-app.site/getCodeTestQuestions", {params: {id:quizID}}).then((response)=>{
            setcodingQuestionList(response.data)
            return response.data
        })
        .catch(error => console.error(error))
    }

    const questions = codingQuestionList
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [quizStep, setQuizStep ] = useState("Start");
	const [score,setScore] = useState(0);

    const [quizState,setQuizState]= useState()
    const changeQuizStep = () => {

        setQuizStep("Ongoing")
        setlaunchTimer(true)
        console.log(launchTimer)
        setTime(test.durationInMinutes)
    }

    const finishQuiz = (testCases) =>{
        var nbTestValidated = 0
        for (let i = 0; i < testCases.length; i++) {
            console.log(testCases[i]=="True")
            if (testCases[i]=="True"){
                    nbTestValidated = nbTestValidated+1
                }
        }

        if (testCases.length != 0){
            const newScore = (nbTestValidated/testCases.length)*100
            setScore(newScore)
        }
        console.log("Nb Tests Valids = "+nbTestValidated)
        
        setQuizStep("End")
        addTests()
        // add score to user
    }

    const [time,setTime] =useState()
    const [launchTimer,setlaunchTimer]= useState(false)
    const codingQuestions = codingQuestionList && codingQuestionList[0]
    //Test check
    const [codeContent,setCodeContent]=useState()
    return (<div className='app'>

    
    

    {(()=> {

        if(quizStep === "End"){
            return(
                <Container >
            <div style={{height:"200px"}}></div>
            <div className='score-section d-flex justify-content-center'>Congratulation, you have a score of {score} %</div>
            <div style={{height:"50px"}}></div>
            <div className='score-section d-flex justify-content-center'><Button href={window.location.origin+"/user/"+user._id}> Get back to my profile </Button> </div>
            </Container>
            )}
        else if (quizStep === "Ongoing"){
            return(
                <Container className="">
            <Row>
            <div style={{height:"50px"}}></div>
            </Row>
            <QuizHeader time={time} launchTimer={launchTimer} user={user} test={test} finishQuiz={finishQuiz}/>
            <Row>
            <div style={{height:"40px"}}></div>
            </Row> 
            <Row>
            <Col sm={5} >
                {/* Question */}
                
                <div className='question-count question'>
                        <span>Question {currentQuestion+1}</span>
                </div>
                <div> {codingQuestions.questionText}</div>
            </Col>
            <Col sm={1} ></Col>
            <Col sm={6}  style={{borderLeft:"1px solid", borderColor:"#DDDDDD"}}>
                <CodeAndRun finishQuiz={finishQuiz} codingQuestions={codingQuestions} language={test.language} /> 
            </Col>
            </Row>
            </Container>)
        }

        else if (quizStep === "Start"){
            return(
                <Container>
                <div style={{height:"50px"}}></div>
                <QuizHeader user={user} test={test}/>
                <div style={{height:"50px"}}></div>
                <QuizStart test={test} quizStep={changeQuizStep}/>
                </Container>
                )
        }
        
    })()}
</div>)
}
export default CodingTest;
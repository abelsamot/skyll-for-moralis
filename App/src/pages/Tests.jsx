import {Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useMoralis} from 'react-moralis'
import {useState, useEffect} from 'react'
import  { Navigate } from 'react-router-dom'
import axios from "axios";
import TestCard from '../components/TestCard.jsx';

function Tests() {
    useEffect(() => {
        getTests()
        console.log("ok")
      }, []);
    const [tests, setTests] = useState([]);
    
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

    const getTests = () => {
        axios.get("https://www.skilli-project-node-app.site/getTests").then((response)=>{
            setTests(response.data)
            console.log(response.data)
        })
        .catch(error => console.error(error))
    }

    if(isAuthenticated && userType != "Candidate"){
       return <div>
       <div style={{height:"100px"}}></div>
       <Container className="d-flex justify-content-center">
       <Row>
        {tests.map(cardInfo =>(
            <Col lg={4} sm={6} xs={12}>
            <TestCard  cardWidth='18rem' textSize="13px" name={cardInfo.name} nbOfQuestions={cardInfo.nbOfQuestions} duration={cardInfo.durationInMinutes} longDescription={cardInfo.longDescription} smallDescription={cardInfo.smallDescription} typeOfTest={cardInfo.typeOfTest}/>
            </Col>
        ))}
        </Row>
        </Container>
       </div>
    }
    else{
        return <Navigate to="/"/>
    }

}

export default Tests;
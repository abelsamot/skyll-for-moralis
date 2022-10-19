import '../styles/styles.css'
import {useMoralis} from 'react-moralis'
import  { Navigate } from 'react-router-dom'
import ProfileBar from '../components/ProfileBar';
import {useState, useEffect} from 'react'
import axios from "axios";
import AllCandidates from '../components/AllCandidates';
import { Container } from 'react-bootstrap';
function Candidates() {

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

    if(isAuthenticated && userType != "Candidate"){
    return <div>

        <ProfileBar/> 
        <Container>
        <AllCandidates/>
        </Container>

    </div>
    }
    else{
        return <Navigate to="/"/>
    }
}

export default Candidates;

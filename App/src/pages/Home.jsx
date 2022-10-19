import 'bootstrap/dist/css/bootstrap.min.css'
import Signin from '../components/Signin.jsx';
import {useMoralis} from 'react-moralis'
import  { Navigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from "axios";

function Home() {
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
    if(isAuthenticated && userType ==="Admin"){
       return <Navigate to="/settings"/>
    }
    else if(isAuthenticated && userType ==="Recruiter"){
        return <Navigate to="/candidates"/>
    }
    else if(isAuthenticated && userType ==="Candidate"){
        return <Navigate to={"/user/"+user.id}/>
    }
    else{
        return <div className="d-flex align-items-center justify-content-center page">
        <Signin/>
        </div>
        
    }

}

export default Home;
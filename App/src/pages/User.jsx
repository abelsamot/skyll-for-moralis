import React from 'react';
import '../styles/styles.css'
import {useMoralis} from 'react-moralis'
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import {Nav} from 'react-bootstrap'
import UserProfileBar from '../components/UserProfileBar';
import UserSkills from '../components/UserSkills';
import UserTrack from '../components/UserTrack';
import axios from "axios";
import '../styles/styles.css'


function User() {
    const [userTree, setUserTree] = useState([{}])

    useEffect(() => {
        getUserTree()
      },[]);

    const [user, setUser] = useState([{}])
    const [welcomeDone, setWelcomeDone] = useState(true)
    const [nodeStates, setNodeStates] = useState([{}])
    const {handle} = useParams()
    const {isAuthenticated, logout}=useMoralis();
    
    const getUser = () => {
        axios.get("https://www.skilli-project-node-app.site/getUserById", {params: {id:handle}}).then((response)=>{
            setUser(response.data)
            console.log("=====> BIM")
            setWelcomeDone(response.data.welcomeTutorialDone)
            return response.data
        })
        .catch(error => console.error(error))
    }

    const getUserTree = () => {
        axios.get("https://www.skilli-project-node-app.site/getUserTree", {params: {id:handle}}).then((response)=>{
            setNodeStates(response.data.nodeStates)
            setUserTree(response.data.testTree)
            console.log(response.data.testTree)
            getUser()

            return response.data
        })
        .catch(error => console.error(error))
    }
    const [pageState,setPageState]= useState("Track")

    return <div>
    <UserProfileBar userId={user._id} welcomeDone={welcomeDone} email={user.email} username={user.username} stack={user.stack} status={user.status} seniority={user.seniority} post={user.post} tests={user.tests}/>

    <div className="userMenue">
            <Nav variant="tabs" activeKey={pageState} style={{paddingLeft:"5%", backgroundColor:"white"}}>
                <Nav.Item>
                    <Nav.Link style={{color:"#5c4dff"}} eventKey="Track" title="Track" onClick={()=>setPageState("Track")}>Track</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color:"#5c4dff"}} eventKey="Achievements" title="Achievements" onClick={()=>setPageState("Achievements")}>Achievements</Nav.Link>
                </Nav.Item>
            </Nav>
    </div>

    <div className="userPageContent">
        {pageState==="Track" ? <UserTrack userTree={userTree} nodeStates={nodeStates} tests={user.tests} userID={user._id}/> : <UserSkills userId={user._id} username={user.username} tests={user.tests} />}
    </div>
        
       </div>
}
export default User;

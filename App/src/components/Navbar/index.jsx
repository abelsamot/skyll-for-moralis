import {useState, useEffect} from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'
import {Button,Badge} from 'react-bootstrap'
import {useMoralis} from 'react-moralis'
import axios from "axios";
import './styles.css'
function Navbar({toggle}) {
  const {isAuthenticated, user, logout, Moralis}=useMoralis();
  const [userWallet,setUserWallet]=useState('')
  const [userType,setUserType]=useState('')
  useEffect(()=>{
    let account = Moralis.account
      if(isAuthenticated){
          getUser()
          console.log(userType)
      }
  },[user])

  const connectUserWallet = async () => {
    await Moralis.enableWeb3()
    let account = Moralis.account
    console.log(account)
    await Moralis.link(account)
    setUserWallet(Moralis.account)
  };
  
  const getUser = ()=> {
      axios.get("https://www.skilli-project-node-app.site/getUserById",{params: {id:user.id}})
      .then(function (response) {
          console.log("USER")
          console.log(response.data)
          setUserType(response.data.typeOfUser)
          setUserWallet(response.data.ethAddress)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
  const ButtonTop = ()=>{
    if(isAuthenticated){
      return <div><NavBtnLink to="/" onClick={()=>logout()}> Logout </NavBtnLink></div>
    }
  }
  const NavbarAuthenticated = () => {
    if(isAuthenticated && userType != "Candidate"){
      return <>
        <NavLink to="/candidates">Candidates</NavLink>
        <NavLink to="/tests">Tests</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </>
    }
    if(isAuthenticated && userType === "Candidate" && userWallet===''){
      return <Button style={{backgroundColor:"white"}} onClick={connectUserWallet}> Link Wallet </Button> 
    }else if(isAuthenticated && userType === "Candidate" && userWallet!=''){
      
      return <Badge style={{}}>{userWallet} </Badge>
    }
  }

  return (
    <Nav>
          <NavLink to="/" className="logo" > <img src="https://i.ibb.co/6rDq1Y5/White-without-Bg.png" style={{height:"50px"}}/> </NavLink>
          <Bars onClick={toggle}/>
          <NavMenu>
            <NavbarAuthenticated/>
            <ButtonTop/>
          </NavMenu>
    </Nav>
  );
}

export default Navbar;
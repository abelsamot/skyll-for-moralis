import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import {useMoralis} from "react-moralis";
import axios from "axios";

const MyAccountSettings = ()=>{
    const { user, setUserData, isUserUpdating} = useMoralis();
    const [userName,setUserName]=useState(user.get("username"))
    const [email,setEmail]=useState(user.get("email"))
    const [password,setPassword]=useState('')

    const [website, setWebsite] = useState("Don't have");

    const getWebsiteData = () => {
        axios.get("https://www.skilli-project-node-app.site/getUsers").then((response)=>{
            console.log(response.data)
        })
        .catch(error => console.error(error))
    }
    return <div>
        <div className="d-grid gap-3 myAccountSettings">
            <h1 className="titleCenter h4"> {user.get("username")}'s account</h1>
            <hr/>
            <Form className="d-grid gap-3 "> 
            <Form.Group>
                <Form.Label>User name</Form.Label>
                <Form.Control value={userName} onChange={(event)=> setUserName(event.currentTarget.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={(event)=> setEmail(event.currentTarget.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(event)=> setPassword(event.currentTarget.value)}></Form.Control>
            </Form.Group>
            <Button onClick={() => setUserData({
        username: userName,
        email: email,
        password: password === "" ? undefined : password,
      })}
      disabled={isUserUpdating} class="w-100 btn btn-lg btn-primary login" >Save </Button>
            </Form>
            
        </div>
   
   
   </div>
}

export default MyAccountSettings
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import {useMoralis} from "react-moralis";
import Alert from 'react-bootstrap/Alert';

const Signin = ()=>{
    const { login, authenticate, isAuthenticated, user } = useMoralis();

    const loginUser = async () => {
      if (!isAuthenticated) {

        await authenticate()
          .then(function (user) {
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    const [email,setEmail]=useState()
    const [wrongPassword,setWrongPassword]=useState(false)
    const [password,setPassword]=useState()

    return <div>
        <Form controlId="formEmail" className="d-grid gap-3">
        <Form.Group>
            <Form.Label className="d-flex justify-content-center h3 mb-3 fw-normal">Connect to your account</Form.Label>
            <Form.Control value={email} onChange={(event)=>setEmail(event.currentTarget.value)} type="email" placeholder="Email address"/>
            <Form.Control value={password} onChange={(event)=>setPassword(event.currentTarget.value)} type="password" placeholder="Password"/>
        </Form.Group>
        {wrongPassword && <Alert> Wrong password or username, please try again </Alert>}
        <Button class="w-100 btn btn-lg btn-primary login" onClick={()=> {
            
            login(email, password)
            if(!isAuthenticated){
                setWrongPassword(true)
            }}}>Sign in</Button>

        <Button onClick={loginUser}> Login with Metamask</Button>
    </Form>
    </div>
}

export default Signin
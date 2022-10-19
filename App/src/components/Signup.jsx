import {Button, Form, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState} from 'react'
import {useMoralis} from "react-moralis";
import axios from "axios";

const Signup = ()=>{
    const { Moralis, user}= useMoralis()

    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [companyId,setCompanyId]=useState('')
    const [userAdded,setUserAdded] = useState(false)

    const signUserUp = () => {

        // First we get the company ID of the user to add it to its collegue
        axios.get("https://www.skilli-project-node-app.site/getUserById",{params: {id:user.id}})
        .then(function (response) {
          //handle success

                // We define the config for the API call that will call a Moralis Cloud function 
                // This Cloud function will add a new user of type "recruiter"
                var config = {
                    method: 'get',
                    url: 'https://awkbi0rsarvu.usemoralis.com:2053/server/functions/addRecruiter?_ApplicationId=1M3DRwK4iIFbrcX9BiKCUWPMcRfuUIEp7BTSKgf3&email='+email+'&username='+username+'&companyId='+response.data.companyId,
                    headers: { }
                    };
                axios(config)
                .then(function (response) {
                setUserAddedAlert()
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });


    }

    async function setUserAddedAlert(){
        setUserAdded(true)
        setTimeout(()=>setUserAdded(false), 3000);
    }


    useEffect(() => {
        console.log(" ===> Salut")
        console.log(user.id)
      },[]);
    return <div>
        <Form controlId="formEmail" className="d-grid gap-3">
        <Form.Group className="d-grid gap-3">
            <Form.Label className="d-flex justify-content-center h3 mb-3 fw-normal">Add a user from your company </Form.Label>
            <hr/>
            <Form.Control onChange={(event)=>setEmail(event.currentTarget.value)} type="email" placeholder="Email address"/>
            <Form.Control onChange={(event)=>setUsername(event.currentTarget.value)} type="text" placeholder="Username"/>
        </Form.Group>
        {userAdded ? <Alert variant='primary' key='primary'>
                                User Added
        </Alert>: <div></div>}
        <Button class="w-100 btn btn-lg btn-primary login" onClick={signUserUp}>Add user</Button>
    </Form>
    </div>
}

export default Signup
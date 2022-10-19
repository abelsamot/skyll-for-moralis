import {Button, Form, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState} from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";

const AddCandidate = (props)=>{

    const [email,setEmail]=useState()
    const [firstName,setFirstName]=useState()
    const [lastName,setLastName]=useState()
    const [post,setPost]=useState([])
    const [stack,setStack]=useState()
    const [seniority,setSeniority]=useState([])
    var stackOptions = {
        options: [{name: 'React ', id: 1},{name: 'Node.JS ', id: 2},{name: 'Python ', id: 3},{name: 'Solidity ', id: 4},{name: 'Java Script ', id: 5},{name: 'Mongo DB ', id: 6}]
    };
    const setValues = () =>{
        var stackList = []
        stack.forEach(function(oneStack){
            stackList.push(oneStack.name)
        })
        console.log(stackList)
        var config = {
            method: 'get',
            url: 'https://awkbi0rsarvu.usemoralis.com:2053/server/functions/addCandidate?_ApplicationId=1M3DRwK4iIFbrcX9BiKCUWPMcRfuUIEp7BTSKgf3&email='+email+'&username='+firstName+' '+lastName+'&seniority='+seniority+'&post='+post+'&stack='+stackList.toString(),
            headers: { }
          };
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });    
    }

    return <div>
    <Container className= "w-75">
        <Form controlId="formEmail" className="d-grid gap-3">
        <Form.Group className="d-grid gap-3">
            <Form.Label className="d-flex justify-content-center h4 mb-3 fw-normal">Add a candidate </Form.Label>
            <Form.Control value={email} onChange={(event)=>setEmail(event.currentTarget.value)} type="email" placeholder="Email address"/>
            <Form.Control value={firstName} onChange={(event)=>setFirstName(event.currentTarget.value)} type="text" placeholder="First Name"/>
            <Form.Control value={lastName} onChange={(event)=>setLastName(event.currentTarget.value)} type="text" placeholder="Last Name"/>
            <Form.Select value={post} onChange={(event)=>setPost(event.currentTarget.value)} type="text">
            <option hidden value > Position </option>
            <option>Full-Stack Developer</option>
            <option>Front-end Developer</option>
            <option>Back-end Developer</option>
            <option>Solidity Developer</option>
            <option>Full-Stack Blockchain Developer</option>
            </Form.Select>
            <Multiselect
                value={stack}
                onSelect={(event)=>setStack(event)}
                onRemove={(event)=>setStack(event)}
                options={stackOptions.options} // Options to display in the dropdown
                displayValue="name"
                placeholder="Stack"
                showCheckbox // Property name to display in the dropdown options
                />
            <Form.Select value={seniority} onChange={(event)=>setSeniority(event.currentTarget.value)} type="text">
            <option hidden value > Seniority </option>
            <option>Junior</option>
            <option>3 to 5 years</option>
            <option>5 to 8 years</option>
            <option>8 to 12 years</option>
            <option>12+ years</option>
            </Form.Select>
        </Form.Group>
        <Button class="w-100 btn btn-lg btn-primary login" onClick={() => {
            setValues()
            const userName=firstName + " " + lastName
            props.candidateAdded(userName)
        }
        }>Add new candidate</Button>
    </Form>
        <div style={{height:"30px"}}></div>
    </Container>
    </div>
}

export default AddCandidate
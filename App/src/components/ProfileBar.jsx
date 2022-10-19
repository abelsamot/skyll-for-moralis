import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {useMoralis} from "react-moralis";
import {Container, Col, Row} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";

const ProfileBar = ()=>{
    const { user} = useMoralis();
    const [companyName,setCompanyName]=useState("")
    const [companyType,setCompanyType]=useState("")
    const [logo,setLogo]=useState("")
    const getCompanyId = () => {
        axios.get("https://www.skilli-project-node-app.site/getCompanyById",{params: {id:user.id}})
        .then(function (response) {
          //handle success
          setCompanyName(response.data.name)
          setCompanyType(response.data.typeOfCompany)
          setLogo(response.data.logo)
          console.log(response)
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

    }
    useEffect(() => {
        getCompanyId()
      },[]);
    return <div className= "profileBar">
        <Container className= "w-100">
            <Row >
                <Col xl={2} lg={3}  sm={3.5} xs={4} className="regularCol d-flex align-items-center justify-content-center"> 
                    <img src={logo} class="headerImage "></img>
                </Col>
                <Col xl={3} lg={4}  sm={4.5} xs={5} className="regularCol titleProfile"> 
                    <div>
                    <Row ><h3 className="h3"> {companyName} </h3> </Row>
                    <Row> <p className="p"> {companyType} </p></Row></div>
                </Col>
                <Col xl={5} lg={3}  sm={1} xs={2} className="regularCol"> </Col>
                <Col xl={2} lg={2}  sm={2} xs={1} className="regularCol"> 
                </Col>
            </Row>
        </Container>
    </div>
}

export default ProfileBar
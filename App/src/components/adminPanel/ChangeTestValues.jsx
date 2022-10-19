import {Button, Container, Row, Col, Form, InputGroup, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import axios from "axios";
import "./style.css"


const ChangeTestValues = (props)=>{

    useEffect(() => {
        console.log("Wow")
        setSmallDescription(props.smallDescription)
        setLongDescription(props.longDescription)
        setTestSelectedId(props.testSelectedId)
        setqcmQuestionsList(props.qcmQuestionsList)
        setDifficulty(props.difficulty)
        setNbOfQuestions(props.nbOfQuestions)
        setDurationInMinutes(props.durationInMinutes)
        setCategories(props.categories)
        setAddCategories(false)
        setNewCategoryName("")
        setNewCategoryNbOfIterations("")
        setTestModified(false)

      }, [props]);
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    const [listOfQuestionsToDelete,setListOfQuestionsToDelete] = useState([])
    const [testSelectedId,setTestSelectedId] = useState(props.testSelectedId)
    const [qcmQuestionsList,setqcmQuestionsList] = useState(props.qcmQuestionsList)
    const [smallDescription,setSmallDescription] = useState(props.smallDescription)
    const [longDescription,setLongDescription] = useState(props.longDescription)
    const [difficulty,setDifficulty] = useState(props.difficulty)
    const [nbOfQuestions,setNbOfQuestions] = useState(props.nbOfQuestions)
    const [durationInMinutes,setDurationInMinutes] = useState(props.durationInMinutes)
    const [categories,setCategories] = useState(props.categories)
    const [addCategories,setAddCategories] = useState(false)
    const [newCategoryName,setNewCategoryName] = useState("")
    const [newCategoryNbOfIterations,setNewCategoryNbOfIterations] = useState("")
    const [testModified,setTestModified] = useState(false)
    const modifyTest = () => {
        const bodyFormData = {
            testId:testSelectedId,
            smallDescription:smallDescription,
            longDescription: longDescription,
            difficulty: difficulty,
            nbOfQuestions: nbOfQuestions,
            durationInMinutes: durationInMinutes,
            categories:categories,
            listOfQuestionsToDelete:listOfQuestionsToDelete
        }
        axios.post("https://www.skilli-project-node-app.site/modifyTest", null, {params:bodyFormData})
                .then(function (response) {
                //handle success
                console.log(response);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });   
    }
    const handleMaxIterationChange = (e,idx) => {
        const clone = [...categories];
        let obj = clone[idx];
        obj.maxIterationPerTest = e.target.value;
        clone[idx] = obj;
        setCategories([...clone])
    }

    const handleCategoryChange = (e,idx) => {
        const clone = [...categories];
        let obj = clone[idx];
        obj.categoryName = e.target.value;
        clone[idx] = obj;
        setCategories([...clone])
    }

    async function showTestModifiedAlert(){
        setTestModified(true)
        setTimeout(()=>setTestModified(false), 3000);
    }


    return <div>
        <Container >
        <Form controlId="formEmail" className="d-grid gap-3">
        <Form.Group className="d-grid gap-3">
        <InputGroup>
        <InputGroup.Text>Small Description</InputGroup.Text>
        <Form.Control value= {smallDescription} as="textarea" aria-label="With textarea" onChange={(event)=>setSmallDescription(event.currentTarget.value)} />
        </InputGroup>

        <InputGroup>
        <InputGroup.Text>Long Description</InputGroup.Text>
        <Form.Control value= {longDescription} as="textarea" onChange={(event)=>setLongDescription(event.currentTarget.value)} aria-label="With textarea" />
        </InputGroup>
        
        <InputGroup>
        <InputGroup.Text>Difficulty</InputGroup.Text>
        <Form.Control value = {difficulty} onChange={(event)=>setDifficulty(event.currentTarget.value)} type="email"/>
        </InputGroup>

        <InputGroup>
        <InputGroup.Text>Number of questions</InputGroup.Text>
        <Form.Control value = {nbOfQuestions} onChange={(event)=>setNbOfQuestions(event.currentTarget.value)} type="email"/>
        </InputGroup>

        <InputGroup>
        <InputGroup.Text>Time in minutes</InputGroup.Text>
        <Form.Control value = {durationInMinutes} onChange={(event)=>setDurationInMinutes(event.currentTarget.value)} type="email"/>
        </InputGroup>
        

        <div style={{height:"20px"}}></div>
        <Row>
        <Col xs={7} className="h6" style={{color:"#5c4dff"}}> Category</Col>
        <Col xs={5} className="h6" style={{color:"#5c4dff"}}> Max nb of iterations</Col>
        </Row>
        {categories?.map((category,index) =>(
            <Row>
            <Col xs={7}>
            <div className="h5">{categories[index]?.categoryName}</div> 
            </Col> 

            <Col xs={3}>
            <Form.Control value = {categories[index]?.maxIterationPerTest} onChange= {(e)=>handleMaxIterationChange(e,index)} type="text"/> 
            </Col> 
            </Row>
            
        ))}
        {!addCategories ? <Button className="w-25 btn btn-sm btn-primary login" onClick={() => {
                    setAddCategories(true)
                }
                }>Add category </Button>
        : <Row>
            <Col xs={7}>
            <Form.Control value = {newCategoryName} onChange={(event)=>setNewCategoryName(event.currentTarget.value)} type="text"/> 
            </Col> 

            <Col xs={3}>
            <Form.Control value = {newCategoryNbOfIterations} onChange={(event)=>setNewCategoryNbOfIterations(event.currentTarget.value)} type="text"/> 
            </Col> 
            <Col xs={2}>
            <Button class="w-25 btn btn-sm btn-primary login" onClick={() => {
                    setCategories(current => [...current, {
                        _id:makeid(24),
                        categoryName:newCategoryName,
                        maxIterationPerTest:newCategoryNbOfIterations,
                    }]);
                    setAddCategories(false)
                }
                }>+</Button>
            </Col> 
            </Row>
        
        }

        <div style={{height:"10px"}}></div>
        <Container className="scrollable-div">
        <Row>
        <Col xs={7} className="h6" style={{color:"#5c4dff"}}> Questions</Col>
        <Col xs={3} className="h6" style={{color:"#5c4dff"}}> Category</Col>
        </Row>
        {
            qcmQuestionsList?.map((q,index) =>(
            <Row>
            <div style={{height:"10px"}}></div>
                <Col xs={7} style={{fontWeight:"500"}}>
                    {qcmQuestionsList[index]?.question}
                </Col>
                <Col xs={3} style={{fontSize:"12px"}}>
                    {qcmQuestionsList[index]?.questionCategory}
                </Col>
                <Col xs={2} style={{fontSize:"12px"}} onClick={()=>{
                    setqcmQuestionsList(qcmQuestionsList.filter(item => item.question !== qcmQuestionsList[index]?.question))
                    setListOfQuestionsToDelete(oldArray => [...oldArray, qcmQuestionsList[index]?._id])
                }}>
                <button>❌</button>
                </Col>
            </Row>

            )
            )

        }
        </Container>

        <div style={{height:"10px"}}></div>

        {testModified ? <Alert variant='primary' key='primary'>
                                Test Modified
        </Alert>: <div></div>}

        <Button class="w-100 btn btn-lg btn-primary login" onClick={() => {
            showTestModifiedAlert()
            modifyTest()
        }
        }>Save my modifications </Button>
        </Form.Group>
        </Form>
        <div style={{height:"50px"}}></div>
        
        <div style={{height:"50px"}}></div>
        </Container>
    </div>
}

export default ChangeTestValues
import {Button, Container, Row, Col, Grid, Form, Card,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect, useRef} from 'react'
import axios from "axios";
import Resizer from "react-image-file-resizer";
var qs = require('qs');

const AddQuestionToTest = (props)=>{
    useEffect(() => {
      console.log("----=> O")
      setCategories(props.categories)
      setTestId(props.testSelectedId)
    }, [props]);

    const inputRef = useRef(null);
    const [categories,setCategories] = useState(props.categories)
    const [testId,setTestId] = useState(props.testSelectedId)
    const [categoryChosen,setCategoryChosen] = useState('')
    const [question,setQuestion] = useState()
    const [image,setImage] = useState()

    const [answer1,setAnswer1]=useState()
    const [answer1IsCorrect,setAnswer1IsCorrect]=useState('false')

    const [answer2,setAnswer2]=useState()
    const [answer2IsCorrect,setAnswer2IsCorrect]=useState('false')

    const [answer3,setAnswer3]=useState()
    const [answer3IsCorrect,setAnswer3IsCorrect]=useState('false')

    const [answer4,setAnswer4]=useState()
    const [answer4IsCorrect,setAnswer4IsCorrect]=useState('false')
    const [questionAdded,setQuestionAdded] = useState(false)

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };


    const resizeFile = (file) =>
      new Promise((resolve) => {
          Resizer.imageFileResizer(
          file,
          400,
          400,
          "JPEG",
          80,
          0,
          (uri) => {
              resolve(uri);
          },
          "base64"
          );
      });

    async function fileSelectedHandler(event){
        const file = event.target.files[0];
        const base64 = await resizeFile(file);
        setImage(base64);
    }
    const addQuestions = (event) => {
        var data = qs.stringify({image:image})
        const bodyData={
            testId:testId,
            question:question,
            answer1:answer1,
            answer1IsCorrect:answer1IsCorrect,
            answer2:answer2,
            answer2IsCorrect:answer2IsCorrect,
            answer3:answer3,
            answer3IsCorrect:answer3IsCorrect,
            answer4:answer4,
            answer4IsCorrect:answer4IsCorrect,
            category:categoryChosen,
        }
        console.log(image)
        console.log(data)
        console.log(categoryChosen)

        axios.post("https://www.skilli-project-node-app.site/addQCMQuestionToTest", data,{params:bodyData})
            .then(function (response) {
              //handle success
              console.log(response);
              setQuestion('')
              setAnswer1('')
              setAnswer2('')
              setAnswer3('')
              setAnswer4('')
              setAnswer4IsCorrect('')
              setAnswer3IsCorrect('')
              setAnswer2IsCorrect('')
              setAnswer1IsCorrect('')
              inputRef.current.value = null;

            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
        
        
    }


    async function showQuestionAddedAlert(){
      setQuestionAdded(true)
      setTimeout(()=>setQuestionAdded(false), 3000);
  }
    return <div>
    
        <Container >

    
        <Form controlId="formEmail" className="d-grid gap-3">
        <Form.Group className="d-grid gap-3">
            <Form.Control value={question} onChange={(event)=>setQuestion(event.currentTarget.value)} type="text" placeholder="Question"/>
            <Form.Select aria-label="Default select example" value={categoryChosen} onChange={(event)=> setCategoryChosen(event.currentTarget.value)}>
              <option>Question category</option>
              {categories?.map((category,index) =>(
                <option>{categories[index]?.categoryName}</option>
                
            ))}
            </Form.Select> 
                
                <div style={{height:"10px"}}></div>
                <p className="h6"> Add an image to your question </p>
                <input ref={inputRef} type="file" onChange={fileSelectedHandler} />
                <div style={{height:"10px"}}></div>
                <Card style={{padding:'20px'}}>
                <p className="h6"> Response 1 </p>
                <Form.Control value={answer1} onChange={(event)=>setAnswer1(event.currentTarget.value)} type="text" placeholder="Answer"/>
                <Form.Select value={answer1IsCorrect} onChange={(event)=>setAnswer1IsCorrect(event.currentTarget.value)} type="text">
                <option>false</option>
                <option>true</option>
                </Form.Select>
                </Card>

                <Card style={{padding:'20px'}}>
                <p className="h6"> Response 2 </p>
                <Form.Control value={answer2} onChange={(event)=>setAnswer2(event.currentTarget.value)} type="text" placeholder="Answer"/>
                <Form.Select value={answer2IsCorrect} onChange={(event)=>setAnswer2IsCorrect(event.currentTarget.value)} type="text">
                <option>false</option>
                <option>true</option>
                </Form.Select>
                </Card>

                <Card style={{padding:'20px'}}>
                <p className="h6"> Response 3 </p>
                <Form.Control value={answer3} onChange={(event)=>setAnswer3(event.currentTarget.value)} type="text" placeholder="Answer"/>
                <Form.Select value={answer3IsCorrect} onChange={(event)=>setAnswer3IsCorrect(event.currentTarget.value)} type="text">
                <option>false</option>
                <option>true</option>
                </Form.Select>
                </Card>

                <Card style={{padding:'20px'}}>
                <p className="h6"> Response 4 </p>
                <Form.Control value={answer4} onChange={(event)=>setAnswer4(event.currentTarget.value)} type="text" placeholder="Answer"/>
                <Form.Select value={answer4IsCorrect} onChange={(event)=>setAnswer4IsCorrect(event.currentTarget.value)} type="text">
                <option>false</option>
                <option>true</option>
                </Form.Select>
                </Card>

        </Form.Group>

        {questionAdded ? <Alert variant='primary' key='primary'>
                                Question Added
        </Alert>: <div></div>}

        <Button class="w-100 btn btn-lg btn-primary login" onClick={() => {
            addQuestions()
            showQuestionAddedAlert()
        }
        }>Add new question</Button>
        </Form>
        <div style={{height:"50px"}}></div>
        </Container>
    </div>
}

export default AddQuestionToTest
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from  '@codemirror/lang-python';

const CodeAndRun = (props)=>{
    useEffect(() => {
        changeExtension()
      }, []);
    const [code, setCode] = useState(props.codingQuestions.initialCode);
    const [testCases,setTestCases]= useState([]);
    const [finishTest, setfinishTest] = useState(false);

    const [extensions,setExtensions] = useState([python({ python: true })])
    const changeExtension = ()=>{
        if(props.language== "Python"){
            setExtensions([python({ python: true })])
        }
        else if(props.language== "Javascript"){
            setExtensions([javascript({ jsx: true })])
        }
    
    }
    const submitCode= ()=>{
        console.log(code)
        const codeToSend = {
            code:code
        }
        axios.post("https://www.skilli-project-node-app.site/pythonCodingTest/", null, {params:codeToSend})
                .then(function (response) {
                //handle success
                console.log(response.data);

                setTestCases([response.data.passOrFail])
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });

        setfinishTest(true)
    }

    
    return <div className='answer-section code-area'>
            <h1> Type your code </h1>
            <div style={{height:"20px"}}></div>
            <CodeMirror
        value={code}
        height="300px"
        extensions={extensions}
        options={{keyMap:"sublime"}}
        onChange={(editor,change)=> {setCode(editor)
        }}
        />
            <div style={{height:"20px"}}></div>
            <Button onClick={submitCode} className= "w-25"> Run Tests </Button>
            <div style={{height:"20px"}}></div>
            <span id="results"> {testCases.map((testCase,i) =>{
                return <div key={i}> 
                    {testCase == 'True' ? "✅ Test passed with success" : "❌ The tests failed"}
                </div>
            })}</span>
            <div style={{height:"20px"}}></div>

            {finishTest && <Button className= "w-50" style={{backgroundColor:"#27BC49", borderColor:"#27BC49"}} onClick={() => props.finishQuiz(testCases)} > Validate test </Button>}

            <div style={{height:"50px"}}></div>
    </div>
}

export default CodeAndRun
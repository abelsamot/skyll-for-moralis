import {ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/test.css'


function ListOfTests(props) {
    const tests = props.testsSelected
    console.log(tests )
    return  <div>
    <ListGroup>
    {tests.map(test =>(<ListGroup.Item style={{color:"#5c4dff", fontWeight:600}}>{test.testName}</ListGroup.Item>))}
    </ListGroup>
        </div>
        
    }

export default ListOfTests;
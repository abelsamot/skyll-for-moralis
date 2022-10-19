import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {Button, Form, Container, Col, Row, Modal, Badge} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";
import AddCandidate from './AddCandidate';
import AddTestsToCandidate from './AddTestsToCandidate';
import  {  useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter,
    TableSortLabel
 } from '@material-ui/core';

 const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 10,
        backgroundColor:"#e2e7ff",
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
  }));


const CandidatesList = ()=>{
    useEffect(() => {
        getUsers()
        console.log("ok")
      }, []);

    let navigate = useNavigate();
    const [users, setUsers] = useState([{
        _id:"NmCfSx1i9FknXCQFbBBocIbi",
        username:"Abel ",
        email:"abel@redriverwest.com",
        post:"Full Stack",
        status:"Hired",
        stack:['React',", ",'Node'],
    }]);
    const defaultSorted = [{
        dataField: 'username',
        order: 'desc'
      }];

    const getUsers = () => {
        axios.get("https://www.skilli-project-node-app.site/getUsers").then((response)=>{
            setUsers(response.data)
        })
        .catch(error => console.error(error))
    }
    

    const [addCandidate,setAddCandidate]=useState(false)
    const [addTestsToCandidate,setaddTestsToCandidate]=useState(false)
    const [candidateUserName,setcandidateUserName]=useState("")
    const [candidateId,setcandidateId]=useState("")


    const addedCandidate=(value) => {
        setcandidateUserName(value)
        setAddCandidate(false)
        setaddTestsToCandidate(true)
    }

    const closeTest =()=>{
        setaddTestsToCandidate(false)
    }

    // here
    const goToUserProfile = (id) =>{
        console.log(id)
        navigate("../user/" + id, { replace: true })
    }
    

    let data = []
    for (let i = 0; i<users.length; i++){
        const testsDone = (users[i].tests || []).filter(test => test.testDone == true)
        const sum = (testsDone|| []).reduce((accumulator, object,a) => {
            const lengthOfTests = users[i].tests.length - 1
            const diffTestDoneTest = lengthOfTests-testsDone.length
            if(a+1+diffTestDoneTest===lengthOfTests){
                return (accumulator + object.testScore)/lengthOfTests
            }
            else{
                return (accumulator + object.testScore);
            }
          }, 0);
        console.log(sum)
        data[i]={
              _id:users[i]._id,
              username: users[i].username,
              post: users[i].post,
              status: users[i].status,
              stack:users[i].stack,
              score:sum
          }
    }

    
    console.log(data)

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [orderDirection, setOrderDirection]= useState("desc")
    const [valueToOrderBy, setValueToOrderBy] = useState("score")
    

    const handleRequestSort = (event,property) => {
        const isAscending= (valueToOrderBy === property && orderDirection==='asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc': 'asc')
    }

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }

    function descendingComparator(a,b, orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1
        }
        if(b[orderBy] > a[orderBy]){
            return 1
        }
        return 0
    }
    function getComparator(order, orderBy){
        return order ==="desc"
        ? (a,b) => descendingComparator(a,b, orderBy)
        : (a,b) => -descendingComparator(a,b,orderBy)    
    }
    const sortedRowInformation =(rowArray, comparator) => {
        const stabilizedArray = rowArray.map((el,index) => [el,index])
        stabilizedArray.sort((a,b) => {
            const order = comparator(a[0],b[0])
            if(order !==0) return order
            return a[1] - b[1]
        })
        return stabilizedArray.map((el)=>el[0])
    }
    return <div>
        <Container className= "w-100" >
            <Row style={{height:"80px"}}></Row>
            <Row style={{height:"80px"}}>
            <Col xl={3} lg={4}  xs={5} className="d-flex align-items-center"> <h3 className="h3" style={{color:"#5c4dff"}}> My candidates</h3></Col>
            <Col xl={6} lg={4}   xs={2} > </Col>
            <Col xl={3} lg={4}  xs={5} className="d-flex align-items-center justify-content-end" >
            <Button class="btn btn-lg btn-primary login" onClick={()=>setAddCandidate(true)}>Add candidate</Button>
            
            
            <Modal show={addCandidate}>
                
                
                <Modal.Header> <Button onClick={()=>setAddCandidate(false)}> X </Button> </Modal.Header>
                <Modal.Body> <AddCandidate candidateAdded = {addedCandidate} /> </Modal.Body>
                <Modal.Footer> </Modal.Footer>
            
            </Modal>

            <Modal show={addTestsToCandidate} size="xl">
            
                <Modal.Body> <AddTestsToCandidate closeTest={closeTest} candidateUserName={candidateUserName}/> </Modal.Body>
            
            </Modal>



            </Col>
            </Row>
            <Row>
            
            <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell key="username" > 
                                <TableSortLabel
                                active={valueToOrderBy ==="username"}
                                direction={valueToOrderBy == "username" ? orderDirection:'desc'}
                                onClick={ createSortHandler("username")}
                                > Username 
                                </TableSortLabel>
                            </TableCell>
                            <TableCell >Position</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >
                            <TableSortLabel key="score"
                                active={valueToOrderBy ==="score"}
                                direction={valueToOrderBy == "score" ? orderDirection:'desc'}
                                onClick={createSortHandler("score")}
                                > Score
                                </TableSortLabel>
                            </TableCell>
                            <TableCell >Stack</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            
                            sortedRowInformation(data, getComparator(orderDirection, valueToOrderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            <TableRow key={row.username}>
                                <TableCell style={{fontWeight:500}} onClick={ ()=>goToUserProfile(row._id)}><button style={{fontWeight:500}}>{row.username}</button></TableCell>
                                <TableCell>{row.post}</TableCell>
                                <TableCell className={classes.status}>
                                <div> <div style={{
                                        backgroundColor: 
                                        ((row.status === 'hired' && 'green') ||
                                        (row.status === 'Tests finished' && 'blue') ||
                                        (row.status === 'Test sent' && 'orange')),
                                        width:"10px",
                                        height:"10px",
                                        borderRadius: "10px",
                                        float:"left",
                                        marginTop:"5px"
                                    }}> </div>  <div  style={{float:"left", marginLeft:"5px"}}> {row.status} </div></div>
                                </TableCell>
                                <TableCell>{Math.round(row.score)} %</TableCell>
                                <TableCell>{row.stack.map((item)=><Badge style={{marginLeft:"10px"}} key={item}> {item} </Badge> )}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        </TableFooter>
                    </Table>
                    </TableContainer>
            </Row>
        </Container>
    </div>
}

export default CandidatesList
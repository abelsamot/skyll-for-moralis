import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import {useMoralis} from "react-moralis";
import {Button, Form, Container, Col, Row, Modal, Badge} from 'react-bootstrap'
import '../styles/styles.css'
import axios from "axios";
import SearchBar from './CandidateList/SearchBar';
import List from './CandidateList/List';
import FilterPanel from './CandidateList/FilterPanel';
import  { Navigate, useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { dataList } from './CandidateList/Constants';
import EmptyView from './CandidateList/EmptyView';
import CandidatesHeader from './CandidatesHeader';
const AllCandidates = ()=>{


    const [list, setList] = useState([]);
    useEffect(() => {
        
        getUsers()
        setList(data)
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
            for (let i = 0; i<response.data.length; i++){
                const testsDone = (response.data[i].tests || []).filter(test => test.testDone == true)
                
                const sum = (testsDone|| []).reduce((accumulator, object,a) => {
                    const lengthOfTests = response.data[i].tests.length - 1
                    const diffTestDoneTest = lengthOfTests-testsDone.length
                    if(a+1+diffTestDoneTest===lengthOfTests){
                        return (accumulator + object.testScore)/lengthOfTests
                    }
                    else{
                        return (accumulator + object.testScore);
                    }
                  }, 0);
                setList(oldArray => [...oldArray, {
                    _id:response.data[i]._id,
                    username: response.data[i].username,
                    post: response.data[i].post,
                    status: response.data[i].status,
                    stack:response.data[i].stack,
                    score:sum
                }]);
            }
            setUsers(response.data)
        })
        .catch(error => console.error(error))
    }
    const computeData = ()=>{
        
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
        data[i]={
              _id:users[i]._id,
              username: users[i].username,
              post: users[i].post,
              status: users[i].status,
              stack:users[i].stack,
              score:sum
          }
    }
    

const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedScore, setselectedScore] = useState([0, 100]);


  const [positions, setPositions] = useState([
    { id: 1, checked: false, label: 'Full-Stack Developer' },
    { id: 2, checked: false, label: 'Front-end Developer' },
    { id: 3, checked: false, label: 'Back-end Developer' },
    { id: 4, checked: false, label: 'Solidity Developer' },
    { id: 5, checked: false, label: 'Full-Stack Blockchain Developer' },
  ]);

  const [status, setStatus] = useState([
    { id: 1, checked: false, label: 'Test sent' },
    { id: 2, checked: false, label: 'Tests finished' },
    { id: 3, checked: false, label: 'hired' },
  ]);

  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleChangeChecked = (id) => {
    const positionsStateList = positions;
    const changeCheckePositions = positionsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPositions(changeCheckePositions);
  };
  const handlechangeStatus = (id) => {
    const statusStateList = status;
    const changeCheckestatus = statusStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setStatus(changeCheckestatus);
  };

  const handlechangeScore = (event, value) => {
    console.log(value)
    setselectedScore(value);
  };

  const applyFilters = () => {
    let updatedList = data;

    // Position Filter
    const positionsChecked = positions
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (positionsChecked.length) {
        console.log("POSITION")
        let listOfPostPersonsWithGoodPost = []
        updatedList.map((item)=>{
            if(positionsChecked.includes(item.post)){
                listOfPostPersonsWithGoodPost.push(item)
            }
        })
        console.log(listOfPostPersonsWithGoodPost)
        updatedList = listOfPostPersonsWithGoodPost
    }

    const statusChecked = status
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (statusChecked.length) {
        console.log("STATUS")
        let personsWithGoodStatus = []
        updatedList.map((item)=>{
            if(statusChecked.includes(item.status)){
                personsWithGoodStatus.push(item)
            }
        })
        console.log(personsWithGoodStatus)
        updatedList = personsWithGoodStatus
    }

    // Search Filter
    if (searchInput) {
    console.log("UP")
      updatedList = updatedList.filter(
        (item) =>
        item.username.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Score Filter
    const minScore = selectedScore[0];
    const maxScore = selectedScore[1];
    updatedList = updatedList.filter(
      (item) => item.score >= minScore && item.score <= maxScore
    );
    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, positions, status, searchInput, selectedScore]);


    return <div>
       
         <div className="home">
        <CandidatesHeader/>
         <SearchBar
        value={searchInput}
        changeInput={(e) => {
          setSearchInput(e.target.value)}}
      />
            <div className="home_panelList-wrap">
                <div className="home_panel-wrap">
                    <Container>
                    <FilterPanel
            selectedScore={selectedScore}
            positions={positions}
            changeChecked={handleChangeChecked}
            status={status}
            changeStatus={handlechangeStatus}
            changeScore={handlechangeScore}
          />
                    </Container>
                
                </div>
                <div className="home_list-wrap">
                <div className='home_list-wrap'>
                <Container>
                {resultsFound ? <List list={list} /> : <EmptyView />}
                </Container>
        </div>
                </div>

            </div>
            </div>
    </div>
}

export default AllCandidates
import React from 'react';
import './styles.css';
import { Badge } from 'react-bootstrap';
import  { Navigate, useNavigate } from 'react-router-dom'



const ListItem = ({
  item
}) => {
  let navigate = useNavigate();
  const goToUserProfile = (id) =>{
    console.log(id)
    navigate("../user/" + id, { replace: true })
  }
  return <div className='listItem-wrap' onClick={()=>goToUserProfile(item._id)} >
  <header>
    <h4>{item.username}</h4>
    <span>🏆 {Math.round(item.score)} %</span>
  </header>
  <footer>
    <p>
      <b>{item.post}</b> 

    </p>
    <p>
      <b></b>
    </p>
  </footer>
  <br/>
  
  <div> Stack : {item.stack.map((i)=><Badge style={{marginLeft:"10px"}} key={i}> {i} </Badge> )}</div>
  <div style={{height:"10px"}}></div>
  <div> <div style={{
                                      backgroundColor: 
                                      ((item.status === 'hired' && 'green') ||
                                      (item.status === 'Tests finished' && 'blue') ||
                                      (item.status === 'Test sent' && 'orange')),
                                      width:"10px",
                                      height:"10px",
                                      borderRadius: "10px",
                                      float:"left",
                                      marginTop:"5px"
                                  }}> </div>  <div  style={{float:"left", marginLeft:"5px"}}> {item.status} </div></div>
  
</div>


}


export default ListItem;
import React from 'react';
import { Container } from 'react-bootstrap';
import ListItem from './ListItem';
import './styles.css';

const List = ({ list }) => (
  <div className='list-wrap' style={{marginTop:"20px"}}>
    {list.sort((a,b) => a.score < b.score ? 1 : -1).map((item) => (
      <ListItem key={item.id} item={item} />
    ))}
  </div>
);

export default  List;
 
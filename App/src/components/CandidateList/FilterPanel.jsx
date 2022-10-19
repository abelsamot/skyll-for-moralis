import {useMoralis} from 'react-moralis'
import  { Navigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from "axios";
import FilterListToggle from './Common/FilterListToggle';
import React from 'react';
import SliderProton from './Common/SliderProton';
import { categoryList } from './Constants';
import CheckboxProton from './Common/CheckboxProton';
import { Container } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedScore,
  selectRating,
  positions,
  status,
  changeStatus,
  changeChecked,
  changeScore,
}) => (
  <div>
    <div className='input-group'>
    </div>
    <div className='input-group'>
      <p className='label'>Position</p>
      <Container>
      {positions.map((position) => (<div>
        <CheckboxProton
          key={position.id}
          element={position}
          changeChecked={changeChecked}/>
          
        </div>
            
      ))}
      </Container>
    </div>
    
    <div className='input-group'>
      <p className='label-range'>Score range</p>
      <Container>
      <SliderProton value={selectedScore} changeScore={changeScore} />
      </Container>
    </div>
    <div className='input-group'>
      <p className='label'>Status</p>
      <Container>
      {status.map((s) => (<div>
        <CheckboxProton
          key={s.id}
          element={s}
          changeChecked={changeStatus}/>
          
        </div>
            
      ))}
      </Container>
    </div>
  </div>
);

export default FilterPanel;

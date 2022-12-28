import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { testAction } from './actions';
import { getIsLoggedIn } from './selectors';

const HomeView = () => {
  const navigate = useNavigate();
  const status = useSelector(state => getIsLoggedIn(state));

  console.log('statusstatus', status);

  const dispatch = useDispatch();

  const test = useCallback(
    info => {
      dispatch(testAction(info));
    },
    [dispatch]
  );

  return (
    <>
    <h2
      onClick={() => {
        test(!status);
      }}>
      Test Action
    </h2>
    <a onClick={()=>{navigate('/about');}}>About</a>
   </>
  );
};

export default HomeView;

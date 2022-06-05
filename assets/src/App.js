import "./bootstrap_theme.min.css";

import Main from './componets/Main';
import Search from './componets/Search';
import Chat from './componets/Chat'
import Item from './componets/Item'
import Login from './componets/Login'
import Account from "./componets/Account";

import { load } from './slices/categoriesSlice';

import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      fetch("/api/categories")
      .then(response => response.json())
      .then(data => dispatch(load(data.categories)))
  }, [dispatch])



  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Main />} />
        <Route path='/search' element={ <Search /> } />
        <Route path='/messages' element={ <Chat />}  />
        <Route path='/items/:itemId' element={ <Item /> } />
        <Route path='/login' element={ <Login />} />
        <Route path='/account' element={ <Account /> }/>
      </Routes>
    </Router>
  );
}

export default App;

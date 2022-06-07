import "./bootstrap_theme.min.css";

import Main from './componets/Main';
import Search from './componets/Search';
import Chat from './componets/Chat'
import Item from './componets/Item'
import Login from './componets/Login'
import Account from "./componets/Account";
import NewItem from "./componets/NewItem";
import Register from './componets/Register'

import { load } from './slices/categoriesSlice';

import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Cloudinary } from "@cloudinary/url-gen";

import Authorized from "./componets/Authorized";
import FollowedItems from "./componets/FollowedItems";
import { CloudinaryContext } from './context'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      fetch("/api/categories")
      .then(response => response.json())
      .then(data => dispatch(load(data.categories)))
  }, [dispatch])

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'drm00a34m'
    }
  }); 

  return (
    <CloudinaryContext.Provider value={cld}>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Main />} />
          <Route path='/search' element={ <Search /> } />
          <Route path='/messages/:userId' element={ <Authorized><Chat /></Authorized>}  />
          <Route path='/messages' element={ <Authorized><Chat /></Authorized>}  />
          <Route path='/items/:itemId' element={ <Item /> } />
          <Route path='/items/new' element={ <Authorized><NewItem /></Authorized> } />
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={ <Authorized><Account /></Authorized>  } />
          <Route path='/following' element={ <Authorized><FollowedItems/></Authorized> } />
        </Routes>
      </Router>
    </CloudinaryContext.Provider>

  );
}

export default App;

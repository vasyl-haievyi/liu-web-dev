import './App.css';

import Main from './componets/Main';
import Search from './componets/Search';
import Chat from './componets/Chat'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Main />} />
        <Route path='/search' element={ <Search /> } />
        <Route path='/messages' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

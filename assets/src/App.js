import "bootstrap/dist/css/bootstrap.min.css";

import Main from './componets/Main';
import Search from './componets/Search';
import Chat from './componets/Chat'
import Item from './componets/Item'

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
        <Route path='/items/:itemId' element={ <Item /> } />
      </Routes>
    </Router>
  );
}

export default App;

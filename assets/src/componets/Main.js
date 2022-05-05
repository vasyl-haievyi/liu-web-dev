import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Categories from './Categories';
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Main() {
    let navigate = useNavigate();

    let onSearchClicked = (searchTerm) => {
      navigate({
        pathname: '/search',
        search: '?q='+searchTerm
      });
    }

  return (
    <Container fluid>
      <Row><NavBar/></Row>
      <Row><SearchBar onSearchClicked={onSearchClicked}/></Row>
      <Row><Categories/></Row>
    </Container>
  );
}

export default Main;

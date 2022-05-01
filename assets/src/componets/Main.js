import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Categories from './Categories';
import { Container, Row } from 'react-bootstrap'

function Main() {
  return (
    <Container fluid>
      <Row><NavBar/></Row>
      <Row><SearchBar/></Row>
      <Row><Categories/></Row>
    </Container>
  );
}

export default Main;

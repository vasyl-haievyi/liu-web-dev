import { Container, Row, Col, Carousel, Badge } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import NavBar from './NavBar'
import SearchBar from './SearchBar'

function Item() {
    let { itemId } = useParams();
    let item = getItem(itemId);

    return (
        <Container fluid>
        <Row>
            <NavBar />
        </Row>
        <Row>
            <SearchBar />
        </Row>
        <Row className='justify-content-md-center'>
            <Col lg="6">
                <Carousel interval={null} variant="dark">
                    {new Array(5).fill(undefined).map(() => { 
                        return (
                            <Carousel.Item>
                                <Row className='justify-content-md-center'>
                                <img src="..." height="500px" width="800px" alt=""/>
                                </Row>
                            </Carousel.Item>    
                        )
                    })}
                </Carousel>
            </Col>
        </Row>
        <Row className='justify-content-md-center mt-2'>
            <Col lg="6">
                <h2>{item.title}</h2>
                <p className="fs-2"><b>{item.price}</b></p>
                <Badge bg="primary" className="fs-5">State: {item.state}</Badge>
            </Col>
        </Row>
        <Row>

        </Row>
    </Container>
    )
}

export default Item;

function getItem(id) {
    return {
        id: id,
        title: "Some Item",
        description: "Some long item description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam iaculis aliquet est et varius. Phasellus tempus dui in leo efficitur vestibulum. Duis finibus tincidunt sapien.",
        state: "used",
        price: "40 sek",
        seller: {
            id: "2",
            name: "Vasyl Svenson",
        },
        location: "Linköping, Sweden",
    }
}
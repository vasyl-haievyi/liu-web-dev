import { Container, Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Categories()  {
    let categories = useSelector(state => state.categories)

    let categoriesItems = categories.map((category) => {
        return (
            <Col sm="auto" key={category.id}>
                <Card style={{ width: '10rem' }} className="mx-2 h-100">
                    <Card.Img variant="top" src="..."/>
                    <Card.Body>
                        <Card.Title>{category.title}</Card.Title>
                        <Card.Link 
                        as={Link}
                        to={{
                            pathname: "search",
                            search: `?category=${category.id}`
                        }}
                        className="btn btn-primary stretched-link">
                            {category.title}
                        </Card.Link>
                    </Card.Body>
                </Card>
             </Col>
        )
    });
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                {categoriesItems}
            </Row>
        </Container>
    )
}

export default Categories;
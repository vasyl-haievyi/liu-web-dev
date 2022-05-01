import React, {useState, useEffect} from 'react';
import { Container, Row, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Categories()  {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("/api/categories")
        .then(response => response.json()
        .then(data => setCategories(data.categories)))
    }, [])

    let categoriesItems = categories.map((category) => {
        return (
            <Card style={{ width: '10rem' }} className="mx-2">
                <Card.Img variant="top" src="..."/>
                <Card.Body>
                    <Card.Title>{category.title}</Card.Title>
                    <Card.Link 
                    as={Link} 
                    to={`/search?category=${category.id}`}
                    className="btn btn-primary">
                        {category.title}
                    </Card.Link>
                </Card.Body>
            </Card>
        )
    });
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                {categoriesItems}
            </Row>
        </Container>
    )
}

export default Categories;
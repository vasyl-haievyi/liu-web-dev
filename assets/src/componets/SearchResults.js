import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SearchResults ({ results }) {
    let resultsItems = results.map((item) => {
        return (
            <Row className="mb-2">
                <Card border="primary">
                    <Row>
                        <Col md="auto" className="my-2">
                            <Card.Img src="..." height="250px" width="175px"/>
                        </Col>
                        <Col>
                            <Card.Body className="h-100">
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Link
                                    as={Link} 
                                    to={'/items/' + item.id}
                                    className="stretched-link"
                                />
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Row>
        )
    })

    return (
        <Container>
            {resultsItems}
        </Container>        
    )
}

export default SearchResults;
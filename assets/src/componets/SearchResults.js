import React, { useContext }from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Link } from 'react-router-dom'

import { CloudinaryContext } from '../context'

function SearchResults ({ results }) {
    let cld = useContext(CloudinaryContext)

    let resultsItems = results.map((item) => {
        return (
            <Row className="mb-2">
                <Card border="primary">
                    <Row>
                        <Col md="auto" className="my-2">
                            {item.image?
                            <Card.Img as={AdvancedImage} cldImg={cld.image(item.image).resize(thumbnail().width(175).height(250))}></Card.Img>
                            :
                            <Card.Img src="..." height="250px" width="175px"/>
                            }
                            
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
import React from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap'

function SearchBar () {
    return (
        <Container className="my-4">
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                    <InputGroup>
                        <FormControl
                        placeholder="Search term"
                        aria-label="Search term"
                        />
                        <Button variant="primary">
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchBar    ;
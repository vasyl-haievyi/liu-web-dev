import React, { useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col } from 'react-bootstrap'

function SearchBar ( props ) {
    let [searchTerm, setSearchTerm] = useState("");

    let onSearchTermChanged = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-md-center">
                <Col xs lg="3">
                    <InputGroup>
                        <FormControl
                        placeholder="Search term"
                        aria-label="Search term"
                        onChange={onSearchTermChanged}
                        />
                        <Button variant="primary" onClick={() => props.onSearchClicked(searchTerm)}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchBar    ;
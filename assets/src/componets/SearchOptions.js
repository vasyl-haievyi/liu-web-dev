import React, { useState, useEffect } from 'react';
import { Form, Dropdown, ButtonGroup, Container, Row, Col } from 'react-bootstrap'

function SearchOptions ({ checked, onCheckedChange }) {
    let [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("/api/categories")
        .then(response => response.json()
        .then(data => setCategories(data.categories)))
    }, []);

    let items = categories.map((category) => {
        let subitems = category.subcategories.map((subcategory) => {
            return (
                <Dropdown.Item as={Form}>
                        <Form.Check
                        type="checkbox"
                        variant="primary"
                        label={subcategory.title}
                        id={subcategory.id}
                        checked={checked.includes(subcategory.id)}
                        onChange={(e) => {onCheckedChange(subcategory.id, e.target.checked)}}
                        />
                </Dropdown.Item>
            )
        })

        return (
            <Row className="align-items-center">
                <Col>
                    <Form>
                        <Form.Check
                        type="checkbox"
                        variant="primary"
                        label={category.title}
                        id={category.id}
                        checked={checked.includes(category.id)}
                        onChange={(e) => {onCheckedChange(category.id, e.target.checked)}}
                        />
                    </Form>
                </Col>
                <Col md="auto" className="me-2 py-1">
                    <Dropdown
                    as={ButtonGroup}
                    drop="end"
                    autoClose="outside">
                        <Dropdown.Toggle 
                        id={category.id} 
                        disabled={category.subcategories.length === 0}/>
                        <Dropdown.Menu variant="primary">
                            {subitems}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
        )
    });

    return (
        <Container className="border border-primary rounded pe-0">
            {items}
        </Container>
    )
}


export default SearchOptions;
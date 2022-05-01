import React from 'react';
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults';
import SearchOptions from './SearchOptions';

function Search () {
    let [searchParams, setSearchParams] = useSearchParams();
    let selectedCategories = searchParams.getAll("category")

    let onCategoryChecked = (id ,checked) => {
        if (checked) {
            selectedCategories.push(id);
        } else {
            selectedCategories = selectedCategories.filter(catId => catId !== id)
        }

        setSearchParams({category: selectedCategories})
    }

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <SearchBar />
            </Row>
            <Row>
                <Col xs="7" md="4" xl="2">
                    <SearchOptions checked={selectedCategories} onCheckedChange={onCategoryChecked} />
                </Col>
                <Col>
                    <SearchResults results={getSearchResults()} />
                </Col>
            </Row>
        </Container>
    )
}

function getSearchResults() {
    let res = [];
    for (var i = 0; i < 30; i++) {
        res.push({
            id: i.toString(),
            title: "Result " + i.toString() + (i % 5 === 0? " blablblalbalbalbalblablablabla" : ""),
        })
    }

    return res;
}

export default Search;
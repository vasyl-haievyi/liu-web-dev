import React from 'react';
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults';
import SearchOptions from './SearchOptions';

function Search () {
    let [searchParams, setSearchParams] = useSearchParams();

    let onCategoryChecked = (id ,checked) => {
        if (checked) {
            searchParams.append('category', id)
        } else {
            let newSelectedCategories = searchParams.getAll('category').filter(catId => catId !== id)
            searchParams.delete('category')
            newSelectedCategories.forEach(category => {searchParams.append('category', category)})
        }

        searchParams.sort()
        setSearchParams(searchParams)
    }

    let onSearchClicked = (searchTerm) => {
        searchParams.set('q', searchTerm)
        setSearchParams(searchParams)
    }

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <SearchBar onSearchClicked={onSearchClicked}/>
            </Row>
            <Row>
                <Col xs="7" md="4" xl="2">
                    <SearchOptions checked={searchParams.getAll('category')} onCheckedChange={onCategoryChecked} />
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